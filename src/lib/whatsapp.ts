import { site } from "../data/site";

/** Link de WhatsApp con mensaje precargado. */
export function waLink(message: string = site.contact.whatsappDefaultMessage): string {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function planMessage(planName: string): string {
  return `Hola Vikings! Quiero info sobre el plan ${planName}`;
}
