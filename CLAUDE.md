# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server (requires build first)
npm run lint      # Run ESLint
```

---

# LOMELI MORFIN — Sitio Web Corporativo
## Instrucciones completas para Claude Code

---

## 1. VISIÓN GENERAL DEL PROYECTO

- **Empresa:** LOMELI MORFIN CONSULTORES EN FIANZAS
- **Giro:** Asesoría, Consultoría e Intermediación de Fianzas
  (Administrativas, Judiciales, Fidelidad y de Crédito)
- **Autorización:** Cédula de la Comisión Nacional de Seguros y Fianzas (SHCP) desde 1981
- **Presencia:** México (14 estados) y Argentina
- **Tipo de sitio:** Single-page corporativo con scroll por secciones
- **Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4 — App Router en `/app`
- **Dependencias clave:**
  - `framer-motion` — motor de animación principal del sitio (ver §11)
  - `react-globe.gl` + `@types/three` — globo terráqueo (CoberturaPreview / GlobePreview)
  - `@react-three/fiber` + `@react-three/drei` — escena 3D (CoberturaGlobe)
  - `react-simple-maps` — mapas SVG de cobertura (CoberturaMapMx / CoberturaMapWorld)
- **Alias de imports:** `@/*` → raíz del repo (tsconfig `paths`). Usar `@/components/...`.
- **Referencia visual:** verholy.com/en — estructura editorial, animaciones
  sutiles y de alto impacto, mucho whitespace, sensación premium
- **Personalidad de marca:** Sobria, confiable, moderna, corporativa con calidez

---

## 1B. ESTADO DE SINCRONIZACIÓN DE ESTE DOCUMENTO

> Este documento se redactó en la fase inicial y el sitio ha evolucionado. Las
> reglas de **marca, paleta, tipografía y diseño** (§3–§7, §12, §14) siguen
> vigentes y son autoritativas. Los **detalles de contenido, conteos y
> arquitectura** han cambiado — verifica siempre contra el código y contra
> `.claude/.../memory/MEMORY.md`, que registra las rondas de feedback del cliente.

**Deltas frente a lo escrito abajo (fuente de verdad = código + memoria):**

- **Animaciones:** el sitio migró de "CSS `@keyframes` + IntersectionObserver" a
  **framer-motion** (`components/animations.ts` = variants compartidas;
  `ScrollReveal.tsx` = reveal ligado al scroll). Ver §11 corregido. El sistema
  CSS antiguo queda como fallback histórico, no como patrón a seguir.
- **Rutas nuevas:** además de `/nosotros`, `/servicios`, `/cobertura`, existen
  `/clientes`, `/alianzas` y `/contacto` (cada una `app/<ruta>/page.tsx`).
  `app/template.tsx` da la transición uniforme entre páginas (fade + y, framer).
- **Componentes nuevos clave:** `clientesData.ts` (FUENTE ÚNICA de la lista de
  clientes — no hardcodear logos/nombres en otro lado), `useSwipe.ts` (hook de
  swipe para carruseles), `TiltCard.tsx`, `CoberturaGlobe.tsx`, familias
  `Clientes*` (Clientes / ClientesDestacados / ClientesSectores / ClientesStats)
  y `Alianzas*` (AlianzasIntro / AlianzasDetalle).
- **Contenido (§10) desactualizado:** el cliente cambió a **32 Entidades**,
  **6 países** de cobertura, **5 servicios** (se añadió Fianza Internacional),
  conteos ~1800/2000 clientes, y **body font-weight 400** (no 300). La memoria
  del proyecto tiene el detalle exacto de cada ronda; §10 abajo es referencia
  de tono/estructura, no de cifras.

---

## 2. ESTRUCTURA DE ARCHIVOS

```
lomeli-morfin/
├── CLAUDE.md
├── .npmrc                     ← legacy-peer-deps=true (necesario para react-globe.gl + React 19)
├── app/
│   ├── layout.tsx             ← root layout, Montserrat font, globals.css
│   ├── page.tsx               ← home (importa secciones como componentes)
│   ├── icon.png               ← favicon (Next.js file-based metadata)
│   └── globals.css            ← @theme con paleta + animaciones + clases especiales
├── components/
│   ├── Splash.tsx             ← dos fases (renovando + logo), module-level var anti-repeat
│   ├── Navbar.tsx             ← scroll listener, mobile menu
│   ├── Hero.tsx
│   ├── Stats.tsx              ← contadores animados
│   ├── NosotrosPreview.tsx    ← preview en home
│   ├── Nosotros.tsx           ← página completa /nosotros
│   ├── ServiciosPreview.tsx   ← preview en home
│   ├── Servicios.tsx          ← página completa /servicios
│   ├── CoberturaPreview.tsx   ← preview en home con GlobePreview
│   ├── GlobePreview.tsx       ← globo terráqueo (react-globe.gl), países activos en dorado
│   ├── Cobertura.tsx          ← página completa /cobertura con mapa SVG México
│   ├── CoberturaMapMx.tsx     ← mapa SVG de México con estados activos
│   ├── CoberturaMapWorld.tsx  ← mapa SVG mundial
│   ├── OficinaSection.tsx     ← video circular, dirección Río Nazas 181 CDMX
│   ├── Afianzadoras.tsx       ← grid de logos afianzadoras
│   ├── LogosCarousel.tsx      ← carrusel continuo de logos clientes
│   ├── ContactoCTA.tsx        ← sección CTA final
│   ├── ContactoForm.tsx       ← formulario de contacto
│   ├── PageHeader.tsx         ← header compartido para páginas internas
│   └── Footer.tsx
├── public/
│   ├── logos/
│   │   ├── lm/
│   │   │   ├── LM-Nav.png         ← logo horizontal para navbar y footer
│   │   │   └── Lomeli-Morfin.png  ← logo grande para splash
│   │   ├── afianzadoras/          ← prefijo af_
│   │   └── clientes/              ← prefijo cl_
│   ├── images/
│   │   ├── hero/              ← prefijo hero_
│   │   ├── nosotros/          ← prefijo nos_
│   │   ├── servicios/         ← prefijo srv_
│   │   └── og/                ← prefijo og_
│   ├── icons/                 ← prefijo ico_
│   ├── videos/
│   │   └── video_optimizado.mp4   ← video oficina (autoPlay muted loop)
│   ├── world-countries.geojson    ← GeoJSON mundial para el globo terráqueo
│   └── mx-states.json             ← GeoJSON estados de México
└── _reference/                    ← NO incluir en build
    ├── Manual_básico_LM.pdf
    └── concentrado_contenidos.docx
```

### Orden de secciones en `app/page.tsx`
```
Splash → Navbar → Hero → Stats → NosotrosPreview → ServiciosPreview →
CoberturaPreview → OficinaSection → Afianzadoras → LogosCarousel → ContactoCTA
Footer (fuera del <main>)
```

### Convención de naming de assets
- Todo en minúsculas, sin espacios, sin acentos
- Prefijo + guión bajo + nombre: `af_ace.png`, `cl_abengoa.png`
- Palabras separadas con guión medio: `cl_alfa-proveedores.png`
- Prefijos: `lm_` `af_` `cl_` `hero_` `nos_` `srv_` `ico_` `og_`
- Logos: SVG preferido, PNG con fondo transparente
- Fotos: JPG o WebP — NUNCA PNG para fotografías

---

## 3. PALETA DE COLORES

```css
:root {
  --color-primary:       #1b4254;  /* Azul marino verdoso principal */
  --color-primary-dark:  #0f2535;  /* Overlays, footer, navbar sobre hero */
  --color-primary-mid:   #2b5a72;  /* Hover de elementos azules */
  --color-gold:          #c8a020;  /* Dorado institucional — acentos, overlines, CTA */
  --color-gold-dark:     #a08010;  /* Hover del dorado */
  --color-bg:            #ffffff;  /* Fondo blanco (decisión del cliente, jun 2026) */
  --color-bg-alt:        #0f2535;  /* Secciones oscuras alternas */
  --color-white:         #ffffff;
  --color-text:          #0f2535;
  --color-text-muted:    #5a6a7a;
  --color-splash-dark:   #0a0a0a;  /* Fondo splash 2 logo */
}
```

---

## 4. TIPOGRAFÍA

### Fuente oficial vs. implementación web
- Manual de marca: **Gotham Book** (weight 400) y **Gotham Light** (weight 300)
- Web (Google Fonts gratuita): **Montserrat** — misma geometría de palo seco

### Import en `app/layout.tsx`
```tsx
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-main',
})
```

### Variables
```css
--font-main: 'Montserrat', sans-serif;
```

### Jerarquía de estilos
| Elemento           | Weight | Tamaño                     | Extras                         |
|--------------------|--------|----------------------------|--------------------------------|
| H1 hero            | 600    | clamp(36px, 5vw, 60px)    | UPPERCASE, letter-spacing .05em |
| H2 sección         | 600    | clamp(28px, 3.5vw, 42px)  | letter-spacing .03em           |
| Overline / chapter | 500    | 11px                       | UPPERCASE, letter-spacing .2em, color dorado |
| Nav items          | 400    | 13px                       | letter-spacing .06em           |
| Body / párrafos    | 300    | 16px                       | line-height 1.75               |
| Botones            | 500    | 11–12px                    | UPPERCASE, letter-spacing .12em |
| Descriptor logo    | 300    | 12px                       | letter-spacing .18em           |

### Regla absoluta
**NUNCA usar font-weight 700 ni 800.** El peso máximo es 600.
La ligereza tipográfica es parte del ADN de la marca.

---

## 5. LOGO — ARCHIVOS PNG

Los logos se usan como archivos PNG con `next/image`. Se aplica `filter: brightness(0) invert(1)` via CSS para la versión blanca sobre fondos oscuros.

| Archivo | Uso | CSS |
|---------|-----|-----|
| `public/logos/lm/LM-Nav.png` | Navbar + Footer | `filter: brightness(0) invert(1)` por defecto; se quita en `.scrolled` |
| `public/logos/lm/Lomeli-Morfin.png` | Splash fase 2 | `filter: brightness(0) invert(1)` siempre |
| `app/icon.png` | Favicon (copia de Lomeli-Morfin.png) | — |

### Patrón de uso en componentes
```tsx
import Image from 'next/image'

// Navbar
<Image src="/logos/lm/LM-Nav.png" alt="Lomeli Morfin"
  width={160} height={40} className="nav-logo-img" />

// Footer
<Image src="/logos/lm/LM-Nav.png" alt="Lomeli Morfin"
  width={160} height={40} className="footer-logo-img" />

// Splash
<Image src="/logos/lm/Lomeli-Morfin.png" alt="Lomeli Morfin"
  width={200} height={60} className="s2-logo-img" />
```

### CSS de logos
```css
.nav-logo-img   { height: 52px; width: auto; filter: brightness(0) invert(1); transition: filter 0.35s ease; }
#navbar.scrolled .nav-logo-img { filter: none; }
.footer-logo-img { height: 44px; width: auto; filter: brightness(0) invert(1); }
.s2-logo-img    { height: 90px; width: auto; filter: brightness(0) invert(1); }
```

---

## 5B. SISTEMA RESPONSIVO (jul 2026)

- **Tipografía en `rem`:** TODOS los `font-size` de globals.css están en rem
  (nunca px). La raíz escala con el monitor junto a `--container`:
  `html { font-size: 16px }` → 17px @1600 → 18px @1920 → 20px @2400.
  Los `max-width` de columnas de texto y alturas de logos/cards también
  van en rem para escalar proporcionalmente. NUNCA reintroducir font-size en px.
- **Breakpoints canónicos:** `480 / 768 / 900 / 1024` (max-width) y
  `1600 / 1920 / 2400` (min-width). Única excepción: 1100 (ad-grid 5→4 col).
  No crear breakpoints nuevos fuera de estos.
- **Piso tipográfico:** nada menor a 0.6875rem (11px).
- **Hero:** `height: 110vh` + `110svh` (fallback) — mantener ambas líneas.
- **iOS:** inputs a `1rem` (16px) en ≤768px o Safari hace auto-zoom al enfocar.
- **Dot grids 3D (`::before` con rotateX):** toda sección que los use DEBE
  estar en el grupo A1 con `overflow: hidden` (#hero incluido) — sin clip,
  la proyección 3D se ensancha más que el viewport y genera scroll horizontal.
- **Alturas de cards con texto:** usar `min-height`, nunca `height` fija
  (csc-card cortaba contenido en pantallas chicas).
- **`background-attachment: fixed` del body:** desactivado en táctiles/≤1024px.

## 6. REGLAS DE DISEÑO

- **Botones:** `border-radius: 2px` SIEMPRE — nunca más de 3px
- **Cards:** `border-radius: 6px`
- **Sombras:** usar SOLO el sistema de elevación (`--elevation-1` a `--elevation-4`, tinte navy `rgba(15,37,53,…)`) definido en globals.css para cards flotantes — NUNCA sombras grises genéricas ni `shadow-*` arbitrarias en botones
- **Fondo de página:** blanco `#ffffff` con washes radiales sutiles (navy/dorado, `background-attachment: fixed`) — el cliente pidió eliminar el crema; la profundidad se compensa con el sistema de elevación y bordes navy sutiles (`rgba(27,66,84,0.09–0.1)`) en cards blancas
- **Sistema de profundidad (Dimensional Layering):** secciones claras transparentes sobre el fondo del body; contenido en cards/paneles blancos flotantes con `--elevation-N`; paneles que se traslapan (stats sobre hero −68px, servicios/contacto sobre PageHeader −48px); hover lift `translateY(-4/-5px)` respetando `prefers-reduced-motion`
- **Imágenes:** `object-fit: cover`, sin bordes, sin sombras
- **Secciones:** `padding: 110px 0` desktop — `60px 0` mobile
- **Contenedor:** `max-width: 1440px`, `margin: 0 auto`, `padding: 0 6vw`
- **Separadores:** línea `1px solid #c8a020` o whitespace generoso — NUNCA `<hr>` gris
- **Fondos alternos:** secciones claras transparentes/blancas alternadas con secciones oscuras `#0f2535`/`#1b4254`
- **NUNCA** usar parallax (las fotos son corporativas, no de paisaje)
- **NUNCA** animaciones en loop
- **NUNCA** cursor personalizado

---

## 7. TAILWIND CSS v4 — REGLAS DE USO

### Variables de paleta en `globals.css`
Definir en `@theme` — Tailwind v4 es CSS-first, NO usar `tailwind.config.js`:

```css
@theme {
  --color-primary:      #1b4254;
  --color-primary-dark: #0f2535;
  --color-primary-mid:  #2b5a72;
  --color-gold:         #c8a020;
  --color-gold-dark:    #a08010;
  --color-bg:           #ffffff;
  --color-bg-alt:       #0f2535;
  --font-main: 'Montserrat', sans-serif;
}
```

Usar como clases: `bg-primary`, `text-gold`, `bg-bg`, `font-main`.

### Lo que va en Tailwind (clases utilitarias)
- Layout: `flex`, `grid`, `grid-cols-*`, `gap-*`, `max-w-[1440px]`, `mx-auto`
- Espaciado: `px-[6vw]`, `py-[110px]`, responsive `md:py-[60px]`
- Tipografía: `text-*`, `font-*`, `tracking-*`, `leading-*`
- Responsive: `sm:`, `md:`, `lg:`, `xl:`
- Colores de paleta: `bg-primary`, `text-gold`, etc.
- Hover simple: `hover:bg-primary-mid`, `hover:text-gold`

### Lo que va en `globals.css` como CSS puro (NO Tailwind)
- Las 4 animaciones: `@keyframes clipReveal`, `fadeUp`, `lineWipe`, `barFull`
- Clases `.reveal-title`, `.overline-wrap`, `.stagger-child`, `.stagger-child.visible`
- Splash screens y sus animaciones internas
- `filter: grayscale` en logos
- `::after` del nav item (underline dorado)
- `clip-path` en general

### Restricciones de Tailwind que NO cambian por el ADN de la marca
```
✗ NUNCA rounded-xl ni rounded-2xl en botones — máximo rounded-sm (2px)
✗ NUNCA shadow-* arbitrarias — solo var(--elevation-N) en cards flotantes, nunca en botones
✗ NUNCA font-bold ni font-extrabold — máximo font-semibold (600)
✗ NUNCA fondos crema/beige (#f5f0e8, #e8e0d0) — el cliente los eliminó; usar blanco + elevación
✗ NUNCA instalar plugins de Tailwind sin consultar primero
```

---

## 8. SPLASH SCREENS — SECUENCIA DE ENTRADA

El sitio tiene DOS fases en un solo contenedor. El usuario puede hacer clic para saltar. Se muestra una sola vez por recarga de página (module-level variable).

### Anti-repetición
```tsx
// En Splash.tsx — variable a nivel de módulo (se resetea con cada recarga, persiste en navegación SPA)
let splashShown = false
```

### Tiempos actuales
```ts
const PHASE1 = 2000   // fase "Nos estamos renovando"
const CROSSFADE = 600 // transición entre fases
const PHASE2 = 4000   // fase logo Lomeli Morfin
const FADE_OUT = 600  // fade final hacia el sitio
```

### FASE 1 — "Nos estamos renovando" (TEMPORAL)
- **Fondo:** `#1b4254`
- **Barra de progreso:** CSS puro animado (`@keyframes barFull`), decorativa
- **Contenido:** eyebrow muted + pill "Nueva era" + headline + subtext

### FASE 2 — Logo LM (PERMANENTE)
- **Fondo:** `#0a0a0a`
- **Logo:** `Lomeli-Morfin.png` con `filter: brightness(0) invert(1)`
- **Barra de progreso:** CSS puro animado, decorativa
- **Contenido:** logo + línea divisora + "Consultores en Fianzas"

### Estructura JSX
```tsx
<Splash />
<main id="site" style={{ opacity: 0 }}>
  <Navbar />
  {/* secciones */}
</main>
```

---

## 9. NAVBAR

- **Posición:** `position: fixed`, `top: 0`, `width: 100%`, `z-index: 1000`
- **Estado inicial** (sobre hero): `background: transparent`, logo blanco, links blancos
- **Al scroll >60px:** `background: rgba(245,240,232,0.97)`, `backdrop-filter: blur(10px)`, logo color, links azul marino
- **Transición:** `all 0.35s ease`
- **Logo:** `LM-Nav.png` — blanco sobre hero (CSS filter), color al scroll (filter none)
- **Ítems de navegación:** número dorado `(01)` seguido del nombre y slash: `(01) Nosotros/`
- **CTA botón:** "Solicitar cotización" — `background: #c8a020`, `color: #0f2535`, `border-radius: 2px`
- **Hover ítems nav:** `::after` línea dorada `width: 0 → 60%`, `transition: .3s ease`

### React scroll listener (`components/Navbar.tsx`)
```tsx
'use client'
import { useEffect, useRef } from 'react'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () =>
      navRef.current?.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return <nav ref={navRef} id="navbar">{/* contenido */}</nav>
}
```

---

## 10. SECCIONES — CONTENIDO COMPLETO

---

### (00) NAVBAR
```
Logo LM | (01) Nosotros/ | (02) Servicios/ | (03) Clientes/ | (04) Cobertura/ | (05) Contacto/ | [Solicitar cotización]
```

---

### (01) HERO — 100vh

- **Fondo:** `public/images/hero/hero_bg.jpg` con overlay `rgba(15,37,53,0.65)`
- **PLACEHOLDER:** `linear-gradient(160deg, #0f2535 0%, #1b4254 60%, #2b5a72 100%)`
- **Overline dorada:** "Desde 1981 · Consultores en Fianzas"
- **H1:** "SOLIDEZ Y CONFIANZA EN CADA FIANZA"
- **Párrafo:** "Especialistas en asesoría, consultoría e intermediación de fianzas con más de 40 años de experiencia en el sector afianzador."
- **Botón primario:** "Conoce nuestros servicios" → `background: #1b4254`
- **Botón outline:** "Contáctanos" → `border: 1.5px solid white`, `color: white`, `background: transparent`

**Fotografía recomendada:** apretón de manos profesional, firma de contrato, reunión de negocios. Iluminación cálida, natural, NO fría.

---

### (02) STATS — Franja de credenciales

- **Fondo:** `#1b4254`
- **Layout:** 4 columnas centradas
- **Contadores animados** (se activan al entrar al viewport con IntersectionObserver en `useEffect`):

| ID           | Valor | Sufijo | Etiqueta              |
|--------------|-------|--------|-----------------------|
| `c-years`    | 40    | +      | Años de experiencia   |
| `c-states`   | 14    | —      | Estados               |
| `c-firms`    | 10    | —      | Afianzadoras          |
| `c-clients`  | 12    | +      | Clientes destacados   |

---

### (03) NOSOTROS

- **Overline + línea dorada:** "Capítulo 1 · Nosotros"
- **H2:** "Más de 40 años respaldando tu patrimonio"
- **Layout:** 2 columnas desktop — texto izquierda, foto derecha
- **Foto:** `public/images/nosotros/nos_equipo.jpg` — PLACEHOLDER: gradiente
- **Fotografía recomendada:** equipo trabajando en oficina, natural, no posada

**Historia (texto exacto):**
> LOMELI MORFIN CONSULTORES es una organización especializada en Asesoría, Consultoría e Intermediación de todo tipo de Fianzas (Administrativas, Judiciales, Fidelidad y de Crédito), contamos con la Cédula de Autorización por parte de la Comisión Nacional de Seguros y Fianzas (SHCP) desde el año de 1981, lo que nos permite contar con una amplia experiencia profesional en el Sector Afianzador para brindar a nuestros Clientes un servicio de calidad y excelencia de acuerdo a sus necesidades.

**Misión** (en bloque con borde izquierdo dorado):
> Lograr a partir del compromiso de todo nuestro Equipo, la atracción y confianza de cada uno de nuestros Clientes, que les permita tener una ventaja competitiva frente a otros creando una total satisfacción.

**Visión:**
> Posicionarnos como LA ORGANIZACIÓN DE TRÁMITE DE FIANZAS más importante a nivel nacional e internacional, ofreciendo una opción de excelencia en servicios de consultoría y asesoría para las Empresas.

**6 Valores** — grid 3×2, cada uno con ícono SVG de línea (`ico_`) + título + descripción corta:

| Ícono             | Valor         | Descripción corta                                      |
|-------------------|---------------|--------------------------------------------------------|
| `ico_innovacion`  | Innovación    | A la vanguardia en estrategias organizacionales        |
| `ico_calidad`     | Calidad       | Satisfacer las más altas exigencias del sector         |
| `ico_puntualidad` | Puntualidad   | La entrega oportuna como base fundamental              |
| `ico_honestidad`  | Honestidad    | Cumplimiento del reglamento interno                    |
| `ico_confianza`   | Confianza     | Seguridad y certeza en cada integrante del equipo      |
| `ico_comunicacion`| Comunicación  | Base que promueve el conocimiento organizacional       |

---

### (04) SERVICIOS

- **Overline + línea dorada:** "Capítulo 2 · Servicios"
- **H2:** "Soluciones para cada necesidad"
- **Layout:** grid 2×2 de cards grandes con imagen de fondo
- **Al hacer clic en una card:** abre modal con descripción completa y subtipos

#### Card (01) — Fianzas de Fidelidad
- **Imagen:** `public/images/servicios/srv_fidelidad.jpg`
- **PLACEHOLDER:** `linear-gradient(135deg, #0f2535, #1b4254)`
- **Descripción:** Garantiza el resarcimiento del daño patrimonial que cause un empleado por la comisión de un delito (Robo, Fraude, Abuso de Confianza o Peculado) en contra de bienes de la empresa.

#### Card (02) — Fianzas Judiciales
- **Imagen:** `public/images/servicios/srv_judiciales.jpg`
- **PLACEHOLDER:** `linear-gradient(135deg, #1b4254, #2b5a72)`
- **Subtipos en modal:**
  - Penales: Libertad Provisional, Libertad Preparatoria, Condena Condicional
  - No Penales: Civiles, Mercantiles, Amparo, Laborales

#### Card (03) — Fianzas Administrativas
- **Imagen:** `public/images/servicios/srv_administrativas.jpg`
- **PLACEHOLDER:** `linear-gradient(135deg, #2b5a72, #1b4254)`
- **Subtipos en modal:** Concurso y Licitación, Anticipo, Cumplimiento, Buena Calidad, Penas Convencionales, Obligaciones Laborales, Inconformidad Fiscal, Convenio de Pagos, Arrendamiento

#### Card (04) — Fianzas de Crédito
- **Imagen:** `public/images/servicios/srv_credito.jpg`
- **PLACEHOLDER:** `linear-gradient(135deg, #0f2535, #c8a020)`
- **Subtipos en modal:** Suministro PEMEX, Suministro ASA, Compra-Venta, Distribución Mercantil

#### Comportamiento hover de cards
```css
.service-card img {
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.service-card:hover img { transform: scale(1.05); }
.service-card .overlay {
  background: rgba(15,37,53,0);
  transition: background 0.4s ease;
}
.service-card:hover .overlay { background: rgba(15,37,53,0.38); }
.service-card .label {
  transform: translateY(6px); opacity: 0.7;
  transition: all 0.35s ease;
}
.service-card:hover .label { transform: translateY(0); opacity: 1; }
```

---

### (05) AFIANZADORAS

- **Fondo:** `#e8e0d0`
- **Overline + línea dorada:** "Capítulo 3 · Respaldo"
- **H2:** "Respaldados por las mejores afianzadoras"
- **Intro:** "Contamos con relación comercial y apoyo de las afianzadoras líderes del sector:"
- **Layout:** grid 5 columnas desktop, 3 mobile, 2 en xs
- **Logos disponibles:** usar `af_nombre.png` cuando existan; placeholder = nombre en texto estilizado
- **Hover:** `filter: grayscale(100%) opacity(0.6)` por defecto → `filter: none` en hover, `transition: filter 0.35s ease`

**Lista de afianzadoras:**
1. ACE Fianzas Monterrey, S.A. → `af_ace.png`
2. Afianzadora Insurgentes, S.A. de C.V. → `af_insurgentes.png`
3. Afianzadora Aserta, S.A. de C.V. → `af_aserta.png`
4. Afianzadora Sofimex, S.A. → `af_sofimex.png`
5. Fianzas Dorama, S.A. de C.V. → `af_dorama.png`
6. Afianzadora Fiducia, S.A. de C.V. → `af_fiducia.png`
7. Liberty Fianzas → `af_liberty.png`
8. Fianzas Atlas, S.A. → `af_atlas.png`
9. Zurich Fianzas México, S.A. de C.V. → `af_zurich.png`
10. Fianzas Guadiana Inbursa, S.A. → `af_inbursa.png`

---

### (06) CLIENTES

- **Misma estructura que Afianzadoras** (fondo alterno `#f5f0e8`)
- **Overline + línea dorada:** "Capítulo 4 · Clientes"
- **H2:** "Empresas que confían en nosotros"

**Lista de clientes:**
1. Abengoa México, S.A. de C.V. → `cl_abengoa.png`
2. Construcciones Metálicas Mexicanas Comemsa, S.A. de C.V. → `cl_comemsa.png`
3. Emerson Process Management, S.A. de C.V. → `cl_emerson.png`
4. Alfa Proveedores y Contratistas, S.A. de C.V. → `cl_alfa-proveedores.png`
5. Equipos y Servicios Vica, S.A. de C.V. → `cl_vica.png`
6. Electelco, S.A. de C.V. → `cl_electelco.png`
7. Multieléctrica Industrial, S.A. de C.V. → `cl_multielectrica.png`
8. Prom/Tec, S.A. de C.V. → `cl_promtec.png`
9. Samson Control, S.A. de C.V. → `cl_samson.png`
10. Consorcio Aristos, S.A. de C.V. → `cl_aristos.png`
11. ISI Mustang Servicios en Ingeniería de México → `cl_isi-mustang.png`
12. Grupo ADO (y sus 103 Empresas Filiales) → `cl_grupo-ado.png`

---

### (07) COBERTURA PREVIEW — en home (`CoberturaPreview.tsx`)

- **Fondo:** `#0f2535`
- **Layout:** 2 columnas — texto izquierda, globo terráqueo derecha
- **Globo:** componente `GlobePreview.tsx` usando `react-globe.gl` + `world-countries.geojson`
  - Países activos (dorado `#c8a020`): México, Argentina, Colombia, España
  - ISO codes: `MEX`, `ARG`, `COL`, `ESP`
  - Resto del mundo: azul oscuro translúcido
  - Fondo del globo: transparente (sin textura)
  - Renderizado sólo en cliente (`dynamic` con `ssr: false`)
  - Forma: circular (`.globe-circle-mask` con `border-radius: 50%`, `overflow: hidden`)
- **Mobile:** columna única, globo centrado, tamaño `min(420px, 85vw)`

### (07b) COBERTURA — página completa (`/cobertura`)

- **Implementación:** mapa SVG de México (`CoberturaMapMx.tsx`) con estados activos
- **Marcadores:** puntos dorados con animación `pulse`
- **Contadores animados:** 14 estados, 4 países, 40+ años

**14 estados activos en México:**
Monterrey · Guadalajara · CDMX · Puebla · Villahermosa ·
Baja California · Veracruz · Chiapas · Estado de México ·
Mérida · Colima · Nayarit · Morelos · Michoacán

---

### (07c) OFICINA (`OficinaSection.tsx`)

- **Fondo:** `#0f2535`
- **Layout:** 2 columnas — video circular izquierda, texto derecha
- **Video:** `public/videos/video_optimizado.mp4` — `autoPlay muted loop playsInline`
- **Forma del video:** círculo con borde dorado (`border-radius: 50%`, `overflow: hidden`)
- **Decoración:** `::before` ring exterior dorado translúcido
- **Animación del video:** `@keyframes videoReveal` (scale 1.06→1 + opacity), 2s
- **Dirección:** Río Nazas 181, Cuauhtémoc, 06500, CDMX
- **Mobile:** columna única, video centrado `min(420px, 85vw)`

---

### (08) CONTACTO — CTA Final

- **Fondo:** `#1b4254`
- **Texto grande:** "¿Listo para tramitar tu fianza?"
- **Subtexto:** "Contáctanos y uno de nuestros especialistas te atenderá a la brevedad."
- **Botón:** "Solicitar cotización" → `background: #c8a020`, `color: #0f2535`

---

### FOOTER

- **Fondo:** `#0f2535`
- **Separador superior:** línea 2px `#c8a020`
- **Logo:** `LM-Nav.png` con `filter: brightness(0) invert(1)`
- **4 columnas:**
  - Logo + descripción corta
  - Navegación: Nosotros / Servicios / Clientes / Cobertura / Contacto
  - Contacto: teléfono, email, dirección
  - Redes sociales + créditos
- **Todo en blanco** sobre fondo oscuro, sin colores adicionales

---

## 11. SISTEMA DE ANIMACIONES

> **ACTUALIZADO:** el motor de animación es **framer-motion**, no CSS+IO. Todo
> lo de abajo (Animación 1–4, keyframes CSS) describe el sistema histórico y se
> conserva como referencia de intención — pero para código NUEVO usa framer.

### Cómo animar hoy (framer-motion)
- **Variants compartidas:** `components/animations.ts` — `fadeUp`, `fadeIn`,
  `slideLeft`, etc. Easing estándar `[0.25, 0.46, 0.45, 0.94]`, y
  `VIEWPORT = { once: true, margin: '-80px 0px' }`. Reusa estas variants; no
  redefinas duraciones/easings ad-hoc por componente.
- **Reveal ligado al scroll:** `components/ScrollReveal.tsx` — el progreso de la
  animación = progreso del scroll (no un threshold). Úsalo para revelados de
  bloques grandes; props `y` (px iniciales) y `delay` (fracción 0–0.2).
- **Reveal por viewport:** envuelve con `<motion.div variants={fadeUp}
  initial="hidden" whileInView="show" viewport={VIEWPORT}>`.
- framer respeta `prefers-reduced-motion` vía `useReducedMotion` — úsalo en
  animaciones ligadas al scroll (ver `app/template.tsx`).

### Filosofía (invariante, con cualquier motor)
- Las animaciones **revelan**, no decoran
- Cada elemento anima **una sola vez** al entrar al viewport (`once: true`)
- **NUNCA** loops, **NUNCA** animaciones automáticas en sección visible
  (única excepción: el `pulse` del mapa y el carrusel continuo de logos)
- Siempre respetar `prefers-reduced-motion`

---

### Animación 1 — fadeUp reveal (títulos h2)

Los h2 empiezan ocultos con `.clip-hidden` y revelan al entrar al viewport.

```css
.clip-hidden { opacity: 0; transform: translateY(16px); }

.reveal-title {
  animation: fadeUp 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
```

> **Nota:** originalmente se usaba `clip-path: inset()` pero se cambió a `opacity + transform` por incompatibilidad con Android (MIUI/Xiaomi). `@keyframes clipReveal` sigue en globals.css pero **no se usa** en h2.

**Uso:** H2 de cada sección — IntersectionObserver en `useEffect` añade clase `.reveal-title` y quita `.clip-hidden`

---

### Animación 2 — Línea dorada + overline

```html
<div class="overline-wrap">
  <div class="gold-line"></div>
  <span class="overline-text">Capítulo 2 · Servicios</span>
</div>
```

```css
.gold-line {
  height: 1px;
  background: #c8a020;
  width: 0;
  transition: width 0.9s cubic-bezier(0.77, 0, 0.18, 1);
}
.overline-text {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.55s ease 0.5s, transform 0.55s ease 0.5s;
}
.overline-wrap.visible .gold-line    { width: 60px; }
.overline-wrap.visible .overline-text { opacity: 1; transform: translateY(0); }
```

**Uso:** antes de cada overline de sección — IntersectionObserver añade clase `.visible`

---

### Animación 3 — Stagger en grids

```css
.stagger-child {
  opacity: 0;
  transform: translateY(24px);
}
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
.stagger-child.visible { animation: fadeUp 0.55s ease forwards; }
.stagger-child:nth-child(1).visible { animation-delay: 0.00s; }
.stagger-child:nth-child(2).visible { animation-delay: 0.08s; }
.stagger-child:nth-child(3).visible { animation-delay: 0.16s; }
.stagger-child:nth-child(4).visible { animation-delay: 0.24s; }
.stagger-child:nth-child(5).visible { animation-delay: 0.32s; }
.stagger-child:nth-child(6).visible { animation-delay: 0.40s; }
```

**Uso:** grid de servicios, 6 valores, logos afianzadoras/clientes

---

### Animación 4 — Contadores numéricos

```typescript
function animateCounter(el: HTMLElement, target: number, suffix = '', duration = 1500) {
  const start = performance.now()
  ;(function step(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    el.textContent = Math.floor(eased * target) + suffix
    if (progress < 1) requestAnimationFrame(step)
  })(performance.now())
}
```

Activar con IntersectionObserver dentro de `useEffect` en `Stats.tsx`.

---

### Microinteracciones CSS puras

```css
/* Cards de servicios — hover */
.service-card { overflow: hidden; }
.service-card img { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
.service-card:hover img { transform: scale(1.05); }

/* Botones — hover */
.btn-primary { transition: background 0.25s ease; }
.btn-primary:hover { background: #2b5a72; }
.btn-gold:hover { background: #a08010; }

/* Nav items — underline dorado */
.nav-item { position: relative; }
.nav-item::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 1px; background: #c8a020;
  transition: width 0.3s ease;
}
.nav-item:hover::after { width: 100%; }

/* Logos afianzadoras/clientes — grayscale hover */
.logo-grid img {
  filter: grayscale(100%) opacity(0.6);
  transition: filter 0.35s ease;
}
.logo-grid img:hover { filter: none; }
```

---

## 12. PLACEHOLDERS MIENTRAS NO HAY ASSETS REALES

```css
/* Usar gradientes de la paleta — NO servicios externos */
.placeholder-hero    { background: linear-gradient(160deg, #0f2535 0%, #1b4254 60%, #2b5a72 100%); }
.placeholder-nosotros{ background: linear-gradient(135deg, #1b4254, #2b5a72); }
.placeholder-srv-1   { background: linear-gradient(135deg, #0f2535, #1b4254); }
.placeholder-srv-2   { background: linear-gradient(135deg, #1b4254, #2b5a72); }
.placeholder-srv-3   { background: linear-gradient(135deg, #2b5a72, #1b4254); }
.placeholder-srv-4   { background: linear-gradient(135deg, #0f2535, #c8a020); }
```

**Logos placeholder:** mostrar el nombre de la empresa en texto centrado, `color: #5a6a7a`, dentro de la celda del grid. La estructura JSX/CSS NO debe cambiar cuando lleguen los assets reales — solo se actualizan rutas.

---

## 13. ESTADO ACTUAL DEL DESARROLLO

### Completado ✓
- Base: globals.css, layout.tsx, page.tsx
- Splash (dos fases, anti-repeat, barra CSS decorativa)
- Navbar (scroll listener, mobile menu, logo PNG)
- Hero (100vh, placeholder gradiente)
- Stats (contadores animados)
- NosotrosPreview + Nosotros completo
- ServiciosPreview + Servicios completo (cards + modal)
- CoberturaPreview con globo terráqueo (react-globe.gl)
- Cobertura completa con mapa SVG México
- OficinaSection (video circular, dirección)
- Afianzadoras (grid logos)
- LogosCarousel (carrusel continuo clientes)
- ContactoCTA + ContactoForm
- Footer
- Animaciones: fadeUp, stagger, overline, contadores
- Responsive mobile
- Favicon (app/icon.png)
- Deploy en Vercel (.npmrc legacy-peer-deps)

### Pendiente
- Assets reales: fotos hero, nosotros, servicios (actualmente placeholders con gradientes)
- Logos PNG de afianzadoras y clientes (actualmente texto placeholder)
- og:image para redes sociales
- Formulario de contacto: conectar backend/email

---

## 14. LO QUE NO HACER — LISTA ROJA

```
✗ Bootstrap, Foundation u otro framework CSS adicional
✗ jQuery u otras librerías JS pesadas
✗ Pages Router de Next.js — usar solo App Router
✗ tailwind.config.js para definir la paleta — usar @theme en globals.css
✗ font-weight 700 u 800 en cualquier elemento
✗ border-radius > 6px en UI (excepto pills/tags: hasta 20px)
✗ box-shadow fuera del sistema de elevación (--elevation-1..4) — nunca en botones
✗ Fondos crema/beige — el fondo de página es blanco por decisión del cliente
✗ Parallax en imágenes
✗ Cursor personalizado
✗ Animaciones en loop (excepto el pulse del mapa)
✗ Servicios externos de placeholder (picsum.photos, etc.)
✗ Cambiar la estructura JSX cuando lleguen assets reales
✗ Usar <hr> gris como separador
✗ Sombras en texto (text-shadow)
✗ Más de 3 pesos tipográficos distintos en una misma sección
✗ NUNCA instalar plugins de Tailwind sin consultar primero
```

---

*Documento generado a partir de: Manual de Identidad Gráfica LM, Concentrado de Contenidos, referencia visual verholy.com, y sesión de diseño completa.*
