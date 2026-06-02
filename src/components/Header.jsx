import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Link from './Link'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import logoImg from '/logo.webp'

// Static-logo header — used on pages whose entire viewport starts dark
// (no scroll-based color shift). Includes the same full-screen hamburger
// menu as ScrollAwareHeader so mobile UX is consistent across the site.
export default function Header() {
  const location = useLocation()
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const isIzradaSajtova = location.pathname === '/izrada-sajtova/'
  const isSEO = location.pathname === '/seo/'
  const isBlog = location.pathname === '/blog/'
  const isAbout = location.pathname === '/about/'
  const isKontakt = location.pathname === '/kontakt/'
  const logoColor = (isIzradaSajtova || isSEO || isBlog || isAbout || isKontakt) ? '#ffffff' : '#000000'

  // Body scroll lock + Escape close while menu is open
  useEffect(() => {
    if (!menuOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const navItems = [
    { to: '/', label: t.nav.home },
    { to: '/izrada-sajtova/', label: t.nav.webDevelopment },
    { to: '/seo/', label: t.nav.seo },
    { to: '/blog/', label: t.nav.blog },
    { to: '/about/', label: t.nav.about },
    { to: '/kontakt/', label: t.nav.contact }
  ]

  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            <img src={logoImg} alt="SEO Mačak" width="60" height="60" style={{ display: 'block', objectFit: 'contain' }} />
            <span className="logo-text" style={{ color: logoColor, textDecoration: 'underline', textDecorationColor: logoColor, textDecorationThickness: '2px' }}>
              SEO<br/>
              <span className="logo-sub" style={{ color: logoColor }}>
                Mačak.
              </span>
            </span>
          </Link>

          <nav className="nav-pill nav-desktop">
            <Link to="/">{t.nav.home}</Link>
            <Link to="/izrada-sajtova/">{t.nav.webDevelopment}</Link>
            <Link to="/seo/">{t.nav.seo}</Link>
            <Link to="/blog/">{t.nav.blog}</Link>
            <Link to="/about/">{t.nav.about}</Link>
            <Link to="/kontakt/" className="btn nav-cta">{t.nav.contact}</Link>
            <LanguageSwitcher />
          </nav>

          <button
            type="button"
            className="nav-hamburger"
            aria-label="Otvori meni"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mobile-menu-overlay"
          >
            <div aria-hidden style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(45deg, transparent 48%, rgba(253,202,64,0.07) 49%, rgba(253,202,64,0.07) 51%, transparent 52%),' +
                'linear-gradient(-45deg, transparent 48%, rgba(253,202,64,0.07) 49%, rgba(253,202,64,0.07) 51%, transparent 52%)',
              backgroundSize: '60px 60px',
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
            <div aria-hidden style={{
              position: 'absolute',
              top: '30%',
              right: '-20%',
              width: '80vw',
              height: '80vw',
              background: 'radial-gradient(circle, rgba(253, 202, 64, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />

            <button
              type="button"
              className="mobile-menu-close"
              aria-label="Zatvori meni"
              onClick={() => setMenuOpen(false)}
            >
              <span /><span />
            </button>

            <nav className="mobile-menu-nav">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease: 'easeOut' }}
                >
                  <Link
                    to={item.to}
                    className="mobile-menu-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mobile-menu-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mobile-menu-label">{item.label}</span>
                    <span aria-hidden className="mobile-menu-arrow">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mobile-menu-footer"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <LanguageSwitcher />
                <a
                  href="mailto:markodevedzic30@gmail.com"
                  style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.3px' }}
                >
                  markodevedzic30@gmail.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
