import { motion } from 'framer-motion'
import Link from './Link'
import ScrollAwareHeader from './ScrollAwareHeader'
import SectionTransition from './SectionTransition'
import { useLanguage } from '../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'

// Premium Minimal — About page.
// Same vibe as homepage and izrada-sajtova: light hero with photo + badges,
// alternating dark sections with thin separators and tabular numbering.

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

export default function About() {
  const { t } = useLanguage()
  // SR translations don't have an `about` block yet, and EN's `about` lacks `meta`.
  // Read defensively and fall back to sensible Serbian copy so the page doesn't crash.
  const meta = t?.about?.meta || {
    title: 'O nama — SEO Mačak',
    description: 'Upoznajte SEO Mačka — agenciju koja kombinuje SEO, web development i dizajn da bi vaš biznis bio vidljiv i konkurentan online.'
  }
  const heroSubtitle = t?.about?.hero?.subtitle
    || 'Više od agencije. Manja od korporacije. Tačno pravi partner za vaš digitalni rast.'

  const differentiators = [
    {
      title: 'SEO-first pristup',
      desc: 'Ne pravim sajt pa onda razmišljam o Google-u. Struktura, brzina i sadržaj su isplanirani da rangiraju od prvog dana.'
    },
    {
      title: 'Bez agencijske ćutnje',
      desc: 'Ja radim, ja se javljam. Bez account managera koji prevodi vaše pitanje nekome trećem ko će vam možda odgovoriti za nedelju.'
    },
    {
      title: 'Merljivi rezultati',
      desc: 'Konkretne brojke — pozicije, organski trafik, konverzije. Bez „radimo na tome" i bez maglovitih izveštaja.'
    },
    {
      title: 'Iskren razgovor',
      desc: 'Ako vam SEO nije isplativ — reći ću vam. Ne prodajem usluge koje vam ne trebaju, gradim dugoročnu saradnju.'
    }
  ]

  const stats = [
    { value: '50+', label: 'završenih projekata' },
    { value: '30+', label: 'klijenata na #1 poziciji' },
    { value: '3+', label: 'godine iskustva' },
    { value: '4.7/5', label: 'prosečna ocena' }
  ]

  const specializations = [
    'SEO optimizacija',
    'Tehnički SEO',
    'Lokalni SEO',
    'Keyword research',
    'On-page SEO',
    'Link building',
    'React development',
    'WordPress',
    'Core Web Vitals',
    'Performance',
    'UI/UX dizajn',
    'Google Analytics',
    'Google Search Console',
    'Schema markup'
  ]

  const deliverables = [
    {
      title: 'Detaljna SEO analiza',
      desc: 'Pre nego što išta dirnem, prolazim kroz vaš sajt — tehnički audit, sadržaj, backlinkovi, konkurencija. Dobijate dokument sa konkretnim nalazima.'
    },
    {
      title: 'Jasan plan rada',
      desc: 'Bez magle. Tačno znate šta radim, kojim redom i zašto. Svaki korak je vezan za konkretan cilj koji se može meriti.'
    },
    {
      title: 'Brze i kvalitetne izmene',
      desc: 'Tehnička optimizacija, Core Web Vitals, struktura sadržaja, interno linkovanje — sve što treba da Google razume i voli vaš sajt.'
    },
    {
      title: 'Mesečni izveštaji',
      desc: 'Pozicije, organski trafik, konverzije, šta je urađeno i šta sledi. Bez praznih grafova — samo brojke koje znače novac.'
    },
    {
      title: 'Direktna komunikacija',
      desc: 'Pišete meni, ne ticket sistemu. Odgovaram u toku radnog dana, bez agencijskog filtera između vas i osobe koja radi.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href="https://www.seomacak.com/about/" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://www.seomacak.com/mackic-logo.png" />
        <meta property="og:url" content="https://www.seomacak.com/about/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.seomacak.com/mackic-logo.png" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Početna",
                "item": "https://www.seomacak.com/"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "O Nama",
                "item": "https://www.seomacak.com/about/"
              }]
            }
          `}
        </script>
      </Helmet>
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
        {/* subtle dot pattern bg */}
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
        {/* yellow glow behind the photo */}
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
          {/* text column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Overline>O nama</Overline>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              margin: '0 0 32px',
              color: '#000'
            }}>
              Iza svakog sajta stoji{' '}
              <span style={{
                textDecoration: 'underline',
                textDecorationColor: ACCENT,
                textDecorationThickness: '6px',
                textUnderlineOffset: '8px'
              }}>
                jedan čovek
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#555',
              margin: '0 0 48px'
            }}>
              {heroSubtitle}
            </p>

            <Link
              to="/kontakt/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#000',
                textDecoration: 'none',
                paddingBottom: '6px',
                borderBottom: '2px solid #000',
                transition: 'gap 0.3s ease, color 0.3s ease, border-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = '20px'
                e.currentTarget.style.color = ACCENT
                e.currentTarget.style.borderColor = ACCENT
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = '12px'
                e.currentTarget.style.color = '#000'
                e.currentTarget.style.borderColor = '#000'
              }}
            >
              <span>Pričajmo</span>
              <span aria-hidden style={{ fontSize: '1.3rem' }}>→</span>
            </Link>
          </motion.div>

          {/* founder photo column */}
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
            <div style={{
              position: 'relative',
              maxWidth: '400px',
              width: '100%',
              zIndex: 2
            }}>
              <div style={{
                aspectRatio: '4/5',
                overflow: 'hidden',
                border: '1px solid #000',
                position: 'relative',
                boxShadow: '0 30px 60px rgba(0,0,0,0.14), 0 12px 24px rgba(0,0,0,0.07)'
              }}>
                <img
                  src="/marko-founder.webp"
                  alt="Marko — osnivač SEO Mačka"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
              {/* yellow accent corner */}
              <div aria-hidden style={{
                position: 'absolute',
                bottom: '-14px',
                right: '-14px',
                width: '70px',
                height: '70px',
                borderRight: `2px solid ${ACCENT}`,
                borderBottom: `2px solid ${ACCENT}`,
                pointerEvents: 'none'
              }} />
            </div>

            <HeroBadge
              text="Marko"
              sub="Osnivač"
              style={{ top: '6%', right: '-4%' }}
              delay={0.5}
              float={{ duration: 4, y: [0, -6, 0] }}
            />
            <HeroBadge
              text="Beograd"
              sub="Remote ready"
              style={{ bottom: '10%', left: '-2%' }}
              delay={0.7}
              float={{ duration: 5, y: [0, 8, 0] }}
              variant="dark"
            />
            <HeroBadge
              text="< 24h"
              sub="reply time"
              style={{ top: '46%', left: '-10%' }}
              delay={0.9}
              float={{ duration: 6, y: [0, -6, 0] }}
              variant="yellow"
            />
          </motion.div>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to="#1a1a1a" />

      {/* ───────────────────── O MENI — founder manifesto ───────────────────── */}
      <section style={{ background: DARK_GRADIENT, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '40px' }}
          >
            <Overline dark>O meni</Overline>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Ja sam <span style={{ color: ACCENT }}>Marko</span>, osnivač SEO Mačka.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
              lineHeight: 1.8,
              color: '#cfcfcf',
              margin: '0 0 24px'
            }}>
              Pre nekih 4 godine bio sam običan junior developer, kodirao sam, učio, pravio sajtove kao i svi ostali, bez nekog posebnog iskustva. Onda sam pre godinu dana primetio nešto što me je zakucalo: sve što napravim ostane nevidljivo bez dobrog SEO-a. Možeš da imaš najbolji sajt na svetu, ako te niko ne nađe na Google-u, kao da ne postoji.
            </p>
            <p style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
              lineHeight: 1.8,
              color: '#cfcfcf',
              margin: '0 0 48px'
            }}>
              Tu mi je kliknulo. Zaronio sam u SEO, čitao, testirao, lomio sajtove pa ih popravljao, gledao šta radi a šta su gluposti koje agencije prodaju. Za godinu dana sam naučio više nego što sam očekivao, i shvatio da razlika između sajtova koji zarađuju i onih koji skupljaju prašinu nije magija, to su konkretne stvari koje se mogu naučiti i primeniti.
            </p>

            {/* mission accent block */}
            <div style={{
              padding: '28px 32px',
              borderLeft: `4px solid ${ACCENT}`,
              background: 'rgba(253, 202, 64, 0.05)'
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: ACCENT,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}>
                Misija
              </div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.65,
                color: '#fff',
                margin: '0 0 16px',
                fontWeight: 500
              }}>
                Da pomognem preduzetnicima, developerima i malim agencijama da osvoje taj prvi ozbiljan rast na Google-u, bez tehničkog gubljenja vremena i bez praznih priča koje ti prodaju „velike agencije" za pare koje ne vrede.
              </p>
              <p style={{
                fontSize: '1rem',
                color: ACCENT,
                margin: 0,
                fontWeight: 700,
                fontStyle: 'italic'
              }}>
                Direktno, iskreno, sa stvarima koje rade.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────── ŠTA ME RAZLIKUJE — numbered list ───────────────── */}
      <section style={{ background: DARK_BG, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '80px' }}
          >
            <Overline dark>Drugačiji pristup</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '700px'
            }}>
              Šta me razlikuje od ostalih?
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 'clamp(28px, 4vw, 48px)',
            rowGap: 'clamp(36px, 5vw, 56px)'
          }}>
            {differentiators.map((d, i) => (
              <DifferentiatorItem key={i} index={i + 1} {...d} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from={DARK_BG} to={LIGHT_BG} />

      {/* ───────────────────────── BROJKE (light) ───────────────────────── */}
      <section style={{ background: LIGHT_BG, color: '#000', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px', textAlign: 'center' }}
          >
            <div style={{ display: 'inline-block' }}>
              <Overline>Brojke</Overline>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#000'
            }}>
              Šta sam uradio do sada
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: 'clamp(20px, 3vw, 32px)',
            borderTop: '1px solid #ddd',
            borderBottom: '1px solid #ddd'
          }}>
            {stats.map((s, i) => (
              <StatBlock key={i} {...s} index={i} isLast={i === stats.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to="#1a1a1a" />

      {/* ──────────────────── SPECIJALIZOVAN U ──────────────────── */}
      <section style={{ background: DARK_GRADIENT, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '56px' }}
          >
            <Overline dark>Ekspertize</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Specijalizovan u
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {specializations.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{
                  fontSize: '0.92rem',
                  padding: '10px 20px',
                  border: '1px solid #333',
                  borderRadius: '999px',
                  color: '#ddd',
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                whileHover={{ borderColor: ACCENT, color: ACCENT }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionTransition from="#0d0d0d" to={LIGHT_BG} />

      {/* ───────────────────────── ŠTA DOBIJATE ───────────────────────── */}
      <section style={{ background: LIGHT_BG, color: '#000', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px' }}
          >
            <Overline>Šta dobijate</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#000',
              maxWidth: '700px'
            }}>
              Konkretno, u svakoj saradnji
            </h2>
          </motion.div>

          <div>
            {deliverables.map((d, i) => (
              <DeliverableRow key={i} index={i + 1} {...d} isLast={i === deliverables.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to={ACCENT} />

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
            Spremni za razgovor?
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#000',
            opacity: 0.75,
            margin: '0 0 44px',
            lineHeight: 1.6
          }}>
            Bez pritiska, bez provere, bez obaveza. Samo iskrena analiza gde se nalazite
            i gde možete biti.
          </p>
          <Link
            to="/kontakt/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '18px 36px',
              background: '#000',
              color: ACCENT,
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '1.05rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
              transition: 'gap 0.3s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = '22px'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = '14px'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span>Zakaži razgovor</span>
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </section>

      <SectionTransition from={ACCENT} to="#000000" />

      {/* ─────────────────────────── FOOTER ─────────────────────────── */}
      <footer style={{ background: '#000', color: '#fff', padding: '60px 24px 30px', borderTop: '1px solid #333' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="site-footer-grid">
            <div className="columns">
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>SEO Mačak</h3>
                <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '0.9rem' }}>
                  Stručna SEO optimizacija, web development i dizajn za vaš biznis.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Linkovi</h4>
                <FooterLinks links={[
                  { to: '/', label: 'Početna' },
                  { to: '/izrada-sajtova/', label: 'Izrada sajtova' },
                  { to: '/seo/', label: 'SEO' },
                  { to: '/blog/', label: 'Blog' }
                ]} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Kompanija</h4>
                <FooterLinks links={[
                  { to: '/about/', label: 'O nama' },
                  { to: '/kontakt/', label: 'Kontakt' },
                  { href: '#', label: 'Privatnost' },
                  { href: '#', label: 'Uslovi' }
                ]} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Kontakt</h4>
                <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.9rem' }}>email@example.com</p>
                <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.9rem' }}>+381 (0) 123 456 789</p>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Beograd, Srbija</p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333', paddingTop: '30px', textAlign: 'center', color: '#666' }}>
            <p style={{ margin: 0 }}>© 2026 SEO Mačak. Sva prava zadržana.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// ─────────────────── helpers ───────────────────

function HeroBadge({ text, sub, style, delay = 0, float, variant = 'light' }) {
  const palette = {
    light: { bg: '#fff', border: '#000', text: '#000', sub: '#666' },
    dark: { bg: '#000', border: '#000', text: '#fff', sub: '#aaa' },
    yellow: { bg: ACCENT, border: '#000', text: '#000', sub: '#000' }
  }[variant]

  return (
    <motion.div
      className="hero-badge"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, ...(float ? { y: float.y } : {}) }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay, type: 'spring', stiffness: 200 },
        ...(float ? { y: { duration: float.duration, repeat: Infinity, ease: 'easeInOut', delay } } : {})
      }}
      style={{
        position: 'absolute',
        background: palette.bg,
        color: palette.text,
        border: `2px solid ${palette.border}`,
        borderRadius: '999px',
        padding: '10px 18px',
        boxShadow: '4px 4px 0 0 #1a1a1a',
        fontFamily: 'Poppins, Inter, sans-serif',
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        whiteSpace: 'nowrap',
        zIndex: 3,
        ...style
      }}
    >
      <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>{text}</span>
      {sub && (
        <span style={{ fontSize: '0.7rem', color: palette.sub, fontWeight: 500, letterSpacing: '0.3px' }}>
          {sub}
        </span>
      )}
    </motion.div>
  )
}

function DifferentiatorItem({ index, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.06 }}
      style={{
        borderTop: '1px solid #2a2a2a',
        paddingTop: '24px'
      }}
    >
      <span style={{
        fontSize: '0.85rem',
        fontWeight: 800,
        color: ACCENT,
        letterSpacing: '2px',
        fontVariantNumeric: 'tabular-nums'
      }}>
        {String(index).padStart(2, '0')}
      </span>
      <h3 style={{
        fontSize: '1.3rem',
        fontWeight: 800,
        margin: '12px 0',
        color: '#fff',
        letterSpacing: '-0.01em'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: '#888',
        margin: 0
      }}>
        {desc}
      </p>
    </motion.div>
  )
}

function StatBlock({ value, label, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        padding: 'clamp(32px, 5vh, 56px) clamp(16px, 2vw, 24px)',
        textAlign: 'center',
        borderRight: isLast ? 'none' : '1px solid #ddd'
      }}
    >
      <div style={{
        fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
        fontWeight: 900,
        color: '#000',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: '12px'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.85rem',
        color: '#666',
        letterSpacing: '0.5px',
        fontWeight: 600
      }}>
        {label}
      </div>
    </motion.div>
  )
}

function DeliverableRow({ index, title, desc, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.05 }}
      style={{
        padding: 'clamp(28px, 4vh, 48px) 0',
        borderTop: '1px solid #ddd',
        borderBottom: isLast ? '1px solid #ddd' : 'none',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 'clamp(20px, 4vw, 56px)',
        alignItems: 'baseline'
      }}
    >
      <span style={{
        fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
        fontWeight: 800,
        color: '#bbb',
        fontVariantNumeric: 'tabular-nums'
      }}>
        {String(index).padStart(2, '0')}
      </span>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
        gap: 'clamp(20px, 4vw, 56px)',
        alignItems: 'baseline'
      }}>
        <h3 style={{
          fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)',
          fontWeight: 800,
          margin: 0,
          color: '#000',
          letterSpacing: '-0.02em',
          lineHeight: 1.2
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: 1.7,
          color: '#555',
          margin: 0
        }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

function FooterLinks({ links }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {links.map((l, i) => (
        <li key={i} style={{ marginBottom: '10px' }}>
          {l.to ? (
            <Link to={l.to} style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}>
              {l.label}
            </Link>
          ) : (
            <a href={l.href} style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}>
              {l.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
