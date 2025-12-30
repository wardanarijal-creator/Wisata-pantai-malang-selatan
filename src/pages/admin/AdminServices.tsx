import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Service = Tables<"services">;

const emptyService = {
  name: "",
  slug: "",
  service_type: "brilink",
  description: "",
  location: "",
  address: "",
  opening_hours: "",
  whatsapp_number: "",
  featured_image: "",
  is_available: true,
  is_featured: false,
};

export default function AdminServices() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState(emptyService);

  const { data: services, isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (editingService) {
        const { error } = await supabase.from("services").update(data).eq("id", editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast({ title: editingService ? "Layanan diperbarui!" : "Layanan ditambahkan!" });
      handleClose();
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast({ title: "Layanan dihapus!" });
    },
  });

  const handleClose = () => {
    setIsOpen(false);
    setEditingService(null);
    setFormData(emptyService);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      service_type: service.service_type,
      description: service.description || "",
      location: service.location || "",
      address: service.address || "",
      opening_hours: service.opening_hours || "",
      whatsapp_number: service.whatsapp_number || "",
      featured_image: service.featured_image || "",
      is_available: service.is_available ?? true,
      is_featured: service.is_featured ?? false,
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
        <h1 className="font-display text-2xl font-bold">Kelola Layanan</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingService(null); setFormData(emptyService); }}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Layanan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Layanan" : "Tambah Layanan"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Layanan *</Label>
                  <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Tipe Layanan *</Label>
                  <Select value={formData.service_type} onValueChange={(v) => setFormData({ ...formData, service_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brilink">Agen BRILink</SelectItem>
                      <SelectItem value="rental">Penyewaan Alat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="auto-generate" />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Lokasi</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Jam Operasional</Label>
                  <Input value={formData.opening_hours} onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Alamat Lengkap</Label>
                <Textarea rows={2} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>No. WhatsApp</Label>
                  <Input value={formData.whatsapp_number} onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })} placeholder="6281234567890" />
                </div>
                <div className="space-y-2">
                  <Label>URL Gambar</Label>
                  <Input value={formData.featured_image} onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_available} onCheckedChange={(c) => setFormData({ ...formData, is_available: c })} />
                  <Label>Tersedia</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_featured} onCheckedChange={(c) => setFormData({ ...formData, is_featured: c })} />
                  <Label>Unggulan</Label>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleClose}>Batal</Button>
                <Button type="submit" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Menyimpan..." : "Simpan"}</Button>
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
                <TableHead>Tipe</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8">Memuat...</TableCell></TableRow>
              ) : services?.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Belum ada layanan</TableCell></TableRow>
              ) : (
                services?.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>
                      <Badge variant={service.service_type === "brilink" ? "default" : "secondary"}>
                        {service.service_type === "brilink" ? "BRILink" : "Rental"}
                      </Badge>
                    </TableCell>
                    <TableCell>{service.location || "-"}</TableCell>
                    <TableCell>{service.is_available ? "Tersedia" : "Tidak"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(service)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMutation.mutate(service.id)}><Trash2 className="h-4 w-4" /></Button>
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
