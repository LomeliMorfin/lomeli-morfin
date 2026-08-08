import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import Footer from '@/components/Footer'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Aviso de Privacidad',
  description:
    'Aviso de Privacidad Integral de LOMELI MORFIN CONSULTORES EN FIANZAS conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
  path: '/aviso-de-privacidad',
})

/**
 * Fecha de última actualización del aviso. El artículo 15 de la LFPDPPP
 * obliga a informar cómo se comunican los cambios; la fecha visible es la
 * práctica estándar. ACTUALIZAR cada vez que se modifique el texto.
 */
const ULTIMA_ACTUALIZACION = '8 de agosto de 2026'

export default function AvisoPrivacidadPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Legal"
          title="Aviso de Privacidad"
          subtitle="Cómo tratamos, protegemos y resguardamos tus datos personales conforme a la legislación mexicana vigente."
          breadcrumb="Aviso de Privacidad"
        />

        <section className="legal-section">
          <div className="legal-container">

            <p className="legal-updated">
              Última actualización: {ULTIMA_ACTUALIZACION}
            </p>

            <p className="legal-lead">
              El presente Aviso de Privacidad Integral se emite en cumplimiento de la Ley
              Federal de Protección de Datos Personales en Posesión de los Particulares,
              publicada en el Diario Oficial de la Federación el 20 de marzo de 2025 y
              vigente a partir del 21 de marzo de 2025, así como de su normativa
              reglamentaria aplicable.
            </p>

            <h2 className="legal-h2">1. Identidad y domicilio del responsable</h2>
            <p className="legal-p">
              <strong>LOMELI MORFIN CONSULTORES EN FIANZAS</strong> (en adelante, «LOMELI
              MORFIN» o «el Responsable»), con domicilio en Río Nazas 181, Colonia
              Cuauhtémoc, C.P. 06500, Alcaldía Cuauhtémoc, Ciudad de México, México, es
              responsable del tratamiento, uso y protección de los datos personales que
              nos proporciones a través de este sitio web.
            </p>
            <p className="legal-p">
              LOMELI MORFIN es una organización especializada en asesoría, consultoría e
              intermediación de Fianzas, y cuenta con Cédula de Autorización expedida por
              la Comisión Nacional de Seguros y Fianzas (CNSF), órgano desconcentrado de
              la Secretaría de Hacienda y Crédito Público, desde el año 1981.
            </p>
            <p className="legal-p">
              Para cualquier asunto relacionado con el tratamiento de tus datos
              personales, puedes contactarnos en{' '}
              <a href="mailto:contacto@lomelimorfin.com" className="legal-link">
                contacto@lomelimorfin.com
              </a>{' '}
              o en los teléfonos{' '}
              <a href="tel:+525555251003" className="legal-link">+52 55 5525 1003</a> y{' '}
              <a href="tel:+525619131913" className="legal-link">+52 56 1913 1913</a>.
            </p>

            <h2 className="legal-h2">2. Datos personales que recabamos</h2>
            <p className="legal-p">
              A través del formulario de contacto de este sitio web recabamos, de forma
              directa y voluntaria, los siguientes datos personales:
            </p>
            <ul className="legal-list">
              <li><strong>Datos de identificación:</strong> nombre completo.</li>
              <li><strong>Datos de contacto:</strong> correo electrónico y, de manera opcional, número telefónico.</li>
              <li><strong>Datos laborales:</strong> de manera opcional, el nombre de la empresa que representas.</li>
              <li>
                <strong>Datos sobre tu requerimiento:</strong> el tipo de Fianza de tu
                interés y el contenido del mensaje que decidas enviarnos.
              </li>
            </ul>
            <p className="legal-p legal-highlight">
              <strong>No recabamos datos personales sensibles</strong> en los términos del
              artículo 8 de la Ley. No solicitamos datos patrimoniales o financieros, de
              salud, origen racial o étnico, creencias religiosas, afiliación sindical,
              opiniones políticas ni preferencia sexual a través de este sitio. Te pedimos
              abstenerte de incluir información de esa naturaleza en el campo de mensaje
              libre.
            </p>
            <p className="legal-p">
              Únicamente son obligatorios el nombre completo, el correo electrónico y el
              mensaje. Sin ellos no es posible atender tu solicitud. Los demás campos son
              opcionales y su omisión no afecta la atención que recibas.
            </p>

            <h2 className="legal-h2">3. Finalidades del tratamiento</h2>
            <p className="legal-p">
              <strong>Finalidades primarias.</strong> Son necesarias para la relación
              jurídica que originas al contactarnos y no requieren tu consentimiento
              adicional:
            </p>
            <ul className="legal-list">
              <li>Atender, dar seguimiento y responder tu solicitud de información o de cotización.</li>
              <li>Contactarte por correo electrónico o vía telefónica para dar respuesta a tu requerimiento.</li>
              <li>Elaborar la propuesta o cotización de Fianza que solicites.</li>
              <li>Integrar y mantener un expediente de la comunicación sostenida contigo.</li>
              <li>Dar cumplimiento a las obligaciones legales y regulatorias que nos resulten aplicables como intermediarios autorizados ante la CNSF.</li>
            </ul>
            <p className="legal-p">
              <strong>Finalidades secundarias.</strong> No son necesarias para atender tu
              solicitud y requieren tu consentimiento:
            </p>
            <ul className="legal-list">
              <li>Enviarte información institucional, boletines o comunicaciones sobre nuestros servicios.</li>
              <li>Realizar encuestas de calidad y satisfacción del servicio.</li>
            </ul>
            <p className="legal-p legal-highlight">
              Si no deseas que tus datos se utilicen para las finalidades secundarias,
              puedes manifestarlo enviando un correo a{' '}
              <a href="mailto:contacto@lomelimorfin.com" className="legal-link">
                contacto@lomelimorfin.com
              </a>{' '}
              con el asunto «Finalidades secundarias». Tu negativa no será motivo para
              negarte los servicios que solicites ni afectará la atención de tu solicitud.
            </p>

            <h2 className="legal-h2">4. Transferencias y encargados del tratamiento</h2>
            <p className="legal-p">
              <strong>No vendemos, rentamos ni comercializamos tus datos personales</strong>{' '}
              con terceros bajo ninguna circunstancia.
            </p>
            <p className="legal-p">
              Para operar este sitio y atender tu solicitud nos apoyamos en proveedores
              tecnológicos que actúan como encargados del tratamiento, es decir, procesan
              los datos por cuenta y bajo instrucciones del Responsable, sin facultad para
              usarlos con fines propios:
            </p>
            <ul className="legal-list">
              <li>
                <strong>Google LLC (Gmail / Google Workspace).</strong> Los mensajes
                enviados desde el formulario de contacto se transmiten y almacenan como
                correo electrónico en la cuenta institucional de LOMELI MORFIN.
              </li>
              <li>
                <strong>Vercel Inc.</strong> Provee la infraestructura de alojamiento del
                sitio web y las herramientas de medición de audiencia y rendimiento
                descritas en el apartado 8.
              </li>
            </ul>
            <p className="legal-p">
              Estos proveedores pueden almacenar información en servidores ubicados fuera
              del territorio nacional. Al enviar tus datos a través del formulario,
              consientes dicho tratamiento en los términos aquí descritos.
            </p>
            <p className="legal-p">
              Podremos transferir tus datos personales, sin requerir tu consentimiento, en
              los supuestos previstos por la Ley, entre ellos cuando la transferencia sea
              necesaria por virtud de un contrato celebrado en tu interés, cuando sea
              requerida por autoridad competente, o cuando sea necesaria para el
              cumplimiento de obligaciones ante la Comisión Nacional de Seguros y Fianzas
              o ante las instituciones afianzadoras con las que se tramite la Fianza que
              hayas solicitado.
            </p>

            <h2 className="legal-h2">5. Derechos ARCO</h2>
            <p className="legal-p">
              Tienes derecho a conocer qué datos personales tenemos de ti, para qué los
              utilizamos y las condiciones del uso que les damos (<strong>Acceso</strong>);
              a solicitar la corrección de tu información cuando esté desactualizada, sea
              inexacta o incompleta (<strong>Rectificación</strong>); a pedir que la
              eliminemos de nuestros registros cuando consideres que no está siendo
              utilizada conforme a los principios y deberes que marca la Ley
              (<strong>Cancelación</strong>); y a oponerte al uso de tus datos personales
              para fines específicos (<strong>Oposición</strong>).
            </p>
            <p className="legal-p">
              Para ejercer cualquiera de estos derechos, envía tu solicitud al correo{' '}
              <a href="mailto:contacto@lomelimorfin.com" className="legal-link">
                contacto@lomelimorfin.com
              </a>{' '}
              con el asunto «Derechos ARCO», incluyendo:
            </p>
            <ul className="legal-list">
              <li>Tu nombre completo y un medio para comunicarte la respuesta.</li>
              <li>Copia de una identificación oficial vigente que acredite tu identidad o, en su caso, la representación legal.</li>
              <li>La descripción clara y precisa de los datos personales respecto de los que ejerces el derecho.</li>
              <li>Cualquier elemento o documento que facilite la localización de tus datos personales.</li>
            </ul>
            <p className="legal-p">
              <strong>Plazos.</strong> Daremos respuesta a tu solicitud en un plazo máximo
              de <strong>veinte días hábiles</strong> contados a partir de su recepción. De
              resultar procedente, la haremos efectiva dentro de los{' '}
              <strong>quince días hábiles</strong> siguientes a la fecha en que te
              comuniquemos la respuesta. Si tu solicitud presenta deficiencias, te
              requeriremos su corrección y contarás con <strong>cinco días hábiles</strong>{' '}
              para subsanarlas. El ejercicio de estos derechos es gratuito; solo deberás
              cubrir, en su caso, los gastos justificados de envío o reproducción.
            </p>

            <h2 className="legal-h2">6. Revocación del consentimiento</h2>
            <p className="legal-p">
              Puedes revocar en cualquier momento el consentimiento que nos hayas otorgado
              para el tratamiento de tus datos personales, enviando tu solicitud a{' '}
              <a href="mailto:contacto@lomelimorfin.com" className="legal-link">
                contacto@lomelimorfin.com
              </a>{' '}
              con el asunto «Revocación de consentimiento», por el mismo procedimiento y
              con los mismos requisitos señalados en el apartado anterior.
            </p>
            <p className="legal-p">
              Ten presente que, por motivos legales, la revocación puede no ser procedente
              en ciertos casos, o bien podríamos requerir conservar determinada información
              para el cumplimiento de obligaciones legales o regulatorias. Asimismo, la
              revocación no tendrá efectos retroactivos sobre los tratamientos realizados
              con anterioridad de manera lícita.
            </p>

            <h2 className="legal-h2">7. Limitación del uso o divulgación</h2>
            <p className="legal-p">
              Puedes solicitar que dejemos de enviarte comunicaciones institucionales o
              promocionales en cualquier momento, escribiendo a{' '}
              <a href="mailto:contacto@lomelimorfin.com" className="legal-link">
                contacto@lomelimorfin.com
              </a>. Tu solicitud será atendida sin que ello afecte la prestación de los
              servicios que hayas contratado.
            </p>

            <h2 className="legal-h2">8. Uso de tecnologías de rastreo</h2>
            <p className="legal-p legal-highlight">
              <strong>Este sitio no utiliza cookies publicitarias ni de perfilamiento, y
              no realiza seguimiento de tu actividad entre distintos sitios web.</strong>
            </p>
            <p className="legal-p">
              Empleamos únicamente herramientas de medición agregada y anónima provistas
              por Vercel Inc. —Vercel Web Analytics y Vercel Speed Insights— que operan sin
              cookies. Estas herramientas recopilan información técnica y estadística, como
              las páginas visitadas, la página de procedencia, el tipo de dispositivo y
              navegador, el país de origen y métricas de velocidad de carga. Dicha
              información se procesa de forma agregada, no permite identificarte
              personalmente y se utiliza exclusivamente para conocer el desempeño del sitio
              y mejorar la experiencia de navegación.
            </p>
            <p className="legal-p">
              El formulario de contacto incorpora además un campo oculto de seguridad
              destinado a detectar envíos automatizados. Este mecanismo no recopila ni
              almacena información alguna sobre los visitantes.
            </p>

            <h2 className="legal-h2">9. Conservación de los datos</h2>
            <p className="legal-p">
              Conservaremos tus datos personales únicamente durante el tiempo necesario
              para cumplir las finalidades descritas en este aviso, así como durante los
              plazos que impongan las disposiciones legales aplicables en materia
              mercantil, fiscal y del sector afianzador. Concluidos dichos plazos, los
              datos serán suprimidos o bloqueados conforme a la normatividad vigente.
            </p>

            <h2 className="legal-h2">10. Medidas de seguridad</h2>
            <p className="legal-p">
              Hemos adoptado medidas de seguridad administrativas, técnicas y físicas
              razonables para proteger tus datos personales contra daño, pérdida,
              alteración, destrucción o uso, acceso o tratamiento no autorizado. Entre
              ellas, la transmisión cifrada de la información mediante protocolo HTTPS, el
              acceso restringido a las cuentas de correo institucionales y la limitación
              del acceso a la información al personal que requiera conocerla para atender
              tu solicitud.
            </p>

            <h2 className="legal-h2">11. Menores de edad</h2>
            <p className="legal-p">
              Este sitio y los servicios que ofrecemos están dirigidos exclusivamente a
              personas mayores de edad con capacidad legal para contratar. No recabamos de
              manera intencional datos personales de menores de edad. Si detectamos que
              hemos recibido información de un menor sin la autorización de quien ejerce la
              patria potestad o tutela, procederemos a su supresión.
            </p>

            <h2 className="legal-h2">12. Cambios al Aviso de Privacidad</h2>
            <p className="legal-p">
              El presente Aviso de Privacidad puede sufrir modificaciones derivadas de
              nuevos requerimientos legales, de nuestras propias necesidades por los
              servicios que ofrecemos, de nuestras prácticas de privacidad o de cambios en
              nuestro modelo de negocio.
            </p>
            <p className="legal-p">
              Cualquier modificación será publicada en esta misma página, con la fecha de
              última actualización visible en la parte superior. Te recomendamos revisarla
              periódicamente. Cuando los cambios sean sustanciales y afecten las
              finalidades del tratamiento, te lo comunicaremos por correo electrónico
              siempre que contemos con un medio de contacto vigente.
            </p>

            <h2 className="legal-h2">13. Autoridad competente</h2>
            <p className="legal-p">
              Si consideras que tu derecho a la protección de datos personales ha sido
              vulnerado por alguna conducta u omisión de nuestra parte, o presumes alguna
              violación a las disposiciones de la Ley, puedes interponer la denuncia o
              queja correspondiente ante la <strong>Secretaría Anticorrupción y Buen
              Gobierno</strong>, autoridad federal competente en la materia a partir de la
              entrada en vigor de la Ley del 20 de marzo de 2025, en sustitución del
              extinto Instituto Nacional de Transparencia, Acceso a la Información y
              Protección de Datos Personales (INAI).
            </p>

            <h2 className="legal-h2">14. Consentimiento</h2>
            <p className="legal-p">
              Al proporcionar tus datos personales a través del formulario de contacto de
              este sitio y marcar la casilla de aceptación correspondiente, manifiestas que
              has leído, entendido y aceptado los términos del presente Aviso de
              Privacidad, y otorgas tu consentimiento para el tratamiento de tus datos
              personales conforme a lo aquí establecido.
            </p>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
