import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'

// react-router-dom v7 removed the old StaticRouter.
// MemoryRouter with initialEntries is the correct SSR-compatible replacement
// when using the legacy BrowserRouter / Routes / Route component API.
//
// LanguageProvider is inside MemoryRouter so its useLocation() call works
// during server render and correctly derives the language from the URL.
export function render(url) {
  const helmetContext = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  )

  return { html, helmet: helmetContext.helmet }
}
