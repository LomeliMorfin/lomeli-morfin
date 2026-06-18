'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText, staggerContainer, staggerItem } from './animations'
import { ScrollReveal } from './ScrollReveal'

const CoberturaGlobe  = dynamic(() => import('./CoberturaGlobe'),  { ssr: false })

const ESTADOS_NOMBRES = [
  'Monterrey', 'Guadalajara', 'CDMX', 'Puebla', 'Villahermosa',
  'Baja California', 'Veracruz', 'Chiapas', 'Estado de México',
  'Mérida', 'Colima', 'Nayarit', 'Morelos', 'Michoacán',
]

const COB_STATS = [
  { id: 'cob-c-states', target: 14, suffix: '',  label: 'Estados en México' },
  { id: 'cob-c-paises', target: 6,  suffix: '',  label: 'Países' },
  { id: 'cob-c-years',  target: 40, suffix: '+', label: 'Años de experiencia' },
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

const PAISES = [
  { label: 'México',      sub: 'República Mexicana' },
  { label: 'Argentina',   sub: 'Buenos Aires' },
  { label: 'Colombia',    sub: 'Bogotá' },
  { label: 'España',      sub: 'Madrid' },
  { label: 'El Salvador', sub: 'San Salvador' },
  { label: 'Chile',       sub: 'Santiago' },
]

export default function Cobertura() {
  const statsRef   = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const obs = (el: Element | null, onVisible: (el: Element) => void, threshold = 0.2) => {
      if (!el) return
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { onVisible(entry.target); io.unobserve(entry.target) }
      }, { threshold })
      io.observe(el)
      return io
    }

    const o2 = obs(statsRef.current, () => {
      setStatsVisible(true)
      COB_STATS.forEach(({ id, target, suffix }) => {
        const el = document.getElementById(id)
        if (el) animateCounter(el, target, suffix)
      })
    }, 0.15)

    return () => { o2?.disconnect() }
  }, [])

  return (
    <section id="cobertura">

      {/* ── Encabezado ── */}
      <div className="cob-header">
        <div className="cob-header-inner">
          <motion.div
            className="overline-wrap"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={overlineWrap}
          >
            <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
            <motion.span className="overline-text" variants={overlineText}>Cobertura Nacional e Internacional</motion.span>
          </motion.div>
          <ScrollReveal y={40}>
            <h2 className="section-h2 cob-h2">Presencia Nacional<br />e Internacional</h2>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="cob-stats-strip">
          {COB_STATS.map(({ id, target, suffix, label }) => (
            <div key={id} className={`cob-stat-item${statsVisible ? ' visible' : ''}`}>
              <span id={id} className="cob-stat-num">{target}{suffix}</span>
              <span className="cob-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Globo Terráqueo ── */}
      <div className="cob-globe-section">

        {/* Dot grid de fondo */}
        <div className="cob-globe-dots" aria-hidden />

        <ScrollReveal y={60} className="cob-globe-reveal">
          <div className="cob-globe-circle">
            <CoberturaGlobe />
          </div>
        </ScrollReveal>

        {/* Países — fila debajo del globo */}
        <motion.div
          className="cob-globe-paises"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer}
        >
          {PAISES.map(({ label, sub }) => (
            <motion.div key={label} className="cob-globe-pais" variants={staggerItem}>
              <span className="cob-globe-pais-dot" aria-hidden />
              <span className="cob-globe-pais-name">{label}</span>
              <span className="cob-globe-pais-sub">{sub}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Estados — integrados debajo del globo */}
        <div className="cob-globe-estados">
          <p className="cob-globe-estados-label">Estados con presencia en México</p>
          <motion.ul
            className="cob-globe-estados-list"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerContainer}
          >
            {ESTADOS_NOMBRES.map(e => (
              <motion.li key={e} className="cob-globe-estado" variants={staggerItem}>
                {e}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

    </section>
  )
}
