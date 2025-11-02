import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ClanMember {
  name: string;
  role: string;
  rank: string;
  avatar: string;
  stats: {
    raids: number;
    hours: number;
    kills: number;
  };
}

const leadership: ClanMember[] = [
  {
    name: 'DeathStrike',
    role: 'Основатель и лидер',
    rank: 'Commander',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    stats: { raids: 287, hours: 3450, kills: 1823 }
  },
  {
    name: 'ToxicWolf',
    role: 'Со-основатель',
    rank: 'Vice Commander',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80',
    stats: { raids: 245, hours: 3120, kills: 1567 }
  }
];

const officers: ClanMember[] = [
  {
    name: 'ShadowHunter',
    role: 'Офицер',
    rank: 'Captain',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80',
    stats: { raids: 198, hours: 2890, kills: 1345 }
  },
  {
    name: 'IronFist',
    role: 'Офицер',
    rank: 'Captain',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    stats: { raids: 176, hours: 2654, kills: 1289 }
  },
  {
    name: 'NightRaven',
    role: 'Рекрутер',
    rank: 'Lieutenant',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80',
    stats: { raids: 154, hours: 2341, kills: 1098 }
  }
];

const achievements = [
  {
    title: 'Лучший клан 2024',
    description: 'Победа в турнире "Битва кланов" 2024',
    icon: 'Trophy',
    color: 'text-yellow-500'
  },
  {
    title: '500+ членов',
    description: 'Один из крупнейших кланов на RU серверах',
    icon: 'Users',
    color: 'text-blue-500'
  },
  {
    title: '2 года активности',
    description: 'Основан в ноябре 2023 года',
    icon: 'Calendar',
    color: 'text-green-500'
  },
  {
    title: '10,000+ рейдов',
    description: 'Общая статистика клана за всё время',
    icon: 'Zap',
    color: 'text-red-500'
  }
];

const requirements = [
  'Возраст: 16+ лет',
  'Опыт игры: от 500 часов в Rust',
  'Наличие Discord и микрофона (обязательно)',
  'Активность: минимум 15 часов в неделю',
  'Знание механик PvP и рейдинга',
  'Командная игра и адекватное общение'
];

const benefits = [
  'Доступ к клановым ресурсам и складам',
  'Совместные рейды с опытными игроками',
  'Защита и поддержка в онлайн-режиме',
  'Обучение новичков тактике и стратегии',
  'Участие в турнирах и ивентах',
  'Закрытые каналы Discord и VIP роли'
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
                <p className="text-sm text-muted-foreground">Доминируем с 2023 года</p>
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
          <Badge className="mb-4 bg-red-600 text-lg px-4 py-2">EST. 2023</Badge>
          <h2 className="text-5xl font-bold mb-4">Death Strike Team</h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Мы не просто играем в Rust - мы доминируем. DST - это братство воинов, которые превращают каждый вайп в легенду.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Icon name="UserPlus" size={24} className="mr-2" />
              Вступить в клан
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="MessageSquare" size={24} className="mr-2" />
              Discord сервер
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Наши достижения</h3>
            <p className="text-muted-foreground">То, чем мы гордимся</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-border text-center">
                <CardHeader>
                  <div className={`w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${achievement.color}`}>
                    <Icon name={achievement.icon as any} size={32} className={achievement.color} />
                  </div>
                  <CardTitle className="text-xl">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Руководство клана</h3>
            <p className="text-muted-foreground">Легенды, которые ведут DST к победам</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {leadership.map((member, index) => (
              <Card key={index} className="border-2 border-red-600 bg-gradient-to-br from-red-600/5 to-red-600/10">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-20 h-20 rounded-full border-4 border-red-600"
                      />
                      <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-xs">
                        {member.rank}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{member.name}</CardTitle>
                      <CardDescription className="text-base">{member.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">{member.stats.raids}</div>
                      <div className="text-xs text-muted-foreground">Рейдов</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{member.stats.hours}</div>
                      <div className="text-xs text-muted-foreground">Часов</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{member.stats.kills}</div>
                      <div className="text-xs text-muted-foreground">Убийств</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {officers.map((member, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-3">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-16 h-16 rounded-full border-2 border-primary"
                      />
                      <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-xs">
                        {member.rank}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-sm">{member.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-red-600">{member.stats.raids}</div>
                      <div className="text-xs text-muted-foreground">Рейдов</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{member.stats.hours}</div>
                      <div className="text-xs text-muted-foreground">Часов</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{member.stats.kills}</div>
                      <div className="text-xs text-muted-foreground">Убийств</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="UserCheck" size={28} />
                  Требования для вступления
                </CardTitle>
                <CardDescription>Что нужно для того, чтобы стать частью DST</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Gift" size={28} />
                  Что вы получите
                </CardTitle>
                <CardDescription>Преимущества членства в клане DST</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="Star" size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-lg p-8 text-center">
          <Icon name="Target" size={64} className="mx-auto text-red-600 mb-4" />
          <h3 className="text-3xl font-bold mb-4">Наша философия</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            DST - это не просто клан, это семья. Мы ценим взаимопомощь, честность и стремление к победе. 
            Каждый член клана важен, и мы растём вместе, делясь опытом и поддерживая друг друга в любой ситуации.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-background/50 rounded-lg p-6">
              <Icon name="Swords" size={32} className="mx-auto text-red-600 mb-3" />
              <h4 className="font-bold mb-2">Сила в единстве</h4>
              <p className="text-sm text-muted-foreground">Вместе мы непобедимы</p>
            </div>
            <div className="bg-background/50 rounded-lg p-6">
              <Icon name="Heart" size={32} className="mx-auto text-red-600 mb-3" />
              <h4 className="font-bold mb-2">Уважение</h4>
              <p className="text-sm text-muted-foreground">К каждому игроку и его вкладу</p>
            </div>
            <div className="bg-background/50 rounded-lg p-6">
              <Icon name="TrendingUp" size={32} className="mx-auto text-red-600 mb-3" />
              <h4 className="font-bold mb-2">Развитие</h4>
              <p className="text-sm text-muted-foreground">Постоянное улучшение навыков</p>
            </div>
          </div>
        </section>

        <section className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-3xl">Готовы присоединиться?</CardTitle>
              <CardDescription className="text-base">
                Заполните форму на главной странице или свяжитесь с нами в Discord
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => window.location.href = '/'}
                >
                  <Icon name="UserPlus" size={24} className="mr-2" />
                  Подать заявку
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('https://discord.gg/dst', '_blank')}
                >
                  <Icon name="MessageSquare" size={24} className="mr-2" />
                  Discord
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-bold text-lg text-foreground mb-2">DST - Death Strike Team</p>
          <p>&copy; 2025 DST Clan. Все права защищены.</p>
          <p className="text-sm mt-2">Основан в ноябре 2023 • Официальный сервер Rust</p>
        </div>
      </footer>
    </div>
  );
}
