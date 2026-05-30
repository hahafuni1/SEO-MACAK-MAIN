import { motion } from 'framer-motion'
import Link from './Link'
import ScrollAwareHeader from './ScrollAwareHeader'
import SectionTransition from './SectionTransition'
import { useLanguage } from '../contexts/LanguageContext'
import SEOHead from './SEOHead'
import { breadcrumbSchema } from '../lib/schema/breadcrumbs'
import { BASE_URL } from '../lib/routes'

// Premium Minimal — Blog "under construction" page.
// Real blog grid lives in git history; bringing it back when posts are ready.

const LIGHT_BG = '#FBFAF8'
const ACCENT = '#FDCA40'
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

export default function Blog() {
  const { t, links } = useLanguage()
  // Sneak peek of what categories the real blog will cover — builds anticipation
  // and tells visitors "this is intentional, not abandoned."
  const upcomingTopics = [
    {
      label: 'SEO',
      title: 'Stvarni SEO casovi',
      desc: 'Šta sam naučio iz preko 500 audita, bez recikliranih tutorijala.'
    },
    {
      label: 'Tehnički',
      title: 'Brzina & Core Web Vitals',
      desc: 'Konkretne tehnike za optimizaciju koje vide rezultate u GSC-u.'
    },
    {
      label: 'Sadržaj',
      title: 'Pisanje koje rangira',
      desc: 'Kako napraviti tekst koji i Google voli i čitaoci pročitaju do kraja.'
    }
  ]

  return (
    <>
      {/* noindex until 3+ real posts exist — remove robots prop when blog launches */}
      <SEOHead robots="noindex, follow">
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([{ name: 'Blog', url: BASE_URL + '/blog/' }]))}</script>
      </SEOHead>
      <ScrollAwareHeader />

      {/* ─────────────────────────── HERO (light) ─────────────────────────── */}
      <section style={{
        background: LIGHT_BG,
        color: '#000',
        minHeight: '100vh',
        padding: `clamp(140px, 18vh, 200px) ${SECTION_PAD_X} clamp(60px, 10vh, 100px)`,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* subtle diagonal pattern bg */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.06) 49%, rgba(0,0,0,0.06) 51%, transparent 52%),' +
            'linear-gradient(-45deg, transparent 48%, rgba(0,0,0,0.06) 49%, rgba(0,0,0,0.06) 51%, transparent 52%)',
          backgroundSize: '60px 60px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 0
        }} />
        {/* yellow glow blob */}
        <div aria-hidden style={{
          position: 'absolute',
          right: '-10%',
          top: '40%',
          transform: 'translateY(-50%)',
          width: 'clamp(380px, 50vw, 720px)',
          height: 'clamp(380px, 50vw, 720px)',
          background: 'radial-gradient(circle, rgba(253, 202, 64, 0.32) 0%, rgba(253, 202, 64, 0.08) 45%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{
          maxWidth: CONTAINER_MAX,
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center'
        }}>
          {/* ─── text column ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Overline>Blog</Overline>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              background: '#000',
              color: ACCENT,
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              <PulsingDot />
              U izradi
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              margin: '0 0 32px',
              color: '#000'
            }}>
              Pišem{' '}
              <span style={{
                textDecoration: 'underline',
                textDecorationColor: ACCENT,
                textDecorationThickness: '6px',
                textUnderlineOffset: '8px'
              }}>
                prvi članak
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#555',
              margin: '0 0 32px'
            }}>
              Blog je trenutno u radu. Ne želim da bacam nasumične AI-generisane
              tekstove samo da bi nešto stajalo ovde. Radije sačekajte par
              nedelja i čitajte ono što ima smisla.
            </p>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: '#777',
              margin: '0 0 48px',
              fontStyle: 'italic',
              borderLeft: `3px solid ${ACCENT}`,
              paddingLeft: '16px'
            }}>
              U međuvremenu, ako vam treba konkretan savet za vaš sajt,
              javite se direktno.
            </p>

            <Link
              to={links.contact}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 36px',
                background: '#000',
                color: ACCENT,
                borderRadius: '50px',
                border: '3px solid #000',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                boxShadow: '5px 5px 0px 0px #1a1a1a',
                transition: 'all 0.1s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(3px, 3px)'
                e.currentTarget.style.boxShadow = '2px 2px 0px 0px #1a1a1a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)'
                e.currentTarget.style.boxShadow = '5px 5px 0px 0px #1a1a1a'
              }}
            >
              <span>Pošalji upit</span>
              <span aria-hidden style={{ fontSize: '1.3rem' }}>→</span>
            </Link>
          </motion.div>

          {/* ─── article mockup visual (being written) ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'clamp(280px, 45vh, 480px)'
            }}
          >
            <ArticleMockup />
          </motion.div>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to="#000000" />

      {/* ───────────────── ŠTA STIŽE — preview of upcoming topics ───────────────── */}
      <section style={{ background: '#000', color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px' }}
          >
            <Overline dark>Šta stiže</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '720px'
            }}>
              O čemu ćete moći da čitate
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(24px, 3vw, 36px)'
          }}>
            {upcomingTopics.map((topic, i) => (
              <UpcomingTopicCard key={i} index={i + 1} {...topic} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#000000" to={ACCENT} />

      {/* ───────────────────────── FINAL CTA ───────────────────────── */}
      <section style={{
        background: ACCENT,
        color: '#000',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`,
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h2 style={{
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 24px'
          }}>
            Ne čekajte blog
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#000',
            opacity: 0.75,
            margin: '0 0 44px',
            lineHeight: 1.6
          }}>
            Sve što bih napisao na blogu, već radim za klijente. Besplatna
            konsultacija i konkretan savet za vaš slučaj.
          </p>
          <Link
            to={links.contact}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '20px 44px',
              background: '#000',
              color: ACCENT,
              borderRadius: '50px',
              border: '3px solid #000',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 900,
              letterSpacing: '0.5px',
              boxShadow: '5px 5px 0px 0px #1a1a1a',
              transition: 'all 0.1s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(3px, 3px)'
              e.currentTarget.style.boxShadow = '2px 2px 0px 0px #1a1a1a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)'
              e.currentTarget.style.boxShadow = '5px 5px 0px 0px #1a1a1a'
            }}
          >
            <span>Zakaži razgovor</span>
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </section>

      <SectionTransition from={ACCENT} to="#000000" />
    </>
  )
}

// ─────────────────── helpers ───────────────────

// Pulsing yellow dot for the "u izradi" status badge.
function PulsingDot() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: ACCENT,
        display: 'inline-block'
      }}
    />
  )
}

// Article-in-progress mockup — looks like a draft being typed in real time.
// Animated blinking cursor at the end suggests "actively being written."
function ArticleMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: '100%',
        maxWidth: '460px',
        aspectRatio: '4/3',
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e5e5e5',
        boxShadow: '0 30px 60px rgba(0,0,0,0.14), 0 12px 24px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transform: 'rotate(-1.5deg)',
        position: 'relative',
        zIndex: 2
      }}
    >
      {/* title bar — like a doc editor */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#fafafa'
      }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
        <span style={{
          marginLeft: '14px',
          fontSize: '0.7rem',
          color: '#aaa',
          letterSpacing: '0.5px',
          fontFamily: 'monospace'
        }}>
          draft.md
        </span>
        <span style={{
          marginLeft: 'auto',
          fontSize: '0.6rem',
          color: '#999',
          padding: '2px 8px',
          background: '#f0f0f0',
          borderRadius: '999px',
          fontWeight: 700,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          Draft
        </span>
      </div>

      {/* fake article content */}
      <div style={{
        flex: 1,
        padding: '24px 26px',
        display: 'flex',
        flexDirection: 'column',
        gap: '11px'
      }}>
        <div style={{
          fontSize: '0.6rem',
          color: ACCENT,
          letterSpacing: '2px',
          fontWeight: 800,
          textTransform: 'uppercase',
          fontFamily: 'monospace'
        }}>
          SEO · 8 min čitanja
        </div>
        <div style={{ height: '16px', borderRadius: '4px', background: '#1a1a1a', width: '85%', marginTop: '4px' }} />
        <div style={{ height: '10px', borderRadius: '3px', background: '#1a1a1a', width: '55%' }} />

        <div style={{ height: '6px', borderRadius: '2px', background: '#ddd', width: '95%', marginTop: '10px' }} />
        <div style={{ height: '6px', borderRadius: '2px', background: '#ddd', width: '88%' }} />
        <div style={{ height: '6px', borderRadius: '2px', background: '#ddd', width: '92%' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ height: '6px', borderRadius: '2px', background: '#ddd', width: '60%' }} />
          {/* blinking cursor — implies "actively being written" */}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '2px',
              height: '14px',
              background: '#1a1a1a',
              marginLeft: '4px'
            }}
          />
        </div>

        <div style={{
          marginTop: 'auto',
          display: 'flex',
          gap: '6px'
        }}>
          <span style={{
            fontSize: '0.55rem',
            padding: '4px 10px',
            background: '#f5f5f5',
            color: '#666',
            borderRadius: '999px',
            fontWeight: 600,
            letterSpacing: '0.3px'
          }}>
            SEO
          </span>
          <span style={{
            fontSize: '0.55rem',
            padding: '4px 10px',
            background: '#f5f5f5',
            color: '#666',
            borderRadius: '999px',
            fontWeight: 600,
            letterSpacing: '0.3px'
          }}>
            Strategija
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function UpcomingTopicCard({ index, label, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.08 }}
      style={{
        background: '#0f0f0f',
        border: '1px solid #2a2a2a',
        borderRadius: '6px',
        padding: 'clamp(28px, 3.5vw, 36px)',
        position: 'relative'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #2a2a2a'
      }}>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 800,
          color: ACCENT,
          letterSpacing: '2px',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {String(index).padStart(2, '0')}
        </span>
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: '#888',
          letterSpacing: '1.5px',
          textTransform: 'uppercase'
        }}>
          {label}
        </span>
      </div>

      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 800,
        margin: '0 0 14px',
        color: '#fff',
        letterSpacing: '-0.01em',
        lineHeight: 1.3
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '0.93rem',
        lineHeight: 1.65,
        color: '#888',
        margin: 0
      }}>
        {desc}
      </p>

      {/* coming soon ribbon */}
      <div style={{
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: '1px solid #2a2a2a',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.75rem',
        color: '#666',
        fontWeight: 700,
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        <PulsingDot />
        <span>Uskoro</span>
      </div>
    </motion.div>
  )
}
