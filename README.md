# salvacastro.com.ar — Portfolio, servicios y blog de Salvador Castro

🌐 **https://www.salvacastro.com.ar**

Sitio personal y comercial de **Salvador Castro** (Frontend Developer, Buenos Aires). Cumple tres funciones:

1. **Vidriera comercial**: ofrece desarrollo web para negocios y PyMEs (landing pages, sistemas de turnos, e-commerce, mantenimiento) con CTAs a WhatsApp y Cal.com.
2. **Portfolio**: casos de éxito con galería de capturas, escritos en MDX.
3. **Blog "Noticias y Tendencias Tech"**: notas de divulgación tecnológica en español (IA, ciberseguridad, productividad, movilidad en CABA…), con filtros, paginación, RSS y `llms.txt`.

Está construido sobre la plantilla **Magic Portfolio** de [Once UI](https://once-ui.com), fuertemente modificada y traducida al español.

---

## Índice

- [Stack](#stack)
- [Puesta en marcha](#puesta-en-marcha)
- [Variables de entorno](#variables-de-entorno)
- [Scripts](#scripts)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas del sitio](#rutas-del-sitio)
- [Configuración central (`src/app/resources`)](#configuración-central-srcappresources)
- [Contenido: blog y trabajos (MDX)](#contenido-blog-y-trabajos-mdx)
- [Blog: paginación y filtros](#blog-paginación-y-filtros)
- [SEO, feeds y metadatos](#seo-feeds-y-metadatos)
- [Analítica y tracking de conversiones](#analítica-y-tracking-de-conversiones)
- [Diseño y sistema de UI (Once UI)](#diseño-y-sistema-de-ui-once-ui)
- [Performance](#performance)
- [Seguridad](#seguridad)
- [Deploy](#deploy)
- [Convenciones](#convenciones)
- [Problemas conocidos / deuda técnica](#problemas-conocidos--deuda-técnica)
- [Licencia](#licencia)

---

## Stack

| Área | Tecnología |
| --- | --- |
| Framework | **Next.js 15** (App Router, RSC) |
| UI | **React 19.2**, TypeScript 5.8 (`strict`) |
| Sistema de diseño | **Once UI** (copiado en `src/once-ui`, no como dependencia) |
| Estilos | **SCSS Modules** + tokens Once UI, PostCSS (`postcss-preset-env`, `postcss-custom-media`, `flexbugs-fixes`) |
| Contenido | **MDX** (`next-mdx-remote/rsc` + `gray-matter` + `remark-gfm`) |
| Resaltado de código | `prismjs` (módulo `CodeBlock`) |
| Íconos | `react-icons`, `lucide-react` (registrados en `src/once-ui/icons.ts`) |
| Imágenes | `next/image` + `sharp` |
| Tipografía | Geist / Geist Mono vía `next/font/google`; Inter local para las imágenes OG |
| Analítica | Vercel Analytics + Google Analytics 4 (opcional) |
| Newsletter | Mailchimp (form embebido) |
| Hosting | Vercel |

---

## Puesta en marcha

Requisitos: **Node.js 18.18+** (recomendado 20 LTS) y npm.

```bash
git clone git@github.com:salvador-castro/personalweb.git
cd personalweb
npm install
cp .env.example .env.local   # completar valores
npm run dev                  # http://localhost:3000
```

---

## Variables de entorno

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_URL` | **Sí en producción** | Dominio **sin protocolo** (`www.salvacastro.com.ar`). Se le antepone `https://`. Se usa en metadatos, canonical, sitemap, RSS, OG y JSON-LD. Si falta, cae a `https://www.salvacastro.com.ar`. En producción está configurada en Vercel. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | ID de GA4 (`G-XXXXXXXXXX`). Si no está, no se carga gtag. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Código de verificación de Google Search Console (método meta tag). |

---

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |

El deploy lo hace Vercel automáticamente en cada push (no hay script de deploy). No hay linter configurado.

---

## Estructura del proyecto

```
personalweb/
├── public/
│   ├── fonts/Inter.ttf              # Fuente para /og
│   └── images/
│       ├── avatar.webp
│       ├── blog/<slug>/…            # Imágenes de cada post (.webp)
│       └── projects/<proyecto>/…    # Capturas de cada caso de éxito
├── src/
│   ├── app/                         # App Router
│   │   ├── layout.tsx               # Layout raíz: tema, fondo, Header/Footer, GA, RouteGuard
│   │   ├── page.tsx                 # Home
│   │   ├── servicios/               # Página comercial
│   │   ├── sobre-mi/                # CV: experiencia, estudios, tecnologías
│   │   ├── trabajos/
│   │   │   ├── page.tsx             # Listado de casos
│   │   │   ├── [slug]/page.tsx      # Detalle de caso
│   │   │   └── projects/*.mdx       # ← contenido de los casos
│   │   ├── blog/
│   │   │   ├── page.tsx             # Página 1 + filtros
│   │   │   ├── page/[page]/         # Paginación estática
│   │   │   ├── tag/[tag]/           # Listado por categoría
│   │   │   ├── [slug]/page.tsx      # Detalle de post
│   │   │   └── posts/*.mdx          # ← contenido del blog
│   │   ├── og/route.tsx             # Generador de imágenes Open Graph
│   │   ├── rss.xml/route.ts         # Feed RSS 2.0
│   │   ├── llms.txt/route.ts        # Índice para LLMs
│   │   ├── sitemap.ts / robots.ts
│   │   ├── resources/               # ← CONFIGURACIÓN Y TEXTOS DEL SITIO
│   │   │   ├── config.js            # rutas, tema, efectos, fuentes, Mailchimp, baseURL
│   │   │   ├── content.js           # persona, home, sobre mí, servicios, blog…
│   │   │   └── index.ts
│   │   └── utils/                   # getPosts (MDX), formatDate (es-AR), gtag
│   ├── components/                  # Componentes propios del sitio
│   │   ├── Header, Footer, ThemeToggle, RouteGuard, Mailchimp
│   │   ├── WhatsAppFAB, TrackClick, ShareIcons, ProjectCard, ScrollToHash
│   │   ├── mdx.tsx                  # Mapeo de componentes para MDX
│   │   ├── blog/                    # Posts, Post, BlogFilters, BlogPagination
│   │   ├── trabajos/Projects.tsx
│   │   └── sobremi/TableOfContents.tsx
│   ├── once-ui/                     # Sistema de diseño (components, modules, styles, tokens)
│   └── types/project.ts
├── social-media/                    # (ignorado por git) calendario de redes y prompts de imágenes
├── next.config.mjs
├── postcss.config.js
├── skills-lock.json                 # Skills de agentes IA instalados (Claude/Vercel/etc.)
└── .env.example
```

Alias de import: `@/*` → `src/*`.

---

## Rutas del sitio

| Ruta | Contenido | Generación |
| --- | --- | --- |
| `/` | Hero comercial, badge de caso destacado (Clapton), proyectos, últimos posts, newsletter | Estática |
| `/servicios` | 4 servicios con features y caso de estudio, proceso de trabajo en 4 pasos, CTA WhatsApp + Cal.com | Estática |
| `/sobre-mi` | Intro, experiencia laboral, formación, tecnologías, índice lateral, link a agenda | Estática |
| `/trabajos` | Listado de casos de éxito | Estática |
| `/trabajos/[slug]` | Detalle de caso (MDX) | SSG |
| `/blog` | Primera página del blog + filtros | Estática |
| `/blog/page/[n]` | Páginas 2…N (`/blog/page/1` redirige a `/blog`) | SSG, `dynamicParams = false` |
| `/blog/tag/[tag]` | Posts de una categoría | SSG |
| `/blog/[slug]` | Detalle de post con botones para compartir | SSG |
| `/og?title=…` | Imagen OG 1920×1080 dinámica | Runtime Node |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Feeds / SEO | `force-static` |

La visibilidad se controla en `routes` de [config.js](src/app/resources/config.js): si una ruta está en `false`, `RouteGuard` renderiza el 404. Las rutas dinámicas (`/blog/*`, `/trabajos/*`) heredan el flag de su ruta base.

---

## Configuración central (`src/app/resources`)

Casi todo lo editable sin tocar componentes vive acá.

### `config.js`

- **`baseURL`** — derivado de `NEXT_PUBLIC_BASE_URL`.
- **`routes`** — habilita/oculta secciones.
- **`font`** — Geist (`display: 'optional'`, fuera del camino crítico del LCP) y Geist Mono (`swap`).
- **`style`** — tema Once UI: `neutral: gray`, `brand: cyan`, `accent: red`, `border: playful`, `surface: translucent`, `solid: contrast`, `scaling: 100`.
- **`effects`** — fondo: patrón de puntos activo (opacidad 40); gradiente, grid, líneas y máscara de cursor desactivados.
- **`display`** — muestra ubicación, hora local y switch de tema en el header.
- **`mailchimp`** — URL `action` del formulario y efectos visuales del bloque de newsletter.

### `content.js`

- **`person`** — nombre, rol, avatar, email, redes, número de WhatsApp, zona horaria, idiomas.
- **`social`** — íconos del footer/sobre mí (GitHub, LinkedIn, X, YouTube, WhatsApp, Email).
- **`waLink(message)`** — helper que arma links `wa.me` con mensaje precargado.
- **`home`**, **`sobremi`**, **`blog`**, **`trabajos`**, **`servicios`**, **`newsletter`** — títulos, descripciones SEO y textos de cada página (en JSX).

Para cambiar el número de WhatsApp, la agenda de Cal.com (`sobremi.calendar.link`) o el caso destacado del home (`home.featured`), se edita solo este archivo.

---

## Contenido: blog y trabajos (MDX)

Ambos se leen del filesystem en build con `getPosts()` ([utils.ts](src/app/utils/utils.ts)). **El slug es el nombre del archivo** sin extensión.

### Nuevo post del blog

1. Crear `src/app/blog/posts/<slug>.mdx`.
2. Subir imágenes a `public/images/blog/<slug>/` (preferentemente `.webp`).
3. Frontmatter:

```yaml
---
title: "Título del post"
publishedAt: "2026-10-01"          # YYYY-MM-DD; define orden, RSS y sitemap
summary: "Resumen de 1–3 oraciones (se usa como meta description)."
image: "/images/blog/<slug>/<slug>-1.webp"   # portada / OG
tag: "Tecnología"                  # una sola categoría
---
```

Categorías en uso: `Tecnología`, `Inteligencia Artificial`, `Ciberseguridad`, `Seguridad`, `Productividad`, `Movilidad`, `Sociedad`, `Musica`, `Semana Tech BA`. Un tag nuevo genera automáticamente su página `/blog/tag/<tag>` y su entrada en el sitemap.

Convención de commits para posts: `Add post: <slug>`.

### Nuevo caso de éxito

1. Crear `src/app/trabajos/projects/<Slug>.mdx`.
2. Capturas en `public/images/projects/<proyecto>/`.
3. Frontmatter:

```yaml
---
title: "Proyecto: descripción corta"
publishedAt: "2026-04-30"
summary: "Qué es y qué resuelve."
images:
  - "/images/projects/<proyecto>/demo1.webp"
  - "/images/projects/<proyecto>/demo2.webp"
team:
  - name: "Salvador Castro"
    role: "Desarrollador Full Stack"
    avatar: "/images/avatar.webp"
    linkedIn: "https://www.linkedin.com/in/salvador-castro"
link: "https://sitio-del-proyecto.com"   # opcional
---
```

Casos actuales: Arte Urbano, Be Orange, Bitcoin Week, Clapton Barbería, Turnos Clapton, Dario Blanco, La Vaca Roja, Sistema de Turnos SFI, CRUD Movies PHP, Plugin Agency y WhatsApp Group Bot.

### Componentes disponibles dentro del MDX

[mdx.tsx](src/components/mdx.tsx) mapea los elementos Markdown a componentes Once UI: encabezados con ancla (`HeadingLink`), imágenes optimizadas (`SmartImage`), links (internos con `SmartLink`, externos con `target="_blank"` + `noopener`), código inline y bloques con Prism, tablas GFM y `ShareIcons`.

---

## Blog: paginación y filtros

- **Paginación** ([BlogPagination.tsx](src/components/blog/BlogPagination.tsx)): `POSTS_PER_PAGE = 13`, con layout fijo por página: 1 post destacado + 2 con miniatura + 10 en grilla de 2 columnas. Las páginas se pre-generan con `generateStaticParams`.
- **Filtros** ([BlogFilters.tsx](src/components/blog/BlogFilters.tsx)), panel colapsable con:
  - búsqueda por título (insensible a mayúsculas y tildes),
  - categoría,
  - mes/año de publicación.
  
  Los filtros se sincronizan con la URL (`?q=…&tag=…&fecha=YYYY-MM`) para poder compartir vistas filtradas; al llegar con parámetros, el panel se abre solo. Mientras hay un filtro activo se reemplaza la vista paginada por la lista filtrada.
- **Fechas**: `formatDate()` las formatea en `es-AR` ("1 de octubre de 2026"), con opción de fecha relativa ("hace 2 m").

---

## SEO, feeds y metadatos

- **Metadatos** por página con `Meta.generate()` (title, description, canonical, Open Graph, Twitter).
- **JSON-LD** con `<Schema as="webPage" | "blog" | "blogPosting" | "profilePage" | …>`.
- **Imágenes OG dinámicas**: `/og?title=…` genera una imagen 1920×1080 con el título, avatar, nombre y rol.
- **`sitemap.xml`**: rutas activas con prioridad y frecuencia propias, posts, casos, páginas de paginación y páginas de tags.
- **`robots.txt`**: permite todo y apunta al sitemap.
- **`rss.xml`**: RSS 2.0 del blog, ordenado por fecha, con categoría y autor. Linkeado desde el `<head>` vía `alternates.types`.
- **`llms.txt`**: índice en Markdown del sitio y de todos los posts, pensado para crawlers de LLMs.
- `<html lang="es">`.
- Verificación de Google Search Console opcional por variable de entorno.

---

## Analítica y tracking de conversiones

- **Vercel Analytics** (`<Analytics />` en el layout).
- **Google Analytics 4** (si existe `NEXT_PUBLIC_GA_MEASUREMENT_ID`): un stub inline encola eventos en `dataLayer` y `gtag.js` se carga con `strategy="lazyOnload"` para no competir con el render inicial.
- **Eventos personalizados** con `gaEvent(name, params)`:

| Evento | `source` | Dónde |
| --- | --- | --- |
| `whatsapp_click` | `fab` | Botón flotante de WhatsApp |
| `whatsapp_click` | `servicios_hero`, `servicios_cta_final` | `/servicios` |
| `calendar_click` | `servicios_hero`, `servicios_cta_final` | `/servicios` |
| `calendar_click` | `sobre-mi` | `/sobre-mi` |

`<TrackClick event properties>` envuelve cualquier elemento (incluso Server Components) con `display: contents` para registrar el click sin alterar el layout.

**WhatsApp FAB**: botón flotante que aparece al hacer scroll > 300px, con mensaje precargado; se oculta en `/servicios` (que ya tiene sus propios CTAs).

---

## Diseño y sistema de UI (Once UI)

- `src/once-ui/` es una copia local del sistema de diseño (no un paquete npm), recortada a los componentes que se usan.
- Layout con primitivas `Flex`, `Column`, `Row`, `Grid`; tipografía con `Heading`/`Text` y variantes (`display-strong-m`, `body-default-l`…).
- Tokens SCSS en `src/once-ui/tokens/` y utilidades en `src/once-ui/styles/`.
- **Tema claro/oscuro/sistema**: un script inline en `<head>` lee `localStorage.theme` y setea `data-theme` antes del primer paint (evita flash). Toggle en el header.
- Breakpoints compartidos con PostCSS mediante `@csstools/postcss-global-data` + `postcss-custom-media`.
- Animaciones de entrada con `RevealFx` (desactivadas en elementos candidatos a LCP).

---

## Performance

Optimizaciones aplicadas (ver commits `perf(...)`):

- `experimental.inlineCss: true` — CSS inline en el HTML para eliminar hojas de estilo que bloquean el render.
- Fuente principal con `display: 'optional'`.
- Headline del hero visible desde el primer paint (`revealedByDefault`).
- Imágenes debajo del pliegue con lazy-load; payload RSC recortado (el listado del blog pasa solo `title`, `publishedAt`, `image`, `tag` al componente cliente).
- `RouteGuard` calcula la visibilidad de forma síncrona → las páginas públicas se renderizan en el servidor sin spinner.
- GA cargado en idle.
- Imágenes en `.webp` y `next/image` con dominios remotos permitidos (devicon, simpleicons, jsdelivr, etc.).

---

## Seguridad

Headers globales en [next.config.mjs](next.config.mjs):

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-DNS-Prefetch-Control: on
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Links externos del MDX con `rel="noopener noreferrer"`. `.env*.local` ignorado por git.

---

## Deploy

Pensado para **Vercel**:

1. Importar el repo en Vercel (framework: Next.js, build `next build`).
2. Configurar `NEXT_PUBLIC_BASE_URL` (y opcionalmente GA / Search Console / `PAGE_ACCESS_PASSWORD`).
3. Cada push a la rama principal despliega a producción.

`output: 'export'` está comentado en `next.config.mjs`: el sitio **no** es export estático porque usa la ruta `/og` en runtime Node.

---

## Convenciones

- **Commits**: Conventional Commits en inglés — `feat(blog): …`, `perf(home): …`, `fix(blog): …`, `chore(content): …`; posts nuevos como `Add post: <slug>`.
- **Idioma**: UI y contenido en español rioplatense; código, comentarios y nombres en inglés.
- **Imágenes**: `.webp`, en carpetas por slug.
- **Textos del sitio**: en `content.js`, no hardcodeados en componentes.
- `social-media/` (calendario de publicaciones y prompts para generar imágenes) está en `.gitignore`: es material de trabajo local.

---

## Problemas conocidos / deuda técnica

| # | Problema | Detalle | Sugerencia |
| --- | --- | --- | --- |
| 1 | Sin linter | Se quitaron ESLint (config `.eslintrc` incompatible con `eslint-config-next` 16) y Biome (no instalado). | Agregar ESLint con flat config (`eslint.config.mjs`) o Biome, y sumarlo a CI. |
| 2 | Tags inconsistentes | `Musica` sin tilde; `Seguridad` y `Ciberseguridad` se solapan. | Normalizar las categorías. |
| 3 | `formatDate` relativo | Compara año/mes/día por separado; p. ej. un post del 30/09 visto el 01/10 da "hace 1 m". | Calcular la diferencia en días con timestamps. |
| 4 | Posts programados | No hay filtro por `publishedAt`: un post con fecha futura se publica igual al hacer push. | Filtrar en `getPosts()` o no commitear hasta la fecha. |

---

## Licencia

**CC BY-NC 4.0** — se puede compartir y adaptar con atribución y **sin fines comerciales**. Ver [LICENSE](LICENSE).

Basado en [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) de Once UI.

---

**Contacto:** [salvacastro06@gmail.com](mailto:salvacastro06@gmail.com) · [LinkedIn](https://www.linkedin.com/in/salvador-castro95) · [GitHub](https://github.com/salvador-castro) · [YouTube](https://youtube.com/@salva.castro)
