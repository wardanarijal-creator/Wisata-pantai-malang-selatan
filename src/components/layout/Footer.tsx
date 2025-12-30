import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const footerLinks = {
  wisata: [
    { href: "/wisata/balekambang", label: "Pantai Balekambang" },
    { href: "/wisata/goa-cina", label: "Pantai Goa Cina" },
    { href: "/wisata/sendiki", label: "Pantai Sendiki" },
    { href: "/wisata/tiga-warna", label: "Pantai Tiga Warna" },
  ],
  layanan: [
    { href: "/toko/produk", label: "Produk UMKM" },
    { href: "/toko/brilink", label: "Agen BRILink" },
    { href: "/toko/sewa", label: "Penyewaan Alat" },
  ],
  info: [
    { href: "/blog", label: "Blog & Artikel" },
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/kontak", label: "Hubungi Kami" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-ocean flex items-center justify-center">
                <span className="text-xl">🏖️</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight">
                  Pantai Malang
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  Selatan
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Portal informasi wisata pantai di wilayah Malang Selatan, Jawa Timur.
              Eksplor keindahan pantai, UMKM lokal, dan layanan pesisir.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Wisata Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Wisata Populer</h3>
            <ul className="space-y-2">
              {footerLinks.wisata.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-display font-semibold text-lg mb-4 mt-6">Informasi</h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Kabupaten Malang, Jawa Timur, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="tel:+6281234567890"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="mailto:info@pantaimalangselatan.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  info@pantaimalangselatan.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Info Pantai Malang Selatan. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/kebijakan-privasi" className="hover:text-primary transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/syarat-ketentuan" className="hover:text-primary transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
