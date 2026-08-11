'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useLayoutEffect, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { VIEWPORT, overlineWrap, goldLine, overlineText } from './animations'

// El card se abre de arriba hacia abajo (revelado vertical con clip-path).
const CLIP_OPEN = 'inset(0% 0% 0% 0% round 6px)'
const CLIP_CLOSED = 'inset(0% 0% 100% 0% round 6px)'
const CARD_EASE = [0.33, 1, 0.68, 1] as const

// Evita el warning de useLayoutEffect en SSR
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const SERVICIOS = [
  {
    id: 'fidelidad',
    titulo: 'Fianza de Fidelidad',
    tagline: 'Protección patrimonial',
    desc: 'Garantiza el resarcimiento del daño patrimonial que cause un empleado infiel por la comisión de un delito (Robo, Fraude, Abuso de Confianza o Peculado) en contra de bienes de la empresa.',
    subtipos: null as null | { categoria: string; items: string[] }[],
  },
  {
    id: 'judiciales',
    titulo: 'Fianza Judicial',
    tagline: 'Procesos legales',
    desc: 'Fianzas para procesos judiciales en sus distintas modalidades, garantizando el cumplimiento de obligaciones ante las autoridades competentes.',
    subtipos: [
      { categoria: 'Penales', items: ['Libertad Provisional', 'Libertad Preparatoria', 'Condena Condicional'] },
      { categoria: 'No Penales', items: ['Civiles', 'Mercantiles', 'Amparo', 'Laborales'] },
    ],
  },
  {
    id: 'administrativas',
    titulo: 'Fianza Administrativa',
    tagline: 'Contratos y obra pública',
    desc: 'Fianzas para el cumplimiento de contratos y obligaciones ante dependencias gubernamentales y entidades privadas.',
    subtipos: [
      {
        categoria: 'Tipos',
        items: [
          'Concurso y Licitación',
          'Anticipo',
          'Cumplimiento',
          'Buena Calidad',
          'Penas Convencionales',
          'Obligaciones Laborales',
          'Inconformidad Fiscal',
          'Convenio de Pagos',
          'Arrendamiento',
        ],
      },
    ],
  },
  {
    id: 'credito',
    titulo: 'Fianza de Crédito',
    tagline: 'Suministro y crédito',
    desc: 'Garantizan el pago de créditos y el cumplimiento de contratos de suministro y distribución mercantil.',
    subtipos: [
      { categoria: 'Tipos', items: ['Suministro PEMEX', 'Suministro ASA', 'Compra-Venta', 'Distribución Mercantil'] },
    ],
  },
  {
    id: 'internacional',
    titulo: 'Fianzas Internacionales',
    tagline: 'Cobertura global',
    desc: 'Garantías para operaciones y contratos fuera de México. Gracias a nuestra presencia Internacional en Argentina, Colombia, España, El Salvador y Chile, gestionamos la Fianza que tu empresa necesita para proyectos globales.',
    subtipos: null,
  },
]

// Íconos de línea por tipo de Fianza — se usan en la columna, la tarjeta y el rail móvil
const ICONS: Record<string, ReactNode> = {
  fidelidad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  ),
  judiciales: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v17M6 21h12M4 8h16" />
      <circle cx="12" cy="3" r="1" />
      <path d="M4 8l-2.5 5.5a2.5 2.5 0 005 0L4 8zM20 8l-2.5 5.5a2.5 2.5 0 005 0L20 8z" />
    </svg>
  ),
  administrativas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 13h6M9 17h5" />
    </svg>
  ),
  credito: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </svg>
  ),
  internacional: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 010 18 15 15 0 010-18z" />
    </svg>
  ),
}

function Subtipos({ subtipos }: { subtipos: { categoria: string; items: string[] }[] }) {
  return (
    <div className="srv-subtipos">
      {subtipos.map(({ categoria, items }) => (
        <div key={categoria} className="srv-cat">
          {subtipos.length > 1 && <p className="srv-cat-label">{categoria}</p>}
          <ul className="srv-items">
            {items.map((item) => (
              <li key={item} className="srv-item">
                <span className="srv-item-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Servicios() {
  const prefersReduced = useReducedMotion()
  // selectedId = lo que el usuario marcó (resalta la columna al instante)
  // displayId  = lo que la tarjeta muestra (cambia cuando termina de cerrarse)
  const [selectedId, setSelectedId] = useState(SERVICIOS[0].id)
  const [displayId, setDisplayId] = useState(SERVICIOS[0].id)
  const [clipOpen, setClipOpen] = useState(true)
  const [cardH, setCardH] = useState<number>()
  const pendingRef = useRef<string | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const display = SERVICIOS.find((s) => s.id === displayId)!

  const [mobileActive, setMobileActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  // Mide la altura del contenido actual para animar la altura del card (footer suave)
  useIsoLayoutEffect(() => {
    if (bodyRef.current) setCardH(bodyRef.current.offsetHeight)
  }, [displayId])

  // Cambio de servicio: resalta al instante, cierra el card y encola el destino
  const handleSelect = (id: string) => {
    if (id === selectedId) return
    setSelectedId(id)
    if (prefersReduced) {
      setDisplayId(id)
      return
    }
    pendingRef.current = id
    setClipOpen(false)
  }

  // Al terminar de cerrarse: intercambia contenido + icono y vuelve a abrir
  const handleCardAnimEnd = () => {
    if (!clipOpen && pendingRef.current) {
      setDisplayId(pendingRef.current)
      pendingRef.current = null
      setClipOpen(true)
    }
  }

  // Entrada de la sección (stagger de la columna en desktop)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('srv-entered')
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Móvil: scroll-spy — ilumina el icono del servicio que cruza el centro del viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx)
            if (!Number.isNaN(idx)) setMobileActive(idx)
          }
        })
      },
      // Banda estrecha al centro del viewport: el que la cruza queda activo
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    itemRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollToItem = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="servicios" ref={sectionRef}>
      <div className="srv-wrap">

        {/* Intro editorial — mismo patrón que las demás secciones (overline + h2 + lead) */}
        <div className="srv-intro">
          <motion.div
            className="overline-wrap"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={overlineWrap}
          >
            <motion.div className="gold-line" variants={goldLine} style={{ height: 1, background: '#c8a020' }} />
            <motion.span className="overline-text" variants={overlineText}>Portafolio de Fianzas</motion.span>
          </motion.div>

          <ScrollReveal y={40}>
            <h2 className="section-h2">Una garantía para cada operación</h2>
            <p className="srv-intro-lead">
              Cada operación conlleva un riesgo distinto y cada riesgo exige una garantía a su medida.
              Con más de 40 años de experiencia como Consultores en Fianzas, te acompañamos a identificar
              y tramitar la Fianza correcta para tu empresa. Selecciona un tipo para conocer su alcance,
              coberturas y modalidades.
            </p>
          </ScrollReveal>
        </div>

        {/* ===== DESKTOP: columna índice + tarjeta con icono ===== */}
        <div className="srv-desktop">
          <div className="srv-list" role="tablist" aria-label="Tipos de Fianza">
            {SERVICIOS.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={selectedId === s.id}
                className={`srv-list-item${selectedId === s.id ? ' srv-list-item--active' : ''}`}
                onClick={() => handleSelect(s.id)}
              >
                <span className="srv-list-icon">{ICONS[s.id]}</span>
                <span className="srv-list-body">
                  <span className="srv-list-name">{s.titulo}</span>
                  <span className="srv-list-tag">{s.tagline}</span>
                </span>
                <svg className="srv-list-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </button>
            ))}
          </div>

          <div className="srv-card-wrap">
            {/* Tarjeta: se abre de arriba hacia abajo (clip vertical) + altura animada */}
            <motion.div
              className="srv-card"
              initial={false}
              animate={{
                clipPath: clipOpen ? CLIP_OPEN : CLIP_CLOSED,
                ...(cardH !== undefined ? { height: cardH } : {}),
              }}
              transition={{ duration: clipOpen ? 0.5 : 0.3, ease: CARD_EASE }}
              onAnimationComplete={handleCardAnimEnd}
            >
              <div className="srv-card-body" ref={bodyRef}>
                <div className="srv-card-icon" aria-hidden>{ICONS[display.id]}</div>
                <span className="srv-card-tag">{display.tagline}</span>
                <h2 className="srv-card-titulo">{display.titulo}</h2>
                <p className="srv-card-desc">{display.desc}</p>
                {display.subtipos && <Subtipos subtipos={display.subtipos} />}
                <Link href={`/contacto?servicio=${display.id}`} className="srv-card-cta">
                  Solicitar cotización
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ===== MÓVIL: rail de iconos sticky + servicios apilados (scroll-spy) ===== */}
        <div className="srv-mobile">
          <div className="srv-rail" role="tablist" aria-label="Tipos de Fianza">
            {SERVICIOS.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={mobileActive === i}
                aria-label={s.titulo}
                className={`srv-rail-icon${mobileActive === i ? ' is-active' : ''}`}
                onClick={() => scrollToItem(i)}
              >
                {ICONS[s.id]}
              </button>
            ))}
          </div>

          <div className="srv-stack">
            {SERVICIOS.map((s, i) => (
              <article
                key={s.id}
                data-idx={i}
                ref={(el) => { itemRefs.current[i] = el }}
                className={`srv-m-item${mobileActive === i ? ' is-active' : ''}`}
              >
                <div className="srv-m-icon" aria-hidden>{ICONS[s.id]}</div>
                <span className="srv-m-tag">{s.tagline}</span>
                <h2 className="srv-m-titulo">{s.titulo}</h2>
                <p className="srv-m-desc">{s.desc}</p>
                {s.subtipos && <Subtipos subtipos={s.subtipos} />}
                <Link href={`/contacto?servicio=${s.id}`} className="srv-card-cta">
                  Solicitar cotización
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
