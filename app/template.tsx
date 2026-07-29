'use client'

import { useEffect, useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// useLayoutEffect en cliente / useEffect en SSR (evita el warning de hidratación).
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Transición uniforme entre páginas (App Router remonta el template
 * en cada navegación). Fade + leve desplazamiento vertical con el
 * easing estándar del sitio.
 *
 * Además reinicia el scroll al inicio ANTES del primer paint en cada
 * navegación, para que la animación de entrada siempre arranque desde
 * arriba (si venías scrolleado, la página nueva ya no aparece desplazada).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  useIsoLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
