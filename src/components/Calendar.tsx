import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useI18n } from "../i18n"
import { Reveal } from "./Reveal"
import { IconClock, IconCheck, IconCalendar, IconArrow } from "./icons"
import "./Calendar.css"

const SLOTS = ["08:00", "10:00", "12:00", "16:00", "18:00", "20:00"]

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function BookingCalendar() {
  const { t, lang } = useI18n()
  const today = useMemo(() => startOfDay(new Date()), [])

  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [selected, setSelected] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [done, setDone] = useState(false)

  // Build the Monday-first grid for the current view month.
  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1)
    const lead = (first.getDay() + 6) % 7 // Mon=0 … Sun=6
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate()
    const out: (Date | null)[] = []
    for (let i = 0; i < lead; i++) out.push(null)
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(view.y, view.m, d))
    while (out.length % 7 !== 0) out.push(null)
    return out
  }, [view])

  const isDisabled = (d: Date) => d < today || d.getDay() === 0 // past or Sunday (closed)
  const slotAvailable = (d: Date, i: number) => {
    if ((d.getDate() + i) % 4 === 0) return false // deterministic mock availability
    // Hide slots that have already passed when the selected day is today.
    if (d.getTime() === today.getTime()) {
      const [h, m] = SLOTS[i].split(":").map(Number)
      const slot = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m)
      if (slot <= new Date()) return false
    }
    return true
  }

  const canGoBack = view.y > today.getFullYear() || view.m > today.getMonth()

  const move = (dir: number) => {
    setView((v) => {
      const m = v.m + dir
      if (m < 0) return { y: v.y - 1, m: 11 }
      if (m > 11) return { y: v.y + 1, m: 0 }
      return { y: v.y, m }
    })
  }

  const pickDay = (d: Date) => {
    setSelected(d)
    setTime(null)
    setDone(false)
  }

  // Estonian uses an ordinal "25. juuni"; ru/en use "25 июня" / "25 June".
  const fmtSelected = selected
    ? `${selected.getDate()}${lang === "et" ? "." : ""} ${
        t.booking.monthsGen[selected.getMonth()]
      }${time ? `, ${time}` : ""}`
    : ""

  const ready = selected && time && name.trim() && contact.trim()

  return (
    <section className="section booking" id="calendar">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{t.booking.eyebrow}</span>
          <h2 className="h2">{t.booking.title}</h2>
          <p className="lead booking__lead">{t.booking.lead}</p>
        </Reveal>

        <Reveal delay={0.05} className="booking__card">
          {/* Calendar */}
          <div className="booking__cal">
            <div className="booking__cal-head">
              <span className="booking__month">
                {t.booking.months[view.m]} {view.y}
              </span>
              <div className="booking__nav">
                <button
                  onClick={() => move(-1)}
                  disabled={!canGoBack}
                  aria-label={t.booking.monthsBack}
                  className="booking__navbtn"
                >
                  <IconArrow width={18} height={18} style={{ transform: "rotate(180deg)" }} />
                </button>
                <button
                  onClick={() => move(1)}
                  aria-label={t.booking.monthsFwd}
                  className="booking__navbtn"
                >
                  <IconArrow width={18} height={18} />
                </button>
              </div>
            </div>

            <div className="booking__weekdays">
              {t.booking.weekdays.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>

            <div className="booking__grid">
              {cells.map((d, i) =>
                d ? (
                  <button
                    key={i}
                    className={`booking__day ${
                      selected && d.getTime() === selected.getTime() ? "is-selected" : ""
                    } ${d.getTime() === today.getTime() ? "is-today" : ""}`}
                    disabled={isDisabled(d)}
                    onClick={() => pickDay(d)}
                    aria-label={`${d.getDate()} ${t.booking.monthsGen[d.getMonth()]}`}
                    aria-pressed={!!selected && d.getTime() === selected.getTime()}
                    aria-current={d.getTime() === today.getTime() ? "date" : undefined}
                  >
                    {d.getDate()}
                  </button>
                ) : (
                  <span key={i} className="booking__day booking__day--empty" />
                ),
              )}
            </div>
          </div>

          {/* Right rail: slots + form */}
          <div className="booking__rail">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  className="booking__success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="booking__success-ic">
                    <IconCheck width={28} height={28} />
                  </span>
                  <p className="h3">{fmtSelected}</p>
                  <p className="body">{t.booking.success}</p>
                </motion.div>
              ) : !selected ? (
                <motion.div
                  key="empty"
                  className="booking__placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <IconCalendar width={30} height={30} />
                  <p>{t.booking.pickDate}</p>
                  <span className="booking__dur">
                    <IconClock width={15} height={15} /> {t.booking.duration}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="booking__form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="booking__selected">
                    <IconCalendar width={16} height={16} />
                    {fmtSelected || t.booking.pickTime}
                  </div>

                  <span className="booking__label">{t.booking.pickTime}</span>
                  <div className="booking__slots">
                    {SLOTS.map((s, i) => {
                      const ok = slotAvailable(selected, i)
                      return (
                        <button
                          key={s}
                          className={`booking__slot ${time === s ? "is-selected" : ""}`}
                          disabled={!ok}
                          onClick={() => setTime(s)}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>

                  <div className="booking__fields">
                    <input
                      className="booking__input"
                      placeholder={t.booking.namePlaceholder}
                      aria-label={t.booking.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="booking__input"
                      placeholder={t.booking.contactPlaceholder}
                      aria-label={t.booking.contactPlaceholder}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn--accent booking__confirm"
                    disabled={!ready}
                    onClick={() => setDone(true)}
                  >
                    {t.booking.confirm}
                    <IconArrow width={16} height={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
