// Convierte las fotos de fotos-originales/ en los WebP que usa el sitio, en 1600 y 800 px
// de ancho, y actualiza src/data/images.json (de ahí sale el srcset de cada <img>).
//
// Uso:
//   1. Poné las fotos en fotos-originales/ (jpg, png, webp, avif o tiff).
//   2. Nombralas como el destino: hero, box, musculacion, crossfit, boxeo, kick, spinning,
//      localizada, galeria-01 … galeria-12. Las que tengan otro nombre llenan la galería en orden.
//   3. npm run fotos
//
// Cada foto se recorta a la proporción de su lugar (recorte "inteligente") y nunca se agranda.

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, parse, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const inDir = join(root, "fotos-originales");
const outDir = join(root, "public", "img");
const manifestPath = join(root, "src", "data", "images.json");
const WIDTHS = [1600, 800];

// Proporción (ancho / alto) de cada lugar. La galería toma la suya de site.ts.
const ratios = {
  hero: 16 / 9,
  box: 4 / 5,
  musculacion: 4 / 5,
  crossfit: 4 / 5,
  boxeo: 4 / 5,
  kick: 4 / 5,
  spinning: 4 / 5,
  localizada: 4 / 5,
};
const siteTs = readFileSync(join(root, "src", "data", "site.ts"), "utf8");
const gallerySlots = [];
for (const m of siteTs.matchAll(/src:\s*"\/img\/(galeria-\d+)\.webp"[^}]*?width:\s*(\d+),\s*height:\s*(\d+)/g)) {
  ratios[m[1]] = Number(m[2]) / Number(m[3]);
  gallerySlots.push(m[1]);
}

if (!existsSync(inDir)) {
  console.error("No existe la carpeta fotos-originales/. Creala y poné ahí las fotos.");
  process.exit(1);
}
const files = readdirSync(inDir)
  .filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
if (!files.length) {
  console.error("fotos-originales/ está vacía.");
  process.exit(1);
}

const assigned = new Map();
const leftovers = [];
for (const f of files) {
  const name = parse(f).name.toLowerCase();
  if (ratios[name] && !assigned.has(name)) assigned.set(name, f);
  else leftovers.push(f);
}
for (const slot of gallerySlots) {
  if (!leftovers.length) break;
  if (!assigned.has(slot)) assigned.set(slot, leftovers.shift());
}

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};

for (const [slot, file] of assigned) {
  const ratio = ratios[slot];
  const meta = await sharp(join(inDir, file)).rotate().metadata();
  const sw = meta.autoOrient?.width ?? meta.width;
  const sh = meta.autoOrient?.height ?? meta.height;
  const maxW = Math.floor(Math.min(sw, sh * ratio));
  const entry = { width: 0, height: 0, variants: {} };
  for (const target of WIDTHS) {
    const width = Math.min(target, maxW);
    const height = Math.round(width / ratio);
    const name = target === WIDTHS[0] ? `${slot}.webp` : `${slot}-${target}.webp`;
    await sharp(join(inDir, file))
      .rotate()
      .resize(width, height, { fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 80, effort: 5 })
      .toFile(join(outDir, name));
    entry.variants[width] = `/img/${name}`;
    if (target === WIDTHS[0]) Object.assign(entry, { width, height });
  }
  manifest[`/img/${slot}.webp`] = entry;
  const small = entry.width < WIDTHS[0] ? ` (foto chica: ${entry.width} px de ancho)` : "";
  console.log(`✓ ${file} → img/${slot}.webp + ${slot}-800.webp${small}`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
const pending = Object.keys(ratios).filter((s) => !assigned.has(s));
if (leftovers.length) console.log(`\nSobraron: ${leftovers.join(", ")}`);
if (pending.length) console.log(`Siguen con placeholder: ${pending.join(", ")}`);
console.log("\nActualizá los alt (y el focal si hace falta) en src/data/site.ts.");
