/**
 * cleanup-ssr.mjs
 *
 * Removes dist/server/ after prerendering is complete.
 * The SSR bundle is only needed to generate the static HTML files;
 * it must not be shipped to the CDN as publicly-accessible JavaScript.
 *
 * Run order (see package.json "build"):
 *   ...
 *   4. node scripts/generate-sitemap.mjs
 *   5. node scripts/cleanup-ssr.mjs   ← this file
 */

import fs   from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const serverDir  = path.join(__dirname, '..', 'dist', 'server')

if (fs.existsSync(serverDir)) {
  fs.rmSync(serverDir, { recursive: true, force: true })
  console.log('  cleaned: dist/server/ removed (SSR bundle not needed after prerender)\n')
} else {
  console.log('  cleanup: dist/server/ not found, skipping\n')
}
