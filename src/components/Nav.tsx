import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useI18n } from "../i18n"
import { scrollToId } from "../lib/scroll"
import { Logo } from "./Logo"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { IconMenu, IconClose, IconArrowUpRight } from "./icons"
import "./Nav.css"

const NAV_ITEMS = [
  { id: "programs", key: "programs" },
  { id: "ai", key: "ai" },
  { id: "calendar", key: "booking" },
  { id: "pricing", key: "pricing" },
] as const

export function Nav() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("")
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  // Solid/blurred backdrop after a little scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scrollspy: highlight the link of the section in view
  useEffect(() => {
    const ids = [...NAV_ITEMS.map((i) => i.id), "contact"]
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Modal focus management: trap Tab inside the menu, close on Escape,
  // move focus in on open and back to the burger on close.
  useEffect(() => {
    if (!open) return
    const menu = menuRef.current
    if (!menu) return
    const getFocusable = () =>
      Array.from(
        menu.querySelectorAll<HTMLElement>(
          'button, a[href], input, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"))

    getFocusable()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        return
      }
      if (e.key !== "Tab") return
      const f = getFocusable()
      if (f.length === 0) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      burgerRef.current?.focus()
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // allow the menu close to start before scrolling
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav__inner container">
          <Logo onActivate={() => setOpen(false)} />

          <nav className="nav__links" aria-label={t.nav.primaryMenu}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`nav__link ${active === item.id ? "is-active" : ""}`}
                onClick={() => go(item.id)}
              >
                {t.nav[item.key]}
              </button>
            ))}
          </nav>

          <div className="nav__right">
            <div className="nav__lang">
              <LanguageSwitcher />
            </div>
            <button className="btn btn--light nav__cta" onClick={() => go("contact")}>
              {t.nav.contact}
              <IconArrowUpRight width={15} height={15} />
            </button>
            <button
              ref={burgerRef}
              className="nav__burger"
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobilemenu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.primaryMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="mobilemenu__links"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } }}
            >
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.id}
                  className="mobilemenu__link"
                  onClick={() => go(item.id)}
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    show: { y: 0, opacity: 1, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.5 } },
                  }}
                >
                  {t.nav[item.key]}
                </motion.button>
              ))}
            </motion.nav>

            <motion.div
              className="mobilemenu__footer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <LanguageSwitcher compact />
              <button className="btn btn--accent mobilemenu__cta" onClick={() => go("contact")}>
                {t.nav.contact}
                <IconArrowUpRight width={16} height={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
