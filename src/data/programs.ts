import type { Localized } from "../i18n"

// CMS-like collection: training programs.
// Each entry carries its own RU/EST/ENG text — edit here to manage the cards.
export type ProgramIcon = "strength" | "endurance" | "mass" | "nutrition"

export interface Program {
  id: string
  num: string
  icon: ProgramIcon
  title: Localized
  meta: Localized
  level: Localized
  description: Localized
  tags: Localized<string[]>
}

export const programs: Program[] = [
  {
    id: "strength",
    num: "01",
    icon: "strength",
    title: { ru: "Сила", et: "Jõud", en: "Strength" },
    meta: { ru: "8 недель", et: "8 nädalat", en: "8 weeks" },
    level: { ru: "Все уровни", et: "Kõik tasemed", en: "All levels" },
    description: {
      ru: "Базовые движения и прогрессия нагрузки. Растим присед, жим и тягу — фундамент любой формы.",
      et: "Põhiliigutused ja koormuse progressioon. Kasvatame kükki, surumist ja jõutõmmet — iga vormi vundament.",
      en: "Compound lifts and progressive overload. We grow your squat, press and deadlift — the base of every physique.",
    },
    tags: {
      ru: ["Присед", "Жим", "Становая"],
      et: ["Kükk", "Surumine", "Jõutõmme"],
      en: ["Squat", "Press", "Deadlift"],
    },
  },
  {
    id: "endurance",
    num: "02",
    icon: "endurance",
    title: { ru: "Выносливость", et: "Vastupidavus", en: "Endurance" },
    meta: { ru: "6 недель", et: "6 nädalat", en: "6 weeks" },
    level: { ru: "Средний", et: "Keskmine", en: "Intermediate" },
    description: {
      ru: "Интервальные и круговые тренировки для работоспособности, сердца и рельефа.",
      et: "Intervall- ja ringtreeningud töövõime, südame ja reljeefi jaoks.",
      en: "Interval and circuit work for conditioning, heart and definition.",
    },
    tags: {
      ru: ["HIIT", "Круговые", "Кардио"],
      et: ["HIIT", "Ringtreening", "Kardio"],
      en: ["HIIT", "Circuits", "Cardio"],
    },
  },
  {
    id: "mass",
    num: "03",
    icon: "mass",
    title: { ru: "Масса", et: "Lihasmass", en: "Mass" },
    meta: { ru: "12 недель", et: "12 nädalat", en: "12 weeks" },
    level: { ru: "Средний+", et: "Kesktase+", en: "Intermediate+" },
    description: {
      ru: "Объёмные сплиты на гипертрофию: разбиваем тело по группам и системно растим мышцы.",
      et: "Mahukad splitid hüpertroofiaks: jaotame keha lihasgruppideks ja kasvatame süsteemselt.",
      en: "High-volume hypertrophy splits: we divide the body by muscle group and build systematically.",
    },
    tags: {
      ru: ["Сплит", "Объём", "Гипертрофия"],
      et: ["Split", "Maht", "Hüpertroofia"],
      en: ["Split", "Volume", "Hypertrophy"],
    },
  },
  {
    id: "nutrition",
    num: "04",
    icon: "nutrition",
    title: { ru: "Питание", et: "Toitumine", en: "Nutrition" },
    meta: { ru: "Сопровождение", et: "Pidev tugi", en: "Ongoing" },
    level: { ru: "Все уровни", et: "Kõik tasemed", en: "All levels" },
    description: {
      ru: "Расчёт КБЖУ, рацион под цель и контроль на сушке или массе — без жёстких диет.",
      et: "Makrode arvestus, toitumiskava eesmärgi järgi ja kontroll rasvapõletusel või massil — ilma rangete dieetideta.",
      en: "Macros calculated, a diet built around your goal and check-ins on a cut or bulk — no crash diets.",
    },
    tags: {
      ru: ["КБЖУ", "Рацион", "Сушка"],
      et: ["Makrod", "Toitumiskava", "Rasvapõletus"],
      en: ["Macros", "Meal plan", "Cutting"],
    },
  },
]
