import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  image?: string;
  isImportant?: boolean;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Открытие нового сезона - Wipe 2 ноября!',
    date: '2025-11-01',
    category: 'Важное',
    isImportant: true,
    content: 'Клан DST объявляет о начале нового сезона! Wipe состоится 2 ноября в 19:00 МСК. Готовьтесь к эпичным битвам, новым рейдам и покорению острова! Все игроки стартуют с нуля - это твой шанс стать легендой сервера.',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80'
  },
  {
    id: 2,
    title: 'Обновление VIP-системы: новые привилегии',
    date: '2025-10-28',
    category: 'VIP',
    content: 'Мы добавили новые VIP-пакеты с эксклюзивными скинами, ускоренным фармом и приоритетным входом на сервер. VIP Elite теперь включает персональный вертолёт и доступ к секретным локациям. Проверьте раздел VIP услуг!',
    image: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&q=80'
  },
  {
    id: 3,
    title: 'Турнир DST: Битва кланов 15 ноября',
    date: '2025-10-25',
    category: 'События',
    isImportant: true,
    content: 'Регистрация на грандиозный турнир уже открыта! Сражайтесь за главный приз - 50,000 руб и эксклюзивный титул "Разрушители". Формат: 5v5, арена на карго. Регистрация команд до 10 ноября в нашем Discord.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
  },
  {
    id: 4,
    title: 'Новые правила рейдов и защиты базы',
    date: '2025-10-20',
    category: 'Правила',
    content: 'Введены обновлённые правила по офлайн-рейдам: теперь атаковать спящих игроков можно только после 22:00. Добавлен режим "Защищённая зона" для новичков на первые 48 часов. Читайте полные правила в Discord клана DST.',
  },
  {
    id: 5,
    title: 'DST расширяет состав - набор в клан открыт!',
    date: '2025-10-15',
    category: 'Набор',
    content: 'Клан DST ищет активных и опытных игроков! Требования: опыт от 500 часов, Discord, микрофон, возраст 16+. Мы предлагаем командную игру, совместные рейды и доступ к клановым ресурсам. Подавайте заявки через форму на главной.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'
  },
  {
    id: 6,
    title: 'Технические работы - плановое обновление',
    date: '2025-10-12',
    category: 'Тех. работы',
    content: 'Сервер будет недоступен 13 октября с 03:00 до 05:00 МСК для установки патчей и улучшения производительности. После обновления ожидается снижение лагов и улучшение стабильности FPS.',
  },
  {
    id: 7,
    title: 'Итоги прошлого сезона: статистика и победители',
    date: '2025-10-08',
    category: 'Статистика',
    content: 'Прошлый сезон завершён! Топ-3 игрока по рейдам: ShadowKiller (47 рейдов), IronFist (39), NightWolf (35). Самая укреплённая база принадлежала клану APEX - 15 слоёв защиты. Полная статистика доступна на форуме.',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=800&q=80'
  },
  {
    id: 8,
    title: 'Новая карта: Snow Valley добавлена на сервер',
    date: '2025-10-05',
    category: 'Обновления',
    content: 'Встречайте новую зимнюю карту Snow Valley! Суровые условия, ограниченные ресурсы и новые испытания ждут самых отважных. Карта доступна в ротации каждые выходные.',
  }
];

export default function NewsPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Важное': 'bg-red-600',
      'VIP': 'bg-yellow-600',
      'События': 'bg-blue-600',
      'Правила': 'bg-purple-600',
      'Набор': 'bg-green-600',
      'Тех. работы': 'bg-gray-600',
      'Статистика': 'bg-orange-600',
      'Обновления': 'bg-cyan-600'
    };
    return colors[category] || 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Newspaper" size={28} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Новости клана DST</h1>
                <p className="text-sm text-muted-foreground">Актуальные события сервера</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                <Icon name="Home" size={20} className="mr-2" />
                Главная
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Последние новости</h2>
          <p className="text-muted-foreground">
            Следите за обновлениями, событиями и анонсами сервера Rust от клана DST
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {newsData.map((news) => (
              <Card 
                key={news.id} 
                className={`overflow-hidden border-border ${news.isImportant ? 'border-2 border-red-600' : ''}`}
              >
                {news.image && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-4 right-4 ${getCategoryColor(news.category)}`}>
                      {news.category}
                    </Badge>
                    {news.isImportant && (
                      <Badge className="absolute top-4 left-4 bg-red-600 animate-pulse">
                        <Icon name="AlertCircle" size={16} className="mr-1" />
                        Важно
                      </Badge>
                    )}
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{news.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        {formatDate(news.date)}
                      </CardDescription>
                    </div>
                    {!news.image && (
                      <Badge className={getCategoryColor(news.category)}>
                        {news.category}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{news.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="border-border sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} />
                  Быстрые ссылки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/vip'}
                >
                  <Icon name="Crown" size={20} className="mr-2" />
                  VIP услуги
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/clan'}
                >
                  <Icon name="Shield" size={20} className="mr-2" />
                  О клане DST
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('https://discord.gg/dst', '_blank')}
                >
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Discord сервер
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={24} />
                  Предстоящие события
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-red-600 pl-4">
                  <h4 className="font-bold">Wipe сервера</h4>
                  <p className="text-sm text-muted-foreground">2 ноября, 19:00 МСК</p>
                </div>
                <div className="border-l-4 border-yellow-600 pl-4">
                  <h4 className="font-bold">VIP распродажа</h4>
                  <p className="text-sm text-muted-foreground">5-7 ноября, -30%</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold">Турнир кланов</h4>
                  <p className="text-sm text-muted-foreground">15 ноября, старт</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-destructive/10 to-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={24} />
                  Набор в клан
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  DST ищет опытных игроков! Станьте частью легендарного клана.
                </p>
                <Button className="w-full bg-destructive hover:bg-destructive/90">
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Подать заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 DST Clan. Все права защищены.</p>
          <p className="text-sm mt-2">Официальный сервер Rust клана DST</p>
        </div>
      </footer>
    </div>
  );
}
