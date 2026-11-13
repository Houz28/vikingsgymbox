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
**placeholders** generados (escenas oscuras de equipamiento).

### Cargar las fotos reales (por ejemplo, las del Instagram)

1. Conseguí las fotos originales. Lo mejor es pedírselas al dueño. Si salen del Instagram
   @vikingsgymbox, quien administra la cuenta puede bajarlas todas desde la app:
   **Tu actividad → Descargar tu información → Fotos y videos**. Instagram guarda las fotos
   a 1080 px como máximo: sirven, pero para el hero conviene una foto original más grande.
2. Copialas en una carpeta `fotos/` en la raíz del proyecto (no se sube a git).
   Nombralas según dónde van: `hero`, `box`, `musculacion`, `crossfit`, `boxeo`, `kick`,
   `spinning`, `localizada`, `galeria-01` … `galeria-12` (cualquier extensión: jpg, png, webp).
   Las que tengan otro nombre (por ejemplo `IMG_2041.jpg`) llenan la galería en orden.
3. Corré:

```bash
npm run fotos
```

El script recorta cada foto a la proporción de su lugar buscando la zona con más detalle,
la pasa a WebP liviano en `public/img/`, nunca la agranda, y si cambiaste el hero regenera
`og.jpg` (la vista previa para WhatsApp y redes) con la foto nueva y los textos de la marca.
Después actualizá los `alt` de esas fotos en `src/data/site.ts` y hacé commit de `public/img/`.

| Archivo | Uso | Proporción / tamaño ideal |
| --- | --- | --- |
| `hero.webp` | Fondo del hero (el texto va a la izquierda) | 16:9, 1920×1080 |
| `box.webp` | Foto grande de El Box | 4:5, 1200×1500 |
| `musculacion.webp`, `crossfit.webp`, `boxeo.webp`, `kick.webp`, `spinning.webp`, `localizada.webp` | Tarjetas de disciplinas (el texto va abajo) | 4:5, 800×1000 |
| `galeria-01.webp` … `galeria-12.webp` | Galería: cada lugar tiene su proporción en `gallery` de `site.ts` | 900–1200 px de ancho |
| `og.jpg` | Vista previa al compartir | 1200×630 |
| `icon-512.png`, `apple-touch-icon.png` | Ícono de la app / logo para Google | 512 y 180 px |

## SEO local incluido

- `<title>`, meta description, canonical, Open Graph y Twitter card (desde `site.ts`).
- JSON-LD `ExerciseGym` con dirección, geo, teléfono, horarios, `aggregateRating`, `sameAs` y `priceRange`.
- Un solo H1 y H2 con "gimnasio en Morón", "box de CrossFit en Morón" y "clases de boxeo en Morón".
- `robots.txt` y `sitemap.xml` generados con el dominio de `site.ts`. `lang="es-AR"`.

Ojo: Google no muestra estrellas en los resultados a partir de un `aggregateRating`
que el propio negocio publica en su web; las estrellas que se ven en Maps salen del
Perfil de Empresa. El dato igual suma como información estructurada.

## Deploy en Cloudflare Workers

`wrangler.jsonc` publica `./dist` como sitio estático (Workers Static Assets, sin código
de Worker). `public/_headers` agrega caché larga para JS/CSS/fuentes, un día para las fotos
y `noindex` en la URL de prueba `*.workers.dev`. Las rutas que no existen devuelven 404.

### Opción A: deploy automático desde GitHub (recomendado)

1. En el panel de Cloudflare: **Workers & Pages → Create application → GitHub** y elegí
   el repo `vikingsgymbox`.
2. Configuración:
   - **Project name:** `vikingsgymbox` (tiene que coincidir con `name` en `wrangler.jsonc`)
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
3. **Save and Deploy.** A partir de ahí, cada push a `main` se publica solo. La versión de
   Node la toma de `.node-version` (22).

### Opción B: deploy manual desde tu compu

```bash
npx wrangler login
```

```bash
npm run deploy
```

### Dominio propio

En el Worker: **Settings → Domains & Routes → Add → Custom domain** (el dominio tiene que
estar en la misma cuenta de Cloudflare). Después actualizá `url` en `src/data/site.ts`
para que canonical, Open Graph y el sitemap apunten al dominio final.
