import { useEffect, useState } from "react";
import { waLink } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  // El tooltip aparece solo una vez a los pocos segundos; después, con hover o foco.
  const [hint, setHint] = useState(false);
  useEffect(() => {
    const show = window.setTimeout(() => setHint(true), 4000);
    const hide = window.setTimeout(() => setHint(false), 9000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // Se oculta mientras se ve el CTA final y, en mobile, mientras se ven los botones de los planes.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const cta = document.getElementById("empezar");
    const plans = document.getElementById("planes-lista");
    if (!("IntersectionObserver" in window) || !cta) return;
    const visible = new Set<Element>();
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () =>
      setHidden(visible.has(cta) || (mobile.matches && plans !== null && visible.has(plans)));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        update();
      },
      { threshold: 0.15 },
    );
    io.observe(cta);
    if (plans) io.observe(plans);
    mobile.addEventListener("change", update);
    return () => {
      io.disconnect();
      mobile.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      className={`group fixed transition-[opacity,transform] duration-300 ${hidden ? "pointer-events-none translate-y-4 opacity-0" : ""} right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex items-center gap-3 md:right-6 md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]`}
      aria-hidden={hidden || undefined}
    >
      <span
        className={`pointer-events-none relative bg-white px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-carbon shadow-lg transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 ${
          hint ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
        aria-hidden="true"
      >
        ¿Arrancamos?
        <span className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
      </span>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener"
        tabIndex={hidden ? -1 : undefined}
        aria-label="¿Arrancamos? Escribinos por WhatsApp"
        className="wa-pulse relative isolate grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-[0_10px_30px_-6px_rgb(37_211_102/0.6)] transition-transform hover:scale-105 focus-visible:outline-white md:h-16 md:w-16"
      >
        <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
      </a>
    </div>
  );
}
