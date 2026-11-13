import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { site, type ClassSlot, type DayId, type DisciplineId } from "../data/site";
import { getOpenStatus, todayDayId, type OpenStatus } from "../lib/hours";
import { ClockIcon } from "./icons";
import { Reveal, SectionHeading } from "./ornaments";

const disciplineById = Object.fromEntries(site.disciplines.map((d) => [d.id, d])) as Record<
  DisciplineId,
  (typeof site.disciplines)[number]
>;

function ClassChip({ id, compact = false }: { id: DisciplineId; compact?: boolean }) {
  const d = disciplineById[id];
  return (
    <span
      className={`inline-flex items-center border-l-[3px] font-semibold leading-tight text-bone ${
        compact ? "px-2 py-1 text-[0.74rem]" : "px-3 py-1.5 text-[0.88rem]"
      }`}
      style={{ borderColor: d.color, backgroundColor: `${d.color}26` }}
    >
      {d.name}
    </span>
  );
}

function OpenNow() {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const t = window.setInterval(update, 60_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <p className="flex min-h-6 items-center gap-2.5 text-sm text-bone/90" aria-live="polite">
      {status ? (
        <>
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span
              className={`absolute inset-0 rounded-full ${status.open ? "bg-wa" : "bg-fire"}`}
            />
          </span>
          {status.text}
        </>
      ) : null}
    </p>
  );
}

export function Horarios() {
  const { days, classes, hours } = site;
  const [activeDay, setActiveDay] = useState<DayId>("lun");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setActiveDay(todayDayId());
  }, []);

  const times = useMemo(() => [...new Set(classes.map((c) => c.time))].sort(), [classes]);
  const byCell = useMemo(() => {
    const map = new Map<string, ClassSlot[]>();
    for (const c of classes) {
      const key = `${c.day}-${c.time}`;
      map.set(key, [...(map.get(key) ?? []), c]);
    }
    return map;
  }, [classes]);
  const usedDisciplines = useMemo(
    () => site.disciplines.filter((d) => classes.some((c) => c.discipline === d.id)),
    [classes],
  );
  const dayClasses = classes
    .filter((c) => c.day === activeDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % days.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + days.length) % days.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = days.length - 1;
    else return;
    e.preventDefault();
    setActiveDay(days[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="horarios" className="relative tex-iron py-20 md:py-28" aria-labelledby="horarios-titulo">
      <div className="container-v">
        <SectionHeading
          id="horarios-titulo"
          rune="jera"
          title="Clases de boxeo en Morón, CrossFit y mucho más"
          lead="Horarios del gimnasio y la grilla semanal de clases. Te anotás por WhatsApp y listo."
        />

        {/* Horario del gimnasio */}
        <Reveal className="mt-12 md:mt-14">
          <div className="frame [--cut:20px] [--fill:#141414]">
            <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
              <div className="flex items-center gap-4">
                <ClockIcon className="h-9 w-9 shrink-0 text-gold" />
                <div>
                  <h3 className="display-3 text-white">Horario del gimnasio</h3>
                  <div className="mt-1.5">
                    <OpenNow />
                  </div>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-3">
                {hours.map((h) => (
                  <div key={h.label} className="bg-[#141414] py-3 sm:px-5 sm:py-2">
                    <dt className="text-sm text-steel">{h.label}</dt>
                    <dd
                      className={`mt-1 font-display text-[2rem] leading-none tracking-[0.04em] tabular ${
                        h.closed ? "text-steel/70" : "text-white"
                      }`}
                    >
                      {h.closed ? "Cerrado" : `${h.opens} a ${h.closes}`}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Grilla de clases */}
        <Reveal delay={80} className="mt-14">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h3 className="display-3 text-white">Clases de la semana</h3>
            <ul className="flex flex-wrap gap-2" aria-label="Referencias de colores">
              {usedDisciplines.map((d) => (
                <li key={d.id}>
                  <ClassChip id={d.id} compact />
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile: tabs por día */}
          <div className="mt-6 md:hidden">
            <div role="tablist" aria-label="Día de la semana" className="flex gap-1">
              {days.map((d, i) => {
                const selected = d.id === activeDay;
                return (
                  <button
                    key={d.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`tab-${d.id}`}
                    aria-selected={selected}
                    aria-controls="panel-dia"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveDay(d.id)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={`label-display min-w-0 flex-1 border px-0 py-3 text-[1.1rem] transition-colors ${
                      selected
                        ? "border-fire bg-fire text-white"
                        : "border-rule bg-coal text-bone/75 hover:border-steel/60"
                    }`}
                  >
                    {d.short}
                  </button>
                );
              })}
            </div>
            <div
              id="panel-dia"
              role="tabpanel"
              aria-labelledby={`tab-${activeDay}`}
              className="mt-4 border-t border-rule"
            >
              <p className="sr-only">{days.find((d) => d.id === activeDay)?.long}</p>
              {dayClasses.length ? (
                <ul>
                  {dayClasses.map((c, i) => (
                    <li key={`${c.time}-${c.discipline}-${i}`} className="flex items-center gap-5 border-b border-rule py-3.5">
                      <span className="w-16 font-display text-[1.7rem] leading-none tracking-[0.04em] text-white tabular">
                        {c.time}
                      </span>
                      <ClassChip id={c.discipline} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-6 text-steel">No hay clases este día. La sala de musculación sigue abierta.</p>
              )}
            </div>
          </div>

          {/* Desktop/tablet: tabla semanal */}
          <div className="mt-6 hidden md:block">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">Grilla semanal de clases de lunes a sábado</caption>
              <thead>
                <tr className="border-b border-steel/30">
                  <th scope="col" className="w-[4.5rem] py-3 pr-2 text-sm font-medium text-steel lg:w-24">
                    Hora
                  </th>
                  {days.map((d) => (
                    <th key={d.id} scope="col" className="label-display px-1.5 py-3 text-[1.15rem] text-bone lg:px-2">
                      <abbr title={d.long} className="no-underline">
                        {d.short}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((t) => (
                  <tr key={t} className="border-b border-rule align-top transition-colors hover:bg-white/[0.02]">
                    <th scope="row" className="py-3 pr-2 font-display text-[1.45rem] leading-none font-normal tracking-[0.04em] text-white tabular">
                      {t}
                    </th>
                    {days.map((d) => {
                      const cell = byCell.get(`${d.id}-${t}`) ?? [];
                      return (
                        <td key={d.id} className="px-1.5 py-2.5 lg:px-2">
                          <div className="flex flex-col items-start gap-1.5">
                            {cell.map((c, i) => (
                              <ClassChip key={`${c.discipline}-${i}`} id={c.discipline} compact />
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-steel">{site.scheduleNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
