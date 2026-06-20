import { motion } from "framer-motion"
import { useI18n } from "../i18n"
import { plans } from "../data/pricing"
import { scrollToId } from "../lib/scroll"
import { Reveal } from "./Reveal"
import { IconCheck, IconArrow } from "./icons"
import "./Pricing.css"

export function Pricing() {
  const { t, loc } = useI18n()

  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{t.pricing.eyebrow}</span>
          <h2 className="h2">{t.pricing.title}</h2>
          <p className="lead pricing__lead">{t.pricing.lead}</p>
        </Reveal>

        <div className="pricing__grid">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.article
                className={`plan ${p.popular ? "plan--popular" : ""}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {p.popular && <span className="plan__badge">{t.pricing.popular}</span>}

                <header className="plan__head">
                  <span className="plan__num">{p.num}</span>
                  <h3 className="h3 plan__name">{loc(p.name)}</h3>
                  <p className="plan__tagline">{loc(p.tagline)}</p>
                </header>

                <div className="plan__price">
                  <span className="plan__amount">
                    {p.currency}
                    {p.price}
                  </span>
                  <span className="plan__unit">{loc(p.unit)}</span>
                </div>

                <span className="plan__includes">{t.pricing.includes}</span>
                <ul className="plan__features">
                  {loc(p.features).map((f) => (
                    <li key={f}>
                      <IconCheck width={16} height={16} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${p.popular ? "btn--accent" : "btn--ghost"} plan__cta`}
                  onClick={() => scrollToId("contact")}
                >
                  {t.pricing.choose}
                  <IconArrow width={16} height={16} />
                </button>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
