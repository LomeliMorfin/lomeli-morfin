import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import ContactoForm from '@/components/ContactoForm'
import Footer from '@/components/Footer'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Contacto',
  description: 'Solicita tu cotización. Nuestros especialistas te atenderán a la brevedad.',
  path: '/contacto',
})

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Hablemos"
          title="Solicita tu cotización"
          subtitle="Completa el formulario y un especialista te contactará en menos de 24 horas."
          breadcrumb="Contacto"
        />
        <ContactoForm />
      </main>
      <Footer />
    </>
  )
}
