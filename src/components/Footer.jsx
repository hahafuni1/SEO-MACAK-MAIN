import Link from './Link'
import { useLanguage } from '../contexts/LanguageContext'

const ACCENT = '#FDCA40'

function FooterLink({ to, href, label }) {
  const base = { color: '#aaa', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }
  const hover = { color: '#fff' }
  if (to) {
    return (
      <Link
        to={to}
        style={base}
        onMouseEnter={e => Object.assign(e.currentTarget.style, hover)}
        onMouseLeave={e => Object.assign(e.currentTarget.style, base)}
      >
        {label}
      </Link>
    )
  }
  return (
    <a
      href={href}
      style={base}
      onMouseEnter={e => Object.assign(e.currentTarget.style, hover)}
      onMouseLeave={e => Object.assign(e.currentTarget.style, base)}
    >
      {label}
    </a>
  )
}

function FooterLinks({ links }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {links.map((l, i) => (
        <li key={i} style={{ marginBottom: '10px' }}>
          <FooterLink {...l} />
        </li>
      ))}
    </ul>
  )
}

export default function Footer() {
  const { t, links, language } = useLanguage()
  const year = new Date().getFullYear()

  const privacyLabel = language === 'en' ? 'Privacy Policy' : 'Politika privatnosti'
  const termsLabel   = language === 'en' ? 'Terms of Service' : 'Uslovi korišćenja'
  const caseLabel    = language === 'en' ? 'Case Studies' : 'Studije slučaja'
  const companyLabel = language === 'en' ? 'Company' : 'Kompanija'
  const contactLabel = language === 'en' ? 'Contact' : 'Kontakt'
  const linksLabel   = language === 'en' ? 'Links' : 'Linkovi'
  const tagline      = language === 'en'
    ? 'Professional SEO optimization and web development for your business.'
    : 'Stručna SEO optimizacija, web development i dizajn za vaš biznis.'
  const copyright    = language === 'en'
    ? `© ${year} SEO Mačak. All rights reserved.`
    : `© ${year} SEO Mačak. Sva prava zadržana.`

  return (
    <footer style={{ background: '#000', color: '#fff', padding: '60px 24px 30px', borderTop: '1px solid #333' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="site-footer-grid">
          <div className="columns">
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>SEO Mačak</h3>
              <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '0.9rem' }}>
                {tagline}
              </p>
              <div style={{ marginTop: '20px' }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: ACCENT,
                  textTransform: 'uppercase'
                }}>
                  Beograd, Srbija
                </span>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>{linksLabel}</h4>
              <FooterLinks links={[
                { to: links.home,        label: t.nav.home },
                { to: links.webDev,      label: t.nav.webDevelopment },
                { to: links.seo,         label: t.nav.seo },
                { to: links.blog,        label: t.nav.blog },
                { to: links.caseStudies, label: caseLabel },
              ]} />
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>{companyLabel}</h4>
              <FooterLinks links={[
                { to: links.about,   label: t.nav.about },
                { to: links.contact, label: t.nav.contact },
                { to: links.privacy, label: privacyLabel },
                { to: links.terms,   label: termsLabel },
              ]} />
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>{contactLabel}</h4>
              <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.9rem' }}>
                <a href="mailto:kontakt@seomacak.com" style={{ color: '#aaa', textDecoration: 'none' }}>
                  kontakt@seomacak.com
                </a>
              </p>
              <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.9rem' }}>
                <a href="tel:+381621058144" style={{ color: '#aaa', textDecoration: 'none' }}>
                  +381 62 105 8144
                </a>
              </p>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Beograd, Srbija</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #333', paddingTop: '30px', textAlign: 'center', color: '#666' }}>
          <p style={{ margin: 0 }}>{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
