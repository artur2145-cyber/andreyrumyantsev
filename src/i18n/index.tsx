import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { ru } from "./ru"
import { et } from "./et"
import { en } from "./en"

export type Lang = "ru" | "et" | "en"

// All locales share the exact shape of the Russian source dictionary.
export type Dict = typeof ru

const DICTS: Record<Lang, Dict> = { ru, et, en }
export const LANGS: Lang[] = ["ru", "et", "en"]
export const LANG_LABELS: Record<Lang, string> = {
  ru: "RUS",
  et: "EST",
  en: "ENG",
}

// A localized value held inside CMS data: { ru, et, en }
export type Localized<T = string> = Record<Lang, T>

const STORAGE_KEY = "ar-lang"

function detectInitial(): Lang {
  if (typeof window === "undefined") return "ru"
  const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null
  if (saved && LANGS.includes(saved)) return saved
  const nav = window.navigator.language.slice(0, 2).toLowerCase()
  if (nav === "et") return "et"
  if (nav === "en") return "en"
  return "ru"
}

interface I18nValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
  /** Resolve a localized CMS field for the active language. */
  loc: <T>(field: Localized<T>) => T
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: DICTS[lang],
      loc: (field) => field[lang],
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>")
  return ctx
}
