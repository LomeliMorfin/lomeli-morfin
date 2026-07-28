// Fuente única de clientes. La usan LogosCarousel (home) y Clientes (grid /clientes).
// Orden oficial provisto por el cliente (jul 2026); los que no traían orden van al final.
// NOTA: "Alfa Proveedores y Contratistas" y "Torres, Estructuras y Postes de Puebla"
// están en el orden oficial pero AÚN NO tienen logo — agregar cuando lleguen los assets.

export type LogoKind = 'mark' | 'wordmark'

export type Cliente = {
  nombre: string
  logo: string
  /**
   * Forma óptica del logo — decide su tamaño BASE en el grid y en el carrusel.
   * Es la fuente única que sustituye al viejo mapa manual de escalas.
   *   'wordmark' = horizontal / alargado (Mitsubishi, Google, ADO)  → base más BAJA
   *   'mark'     = símbolo / cuadrado / vertical (Schneider, Comemsa) → base más ALTA
   * Regla usada para clasificar: aspect ratio >= 1.7 → wordmark; si no → mark.
   */
  kind: LogoKind
  /**
   * Ajuste fino OPCIONAL sobre el tamaño de su categoría (1 = normal).
   * Aplica en grid Y carrusel a la vez. Úsalo para logos que se ven pequeños
   * por traer mucho margen interno en su lienzo (p.ej. un símbolo centrado en un
   * PNG cuadrado con relleno). > 1 lo agranda, < 1 lo encoge.
   */
  scale?: number
}

export const CLIENTES: Cliente[] = [
  { nombre: 'Mobility ADO',                       logo: '/logos/clientes/cl_ado.png',                kind: 'wordmark' },
  { nombre: 'Mitsubishi',                         logo: '/logos/clientes/cl_mitsubishi.svg',         kind: 'wordmark' },
  { nombre: 'Google México',                      logo: '/logos/clientes/cl_google.svg',             kind: 'wordmark' },
  { nombre: 'Emerson Electric de México',         logo: '/logos/clientes/cl_emerson.png',            kind: 'wordmark', scale: 1.7 },
  { nombre: 'Club de Fútbol Pachuca',             logo: '/logos/clientes/cl_pachuca.png',            kind: 'mark' },
  { nombre: 'Elecnor México',                     logo: '/logos/clientes/cl_elecnor.png',            kind: 'mark' },
  { nombre: 'Schneider Electric',                 logo: '/logos/clientes/cl_schneider.png',          kind: 'mark' },
  { nombre: 'Spanicar',                           logo: '/logos/clientes/cl_spanicar.jpg',           kind: 'mark' },
  { nombre: 'Consorcio Aristos',                  logo: '/logos/clientes/cl_aristos.jpg',            kind: 'mark' },
  { nombre: 'Avanza Spain',                       logo: '/logos/clientes/cl_avanza-spain.png',       kind: 'mark', scale: 1.7 },
  { nombre: 'Federal Express Holdings México',    logo: '/logos/clientes/cl_fedex.svg',              kind: 'mark' },
  { nombre: 'Farmamigo',                          logo: '/logos/clientes/cl_farmamigo.png',          kind: 'wordmark' },
  { nombre: 'ISI Mustang',                        logo: '/logos/clientes/cl_isi-mustang.jpg',        kind: 'mark', scale: 1.7 },
  { nombre: 'Abengoa',                            logo: '/logos/clientes/cl_abengoa.jpg',            kind: 'mark' },
  { nombre: 'Tautanet Internacional',             logo: '/logos/clientes/cl_tautanet.png',           kind: 'wordmark' },
  { nombre: 'Data Air Electric',                  logo: '/logos/clientes/cl_data-air-electric.png',  kind: 'wordmark' },
  { nombre: 'Makicop',                            logo: '/logos/clientes/cl_makicop.png',            kind: 'mark' },
  { nombre: 'Pasteko',                            logo: '/logos/clientes/cl_pasteko.png',            kind: 'wordmark' },
  { nombre: 'Comemsa',                            logo: '/logos/clientes/cl_comemsa.jpg',            kind: 'mark', scale: 1.7 },
  { nombre: 'Genesal Energy',                     logo: '/logos/clientes/cl_genesal.jpg',            kind: 'wordmark', scale: 1.7 },
  { nombre: 'Sidisa',                             logo: '/logos/clientes/cl_sidisa.jpg',             kind: 'mark' },
  { nombre: 'Lamsyco Laboratorios',               logo: '/logos/clientes/cl_lamsyco.jpg',            kind: 'wordmark' },
  { nombre: 'Uny II de México',                   logo: '/logos/clientes/cl_uny.jpg',                kind: 'mark', scale: 1.7 },
  { nombre: 'Concretos Huasteca',                 logo: '/logos/clientes/cl_concretos-huasteca.png', kind: 'wordmark', scale: 1.7 },
  { nombre: 'Landsoft Company',                   logo: '/logos/clientes/cl_landsoft.png',           kind: 'wordmark' },
  // Sin orden oficial asignado:
  { nombre: 'Abener',                             logo: '/logos/clientes/cl_abener.png',             kind: 'mark' },
  { nombre: 'Alldora',                            logo: '/logos/clientes/cl_alldora.png',            kind: 'wordmark' },
  { nombre: 'Axix',                               logo: '/logos/clientes/cl_axix.png',               kind: 'mark' },
  { nombre: 'Cobra',                              logo: '/logos/clientes/cl_cobra.png',              kind: 'wordmark' },
  { nombre: 'Comaple',                            logo: '/logos/clientes/cl_comaple.png',            kind: 'wordmark', scale: 1.7 },
  { nombre: 'Copeland',                           logo: '/logos/clientes/cl_copeland.jpeg',          kind: 'mark' },
  { nombre: 'Creas',                              logo: '/logos/clientes/cl_creas.jpg',              kind: 'mark', scale: 1.7 },
  { nombre: 'Daquiva Industrial y Comercial',     logo: '/logos/clientes/cl_daquiva.png',            kind: 'mark' },
  { nombre: 'DTXT de México',                     logo: '/logos/clientes/cl_dtxt.jpg',               kind: 'wordmark' },
  { nombre: 'Gocar',                              logo: '/logos/clientes/cl_gocar.png',              kind: 'mark', scale: 1.7 },
  { nombre: 'Internet Power',                     logo: '/logos/clientes/cl_internet-power.jpeg',    kind: 'mark', scale: 1.7 },
  { nombre: 'Norpower',                           logo: '/logos/clientes/cl_norpower.png',           kind: 'wordmark' },
  { nombre: 'OR Importaciones y Reparaciones',    logo: '/logos/clientes/cl_or-importaciones.jpg',   kind: 'mark' },
  { nombre: 'Orbe',                               logo: '/logos/clientes/cl_orbe.png',               kind: 'mark', scale: 1.7 },
  { nombre: 'Origami Creativa',                   logo: '/logos/clientes/cl_origami.jpg',            kind: 'mark' },
  { nombre: 'Powergyworks',                       logo: '/logos/clientes/cl_powergyworks.jpg',       kind: 'mark', scale: 1.7 },
  { nombre: 'Pyseco',                             logo: '/logos/clientes/cl_pyseco.png',             kind: 'wordmark' },
  { nombre: 'Rotork',                             logo: '/logos/clientes/cl_rotork.jpeg',            kind: 'mark', scale: 1.7 },
  { nombre: 'Sscope',                             logo: '/logos/clientes/cl_sscope.png',             kind: 'wordmark' },
  { nombre: 'SunPower',                           logo: '/logos/clientes/cl_sunpower.svg',           kind: 'wordmark' },
  { nombre: 'Shell',                              logo: '/logos/clientes/cl_shell.svg',              kind: 'mark' },
  { nombre: 'Teletec',                            logo: '/logos/clientes/cl_teletec.jpg',            kind: 'mark' },
]
