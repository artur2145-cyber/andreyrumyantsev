import { motion, useReducedMotion } from "framer-motion"
import { useI18n } from "../i18n"
import { scrollToId } from "../lib/scroll"
import { AnimatedHeading } from "./AnimatedHeading"
import { IconCalendar, IconSpark, IconArrow } from "./icons"
import "./Hero.css"

export function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  })

  return (
    <section className="hero" id="top">
      <div className="hero__media">
        <video
          className="hero__video"
          src="/hero.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero__scrim" />
        <div className="hero__grain" />
      </div>

      <div className="hero__content container">
        <motion.div className="hero__pills" {...fadeUp(0.1)}>
          <button className="pill" onClick={() => scrollToId("calendar")}>
            <IconCalendar width={15} height={15} />
            {t.hero.pillCalendar}
          </button>
          <button className="pill pill--accent" onClick={() => scrollToId("ai")}>
            <IconSpark width={15} height={15} />
            {t.hero.pillAi}
          </button>
        </motion.div>

        <AnimatedHeading
          lines={t.hero.titleLines}
          accentIndices={[1]}
          delay={0.25}
          className="hero__title"
        />

        <motion.p className="hero__lead" {...fadeUp(0.9)}>
          {t.hero.lead}
        </motion.p>

        <motion.div className="hero__actions" {...fadeUp(1.05)}>
          <button className="btn btn--accent" onClick={() => scrollToId("calendar")}>
            {t.hero.ctaPrimary}
            <IconArrow width={16} height={16} />
          </button>
          <button className="btn btn--ghost" onClick={() => scrollToId("programs")}>
            {t.hero.ctaSecondary}
          </button>
        </motion.div>

        <motion.ul className="hero__stats" {...fadeUp(1.2)}>
          <li>
            <b>12</b>
            <span>{t.hero.stat1}</span>
          </li>
          <li>
            <b>200+</b>
            <span>{t.hero.stat2}</span>
          </li>
          <li>
            <b>★</b>
            <span>{t.hero.stat3}</span>
          </li>
        </motion.ul>
      </div>

      {!reduce && (
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span>{t.hero.scrollHint}</span>
          <motion.span
            className="hero__scroll-line"
            animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </section>
  )
}
