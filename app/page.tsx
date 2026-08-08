import Splash from '@/components/Splash'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import NosotrosPreview from '@/components/NosotrosPreview'
import ServiciosPreview from '@/components/ServiciosPreview'
import CoberturaPreview from '@/components/CoberturaPreview'
import Afianzadoras from '@/components/Afianzadoras'
import LogosCarousel from '@/components/LogosCarousel'
import OficinaSection from '@/components/OficinaSection'
import ContactoCTA from '@/components/ContactoCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Splash />
      {/* Sin opacity:0 — el contenido se renderiza visible desde el HTML y el
          splash lo tapa por encima. Así el hero cuenta para el LCP y los
          rastreadores no dependen de JS para ver la home. */}
      <main id="site">
        <Navbar />
        <Hero />
        <Stats />
        <NosotrosPreview />
        <ServiciosPreview />
        <CoberturaPreview />
        <OficinaSection />
        <Afianzadoras />
        <LogosCarousel />
        <ContactoCTA />
      </main>
      <Footer />
    </>
  )
}
