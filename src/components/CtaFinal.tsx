import { site } from "../data/site";
import { waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { Reveal, Rune, axeTop } from "./ornaments";

export function CtaFinal() {
  const { finalCta } = site;
  return (
    <section
      className="relative isolate bg-fire pt-[calc(var(--edge)+4rem)] pb-24 md:pt-[calc(var(--edge)+5.5rem)] md:pb-32"
      style={{
        ...axeTop(),
        backgroundImage:
          "radial-gradient(80% 120% at 85% 100%, #e85d04 0%, transparent 55%), linear-gradient(115deg, #7d0a14 0%, #c1121f 45%, #c1121f 70%, #a10f1a 100%)",
      }}
      aria-labelledby="cta-titulo"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <Rune name="tiwaz" className="absolute top-[18%] -right-16 h-[34rem] w-[21rem] text-black/[0.09] md:-right-8 lg:right-[4%]" />
      </div>

      <div className="container-v">
        <Reveal className="max-w-4xl">
          <h2 id="cta-titulo" className="display-2 text-[clamp(3rem,9vw,7rem)] leading-[0.88] text-white text-balance">
            {finalCta.title}
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/90 md:text-xl">{finalCta.text}</p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="btn btn-dark mt-10 w-full px-10 py-5 text-[1.6rem] sm:w-auto"
          >
            <WhatsAppIcon className="!h-6 !w-6" />
            {finalCta.button}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
