import { site } from "../data/site";
import { responsive } from "../lib/img";
import { waLink } from "../lib/whatsapp";
import { DisciplineIcon } from "./icons";
import { AxeLine, Reveal, SectionHeading, axeTop } from "./ornaments";

export function Disciplinas() {
  return (
    <section
      id="disciplinas"
      className="relative tex-iron pt-[calc(var(--edge)+3.5rem)] pb-24 md:pt-[calc(var(--edge)+4.5rem)] md:pb-32"
      style={axeTop()}
      aria-labelledby="disciplinas-titulo"
    >
      <AxeLine />
      <div className="container-v">
        <SectionHeading
          id="disciplinas-titulo"
          rune="uruz"
          title="Todas las disciplinas, un solo gimnasio en Morón"
          lead="Elegí cómo querés entrenar o combiná varias. Mirá la grilla completa en Horarios."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-5">
          {site.disciplines.map((d, i) => (
            <Reveal as="li" key={d.id} delay={(i % 3) * 90}>
              <a
                href={waLink(`Hola Vikings! Quiero info sobre ${d.name}`)}
                target="_blank"
                rel="noopener"
                className="frame group block h-full [--cut:22px] [--fill:#141414] hover:[--frame:var(--color-fire)] focus-visible:[--frame:var(--color-ember)] focus-visible:outline-none"
              >
                <div className="cut relative aspect-[16/10] overflow-hidden [--cut:21.4px] sm:aspect-[4/5]" style={{ margin: 1 }}>
                  <img
                    src={d.image}
                    {...responsive(d.image, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
                    style={{ objectPosition: (d as { focal?: string }).focal }}
                    alt={d.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-blade)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/55 to-carbon/0" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-fire/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute top-4 left-4 grid h-12 w-12 place-items-center border border-gold/40 bg-carbon/70 text-gold backdrop-blur-sm">
                    <DisciplineIcon id={d.id} className="h-6 w-6" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="display-3 text-white">{d.name}</h3>
                    <p className="mt-2 max-w-[38ch] text-[0.95rem] leading-snug text-bone/80">{d.description}</p>
                    <span className="label-display mt-4 inline-flex items-center gap-2 text-[0.95rem] text-ember opacity-90 transition-opacity group-hover:opacity-100">
                      <span className="h-px w-6 bg-ember transition-[width] duration-300 group-hover:w-10" aria-hidden="true" />
                      Consultar
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
