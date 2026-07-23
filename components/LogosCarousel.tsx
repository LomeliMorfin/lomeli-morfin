'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CLIENTES } from './clientesData'

// Velocidad visual constante (~2.6s por logo) sin importar cuántos haya.
const SECONDS_PER_LOGO = 2.6

// Altura base del logo en el carrusel (px). Coincide con .logos-carousel-img.
const BASE_HEIGHT = 38

// Ajuste fino de tamaño por logo — SOLO en este carrusel (no afecta el grid /clientes).
// Multiplicador sobre BASE_HEIGHT; 1 = tamaño normal.
const LOGO_SCALE: Record<string, number> = {
  cl_sscope: 0.72,
  cl_sunpower: 0.72,
  cl_google: 1.18,
  'cl_avanza-spain': 1.35,
  cl_copeland: 1.35,
  cl_elecnor: 1.38,
  cl_schneider: 1.38,
  cl_spanicar: 1.35,
  'cl_isi-mustang': 1.38,
  cl_comemsa: 1.3,
  cl_uny: 1.3,
  cl_creas: 1.3,
  cl_gocar: 1.3,
  'cl_internet-power': 1.35,
  cl_orbe: 1.3,
  cl_powergyworks: 1.38,
  cl_rotork: 1.35,
}

function slugOf(logoPath: string) {
  return logoPath.split('/').pop()!.replace(/\.[^.]+$/, '')
}

export default function LogosCarousel() {
  // Se duplica la lista para que el loop con translateX(-50%) sea continuo.
  const doubled = [...CLIENTES, ...CLIENTES]
  const duration = CLIENTES.length * SECONDS_PER_LOGO

  const sectionRef = useRef<HTMLElement>(null)
  // 'active' = el carrusel ya se acercó al viewport → montamos las imágenes (todas juntas).
  const [active, setActive] = useState(false)
  // 'ready' = todas las imágenes cargaron → arrancamos la animación (sin pop-in).
  const [ready, setReady] = useState(false)
  const loadedCount = useRef(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      // Empieza a cargar antes de que sea visible, para que ya estén listas al llegar.
      { rootMargin: '400px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Salvaguarda: arranca la animación aunque falte algún onLoad (imagen cacheada/error).
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setReady(true), 3000)
    return () => clearTimeout(t)
  }, [active])

  const onImgSettled = () => {
    loadedCount.current += 1
    // Solo importa la primera mitad (la segunda es copia con el mismo src, ya cacheada).
    if (loadedCount.current >= CLIENTES.length) setReady(true)
  }

  return (
    <section ref={sectionRef} className="logos-carousel-section">
      <p className="logos-carousel-label">Empresas que confían en nosotros</p>
      <div className="logos-carousel-track-wrap">
        <div
          className={`logos-carousel-track${ready ? ' is-ready' : ''}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {doubled.map((logo, i) => {
            const isClone = i >= CLIENTES.length
            const height = Math.round(BASE_HEIGHT * (LOGO_SCALE[slugOf(logo.logo)] ?? 1))
            return (
              <div key={i} className="logos-carousel-item" aria-hidden={isClone}>
                {active && (
                  <Image
                    src={logo.logo}
                    alt={logo.nombre}
                    width={120}
                    height={38}
                    loading="eager"
                    className="logos-carousel-img"
                    style={{ height }}
                    onLoad={isClone ? undefined : onImgSettled}
                    onError={isClone ? undefined : onImgSettled}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
