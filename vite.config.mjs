import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { webcrypto } from 'node:crypto'

if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.getRandomValues !== 'function') {
  globalThis.crypto = webcrypto
}

export default defineConfig({
  plugins: [react()],
  ssr: {
    // Bundle these into the SSR output rather than leaving as externals.
    // framer-motion and react-helmet-async have ESM-only distributions that
    // Node.js cannot always resolve correctly when externalized.
    noExternal: ['framer-motion', 'react-helmet-async'],
  },
})
