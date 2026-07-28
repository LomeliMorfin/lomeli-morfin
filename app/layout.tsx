import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-main',
})

export const metadata: Metadata = {
  title: 'Lomeli Morfin — Consultores en Fianzas',
  description:
    'Especialistas en asesoría, consultoría e intermediación de Fianzas con más de 40 años de experiencia en el sector afianzador.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} ${montserrat.className}`}>{children}</body>
    </html>
  )
}
