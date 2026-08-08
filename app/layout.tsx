import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-main',
})

const DESCRIPTION =
  'Especialistas en asesoría, consultoría e intermediación de Fianzas con más de 40 años de experiencia en el sector afianzador.'

export const metadata: Metadata = {
  // Resuelve las URLs relativas de canonical y og:image
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lomeli Morfin — Consultores en Fianzas',
    template: '%s — Lomeli Morfin Consultores en Fianzas',
  },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Lomeli Morfin — Consultores en Fianzas',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_MX',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

/**
 * Datos estructurados de la organización. No suben posiciones por sí solos,
 * pero le dan a Google una entidad concreta que asociar con el dominio y con
 * la ficha de Google Business Profile.
 */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': `${SITE_URL}/#organization`,
  name: 'LOMELI MORFIN CONSULTORES EN FIANZAS',
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  foundingDate: '1981',
  email: 'contacto@lomelimorfin.com',
  telephone: ['+525555251003', '+525619131913'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Río Nazas 181',
    addressLocality: 'Cuauhtémoc',
    addressRegion: 'Ciudad de México',
    postalCode: '06500',
    addressCountry: 'MX',
  },
  areaServed: [
    { '@type': 'Country', name: 'México' },
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Country', name: 'Colombia' },
    { '@type': 'Country', name: 'España' },
    { '@type': 'Country', name: 'El Salvador' },
    { '@type': 'Country', name: 'Chile' },
  ],
  knowsAbout: [
    'Fianzas Administrativas',
    'Fianzas Judiciales',
    'Fianzas de Fidelidad',
    'Fianzas de Crédito',
    'Fianza Internacional',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${montserrat.className}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
