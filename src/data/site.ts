/**
 * ============================================================
 *  VIKING'S GYM & BOX — CONTENIDO DEL SITIO
 * ============================================================
 *  Todo lo editable vive acá: textos, planes, precios, horarios,
 *  grilla de clases, galería, reseñas y datos de contacto.
 *  Cambiá lo que necesites y volvé a hacer `npm run build`.
 *
 *  Imágenes: van en /public/img/ y se referencian como "/img/archivo.webp".
 *  Si reemplazás una foto, actualizá también su `alt`.
 * ============================================================
 */

export type DisciplineId =
  | "musculacion"
  | "crossfit"
  | "boxeo"
  | "kick"
  | "spinning"
  | "localizada";

export type DayId = "lun" | "mar" | "mie" | "jue" | "vie" | "sab";

export interface Discipline {
  id: DisciplineId;
  name: string;
  /** Una sola línea, se muestra en la tarjeta. */
  description: string;
  image: string;
  alt: string;
  /** Punto de foco del recorte (CSS object-position), ej. "50% 30%". Opcional. */
  focal?: string;
  /** Color del chip en la grilla de horarios. */
  color: string;
}

export interface Plan {
  id: string;
  name: string;
  /** Precio en pesos, sin puntos. Se formatea solo. */
  price: number;
  period: string;
  summary: string;
  features: string[];
  /** La tarjeta destacada. Usá solo una. */
  featured?: boolean;
  /** Etiqueta de la cinta superior de la tarjeta destacada. */
  badge?: string;
  /** Etiqueta chica junto al precio (ej. "15% OFF"). */
  tag?: string;
  /** Si el precio cubre varios meses, se muestra el equivalente por mes. */
  months?: number;
}

/** Todo lo que puede aparecer en la grilla de clases. */
export type ClassTypeId =
  | Exclude<DisciplineId, "musculacion">
  | "muaythai"
  | "fullcontact"
  | "mma"
  | "kickinfantil"
  | "zumba";

export interface ClassSlot {
  day: DayId;
  /** Formato 24 h "HH:MM". */
  time: string;
  discipline: ClassTypeId;
}

export interface MerchItem {
  name: string;
  detail: string;
  image: string;
  alt: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  /** Punto de foco del recorte (CSS object-position). Opcional. */
  focal?: string;
  width: number;
  height: number;
}

export interface Review {
  /** Dejalo vacío si la reseña no tiene nombre visible. */
  author?: string;
  text: string;
}

export interface OpeningHours {
  label: string;
  /** Días en formato schema.org: Monday, Tuesday… */
  days: string[];
  opens?: string;
  closes?: string;
  closed?: boolean;
}

// ------------------------------------------------------------
//  Datos del negocio
// ------------------------------------------------------------

const whatsappNumber = "5491132849149";
const mapsQuery = "Vikings Gym & Box, Cristóbal Colón 339, Morón";

export const site = {
  name: "Vikings Gym & Box",
  /** Dominio final, sin barra al final. Se usa en canonical, Open Graph y sitemap. */
  url: "https://vikingsgymbox.com.ar",

  seo: {
    title: "Vikings Gym & Box | Gimnasio y Box de CrossFit en Morón",
    description:
      "Gimnasio en Morón con musculación, CrossFit, boxeo, kick boxing, spinning y localizada. 4,8⭐ en Google. Cristóbal Colón 339. ¡Escribinos por WhatsApp!",
    ogImage: "/img/og.jpg",
    /** Rango de precios para Google: $ (barato) a $$$$ (caro). */
    priceRange: "$$",
  },

  contact: {
    phoneDisplay: "+54 9 11 3284-9149",
    phoneE164: "+5491132849149",
    whatsappNumber,
    whatsappDefaultMessage: "Hola Vikings! Quiero info para empezar a entrenar",
    address: {
      street: "Cristóbal Colón 339",
      locality: "Morón",
      postalCode: "B1708",
      region: "Provincia de Buenos Aires",
      country: "AR",
    },
    /** Coordenadas aproximadas: verificalas en Google Maps (clic derecho sobre el pin). */
    geo: { lat: -34.6497, lng: -58.6189 },
    mapsQuery,
    mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
    mapsPlaceUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
    mapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
  },

  social: {
    instagram: {
      url: "https://www.instagram.com/vikingsgymbox/",
      handle: "@vikingsgymbox",
      followers: "+15 mil",
    },
    facebook: {
      url: "https://www.facebook.com/Vikings-Gym-Box-208981926305020/",
    },
  },

  hours: [
    {
      label: "Lunes a viernes",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "22:30",
    },
    { label: "Sábados", days: ["Saturday"], opens: "09:30", closes: "15:30" },
    { label: "Domingos", days: ["Sunday"], closed: true },
  ] satisfies OpeningHours[],

  rating: {
    value: 4.8,
    count: 449,
    /** Cantidad de reseñas por estrella, de 5 a 1. */
    distribution: [
      { stars: 5, count: 386 },
      { stars: 4, count: 40 },
      { stars: 3, count: 10 },
      { stars: 2, count: 5 },
      { stars: 1, count: 8 },
    ],
  },

  // ----------------------------------------------------------
  //  Hero
  // ----------------------------------------------------------
  hero: {
    titleLines: ["Forjá", "tu mejor", "versión"],
    subtitle:
      "Gimnasio y box en el corazón de Morón. Musculación, CrossFit, boxeo y más.",
    image: "/img/hero.webp",
    /** Punto de foco del recorte en pantallas angostas (CSS object-position). */
    imageFocal: "68% 50%",
    imageAlt:
      "Interior del box de Vikings Gym & Box en Morón, con rack, barras y discos bajo luz roja",
    primaryCta: "Quiero empezar",
    secondaryCta: "Ver planes",
    /** Franja de datos debajo del hero. */
    stats: [
      { value: "+15 mil", label: "en Instagram" },
      { value: "+10", label: "disciplinas y clases" },
      { value: "Hasta 22:30", label: "abierto de lunes a viernes" },
    ],
  },

  // ----------------------------------------------------------
  //  Disciplinas (el orden de acá es el orden en pantalla)
  // ----------------------------------------------------------
  disciplines: [
    {
      id: "musculacion",
      name: "Musculación",
      description: "Sala completa de máquinas, discos y mancuernas para entrenar a tu ritmo.",
      image: "/img/musculacion.webp",
      alt: "Sala de musculación con mancuernas y barra olímpica cargada",
      color: "#8d99ae",
    },
    {
      id: "crossfit",
      name: "CrossFit",
      description: "WODs en grupo, coach al lado y la intensidad que vos elijas.",
      image: "/img/crossfit.webp",
      alt: "Kettlebells y cajón de salto en el box de CrossFit",
      color: "#c1121f",
    },
    {
      id: "boxeo",
      name: "Boxeo",
      description: "Técnica de golpes, guantes y bolsa. Descargás todo y salís nuevo.",
      image: "/img/boxeo.webp",
      alt: "Bolsa de boxeo colgada y guantes listos para la clase",
      color: "#e85d04",
    },
    {
      id: "kick",
      name: "Kick Boxing",
      description: "Kick, Muay Thai, Full Contact y MMA. También hay kick infantil.",
      image: "/img/kick.webp",
      alt: "Bolsa larga de kick boxing en el sector de combate",
      color: "#b08d57",
    },
    {
      id: "spinning",
      name: "Spinning",
      description: "Bici, música fuerte y piernas que arden. La clase que se pasa volando.",
      image: "/img/spinning.webp",
      alt: "Bicicleta de spinning en la sala con luz tenue",
      color: "#5fa8d3",
    },
    {
      id: "localizada",
      name: "Localizada",
      description: "Trabajo puntual de piernas, glúteos, abdomen y brazos, con música y grupo.",
      image: "/img/localizada.webp",
      alt: "Colchoneta, step y mancuernas livianas para la clase de localizada",
      color: "#d9a0b8",
    },
  ] satisfies Discipline[],

  /** Clases de la grilla que no tienen tarjeta propia (color del chip). */
  extraClassTypes: [
    { id: "muaythai", name: "Muay Thai", color: "#e0a458" },
    { id: "fullcontact", name: "Full Contact", color: "#9b5de5" },
    { id: "mma", name: "MMA", color: "#ef476f" },
    { id: "kickinfantil", name: "Kick infantil", color: "#06d6a0" },
    { id: "zumba", name: "Zumba", color: "#ffd166" },
  ] satisfies { id: ClassTypeId; name: string; color: string }[],

  // ----------------------------------------------------------
  //  El Box
  // ----------------------------------------------------------
  box: {
    title: "Box de CrossFit en Morón",
    lead: "Acá nadie entrena solo.",
    paragraphs: [
      "El box es entrenamiento funcional: empujar, tirar, saltar, levantar. Movimientos que usás todos los días, combinados en un WOD —el entrenamiento del día— que hacés con el grupo.",
      "En cada clase hay un coach que te mira, te corrige la técnica y adapta cada ejercicio a tu nivel. Si nunca agarraste una barra, arrancás por lo básico. Si venís entrenando hace años, te vamos a exigir.",
    ],
    featuresTitle: "Qué vas a encontrar",
    features: [
      { title: "Equipamiento de calidad", text: "Rig, barras olímpicas, discos, kettlebells, cajones y remos." },
      { title: "Buen ambiente", text: "Gente que te alienta en la última repetición, no que te mira de reojo." },
      { title: "Profes atentos", text: "Te corrigen, te cuidan y saben cómo te llamás." },
      { title: "Clases para principiantes", text: "Cada WOD se escala. Nadie arranca sabiendo." },
    ],
    image: "/img/box.webp",
    imageFocal: "50% 50%",
    imageAlt: "El box de Vikings con rig, anillas, cajones de salto y kettlebells",
    cta: "Quiero probar una clase",
    ctaMessage: "Hola Vikings! Quiero probar una clase en el box",
    /** Pizarrón de ejemplo. Cambialo por el WOD que quieras. */
    wod: {
      label: "WOD de ejemplo",
      format: "AMRAP 14'",
      movements: ["12 kettlebell swings", "10 box jumps", "8 burpees", "200 m de remo"],
      note: "Todo se escala a tu nivel",
    },
  },

  // ----------------------------------------------------------
  //  Planes y precios (precios de ejemplo)
  // ----------------------------------------------------------
  plansNote: "Precios vigentes publicados por Vikings. Consultá por otras disciplinas y planes.",
  plans: [
    {
      id: "promo-bimestral",
      name: "Promo bimestral",
      price: 90000,
      period: "/2 meses",
      months: 2,
      summary: "Dos meses para arrancar con todo.",
      features: [
        "Musculación libre",
        "Boxeo, CrossFit, spinning y localizada",
        "Ideal para empezar",
      ],
    },
    {
      id: "promo-trimestral",
      name: "Promo trimestral",
      price: 125000,
      period: "/3 meses",
      months: 3,
      summary: "Pagando 3 meses tenés 15% off.",
      features: [
        "Musculación libre",
        "Boxeo, CrossFit, spinning y localizada",
        "El mejor precio por mes",
      ],
      featured: true,
      badge: "Más elegido",
      tag: "15% OFF",
    },
    {
      id: "kick-muaythai",
      name: "Kick Boxing / Muay Thai",
      price: 40000,
      period: "/mes",
      summary: "Tres clases por semana de combate.",
      features: [
        "Kick boxing o Muay Thai, 3 veces por semana",
        "Técnica, bolsa y trabajo con guantes",
        "Para todos los niveles",
      ],
    },
    {
      id: "zumba",
      name: "Zumba",
      price: 38000,
      period: "/mes",
      summary: "Lunes y miércoles a las 21 h.",
      features: ["Clases con música y grupo", "Sin experiencia previa", "Mucha energía y buena onda"],
    },
  ] satisfies Plan[],

  // ----------------------------------------------------------
  //  Grilla semanal de clases (horarios de ejemplo)
  // ----------------------------------------------------------
  days: [
    { id: "lun", short: "Lun", long: "Lunes" },
    { id: "mar", short: "Mar", long: "Martes" },
    { id: "mie", short: "Mié", long: "Miércoles" },
    { id: "jue", short: "Jue", long: "Jueves" },
    { id: "vie", short: "Vie", long: "Viernes" },
    { id: "sab", short: "Sáb", long: "Sábado" },
  ] satisfies { id: DayId; short: string; long: string }[],

  /** Musculación no tiene clases: la sala está abierta todo el horario. */
  scheduleNote:
    "La sala de musculación está abierta en todo el horario del gimnasio. Horario de clases vigente según la grilla de Vikings.",

  classes: [
    { day: "lun", time: "08:00", discipline: "boxeo" },
    { day: "lun", time: "08:00", discipline: "crossfit" },
    { day: "lun", time: "09:30", discipline: "kick" },
    { day: "lun", time: "12:00", discipline: "muaythai" },
    { day: "lun", time: "16:00", discipline: "boxeo" },
    { day: "lun", time: "18:00", discipline: "kick" },
    { day: "lun", time: "18:00", discipline: "kickinfantil" },
    { day: "lun", time: "19:00", discipline: "crossfit" },
    { day: "lun", time: "19:00", discipline: "localizada" },
    { day: "lun", time: "19:00", discipline: "mma" },
    { day: "lun", time: "20:00", discipline: "boxeo" },
    { day: "lun", time: "20:00", discipline: "spinning" },
    { day: "lun", time: "21:00", discipline: "kick" },
    { day: "lun", time: "21:00", discipline: "zumba" },
    { day: "mar", time: "09:30", discipline: "fullcontact" },
    { day: "mar", time: "16:00", discipline: "kick" },
    { day: "mar", time: "17:00", discipline: "boxeo" },
    { day: "mar", time: "18:00", discipline: "muaythai" },
    { day: "mar", time: "19:00", discipline: "crossfit" },
    { day: "mar", time: "20:00", discipline: "kick" },
    { day: "mar", time: "20:00", discipline: "spinning" },
    { day: "mar", time: "21:00", discipline: "boxeo" },
    { day: "mie", time: "08:00", discipline: "boxeo" },
    { day: "mie", time: "08:00", discipline: "crossfit" },
    { day: "mie", time: "09:30", discipline: "kick" },
    { day: "mie", time: "12:00", discipline: "muaythai" },
    { day: "mie", time: "16:00", discipline: "boxeo" },
    { day: "mie", time: "18:00", discipline: "kick" },
    { day: "mie", time: "18:00", discipline: "kickinfantil" },
    { day: "mie", time: "19:00", discipline: "crossfit" },
    { day: "mie", time: "19:00", discipline: "localizada" },
    { day: "mie", time: "19:00", discipline: "mma" },
    { day: "mie", time: "20:00", discipline: "boxeo" },
    { day: "mie", time: "20:00", discipline: "spinning" },
    { day: "mie", time: "21:00", discipline: "kick" },
    { day: "mie", time: "21:00", discipline: "zumba" },
    { day: "jue", time: "09:30", discipline: "fullcontact" },
    { day: "jue", time: "16:00", discipline: "kick" },
    { day: "jue", time: "17:00", discipline: "boxeo" },
    { day: "jue", time: "18:00", discipline: "muaythai" },
    { day: "jue", time: "19:00", discipline: "crossfit" },
    { day: "jue", time: "20:00", discipline: "kick" },
    { day: "jue", time: "20:00", discipline: "spinning" },
    { day: "jue", time: "21:00", discipline: "boxeo" },
    { day: "vie", time: "08:00", discipline: "boxeo" },
    { day: "vie", time: "08:00", discipline: "crossfit" },
    { day: "vie", time: "09:30", discipline: "kick" },
    { day: "vie", time: "12:00", discipline: "muaythai" },
    { day: "vie", time: "16:00", discipline: "boxeo" },
    { day: "vie", time: "18:00", discipline: "kick" },
    { day: "vie", time: "18:00", discipline: "kickinfantil" },
    { day: "vie", time: "19:00", discipline: "crossfit" },
    { day: "vie", time: "19:00", discipline: "localizada" },
    { day: "vie", time: "19:00", discipline: "mma" },
    { day: "vie", time: "20:00", discipline: "boxeo" },
    { day: "vie", time: "20:00", discipline: "spinning" },
    { day: "vie", time: "21:00", discipline: "kick" },
    { day: "sab", time: "10:00", discipline: "boxeo" },
    { day: "sab", time: "11:00", discipline: "spinning" },
    { day: "sab", time: "12:00", discipline: "crossfit" },
    { day: "sab", time: "13:30", discipline: "kick" },
  ] satisfies ClassSlot[],

  // ----------------------------------------------------------
  //  Galería (8 a 12 fotos). width/height = tamaño real del archivo.
  // ----------------------------------------------------------
  gallery: [
    { src: "/img/galeria-01.webp", alt: "Barra olímpica cargada sobre el piso de goma del box", width: 900, height: 1200 },
    { src: "/img/galeria-02.webp", alt: "Fila de kettlebells de distintos pesos", width: 1200, height: 800 },
    { src: "/img/galeria-03.webp", alt: "Bolsa de boxeo bajo un foco rojo", width: 900, height: 1125 },
    { src: "/img/galeria-04.webp", alt: "Anillas colgando del rig de CrossFit", width: 900, height: 900 },
    { src: "/img/galeria-05.webp", alt: "Bicicletas de spinning alineadas en la sala", width: 1200, height: 800 },
    { src: "/img/galeria-06.webp", alt: "Rack de mancuernas en la sala de musculación", width: 900, height: 1200 },
    { src: "/img/galeria-07.webp", alt: "Cajones de salto apilados en el box", width: 900, height: 900 },
    { src: "/img/galeria-08.webp", alt: "Cuerdas de batalla extendidas en el piso", width: 1200, height: 800 },
    { src: "/img/galeria-09.webp", alt: "Discos de colores apilados junto al rig", width: 900, height: 1125 },
    { src: "/img/galeria-10.webp", alt: "Guantes de boxeo colgados en la pared", width: 900, height: 1200 },
    { src: "/img/galeria-11.webp", alt: "Pelotas medicinales contra la pared del box", width: 1200, height: 800 },
    { src: "/img/galeria-12.webp", alt: "Rig completo del box con barras de dominadas", width: 900, height: 900 },
  ] satisfies GalleryImage[],

  // ----------------------------------------------------------
  //  Merch (fotos de las historias de Instagram)
  // ----------------------------------------------------------
  merch: [
    { name: "Remeras", detail: "Negras y blancas, talles S al XXXL y oversize", image: "/img/merch-remeras.webp", alt: "Remeras Vikings Gym & Box negra y blanca" },
    { name: "Musculosas", detail: "Sin manga, en negro", image: "/img/merch-musculosa.webp", alt: "Musculosa negra con el logo de Vikings Gym & Box" },
    { name: "Vaso vikingo", detail: "Chopp de 1 litro con el logo", image: "/img/merch-vaso.webp", alt: "Vaso tipo chopp de 1 litro con el logo de Vikings" },
    { name: "Guantes y tibiales", detail: "Para boxeo, kick y Muay Thai", image: "/img/merch-guantes.webp", alt: "Tibiales rojos y negros y guantes de boxeo azules" },
  ] satisfies MerchItem[],

  // ----------------------------------------------------------
  //  Reseñas reales de Google
  // ----------------------------------------------------------
  reviews: [
    {
      author: "Atuel Ochoa",
      text: "Calidad de vida, calidad humana, inmejorable precio para una inmejorable propuesta. Lejos de las fórmulas despersonalizadas, Vikings destaca por lo humano y profesional.",
    },
    {
      author: "Patricio Javier García",
      text: "Muy buen ambiente, espacioso, la maquinaria y el trato excelentes, pondría más estrellas, súper recomendado.",
    },
    { text: "Hermoso lugar, son todos muy cordiales y atentos." },
    { text: "Buena calidad de elementos y predisposición de los profesores." },
    { text: "Buena atención y excelente lugar para entrenar." },
  ] satisfies Review[],

  // ----------------------------------------------------------
  //  CTA final y footer
  // ----------------------------------------------------------
  finalCta: {
    title: "Tu primera clase te está esperando",
    text: "Escribinos, contanos qué querés entrenar y te decimos día y horario para arrancar.",
    button: "Escribinos por WhatsApp",
  },

  credits: { label: "Web por Houzites", url: "" },
};

export type Site = typeof site;
