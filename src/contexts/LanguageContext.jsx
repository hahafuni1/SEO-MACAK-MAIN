import React, { createContext, useState, useContext, useEffect } from 'react'
import { translationsSR, translationsEN } from '../translations'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  // Inicijalno učitavanje iz localStorage ili default 'sr'
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language')
    return savedLang || 'sr'
  })

  // Čuvanje u localStorage svaki put kada se jezik promeni
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Funkcija za promenu jezika
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'sr' ? 'en' : 'sr')
  }

  // Trenutni translations objekat
  const t = language === 'sr' ? translationsSR : translationsEN

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook za lakše korišćenje
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
