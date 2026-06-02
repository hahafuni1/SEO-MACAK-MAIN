import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'
import { HelmetProvider } from 'react-helmet-async'
import { inject } from '@vercel/analytics'
import '/css/styles.css'

// Vercel Analytics — client-only, fires after React hydrates
inject()

const rootEl = document.getElementById('root')

// LanguageProvider must be inside BrowserRouter so it can call useLocation()
// to derive the current language from the URL.
const app = (
  <HelmetProvider>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </HelmetProvider>
)

// In production the SSG build replaces <!--app-html--> with real HTML elements,
// so rootEl has element-node children → use hydrateRoot.
// In dev mode the placeholder comment is still in the DOM → use createRoot.
const hasPrerenderedHTML = Array.from(rootEl.childNodes).some(n => n.nodeType === 1)

if (hasPrerenderedHTML) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
