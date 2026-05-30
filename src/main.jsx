import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'
import '/css/styles.css'
import { HelmetProvider } from 'react-helmet-async'

const root = createRoot(document.getElementById('root'))
root.render(
  <HelmetProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </HelmetProvider>
)
