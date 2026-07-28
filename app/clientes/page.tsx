import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import ClientesStats from '@/components/ClientesStats'
import ClientesSectores from '@/components/ClientesSectores'
import Clientes from '@/components/Clientes'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Clientes — Lomeli Morfin Consultores en Fianzas',
  description: 'Más de 40 años respaldando empresas líderes en energía, construcción, logística, tecnología, telecomunicaciones y manufactura.',
}

export default function ClientesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Quiénes confían en nosotros"
          title="Empresas que eligen la excelencia"
          subtitle="Más de 40 años construyendo relaciones de confianza con empresas líderes en múltiples sectores de la industria mexicana."
          breadcrumb="Clientes"
        />
        <ClientesStats />
        <ClientesSectores />
        <Clientes />

        {/* CTA */}
        <section id="clientes-cta">
          <div className="pg-cta-inner">
            <p className="pg-cta-overline">¿Listo para tramitar?</p>
            <h2 className="pg-cta-h2">Tu empresa necesita respaldo en Fianzas y nosotros estamos listos para brindarte la mejor asesoría.</h2>
            <p className="pg-cta-sub">Contáctanos y un especialista te atenderá en menos de 24 horas.</p>
            <Link href="/contacto" className="pg-cta-btn">
              Solicitar cotización
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
