'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { VIEWPORT, overlineWrap, goldLine, overlineText } from './animations'
import { ScrollReveal } from './ScrollReveal'
import { CLIENTES } from './clientesData'

// Clientes por slide (5 columnas × 2 filas en desktop)
const PER_PAGE = 10

function chunk<T>(arr: T[], size: number): T[][] {
  const pages: T[][] = []
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size))
  return pages
}

export default function Clientes() {
  const pages = chunk(CLIENTES, PER_PAGE)
  const total = pages.length
  const [page, setPage] = useState(0)

  const prev = () => setPage(p => (p - 1 + total) % total)
  const next = () => setPage(p => (p + 1) % total)

  return (
    <section id="clientes">
      <div className="section-container cl-container">
        <motion.div
          className="overline-wrap"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={overlineWrap}
        >
          <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
          <motion.span className="overline-text" variants={overlineText}>Nuestros Clientes</motion.span>
        </motion.div>

        <ScrollReveal y={40}>
          <h2 className="section-h2">Empresas que confían en nosotros</h2>
          <p className="cl-intro">
            Orgullosos de respaldar a empresas líderes en sus sectores con soluciones Afianzadoras a la medida:
          </p>
        </ScrollReveal>

        {/* Slider de grids */}
        <ScrollReveal y={40} delay={0.05}>
          <div className="cl-slider">
            <div className="cl-slider-viewport">
              <div
                className="cl-slider-track"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {pages.map((group, pi) => (
                  <div className="cl-slide" key={pi} aria-hidden={pi !== page}>
                    <div className="cl-grid logo-grid">
                      {group.map(({ nombre, logo }) => (
                        <div key={nombre} className="cl-item" title={nombre}>
                          <Image src={logo} alt={nombre} width={160} height={80} className="cl-logo" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {total > 1 && (
              <div className="cl-slider-controls">
                <button className="csc-arrow" onClick={prev} aria-label="Clientes anteriores">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </button>

                <div className="cl-slider-dots" role="tablist" aria-label="Páginas de clientes">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === page}
                      aria-label={`Página ${i + 1}`}
                      className={`cl-dot${i === page ? ' cl-dot--active' : ''}`}
                      onClick={() => setPage(i)}
                    />
                  ))}
                </div>

                <button className="csc-arrow" onClick={next} aria-label="Clientes siguientes">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
