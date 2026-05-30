import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { motion } from 'framer-motion'

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'rgba(253, 202, 64, 0.1)',
        border: '2px solid rgba(253, 202, 64, 0.3)',
        borderRadius: '20px',
        color: '#FDCA40',
        fontSize: '0.9rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: 'Poppins, Inter, sans-serif',
        letterSpacing: '0.5px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(253, 202, 64, 0.2)'
        e.currentTarget.style.borderColor = '#FDCA40'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(253, 202, 64, 0.1)'
        e.currentTarget.style.borderColor = 'rgba(253, 202, 64, 0.3)'
      }}
    >
      <span style={{ 
        opacity: language === 'sr' ? 1 : 0.5,
        fontWeight: language === 'sr' ? '800' : '500',
        transition: 'all 0.2s ease'
      }}>
        SR
      </span>
      <span style={{ color: 'rgba(253, 202, 64, 0.5)' }}>|</span>
      <span style={{ 
        opacity: language === 'en' ? 1 : 0.5,
        fontWeight: language === 'en' ? '800' : '500',
        transition: 'all 0.2s ease'
      }}>
        EN
      </span>
    </motion.button>
  )
}
