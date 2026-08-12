'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText } from './animations'
import { ScrollReveal } from './ScrollReveal'

const SERVICIOS_PREVIEW = [
  { num: '01', titulo: 'Fianza de Fidelidad',     desc: 'Protección ante daño patrimonial por actos ilícitos de empleados.' },
  { num: '02', titulo: 'Fianza Judicial',        desc: 'Penales y no penales: civiles, mercantiles, amparo, laborales.' },
  { num: '03', titulo: 'Fianza Administrativa',   desc: 'Licitación, anticipo, cumplimiento, arrendamiento y más.' },
  { num: '04', titulo: 'Fianza de Crédito',        desc: 'Suministro PEMEX, ASA, compra-venta y distribución mercantil.' },
  { num: '05', titulo: 'Fianza Internacional',      desc: 'Cobertura para operaciones y contratos fuera de México.' },
]

export default function ServiciosPreview() {
  return (
    <section id="servicios-preview" className="preview-section dark section-dark">
      <div className="section-container">

        {/* Overline */}
        <motion.div
          className="overline-wrap"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={overlineWrap}
        >
          <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
          <motion.span className="overline-text" variants={overlineText}>Nuestros Servicios</motion.span>
        </motion.div>

        {/* Header — sube con el scroll */}
        <ScrollReveal className="preview-header" y={60}>
          <h2 className="section-h2">Soluciones para cada necesidad</h2>
          <Link href="/servicios" className="btn-outline-dark">
            Ver todos →
          </Link>
        </ScrollReveal>

        {/* Cards — cada una sube con un ligero retraso */}
        <div className="servicios-preview-grid">
          {SERVICIOS_PREVIEW.map(({ num, titulo, desc }, i) => {
            // Si el total es impar, la última va centrada abarcando ambas columnas
            const loneLast = i === SERVICIOS_PREVIEW.length - 1 && SERVICIOS_PREVIEW.length % 2 === 1
            return (
              <ScrollReveal key={num} y={50} delay={i * 0.07} className={loneLast ? 'srv-preview-span' : undefined}>
                <Link href="/servicios" className="srv-preview-card">
                  <span className="service-num">({num})</span>
                  <p className="srv-preview-titulo">{titulo}</p>
                  <p className="srv-preview-desc">{desc}</p>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
