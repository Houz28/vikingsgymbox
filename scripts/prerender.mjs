// Prerender: inyecta el HTML de la app en dist/index.html para que el contenido
// esté disponible sin JavaScript (mejor SEO y primera carga más rápida).
import { readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render } = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

let html = readFileSync(join(dist, "index.html"), "utf8");
const appHtml = render();

if (!html.includes('<div id="root"></div>')) {
  throw new Error("No encontré <div id=\"root\"></div> en dist/index.html");
}
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// Precargar la fuente de títulos (Bebas Neue, latin) para evitar el salto del H1.
const assets = readdirSync(join(dist, "assets"));
const bebas = assets.find((f) => /^bebas-neue-latin-400-normal.*\.woff2$/.test(f));
if (bebas) {
  html = html.replace(
    "</title>",
    `</title>\n    <link rel="preload" href="/assets/${bebas}" as="font" type="font/woff2" crossorigin />`,
  );
}

writeFileSync(join(dist, "index.html"), html);
rmSync(ssrDir, { recursive: true, force: true });
console.log(`✓ Prerender listo (${(appHtml.length / 1024).toFixed(1)} KB de HTML)`);
