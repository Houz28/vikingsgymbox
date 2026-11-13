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

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function Opiniones() {
  const { rating, reviews, contact } = site;

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
        <ul className="grid content-start gap-5 lg:col-span-7 xl:col-span-8 xl:pl-6">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.nombre} delay={i * 80}>
              <figure className={`frame h-full [--cut:18px] [--fill:#151516] ${i === 0 ? "[--frame:rgb(193_18_31/0.6)]" : ""}`}>
                <div className="p-6 md:p-8">
                  <figcaption className="flex items-center gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-fire font-display text-[1.35rem] tracking-[0.04em] text-white"
                      aria-hidden="true"
                    >
                      {initials(r.nombre)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-white">{r.nombre}</span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-bone/80">
                        <span className="flex gap-0.5 text-gold" role="img" aria-label={`${r.estrellas} de 5 estrellas`}>
                          {Array.from({ length: 5 }, (_, k) => (
                            <StarIcon key={k} className={`h-4 w-4 ${k < r.estrellas ? "" : "opacity-25"}`} />
                          ))}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <GoogleIcon className="h-3.5 w-3.5" />
                          en Google{r.hace ? `, ${r.hace}` : ""}
                        </span>
                      </span>
                    </span>
                  </figcaption>
                  <blockquote
                    className={`mt-5 text-pretty text-white ${i === 0 ? "text-[1.3rem] leading-[1.45] font-medium md:text-[1.6rem] md:leading-[1.4]" : "text-[1.1rem] leading-relaxed text-bone/90"}`}
                  >
                    <p>“{r.texto}”</p>
                  </blockquote>
                </div>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
