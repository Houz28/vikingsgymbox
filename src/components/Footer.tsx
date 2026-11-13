import { site } from "../data/site";
import { waLink } from "../lib/whatsapp";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo, NAV_LINKS } from "./Navbar";
import { RuneRule } from "./ornaments";

export function Footer() {
  const { contact, hours, social, credits } = site;
  const socials = [
    { href: social.instagram.url, label: `Instagram ${social.instagram.handle}`, Icon: InstagramIcon },
    { href: social.facebook.url, label: "Facebook", Icon: FacebookIcon },
    { href: waLink(), label: `WhatsApp ${contact.phoneDisplay}`, Icon: WhatsAppIcon },
  ];

  return (
    <footer className="relative border-t border-rule bg-[#0a0a0a] pt-16 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-16">
      <div className="container-v grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-steel">
            Gimnasio y box de entrenamiento funcional en Morón. Acá nadie entrena solo.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center border border-rule text-bone/85 transition-colors hover:border-fire hover:bg-fire hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="label-display text-gold">Dirección</p>
          <address className="mt-4 text-sm leading-relaxed text-bone/85 not-italic">
            {contact.address.street}
            <br />
            {contact.address.locality} ({contact.address.postalCode})
            <br />
            {contact.address.region}
            <br />
            <a href={waLink()} target="_blank" rel="noopener" className="mt-3 inline-block text-white underline decoration-fire decoration-2 underline-offset-4 hover:text-ember">
              {contact.phoneDisplay}
            </a>
          </address>
        </div>

        <div className="lg:col-span-3">
          <p className="label-display text-gold">Horarios</p>
          <dl className="mt-4 space-y-1.5 text-sm">
            {hours.map((h) => (
              <div key={h.label} className="flex justify-between gap-4 lg:block">
                <dt className="text-bone/70 lg:inline">{h.label}: </dt>
                <dd className="text-bone lg:inline tabular">{h.closed ? "Cerrado" : `${h.opens} a ${h.closes}`}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav className="lg:col-span-2" aria-label="Secciones">
          <p className="label-display text-gold">Secciones</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm lg:grid-cols-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-bone/75 hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-v mt-14">
        <RuneRule name="algiz" />
        <div className="mt-5 flex flex-col gap-2 text-xs text-steel sm:flex-row sm:justify-between">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}. Morón, Buenos Aires.
          </p>
          <p>
            {credits.url ? (
              <a href={credits.url} target="_blank" rel="noopener" className="hover:text-white">
                {credits.label}
              </a>
            ) : (
              credits.label
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
