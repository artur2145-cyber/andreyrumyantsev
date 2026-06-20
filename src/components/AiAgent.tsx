import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useI18n } from "../i18n"
import { Reveal } from "./Reveal"
import { IconSend, IconSpark } from "./icons"
import "./AiAgent.css"

interface Message {
  role: "user" | "assistant"
  content: string
}

/**
 * Config for the AI widget — the code-site equivalent of Framer "property
 * controls". Exposed so labels/endpoint can be tuned in one place. Visual
 * colors come from the design tokens (var(--accent) etc).
 */
export interface AiAgentConfig {
  endpoint?: string
}

export function AiAgent({ config }: { config?: AiAgentConfig }) {
  const { t, lang } = useI18n()
  const endpoint = config?.endpoint ?? "/api/chat"

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Restart the conversation when the language changes so the model never
  // receives a mixed-language history.
  useEffect(() => {
    setMessages([])
    setInput("")
    setLoading(false)
  }, [lang])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, loading])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const next = [...messages, { role: "user" as const, content: trimmed }]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      })
      const data = await res.json()
      const reply = data.reply || t.ai.error
      setMessages((m) => [...m, { role: "assistant", content: reply }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t.ai.error }])
    } finally {
      setLoading(false)
    }
  }

  const showGreeting = messages.length === 0

  return (
    <section className="section ai" id="ai">
      <div className="container ai__grid">
        <Reveal className="ai__intro">
          <span className="eyebrow">{t.ai.eyebrow}</span>
          <h2 className="h2">{t.ai.title}</h2>
          <p className="lead ai__lead">{t.ai.lead}</p>

          <div className="ai__suggest">
            {t.ai.suggestions.map((s) => (
              <button
                key={s}
                className="ai__chip"
                onClick={() => send(s)}
                disabled={loading}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="ai__disclaimer">{t.ai.disclaimer}</p>
        </Reveal>

        <Reveal delay={0.1} className="ai__panel">
          <div className="ai__head">
            <div className="ai__avatar">
              <IconSpark width={18} height={18} />
            </div>
            <div className="ai__head-text">
              <strong>{t.ai.assistant}</strong>
              <span className="ai__status">
                <i className="ai__dot" /> {t.ai.online}
              </span>
            </div>
          </div>

          <div
            className="ai__log"
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {showGreeting && (
              <div className="ai__msg ai__msg--bot">
                <p>{t.ai.greeting}</p>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`ai__msg ai__msg--${m.role === "user" ? "user" : "bot"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>{m.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="ai__msg ai__msg--bot">
                <span className="ai__typing" aria-label={t.ai.thinking}>
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>

          <form
            className="ai__form"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              className="ai__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.ai.placeholder}
              aria-label={t.ai.placeholder}
            />
            <button
              type="submit"
              className="ai__send"
              disabled={loading || !input.trim()}
              aria-label={t.ai.send}
            >
              <IconSend width={18} height={18} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
