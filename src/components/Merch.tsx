import { site } from "../data/site";
import { waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { Reveal, SectionHeading } from "./ornaments";

export function Merch() {
  return (
    <section id="merch" className="relative tex-iron pb-28 md:pb-36" aria-labelledby="merch-titulo">
      <div className="container-v">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="merch-titulo"
            rune="algiz"
            title="Merch Vikings"
            lead="Remeras, musculosas, el vaso de 1 litro y equipo para combate. Lo retirás en el gimnasio."
          />
          <Reveal className="shrink-0">
            <a
              href={waLink("Hola Vikings! Quiero consultar por el merch")}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
            >
              <WhatsAppIcon />
              Consultar talles
            </a>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-14 md:gap-4 lg:grid-cols-4">
          {site.merch.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 70}>
              <figure className="frame h-full [--cut:16px] [--fill:#141414]">
                <img
                  src={m.image}
                  alt={m.alt}
                  width={480}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="cut aspect-[4/5] w-full object-cover [--cut:15.4px]"
                  style={{ margin: 1, width: "calc(100% - 2px)" }}
                />
                <figcaption className="p-4">
                  <p className="font-display text-[1.5rem] leading-none tracking-[0.05em] text-white">{m.name}</p>
                  <p className="mt-1.5 text-sm leading-snug text-steel">{m.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
