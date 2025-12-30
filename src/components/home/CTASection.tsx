import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-ocean opacity-90" />
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover mix-blend-overlay opacity-30"
        />
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Punya Pertanyaan atau Ingin Bermitra?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Hubungi kami untuk informasi lebih lanjut tentang wisata, kerjasama UMKM,
            atau pendaftaran layanan di Pantai Malang Selatan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              <a
                href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20informasi%20wisata%20Pantai%20Malang%20Selatan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Chat WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white text-white bg-white/10 hover:bg-white/20 hover:text-white"
            >
              <Link to="/kontak">
                <Mail className="h-5 w-5" />
                Kirim Pesan
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
