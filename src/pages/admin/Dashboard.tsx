import { useQuery } from "@tanstack/react-query";
import { Waves, FileText, ShoppingBag, Wrench, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [beaches, articles, products, services, contacts] = await Promise.all([
        supabase.from("beaches").select("id", { count: "exact", head: true }),
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("contacts").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);
      return {
        beaches: beaches.count || 0,
        articles: articles.count || 0,
        products: products.count || 0,
        services: services.count || 0,
        unreadContacts: contacts.count || 0,
      };
    },
  });

  const cards = [
    { title: "Pantai", value: stats?.beaches || 0, icon: Waves, color: "text-primary" },
    { title: "Artikel", value: stats?.articles || 0, icon: FileText, color: "text-accent" },
    { title: "Produk", value: stats?.products || 0, icon: ShoppingBag, color: "text-sunset" },
    { title: "Layanan", value: stats?.services || 0, icon: Wrench, color: "text-green-500" },
    { title: "Pesan Baru", value: stats?.unreadContacts || 0, icon: Mail, color: "text-red-500" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${card.color}`} />
                  <span className="text-2xl font-bold">{card.value}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
