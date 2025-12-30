import { Link } from "react-router-dom";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    slug: "tips-wisata-pantai-aman",
    title: "Tips Wisata Pantai yang Aman dan Menyenangkan",
    excerpt:
      "Panduan lengkap untuk menikmati wisata pantai dengan aman bersama keluarga",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop",
    category: "Tips",
    author: "Admin",
    date: "20 Des 2024",
  },
  {
    slug: "kuliner-khas-pesisir-malang",
    title: "Kuliner Khas Pesisir Malang Selatan yang Wajib Dicoba",
    excerpt:
      "Jelajahi cita rasa autentik makanan laut segar dari nelayan lokal",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2081&auto=format&fit=crop",
    category: "Kuliner",
    author: "Admin",
    date: "18 Des 2024",
  },
  {
    slug: "tradisi-petik-laut",
    title: "Tradisi Petik Laut: Warisan Budaya Nelayan Malang Selatan",
    excerpt:
      "Mengenal lebih dekat tradisi tahunan masyarakat pesisir Malang Selatan",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    category: "Budaya",
    author: "Admin",
    date: "15 Des 2024",
  },
];

export function LatestArticles() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-sunset/10 text-sunset text-sm font-medium mb-4">
              Blog & Artikel
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Artikel Terbaru
            </h2>
          </div>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/blog">
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full bg-card">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
