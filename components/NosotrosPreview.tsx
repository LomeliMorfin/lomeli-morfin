'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText, staggerContainer, staggerItem } from './animations'
import { ScrollReveal } from './ScrollReveal'

const VALORES_PREVIEW = ['Innovación', 'Calidad', 'Puntualidad', 'Honestidad', 'Confianza', 'Comunicación']

export default function NosotrosPreview() {
  return (
    <section id="nosotros-preview" className="preview-section">
      <div className="section-container">

        {/* Overline — whileInView rápido */}
        <motion.div
          className="overline-wrap"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={overlineWrap}
        >
          <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
          <motion.span className="overline-text" variants={overlineText}>Sobre Nosotros</motion.span>
        </motion.div>

        <div className="preview-grid">

          {/* Columna texto — sube con el scroll */}
          <ScrollReveal className="preview-text" y={70}>
            <h2 className="section-h2">
              Más de 40 años respaldando tu patrimonio
            </h2>
            <p className="preview-body">
              Organización especializada en Asesoría, Consultoría e Intermediación de todo tipo
              de Fianzas, con presencia nacional e internacional. Contamos con Cédula de
              Autorización de la Comisión Nacional de Seguros y Fianzas desde 1981.
            </p>
            <Link href="/nosotros" className="btn-primary btn-dark">
              Conocer más →
            </Link>
          </ScrollReveal>

          {/* Columna valores — sube con el scroll, ligero retraso */}
          <ScrollReveal y={50} delay={0.1}>
            <motion.div
              className="preview-valores"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={staggerContainer}
            >
              {VALORES_PREVIEW.map((v) => (
                <motion.span key={v} className="valor-tag" variants={staggerItem}>
                  {v}
                </motion.span>
              ))}
            </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
