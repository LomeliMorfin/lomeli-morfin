'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

// Persiste durante navegación SPA, se resetea con cada recarga de página
let splashShown = false

// Tiempos: 4s fase 1, crossfade 600ms, 4.5s fase 2, fade out 600ms
const PHASE1 = 4000
const CROSSFADE = 600
const PHASE2 = 4500
const FADE_OUT = 600

export default function Splash() {
  const splashRef = useRef<HTMLDivElement>(null)
  const phase1Ref = useRef<HTMLDivElement>(null)
  const phase2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const splash = splashRef.current!
    const p1 = phase1Ref.current!
    const p2 = phase2Ref.current!
    const site = document.getElementById('site') as HTMLElement

    // Si ya se mostró en esta navegación SPA, omitir splash
    if (splashShown) {
      splash.style.display = 'none'
      site.style.opacity = '1'
      return
    }

    // Fase 1 → 2: crossfade interno
    const t1 = setTimeout(() => {
      p1.style.transition = `opacity ${CROSSFADE}ms ease`
      p1.style.opacity = '0'

      p2.style.display = 'flex'
      void p2.offsetWidth
      p2.style.transition = `opacity ${CROSSFADE}ms ease`
      p2.style.opacity = '1'

      // Activa animaciones del logo
      setTimeout(() => {
        p2.querySelectorAll<HTMLElement>('[data-anim]').forEach(el => el.classList.add('go'))
      }, 100)
    }, PHASE1)

    // Fase 2 → sitio: fade out del splash completo
    const t2 = setTimeout(() => {
      splashShown = true
      splash.style.transition = `opacity ${FADE_OUT}ms ease`
      splash.style.opacity = '0'
      setTimeout(() => {
        splash.style.display = 'none'
        site.style.transition = `opacity ${FADE_OUT}ms ease`
        site.style.opacity = '1'
      }, FADE_OUT)
    }, PHASE1 + CROSSFADE + PHASE2)

    function skip() {
      clearTimeout(t1)
      clearTimeout(t2)
      splashShown = true
      splash.style.display = 'none'
      site.style.opacity = '1'
    }
    splash.addEventListener('click', skip)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      splash.removeEventListener('click', skip)
    }
  }, [])

  return (
    <div ref={splashRef} id="splash" className="splash" style={{ background: '#1b4254' }}>

      {/* ── Fase 1: "Nos estamos renovando" ── */}
      <div ref={phase1Ref} className="sp-phase sp-phase-1">
        <p className="sp-renovando">
          <strong>Nos estamos renovando</strong>
          <span className="sp-renovando-sub">una nueva imagen, el mismo compromiso</span>
        </p>
      </div>

      {/* ── Fase 2: Logo LM ── */}
      <div
        ref={phase2Ref}
        className="sp-phase sp-phase-2"
        style={{ display: 'none', opacity: 0 }}
      >
        <div data-anim className="s2-logo">
          <Image src="/logos/lm/Lomeli-Morfin.png" alt="Lomeli Morfin" width={480} height={144} quality={100} className="s2-logo-img" />
        </div>
        <p data-anim className="s2-name">LOMELI MORFIN</p>
        <div data-anim className="s2-divider" />
        <p data-anim className="s2-sub">Consultores en Fianzas</p>
      </div>

      {/* Barra de progreso — cubre los 6s totales */}
      <div className="sp-bar" />
    </div>
  )
}
