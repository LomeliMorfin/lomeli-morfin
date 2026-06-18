import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import Nosotros from '@/components/Nosotros'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Nosotros — Lomeli Morfin Consultores en Fianzas',
  description: 'Más de 40 años de experiencia en asesoría, consultoría e intermediación de fianzas.',
}

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Quiénes Somos"
          title="Más de 40 años respaldando tu patrimonio"
          subtitle="Especialistas en Fianzas con Cédula de Autorización de la Comisión Nacional de Seguros y Fianzas desde 1981, con presencia Nacional e Internacional."
          breadcrumb="Nosotros"
        />
        <Nosotros />
      </main>
      <Footer />
    </>
  )
}
