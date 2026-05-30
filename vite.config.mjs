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
  build: {
    rollupOptions: {
      output: {
        // Split vendor code into separate cacheable chunks.
        // React.lazy is not used because renderToString() (our SSR path) is
        // synchronous and would render lazy components as empty Suspense
        // fallbacks, breaking prerendered HTML. manualChunks achieves the
        // same cache-efficiency goal without touching the SSR path.
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'vendor-framer'
          if (id.includes('node_modules/react-dom'))    return 'vendor-react-dom'
          if (id.includes('node_modules/react-router')) return 'vendor-router'
          if (id.includes('node_modules/react'))        return 'vendor-react'
          if (id.includes('node_modules/react-helmet-async')) return 'vendor-helmet'
        },
      },
    },
  },
})
