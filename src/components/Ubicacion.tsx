import { site } from "../data/site";
import { waLink } from "../lib/whatsapp";
import { ClockIcon, PinIcon, WhatsAppIcon } from "./icons";
import { Reveal, SectionHeading, axeTop } from "./ornaments";

export function Ubicacion() {
  const { contact, hours } = site;
  const { address } = contact;

  return (
    <section
      id="ubicacion"
      className="relative tex-iron pt-[calc(var(--edge)+5rem)] pb-24 md:pt-[calc(var(--edge)+6rem)] md:pb-28"
      style={axeTop(true)}
      aria-labelledby="ubicacion-titulo"
    >
      <div className="container-v">
        <SectionHeading
          id="ubicacion-titulo"
          rune="othala"
          title="Cómo llegar a tu gimnasio en Morón"
          lead="Pasá a conocernos o escribinos antes y te esperamos para tu primera clase."
        />

        <div className="mt-12 grid gap-6 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="frame h-full [--cut:24px] [--fill:#141414]">
              <iframe
                title={`Mapa: ${site.name}, ${address.street}, ${address.locality}`}
                src={contact.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] h-full min-h-[320px] w-full border-0 [filter:grayscale(.35)_invert(.92)_hue-rotate(180deg)_contrast(.92)] lg:aspect-auto"
                style={{ padding: 1 }}
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-5">
            <div className="frame h-full [--cut:24px] [--fill:#141414]">
              <div className="flex h-full flex-col p-5 sm:p-6 md:p-8">
                <address className="not-italic">
                  <p className="flex items-start gap-3">
                    <PinIcon className="mt-1 h-6 w-6 shrink-0 text-gold" />
                    <span>
                      <span className="display-3 block text-white">{address.street}</span>
                      <span className="mt-1 block text-bone/80">
                        {address.locality} ({address.postalCode}), {address.region}
                      </span>
                    </span>
                  </p>
                </address>

                <div className="mt-8 flex items-start gap-3 border-t border-rule pt-8">
                  <ClockIcon className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                  <dl className="w-full space-y-2.5">
                    {hours.map((h) => (
                      <div key={h.label} className="flex items-baseline justify-between gap-4">
                        <dt className="text-bone/80">{h.label}</dt>
                        <dd className={`font-semibold whitespace-nowrap tabular ${h.closed ? "text-steel" : "text-white"}`}>
                          {h.closed ? "Cerrado" : `${h.opens} a ${h.closes}`}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row lg:flex-col xl:flex-row">
                  <a
                    href={contact.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-ghost flex-1 [--btn-fill:#141414]"
                  >
                    <PinIcon />
                    Cómo llegar
                  </a>
                  <a href={waLink()} target="_blank" rel="noopener" className="btn btn-fire flex-1">
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
