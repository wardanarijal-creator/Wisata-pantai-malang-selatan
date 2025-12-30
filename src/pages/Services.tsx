import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, CreditCard, Tent, MapPin, Clock, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_available", true)
        .order("is_featured", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const brilinkServices = services?.filter(
    (s) => s.service_type === "brilink"
  );
  const rentalServices = services?.filter((s) => s.service_type === "rental");

  const filteredBrilink = brilinkServices?.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRental = rentalServices?.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsAppContact = (service: (typeof services)[0]) => {
    const phone = service.whatsapp_number || "6281234567890";
    const message = `Halo, saya ingin bertanya tentang layanan *${service.name}*`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const ServiceCard = ({ service }: { service: (typeof services)[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <img
          src={
            service.featured_image ||
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
          }
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {service.is_featured && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            Rekomendasi
          </span>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-display font-semibold text-lg">{service.name}</h3>
        {service.location && (
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" />
            <span>{service.location}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {service.description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {service.description}
          </p>
        )}

        {service.services_offered && service.services_offered.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {service.services_offered.slice(0, 3).map((offered, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {offered}
              </Badge>
            ))}
            {service.services_offered.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{service.services_offered.length - 3} lainnya
              </Badge>
            )}
          </div>
        )}

        {service.opening_hours && (
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <Clock className="h-4 w-4" />
            <span>{service.opening_hours}</span>
          </div>
        )}

        <Button
          onClick={() => handleWhatsAppContact(service)}
          className="w-full gap-2"
          size="sm"
        >
          <MessageCircle className="h-4 w-4" />
          Hubungi via WhatsApp
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-accent/20 via-background to-primary/10">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Layanan Lokal
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Agen BRILink dan penyewaan alat wisata di kawasan Pantai Malang
              Selatan
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Cari layanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16">
        <div className="container px-4">
          <Tabs defaultValue="brilink" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="brilink" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Agen BRILink
              </TabsTrigger>
              <TabsTrigger value="rental" className="gap-2">
                <Tent className="h-4 w-4" />
                Penyewaan Alat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="brilink">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <Skeleton className="h-40 w-full" />
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredBrilink?.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Belum ada agen BRILink terdaftar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBrilink?.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rental">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <Skeleton className="h-40 w-full" />
                      <CardContent className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredRental?.length === 0 ? (
                <div className="text-center py-12">
                  <Tent className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Belum ada layanan penyewaan terdaftar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRental?.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
