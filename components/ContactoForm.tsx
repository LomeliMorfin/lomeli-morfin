'use client'

import Link from 'next/link'
import { useState } from 'react'

const SERVICIOS = [
  'Fianza de Fidelidad',
  'Fianza Judicial',
  'Fianza Administrativa',
  'Fianza de Crédito',
  'Fianza Internacional',
  'No lo sé aún / Necesito asesoría',
]

export default function ContactoForm() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)

    // El <form> lleva noValidate, así que el `required` del navegador no corre:
    // el consentimiento se valida aquí antes de enviar nada al servidor.
    if (!fd.get('privacidad')) {
      setError('Para enviar tu solicitud necesitas aceptar el Aviso de Privacidad.')
      return
    }

    const payload = {
      nombre: fd.get('nombre'),
      empresa: fd.get('empresa'),
      email: fd.get('email'),
      telefono: fd.get('telefono'),
      servicio: fd.get('servicio'),
      mensaje: fd.get('mensaje'),
      privacidad: true, // consentimiento expreso, se registra en el correo
      website: fd.get('website'), // honeypot
    }
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'No se pudo enviar el mensaje.')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar el mensaje. Intenta de nuevo.')
    } finally {
      setSending(false)
    }
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
                {/* Honeypot anti-spam: invisible para humanos, los bots lo llenan */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />
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
                  <label className="cf-label" htmlFor="servicio">Tipo de Fianza</label>
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

                {/* Aviso de privacidad simplificado + consentimiento expreso.
                    El art. 15 de la LFPDPPP pide que, en recabación por medios
                    electrónicos, se muestre una versión corta con enlace a la
                    integral en el punto mismo de la recolección. */}
                <label className="cf-consent">
                  <input
                    type="checkbox"
                    name="privacidad"
                    className="cf-consent-box"
                    required
                    aria-describedby="cf-consent-text"
                  />
                  <span id="cf-consent-text" className="cf-consent-text">
                    He leído y acepto el{' '}
                    <Link href="/aviso-de-privacidad" className="cf-consent-link">
                      Aviso de Privacidad
                    </Link>
                    . Autorizo el tratamiento de mis datos personales para atender y dar
                    seguimiento a esta solicitud. *
                  </span>
                </label>

                <button type="submit" className="cf-submit" disabled={sending}>
                  {sending ? 'Enviando…' : 'Enviar solicitud'}
                </button>

                {error && (
                  <p role="alert" style={{ color: '#c0392b', marginTop: 14, fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* ── Información lateral ── */}
          <div className="cf-info">
            <div className="cf-info-block">
              <p className="cf-info-label">Teléfono</p>
              <a href="tel:+525555251003" className="cf-info-value" style={{ display: 'block' }}>+52 55 5525 1003</a>
              <a href="tel:+525619131913" className="cf-info-value" style={{ display: 'block', marginTop: 4 }}>+52 56 1913 1913</a>
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
