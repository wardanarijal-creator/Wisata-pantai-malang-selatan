import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("contacts").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Pesan terkirim!",
        description: "Terima kasih, kami akan segera menghubungi Anda.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Gagal mengirim pesan",
        description: "Silakan coba lagi atau hubungi kami via WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const faqs = [
    {
      question: "Bagaimana cara memesan produk UMKM?",
      answer:
        "Anda bisa langsung klik tombol 'Pesan via WhatsApp' di halaman produk. Pesanan akan diteruskan ke penjual untuk proses selanjutnya.",
    },
    {
      question: "Apakah informasi harga tiket pantai selalu update?",
      answer:
        "Kami berusaha memperbarui informasi secara berkala. Namun, kami sarankan untuk konfirmasi ulang ke pengelola pantai sebelum berkunjung.",
    },
    {
      question: "Bagaimana cara mendaftarkan produk UMKM saya?",
      answer:
        "Silakan hubungi kami melalui form di bawah atau WhatsApp. Tim kami akan membantu proses pendaftaran produk Anda.",
    },
    {
      question: "Apakah ada biaya untuk mendaftar sebagai mitra?",
      answer:
        "Pendaftaran sebagai mitra UMKM atau penyedia layanan tidak dipungut biaya. Kami berkomitmen untuk mendukung ekonomi lokal.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/20 via-background to-accent/10">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg text-muted-foreground">
              Punya pertanyaan atau ingin bermitra dengan kami? Jangan ragu
              untuk menghubungi kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">No. Telepon</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subjek</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder="Perihal pesan"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={mutation.isPending}
                  >
                    <Send className="h-4 w-4" />
                    {mutation.isPending ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">
                    Informasi Kontak
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">WhatsApp</p>
                        <p className="text-sm">+62 812 3456 7890</p>
                      </div>
                    </a>

                    <a
                      href="mailto:info@pantaimalangselatan.id"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-sm">info@pantaimalangselatan.id</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Lokasi</p>
                        <p className="text-sm">Kabupaten Malang, Jawa Timur</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">
                    Pertanyaan Umum (FAQ)
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-sm">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
