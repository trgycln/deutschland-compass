import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, MessageSquare, AlertTriangle, HeartHandshake, Lock } from 'lucide-react';

export default function CommunityRulesPage() {
  const rules = [
    {
      icon: HeartHandshake,
      title: "Saygı ve Profesyonellik",
      description: "Deutschland Compass, profesyonellerden oluşan seçkin bir topluluktur. Tüm üyelerimizin birbirleriyle olan iletişimlerinde nezaket, saygı ve profesyonellik kurallarına uymasını bekleriz. Ayrımcı, kırıcı veya saldırgan bir dil kesinlikle kabul edilemez."
    },
    {
      icon: MessageSquare,
      title: "Doğru Bilgi ve Sorumluluk",
      description: "Paylaşılan tecrübelerin ve bilgilerin doğruluğu hayati önem taşır. Lütfen emin olmadığınız konularda kesin ifadelerden kaçının. Kişisel tecrübelerinizi aktarırken bunun 'genel bir kural' değil, 'şahsi bir deneyim' olduğunu belirtmeye özen gösterin."
    },
    {
      icon: Lock,
      title: "Gizlilik ve Mahremiyet",
      description: "Burası Kapalı Devre (Closed User Group) bir platformdur. Burada paylaşılan hassas bilgilerin, kişisel verilerin veya topluluk içi tartışmaların platform dışına taşınmaması esastır. Diğer üyelerin mahremiyetine saygı gösterin."
    },
    {
      icon: AlertTriangle,
      title: "Ticari Faaliyet ve Spam",
      description: "Platformumuzun amacı yardımlaşma ve bilgi paylaşımıdır. İzinsiz reklam, ürün tanıtımı, ticari kazanç amaçlı yönlendirmeler veya spam niteliğindeki paylaşımlar yasaktır."
    },
    {
      icon: Users,
      title: "Yapıcı Katkı",
      description: "Eleştirilerinizde yapıcı olmaya özen gösterin. Amacımız birbirimizi aşağı çekmek değil, Almanya'daki kariyer yolculuğumuzda birbirimize omuz vermektir. Sorunlara değil, çözümlere odaklanın."
    },
    {
      icon: Shield,
      title: "Yasal Uyumluluk",
      description: "Almanya ve Türkiye yasalarına aykırı, telif haklarını ihlal eden veya illegal aktiviteleri teşvik eden içeriklerin paylaşılması kesinlikle yasaktır."
    }
  ];

  return (
    <div className="min-h-screen bg-secondary dark:bg-slate-950 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-primary dark:text-white">Topluluk Kuralları</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Deutschland Compass, güvenli ve destekleyici bir ortam sağlamayı taahhüt eder. 
            Bu topluluğun bir parçası olarak, aşağıdaki değerleri kabul etmiş sayılırsınız.
          </p>
        </div>

        <div className="grid gap-6">
          {rules.map((rule, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-slate-900">
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="p-3 rounded-full bg-secondary dark:bg-slate-800 text-primary dark:text-accent">
                  <rule.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl text-primary dark:text-white">{rule.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pl-[5.5rem]">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {rule.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-primary/5 dark:bg-slate-800/50 rounded-xl border border-primary/10 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Bu kuralların ihlali durumunda, site yönetimi ilgili içeriği kaldırma ve üyenin erişimini kısıtlama hakkını saklı tutar. 
            Bir ihlal fark ederseniz, lütfen bizimle iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  );
}
