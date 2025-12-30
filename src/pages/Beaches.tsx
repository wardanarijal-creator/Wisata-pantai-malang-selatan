import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Search, Filter } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

export default function Beaches() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: beaches, isLoading } = useQuery({
    queryKey: ["beaches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("beaches")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const filteredBeaches = beaches?.filter(
    (beach) =>
      beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beach.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/20 via-background to-accent/10">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Jelajahi Pantai Malang Selatan
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Temukan keindahan 12 pantai eksotis di pesisir selatan Malang
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Cari pantai..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Beaches Grid */}
      <section className="py-16">
        <div className="container px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBeaches?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Tidak ada pantai yang ditemukan
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBeaches?.map((beach) => (
                <Link key={beach.id} to={`/wisata/${beach.slug}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          beach.featured_image ||
                          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
                        }
                        alt={beach.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {beach.is_featured && (
                        <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          Populer
                        </span>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {beach.name}
                      </h3>
                      {beach.location && (
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{beach.location}</span>
                        </div>
                      )}
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {beach.short_description || beach.description}
                      </p>
                      {beach.ticket_price && (
                        <p className="mt-3 text-primary font-medium text-sm">
                          Tiket: {beach.ticket_price}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
