import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollAwareHeader from './ScrollAwareHeader'
import Link from './Link'
import SEOHead from './SEOHead'

const NotFound = () => {
  const { t, links } = useLanguage()

  return (
    <>
      <SEOHead
        title="404 — Stranica nije pronađena | SEO Mačak"
        description="Ova stranica ne postoji. Posetite početnu stranicu SEO Mačak za SEO i web development usluge u Beogradu."
        robots="noindex, follow"
      />
      <ScrollAwareHeader />
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1>404</h1>
        <h2>{t.notFound.title}</h2>
        <p>{t.notFound.description}</p>
        <Link to={links.home}>{t.notFound.button}</Link>
      </div>
    </>
  )
}

export default NotFound
