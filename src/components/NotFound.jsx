import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../contexts/LanguageContext'
import ScrollAwareHeader from './ScrollAwareHeader'
import Link from './Link'

const NotFound = () => {
  const { t, links } = useLanguage()

  return (
    <>
      <Helmet>
        <title>404 | SEO Mačak</title>
        {/* noindex: 404 pages must not be indexed */}
        <meta name="robots" content="noindex, follow" />
      </Helmet>
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
