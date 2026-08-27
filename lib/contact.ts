import { siteConfig } from "./site";

export function buildWhatsAppHref(message?: string): string {
  const phone = siteConfig.whatsapp.replace(/\D/g, "");
  const baseUrl = `https://wa.me/${phone}`;

  return message?.trim()
    ? `${baseUrl}?text=${encodeURIComponent(message.trim())}`
    : baseUrl;
}
