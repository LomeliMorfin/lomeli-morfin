'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText, staggerContainer, staggerItem } from './animations'
import { ScrollReveal } from './ScrollReveal'

const AFIANZADORAS = [
  { nombre: 'ACE Fianzas Monterrey',          logo: '/logos/afianzadoras/af_monterrey.png' },
  { nombre: 'Afianzadora Insurgentes',         logo: '/logos/afianzadoras/af_insurgentes.png' },
  { nombre: 'Afianzadora Aserta',              logo: '/logos/afianzadoras/af_asserta.png' },
  { nombre: 'Afianzadora Sofimex',             logo: '/logos/afianzadoras/af_sofimex.png' },
  { nombre: 'Fianzas Dorama',                  logo: '/logos/afianzadoras/af_dorama.png' },
  { nombre: 'Afianzadora Fiducia',             logo: '/logos/afianzadoras/af_fiducia.png' },
  { nombre: 'Liberty Fianzas',                 logo: '/logos/afianzadoras/af_liberty.png' },
  { nombre: 'Fianzas Atlas',                   logo: '/logos/afianzadoras/af_Atlas.png' },
  { nombre: 'Zurich Fianzas México',           logo: '/logos/afianzadoras/af_Zurich.png' },
  { nombre: 'Fianzas Guadiana Inbursa',        logo: '/logos/afianzadoras/af_Inbursa.png' },
]

export default function Afianzadoras() {
  return (
    <section id="afianzadoras">
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
          <motion.span className="overline-text" variants={overlineText}>Nuestro Respaldo</motion.span>
        </motion.div>

        {/* H2 + intro — suben con el scroll */}
        <ScrollReveal y={60}>
          <h2 className="section-h2">Nuestros Socios Comerciales son las mejores Afianzadoras del sector</h2>
          <p className="af-intro">
            Contamos con relación comercial y apoyo de las afianzadoras líderes del sector:
          </p>
        </ScrollReveal>

        {/* Grid logos — stagger whileInView */}
        <ScrollReveal y={40} delay={0.05}>
          <motion.div
            className="af-grid logo-grid"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerContainer}
          >
            {AFIANZADORAS.map(({ nombre, logo }) => (
              <motion.div key={nombre} className="af-item" title={nombre} variants={staggerItem}>
                <Image src={logo} alt={nombre} width={160} height={80} className="af-logo" />
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  )
}
