import { motion } from 'framer-motion'
import Link from './Link'
import ScrollAwareHeader from './ScrollAwareHeader'
import SEOHead from './SEOHead'
import { useLanguage } from '../contexts/LanguageContext'
import { caseStudySchema } from '../lib/schema/creativeWork'
import { breadcrumbSchema } from '../lib/schema/breadcrumbs'
import { BASE_URL } from '../lib/routes'

const LIGHT_BG = '#FBFAF8'
const ACCENT = '#FDCA40'
const DARK_BG = '#000000'
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
    marginBottom: '32px'
  }}>
    <span style={{ display: 'inline-block', width: '40px', height: '1px', background: dark ? ACCENT : '#000' }} />
    {children}
  </span>
)

const RESULTS = [
  { value: '#1',    label: 'pozicija za Top 3 ključne reči u niši',  labelEN: 'ranking for Top 3 niche keywords' },
  { value: '+60%',  label: 'povećanje konverzije',                   labelEN: 'increase in conversions' },
  { value: '+30%',  label: 'brže učitavanje',                        labelEN: 'faster page load' },
  { value: '+200%', label: 'organski trafik',                        labelEN: 'organic traffic growth' },
]

const TAGS = ['SEO Optimizacija', 'Web Design', 'React Development', 'Performance']

export default function CaseStudyKomotraks() {
  const { language, links } = useLanguage()
  const isEN = language === 'en'

  const breadcrumbs = isEN
    ? [
        { name: 'Case Studies', url: BASE_URL + '/en/case-studies/' },
        { name: 'Komotraks',    url: BASE_URL + '/en/case-studies/komotraks/' },
      ]
    : [
        { name: 'Studije slučaja',  url: BASE_URL + '/case-studies/' },
        { name: 'Komotraks',        url: BASE_URL + '/case-studies/komotraks/' },
      ]

  const schema = caseStudySchema({
    name: isEN ? 'Komotraks — SEO & Web Development Case Study' : 'Komotraks — Studija Slučaja: SEO i Web Razvoj',
    description: isEN
      ? 'Full SEO and web modernization of a Belgrade insect-screen and folding-door business. Results: #1 ranking, +200% organic traffic, +60% conversions, +30% load speed.'
      : 'Kompletna SEO optimizacija i modernizacija sajta za beogradski biznis za ugradnju komarnika i harmonika vrata. Rezultati: #1 pozicija, +200% organski trafik, +60% konverzija, +30% brzina.',
    url: BASE_URL + (isEN ? '/en/case-studies/komotraks/' : '/case-studies/komotraks/'),
    image: BASE_URL + '/komotraks-project.webp',
    dateCreated: '2024-01-01',
    keywords: ['SEO optimizacija', 'izrada sajta', 'Beograd', 'React', 'Performance', 'lokalni SEO'],
    about: { '@type': 'LocalBusiness', name: 'Komotraks', address: { '@type': 'PostalAddress', addressLocality: 'Beograd', addressCountry: 'RS' } },
  })

  return (
    <>
      <SEOHead>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(breadcrumbs))}</script>
      </SEOHead>
      <ScrollAwareHeader />

      {/* ─────────────────── HERO (light) ─────────────────── */}
      <section style={{
        background: LIGHT_BG,
        color: '#000',
        minHeight: '70vh',
        padding: `clamp(140px, 18vh, 200px) ${SECTION_PAD_X} clamp(60px, 10vh, 100px)`,
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Overline>{isEN ? 'Case Study' : 'Studija Slučaja'}</Overline>
            <h1 style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
            }}>
              Komotraks
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.7,
              color: '#444',
              maxWidth: '680px',
              margin: '0 0 40px',
            }}>
              {isEN
                ? 'Full SEO optimization and website modernization for a Belgrade-based insect screen and folding door specialist — from technical audit to #1 Google rankings.'
                : 'Kompletna SEO optimizacija i modernizacija sajta za beogradskog specijalistu za ugradnju komarnika i harmonika vrata — od tehničkog audita do #1 pozicije na Google-u.'}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {TAGS.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.8rem',
                  padding: '6px 16px',
                  border: '1.5px solid #000',
                  borderRadius: '999px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────── PROJECT IMAGE ─────────────────── */}
      <section style={{ background: '#0a0a0a', padding: 0, lineHeight: 0 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <img
            src="/komotraks-project.webp"
            alt={isEN
              ? 'Komotraks website — insect screens and folding doors in Belgrade'
              : 'Komotraks sajt — ugradnja komarnika i harmonika vrata u Beogradu'}
            width="1400"
            height="788"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            loading="eager"
          />
        </div>
      </section>

      {/* ─────────────────── RESULTS (dark) ─────────────────── */}
      <section style={{
        background: DARK_GRADIENT,
        color: '#fff',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`,
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <Overline dark>{isEN ? 'Results' : 'Rezultati'}</Overline>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 56px', letterSpacing: '-0.02em' }}>
              {isEN ? 'Measurable, documented impact.' : 'Merljivi, dokumentovani efekti.'}
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: '#222' }}>
            {RESULTS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ background: '#0d0d0d', padding: 'clamp(32px, 5vw, 56px)' }}
              >
                <div style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 900, color: ACCENT, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {r.value}
                </div>
                <div style={{ color: '#888', fontSize: '0.95rem', marginTop: '12px', lineHeight: 1.5 }}>
                  {isEN ? r.labelEN : r.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CHALLENGE + SOLUTION (light) ─────────────────── */}
      <section style={{
        background: LIGHT_BG,
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`,
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: 'clamp(40px, 6vw, 80px)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Overline>{isEN ? 'Challenge' : 'Izazov'}</Overline>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              {isEN ? 'Zero online visibility in a competitive niche.' : 'Nulta vidljivost u konkurentnoj niši.'}
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#444', margin: '0 0 20px' }}>
              {isEN
                ? 'Komotraks had a functional but technically outdated website with no SEO groundwork. Competitors with older domains dominated local search. The client needed real traffic — the kind that converts into installation inquiries.'
                : 'Komotraks je imao funkcionalan ali tehnički zastareo sajt bez ikakve SEO osnove. Konkurenti sa starijim domenima dominirali su lokalnom pretragom. Klijent je trebao stvaran trafik — onaj koji se pretvara u upite za ugradnju.'}
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#444', margin: 0 }}>
              {isEN
                ? 'Key obstacles: slow page load, missing structured data, no local SEO signals, thin content on service pages.'
                : 'Ključne prepreke: sporo učitavanje, nedostajući strukturirani podaci, nema lokalnih SEO signala, tanak sadržaj na servisnim stranicama.'}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <Overline>{isEN ? 'Solution' : 'Rešenje'}</Overline>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, lineHeight: 1.15, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              {isEN ? 'Full rebuild, SEO-first from line one.' : 'Potpuni redizajn, SEO-first od prvog reda.'}
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#444', margin: '0 0 20px' }}>
              {isEN
                ? 'Complete technical audit followed by a ground-up React rebuild optimized for Core Web Vitals. Local SEO signals — Google Business optimization, consistent NAP, geo-targeted content — were built into the architecture from day one.'
                : 'Kompletan tehnički audit praćen potpunim React razvojem optimizovanim za Core Web Vitals. Lokalni SEO signali — optimizacija Google Businessа, konzistentne NAP informacije, geo-targetirani sadržaj — ugrađeni su u arhitekturu od prvog dana.'}
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#444', margin: 0 }}>
              {isEN
                ? 'Structured data (LocalBusiness, Service, BreadcrumbList), strategic internal linking, and high-quality content for each service page completed the on-page layer.'
                : 'Strukturirani podaci (LocalBusiness, Service, BreadcrumbList), strateško interno linkovanje i kvalitetan sadržaj za svaku servisnu stranicu završili su on-page sloj.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────── CLIENT INFO (dark) ─────────────────── */}
      <section style={{ background: DARK_BG, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <Overline dark>{isEN ? 'Client' : 'Klijent'}</Overline>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {[
              { label: isEN ? 'Company' : 'Kompanija', value: 'Komotraks' },
              { label: isEN ? 'Industry' : 'Industrija', value: isEN ? 'Insect Screens & Folding Doors' : 'Komarnici i harmonika vrata' },
              { label: isEN ? 'Location' : 'Lokacija', value: 'Beograd, Srbija' },
              { label: isEN ? 'Project type' : 'Tip projekta', value: isEN ? 'SEO + Web Development' : 'SEO + Izrada Sajta' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '3px', color: ACCENT, textTransform: 'uppercase', marginBottom: '8px' }}>{item.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CTA ─────────────────── */}
      <section style={{ background: ACCENT, padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`, textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: '#000', lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
            {isEN ? 'Want results like these for your business?' : 'Hoćete ovakve rezultate za vaš biznis?'}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#333', margin: '0 0 40px' }}>
            {isEN
              ? 'Every project starts with a free audit. No obligations.'
              : 'Svaki projekat počinje besplatnom analizom. Bez obaveza.'}
          </p>
          <Link
            to={links.contact}
            style={{
              display: 'inline-block',
              background: '#000',
              color: '#fff',
              padding: '18px 48px',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: '2px',
              letterSpacing: '0.5px',
            }}
          >
            {isEN ? 'Get a Free Audit' : 'Zatražite Besplatnu Analizu'}
          </Link>
        </div>
      </section>
    </>
  )
}
