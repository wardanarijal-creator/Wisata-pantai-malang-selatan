import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber = "6281234567890",
  message = "Halo, saya tertarik dengan informasi wisata Pantai Malang Selatan",
  className,
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "w-14 h-14 rounded-full",
        "bg-[#25D366] hover:bg-[#20BD5A] text-white",
        "flex items-center justify-center",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300 hover:scale-110",
        "animate-fade-up",
        className
      )}
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
