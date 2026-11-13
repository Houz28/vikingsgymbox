import { site } from "../data/site";
import { formatDecimal } from "../lib/format";
import { responsive } from "../lib/img";
import { waLink } from "../lib/whatsapp";
import { GoogleIcon, StarIcon, WhatsAppIcon } from "./icons";

export function Hero() {
  const { hero, rating } = site;

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-x-clip bg-carbon">
      {/* Foto + capas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={hero.image}
          {...responsive(hero.image, "100vw")}
          alt={hero.imageAlt}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition: hero.imageFocal }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/75 to-carbon/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-fire/55 via-fire/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-carbon via-carbon/60 to-transparent" />
      </div>

      <div className="container-v relative flex flex-1 flex-col justify-center pt-28 pb-12 md:pt-32">
        <a
          href="#opiniones"
          className="hero-fade inline-flex w-fit items-center gap-2.5 border border-bone/15 bg-carbon/60 px-3.5 py-2 text-sm text-bone/90 backdrop-blur-sm transition-colors hover:border-gold/60"
          style={{ animationDelay: "0.05s" }}
        >
          <GoogleIcon className="h-3.5 w-3.5 text-bone/80" />
          <StarIcon className="h-4 w-4 text-gold" />
          <span>
            <strong className="font-semibold text-white">{formatDecimal(rating.value)}</strong> en Google ·{" "}
            {rating.count} reseñas
          </span>
        </a>

        <img
          src="/img/logo/vikings.svg"
          alt=""
          aria-hidden="true"
          width={318}
          height={122}
          decoding="async"
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[min(1100px,120vw)] max-w-none -translate-x-1/2 -translate-y-[60%] opacity-[0.07] select-none lg:left-[38%]"
        />
        <h1 className="display-1 relative isolate mt-7 max-w-[9ch] text-white md:mt-8">
          <span className="hero-ignite pointer-events-none absolute -inset-[30%] -z-10 bg-[radial-gradient(45%_45%_at_35%_55%,rgb(193_18_31/0.5),transparent_70%)]" />
          {hero.titleLines.map((line, i) => (
            <span key={line} className="hero-mask">
              <span className="hero-line" style={{ animationDelay: `${0.12 + i * 0.11}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="hero-fade mt-7 max-w-[34ch] text-lg leading-relaxed text-bone/85 md:text-xl"
          style={{ animationDelay: "0.55s" }}
        >
          {hero.subtitle}
        </p>

        <div
          className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          style={{ animationDelay: "0.68s" }}
        >
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn-fire px-8 text-[1.45rem]">
            <WhatsAppIcon />
            {hero.primaryCta}
          </a>
          <a href="#planes" className="btn btn-ghost px-8 text-[1.45rem]">
            {hero.secondaryCta}
          </a>
        </div>
      </div>

      {/* Franja de datos */}
      <div className="relative z-20 pb-[clamp(36px,6vw,88px)]">
        <dl className="container-v grid grid-cols-3 gap-px">
          {hero.stats.map((s, i) => (
            <div
              key={s.label}
              className={`hero-fade flex flex-col gap-1 py-4 pr-3 md:py-5 lg:flex-row lg:items-baseline lg:gap-3 ${
                i > 0 ? "border-l border-gold/35 pl-3 md:pl-6" : ""
              }`}
              style={{ animationDelay: `${0.8 + i * 0.08}s` }}
            >
              <dt className="order-2 text-[0.78rem] leading-snug text-bone/75 md:text-sm">{s.label}</dt>
              <dd className="order-1 font-display text-[1.6rem] leading-none tracking-[0.04em] text-white md:text-[2.25rem] lg:shrink-0 lg:text-[2.5rem]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
