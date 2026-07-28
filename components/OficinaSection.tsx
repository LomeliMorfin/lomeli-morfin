'use client'

import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText } from './animations'
import { ScrollReveal } from './ScrollReveal'

export default function OficinaSection() {
  return (
    <section id="oficina">
      <div className="oficina-inner">

        {/* Círculo de video — sube desde abajo con el scroll */}
        <ScrollReveal className="oficina-circle-wrap" y={90}>
          <div className="oficina-circle">
            <video
              className="oficina-video"
              src="/videos/video_optimizado.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </ScrollReveal>

        {/* Contenido — sube con ligero retraso */}
        <ScrollReveal className="oficina-content" y={70} delay={0.08}>

          <motion.div
            className="overline-wrap"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={overlineWrap}
          >
            <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
            <motion.span className="overline-text" variants={overlineText}>Nuestras Instalaciones</motion.span>
          </motion.div>

          <h2 className="oficina-h2">
            Excelente ubicación de nuestras oficinas en el corazón de la Ciudad de México
          </h2>

          <motion.div
            className="oficina-sep"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
          />

          <div className="oficina-address">
            <svg
              className="oficina-pin"
              viewBox="0 0 16 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <path d="M8 1C5.24 1 3 3.24 3 6c0 4.25 5 13 5 13s5-8.75 5-13c0-2.76-2.24-5-5-5z" />
              <circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <span className="oficina-address-text">
              Río Nazas 181<br />
              Cuauhtémoc, 06500<br />
              Ciudad de México, CDMX
            </span>
          </div>

          <a
            href="https://maps.google.com/?q=Río+Nazas+181+Cuauhtémoc+Ciudad+de+México"
            target="_blank"
            rel="noopener noreferrer"
            className="oficina-cta"
          >
            Cómo llegar
            <svg
              className="oficina-cta-arrow"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <path d="M1 7h12M8 2l5 5-5 5" />
            </svg>
          </a>

        </ScrollReveal>

      </div>
    </section>
  )
}
