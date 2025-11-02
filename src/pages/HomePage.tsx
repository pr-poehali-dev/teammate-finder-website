import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

const API_URL = 'https://functions.poehali.dev/ca7a59bb-ed07-4019-972f-4b936a012c4b';

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    game_mode: '',
    player_count: '',
    discord_tag: '',
    image_url: 'https://cdn.poehali.dev/projects/67e01148-e82f-402b-8d12-587402c9a887/files/bf5109cd-10c5-49e3-8b7c-e2ab29a2adbd.jpg'
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(`${API_URL}?status=approved`);
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: 'Ваше объявление отправлено на модерацию',
        });
        setIsDialogOpen(false);
        setFormData({
          title: '',
          description: '',
          game_mode: '',
          player_count: '',
          discord_tag: '',
          image_url: 'https://cdn.poehali.dev/projects/67e01148-e82f-402b-8d12-587402c9a887/files/bf5109cd-10c5-49e3-8b7c-e2ab29a2adbd.jpg'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить объявление',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Users" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Поиск тимейтов Rust</h1>
                <p className="text-sm text-muted-foreground">Найди напарников для игры</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Поиск игроков</a>
              <a href="/news" className="text-muted-foreground hover:text-primary transition-colors">Новости</a>
              <a href="/vip" className="text-muted-foreground hover:text-primary transition-colors">VIP продвижение</a>
              <a href="/clan" className="text-muted-foreground hover:text-primary transition-colors">О клане DST</a>
            </nav>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать объявление
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Новое объявление</DialogTitle>
                  <DialogDescription>
                    Заполните форму для поиска тиммейтов. Объявление будет опубликовано после модерации.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Заголовок</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ищу команду для рейдов"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Расскажите о себе и своих целях..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="game_mode">Режим игры</Label>
                      <Select value={formData.game_mode} onValueChange={(value) => setFormData({ ...formData, game_mode: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите режим" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PVP">PVP</SelectItem>
                          <SelectItem value="PVE">PVE</SelectItem>
                          <SelectItem value="Roleplay">Roleplay</SelectItem>
                          <SelectItem value="Vanilla">Vanilla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="player_count">Количество игроков</Label>
                      <Select value={formData.player_count} onValueChange={(value) => setFormData({ ...formData, player_count: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите количество" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 игрока</SelectItem>
                          <SelectItem value="3-5">3-5 игроков</SelectItem>
                          <SelectItem value="5+">5+ игроков</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="discord_tag">Discord</Label>
                    <Input
                      id="discord_tag"
                      value={formData.discord_tag}
                      onChange={(e) => setFormData({ ...formData, discord_tag: e.target.value })}
                      placeholder="username#1234"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Отправить на модерацию
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background z-10" />
        <img
          src="https://cdn.poehali.dev/projects/67e01148-e82f-402b-8d12-587402c9a887/files/bf5109cd-10c5-49e3-8b7c-e2ab29a2adbd.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Найди идеальных напарников для Rust
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow-lg">
              Создавай объявления, находи игроков и доминируй на сервере вместе
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(true)}>
              <Icon name="Plus" size={24} className="mr-2" />
              Создать объявление
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold mb-2">Актуальные объявления</h3>
            <p className="text-muted-foreground">
              Игроки ищут тиммейтов для совместной игры
            </p>
          </div>
          <Button variant="outline" onClick={fetchListings}>
            <Icon name="RefreshCw" size={20} className="mr-2" />
            Обновить
          </Button>
        </div>

        {listings.length === 0 ? (
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Icon name="Search" size={64} className="text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">Объявлений пока нет</h3>
              <p className="text-muted-foreground mb-6">Будьте первым, кто создаст объявление!</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Icon name="Plus" size={20} className="mr-2" />
                Создать объявление
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="border-border hover:border-primary transition-colors">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-primary">{listing.game_mode}</Badge>
                    <Badge variant="secondary">{listing.player_count}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{listing.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-xs">
                    <Icon name="Calendar" size={14} />
                    {new Date(listing.created_at).toLocaleDateString('ru-RU')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {listing.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="MessageCircle" size={16} className="text-primary" />
                    <span className="font-mono text-primary">{listing.discord_tag}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    <Icon name="MessageSquare" size={18} className="mr-2" />
                    Связаться в Discord
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">О платформе</h4>
              <p className="text-sm text-muted-foreground">
                Платформа для поиска напарников в Rust. Создавай объявления, находи игроков и стройте команду мечты.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ссылки</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-muted-foreground hover:text-primary">Поиск игроков</a></li>
                <li><a href="/news" className="text-muted-foreground hover:text-primary">Новости</a></li>
                <li><a href="/vip" className="text-muted-foreground hover:text-primary">VIP продвижение</a></li>
                <li><a href="/clan" className="text-muted-foreground hover:text-primary">О клане DST</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  <a href="https://discord.gg/qcu8n8rRg6" className="text-primary hover:underline">Discord сервер</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Платформа поиска тимейтов Rust. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
