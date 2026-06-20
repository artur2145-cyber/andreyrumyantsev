import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode
  delay?: number
  y?: number
}

// Fade-and-rise as the element scrolls into view. Used across sections.
export function Reveal({ children, delay = 0, y = 28, ...rest }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
