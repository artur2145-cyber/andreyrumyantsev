import { useI18n, LANGS, LANG_LABELS } from "../i18n"
import { motion } from "framer-motion"
import "./LanguageSwitcher.css"

// RUS / EST / ENG segmented switch. Placed to the LEFT of the contact button.
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n()

  return (
    <div className={`lang ${compact ? "lang--compact" : ""}`} role="group" aria-label="Language">
      {LANGS.map((l) => {
        const active = l === lang
        return (
          <button
            key={l}
            className={`lang__btn ${active ? "is-active" : ""}`}
            onClick={() => setLang(l)}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId={compact ? "lang-pill-m" : "lang-pill"}
                className="lang__pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="lang__label">{LANG_LABELS[l]}</span>
          </button>
        )
      })}
    </div>
  )
}
