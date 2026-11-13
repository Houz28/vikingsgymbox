import manifest from "../data/images.json";

type Entry = { width: number; height: number; variants: Record<string, string> };
const images = manifest as Record<string, Entry>;

/** srcset generado por `npm run fotos` (si la foto todavía es placeholder, no hay srcset). */
export function responsive(src: string, sizes: string) {
  const entry = images[src];
  if (!entry) return {};
  const srcSet = Object.entries(entry.variants)
    .map(([w, url]) => `${url} ${w}w`)
    .join(", ");
  return { srcSet, sizes };
}
