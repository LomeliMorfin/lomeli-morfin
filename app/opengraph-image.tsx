import { ImageResponse } from 'next/og'

// Imagen que se ve al compartir el sitio en WhatsApp, LinkedIn, etc.
// Next la genera en build y cablea solo las etiquetas og:image / twitter:image.
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Lomeli Morfin — Consultores en Fianzas desde 1981'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: 'linear-gradient(160deg, #1b4254 0%, #0f2535 55%, #0a1a24 100%)',
        }}
      >
        {/* Overline dorada */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 60, height: 2, background: '#c8a020' }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: '#c8a020',
              textTransform: 'uppercase',
            }}
          >
            Desde 1981
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 76,
            lineHeight: 1.1,
            color: '#ffffff',
            letterSpacing: -1,
          }}
        >
          LOMELI MORFIN
        </div>

        <div style={{ marginTop: 20, fontSize: 40, color: 'rgba(255,255,255,0.86)' }}>
          Consultores en Fianzas
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 26,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.62)',
            maxWidth: 820,
          }}
        >
          Asesoría, consultoría e intermediación de Fianzas Administrativas,
          Judiciales, de Fidelidad y de Crédito.
        </div>

        {/* Línea dorada al pie */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 8,
            background: 'linear-gradient(90deg, #c8a020 0%, transparent 70%)',
          }}
        />
      </div>
    ),
    size
  )
}
