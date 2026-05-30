import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollAwareHeader from './ScrollAwareHeader'

const NotFound = () => {
  const { t } = useLanguage()

  return (
    <>
      <ScrollAwareHeader />
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1>404</h1>
        <h2>{t.notFound.title}</h2>
        <p>{t.notFound.description}</p>
        <Link to="/">{t.notFound.button}</Link>
      </div>
    </>
  )
}

export default NotFound
