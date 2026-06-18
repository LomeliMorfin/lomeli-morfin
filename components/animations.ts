import type { Variants } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export const VIEWPORT = { once: true, margin: '-80px 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 54 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.75, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -52 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.8, ease: EASE } },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 52 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.8, ease: EASE } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: EASE } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export const overlineWrap: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.35 } },
}

export const goldLine: Variants = {
  hidden: { width: 0 },
  show:   { width: 60, transition: { duration: 0.9, ease: [0.77, 0, 0.18, 1] } },
}

export const overlineText: Variants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export const staggerItem3D: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: 20 },
  show:   { opacity: 1, y: 0,  rotateX: 0,  transition: { duration: 0.65, ease: EASE } },
}
