// Smooth scroll to an in-page section. CSS `scroll-margin-top` on `.section`
// handles the fixed-nav offset, so we only trigger the scroll here.
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  // Update the hash without an extra jump.
  history.replaceState(null, "", `#${id}`)
}

export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
}
