'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * Clave de sessionStorage: el splash se muestra UNA vez por sesión de pestaña,
 * no en cada recarga. Se limpia sola al cerrar la pestaña.
 */
const SEEN_KEY = 'lm_splash_seen'

/**
 * Script que corre durante el parseo del HTML, ANTES de que el navegador
 * pinte nada. Sin esto, en una recarga el splash alcanza a verse un instante
 * (el HTML se pinta antes de que React hidrate y pueda ocultarlo).
 * El CSS de .splash reacciona a este atributo en <html>.
 */
const NO_FLASH = `try{if(sessionStorage.getItem('${SEEN_KEY}'))document.documentElement.dataset.splashSeen='1'}catch(e){}`

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

    const markSeen = () => {
      try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* modo privado */ }
      document.documentElement.dataset.splashSeen = '1'
    }

    // Ya se vio en esta sesión (recarga o navegación SPA): el script inline ya
    // lo ocultó, aquí solo se desmonta la secuencia.
    if (document.documentElement.dataset.splashSeen === '1') {
      splash.style.display = 'none'
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
      markSeen()
      splash.style.transition = `opacity ${FADE_OUT}ms ease`
      splash.style.opacity = '0'
      setTimeout(() => { splash.style.display = 'none' }, FADE_OUT)
    }, PHASE1 + CROSSFADE + PHASE2)

    // Clic para saltar
    const skip = () => {
      clearTimeout(t1)
      clearTimeout(t2)
      markSeen()
      splash.style.display = 'none'
    }
    splash.addEventListener('click', skip)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      splash.removeEventListener('click', skip)
    }
  }, [])

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />

      <div ref={splashRef} id="splash" className="splash" style={{ background: '#1b4254' }}>

        {/* ── Fase 1: "Nos estamos renovando" ── */}
        <div ref={phase1Ref} className="sp-phase sp-phase-1">
          <p className="sp-renovando">
            <strong>Nos estamos renovando</strong>
            <span className="sp-renovando-sub">Una nueva imagen, el mismo compromiso</span>
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
    </>
  )
}
