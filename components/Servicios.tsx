'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useSwipe } from './useSwipe'

const SERVICIOS = [
  {
    id: 'fidelidad',
    num: '01',
    titulo: 'Fianzas de Fidelidad',
    placeholder: 'placeholder-srv-1',
    desc: 'Garantiza el resarcimiento del daño patrimonial que cause un empleado infiel por la comisión de un delito (Robo, Fraude, Abuso de Confianza o Peculado) en contra de bienes de la empresa.',
    subtipos: null,
  },
  {
    id: 'judiciales',
    num: '02',
    titulo: 'Fianzas Judiciales',
    placeholder: 'placeholder-srv-2',
    desc: 'Fianzas para procesos judiciales en sus distintas modalidades, garantizando el cumplimiento de obligaciones ante las autoridades competentes.',
    subtipos: [
      {
        categoria: 'Penales',
        items: ['Libertad Provisional', 'Libertad Preparatoria', 'Condena Condicional'],
      },
      {
        categoria: 'No Penales',
        items: ['Civiles', 'Mercantiles', 'Amparo', 'Laborales'],
      },
    ],
  },
  {
    id: 'administrativas',
    num: '03',
    titulo: 'Fianzas Administrativas',
    placeholder: 'placeholder-srv-3',
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
    num: '04',
    titulo: 'Fianzas de Crédito',
    placeholder: 'placeholder-srv-4',
    desc: 'Garantizan el pago de créditos y el cumplimiento de contratos de suministro y distribución mercantil.',
    subtipos: [
      {
        categoria: 'Tipos',
        items: ['Suministro PEMEX', 'Suministro ASA', 'Compra-Venta', 'Distribución Mercantil'],
      },
    ],
  },
  {
    id: 'internacional',
    num: '05',
    titulo: 'Fianza Internacional',
    placeholder: 'placeholder-srv-5',
    desc: 'Garantías para operaciones y contratos fuera de México. Gracias a nuestra presencia Internacional en Argentina, Colombia, España, El Salvador y Chile, gestionamos la fianza que tu empresa necesita para proyectos globales.',
    subtipos: null,
  },
]

export default function Servicios() {
  const [activeId, setActiveId] = useState('fidelidad')
  const active = SERVICIOS.find((s) => s.id === activeId)!
  const activeIndex = SERVICIOS.findIndex((s) => s.id === activeId)
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  const goNext = () => setActiveId(SERVICIOS[(activeIndex + 1) % SERVICIOS.length].id)
  const goPrev = () => setActiveId(SERVICIOS[(activeIndex - 1 + SERVICIOS.length) % SERVICIOS.length].id)
  const swipe = useSwipe(goNext, goPrev)

  // Mueve el indicador dorado al tab activo y lo centra en la barra scrolleable
  useEffect(() => {
    const indicator = indicatorRef.current
    const container = tabsRef.current
    if (!indicator || !container) return
    const activeEl = container.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!activeEl) return
    indicator.style.left = `${activeEl.offsetLeft}px`
    indicator.style.width = `${activeEl.offsetWidth}px`
    activeEl.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [activeId])

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
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="servicios" ref={sectionRef}>
      <div className="srv-tabs-wrap">
        {/* Barra de tabs */}
        <div className="srv-tabs" role="tablist" aria-label="Tipos de fianza" ref={tabsRef}>
          {SERVICIOS.map((srv) => (
            <button
              key={srv.id}
              role="tab"
              aria-selected={activeId === srv.id}
              aria-controls={`srv-panel-${srv.id}`}
              className={`srv-tab${activeId === srv.id ? ' active' : ''}`}
              onClick={() => setActiveId(srv.id)}
            >
              <span className="srv-tab-num">{srv.num}</span>
              <span className="srv-tab-name">{srv.titulo}</span>
            </button>
          ))}
          {/* Indicador deslizante — se posiciona con JS en el tab activo */}
          <span ref={indicatorRef} className="srv-indicator" aria-hidden />
        </div>

        {/* Panel de contenido — key fuerza re-mount y dispara la animación CSS */}
        <div
          key={activeId}
          id={`srv-panel-${activeId}`}
          role="tabpanel"
          className="srv-panel"
          {...swipe}
        >
          <div className="srv-panel-inner">
            {/* Bloque visual izquierdo */}
            <div className={`srv-visual ${active.placeholder}`}>
              <div className="srv-visual-overlay">
                <span className="srv-visual-num">{active.num}</span>
              </div>
            </div>

            {/* Contenido derecho */}
            <div className="srv-detail">
              <h2 className="srv-detail-titulo">{active.titulo}</h2>
              <p className="srv-detail-desc">{active.desc}</p>

              {/* Subtipos */}
              {active.subtipos && (
                <div className="srv-detail-subtipos">
                  {active.subtipos.map(({ categoria, items }) => (
                    <div key={categoria} className="srv-detail-cat">
                      {active.subtipos!.length > 1 && (
                        <p className="srv-detail-cat-label">{categoria}</p>
                      )}
                      <ul className="srv-detail-items">
                        {items.map((item) => (
                          <li key={item} className="srv-detail-item">
                            <span className="srv-detail-item-dot" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <Link href={`/contacto?servicio=${active.id}`} className="srv-detail-cta">
                Solicitar cotización
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
