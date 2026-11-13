import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Runas del Futhark antiguo, dibujadas con trazos rectos.
 * Cada sección usa una con sentido: ᚢ Uruz (fuerza), ᛏ Tiwaz (el guerrero),
 * ᚠ Fehu (riqueza), ᛃ Jera (el ciclo, el tiempo), ᚲ Kenaz (la antorcha),
 * ᚹ Wunjo (alegría), ᛟ Othala (el hogar).
 */
const RUNES = {
  uruz: "M5 30V2l10 8v20",
  tiwaz: "M10 2v28M3 10l7-8 7 8",
  fehu: "M5 2v28M5 11l10-8M5 19l10-8",
  jera: "M9 5 3 11l6 6M11 15l6 6-6 6",
  kenaz: "M15 5 5 16l10 11",
  wunjo: "M6 2v28M6 2l9 7-9 7",
  othala: "M3 30 17 12 10 3 3 12l14 18",
  algiz: "M10 2v28M3 4l7 9 7-9",
} as const;

export type RuneName = keyof typeof RUNES;

export function Rune({ name, className }: { name: RuneName; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d={RUNES[name]} />
    </svg>
  );
}

/** Separador: línea, runa, línea. En dorado viejo, sutil. */
export function RuneRule({
  name,
  className = "",
  align = "start",
}: {
  name: RuneName;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-3 text-gold/80 ${align === "center" ? "justify-center" : ""} ${className}`}
      aria-hidden="true"
    >
      {align === "center" ? <span className="h-px w-12 bg-gradient-to-l from-gold/60 to-transparent" /> : null}
      <Rune name={name} className="h-5 w-3.5 shrink-0" />
      <span
        className={`h-px bg-gradient-to-r from-gold/60 to-transparent ${align === "center" ? "w-12" : "w-24"}`}
      />
    </div>
  );
}

/*
 * Corte de hacha: el borde superior de una sección se recorta en diagonal,
 * con una muesca de hachazo, y la sección se monta sobre la anterior.
 * Así la textura de cada sección sigue intacta hasta el filo.
 */
const EDGE_H = "clamp(28px, 5.5vw, 80px)";
// Línea de corte en un lienzo de 1440×80 (x se estira al ancho, y a la altura del corte).
const CUT: [number, number][] = [
  [0, 62],
  [838, 18],
  [866, 44],
  [884, 14],
  [1440, 0],
];

function cutPoints(flip: boolean) {
  const pts = CUT.map(([x, y]) => [flip ? 1440 - x : x, y] as const);
  return flip ? [...pts].reverse() : pts;
}

/** Estilo para una sección con corte de hacha arriba. */
export function axeTop(flip = false): CSSProperties {
  const poly = cutPoints(flip)
    .map(([x, y]) => `${((x / 1440) * 100).toFixed(3)}% calc(var(--edge) * ${(y / 80).toFixed(4)})`)
    .join(", ");
  return {
    "--edge": EDGE_H,
    marginTop: `calc(${EDGE_H} * -1)`,
    clipPath: `polygon(${poly}, 100% 100%, 0 100%)`,
  } as CSSProperties;
}

/** El filo: una línea que recorre el corte (va dentro de la sección con axeTop). */
export function AxeLine({ flip = false, color = "fire" }: { flip?: boolean; color?: "fire" | "gold" }) {
  const points = cutPoints(flip)
    .map(([x, y]) => `${x},${y}`)
    .join(" ");
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 z-10 block h-[var(--edge)] w-full"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color === "fire" ? "#c1121f" : "#b08d57"}
        strokeWidth={4}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Revela hijos con fade + slide-up al entrar en pantalla (respeta reduced-motion vía CSS). */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("is-visible");
    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }
    // Respaldo: si el observer no dispara (pestaña en segundo plano, navegador viejo), mostrar igual.
    const fallback = window.setTimeout(show, 2500);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Encabezado de sección: runa + H2 grande + bajada opcional. */
export function SectionHeading({
  rune,
  title,
  lead,
  align = "start",
  glow = false,
  id,
}: {
  rune: RuneName;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  glow?: boolean;
  id?: string;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto text-center" : ""}>
      <RuneRule name={rune} align={align} className="mb-5" />
      <h2
        id={id}
        className={`display-2 max-w-[18ch] text-balance ${align === "center" ? "mx-auto" : ""} ${glow ? "glow-title" : ""}`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-5 max-w-[56ch] text-pretty text-base leading-relaxed text-steel md:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
