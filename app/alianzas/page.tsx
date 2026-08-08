import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import AlianzasIntro from '@/components/AlianzasIntro'
import Afianzadoras from '@/components/Afianzadoras'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Alianzas',
  description: 'Contamos con relación comercial con las 10 Afianzadoras líderes del sector. El respaldo que tu Fianza necesita.',
  path: '/alianzas',
})

export default function AlianzasPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Nuestras Alianzas"
          title="El respaldo de las mejores Afianzadoras"
          subtitle="Contamos con relación comercial con las Afianzadoras líderes del sector, lo que nos permite ofrecerte las mejores condiciones en cada Fianza."
          breadcrumb="Alianzas"
        />
        <AlianzasIntro />
        {/* AlianzasDetalle eliminado — el cliente pidió borrarlo por redundante
            con la sección de Afianzadoras (feedback 07 jul 2026) */}
        <Afianzadoras />

        {/* CTA */}
        <section id="alianzas-cta">
          <div className="pg-cta-inner">
            <p className="pg-cta-overline">Asesoría especializada</p>
            <h2 className="pg-cta-h2">¿Quieres saber qué Afianzadora conviene para tu caso?</h2>
            <p className="pg-cta-sub">Te orientamos sin costo para que elijas la mejor opción según tu tipo de Fianza.</p>
            <Link href="/contacto" className="pg-cta-btn">
              Hablar con un especialista
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
