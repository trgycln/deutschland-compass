import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Utensils, AlertTriangle, Info, Car, CheckCircle2 } from "lucide-react";
import { foodGuideData, travelTips } from "@/data/food-guide";

export const metadata = {
  title: "Helal Mekanlar ve Gezi Rehberi | Deutschland Compass",
  description: "Avrupa genelinde gönül rahatlığıyla yemek yiyebileceğiniz mekanlar ve seyahat ipuçları.",
};

export default function HalalPlacesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Gönül Rahatlığıyla <span className="text-accent">Lezzet Rehberi</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Bu rehber, mahsursuz et ürünleri (helallik kriterlerine uygunluk) bulundurduğu düşünülen 
              ve topluluğumuz tarafından tavsiye edilen mekanları içerir. Önceliğimiz lezzet değil, manevi hassasiyettir.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Hassasiyet Uyarısı */}
        <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-800 dark:text-amber-200 font-bold mb-2">Önemli Hatırlatma</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300 space-y-2">
            <p>
              Paylaşılan bir mekanın listede olması, orayı %100 garantili kılmaz. İşletmeler el değiştirebilir veya tedarikçilerini değiştirebilir.
            </p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Lütfen sipariş vermeden önce <strong>kendi ölçülerinize göre teyit ediniz</strong>.</li>
              <li>Alkol satılan veya domuz eti bulunan mekanlarda çapraz bulaşma riskine dikkat ediniz.</li>
              <li>Mümkünse helal sertifikasını görmeyi talep ediniz.</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Mekanlar Listesi */}
        <Tabs defaultValue="Almanya" className="w-full">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Utensils className="w-6 h-6 text-accent" />
              Mekan Tavsiyeleri
            </h2>
            <TabsList className="bg-secondary">
              <TabsTrigger value="Almanya">Almanya</TabsTrigger>
              <TabsTrigger value="Avrupa">Diğer Avrupa</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(foodGuideData).map(([countryKey, regions]) => (
            <TabsContent key={countryKey} value={countryKey} className="space-y-8 animate-in fade-in-50">
              {regions.map((region, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2 border-border text-foreground/80">
                    {region.title}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {region.cities.map((cityGroup, cIdx) => (
                      <Card key={cIdx} className="bg-card hover:border-accent/50 transition-colors h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="bg-secondary/50 font-semibold">
                              <MapPin className="w-3 h-3 mr-1" /> {cityGroup.city}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {cityGroup.places.map((place, pIdx) => (
                            <div key={pIdx} className="border-b last:border-0 border-border/50 pb-3 last:pb-0">
                              <h4 className="font-bold text-primary dark:text-primary-foreground text-lg">
                                {place.name}
                              </h4>
                              <p className="text-sm font-medium text-accent-foreground/80 mb-1">
                                {place.food}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-start gap-1.5">
                                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600/70" />
                                {place.note}
                              </p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Seyahat İpuçları */}
        <section className="bg-secondary/30 dark:bg-secondary/10 rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Car className="w-6 h-6 text-accent" />
            Seyahat ve Gezi İpuçları
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {travelTips.map((tip, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold text-lg text-primary dark:text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-accent" /> {tip.title}
                </h3>
                <ul className="space-y-2">
                  {tip.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent/30">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}