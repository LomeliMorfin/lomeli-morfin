'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText, staggerContainer, staggerItem } from './animations'
import { ScrollReveal } from './ScrollReveal'

const AFIANZADORAS = [
  { nombre: 'Chubb',                    logo: '/logos/afianzadoras/Chubb-Logo-500x281.png' },
  { nombre: 'Aserta',                   logo: '/logos/afianzadoras/ASERTA.png' },
  { nombre: 'Insurgentes',              logo: '/logos/afianzadoras/INSURGENTES.png' },
  { nombre: 'Sofimex',                  logo: '/logos/afianzadoras/Sofimex.png' },
  { nombre: 'Tokio Marine',             logo: '/logos/afianzadoras/Tokio_Marine_(2).svg' },
  { nombre: 'Berkley México Fianzas',   logo: '/logos/afianzadoras/Berkley-Mexico-Seguros.png' },
  { nombre: 'Dorama',                   logo: '/logos/afianzadoras/Dorama.png' },
  { nombre: 'Mapfre',                   logo: '/logos/afianzadoras/Mapfre.png', big: true },
  { nombre: 'Cesce',                    logo: '/logos/afianzadoras/Cesce.png' },
  { nombre: 'Fiducia',                  logo: '/logos/afianzadoras/FIDUCIA.png' },
  { nombre: 'Avanza',                   logo: '/logos/afianzadoras/Avanza Fianzas.svg' },
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
            Contamos con relación comercial y apoyo de las Afianzadoras líderes del sector:
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
            {AFIANZADORAS.map(({ nombre, logo, big }) => (
              <motion.div key={nombre} className="af-item" title={nombre} variants={staggerItem}>
                <Image src={logo} alt={nombre} width={160} height={80} className={big ? 'af-logo af-logo--lg' : 'af-logo'} />
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  )
}
