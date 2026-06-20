import type { Localized } from "../i18n"

// CMS-like collection: pricing plans (single / membership / personal program).
// Edit here to manage the pricing cards; text is localized per language.
export interface Plan {
  id: string
  num: string
  price: number
  currency: string
  unit: Localized
  popular?: boolean
  name: Localized
  tagline: Localized
  features: Localized<string[]>
}

export const plans: Plan[] = [
  {
    id: "single",
    num: "01",
    price: 45,
    currency: "€",
    unit: { ru: "/ занятие", et: "/ treening", en: "/ session" },
    name: { ru: "Разовая", et: "Ühekordne", en: "Single session" },
    tagline: {
      ru: "Попробовать формат",
      et: "Proovi formaati",
      en: "Try the format",
    },
    features: {
      ru: [
        "60 минут персональной работы",
        "Постановка техники",
        "Разбор ошибок",
        "Без обязательств",
      ],
      et: [
        "60 minutit personaalset tööd",
        "Tehnika seadmine",
        "Vigade analüüs",
        "Ilma kohustuseta",
      ],
      en: [
        "60 minutes one-on-one",
        "Technique setup",
        "Mistake breakdown",
        "No commitment",
      ],
    },
  },
  {
    id: "membership",
    num: "02",
    price: 320,
    currency: "€",
    popular: true,
    unit: { ru: "/ месяц", et: "/ kuus", en: "/ month" },
    name: { ru: "Абонемент", et: "Püsipakett", en: "Membership" },
    tagline: {
      ru: "8 тренировок в месяц",
      et: "8 treeningut kuus",
      en: "8 sessions a month",
    },
    features: {
      ru: [
        "8 персональных тренировок",
        "Индивидуальная программа",
        "Корректировки по ходу",
        "Поддержка в чате 24/7",
        "План питания в подарок",
      ],
      et: [
        "8 personaaltreeningut",
        "Individuaalne programm",
        "Jooksvad korrektuurid",
        "Tugi vestluses 24/7",
        "Toitumiskava kingituseks",
      ],
      en: [
        "8 personal sessions",
        "Individual program",
        "Ongoing adjustments",
        "24/7 chat support",
        "Nutrition plan included",
      ],
    },
  },
  {
    id: "program",
    num: "03",
    price: 120,
    currency: "€",
    unit: { ru: "разово", et: "ühekordne", en: "one-time" },
    name: {
      ru: "Персональная программа",
      et: "Personaalprogramm",
      en: "Personal program",
    },
    tagline: {
      ru: "Тренируйся самостоятельно",
      et: "Treeni iseseisvalt",
      en: "Train on your own",
    },
    features: {
      ru: [
        "Программа на 8–12 недель",
        "Видео-разбор техники",
        "План питания и расчёт КБЖУ",
        "Еженедельные правки",
        "Доступ к AI-ассистенту",
      ],
      et: [
        "Programm 8–12 nädalaks",
        "Tehnika videoanalüüs",
        "Toitumiskava ja makrod",
        "Iganädalased korrektuurid",
        "Ligipääs AI-assistendile",
      ],
      en: [
        "8–12 week program",
        "Video technique review",
        "Meal plan & macros",
        "Weekly adjustments",
        "AI assistant access",
      ],
    },
  },
]

// Social + contact info used in the footer.
export const contactInfo = {
  email: "training@rumyantsev.fit",
  phone: "+372 5555 1234",
  socials: [
    { id: "instagram", label: "Instagram", href: "https://instagram.com/" },
    { id: "telegram", label: "Telegram", href: "https://t.me/" },
    { id: "youtube", label: "YouTube", href: "https://youtube.com/" },
  ],
}
