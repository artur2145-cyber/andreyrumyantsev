import { motion } from "framer-motion"
import { useI18n } from "../i18n"
import { programs } from "../data/programs"
import { scrollToId } from "../lib/scroll"
import { Reveal } from "./Reveal"
import { ProgramGlyph, IconArrowUpRight } from "./icons"
import "./Programs.css"

export function Programs() {
  const { t, loc } = useI18n()

  return (
    <section className="section programs" id="programs">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{t.programs.eyebrow}</span>
          <h2 className="h2">{t.programs.title}</h2>
          <p className="lead programs__lead">{t.programs.lead}</p>
        </Reveal>

        <div className="programs__grid">
          {programs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.article
                className="pcard"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollToId("contact")}
              >
                <div className="pcard__top">
                  <span className="pcard__num">{p.num}</span>
                  <span className="pcard__icon">
                    <ProgramGlyph name={p.icon} width={26} height={26} />
                  </span>
                </div>

                <h3 className="h3 pcard__title">{loc(p.title)}</h3>
                <p className="body pcard__desc">{loc(p.description)}</p>

                <div className="pcard__tags">
                  {loc(p.tags).map((tag) => (
                    <span key={tag} className="pcard__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pcard__meta">
                  <span>{loc(p.meta)}</span>
                  <span className="pcard__dot" />
                  <span>
                    {t.programs.level}: {loc(p.level)}
                  </span>
                </div>

                <span className="pcard__cta">
                  {t.programs.cta}
                  <IconArrowUpRight width={16} height={16} />
                </span>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
