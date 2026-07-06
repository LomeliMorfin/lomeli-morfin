'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText } from './animations'
import { ScrollReveal } from './ScrollReveal'
import TiltCard from './TiltCard'

const DESTACADOS = [
  {
    id: 'ado', num: '01', nombre: 'Grupo ADO',
    sector: 'Transporte y Movilidad',
    logo: '/logos/clientes/cl_ado.png',
    fianza: 'Fianzas Administrativas y de Crédito',
    años: '+20',
    desc: 'El grupo de transporte terrestre más importante de México, con más de 103 empresas filiales. Un caso emblemático de confianza de largo plazo.',
  },
  {
    id: 'emerson', num: '02', nombre: 'Emerson Process Management',
    sector: 'Tecnología Industrial',
    logo: '/logos/clientes/cl_emerson.png',
    fianza: 'Fianzas de Fidelidad',
    años: '+15',
    desc: 'Líder mundial en automatización y control de procesos industriales. Sus operaciones en México requieren el más alto nivel de garantías.',
  },
  {
    id: 'abengoa', num: '03', nombre: 'Abengoa México',
    sector: 'Energía',
    logo: '/logos/clientes/cl_abengoa.png',
    fianza: 'Fianzas Administrativas',
    años: '+10',
    desc: 'Empresa de referencia en energía, ingeniería y construcción con proyectos de infraestructura a lo largo de todo México.',
  },
  {
    id: 'comemsa', num: '04', nombre: 'COMEMSA',
    sector: 'Construcción Metálica',
    logo: '/logos/clientes/cl_comemsa.png',
    fianza: 'Fianzas Administrativas y Judiciales',
    años: '+12',
    desc: 'Construyendo México en acero. COMEMSA ejecuta proyectos estructurales de alta complejidad para los sectores industrial y energético.',
  },
]

export default function ClientesDestacados() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = DESTACADOS[activeIdx]

  return (
    <section id="clientes-destacados">
      <div className="cd-container">

        <motion.div
          className="overline-wrap"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={overlineWrap}
        >
          <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
          <motion.span className="overline-text" variants={overlineText}>Casos destacados</motion.span>
        </motion.div>

        <ScrollReveal y={40}>
          <h2 className="section-h2 cd-h2">Relaciones que perduran décadas</h2>
        </ScrollReveal>

        <div className="cd-layout">

          {/* Índice de clientes */}
          <div className="cd-list" role="tablist" aria-label="Clientes destacados">
            {DESTACADOS.map((d, i) => (
              <button
                key={d.id}
                role="tab"
                aria-selected={i === activeIdx}
                className={`cd-list-item${i === activeIdx ? ' cd-list-item--active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className="cd-list-num">{d.num}</span>
                <span className="cd-list-body">
                  <span className="cd-list-name">{d.nombre}</span>
                  <span className="cd-list-sector">{d.sector}</span>
                </span>
                <svg className="cd-list-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </button>
            ))}
          </div>

          {/* Tarjeta flotante */}
          <div className="cd-card-wrap">
            <AnimatePresence mode="wait">
              <TiltCard
                key={active.id}
                className="cd-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                maxTilt={5}
              >
                <div className="cd-logo-frame">
                  <Image
                    src={active.logo}
                    alt={active.nombre}
                    width={200}
                    height={80}
                    className="cd-logo"
                  />
                </div>

                <span className="cd-sector">{active.sector}</span>

                <h3 className="cd-nombre">{active.nombre}</h3>

                <p className="cd-desc">{active.desc}</p>

                <div className="cd-meta">
                  <div className="cd-meta-item">
                    <span className="cd-meta-label">Tipo de fianza</span>
                    <span className="cd-meta-value">{active.fianza}</span>
                  </div>
                  <div className="cd-meta-sep" />
                  <div className="cd-meta-item">
                    <span className="cd-meta-label">Años de relación</span>
                    <span className="cd-meta-value cd-years">{active.años} años</span>
                  </div>
                </div>

                <Link href="/contacto" className="cd-cta">
                  Solicitar cotización
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </Link>
              </TiltCard>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
