import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import Servicios from '@/components/Servicios'
import Footer from '@/components/Footer'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Servicios',
  description: 'Fianzas de Fidelidad, Judiciales, Administrativas y de Crédito. Soluciones para cada necesidad.',
  path: '/servicios',
})

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Nuestros Servicios"
          title="Soluciones para cada necesidad"
          subtitle="Asesoría e intermediación en Fianzas Administrativas, Judiciales, de Fidelidad y de Crédito."
          breadcrumb="Servicios"
        />
        <Servicios />
      </main>
      <Footer />
    </>
  )
}
