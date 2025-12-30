import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Share2, User } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";

export default function ArticleDetail() {
  const { slug } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`*, categories(name, slug)`)
        .eq("slug", slug)
        .eq("status", "published")
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: relatedArticles } = useQuery({
    queryKey: ["related-articles", article?.category_id],
    queryFn: async () => {
      if (!article?.category_id) return [];
      const { data, error } = await supabase
        .from("articles")
        .select(`*, categories(name, slug)`)
        .eq("category_id", article.category_id)
        .eq("status", "published")
        .neq("id", article.id)
        .limit(3);
      if (error) throw error;
      return data;
    },
    enabled: !!article?.category_id,
  });

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article?.title,
        text: article?.excerpt,
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
        <div className="container px-4 py-8 max-w-4xl mx-auto">
          <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
          <Button asChild>
            <Link to="/artikel">Kembali ke Daftar Artikel</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="pb-16">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={
              article.featured_image ||
              "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200"
            }
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Button asChild variant="secondary" size="sm">
              <Link to="/artikel">
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

        {/* Content */}
        <div className="container px-4 -mt-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl shadow-lg p-6 md:p-10">
              {/* Category */}
              {article.categories && (
                <Badge className="mb-4">{article.categories.name}</Badge>
              )}

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                {article.published_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(article.published_at), "d MMMM yyyy", {
                        locale: id,
                      })}
                    </span>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-lg text-muted-foreground mb-6 font-medium">
                  {article.excerpt}
                </p>
              )}

              {/* Content */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      article.content?.replace(/\n/g, "<br/>") ||
                      "<p>Konten artikel belum tersedia.</p>",
                  }}
                />
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles && relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Artikel Terkait
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      to={`/artikel/${related.slug}`}
                      className="group"
                    >
                      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <img
                          src={
                            related.featured_image ||
                            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400"
                          }
                          alt={related.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
}
