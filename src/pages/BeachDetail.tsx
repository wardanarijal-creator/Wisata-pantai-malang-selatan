import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Clock,
  Ticket,
  Car,
  Lightbulb,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function BeachDetail() {
  const { slug } = useParams();

  const { data: beach, isLoading } = useQuery({
    queryKey: ["beach", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("beaches")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: beach?.name,
        text: beach?.short_description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link berhasil disalin!" });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container px-4 py-8">
          <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </Layout>
    );
  }

  if (!beach) {
    return (
      <Layout>
        <div className="container px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Pantai tidak ditemukan</h1>
          <Button asChild>
            <Link to="/wisata">Kembali ke Daftar Pantai</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={
            beach.featured_image ||
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
          }
          alt={beach.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button asChild variant="secondary" size="sm">
            <Link to="/wisata">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
        </div>

        {/* Share Button */}
        <div className="absolute top-4 right-4">
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
        </div>
      </div>

      <div className="container px-4 -mt-20 relative z-10 pb-16">
        <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  {beach.name}
                </h1>
                {beach.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>{beach.location}</span>
                  </div>
                )}
              </div>
              {beach.is_featured && (
                <Badge className="bg-primary">Pantai Populer</Badge>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {beach.ticket_price && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Ticket className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Harga Tiket</p>
                  <p className="font-semibold">{beach.ticket_price}</p>
                </div>
              </div>
            )}
            {beach.opening_hours && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Jam Buka</p>
                  <p className="font-semibold">{beach.opening_hours}</p>
                </div>
              </div>
            )}
            {beach.access_info && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Car className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Akses</p>
                  <p className="font-semibold">{beach.access_info}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="font-display text-xl font-semibold mb-4">
              Tentang {beach.name}
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {beach.description || beach.short_description}
              </p>
            </div>
          </div>

          {/* Facilities */}
          {beach.facilities && beach.facilities.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">
                Fasilitas
              </h2>
              <div className="flex flex-wrap gap-2">
                {beach.facilities.map((facility, index) => (
                  <Badge key={index} variant="secondary">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {beach.tips && (
            <div className="mb-8 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-accent mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Tips Berkunjung</h3>
                  <p className="text-muted-foreground text-sm">{beach.tips}</p>
                </div>
              </div>
            </div>
          )}

          {/* Map */}
          {beach.map_embed && (
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">
                Lokasi
              </h2>
              <div
                className="rounded-lg overflow-hidden aspect-video"
                dangerouslySetInnerHTML={{ __html: beach.map_embed }}
              />
            </div>
          )}

          {/* Gallery */}
          {beach.images && beach.images.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-semibold mb-4">
                Galeri Foto
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {beach.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${beach.name} ${index + 1}`}
                    className="w-full h-32 md:h-40 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
