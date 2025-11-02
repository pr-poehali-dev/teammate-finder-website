import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Listing {
  id: number;
  title: string;
  description: string;
  game_mode: string;
  player_count: string;
  discord_tag: string;
  image_url: string;
  status: string;
  created_at: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  image_url: string | null;
  is_important: boolean;
}

const API_URL = 'https://functions.poehali.dev/ca7a59bb-ed07-4019-972f-4b936a012c4b';
const AUTH_URL = 'https://functions.poehali.dev/71907111-6c8c-4231-b594-39f0887b96da';
const CONTENT_URL = 'https://functions.poehali.dev/a06807f0-fc62-4462-bc35-f23d68f340dc';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [approvedListings, setApprovedListings] = useState<Listing[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Важное',
    content: '',
    image_url: '',
    is_important: false
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          action: 'login'
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        fetchAllData();
        toast({
          title: 'Успешно',
          description: 'Вы вошли в систему',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Неверные данные',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось войти в систему',
        variant: 'destructive'
      });
    }
  };

  const fetchAllData = async () => {
    fetchListings();
    fetchNews();
  };

  const fetchListings = async () => {
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        fetch(`${API_URL}?status=pending`),
        fetch(`${API_URL}?status=approved`)
      ]);

      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();

      setPendingListings(pendingData.listings || []);
      setApprovedListings(approvedData.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(`${CONTENT_URL}?type=news`);
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.dumps({ id, status: 'approved' })
      });

      toast({
        title: 'Успешно',
        description: 'Объявление одобрено',
      });
      fetchListings();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось одобрить объявление',
        variant: 'destructive'
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.dumps({ id, status: 'rejected' })
      });

      toast({
        title: 'Успешно',
        description: 'Объявление отклонено',
      });
      fetchListings();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отклонить объявление',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      toast({
        title: 'Успешно',
        description: 'Объявление удалено',
      });
      fetchListings();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить объявление',
        variant: 'destructive'
      });
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${CONTENT_URL}?type=news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.dumps(newsForm)
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Новость добавлена',
        });
        setIsNewsDialogOpen(false);
        setNewsForm({
          title: '',
          category: 'Важное',
          content: '',
          image_url: '',
          is_important: false
        });
        fetchNews();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить новость',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      await fetch(`${CONTENT_URL}?type=news`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.dumps({ id })
      });

      toast({
        title: 'Успешно',
        description: 'Новость удалена',
      });
      fetchNews();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить новость',
        variant: 'destructive'
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">Админ-панель</CardTitle>
                <CardDescription>Войдите для управления контентом</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="dstadmin"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            <p>Логин: <code>dstadmin</code> / Пароль: <code>admin123</code></p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Админ-панель</h1>
                <p className="text-sm text-muted-foreground">Управление всем контентом сайта</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <Icon name="LogOut" size={20} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="listings">
              Объявления ({pendingListings.length + approvedListings.length})
            </TabsTrigger>
            <TabsTrigger value="news">
              Новости ({news.length})
            </TabsTrigger>
            <TabsTrigger value="content">
              Контент сайта
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-6">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">На модерации ({pendingListings.length})</h2>
                  <Button onClick={fetchListings} variant="outline">
                    <Icon name="RefreshCw" size={20} className="mr-2" />
                    Обновить
                  </Button>
                </div>
                {pendingListings.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      Нет объявлений на модерации
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendingListings.map((listing) => (
                      <Card key={listing.id} className="border-yellow-600">
                        <CardHeader>
                          <CardTitle className="text-lg">{listing.title}</CardTitle>
                          <CardDescription className="flex gap-2">
                            <Badge variant="secondary">{listing.game_mode}</Badge>
                            <Badge variant="secondary">{listing.player_count}</Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                            {listing.description}
                          </p>
                          <p className="text-sm font-mono">{listing.discord_tag}</p>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600"
                            onClick={() => handleApprove(listing.id)}
                          >
                            <Icon name="Check" size={16} className="mr-1" />
                            Одобрить
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1"
                            onClick={() => handleReject(listing.id)}
                          >
                            <Icon name="X" size={16} className="mr-1" />
                            Отклонить
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Одобренные ({approvedListings.length})</h2>
                {approvedListings.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      Нет одобренных объявлений
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {approvedListings.map((listing) => (
                      <Card key={listing.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{listing.title}</CardTitle>
                          <CardDescription className="flex gap-2">
                            <Badge variant="secondary">{listing.game_mode}</Badge>
                            <Badge variant="secondary">{listing.player_count}</Badge>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                            {listing.description}
                          </p>
                          <p className="text-sm font-mono">{listing.discord_tag}</p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full"
                            onClick={() => handleDelete(listing.id)}
                          >
                            <Icon name="Trash2" size={16} className="mr-1" />
                            Удалить
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Управление новостями</h2>
              <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить новость
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новая новость</DialogTitle>
                    <DialogDescription>
                      Создайте новость для отображения на сайте
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddNews} className="space-y-4">
                    <div>
                      <Label>Заголовок</Label>
                      <Input
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Select 
                        value={newsForm.category} 
                        onValueChange={(value) => setNewsForm({ ...newsForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Важное">Важное</SelectItem>
                          <SelectItem value="VIP">VIP</SelectItem>
                          <SelectItem value="Набор">Набор</SelectItem>
                          <SelectItem value="Правила">Правила</SelectItem>
                          <SelectItem value="Советы">Советы</SelectItem>
                          <SelectItem value="Обновления">Обновления</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Контент</Label>
                      <Textarea
                        value={newsForm.content}
                        onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                        rows={5}
                        required
                      />
                    </div>
                    <div>
                      <Label>URL изображения (опционально)</Label>
                      <Input
                        value={newsForm.image_url}
                        onChange={(e) => setNewsForm({ ...newsForm, image_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="important"
                        checked={newsForm.is_important}
                        onChange={(e) => setNewsForm({ ...newsForm, is_important: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="important">Важная новость</Label>
                    </div>
                    <Button type="submit" className="w-full">Создать новость</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((item) => (
                <Card key={item.id} className={item.is_important ? 'border-2 border-red-600' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge>{item.category}</Badge>
                    </div>
                    <CardDescription>{new Date(item.date).toLocaleDateString('ru-RU')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-4">{item.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDeleteNews(item.id)}
                    >
                      <Icon name="Trash2" size={16} className="mr-1" />
                      Удалить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Управление контентом сайта</CardTitle>
                <CardDescription>
                  Здесь будет управление VIP тарифами, информацией о клане и другими разделами
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">VIP Тарифы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Управление тарифами продвижения
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" disabled>
                        <Icon name="Crown" size={16} className="mr-2" />
                        В разработке
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Клан DST</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Редактирование информации о клане
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" disabled>
                        <Icon name="Shield" size={16} className="mr-2" />
                        В разработке
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Настройки</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Общие настройки сайта
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" disabled>
                        <Icon name="Settings" size={16} className="mr-2" />
                        В разработке
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
