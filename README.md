# Viking's Gym & Box — sitio web

Landing de una sola página para **Viking's Gym & Box** (Cristóbal Colón 339, Morón).
React + TypeScript + Tailwind v4 sobre Vite, con el HTML prerenderizado al compilar
(el contenido llega en el HTML, sin esperar al JavaScript) y listo para Cloudflare Workers.

## Comandos

```bash
npm install
```

```bash
npm run dev       # desarrollo en http://localhost:5173
```

```bash
npm run build     # compila + prerenderiza en ./dist
```

```bash
npm run preview   # sirve ./dist para revisarlo
```

```bash
npm run deploy    # build + wrangler deploy (pide login de Cloudflare la primera vez)
```

## Editar el contenido

Todo lo editable está en **`src/data/site.ts`**: textos del hero, disciplinas, planes y
precios, grilla de clases, horarios, galería, reseñas, WhatsApp, redes y dirección.
No hace falta tocar componentes.

- **Planes:** `plans`. El que tenga `featured: true` sale destacado con la etiqueta de `badge`.
  El botón arma solo el mensaje de WhatsApp con el nombre del plan.
- **Clases:** `classes` es una lista de `{ day, time, discipline }`. Para dos clases en el
  mismo horario, agregá dos filas. El color de cada disciplina sale de `disciplines[].color`.
- **Horario del gimnasio:** `hours`. También alimenta el cartel "Abierto ahora" (calculado
  con la hora de Argentina) y el JSON-LD para Google.
- **Dominio:** `url`. Se usa en canonical, Open Graph, `robots.txt` y `sitemap.xml`
  (los dos se generan solos al compilar).
- **Coordenadas:** `contact.geo` es aproximada. Verificala en Google Maps (clic derecho sobre
  el pin → copiar coordenadas).

## Imágenes

Todas viven en `public/img/` y se referencian como `/img/archivo.webp`. Las actuales son
**placeholders** generados (escenas oscuras de equipamiento). Para reemplazarlas, pisá el
archivo con el mismo nombre y actualizá su `alt` en `site.ts`:

| Archivo | Uso | Tamaño sugerido |
| --- | --- | --- |
| `hero.webp` | Fondo del hero (se recorta hacia la derecha) | 1920×1080 |
| `box.webp` | Foto grande de El Box | 1200×1500 (vertical) |
| `musculacion.webp`, `crossfit.webp`, `boxeo.webp`, `kick.webp`, `spinning.webp`, `localizada.webp` | Tarjetas de disciplinas | 800×1000 |
| `galeria-01.webp` … `galeria-12.webp` | Galería (si cambia la proporción, actualizá `width`/`height` en `gallery`) | 900–1200 px de ancho |
| `og.jpg` | Vista previa al compartir en WhatsApp/redes | 1200×630 |
| `icon-512.png`, `apple-touch-icon.png` | Ícono de la app / logo para Google | 512 y 180 px |

Para pasar fotos a WebP: `cwebp -q 80 foto.jpg -o hero.webp` o cualquier conversor online.
Mantené cada foto por debajo de ~250 KB.

## SEO local incluido

- `<title>`, meta description, canonical, Open Graph y Twitter card (desde `site.ts`).
- JSON-LD `ExerciseGym` con dirección, geo, teléfono, horarios, `aggregateRating`, `sameAs` y `priceRange`.
- Un solo H1 y H2 con "gimnasio en Morón", "box de CrossFit en Morón" y "clases de boxeo en Morón".
- `robots.txt` y `sitemap.xml` generados con el dominio de `site.ts`. `lang="es-AR"`.

Ojo: Google no muestra estrellas en los resultados a partir de un `aggregateRating`
que el propio negocio publica en su web; las estrellas que se ven en Maps salen del
Perfil de Empresa. El dato igual suma como información estructurada.

## Deploy en Cloudflare Workers

`wrangler.jsonc` publica `./dist` como sitio estático (sin código de Worker).
Con `npm run deploy` se compila y se sube. Después, en el panel de Cloudflare,
asociá el dominio al Worker `vikingsgymbox`.
