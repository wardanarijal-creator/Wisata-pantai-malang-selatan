import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredBeaches = [
  {
    slug: "balekambang",
    name: "Pantai Balekambang",
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?q=80&w=2574&auto=format&fit=crop",
    description: "Pantai ikonik dengan pura di atas batu karang",
    location: "Kec. Bantur",
  },
  {
    slug: "goa-cina",
    name: "Pantai Goa Cina",
    image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=2072&auto=format&fit=crop",
    description: "Pantai cantik dengan goa alami yang eksotis",
    location: "Kec. Sumbermanjing Wetan",
  },
  {
    slug: "tiga-warna",
    name: "Pantai Tiga Warna",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    description: "Surga snorkeling dengan gradasi warna laut",
    location: "Kec. Sumbermanjing Wetan",
  },
  {
    slug: "sendiki",
    name: "Pantai Sendiki",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2070&auto=format&fit=crop",
    description: "Pantai tersembunyi dengan suasana tenang",
    location: "Kec. Sumbermanjing Wetan",
  },
];

export function FeaturedBeaches() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Destinasi Populer
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Pantai Unggulan Malang Selatan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jelajahi keindahan pantai-pantai eksotis di kawasan Malang Selatan
            yang siap memanjakan mata dan jiwa Anda
          </p>
        </div>

        {/* Beach Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBeaches.map((beach, index) => (
            <Link
              key={beach.slug}
              to={`/wisata/${beach.slug}`}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full bg-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={beach.image}
                    alt={beach.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                      {beach.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {beach.location}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {beach.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/wisata">
              Lihat Semua Pantai
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
