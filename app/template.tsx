'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Transición uniforme entre páginas (App Router remonta el template
 * en cada navegación). Fade + leve desplazamiento vertical con el
 * easing estándar del sitio.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
