import { site } from "../data/site.ts";

const abs = (path: string) => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/** JSON-LD ExerciseGym, generado a partir de site.ts. */
export function buildJsonLd() {
  const { contact, hours, rating, social, seo } = site;
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${site.url}/#gym`,
    name: site.name,
    description: seo.description,
    url: `${site.url}/`,
    image: [abs(seo.ogImage), abs("/img/hero.webp")],
    logo: abs("/img/logo/vikings-gym-box.svg"),
    telephone: contact.phoneE164,
    priceRange: seo.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      postalCode: contact.address.postalCode,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.lat,
      longitude: contact.geo.lng,
    },
    hasMap: contact.mapsPlaceUrl,
    openingHoursSpecification: hours
      .filter((h) => !h.closed && h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
        opens: h.opens,
        closes: h.closes,
      })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [social.instagram.url, social.facebook.url],
    amenityFeature: site.disciplines.map((d) => ({
      "@type": "LocationFeatureSpecification",
      name: d.name,
      value: true,
    })),
  };
}

export function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`;
}

export function sitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

const escapeAttr = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Valores que se inyectan en index.html ({{TOKEN}}) al compilar. */
export function htmlTokens(): Record<string, string> {
  return {
    TITLE: escapeAttr(site.seo.title),
    DESCRIPTION: escapeAttr(site.seo.description),
    URL: `${site.url}/`,
    OG_IMAGE: abs(site.seo.ogImage),
    OG_IMAGE_ALT: escapeAttr(`${site.name}, gimnasio y box en Morón`),
    SITE_NAME: escapeAttr(site.name),
    JSON_LD: JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c"),
  };
}
