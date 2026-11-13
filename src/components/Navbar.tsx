import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { waLink } from "../lib/whatsapp";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";

export const NAV_LINKS = [
  { href: "#disciplinas", label: "Disciplinas" },
  { href: "#planes", label: "Planes" },
  { href: "#horarios", label: "Horarios" },
  { href: "#box", label: "Box" },
  { href: "#galeria", label: "Galería" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/img/logo/vikings-gym-box.svg"
      alt="Vikings Gym & Box"
      width={76}
      height={40}
      decoding="async"
      className={`block h-8 w-auto md:h-10 ${className}`}
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    // Esperar a que el panel deje de estar oculto para poder enfocarlo.
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? "border-b border-rule/80 bg-carbon/90 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-fire focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <nav className="container-v flex h-[4.25rem] items-center justify-between gap-6" aria-label="Principal">
        <a href="#inicio" aria-label={`${site.name}, ir al inicio`} className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="label-display relative py-2 text-[1.05rem] text-bone/80 transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-fire after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="btn btn-fire hidden min-h-0 px-5 py-3 text-[1.1rem] sm:inline-flex"
          >
            <WhatsAppIcon />
            Escribinos
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center text-bone lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Menú mobile (fuera del header: el blur del header encerraría al panel fijo) */}
      <div
        id="menu-movil"
        className={`tex-iron fixed inset-x-0 top-[4.25rem] bottom-0 z-40 overflow-y-auto transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        inert={!open}
      >
        <ul className="container-v flex flex-col pt-6 pb-10">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} className="border-b border-rule/70">
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-display text-[2.4rem] leading-none tracking-[0.06em] text-bone transition-colors hover:text-ember"
              >
                {l.label}
                <span className="h-px w-8 bg-fire" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <div className="container-v pb-[calc(2rem+env(safe-area-inset-bottom))]">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="btn btn-fire w-full"
          >
            <WhatsAppIcon />
            Escribinos por WhatsApp
          </a>
          <p className="mt-5 text-sm text-steel">
            {site.contact.address.street}, {site.contact.address.locality}
          </p>
        </div>
      </div>
    </>
  );
}
