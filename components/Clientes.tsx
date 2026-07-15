'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const CLIENTES = [
  { nombre: 'Abengoa México',                             logo: '/logos/clientes/cl_abengoa.png' },
  { nombre: 'Construcciones Metálicas Mexicanas Comemsa', logo: '/logos/clientes/cl_comemsa.png' },
  { nombre: 'Emerson Process Management',                 logo: '/logos/clientes/cl_emerson.png' },
  { nombre: 'Alfa Proveedores y Contratistas',            logo: '/logos/clientes/cl_alfaProveedoresyContratistas.png' },
  { nombre: 'Equipos y Servicios Vica',                   logo: '/logos/clientes/cl_vica.png' },
  { nombre: 'Electelco',                                  logo: '/logos/clientes/cl_electelco.png' },
  { nombre: 'Prom/Tec',                                   logo: '/logos/clientes/cl_promtec.png' },
  { nombre: 'Samson Control',                             logo: '/logos/clientes/cl_samson.jpeg' },
  { nombre: 'Grupo ADO',                                  logo: '/logos/clientes/cl_ado.png' },
  { nombre: 'MEI Telecom',                                logo: '/logos/clientes/cl_meiTelecom.png' },
]

export default function Clientes() {
  const overlineRef = useRef<HTMLDivElement>(null)
  const h2Ref       = useRef<HTMLHeadingElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlineObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          overlineObs.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (overlineRef.current) overlineObs.observe(overlineRef.current)

    const h2Obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { entry.target.classList.add('reveal-title'); h2Obs.unobserve(entry.target) }
      },
      { threshold: 0.3 }
    )
    if (h2Ref.current) h2Obs.observe(h2Ref.current)

    const gridObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>('.stagger-child').forEach(el =>
            el.classList.add('visible')
          )
          gridObs.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (gridRef.current) gridObs.observe(gridRef.current)

    return () => { overlineObs.disconnect(); h2Obs.disconnect(); gridObs.disconnect() }
  }, [])

  return (
    <section id="clientes">
      <div className="section-container cl-container">
        <div ref={overlineRef} className="overline-wrap">
          <div className="gold-line" />
          <span className="overline-text">Nuestros Clientes</span>
        </div>

        <h2 ref={h2Ref} className="section-h2 clip-hidden">Empresas que confían en nosotros</h2>

        <p className="cl-intro">
          Orgullosos de respaldar a empresas líderes en sus sectores con soluciones Afianzadoras a la medida:
        </p>

        <div ref={gridRef} className="cl-grid logo-grid">
          {CLIENTES.map(({ nombre, logo }) => (
            <div key={nombre} className="cl-item stagger-child" title={nombre}>
              <Image
                src={logo}
                alt={nombre}
                width={160}
                height={80}
                className="cl-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
