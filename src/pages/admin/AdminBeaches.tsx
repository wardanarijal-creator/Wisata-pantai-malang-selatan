import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Beach = Tables<"beaches">;

const emptyBeach = {
  name: "",
  slug: "",
  location: "",
  short_description: "",
  description: "",
  ticket_price: "",
  opening_hours: "",
  access_info: "",
  tips: "",
  featured_image: "",
  is_featured: false,
};

export default function AdminBeaches() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingBeach, setEditingBeach] = useState<Beach | null>(null);
  const [formData, setFormData] = useState(emptyBeach);

  const { data: beaches, isLoading } = useQuery({
    queryKey: ["admin-beaches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("beaches")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (editingBeach) {
        const { error } = await supabase
          .from("beaches")
          .update(data)
          .eq("id", editingBeach.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("beaches").insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-beaches"] });
      toast({ title: editingBeach ? "Pantai diperbarui!" : "Pantai ditambahkan!" });
      handleClose();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("beaches").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-beaches"] });
      toast({ title: "Pantai dihapus!" });
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    setEditingBeach(null);
    setFormData(emptyBeach);
  };

  const handleEdit = (beach: Beach) => {
    setEditingBeach(beach);
    setFormData({
      name: beach.name,
      slug: beach.slug,
      location: beach.location || "",
      short_description: beach.short_description || "",
      description: beach.description || "",
      ticket_price: beach.ticket_price || "",
      opening_hours: beach.opening_hours || "",
      access_info: beach.access_info || "",
      tips: beach.tips || "",
      featured_image: beach.featured_image || "",
      is_featured: beach.is_featured || false,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");
    saveMutation.mutate({ ...formData, slug });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Kelola Pantai</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingBeach(null); setFormData(emptyBeach); }}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pantai
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBeach ? "Edit Pantai" : "Tambah Pantai"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Pantai *</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generate jika kosong"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Lokasi</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Singkat</Label>
                <Textarea
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Lengkap</Label>
                <Textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Harga Tiket</Label>
                  <Input
                    value={formData.ticket_price}
                    onChange={(e) => setFormData({ ...formData, ticket_price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Jam Buka</Label>
                  <Input
                    value={formData.opening_hours}
                    onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Akses</Label>
                <Input
                  value={formData.access_info}
                  onChange={(e) => setFormData({ ...formData, access_info: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Tips Berkunjung</Label>
                <Textarea
                  rows={2}
                  value={formData.tips}
                  onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>URL Gambar</Label>
                <Input
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label>Pantai Unggulan</Label>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Batal
                </Button>
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Tiket</TableHead>
                <TableHead>Unggulan</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Memuat...
                  </TableCell>
                </TableRow>
              ) : beaches?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Belum ada data pantai
                  </TableCell>
                </TableRow>
              ) : (
                beaches?.map((beach) => (
                  <TableRow key={beach.id}>
                    <TableCell className="font-medium">{beach.name}</TableCell>
                    <TableCell>{beach.location || "-"}</TableCell>
                    <TableCell>{beach.ticket_price || "-"}</TableCell>
                    <TableCell>{beach.is_featured ? "Ya" : "Tidak"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(beach)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate(beach.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
