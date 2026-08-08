import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import Cobertura from '@/components/Cobertura'
import Footer from '@/components/Footer'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Cobertura',
  description: 'Presencia en la República Mexicana, Argentina, Colombia, España, El Salvador y Chile.',
  path: '/cobertura',
})

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
