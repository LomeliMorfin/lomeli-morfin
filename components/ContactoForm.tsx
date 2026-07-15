'use client'

import { useState } from 'react'

const SERVICIOS = [
  'Fianzas de Fidelidad',
  'Fianzas Judiciales',
  'Fianzas Administrativas',
  'Fianzas de Crédito',
  'Fianza Internacional',
  'No lo sé aún / Necesito asesoría',
]

export default function ContactoForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contacto-form">
      <div className="cf-container">
        <div className="cf-grid">

          {/* ── Formulario ── */}
          <div className="cf-form-wrap">
            {sent ? (
              <div className="cf-success">
                <div className="cf-success-icon">✓</div>
                <h3 className="cf-success-h3">Mensaje enviado</h3>
                <p className="cf-success-p">
                  Gracias por contactarnos. Un especialista se comunicará contigo en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form className="cf-form" onSubmit={handleSubmit} noValidate>
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="nombre">Nombre completo *</label>
                    <input id="nombre" name="nombre" type="text" className="cf-input" placeholder="Tu nombre" required />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="empresa">Empresa</label>
                    <input id="empresa" name="empresa" type="text" className="cf-input" placeholder="Nombre de tu empresa" />
                  </div>
                </div>

                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="email">Correo electrónico *</label>
                    <input id="email" name="email" type="email" className="cf-input" placeholder="correo@empresa.com" required />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="telefono">Teléfono</label>
                    <input id="telefono" name="telefono" type="tel" className="cf-input" placeholder="+52 (55) 0000-0000" />
                  </div>
                </div>

                <div className="cf-field">
                  <label className="cf-label" htmlFor="servicio">Tipo de fianza</label>
                  <select id="servicio" name="servicio" className="cf-input cf-select">
                    <option value="">Selecciona una opción</option>
                    {SERVICIOS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="cf-field">
                  <label className="cf-label" htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    className="cf-input cf-textarea"
                    placeholder="Cuéntanos brevemente qué necesitas..."
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className="cf-submit">
                  Enviar solicitud
                </button>
              </form>
            )}
          </div>

          {/* ── Información lateral ── */}
          <div className="cf-info">
            <div className="cf-info-block">
              <p className="cf-info-label">Teléfono</p>
              <a href="tel:+525555550000" className="cf-info-value">+52 (55) 5555-0000</a>
            </div>
            <div className="cf-info-block">
              <p className="cf-info-label">Correo</p>
              <a href="mailto:contacto@lomelimorfin.com" className="cf-info-value">
                contacto@lomelimorfin.com
              </a>
            </div>
            <div className="cf-info-block">
              <p className="cf-info-label">Oficinas</p>
              <p className="cf-info-value">Ciudad de México, México</p>
            </div>
            <div className="cf-info-block">
              <p className="cf-info-label">Horario de atención</p>
              <p className="cf-info-value">Lunes a Viernes<br />9:00 — 18:00 hrs</p>
            </div>
            <div className="cf-info-divider" />
            <div className="cf-info-block">
              <p className="cf-info-label">Cédula de Autorización</p>
              <p className="cf-info-value">
                Comisión Nacional de Seguros y Fianzas (CNSF · SHCP) desde 1981
              </p>
            </div>
            <div className="cf-info-block">
              <p className="cf-info-label">Cobertura</p>
              <p className="cf-info-value">República Mexicana · Argentina · Colombia · España · El Salvador · Chile</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
