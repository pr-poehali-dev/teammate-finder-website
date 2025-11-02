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
    title: 'Запуск платформы поиска тиммейтов!',
    date: '2025-11-02',
    category: 'Важное',
    isImportant: true,
    content: 'Мы рады объявить о запуске новой платформы для поиска напарников в Rust! Теперь вы можете создавать объявления, указывать свои требования и находить идеальных тиммейтов за считанные часы. Платформа работает в режиме модерации для вашей безопасности.',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80'
  },
  {
    id: 2,
    title: 'VIP продвижение для кланов уже доступно',
    date: '2025-11-01',
    category: 'VIP',
    content: 'Представляем новую услугу — VIP продвижение объявлений! Поднимите свой клан в топ и привлеките лучших игроков. Три тарифа на выбор: Базовое (499₽), Премиум (999₽) и Элитное (1999₽) продвижение. Максимальная видимость и быстрый набор гарантированы!',
    image: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&q=80'
  },
  {
    id: 3,
    title: 'Клан DST открывает набор!',
    date: '2025-10-30',
    category: 'Набор',
    isImportant: true,
    content: 'Death Strike Team ищет новых бойцов! Требования: 3000+ часов, знание всех RT, возраст 16+, онлайн 6+ часов в день. Мы предлагаем дружелюбный коллектив, совместные рейды и развитие навыков. Присоединяйся к легенде!',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'
  },
  {
    id: 4,
    title: 'Новые правила модерации объявлений',
    date: '2025-10-28',
    category: 'Правила',
    content: 'Для обеспечения качества объявлений мы ввели систему модерации. Все новые объявления проверяются в течение 2-4 часов. Запрещены: мат, спам, фейковые контакты, реклама сторонних сервисов. Нарушители получают бан навсегда.',
  },
  {
    id: 5,
    title: 'Топ-5 советов по поиску тиммейтов',
    date: '2025-10-25',
    category: 'Советы',
    content: '1) Подробно опишите свой опыт и цели. 2) Укажите точное время онлайна. 3) Будьте честны о своём уровне игры. 4) Откликайтесь быстро на заявки. 5) Используйте VIP продвижение для ускорения поиска. Следуя этим советам, вы найдёте напарников в разы быстрее!',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
  },
  {
    id: 6,
    title: 'Статистика платформы за первую неделю',
    date: '2025-10-20',
    category: 'Статистика',
    content: 'За первую неделю работы платформы: создано 127 объявлений, 89 одобрено, найдено 230+ тиммейтов, 15 кланов используют VIP продвижение. Средний срок поиска напарников — 2.3 дня. Спасибо за доверие!',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=800&q=80'
  },
  {
    id: 7,
    title: 'Discord-интеграция в разработке',
    date: '2025-10-15',
    category: 'Обновления',
    content: 'Мы работаем над интеграцией с Discord! Скоро вы сможете получать уведомления о новых заявках прямо в Discord, автоматически проверять игроков и управлять объявлениями через бота. Релиз запланирован на конец месяца.',
  },
  {
    id: 8,
    title: 'Борьба с мультиаккаунтами',
    date: '2025-10-10',
    category: 'Безопасность',
    content: 'Мы внедрили систему защиты от мультиаккаунтов и спама. Каждый пользователь может создавать не более 3 активных объявлений одновременно. Повторные нарушения правил ведут к перманентному бану по IP и устройству.',
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
      'Набор': 'bg-green-600',
      'Правила': 'bg-purple-600',
      'Советы': 'bg-blue-600',
      'Статистика': 'bg-orange-600',
      'Обновления': 'bg-cyan-600',
      'Безопасность': 'bg-pink-600'
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
                <h1 className="text-2xl font-bold">Новости платформы</h1>
                <p className="text-sm text-muted-foreground">Актуальные обновления</p>
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
            Следите за обновлениями и новостями платформы поиска тиммейтов
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
                  VIP продвижение
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
                  onClick={() => window.location.href = '/'}
                >
                  <Icon name="Users" size={20} className="mr-2" />
                  Найти тиммейтов
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Объявлений создано</span>
                    <span className="font-bold">127</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[70%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Игроков нашли пару</span>
                    <span className="font-bold">230+</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">VIP кланов</span>
                    <span className="font-bold">15</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[35%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" size={24} />
                  Совет дня
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Используйте VIP продвижение для закрепления вашего объявления в топе. Это увеличивает шансы найти идеальных тиммейтов в 10 раз!
                </p>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => window.location.href = '/vip'}
                >
                  Узнать больше
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Платформа поиска тимейтов Rust. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
