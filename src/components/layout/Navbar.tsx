import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/wisata", label: "Wisata Pantai" },
  { href: "/blog", label: "Blog" },
  {
    label: "Toko & Layanan",
    children: [
      { href: "/toko/produk", label: "Produk UMKM" },
      { href: "/toko/brilink", label: "Agen BRILink" },
      { href: "/toko/sewa", label: "Penyewaan Alat" },
    ],
  },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gradient-ocean flex items-center justify-center shadow-glow">
              <span className="text-xl">🏖️</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-display font-bold text-lg leading-tight transition-colors",
                isScrolled ? "text-foreground" : "text-primary"
              )}>
                Pantai Malang
              </span>
              <span className={cn(
                "text-xs leading-tight transition-colors",
                isScrolled ? "text-muted-foreground" : "text-foreground/70"
              )}>
                Selatan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "gap-1 font-medium",
                        isScrolled ? "text-foreground" : "text-foreground"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {link.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link
                          to={child.href}
                          className={cn(
                            "w-full cursor-pointer",
                            isActive(child.href) && "text-primary font-medium"
                          )}
                        >
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.href}
                  to={link.href!}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-colors",
                    isActive(link.href!)
                      ? "text-primary bg-primary/10"
                      : isScrolled
                      ? "text-foreground hover:text-primary hover:bg-muted"
                      : "text-foreground hover:text-primary hover:bg-background/20"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                "rounded-full",
                isScrolled ? "" : "text-foreground"
              )}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn("lg:hidden", isScrolled ? "" : "text-foreground")}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-up">
            <div className="flex flex-col gap-2 bg-card rounded-xl p-4 shadow-lg">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="space-y-1">
                    <span className="px-4 py-2 font-medium text-muted-foreground text-sm">
                      {link.label}
                    </span>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-6 py-2 rounded-lg transition-colors",
                          isActive(child.href)
                            ? "text-primary bg-primary/10 font-medium"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href!}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-2 rounded-lg transition-colors",
                      isActive(link.href!)
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
