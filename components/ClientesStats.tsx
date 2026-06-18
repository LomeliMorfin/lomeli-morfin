'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from './animations'
import { ScrollReveal } from './ScrollReveal'

const STATS = [
  { num: '40+', caption: 'Años de trayectoria', detail: 'Desde 1981, respaldando cada fianza con experiencia probada' },
  { num: '12+', caption: 'Empresas estratégicas', detail: 'Clientes activos en sectores clave de la economía mexicana' },
  { num: '6',   caption: 'Sectores industriales', detail: 'Energía, construcción, logística, manufactura, tecnología y telecomunicaciones' },
]

export default function ClientesStats() {
  return (
    <section id="clientes-stats">
      <div className="cst-inner">
        {/* Franja superior dorada */}
        <motion.div
          className="cst-topline"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
        />
        {/* Overline */}
        <ScrollReveal y={30}>
          <div className="cst-overline">
            <span className="cst-overline-label">Nuestra trayectoria · En números</span>
          </div>
        </ScrollReveal>

        {/* Números editoriales */}
        <motion.div
          className="cst-grid"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer}
        >
          {STATS.map(({ num, caption, detail }, i) => (
            <motion.div key={num} className="cst-col" variants={staggerItem}>
              {i > 0 && <div className="cst-vsep" aria-hidden />}
              <div className="cst-num-block">
                <span className="cst-num">{num}</span>
                <span className="cst-caption">{caption}</span>
              </div>
              <p className="cst-detail">{detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Frase editorial en la base */}
        <ScrollReveal y={40} delay={0.1}>
          <div className="cst-manifesto">
            <div className="cst-manifesto-line" />
            <p className="cst-manifesto-text">
              "Cuatro décadas construyendo confianza a través de cada fianza tramitada."
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
