import { site } from "../data/site";
import { responsive } from "../lib/img";
import { waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { AxeLine, Reveal, Rune, RuneRule, axeTop } from "./ornaments";

function WodBoard() {
  const { wod } = site.box;
  return (
    <div className="frame w-full max-w-[22rem] [--cut:18px] [--fill:#0f1011] [--frame:rgb(141_153_174/0.35)] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
      <div className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="label-display text-[0.95rem] text-gold">{wod.label}</p>
          <Rune name="tiwaz" className="h-5 w-3 text-gold/70" />
        </div>
        <p className="mt-3 font-display text-[3.25rem] leading-none tracking-[0.04em] text-white">{wod.format}</p>
        <ul className="mt-5 space-y-2.5 border-t border-dashed border-steel/30 pt-5">
          {wod.movements.map((m) => {
            const [reps, ...rest] = m.split(" ");
            const hasReps = /\d/.test(reps);
            return (
              <li key={m} className="flex items-baseline gap-3 text-bone/90">
                {hasReps ? (
                  <span className="w-12 shrink-0 font-display text-[1.6rem] leading-none tracking-[0.04em] text-ember tabular">
                    {reps}
                  </span>
                ) : null}
                <span className="text-[0.98rem]">{hasReps ? rest.join(" ") : m}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 border-t border-dashed border-steel/30 pt-4 text-sm text-steel">{wod.note}</p>
      </div>
    </div>
  );
}

export function ElBox() {
  const { box } = site;
  return (
    <section
      id="box"
      className="tex-metal relative pt-[calc(var(--edge)+5rem)] pb-28 md:pt-[calc(var(--edge)+6.5rem)] md:pb-36"
      style={axeTop(true)}
      aria-labelledby="box-titulo"
    >
      <AxeLine flip color="gold" />

      <div className="container-v grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Foto + pizarrón */}
        <Reveal className="relative lg:col-span-6">
          <div className="cut relative aspect-[4/5] overflow-hidden [--cut:34px] sm:aspect-[5/4] lg:aspect-[4/5]">
            <img
              src={box.image}
              {...responsive(box.image, "(min-width: 1024px) 50vw, 100vw")}
              style={{ objectPosition: box.imageFocal }}
              alt={box.imageAlt}
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-fire/25 via-transparent to-transparent" />
          </div>
          <div className="relative -mt-24 flex justify-end pr-3 sm:pr-8 lg:absolute lg:right-[-2.5rem] lg:bottom-[-3rem] lg:mt-0 lg:pr-0">
            <WodBoard />
          </div>
        </Reveal>

        {/* Texto */}
        <div className="lg:col-span-6 lg:pl-10">
          <Reveal>
            <RuneRule name="tiwaz" className="mb-5" />
            <h2 id="box-titulo" className="display-2 glow-title max-w-[14ch] text-balance text-white">
              {box.title}
            </h2>
            <p className="mt-6 font-display text-[2rem] leading-none tracking-[0.05em] text-bone">{box.lead}</p>
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-bone/80">
              {box.paragraphs.map((p) => (
                <p key={p} className="max-w-[60ch]">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <h3 className="label-display text-[1.35rem] text-gold">{box.featuresTitle}</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {box.features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="mt-1 h-px w-6 shrink-0 translate-y-2 bg-fire" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white">{f.title}</p>
                    <p className="mt-1 text-[0.95rem] leading-snug text-steel">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160} className="mt-12">
            <a href={waLink(box.ctaMessage)} target="_blank" rel="noopener" className="btn btn-fire">
              <WhatsAppIcon />
              {box.cta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
