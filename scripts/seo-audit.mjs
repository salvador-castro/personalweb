#!/usr/bin/env node
// SEO audit of a running instance of the site.
// Usage: node scripts/seo-audit.mjs [baseUrl]   (default http://localhost:3000)
// Checks every page in the sitemap plus tag and pagination pages:
//   single <h1>, title <= 60, description 120-160, absolute www canonical,
//   absolute og:image that answers 200, BreadcrumbList on posts, services and projects.
// Exits with code 1 when any page fails, so it can run in CI.

const CANONICAL_ORIGIN = 'https://www.salvacastro.com.ar'
const base = (process.argv[2] || 'http://localhost:3000').replace(/\/+$/, '')

const TITLE_MAX = 60
const DESC_MIN = 120
const DESC_MAX = 160
const NEEDS_BREADCRUMB = /^\/(blog\/(?!tag\/|page\/)[^/]+|servicios\/[^/]+|trabajos\/[^/]+)$/

const decodeEntities = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")

const meta = (html, attr, name) => {
  const re = new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`, 'i')
  const alt = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${name}"`, 'i')
  const match = html.match(re) || html.match(alt)
  return match ? decodeEntities(match[1]) : undefined
}

/** Maps a production URL to the instance under test. */
const local = (url) => url.replace(CANONICAL_ORIGIN, base)

async function sitemapPaths () {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
}

async function discoveredPaths () {
  // Tag pages below the index threshold and /blog/page/N are not in the sitemap but are crawlable
  const html = await (await fetch(`${base}/blog`)).text()
  const tags = [...html.matchAll(/href="(\/blog\/tag\/[^"#?]+)"/g)].map((m) => m[1])
  const pages = [...html.matchAll(/href="(\/blog\/page\/\d+)"/g)].map((m) => m[1])
  return [...tags, ...pages]
}

const ogStatusCache = new Map()
async function ogStatus (url) {
  if (!ogStatusCache.has(url)) {
    ogStatusCache.set(
      url,
      fetch(local(url)).then((res) => `${res.status} ${res.headers.get('content-type') || ''}`).catch((e) => `ERR ${e.message}`)
    )
  }
  return ogStatusCache.get(url)
}

async function audit (path) {
  const problems = []
  const res = await fetch(`${base}${path}`, { redirect: 'manual' })
  if (res.status !== 200) return { path, problems: [`status ${res.status}`] }
  const html = await res.text()

  const h1s = html.match(/<h1[\s>]/gi) || []
  if (h1s.length !== 1) problems.push(`${h1s.length} <h1>`)

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i)
  const title = titleMatch ? decodeEntities(titleMatch[1]) : ''
  if (!title) problems.push('no <title>')
  else if (title.length > TITLE_MAX) problems.push(`title ${title.length} > ${TITLE_MAX}: "${title}"`)

  const description = meta(html, 'name', 'description') || ''
  if (description.length < DESC_MIN || description.length > DESC_MAX) {
    problems.push(`description ${description.length} (want ${DESC_MIN}-${DESC_MAX}): "${description}"`)
  }

  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1]
  if (!canonical) problems.push('no canonical')
  else if (!canonical.startsWith(`${CANONICAL_ORIGIN}/`) && canonical !== CANONICAL_ORIGIN) {
    problems.push(`canonical not absolute www: ${canonical}`)
  }

  const ogImage = meta(html, 'property', 'og:image')
  if (!ogImage) problems.push('no og:image')
  else if (!ogImage.startsWith(`${CANONICAL_ORIGIN}/`) || /^https?:\/\/[^/]+\/https?:/i.test(ogImage)) {
    problems.push(`og:image malformed: ${ogImage}`)
  } else {
    const status = await ogStatus(ogImage)
    if (!status.startsWith('200 image/')) problems.push(`og:image ${status}: ${ogImage}`)
  }

  if (NEEDS_BREADCRUMB.test(path) && !html.includes('"BreadcrumbList"')) problems.push('no BreadcrumbList')

  return { path, problems }
}

const paths = [...new Set([...(await sitemapPaths()), ...(await discoveredPaths())])]
const results = []
for (const path of paths) results.push(await audit(path))

const failing = results.filter((r) => r.problems.length > 0)
for (const { path, problems } of failing) {
  console.log(`✗ ${path}`)
  for (const problem of problems) console.log(`    ${problem}`)
}
console.log(`\n${results.length - failing.length}/${results.length} pages pass`)
process.exit(failing.length > 0 ? 1 : 0)
