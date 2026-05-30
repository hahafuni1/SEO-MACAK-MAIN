/**
 * prerender.mjs
 *
 * Reads the Vite-built dist/index.html as a template, calls the SSR render()
 * function for each route, injects the rendered HTML + Helmet head tags, and
 * writes a fully-crawlable static HTML file per route into dist/.
 *
 * Run order (see package.json "build"):
 *   1. vite build           → client bundle → dist/
 *   2. vite build --ssr     → server bundle → dist/server/
 *   3. node scripts/prerender.mjs   ← this file
 *   4. node scripts/generate-sitemap.mjs
 */

import fs   from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir    = path.join(projectRoot, 'dist')

// All routes that should receive a prerendered HTML file.
// '/404' produces dist/404.html (served with HTTP 404 via netlify.toml).
// Serbian routes (default) + English /en/* routes = 12 HTML files + 404.
const routes = [
  // Serbian (canonical)
  '/',
  '/about/',
  '/izrada-sajtova/',
  '/seo/',
  '/blog/',
  '/kontakt/',
  '/case-studies/',
  '/case-studies/komotraks/',
  '/privatnost/',
  '/uslovi/',
  // English
  '/en/',
  '/en/about/',
  '/en/web-development/',
  '/en/seo/',
  '/en/blog/',
  '/en/contact/',
  '/en/case-studies/',
  '/en/case-studies/komotraks/',
  '/en/privacy/',
  '/en/terms/',
  // 404 — served with HTTP 404 status via netlify.toml
  '/404',
]

async function main() {
  const templatePath = path.join(distDir, 'index.html')
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found — run `vite build` first')
    process.exit(1)
  }
  const template = fs.readFileSync(templatePath, 'utf-8')

  // Import the SSR bundle produced by `vite build --ssr`
  const serverEntryPath = path.join(distDir, 'server', 'entry-server.js')
  if (!fs.existsSync(serverEntryPath)) {
    console.error('dist/server/entry-server.js not found — run `vite build --ssr` first')
    process.exit(1)
  }
  // pathToFileURL is required on Windows: dynamic import() needs a file:// URL,
  // not a raw drive-letter path (d:\...).
  const { render } = await import(pathToFileURL(serverEntryPath).href)

  for (const route of routes) {
    try {
      const { html: appHtml, helmet } = render(route)

      // Collect head tags emitted by react-helmet-async
      let headTags = ''
      if (helmet) {
        headTags = [
          helmet.title?.toString()  ?? '',
          helmet.meta?.toString()   ?? '',
          helmet.link?.toString()   ?? '',
          helmet.script?.toString() ?? '',
          helmet.style?.toString()  ?? '',
        ].filter(s => s.trim().length > 0).join('\n    ')
      }

      const finalHtml = template
        .replace('<!--app-head-->', headTags)
        .replace('<!--app-html-->', appHtml)

      // Determine output file path
      let outFile
      if (route === '/') {
        outFile = path.join(distDir, 'index.html')
      } else if (route === '/404') {
        outFile = path.join(distDir, '404.html')
      } else {
        // e.g. '/about/' → dist/about/index.html
        outFile = path.join(distDir, route.replace(/^\//, ''), 'index.html')
      }

      const outDir = path.dirname(outFile)
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

      fs.writeFileSync(outFile, finalHtml)
      console.log('  prerendered:', outFile.replace(distDir + path.sep, 'dist/'))
    } catch (err) {
      console.error(`\nFailed to prerender ${route}:`, err)
      process.exit(1)
    }
  }

  console.log('\nPrerendering complete.\n')
}

main()
