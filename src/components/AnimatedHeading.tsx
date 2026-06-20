import { motion, useReducedMotion, type Variants } from "framer-motion"
import "./AnimatedHeading.css"

interface Props {
  lines: string[]
  /** indices of lines painted in the rust accent (logo-style alternation) */
  accentIndices?: number[]
  className?: string
  /** delay before the reveal starts (s) */
  delay?: number
  as?: "h1" | "h2"
}

// Container staggers each line; each line slides up from behind a mask —
// the same "unmask" motion used by the logo monogram.
const container: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({
    transition: { staggerChildren: 0.14, delayChildren: delay },
  }),
}

const line: Variants = {
  hidden: { y: "115%", opacity: 0, skewY: 4 },
  show: {
    y: "0%",
    opacity: 1,
    skewY: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
}

export function AnimatedHeading({
  lines,
  accentIndices = [],
  className = "",
  delay = 0,
  as = "h1",
}: Props) {
  const reduce = useReducedMotion()
  const Tag = motion[as]

  if (reduce) {
    return (
      <Tag className={`anim-heading ${className}`}>
        {lines.map((l, i) => (
          <span
            key={i}
            className={`anim-heading__line ${accentIndices.includes(i) ? "is-accent" : ""}`}
          >
            {l}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag
      className={`anim-heading ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
      custom={delay}
      aria-label={lines.join(" ")}
    >
      {lines.map((l, i) => (
        <span key={i} className="anim-heading__mask" aria-hidden="true">
          <motion.span
            className={`anim-heading__line ${accentIndices.includes(i) ? "is-accent" : ""}`}
            variants={line}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
