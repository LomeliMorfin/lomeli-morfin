'use client'

import { motion } from 'framer-motion'
import {
  VIEWPORT, overlineWrap, goldLine, overlineText,
  staggerContainer, staggerItem, slideLeft, slideRight,
} from './animations'
import { ScrollReveal } from './ScrollReveal'

// Sin íconos — el cliente pidió quitarlos y dar más peso al texto (jul 2026)
const VALORES = [
  { titulo: 'Innovación',   desc: 'A la vanguardia en estrategias organizacionales' },
  { titulo: 'Calidad',      desc: 'Satisfacer las más altas exigencias del sector' },
  { titulo: 'Puntualidad',  desc: 'La entrega oportuna como base fundamental' },
  { titulo: 'Honestidad',   desc: 'Cumplimiento del reglamento interno' },
  { titulo: 'Confianza',    desc: 'Seguridad y certeza en cada integrante del equipo' },
  { titulo: 'Comunicación', desc: 'Base que promueve el conocimiento organizacional' },
]

const NOS_STATS = [
  { num: '+40', label: 'Años de trayectoria',    detail: 'Desde 1981' },
  { num: '6',   label: 'Países con presencia',   detail: 'Nacional e Internacional' },
  { num: '32',  label: 'Entidades con cobertura', detail: 'República Mexicana' },
  { num: '+12', label: 'Clientes estratégicos',  detail: 'Sectores clave' },
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
                LOMELI MORFIN es una organización especializada en asesoría,
                consultoría e intermediación de todo tipo de Fianzas (Fidelidad, Judiciales,
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
                  excelencia en servicios de consultoría y asesoría para las Empresas.
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
            {VALORES.map(({ titulo, desc }, i) => (
              <motion.div key={titulo} className="nos-valor-card" variants={staggerItem}>
                <span className="nos-valor-num">0{i + 1}</span>
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
