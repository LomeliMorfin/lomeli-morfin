'use client'

import { motion } from 'framer-motion'
import {
  VIEWPORT, overlineWrap, goldLine, overlineText,
  staggerContainer, staggerItem, slideLeft, slideRight,
} from './animations'
import { ScrollReveal } from './ScrollReveal'

const VALORES = [
  {
    titulo: 'Innovación',
    desc: 'A la vanguardia en estrategias organizacionales',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    titulo: 'Calidad',
    desc: 'Satisfacer las más altas exigencias del sector',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    titulo: 'Puntualidad',
    desc: 'La entrega oportuna como base fundamental',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    titulo: 'Honestidad',
    desc: 'Cumplimiento del reglamento interno',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M12 2l8 4v6c0 5-3.5 9.3-8 11-4.5-1.7-8-6-8-11V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    titulo: 'Confianza',
    desc: 'Seguridad y certeza en cada integrante del equipo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    titulo: 'Comunicación',
    desc: 'Base que promueve el conocimiento organizacional',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

const NOS_STATS = [
  { num: '40+', label: 'Años de trayectoria',    detail: 'Desde 1981' },
  { num: '6',   label: 'Países con presencia',   detail: 'Nacional e Internacional' },
  { num: '14',  label: 'Estados activos',        detail: 'República Mexicana' },
  { num: '12+', label: 'Clientes estratégicos',  detail: 'Sectores clave' },
]

export default function Nosotros() {
  return (
    <>
      {/* ── Panel de Stats flotante sobre PageHeader ── */}
      <section id="nos-stats">
        <div className="nos-stats-inner">
          <motion.div
            className="nos-stats-grid"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerContainer}
          >
            {NOS_STATS.map(({ num, label, detail }) => (
              <motion.div key={label} className="nos-stat-item" variants={staggerItem}>
                <span className="nos-stat-num">{num}</span>
                <div>
                  <p className="nos-stat-label">{label}</p>
                  <p className="nos-stat-detail">{detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Historia ── */}
      <section id="nosotros">
        <div className="nosotros-container">
          <motion.div
            className="overline-wrap"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={overlineWrap}
          >
            <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
            <motion.span className="overline-text" variants={overlineText}>Quiénes Somos · Desde 1981</motion.span>
          </motion.div>

          <div className="nos-grid">
            {/* Columna texto */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={slideLeft}
            >
              <h2 className="nos-h2">
                Más de 40 años<br />respaldando<br />tu patrimonio
              </h2>
              <p className="nos-body">
                LOMELI MORFIN CONSULTORES es una organización especializada en Asesoría,
                Consultoría e Intermediación de todo tipo de Fianzas (Fidelidad, Judiciales,
                Administrativas y de Crédito), contamos con la Cédula de Autorización por parte
                de la Comisión Nacional de Seguros y Fianzas (SHCP) desde el año de 1981,
                lo que nos permite contar con una amplia experiencia profesional en el Sector
                Afianzador para brindar a nuestros Clientes un servicio de calidad y excelencia
                de acuerdo a sus necesidades.
              </p>
            </motion.div>

            {/* Columna visual */}
            <motion.div
              className="nos-visual"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={slideRight}
            >
              <div className="nos-year-badge" aria-hidden>1981</div>
              <div className="nos-photo" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Misión / Visión ── */}
      <section id="nos-mv">
        <div className="nos-mv-inner">
          <div className="nos-mv-grid">

            <ScrollReveal y={50}>
              <div>
                <span className="nos-mv-label">Misión</span>
                <p className="nos-mv-quote">&ldquo;</p>
                <p className="nos-mv-text">
                  Lograr a partir del compromiso de todo nuestro Equipo, la atracción y
                  confianza de cada uno de nuestros Clientes, que les permita tener una
                  ventaja competitiva frente a otros creando una total satisfacción.
                </p>
              </div>
            </ScrollReveal>

            <div className="nos-mv-divider" aria-hidden />

            <ScrollReveal y={50} delay={0.1}>
              <div>
                <span className="nos-mv-label">Visión</span>
                <p className="nos-mv-quote">&ldquo;</p>
                <p className="nos-mv-text">
                  Posicionarnos como la Organización más importante para el trámite de
                  Fianzas a nivel Nacional e Internacional, ofreciendo una opción de
                  excelencia en Servicios de Consultoría y Asesoría para las Empresas.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section id="nos-valores">
        <div className="nosotros-container">
          <motion.div
            className="overline-wrap"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={overlineWrap}
          >
            <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
            <motion.span className="overline-text" variants={overlineText}>Nuestros Valores</motion.span>
          </motion.div>

          <ScrollReveal y={30}>
            <h2 className="section-h2" style={{ marginTop: 24 }}>
              Los principios que nos guían
            </h2>
          </ScrollReveal>

          <motion.div
            className="nos-valores-grid"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerContainer}
          >
            {VALORES.map(({ titulo, desc, icon }, i) => (
              <motion.div key={titulo} className="nos-valor-card" variants={staggerItem}>
                <span className="nos-valor-num">0{i + 1}</span>
                <div className="nos-valor-icon">{icon}</div>
                <h3 className="nos-valor-title">{titulo}</h3>
                <p className="nos-valor-desc">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
