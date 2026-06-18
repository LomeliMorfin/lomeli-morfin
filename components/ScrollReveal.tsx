'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Scroll-linked reveal: el elemento sube exactamente mientras el usuario baja.
 * La animación NO se dispara en un threshold — su progreso = progreso del scroll.
 */
export function ScrollReveal({
  children,
  className,
  y = 64,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  /** Desplazamiento vertical inicial en px. Default 64 */
  y?: number
  /** Retraso en fracción de scrollYProgress (0–0.2). Default 0 */
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // Empieza cuando el borde superior toca el borde inferior del viewport
    // Termina cuando el centro del elemento llega al 55% del viewport
    offset: ['start end', 'center 55%'],
  })

  const start = delay
  const end = Math.min(delay + 0.6, 1)

  const yVal     = useTransform(scrollYProgress, [start, end], [y, 0])
  const opacity  = useTransform(scrollYProgress, [start, Math.min(delay + 0.5, 1)], [0, 1])

  return (
    <motion.div ref={ref} style={{ y: yVal, opacity }} className={className}>
      {children}
    </motion.div>
  )
}
