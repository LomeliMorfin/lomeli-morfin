import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import Cobertura from '@/components/Cobertura'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Cobertura — Lomeli Morfin Consultores en Fianzas',
  description: 'Presencia en la República Mexicana, Argentina, Colombia, España, El Salvador y Chile.',
}

export default function CoberturaPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Nuestra Cobertura"
          title="Presencia Nacional e Internacional"
          subtitle="Presencia en la República Mexicana, Argentina, Colombia, España, El Salvador y Chile, respaldados por las principales Afianzadoras del sector."
          breadcrumb="Cobertura"
        />
        <Cobertura />
      </main>
      <Footer />
    </>
  )
}
