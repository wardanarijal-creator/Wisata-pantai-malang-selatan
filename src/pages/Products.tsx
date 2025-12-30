import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingBag, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`*, categories(name, slug)`)
        .eq("is_available", true)
        .order("is_featured", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("type", "product");
      if (error) throw error;
      return data;
    },
  });

  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number | null) => {
    if (!price) return "Hubungi Kami";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = (product: (typeof products)[0]) => {
    const phone = product.whatsapp_number || "6281234567890";
    const message = `Halo, saya tertarik dengan produk:\n\n*${product.name}*\n${product.price_text || formatPrice(product.price)}\n\nApakah masih tersedia?`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/20 via-background to-sunset/10">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <ShoppingBag className="h-4 w-4" />
              Produk UMKM Pesisir
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Oleh-oleh & Produk Lokal
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Dukung UMKM lokal dengan membeli produk khas Pantai Malang Selatan
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      {categories && categories.length > 0 && (
        <section className="py-6 border-b">
          <div className="container px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                Semua
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-16">
        <div className="container px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Tidak ada produk yang ditemukan
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts?.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        product.featured_image ||
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.is_featured && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-sunset text-white text-xs font-medium rounded-full">
                        Unggulan
                      </span>
                    )}
                    {product.categories && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-background/80 text-foreground text-xs font-medium rounded-full">
                        {product.categories.name}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold text-lg mb-3">
                      {product.price_text || formatPrice(product.price)}
                    </p>
                    <Button
                      onClick={() => handleWhatsAppOrder(product)}
                      className="w-full gap-2"
                      size="sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Pesan via WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
