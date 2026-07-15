'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem3D, VIEWPORT } from './animations'

const STATS = [
  { id: 'c-years',    target: 40,   suffix: '', label: 'Años de experiencia' },
  { id: 'c-clients',  target: 1800, suffix: '', label: 'Clientes confían en nosotros' },
  { id: 'c-policies', target: 5000, suffix: '', label: 'Pólizas emitidas' },
]

function animateCounter(el: HTMLElement, target: number, suffix = '', duration = 1500) {
  const start = performance.now()
  ;(function step(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.floor(eased * target) + suffix
    if (progress < 1) requestAnimationFrame(step)
  })(performance.now())
}

export default function Stats() {
  const animated = useRef(false)

  function handleViewportEnter() {
    if (animated.current) return
    animated.current = true
    STATS.forEach(({ id, target, suffix }) => {
      const el = document.getElementById(id)
      if (el) animateCounter(el, target, suffix)
    })
  }

  return (
    <motion.section
      id="stats"
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerContainer}
      onViewportEnter={handleViewportEnter}
    >
      <div className="stats-grid" style={{ perspective: '800px' }}>
        {STATS.map(({ id, target, suffix, label }) => (
          <motion.div
            key={id}
            className="stat-item"
            variants={staggerItem3D}
            style={{ transformOrigin: 'bottom center' }}
          >
            <span className="stat-prefix">Más de</span>
            <div id={id} className="stat-number">
              {target}{suffix}
            </div>
            <p className="stat-label">{label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
