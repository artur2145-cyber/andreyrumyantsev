import { I18nProvider } from "./i18n"
import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { Programs } from "./components/Programs"
import { AiAgent } from "./components/AiAgent"
import { BookingCalendar } from "./components/Calendar"
import { Pricing } from "./components/Pricing"
import { Footer } from "./components/Footer"

export default function App() {
  return (
    <I18nProvider>
      <Nav />
      <main>
        <Hero />
        <Programs />
        <AiAgent />
        <BookingCalendar />
        <Pricing />
      </main>
      <Footer />
    </I18nProvider>
  )
}
