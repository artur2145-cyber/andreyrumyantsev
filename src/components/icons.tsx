import type { SVGProps } from "react"
import type { ProgramIcon } from "../data/programs"

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

export function IconArrow(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconArrowUpRight(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function IconCalendar(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </svg>
  )
}

export function IconSpark(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  )
}

export function IconClock(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function IconCheck(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  )
}

export function IconSend(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  )
}

export function IconMenu(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

export function IconClose(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

/* ---- Program icons ------------------------------------------------------ */
function Strength(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M3 9v6M6 7.5v9M21 9v6M18 7.5v9M6 12h12" />
    </svg>
  )
}
function Endurance(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12h4l2 6 4-14 2 8h6" />
    </svg>
  )
}
function Mass(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
      <path d="m3 7 9 5 9-5M12 12v10" />
    </svg>
  )
}
function Nutrition(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21c4-2 7-5.5 7-10a7 7 0 0 0-14 0c0 4.5 3 8 7 10Z" />
      <path d="M12 11v6M12 11c0-2 1.5-3.5 3.5-3.5" />
    </svg>
  )
}

const programIcons: Record<ProgramIcon, (p: SVGProps<SVGSVGElement>) => JSX.Element> = {
  strength: Strength,
  endurance: Endurance,
  mass: Mass,
  nutrition: Nutrition,
}

export function ProgramGlyph({ name, ...p }: { name: ProgramIcon } & SVGProps<SVGSVGElement>) {
  const Cmp = programIcons[name]
  return <Cmp {...p} />
}

/* ---- Social icons ------------------------------------------------------- */
export function IconInstagram(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}
export function IconTelegram(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M21 4 3 11l5 2 2 6 3-4 5 4 3-15Z" />
      <path d="m8 13 8-5-5 7" />
    </svg>
  )
}
export function IconYoutube(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="m10 9.5 5 2.5-5 2.5Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const socialIcons: Record<string, (p: SVGProps<SVGSVGElement>) => JSX.Element> = {
  instagram: IconInstagram,
  telegram: IconTelegram,
  youtube: IconYoutube,
}
