/**
 * generate-sitemap.mjs
 *
 * Generates dist/sitemap.xml at build time from the canonical route list.
 * Called last in the "build" script chain (see package.json).
 *
 * Phase 2: includes /en/* alternates with <xhtml:link hreflang> entries.
 */

import fs   from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const distDir    = path.join(__dirname, '..', 'dist')
const BASE_URL   = 'https://www.seomacak.com'
const buildDate  = new Date().toISOString().split('T')[0]  // YYYY-MM-DD

// Route pairs: SR canonical path + EN equivalent + SEO priority / changefreq.
const routePairs = [
  { sr: '/',                en: '/en/',                priority: '1.0', changefreq: 'weekly'  },
  { sr: '/seo/',            en: '/en/seo/',            priority: '0.9', changefreq: 'monthly' },
  { sr: '/izrada-sajtova/', en: '/en/web-development/', priority: '0.9', changefreq: 'monthly' },
  { sr: '/about/',          en: '/en/about/',          priority: '0.7', changefreq: 'monthly' },
  { sr: '/kontakt/',        en: '/en/contact/',        priority: '0.6', changefreq: 'yearly'  },
  { sr: '/blog/',           en: '/en/blog/',           priority: '0.4', changefreq: 'weekly'  },
]

// Build one <url> block per path (SR + EN), each with full hreflang alternates.
function buildUrlEntry(path, pair) {
  const hreflangSr = `${BASE_URL}${pair.sr}`
  const hreflangEn = `${BASE_URL}${pair.en}`
  return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${pair.changefreq}</changefreq>
    <priority>${pair.priority}</priority>
    <xhtml:link rel="alternate" hreflang="sr"        href="${hreflangSr}"/>
    <xhtml:link rel="alternate" hreflang="en"        href="${hreflangEn}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${hreflangSr}"/>
  </url>`
}

const urlEntries = routePairs.flatMap(pair => [
  buildUrlEntry(pair.sr, pair),
  buildUrlEntry(pair.en, pair),
]).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`

if (!fs.existsSync(distDir)) {
  console.error('dist/ not found — run `vite build` and `prerender.mjs` first')
  process.exit(1)
}

const outFile = path.join(distDir, 'sitemap.xml')
fs.writeFileSync(outFile, xml)
console.log('  sitemap written:', outFile.replace(distDir + path.sep, 'dist/'))
