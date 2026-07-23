'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText, staggerContainer, staggerItem } from './animations'
import { ScrollReveal } from './ScrollReveal'
import TiltCard from './TiltCard'

const AFIANZADORAS = [
  { num: '01', logo: '/logos/afianzadoras/Chubb-Logo-500x281.png',      nombre: 'Chubb',                  tipos: ['Todas las modalidades'] },
  { num: '02', logo: '/logos/afianzadoras/ASERTA.png',                  nombre: 'Aserta',                 tipos: ['Administrativas', 'Judiciales', 'Crédito'] },
  { num: '03', logo: '/logos/afianzadoras/INSURGENTES.png',             nombre: 'Insurgentes',            tipos: ['Administrativas', 'Crédito'] },
  { num: '04', logo: '/logos/afianzadoras/Sofimex.png',                 nombre: 'Sofimex',                tipos: ['Administrativas', 'Fidelidad'] },
  { num: '05', logo: '/logos/afianzadoras/Tokio_Marine_(2).svg',        nombre: 'Tokio Marine',           tipos: ['Administrativas', 'Fidelidad', 'Crédito'] },
  { num: '06', logo: '/logos/afianzadoras/Berkley-Mexico-Seguros.png',  nombre: 'Berkley México Fianzas', tipos: ['Administrativas', 'Judiciales'] },
  { num: '07', logo: '/logos/afianzadoras/Dorama.png',                  nombre: 'Dorama',                 tipos: ['Judiciales', 'Fidelidad'] },
  { num: '08', logo: '/logos/afianzadoras/Mapfre.png',                  nombre: 'Mapfre',                 tipos: ['Todas las modalidades'] },
  { num: '09', logo: '/logos/afianzadoras/Cesce.png',                   nombre: 'Cesce',                  tipos: ['Crédito'] },
  { num: '10', logo: '/logos/afianzadoras/FIDUCIA.png',                 nombre: 'Fiducia',                tipos: ['Administrativas', 'Crédito'] },
  { num: '11', logo: '/logos/afianzadoras/Avanza Fianzas.svg',          nombre: 'Avanza',                 tipos: ['Administrativas', 'Judiciales'] },
]

export default function AlianzasDetalle() {
  return (
    <section id="alianzas-detalle">
      <div className="ad-container">

        <motion.div
          className="overline-wrap"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={overlineWrap}
        >
          <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
          <motion.span className="overline-text" variants={overlineText}>Nuestras alianzas</motion.span>
        </motion.div>

        <ScrollReveal y={55}>
          <h2 className="section-h2 ad-h2">Respaldo de las<br />11 Afianzadoras líderes</h2>
          <p className="ad-intro">
            Relaciones comerciales activas y directas. Sin intermediarios adicionales — negociamos directo
            con cada institución para obtener las mejores condiciones para tus fianzas.
          </p>
        </ScrollReveal>

        {/* Bento grid */}
        <ScrollReveal y={40} delay={0.08}>
          <motion.div
            className="ad-grid"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerContainer}
          >
            {AFIANZADORAS.map(({ num, logo, nombre, tipos }, i) => (
              <TiltCard
                key={num}
                className={`ad-card${i % 2 === 0 ? ' ad-card--featured' : ''}`}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                maxTilt={5}
              >
                {/* Número */}
                <span className="ad-card-num">{num}</span>

                {/* Logo */}
                <div className="ad-card-logo-wrap">
                  <Image
                    src={logo}
                    alt={nombre}
                    width={140}
                    height={60}
                    className="ad-card-logo"
                  />
                </div>

                {/* Nombre */}
                <p className="ad-card-nombre">{nombre}</p>

                {/* Tipos */}
                <div className="ad-card-tipos">
                  {tipos.map(t => (
                    <span key={t} className="ad-card-tipo">{t}</span>
                  ))}
                </div>

                {/* Hover accent */}
                <div className="ad-card-accent" aria-hidden />
              </TiltCard>
            ))}
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  )
}
