import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Nodemailer necesita el runtime de Node (no Edge)
export const runtime = 'nodejs'

type Payload = {
  nombre?: string
  empresa?: string
  email?: string
  telefono?: string
  servicio?: string
  mensaje?: string
  website?: string // honeypot anti-spam (campo oculto)
}

const CONTACT_TO = process.env.CONTACT_TO || process.env.GMAIL_USER || 'contacto@lomelimorfin.com'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function POST(req: Request) {
  let data: Payload
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  // Honeypot: si un bot llenó el campo oculto, fingimos éxito y no enviamos nada.
  if (data.website) return NextResponse.json({ ok: true })

  const nombre = (data.nombre || '').trim()
  const email = (data.email || '').trim()
  const mensaje = (data.mensaje || '').trim()

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'El correo no es válido.' }, { status: 400 })
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) {
    console.error('[contact] Faltan GMAIL_USER / GMAIL_APP_PASSWORD en las variables de entorno')
    return NextResponse.json({ error: 'El servidor de correo no está configurado.' }, { status: 500 })
  }

  const empresa = (data.empresa || '—').trim() || '—'
  const telefono = (data.telefono || '—').trim() || '—'
  const servicio = (data.servicio || '—').trim() || '—'

  // El "De" muestra el NOMBRE de quien escribe, pero la dirección debe seguir siendo la
  // cuenta autenticada: Gmail/SPF/DKIM no permiten enviar "como" un correo externo.
  // El origen se marca con el campo "Desde" y las respuestas van al cliente vía Reply-To.
  const safeName = nombre.replace(/["\r\n<>]/g, ' ').trim() || 'Cliente web'
  const ORIGEN = 'Formulario del sitio web · lomelimorfin.com'

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: `"${safeName}" <${user}>`, // se lee con el nombre del cliente; la dirección es la cuenta autenticada
      to: CONTACT_TO,
      replyTo: `"${safeName}" <${email}>`, // al responder, va directo al cliente
      subject: `Nueva solicitud de contacto — ${nombre}`,
      text:
        `Desde: ${ORIGEN}\n\n` +
        `Nombre: ${nombre}\n` +
        `Empresa: ${empresa}\n` +
        `Correo: ${email}\n` +
        `Teléfono: ${telefono}\n` +
        `Tipo de Fianza: ${servicio}\n\n` +
        `Mensaje:\n${mensaje}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#0f2535;line-height:1.6;max-width:560px">
          <h2 style="color:#1b4254;margin:0 0 4px">Nueva solicitud de cotización</h2>
          <p style="margin:0 0 16px;color:#5a6a7a;font-size:13px"><strong>Desde:</strong> ${esc(ORIGEN)}</p>
          <p style="margin:4px 0"><strong>Nombre:</strong> ${esc(nombre)}</p>
          <p style="margin:4px 0"><strong>Empresa:</strong> ${esc(empresa)}</p>
          <p style="margin:4px 0"><strong>Correo:</strong> ${esc(email)}</p>
          <p style="margin:4px 0"><strong>Teléfono:</strong> ${esc(telefono)}</p>
          <p style="margin:4px 0"><strong>Tipo de Fianza:</strong> ${esc(servicio)}</p>
          <p style="margin:16px 0 4px"><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap;background:#f5f7f9;padding:12px 14px;border-radius:6px;margin:0">${esc(mensaje)}</p>
        </div>
      `,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Error al enviar el correo:', err)
    return NextResponse.json(
      { error: 'No se pudo enviar el mensaje. Intenta de nuevo o escríbenos directo a nuestro correo.' },
      { status: 502 }
    )
  }
}
