import React, { createContext, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { translationsSR, translationsEN } from '../translations'
import { getAlternatePath, getNavLinks } from '../lib/routes'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  // Language is derived purely from the URL prefix — no state, no localStorage.
  // This guarantees SSR and client initial renders are always in sync.
  const language = location.pathname.startsWith('/en') ? 'en' : 'sr'
  const t = language === 'sr' ? translationsSR : translationsEN

  // Pre-built nav links for the current language (avoids repetition in every component).
  const links = getNavLinks(language)

  // Navigate to the equivalent page in the other language.
  const toggleLanguage = () => {
    navigate(getAlternatePath(location.pathname))
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, links }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
