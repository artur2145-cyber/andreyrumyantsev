import { useI18n } from "../i18n"
import { contactInfo } from "../data/pricing"
import { scrollToId } from "../lib/scroll"
import { Reveal } from "./Reveal"
import { AnimatedHeading } from "./AnimatedHeading"
import { Logo } from "./Logo"
import { socialIcons, IconArrowUpRight } from "./icons"
import "./Footer.css"

const NAV = [
  { id: "programs", key: "programs" },
  { id: "ai", key: "ai" },
  { id: "calendar", key: "booking" },
  { id: "pricing", key: "pricing" },
] as const

export function Footer() {
  const { t } = useI18n()
  const year = 2026

  return (
    <footer className="footer" id="contact">
      <div className="container">
        {/* CTA band */}
        <Reveal className="footer__cta">
          <AnimatedHeading
            as="h2"
            lines={[t.footer.cta]}
            className="footer__cta-title"
          />
          <button className="btn btn--accent footer__cta-btn" onClick={() => scrollToId("calendar")}>
            {t.footer.ctaBtn}
            <IconArrowUpRight width={17} height={17} />
          </button>
        </Reveal>

        <hr className="hr footer__divider" />

        {/* Columns */}
        <div className="footer__cols">
          <div className="footer__brand">
            <Logo />
            <p className="footer__tagline">{t.footer.tagline}</p>
            <div className="footer__socials">
              {contactInfo.socials.map((s) => {
                const Icon = socialIcons[s.id]
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="footer__social"
                  >
                    {Icon ? <Icon width={18} height={18} /> : s.label}
                  </a>
                )
              })}
            </div>
          </div>

          <nav className="footer__col">
            <span className="footer__col-title">{t.footer.navTitle}</span>
            {NAV.map((item) => (
              <button key={item.id} className="footer__link" onClick={() => scrollToId(item.id)}>
                {t.nav[item.key]}
              </button>
            ))}
          </nav>

          <div className="footer__col">
            <span className="footer__col-title">{t.footer.contactTitle}</span>
            <a className="footer__link" href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
            <a className="footer__link" href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
              {contactInfo.phone}
            </a>
            <span className="footer__muted">{t.footer.location}</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} Andrey Rumyantsev. {t.footer.rights}
          </span>
          <button className="footer__top" onClick={() => scrollToId("top")}>
            {t.footer.backToTop} ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
