import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const requirements = [
  '🎮 3000+ часов в игре на одном аккаунте',
  '🛡️ Знания всех рейдтоннелей (RT)',
  '🔞 Возраст от 16 лет',
  '⏱️ Онлайн минимум 6 часов в день',
  '🧠 Полное понимание механик игры',
  '😊 Адекватность и позитивный настрой'
];

const benefits = [
  '🔥 Дружелюбный и активный коллектив',
  '🎮 Совместные рейды, турниры и события',
  '🌍 Игра на лучших серверах',
  '🤝 Поддержка и развитие навыков',
  '🎉 Веселье, позитив и хорошее настроение!'
];

const whyUs = [
  '⭐ Опытные и дружелюбные лидеры',
  '🎯 Организация рейдов и мероприятий',
  '📚 Обучение новичков',
  '🔥 Активное и веселое сообщество'
];

export default function ClanPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Клан DST</h1>
                <p className="text-sm text-muted-foreground">Death Strike Team</p>
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

      <section className="relative bg-gradient-to-br from-destructive/30 to-destructive/10 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-6">
            <span className="text-6xl">⭐🚀</span>
          </div>
          <h2 className="text-5xl font-bold mb-6">ВНИМАНИЕ! НАБОР В КЛАНЕ DST!</h2>
          <p className="text-3xl font-bold text-primary mb-4">
            🔥🔥 Ты готов стать частью легенды? 🔥🔥
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Мы — команда, где каждый важен!<br />
            Объединяемся для крутых рейдов, побед и незабываемых эмоций!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
              <Icon name="UserPlus" size={24} className="mr-2" />
              ПРИСОЕДИНЯЙСЯ СЮДА
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => window.open('https://discord.gg/qcu8n8rRg6', '_blank')}
            >
              <Icon name="MessageSquare" size={24} className="mr-2" />
              Discord сервер
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="text-center mb-12">
            <span className="text-5xl mb-4 block">🎯</span>
            <h3 className="text-4xl font-bold mb-4">Что ты получишь, присоединившись к нам?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 border-primary/20 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <p className="text-lg font-medium text-center">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <span className="text-5xl mb-4 block">💥</span>
            <h3 className="text-4xl font-bold mb-4">Что требуется от тебя?</h3>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Требования к кандидатам</CardTitle>
                <CardDescription className="text-center text-base">
                  *Исключения для талантов — приветствуются!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-lg">
                      <Icon name="Check" size={24} className="text-green-500 flex-shrink-0 mt-1" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <span className="text-5xl mb-4 block">🌈</span>
            <h3 className="text-4xl font-bold mb-4">Почему выбирают именно нас?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((reason, index) => (
              <Card key={index} className="border-border text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <p className="text-lg font-medium">{reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-lg p-12 text-center">
          <span className="text-6xl mb-6 block">🚀</span>
          <h3 className="text-4xl font-bold mb-6">Не упусти свой шанс!</h3>
          <p className="text-2xl mb-8 text-muted-foreground">
            Вступай прямо сейчас и стань частью нашей истории!
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-xl px-12 py-8"
            onClick={() => window.open('https://discord.gg/qcu8n8rRg6', '_blank')}
          >
            <Icon name="Sparkles" size={28} className="mr-3" />
            ПРИСОЕДИНЯЙСЯ К DST
            <Icon name="Sparkles" size={28} className="ml-3" />
          </Button>
        </section>

        <section className="mt-16">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="text-center">
                <span className="text-5xl mb-4 block">✨</span>
                <CardTitle className="text-3xl mb-2">Ждём именно тебя!</CardTitle>
                <CardDescription className="text-xl">
                  Вперёд к новым вершинам! ✨
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <p className="text-center text-lg text-muted-foreground max-w-2xl">
                  Death Strike Team — это не просто клан, это братство единомышленников, которые вместе покоряют Rust. Присоединяйся к нам и стань легендой!
                </p>
                <div className="flex gap-4 mt-4">
                  <a 
                    href="https://discord.gg/qcu8n8rRg6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      <Icon name="MessageCircle" size={24} className="mr-2" />
                      Открыть Discord
                    </Button>
                  </a>
                  <Button size="lg" variant="outline" onClick={() => window.location.href = '/'}>
                    <Icon name="Users" size={24} className="mr-2" />
                    Найти тиммейтов
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Клан Death Strike Team © 2025
            </p>
            <p className="text-xs text-muted-foreground">
              Discord: <a href="https://discord.gg/qcu8n8rRg6" className="text-primary hover:underline">https://discord.gg/qcu8n8rRg6</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
