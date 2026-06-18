'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { VIEWPORT } from './animations'
import { ScrollReveal } from './ScrollReveal'

export default function ContactoCTA() {
  return (
    <section id="contacto-cta">
      <motion.div
        className="cta-gold-line"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
      />

      <ScrollReveal className="cta-inner" y={70}>
        <p className="cta-overline">¿Listo para comenzar?</p>
        <h2 className="cta-h2">
          ¿Listo para tramitar<br />tu fianza?
        </h2>
        <p className="cta-sub">
          Contáctanos y uno de nuestros especialistas te atenderá a la brevedad.
        </p>
        <div className="cta-actions">
          <Link href="/contacto" className="btn-cta-gold">
            Solicitar cotización
          </Link>
          <Link href="tel:+525555550000" className="btn-cta-outline">
            Llamar ahora
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
