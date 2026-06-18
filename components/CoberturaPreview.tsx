'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText, staggerContainer, staggerItem } from './animations'
import { ScrollReveal } from './ScrollReveal'

const GlobePreview = dynamic(() => import('./GlobePreview'), { ssr: false })

const PAISES = [
  { label: 'México',      sub: 'República Mexicana' },
  { label: 'Argentina',   sub: 'Buenos Aires' },
  { label: 'Colombia',    sub: 'Bogotá' },
  { label: 'España',      sub: 'Madrid' },
  { label: 'El Salvador', sub: 'San Salvador' },
  { label: 'Chile',       sub: 'Santiago' },
]

export default function CoberturaPreview() {
  return (
    <section className="cob-preview">
      <div className="cob-preview-inner">

        {/* Texto — izquierda */}
        <div className="cob-preview-text">
          {/* Overline */}
          <motion.div
            className="overline-wrap"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={overlineWrap}
          >
            <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
            <motion.span className="overline-text" variants={overlineText}>Cobertura</motion.span>
          </motion.div>

          {/* H2 — sube con el scroll */}
          <ScrollReveal y={60}>
            <h2 className="cob-preview-h2">Presencia Nacional e Internacional</h2>
          </ScrollReveal>

          {/* Países — stagger con scroll */}
          <ScrollReveal y={40} delay={0.1}>
            <motion.div
              className="cob-preview-paises"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={staggerContainer}
            >
              {PAISES.map(({ label, sub }) => (
                <motion.div key={label} className="cob-preview-pais" variants={staggerItem}>
                  <span className="cob-preview-pais-dot" />
                  <span className="cob-preview-pais-name">{label}</span>
                  <span className="cob-preview-pais-sep">·</span>
                  <span className="cob-preview-pais-sub">{sub}</span>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>

          {/* Link */}
          <ScrollReveal className="cob-preview-footer" y={30} delay={0.05}>
            <Link href="/cobertura" className="btn-primary">
              Ver cobertura completa
            </Link>
          </ScrollReveal>
        </div>

        {/* Globo — derecha */}
        <ScrollReveal className="cob-preview-map cob-preview-map-anim" y={80}>
          <GlobePreview />
        </ScrollReveal>

      </div>
    </section>
  )
}
