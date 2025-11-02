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
    name: 'Базовое продвижение',
    price: '499',
    duration: '7 дней',
    color: 'from-gray-600 to-gray-700',
    features: [
      'Закрепление объявления в топе',
      'Выделение яркой рамкой',
      'Показ в течение 7 дней',
      'Приоритет в поиске',
      'Значок "VIP" на объявлении'
    ]
  },
  {
    id: 'premium',
    name: 'Премиум продвижение',
    price: '999',
    duration: '14 дней',
    color: 'from-yellow-600 to-orange-600',
    popular: true,
    features: [
      'Все из базового пакета',
      'Закрепление в ТОП-3',
      'Анимированная рамка',
      'Показ в течение 14 дней',
      'Выделение на главной странице',
      'Значок "⭐ PREMIUM"',
      'Упоминание в новостях',
      'Приоритетная модерация'
    ]
  },
  {
    id: 'elite',
    name: 'Элитное продвижение',
    price: '1999',
    duration: '30 дней',
    color: 'from-purple-600 to-pink-600',
    features: [
      'Все из премиум пакета',
      'Закрепление в ТОП-1',
      'Максимальный охват аудитории',
      'Показ в течение 30 дней',
      'Баннер на главной странице',
      'Уникальная анимация',
      'Значок "👑 ELITE"',
      'Реклама в Discord сервере',
      'Публикация в социальных сетях',
      'Аналитика просмотров'
    ]
  }
];

const bonusFeatures = [
  {
    icon: 'TrendingUp',
    title: 'Больше просмотров',
    description: 'Ваш клан увидят в 10 раз больше игроков'
  },
  {
    icon: 'Users',
    title: 'Быстрый набор',
    description: 'Найдите напарников за считанные часы'
  },
  {
    icon: 'Star',
    title: 'Премиум статус',
    description: 'Выделитесь среди сотен объявлений'
  },
  {
    icon: 'Zap',
    title: 'Мгновенная активация',
    description: 'Продвижение начинается сразу после оплаты'
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
                <h1 className="text-2xl font-bold">VIP продвижение кланов</h1>
                <p className="text-sm text-muted-foreground">Привлеките больше игроков в свой клан</p>
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
          <h2 className="text-4xl font-bold mb-4">Продвиньте свой клан в топ</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            VIP продвижение обеспечит максимальную видимость вашего объявления и привлечёт лучших игроков
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
                      Купить продвижение
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Преимущества VIP продвижения</h3>
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

        <section className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <Icon name="Info" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Как это работает?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  1
                </div>
                <h4 className="font-bold mb-2">Создайте объявление</h4>
                <p className="text-sm text-muted-foreground">
                  Опубликуйте информацию о вашем клане
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  2
                </div>
                <h4 className="font-bold mb-2">Выберите пакет</h4>
                <p className="text-sm text-muted-foreground">
                  Подберите подходящий тариф продвижения
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  3
                </div>
                <h4 className="font-bold mb-2">Получайте заявки</h4>
                <p className="text-sm text-muted-foreground">
                  Ваше объявление в топе — игроки сами найдут вас
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-bold text-center mb-8">Часто задаваемые вопросы</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Когда начнётся продвижение?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Продвижение активируется сразу после оплаты. Ваше объявление автоматически попадает в топ в течение 5 минут.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Можно ли продлить продвижение?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Да, вы можете продлить любой пакет в любое время. При продлении до окончания текущего периода время суммируется.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Что если я не наберу игроков?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  VIP продвижение гарантирует максимальную видимость вашего объявления. В 95% случаев кланы находят игроков в первые 2-3 дня.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
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
