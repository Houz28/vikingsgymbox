import { site } from "../data/site";
import { formatPrice } from "../lib/format";
import { planMessage, waLink } from "../lib/whatsapp";
import { CheckIcon, WhatsAppIcon } from "./icons";
import { Reveal, SectionHeading, axeTop } from "./ornaments";

export function Planes() {
  return (
    <section
      id="planes"
      className="relative tex-iron pt-[calc(var(--edge)+5rem)] pb-20 md:pt-[calc(var(--edge)+6rem)] md:pb-24"
      style={axeTop()}
      aria-labelledby="planes-titulo"
    >
      <div className="container-v">
        <SectionHeading
          id="planes-titulo"
          rune="fehu"
          title="Planes y precios"
          lead="Elegí el plan que mejor va con tu semana. Escribinos y te contamos cómo arrancar."
        />

        <ul className="mt-14 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-3">
          {site.plans.map((plan, i) => {
            const featured = Boolean(plan.featured);
            return (
              <Reveal
                as="li"
                key={plan.id}
                delay={i * 80}
                className={`relative flex ${featured ? "xl:-my-4" : ""}`}
              >
                <article
                  className={`frame flex w-full flex-col [--cut:20px] ${
                    featured
                      ? "[--bw:2px] [--fill:#170b0c] [--frame:var(--color-fire)] shadow-[0_0_80px_-20px_rgb(193_18_31/0.55)]"
                      : "[--fill:#141414] hover:[--frame:rgb(141_153_174/0.55)]"
                  }`}
                  aria-labelledby={`plan-${plan.id}`}
                >
                  {featured && plan.badge ? (
                    <p className="label-display bg-fire px-6 py-2.5 text-center text-[1rem] text-white">
                      {plan.badge}
                    </p>
                  ) : null}

                  <div className={`flex flex-1 flex-col p-6 md:p-7 xl:p-5 ${featured ? "xl:py-8" : ""}`}>
                    <h3 id={`plan-${plan.id}`} className="display-3 text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-[0.95rem] text-steel">{plan.summary}</p>

                    <p className="mt-6 flex items-baseline gap-1.5 border-t border-rule pt-6">
                      <span className="font-display text-[3.6rem] leading-none tracking-[0.02em] text-white tabular">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="text-sm whitespace-nowrap text-steel">{plan.period}</span>
                    </p>

                    <ul className="mt-6 space-y-3 text-[0.95rem]">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-3 text-bone/85">
                          <CheckIcon className={`mt-0.5 h-5 w-5 shrink-0 ${featured ? "text-ember" : "text-gold"}`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <a
                        href={waLink(planMessage(plan.name))}
                        target="_blank"
                        rel="noopener"
                        className={`btn w-full gap-2 px-3 text-[1.1rem] tracking-[0.06em] xl:text-[1.02rem] ${featured ? "btn-fire" : "btn-ghost [--btn-fill:#141414]"}`}
                      >
                        <WhatsAppIcon />
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-10 text-center text-sm text-steel xl:mt-14">{site.plansNote}</p>
      </div>
    </section>
  );
}
