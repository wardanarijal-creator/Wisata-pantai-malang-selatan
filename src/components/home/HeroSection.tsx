import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Waves } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
          alt="Pantai Malang Selatan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <Waves className="h-20 w-20 text-primary" />
      </div>
      <div className="absolute bottom-40 right-20 opacity-20 animate-float" style={{ animationDelay: "2s" }}>
        <Waves className="h-16 w-16 text-accent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border mb-6 animate-fade-up">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Malang Selatan, Jawa Timur</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Eksplor Wisata, UMKM &{" "}
            <span className="text-gradient-ocean">Layanan Lokal</span>{" "}
            Pantai Malang Selatan
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Temukan keindahan pantai eksotis, produk UMKM pesisir, dan berbagai layanan
            lokal di kawasan wisata Malang Selatan
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="gradient-ocean text-white border-0 shadow-glow">
              <Link to="/wisata" className="gap-2">
                Jelajahi Pantai
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-background/80 backdrop-blur-sm">
              <Link to="/toko/produk">
                Lihat Produk Lokal
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">12+</div>
              <div className="text-sm text-muted-foreground">Destinasi Pantai</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Produk UMKM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sunset">20+</div>
              <div className="text-sm text-muted-foreground">Layanan Lokal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
