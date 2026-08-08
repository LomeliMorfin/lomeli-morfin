import type { Metadata } from 'next'

/**
 * URL canónica del sitio. La usan metadataBase, el sitemap y robots.txt.
 * En Vercel se puede sobreescribir con NEXT_PUBLIC_SITE_URL sin tocar código.
 * OJO: debe coincidir EXACTAMENTE con el dominio que sirve el sitio
 * (apex vs www), o los canonical apuntarán al dominio equivocado.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lomelimorfin.com'
).replace(/\/$/, '')

export const SITE_NAME = 'Lomeli Morfin Consultores en Fianzas'

/** Rutas del sitio. Fuente única para el sitemap. */
export const ROUTES = [
  { path: '/',          priority: 1.0 },
  { path: '/nosotros',  priority: 0.8 },
  { path: '/servicios', priority: 0.9 },
  { path: '/clientes',  priority: 0.7 },
  { path: '/alianzas',  priority: 0.7 },
  { path: '/cobertura', priority: 0.8 },
  { path: '/contacto',  priority: 0.8 },
] as const

/**
 * Construye el bloque de metadata de una página.
 *
 * Existe porque Next fusiona `metadata` de forma superficial: si una página
 * declara su propio `openGraph`, REEMPLAZA por completo el del layout raíz
 * (perdiendo siteName, locale, etc.). Centralizando aquí, cada página manda
 * solo lo suyo y no se pierde nada.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  // El template de `title` del layout no aplica a og:title, hay que armarlo.
  const fullTitle = `${title} — ${SITE_NAME}`
  // app/opengraph-image.tsx cubre solo el segmento raíz (no se hereda en las
  // rutas hijas), así que las páginas internas la apuntan explícitamente.
  const images = [{ url: '/opengraph-image', width: 1200, height: 630 }]

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'es_MX',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images,
    },
  }
}
