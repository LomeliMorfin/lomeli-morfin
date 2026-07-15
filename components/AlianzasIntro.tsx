'use client'

import { motion } from 'framer-motion'
import { VIEWPORT, staggerContainer, staggerItem } from './animations'
import { ScrollReveal } from './ScrollReveal'

const PILARES = [
  {
    num: '01',
    titulo: 'Cobertura completa',
    desc: 'Las 4 modalidades de fianza cubiertas: Administrativa, Judicial, Fidelidad y Crédito. Sin excepciones.',
  },
  {
    num: '02',
    titulo: 'Mejores condiciones',
    desc: 'Nuestra relación directa con 10 Afianzadoras líderes nos permite negociar las mejores tarifas del mercado.',
  },
  {
    num: '03',
    titulo: 'Gestión ágil',
    desc: 'Un solo punto de contacto. Nosotros coordinamos con la Afianzadora idónea para cada tipo de fianza.',
  },
]

export default function AlianzasIntro() {
  return (
    <section id="alianzas-intro">
      {/* Headline superior — manifesto */}
      <div className="ai-manifesto">
        <div className="ai-manifesto-inner">
          <ScrollReveal y={60}>
            <p className="ai-manifesto-eyebrow">El respaldo que hace la diferencia</p>
            <h2 className="ai-manifesto-h2">
              10 Afianzadoras.<br />
              <span className="ai-manifesto-accent">Una red.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal y={40} delay={0.1}>
            <p className="ai-manifesto-body">
              Una Afianzadora es la institución financiera autorizada por la CNSF que emite y garantiza
              la fianza. Trabajar con las mejores del sector nos permite ofrecerte condiciones competitivas,
              respuesta ágil y la certeza de que tu fianza tiene el respaldo institucional que necesitas.
            </p>
          </ScrollReveal>

          {/* Gran número decorativo */}
          <div className="ai-big-num" aria-hidden>10</div>
        </div>
      </div>

      {/* Pilares — franja inferior */}
      <div className="ai-pilares-wrap">
        <motion.div
          className="ai-pilares"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer}
        >
          {PILARES.map(({ num, titulo, desc }) => (
            <motion.div key={num} className="ai-pilar" variants={staggerItem}>
              <span className="ai-pilar-num">{num}</span>
              <div className="ai-pilar-sep" />
              <h3 className="ai-pilar-titulo">{titulo}</h3>
              <p className="ai-pilar-desc">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
