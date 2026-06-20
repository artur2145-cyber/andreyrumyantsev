// Vercel serverless function — AI assistant proxy for the chat widget.
//
// It reads the API key from the ANTHROPIC_API_KEY environment variable, which
// you add in your Vercel project settings (Settings → Environment Variables).
// Until that key is set the endpoint returns a friendly "not connected yet"
// message so the widget still works as a demo.
//
// Model defaults to Claude Opus 4.8; override with ANTHROPIC_MODEL
// (e.g. claude-haiku-4-5 for a cheaper, faster option).

import Anthropic from "@anthropic-ai/sdk"

type Lang = "ru" | "et" | "en"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

const SYSTEM_BY_LANG: Record<Lang, string> = {
  ru: `Ты — дружелюбный AI-ассистент персонального тренера Андрея Румянцева (бодибилдер, выступающий спортсмен).
Отвечай по-русски, кратко и по делу, на вопросы о тренировках, технике упражнений, восстановлении и питании.
Давай практичные советы, но напоминай, что для индивидуального плана и разбора техники лучше записаться на тренировку.
Не давай медицинских диагнозов. Если вопрос не о фитнесе/питании — мягко верни разговор к тренировкам.`,
  et: `Oled personaaltreener Andrei Rumjantsevi (kulturist, võistlev sportlane) sõbralik AI-assistent.
Vasta eesti keeles, lühidalt ja asjalikult, küsimustele treeningu, harjutuste tehnika, taastumise ja toitumise kohta.
Anna praktilisi nõuandeid, kuid tuleta meelde, et individuaalseks kavaks ja tehnika analüüsiks tasub treening broneerida.
Ära pane meditsiinilisi diagnoose. Kui küsimus pole fitnessist/toitumisest — too vestlus õrnalt treeningute juurde tagasi.`,
  en: `You are the friendly AI assistant of personal coach Andrey Rumyantsev (bodybuilder, competing athlete).
Answer in English, concisely and practically, questions about training, exercise technique, recovery and nutrition.
Give actionable advice, but remind users that for an individual plan and technique review it is best to book a session.
Do not give medical diagnoses. If a question is not about fitness/nutrition, gently steer back to training.`,
}

const NOT_CONNECTED: Record<Lang, string> = {
  ru: "AI-ассистент ещё не подключён к API. Добавьте ключ ANTHROPIC_API_KEY в настройках проекта на Vercel — и я начну отвечать. А пока запишитесь на тренировку через календарь ниже 💪",
  et: "AI-assistent pole veel API-ga ühendatud. Lisa ANTHROPIC_API_KEY Verceli projekti seadetesse — ja hakkan vastama. Seni broneeri treening alloleva kalendri kaudu 💪",
  en: "The AI assistant isn't connected to the API yet. Add the ANTHROPIC_API_KEY in your Vercel project settings and I'll start answering. Meanwhile, book a session via the calendar below 💪",
}

function pickLang(value: unknown): Lang {
  return value === "et" || value === "en" ? value : "ru"
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {}
  const lang = pickLang(body.lang)
  const incoming: ChatMessage[] = Array.isArray(body.messages) ? body.messages : []

  // Keep only the last 12 turns and coerce to the API shape.
  const messages = incoming
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content }))

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    res.status(400).json({ error: "Last message must be from the user." })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Graceful demo mode until the key is configured.
    res.status(200).json({ reply: NOT_CONNECTED[lang], configured: false })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || "claude-opus-4-8",
      max_tokens: 800,
      system: SYSTEM_BY_LANG[lang],
      messages,
    })

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b: any) => b.text)
      .join("\n")
      .trim()

    res.status(200).json({ reply: reply || NOT_CONNECTED[lang], configured: true })
  } catch (err: any) {
    console.error("AI chat error:", err?.message || err)
    res.status(502).json({ error: "ai_error", message: err?.message || "Upstream error" })
  }
}
