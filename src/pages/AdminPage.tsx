import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const API_URL = 'https://functions.poehali.dev/ca7a59bb-ed07-4019-972f-4b936a012c4b';
const AUTH_URL = 'https://functions.poehali.dev/71907111-6c8c-4231-b594-39f0887b96da';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [approvedListings, setApprovedListings] = useState<Listing[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchListings();
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
        fetchListings();
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

  const handleApprove = async (id: number) => {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'approved' })
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
        body: JSON.stringify({ id, status: 'rejected' })
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
                  placeholder="admin"
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
                <p className="text-sm text-muted-foreground">Управление объявлениями</p>
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
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pending">
              На модерации ({pendingListings.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Одобренные ({approvedListings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden border-border">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={listing.image_url}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">
                      На модерации
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{listing.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Users" size={16} />
                      {listing.player_count} • {listing.game_mode}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {listing.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="MessageSquare" size={16} />
                      <span className="font-mono">{listing.discord_tag}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 border-t border-border pt-4">
                    <Button
                      onClick={() => handleApprove(listing.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Icon name="Check" size={20} className="mr-2" />
                      Одобрить
                    </Button>
                    <Button
                      onClick={() => handleReject(listing.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <Icon name="X" size={20} className="mr-2" />
                      Отклонить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {pendingListings.length === 0 && (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={64} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Нет объявлений на модерации</h3>
                <p className="text-muted-foreground">Все объявления обработаны</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden border-border">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={listing.image_url}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-600">
                      Одобрено
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{listing.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Users" size={16} />
                      {listing.player_count} • {listing.game_mode}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {listing.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="MessageSquare" size={16} />
                      <span className="font-mono">{listing.discord_tag}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border pt-4">
                    <Button
                      onClick={() => handleDelete(listing.id)}
                      variant="destructive"
                      className="w-full"
                    >
                      <Icon name="Trash2" size={20} className="mr-2" />
                      Удалить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {approvedListings.length === 0 && (
              <div className="text-center py-12">
                <Icon name="FileX" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-bold mb-2">Нет одобренных объявлений</h3>
                <p className="text-muted-foreground">Одобрите объявления на модерации</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
