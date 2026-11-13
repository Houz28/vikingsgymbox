import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import { ChevronIcon, CloseIcon, InstagramIcon } from "./icons";
import { Reveal, SectionHeading } from "./ornaments";

export function Galeria() {
  const images = site.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setIndex(i);
  };
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (index === null && dialog.open) {
      dialog.close();
    }
  }, [index]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.body.style.overflow = "";
      setIndex(null);
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const current = index !== null ? images[index] : null;

  return (
    <section id="galeria" className="relative tex-iron pt-20 pb-28 md:pt-28 md:pb-36" aria-labelledby="galeria-titulo">
      <div className="container-v">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="galeria-titulo"
            rune="kenaz"
            title="Así se entrena en Vikings"
            lead={`Hierro, guantes y mucha transpiración. Más fotos y videos en ${site.social.instagram.handle}.`}
          />
          <Reveal className="shrink-0">
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
            >
              <InstagramIcon />
              Ver más en Instagram
            </a>
          </Reveal>
        </div>

        <ul className="mt-12 columns-2 gap-3 md:mt-14 md:columns-3 md:gap-4 lg:columns-4">
          {images.map((img, i) => (
            <li key={img.src} className="mb-3 break-inside-avoid md:mb-4">
              <Reveal delay={(i % 4) * 60}>
                <button
                  type="button"
                  onClick={(e) => open(i, e.currentTarget)}
                  className="group relative block w-full overflow-hidden bg-coal focus-visible:outline-offset-2"
                  aria-label={`Ampliar foto: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition-[transform,filter] duration-700 ease-[var(--ease-blade)] group-hover:scale-[1.04] group-hover:brightness-110"
                  />
                  <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 transition-[box-shadow] group-hover:ring-2 group-hover:ring-fire" />
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Galería de fotos"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current ? (
          <div className="pointer-events-none flex h-full w-full flex-col">
            <div className="pointer-events-auto flex items-center justify-between px-4 pt-[calc(1rem+env(safe-area-inset-top))] md:px-8">
              <p className="label-display text-steel tabular" aria-live="polite">
                {index! + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="grid h-12 w-12 place-items-center text-bone hover:text-ember"
                aria-label="Cerrar galería"
                autoFocus
              >
                <CloseIcon className="h-7 w-7" />
              </button>
            </div>

            <figure className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-4 md:px-24">
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="pointer-events-auto max-h-[calc(100%-3rem)] w-auto max-w-full object-contain"
              />
              <figcaption className="mt-4 max-w-[60ch] text-center text-sm text-bone/75">{current.alt}</figcaption>
            </figure>

            <div className="flex justify-center gap-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:justify-between md:px-6 md:pb-0">
              <button
                type="button"
                onClick={() => step(-1)}
                className="pointer-events-auto grid h-12 w-12 place-items-center border border-rule bg-carbon/80 text-bone hover:border-fire hover:text-white"
                aria-label="Foto anterior"
              >
                <ChevronIcon className="h-6 w-6 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="pointer-events-auto grid h-12 w-12 place-items-center border border-rule bg-carbon/80 text-bone hover:border-fire hover:text-white"
                aria-label="Foto siguiente"
              >
                <ChevronIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
