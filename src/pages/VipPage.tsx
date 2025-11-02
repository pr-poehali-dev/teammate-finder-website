import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface VipTier {
  id: string;
  name: string;
  price: string;
  duration: string;
  color: string;
  popular?: boolean;
  features: string[];
}

const vipTiers: VipTier[] = [
  {
    id: 'basic',
    name: 'VIP Basic',
    price: '299',
    duration: '30 дней',
    color: 'from-gray-600 to-gray-700',
    features: [
      'Ускоренный сбор ресурсов x1.5',
      'Набор стартовых ресурсов',
      'Цветной ник в чате',
      'Доступ к VIP-командам',
      'Приоритет в очереди на вход',
      '2 дополнительных слота в рюкзаке'
    ]
  },
  {
    id: 'premium',
    name: 'VIP Premium',
    price: '599',
    duration: '30 дней',
    color: 'from-yellow-600 to-orange-600',
    popular: true,
    features: [
      'Все из VIP Basic',
      'Ускоренный сбор ресурсов x2',
      'Уникальные скины оружия (5 шт)',
      'Телепортация домой /home (3 точки)',
      'Набор строительных материалов',
      'Снятие ограничения на рюкзак',
      'Команда /kit premium каждые 12ч',
      'Эксклюзивный Discord роль'
    ]
  },
  {
    id: 'elite',
    name: 'VIP Elite',
    price: '999',
    duration: '30 дней',
    color: 'from-purple-600 to-pink-600',
    features: [
      'Все из VIP Premium',
      'Ускоренный сбор ресурсов x2.5',
      'Уникальные скины оружия (15 шт)',
      'Эксклюзивные скины одежды',
      'Персональный мини-вертолёт',
      'Телепортация /home (10 точек)',
      'Доступ к секретным локациям',
      'Команда /kit elite каждые 6ч',
      'Личный банк на 50 слотов',
      'Неограниченный рюкзак',
      'Приоритетная тех. поддержка'
    ]
  }
];

const bonusFeatures = [
  {
    icon: 'Zap',
    title: 'Мгновенная активация',
    description: 'VIP активируется сразу после оплаты'
  },
  {
    icon: 'Shield',
    title: 'Защита базы',
    description: 'Дополнительные слои защиты для VIP игроков'
  },
  {
    icon: 'Gift',
    title: 'Ежедневные бонусы',
    description: 'Получайте ресурсы каждый день'
  },
  {
    icon: 'Users',
    title: 'VIP сообщество',
    description: 'Закрытый канал в Discord для VIP'
  }
];

export default function VipPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePurchase = (tierId: string, tierName: string) => {
    setSelectedTier(tierId);
    toast({
      title: 'Перенаправление на оплату',
      description: `Вы выбрали ${tierName}. Сейчас откроется страница оплаты...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Icon name="Crown" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">VIP услуги DST</h1>
                <p className="text-sm text-muted-foreground">Эксклюзивные привилегии сервера</p>
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

      <section className="bg-gradient-to-br from-primary/20 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-yellow-600">Специальное предложение</Badge>
          <h2 className="text-4xl font-bold mb-4">Получите преимущество в игре</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            VIP статус на сервере Rust клана DST - это ускоренное развитие, эксклюзивный контент и особые привилегии
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {vipTiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`relative overflow-hidden border-2 ${
                tier.popular ? 'border-yellow-600 shadow-xl scale-105' : 'border-border'
              }`}
            >
              {tier.popular && (
                <Badge className="absolute top-4 right-4 bg-yellow-600 z-10">
                  Популярный
                </Badge>
              )}
              
              <div className={`h-32 bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                <Icon name="Crown" size={64} className="text-white opacity-90" />
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">{tier.price}₽</span>
                  <span className="text-muted-foreground ml-2">/ {tier.duration}</span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handlePurchase(tier.id, tier.name)}
                  className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90`}
                  disabled={selectedTier === tier.id}
                >
                  {selectedTier === tier.id ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Купить VIP
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Дополнительные преимущества</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bonusFeatures.map((feature, index) => (
              <Card key={index} className="border-border text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={feature.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-red-600">Ограниченное предложение</Badge>
              <h3 className="text-3xl font-bold mb-4">Распродажа VIP -30%</h3>
              <p className="text-muted-foreground mb-6">
                С 5 по 7 ноября скидка 30% на все VIP пакеты! Не упустите шанс получить максимальные привилегии по лучшей цене.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">2</div>
                  <div className="text-sm text-muted-foreground">дня</div>
                </div>
                <div className="text-3xl">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">14</div>
                  <div className="text-sm text-muted-foreground">часов</div>
                </div>
                <div className="text-3xl">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">37</div>
                  <div className="text-sm text-muted-foreground">минут</div>
                </div>
              </div>
            </div>
            <div className="bg-background/50 rounded-lg p-6">
              <h4 className="font-bold text-xl mb-4">Часто задаваемые вопросы</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">Как активировать VIP?</p>
                  <p className="text-sm text-muted-foreground">VIP активируется автоматически в течение 5 минут после оплаты на вашем игровом аккаунте.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Можно ли продлить VIP?</p>
                  <p className="text-sm text-muted-foreground">Да, вы можете продлить VIP в любой момент. Время суммируется.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Сохраняется ли VIP после вайпа?</p>
                  <p className="text-sm text-muted-foreground">Да, VIP статус сохраняется и работает на всех вайпах до окончания срока действия.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <Card className="border-2 border-primary max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Icon name="HelpCircle" size={28} />
                Нужна помощь?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Есть вопросы по VIP услугам? Наша команда поддержки клана DST готова помочь!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://discord.gg/dst', '_blank')}
                >
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Discord поддержка
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://t.me/dst_support', '_blank')}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Telegram
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
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
