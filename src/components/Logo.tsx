import { motion, useReducedMotion } from "framer-motion"
import { scrollToTop } from "../lib/scroll"
import { useI18n } from "../i18n"
import "./Logo.css"

// Monogram "RU" that reveals with the same mask-slide motion as the hero
// headline, tying the wordmark and the title together.
export function Logo({ onActivate }: { onActivate?: () => void }) {
  const reduce = useReducedMotion()
  const { t } = useI18n()

  const handle = () => {
    onActivate?.()
    scrollToTop()
  }

  const letters = ["R", "U"]

  return (
    <button className="logo" onClick={handle} aria-label={`Andrey Rumyantsev — ${t.nav.toTop}`}>
      <span className="logo__mark">
        {letters.map((ch, i) => (
          <span className="logo__mask" key={ch} aria-hidden="true">
            <motion.span
              className={`logo__char ${i === 1 ? "is-accent" : ""}`}
              initial={reduce ? false : { y: "120%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 + i * 0.08,
              }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
        <motion.span
          className="logo__dot"
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut", delay: 0.4 }}
        />
      </span>
    </button>
  )
}
