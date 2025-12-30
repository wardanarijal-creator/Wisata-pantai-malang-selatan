import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, MapPin } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Promosi Wisata Lokal",
      description:
        "Memperkenalkan keindahan pantai-pantai tersembunyi di Malang Selatan kepada wisatawan domestik dan mancanegara.",
    },
    {
      icon: Users,
      title: "Pemberdayaan UMKM",
      description:
        "Mendukung pelaku usaha mikro, kecil, dan menengah di kawasan pesisir untuk memasarkan produk dan layanan mereka.",
    },
    {
      icon: Target,
      title: "Informasi Akurat",
      description:
        "Menyediakan informasi wisata yang lengkap, akurat, dan terkini untuk membantu perencanaan perjalanan wisatawan.",
    },
    {
      icon: MapPin,
      title: "Konektivitas Lokal",
      description:
        "Menghubungkan wisatawan dengan layanan lokal seperti transportasi, penginapan, dan pemandu wisata.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/20 via-background to-accent/10">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Tentang Kami
            </h1>
            <p className="text-lg text-muted-foreground">
              Info Pantai Malang Selatan adalah portal informasi wisata yang
              didedikasikan untuk mempromosikan keindahan pantai di pesisir
              selatan Kabupaten Malang, Jawa Timur.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-bold mb-4 text-primary">
                  Visi
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi platform digital terdepan dalam mempromosikan wisata
                  pantai Malang Selatan dan memberdayakan ekonomi masyarakat
                  pesisir melalui teknologi.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-bold mb-4 text-accent">
                  Misi
                </h2>
                <ul className="text-muted-foreground space-y-2">
                  <li>
                    • Menyediakan informasi wisata pantai yang lengkap dan
                    akurat
                  </li>
                  <li>• Memfasilitasi promosi produk UMKM lokal</li>
                  <li>• Menghubungkan wisatawan dengan layanan lokal</li>
                  <li>• Mendukung pariwisata berkelanjutan</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Nilai-nilai Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen untuk memberikan kontribusi positif bagi
              pariwisata dan ekonomi lokal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Area */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold mb-4">
                Cakupan Wilayah
              </h2>
              <p className="text-muted-foreground">
                Kami mencakup 12 pantai eksotis di sepanjang pesisir selatan
                Kabupaten Malang
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  "Pantai Balekambang",
                  "Pantai Goa Cina",
                  "Pantai Tiga Warna",
                  "Pantai Sendang Biru",
                  "Pantai Kondang Merak",
                  "Pantai Batu Bengkung",
                  "Pantai Watu Leter",
                  "Pantai Ngliyep",
                  "Pantai Jonggring Saloko",
                  "Pantai Bajul Mati",
                  "Pantai Teluk Asmara",
                  "Pantai Licin",
                ].map((beach, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{beach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Mari Berkolaborasi
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Apakah Anda pelaku UMKM, penyedia layanan wisata, atau ingin
            bermitra dengan kami? Hubungi kami untuk peluang kerjasama.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20untuk%20berkolaborasi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </Layout>
  );
}
