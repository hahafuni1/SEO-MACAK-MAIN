import { motion } from 'framer-motion'
import Link from './Link'
import ScrollAwareHeader from './ScrollAwareHeader'
import SEOHead from './SEOHead'
import { useLanguage } from '../contexts/LanguageContext'
import { breadcrumbSchema } from '../lib/schema/breadcrumbs'
import { BASE_URL } from '../lib/routes'

const LIGHT_BG = '#FBFAF8'
const ACCENT = '#FDCA40'
const DARK_GRADIENT = 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)'
const SECTION_PAD_Y = 'clamp(80px, 14vh, 140px)'
const SECTION_PAD_X = 'clamp(24px, 5vw, 64px)'
const CONTAINER_MAX = '1100px'

const Overline = ({ children, dark = false }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '14px',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: dark ? ACCENT : '#000',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '32px',
  }}>
    <span style={{ display: 'inline-block', width: '40px', height: '1px', background: dark ? ACCENT : '#000' }} />
    {children}
  </span>
)

export default function CaseStudies() {
  const { language, links } = useLanguage()
  const isEN = language === 'en'

  const breadcrumbs = isEN
    ? [{ name: 'Case Studies', url: BASE_URL + '/en/case-studies/' }]
    : [{ name: 'Studije slučaja', url: BASE_URL + '/case-studies/' }]

  return (
    <>
      <SEOHead>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(breadcrumbs))}</script>
      </SEOHead>
      <ScrollAwareHeader />

      {/* ─────────────────── HERO (light) ─────────────────── */}
      <section style={{
        background: LIGHT_BG,
        color: '#000',
        minHeight: '60vh',
        padding: `clamp(140px, 18vh, 200px) ${SECTION_PAD_X} clamp(60px, 10vh, 100px)`,
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Overline>{isEN ? 'Work' : 'Radovi'}</Overline>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
            }}>
              {isEN ? 'Case Studies' : 'Studije Slučaja'}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: '#444', maxWidth: '600px', margin: 0 }}>
              {isEN
                ? 'Real results. Real businesses. Documented impact from SEO optimization and web development projects.'
                : 'Stvarni rezultati. Pravi biznisi. Dokumentovani efekti SEO optimizacije i web razvoja.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────── CASE STUDY CARDS (dark) ─────────────────── */}
      <section style={{ background: DARK_GRADIENT, padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={{
              border: '1px solid #222',
              borderRadius: '4px',
              overflow: 'hidden',
              background: '#0a0a0a',
            }}
          >
            {/* image */}
            <div style={{ aspectRatio: '16/7', overflow: 'hidden' }}>
              <img
                src="/komotraks-project.webp"
                alt={isEN
                  ? 'Komotraks — insect screens and folding doors, Belgrade'
                  : 'Komotraks — komarnici i harmonika vrata, Beograd'}
                width="1100"
                height="481"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              />
            </div>

            {/* card body */}
            <div style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {['SEO Optimizacija', 'Web Design', 'React Development', 'Performance'].map(tag => (
                  <span key={tag} style={{ fontSize: '0.75rem', padding: '4px 12px', border: '1px solid #333', borderRadius: '999px', color: '#aaa', letterSpacing: '0.5px' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Komotraks
              </h2>
              <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.7, margin: '0 0 32px', maxWidth: '600px' }}>
                {isEN
                  ? 'Full SEO optimization and website rebuild for a Belgrade insect screen and folding door specialist. From zero online presence to #1 Google rankings.'
                  : 'Kompletna SEO optimizacija i redizajn sajta za beogradskog specijalistu za komarnikte i harmonika vrata. Od nule do #1 pozicije na Google-u.'}
              </p>

              {/* quick stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '24px', marginBottom: '40px', paddingTop: '32px', borderTop: '1px solid #222' }}>
                {[
                  { v: '#1', l: isEN ? 'Google Rank' : 'Google Pozicija' },
                  { v: '+200%', l: isEN ? 'Organic Traffic' : 'Organski Trafik' },
                  { v: '+60%', l: isEN ? 'Conversions' : 'Konverzije' },
                  { v: '+30%', l: isEN ? 'Load Speed' : 'Brzina' },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: ACCENT, letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <Link
                to={links.komotraks}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: ACCENT,
                  textDecoration: 'none',
                  paddingBottom: '4px',
                  borderBottom: `2px solid ${ACCENT}`,
                }}
              >
                <span>{isEN ? 'Read case study' : 'Pročitaj studiju slučaja'}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>

          {/* future case studies placeholder */}
          <p style={{ color: '#444', fontSize: '0.9rem', textAlign: 'center', marginTop: '48px' }}>
            {isEN ? 'More case studies coming soon.' : 'Više studija slučaja uskoro.'}
          </p>
        </div>
      </section>
    </>
  )
}
