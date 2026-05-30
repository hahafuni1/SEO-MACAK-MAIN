// Converts public/og-default.svg → public/og-default.png (1200×630).
// Run manually when the OG design changes: node scripts/generate-og.mjs

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const svgPath = resolve(root, 'public', 'og-default.svg')
const pngPath = resolve(root, 'public', 'og-default.png')

const svgBuffer = readFileSync(svgPath)

await sharp(svgBuffer)
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(pngPath)

console.log('✓ og-default.png generated (1200×630)')
