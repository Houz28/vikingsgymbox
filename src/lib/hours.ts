import { site, type DayId } from "../data/site";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_IDS: (DayId | null)[] = [null, "lun", "mar", "mie", "jue", "vie", "sab"];
const DAY_NAMES_ES: Record<string, string> = {
  Monday: "el lunes",
  Tuesday: "el martes",
  Wednesday: "el miércoles",
  Thursday: "el jueves",
  Friday: "el viernes",
  Saturday: "el sábado",
  Sunday: "el domingo",
};

/** Hora actual en Argentina, sin importar la zona horaria del visitante. */
function nowInArgentina() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { weekday: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** "08:00" → "8:00" */
const short = (hhmm: string) => hhmm.replace(/^0/, "");

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export type OpenStatus = { open: boolean; text: string };

export function getOpenStatus(): OpenStatus {
  const { weekday, minutes } = nowInArgentina();
  const today = site.hours.find((h) => h.days.includes(weekday));
  if (today && !today.closed && today.opens && today.closes) {
    if (minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
      return { open: true, text: `Abierto ahora, cierra a las ${short(today.closes)}` };
    }
    if (minutes < toMinutes(today.opens)) {
      return { open: false, text: `Cerrado, abrimos hoy a las ${short(today.opens)}` };
    }
  }
  const idx = WEEKDAYS.indexOf(weekday);
  for (let i = 1; i <= 7; i++) {
    const day = WEEKDAYS[(idx + i) % 7];
    const h = site.hours.find((x) => x.days.includes(day));
    if (h && !h.closed && h.opens) {
      const when = i === 1 ? "mañana" : DAY_NAMES_ES[day];
      return { open: false, text: `Cerrado, abrimos ${when} a las ${short(h.opens)}` };
    }
  }
  return { open: false, text: "Cerrado" };
}

/** Día de la grilla de clases que corresponde a hoy (el domingo muestra el lunes). */
export function todayDayId(): DayId {
  const { weekday } = nowInArgentina();
  return DAY_IDS[WEEKDAYS.indexOf(weekday)] ?? "lun";
}
