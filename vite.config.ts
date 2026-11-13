import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { htmlTokens, robotsTxt, sitemapXml } from "./src/lib/seo.ts";

/**
 * SEO desde src/data/site.ts:
 * - completa los {{TOKENS}} de index.html (title, description, OG, JSON-LD)
 * - genera robots.txt y sitemap.xml (en dev los sirve, en build los emite)
 */
function seoFromSiteData(): Plugin {
  let isSsrBuild = false;
  return {
    name: "vikings-seo",
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    transformIndexHtml(html) {
      const tokens = htmlTokens();
      return html.replace(/\{\{(\w+)\}\}/g, (match, key: string) => tokens[key] ?? match);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          return res.end(robotsTxt());
        }
        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          return res.end(sitemapXml());
        }
        next();
      });
    },
    generateBundle() {
      if (isSsrBuild) return;
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsTxt() });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml() });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFromSiteData()],
});
