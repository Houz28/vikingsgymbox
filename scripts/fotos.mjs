// Convierte fotos reales (por ejemplo, las del Instagram del gimnasio) a los
// archivos que usa el sitio en public/img/, con el tamaño y recorte correctos.
//
// Uso:
//   1. Poné las fotos en la carpeta fotos/ (jpg, png o webp).
//   2. Nombralas como el destino: hero.jpg, box.jpg, musculacion.jpg, crossfit.jpg,
//      boxeo.jpg, kick.jpg, spinning.jpg, localizada.jpg, galeria-01.jpg … galeria-12.jpg.
//      Las fotos con cualquier otro nombre van llenando la galería en orden alfabético.
//   3. npm run fotos
//
// El recorte es "inteligente" (busca la zona con más detalle) y nunca agranda una foto:
// si es más chica que el tamaño ideal, se usa su resolución real.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, parse, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const inDir = join(root, "fotos");
const outDir = join(root, "public", "img");

// Tamaños de destino (ancho × alto). La galería toma las proporciones de site.ts.
const slots = {
  hero: [1920, 1080],
  box: [1200, 1500],
  musculacion: [800, 1000],
  crossfit: [800, 1000],
  boxeo: [800, 1000],
  kick: [800, 1000],
  spinning: [800, 1000],
  localizada: [800, 1000],
};
const siteTs = readFileSync(join(root, "src", "data", "site.ts"), "utf8");
const galleryRe = /src:\s*"\/img\/(galeria-\d+)\.webp"[^}]*?width:\s*(\d+),\s*height:\s*(\d+)/g;
const gallerySlots = [];
for (const m of siteTs.matchAll(galleryRe)) {
  slots[m[1]] = [Number(m[2]), Number(m[3])];
  gallerySlots.push(m[1]);
}

if (!existsSync(inDir)) {
  console.error("No existe la carpeta fotos/. Creala y poné ahí las fotos.");
  process.exit(1);
}

const files = readdirSync(inDir)
  .filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));

if (!files.length) {
  console.error("La carpeta fotos/ está vacía (se aceptan jpg, png, webp, avif y tiff).");
  process.exit(1);
}

// Asignar: primero por nombre, después el resto a los lugares libres de la galería.
const assigned = new Map();
const leftovers = [];
for (const f of files) {
  const name = parse(f).name.toLowerCase();
  if (slots[name] && !assigned.has(name)) assigned.set(name, f);
  else leftovers.push(f);
}
for (const slot of gallerySlots) {
  if (!leftovers.length) break;
  if (!assigned.has(slot)) assigned.set(slot, leftovers.shift());
}

async function convert(slot, file) {
  const [tw, th] = slots[slot];
  const ratio = tw / th;
  const input = sharp(join(inDir, file)).rotate(); // respeta la orientación EXIF
  const meta = await input.metadata();
  const sw = meta.autoOrient?.width ?? meta.width;
  const sh = meta.autoOrient?.height ?? meta.height;
  // Nunca agrandar: el ancho final no supera ni el ideal ni lo que permite la foto.
  const width = Math.round(Math.min(tw, sw, sh * ratio));
  const height = Math.round(width / ratio);
  const out = join(outDir, `${slot}.webp`);
  await input
    .resize(width, height, { fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 80, effort: 5 })
    .toFile(out);
  const small = width < tw ? `  (la foto es chica: quedó en ${width}×${height})` : "";
  console.log(`✓ ${file} → img/${slot}.webp ${width}×${height}${small}`);
  return out;
}

for (const [slot, file] of assigned) await convert(slot, file);

// Imagen para compartir (og.jpg): foto del hero + textos de la marca.
if (assigned.has("hero")) {
  const overlay = join(root, "scripts", "assets", "og-overlay.png");
  await sharp(join(inDir, assigned.get("hero")))
    .rotate()
    .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
    .composite([{ input: readFileSync(overlay) }])
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(join(outDir, "og.jpg"));
  console.log("✓ img/og.jpg regenerada con la nueva foto del hero");
}

const pending = Object.keys(slots).filter((s) => !assigned.has(s));
if (leftovers.length) console.log(`\nSobraron ${leftovers.length} foto(s) sin lugar: ${leftovers.join(", ")}`);
if (pending.length) console.log(`\nSiguen con placeholder: ${pending.join(", ")}`);
console.log("\nAcordate de actualizar los textos alt de las fotos nuevas en src/data/site.ts.");
