import { Link } from "react-router-dom";
import { ShoppingBag, CreditCard, Tent, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: ShoppingBag,
    title: "Produk UMKM Pesisir",
    description:
      "Oleh-oleh khas pantai, olahan makanan laut, kerajinan tangan, dan merchandise lokal",
    href: "/toko/produk",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: CreditCard,
    title: "Agen BRILink",
    description:
      "Layanan tarik tunai, transfer antar bank, pembayaran tagihan, dan top up e-wallet",
    href: "/toko/brilink",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Tent,
    title: "Penyewaan Alat",
    description:
      "Sewa alat camping, alat wisata pantai, peralatan snorkeling, dan perlengkapan event",
    href: "/toko/sewa",
    color: "text-sunset",
    bgColor: "bg-sunset/10",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Layanan & Produk
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Layanan Lokal Terpercaya
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dukung UMKM lokal dan nikmati kemudahan layanan di kawasan wisata
            Pantai Malang Selatan
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30"
              >
                <CardHeader className="pb-2">
                  <div
                    className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`h-7 w-7 ${service.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-xl">
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto gap-1">
                    <Link to={service.href}>
                      Lihat Selengkapnya
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
