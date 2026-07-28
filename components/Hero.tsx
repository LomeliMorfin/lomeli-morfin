'use client'

import { motion } from 'framer-motion'
import { overlineWrap, goldLine, overlineText, fadeUp, staggerContainer } from './animations'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-glow" aria-hidden />

      <div className="hero-content">
        <motion.div
          className="hero-inner"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div className="overline-wrap" variants={overlineWrap}>
            <motion.div
              className="gold-line"
              variants={goldLine}
              style={{ height: 1, background: '#c8a020' }}
            />
            <motion.span className="overline-text" variants={overlineText}>
              Desde 1981 · Consultores en Fianzas
            </motion.span>
          </motion.div>

          <motion.h1 className="hero-h1" variants={fadeUp}>
            Solidez y confianza<br />en cada Fianza
          </motion.h1>

          <motion.p className="hero-p" variants={fadeUp}>
            Especialistas en asesoría, consultoría e intermediación de Fianzas
            con más de 40 años de experiencia en el sector afianzador.
          </motion.p>

          <motion.div className="hero-btns" variants={fadeUp}>
            <a href="#servicios-preview" className="btn-primary">
              Conoce nuestros servicios
            </a>
            <a href="/contacto" className="btn-outline">
              Contáctanos
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
