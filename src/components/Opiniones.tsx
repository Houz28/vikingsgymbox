import { site } from "../data/site";
import { formatDecimal } from "../lib/format";
import { GoogleIcon, StarIcon } from "./icons";
import { Reveal, RuneRule, axeTop } from "./ornaments";

function Stars({ value, className = "" }: { value: number; className?: string }) {
  const pct = `${(value / 5) * 100}%`;
  const row = (cls: string) => (
    <span className={`flex gap-1 ${cls}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className="h-6 w-6 shrink-0" />
      ))}
    </span>
  );
  return (
    <span className={`relative inline-block ${className}`} role="img" aria-label={`${formatDecimal(value)} de 5 estrellas`}>
      {row("text-steel/25")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: pct }}>
        {row("text-gold")}
      </span>
    </span>
  );
}

export function Opiniones() {
  const { rating, reviews, contact } = site;
  const [featured, second, ...short] = reviews;

  return (
    <section
      id="opiniones"
      className="relative tex-metal pt-[calc(var(--edge)+5rem)] pb-28 md:pt-[calc(var(--edge)+6rem)] md:pb-36"
      style={axeTop(true)}
      aria-labelledby="opiniones-titulo"
    >
      <div className="container-v grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Resumen */}
        <Reveal className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28">
            <RuneRule name="wunjo" className="mb-5" />
            <h2 id="opiniones-titulo" className="display-2 max-w-[14ch] text-[clamp(2.75rem,6.5vw,4.25rem)] text-balance text-white">
              Lo que dicen los que entrenan acá
            </h2>

            <div className="mt-10 flex items-end gap-5">
              <p className="font-display text-[7.5rem] leading-[0.8] tracking-[0.01em] text-white md:text-[9rem]">
                {formatDecimal(rating.value)}
              </p>
              <div className="pb-1.5">
                <Stars value={rating.value} />
                <p className="mt-2 flex items-center gap-2 text-sm text-bone/85">
                  <GoogleIcon className="h-3.5 w-3.5" />
                  {rating.count} reseñas en Google
                </p>
              </div>
            </div>

            <ul className="mt-8 space-y-2.5" aria-label="Distribución de calificaciones">
              {rating.distribution.map((r) => (
                <li key={r.stars} className="grid grid-cols-[2.25rem_1fr_2.5rem] items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-bone/80 tabular">
                    {r.stars}
                    <StarIcon className="h-3.5 w-3.5 text-gold" />
                    <span className="sr-only">estrellas</span>
                  </span>
                  <span className="h-2 bg-rule" aria-hidden="true">
                    <span
                      className="block h-full bg-gradient-to-r from-fire to-ember"
                      style={{ width: `${Math.max((r.count / rating.count) * 100, 0.8)}%` }}
                    />
                  </span>
                  <span className="text-right text-steel tabular">{r.count}</span>
                </li>
              ))}
            </ul>

            <a
              href={contact.mapsPlaceUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost mt-10 [--btn-fill:#151516]"
            >
              <GoogleIcon />
              Ver todas en Google
            </a>
          </div>
        </Reveal>

        {/* Reseñas */}
        <div className="lg:col-span-7 xl:col-span-8 xl:pl-6">
          {featured ? (
            <Reveal as="figure" className="relative border-l-2 border-fire pl-6 md:pl-10">
              <svg
                viewBox="0 0 40 32"
                className="mb-6 h-8 w-10 text-fire"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M0 32V18L9 0h7l-5 14h6v18Zm23 0V18l9-18h7l-5 14h6v18Z" />
              </svg>
              <blockquote className="text-pretty text-[1.4rem] leading-[1.45] font-medium text-white md:text-[1.85rem] md:leading-[1.35]">
                <p>{featured.text}</p>
              </blockquote>
              <figcaption className="mt-6 text-bone/85">
                <span className="font-semibold text-white">{featured.author ?? "Reseña de Google"}</span>
                <span className="text-steel">, reseña en Google</span>
              </figcaption>
            </Reveal>
          ) : null}

          {second ? (
            <Reveal as="figure" delay={80} className="mt-14 max-w-[52ch] pl-6 md:ml-auto md:pl-10">
              <blockquote className="text-pretty text-[1.15rem] leading-relaxed text-bone/90 md:text-[1.25rem]">
                <p>“{second.text}”</p>
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-white">{second.author ?? "Reseña de Google"}</span>
                <span className="text-steel">, reseña en Google</span>
              </figcaption>
            </Reveal>
          ) : null}

          {short.length ? (
            <ul className="mt-14 grid gap-px bg-rule sm:grid-cols-3">
              {short.map((r, i) => (
                <Reveal as="li" key={r.text} delay={i * 80} className="bg-[#151516] p-6">
                  <figure>
                    <blockquote className="text-[1.02rem] leading-snug text-bone/90">
                      <p>“{r.text}”</p>
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-2 text-sm text-steel">
                      <GoogleIcon className="h-3.5 w-3.5" />
                      {r.author ?? "Reseña de Google"}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
