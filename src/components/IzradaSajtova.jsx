import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from './Link'
import ScrollAwareHeader from './ScrollAwareHeader'
import SectionTransition from './SectionTransition'
import { useLanguage } from '../contexts/LanguageContext'
import SEOHead from './SEOHead'
import { webDevServiceSchema } from '../lib/schema/service'
import { breadcrumbSchema } from '../lib/schema/breadcrumbs'
import { BASE_URL } from '../lib/routes'

// Premium Minimal — Izrada Sajtova page.
// Same vibe as the homepage: light hero with logo/visual + floating badges,
// then alternating dark sections with thin separators and tabular numbering.

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

export default function IzradaSajtova() {
  const { t, links } = useLanguage()
  const reasons = [
    { title: 'Brzi Sajtovi', desc: 'Optimizovani za brže učitavanje, veća konverzija i bolja SEO rangiranja.' },
    { title: 'Kreativan Dizajn', desc: 'Jedinstven dizajn po meri brenda, bez šablona i bez kompromisa.' },
    { title: 'SEO Optimizacija', desc: 'Ugrađene SEO najbolje prakse od početka, rang na Google-u.' },
    { title: 'Mobilni First', desc: 'Prilagođeno za mobilne korisnike, većina trafika dolazi sa mobitela.' },
    { title: 'Sigurnost', desc: 'SSL certifikat, zaštita podataka i redovne sigurnosne nadogradnje.' },
    { title: 'Podrška & Održavanje', desc: 'Dugoročna podrška, praćenje i redovne nadogradnje.' }
  ]

  const services = [
    {
      title: 'Custom Razvoj',
      tagline: 'Bez šablona, bez kompromisa',
      desc: 'Zaboravite na ograničene šablone. Kreiramo unikatna digitalna rešenja od nule, koristeći React za vrhunske performanse i bezbednost. Svaki red koda pišemo sa fokusom na brzinu i skalabilnost.',
      bullets: ['React + moderni stack', 'Skalabilna arhitektura', 'Premium performanse']
    },
    {
      title: 'E-Commerce Profit',
      tagline: 'Optimizacija za prodaju',
      desc: 'Digitalna prodavnica mora da uliva poverenje i olakšava kupovinu. Naša rešenja optimizujemo za maksimalan ROI, kreirajući intuitivne putanje koje povećavaju konverziju.',
      bullets: ['Stripe / Plaćanja', 'Upravljanje zalihama', 'Konverzijska analitika']
    },
    {
      title: 'Google Dominacija',
      tagline: 'SEO od prve linije koda',
      desc: 'Biti na internetu nije isto što i biti vidljiv. Naša strategija vas postavlja ispred konkurencije kroz tehničku optimizaciju i kvalitetne backlink-ove.',
      bullets: ['Tehnički SEO', 'Core Web Vitals', 'Sadržajna strategija']
    }
  ]

  const featuredProject = {
    title: 'SEO Optimizacija',
    tagline: 'Ubedljivo najviše ovo radim',
    desc: 'Najveći deo mojih projekata vrti se oko ovoga: kompletan SEO audit, on-page optimizacija, tehnički SEO, link building i sadržajna strategija. Cilj je jasan: vaš sajt mora da dominira na Google-u, ne samo da postoji.',
    result: 'Top 5 ranga',
    tech: ['Tehnički SEO', 'Link Building', 'Content', 'Schema', 'Core Web Vitals']
  }

  const otherProjects = [
    {
      title: 'E-Commerce Platforme',
      desc: 'Kreiramo unikatna e-commerce rešenja prilagođena vašem brendu, spajajući vrhunski dizajn sa besprekornim korisničkim iskustvom.',
      result: '−40% napuštenih korpi',
      tech: ['React', 'Node.js', 'Stripe']
    },
    {
      title: 'SaaS Aplikacije',
      desc: 'Custom SaaS rešenja sa složenom backend logikom i intuitivnim frontend interfejsom.',
      result: 'Real-time obrada',
      tech: ['React', 'PostgreSQL', 'AWS']
    },
    {
      title: 'Dizajn & Rebranding',
      desc: 'Kompletan rebranding uključujući novi logo, boju, tipografiju i jedinstveni web dizajn.',
      result: '+200% angažmana',
      tech: ['Web Dizajn', 'UX/UI', 'Brand']
    }
  ]

  const processSteps = [
    {
      title: 'Strategija i Otkrivanje',
      tagline: 'Vaš biznis zaslužuje plan, ne samo šablon',
      desc: 'Ne krećemo dok ne razumemo vašeg idealnog kupca, konkurenciju, i šta zaista donosi rezultate u vašoj industriji.',
      bullets: ['Analiza konkurencije', 'Arhitektura sajta', 'Definisanje ciljeva']
    },
    {
      title: 'Inženjering i Preciznost',
      tagline: 'Kod koji pretraživači obožavaju',
      desc: 'Dok drugi samo prave sajt, mi optimizujemo svaki red koda za maksimalnu brzinu i SEO ranking.',
      bullets: ['Munjevit odziv', 'Cross-device testiranje', 'Clean kod']
    },
    {
      title: 'Lansiranje i Rast',
      tagline: 'Ne odlazimo nakon "Publish"',
      desc: 'Lansiranje je samo početak. Pratimo rezultate, vršimo fina podešavanja, i kontinuirano gradimo na onome što radi.',
      bullets: ['Analiza ponašanja', 'A/B testiranje', 'Stalna podrška']
    }
  ]

  const packages = [
    {
      name: 'Mačak Basic',
      price: '200€',
      period: 'mesečno',
      features: ['Responsive dizajn', 'SEO optimizacija', '5 stranica', 'Kontakt forma', 'SSL certifikat'],
      highlighted: false
    },
    {
      name: 'Mačak Napredni',
      price: '400€',
      period: 'mesečno',
      features: ['Sve iz Basic paketa', 'E-commerce integracija', 'Unlimited stranica', 'Blog sistem', 'Analytics integracija', 'Newsletter sistem'],
      highlighted: true
    },
    {
      name: 'Mačak Preduzeće',
      price: 'Po dogovoru',
      period: 'mesečna pretplata',
      features: ['Sve iz Naprednog paketa', 'CRM integracija', 'Prilagođeni dizajn', 'API integracije', 'Performance optimizacija', 'Dedicated support'],
      highlighted: false
    }
  ]

  return (
    <>
      <SEOHead>
        <script type="application/ld+json">{JSON.stringify(webDevServiceSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([{ name: 'Izrada Sajtova', url: BASE_URL + '/izrada-sajtova/' }]))}</script>
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
        {/* yellow glow blob behind the mockup */}
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
            <Overline>Izrada Sajtova</Overline>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              margin: '0 0 32px',
              color: '#000'
            }}>
              Sajtovi koji{' '}
              <span style={{
                textDecoration: 'underline',
                textDecorationColor: ACCENT,
                textDecorationThickness: '6px',
                textUnderlineOffset: '8px'
              }}>
                konvertuju
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#555',
              margin: '0 0 48px'
            }}>
              Moderni, brzi i SEO-optimizovani sajtovi koji pretvaraju posetioce u klijente.
              U svetu gde prvi utisak traje samo nekoliko sekundi, gradimo platforme koje
              dominiraju pretragom i rade za vas 24/7.
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
              <span>Potraži besplatnu analizu</span>
              <span aria-hidden style={{ fontSize: '1.3rem' }}>→</span>
            </Link>
          </motion.div>

          {/* ─── browser mockup visual ─── */}
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
            <BrowserMockup />

            <HeroBadge
              text="Kreativan Dizajn"
              sub="Jedinstven svaki put"
              style={{ top: '6%', right: '-6%' }}
              delay={0.5}
              float={{ duration: 4, y: [0, -6, 0] }}
            />
            <HeroBadge
              text="Mobile First"
              sub="Svaki uređaj"
              style={{ bottom: '10%', left: '-4%' }}
              delay={0.7}
              float={{ duration: 5, y: [0, 8, 0] }}
              variant="dark"
            />
            <HeroBadge
              text="SSL ✓"
              sub="Bezbedan"
              style={{ top: '40%', right: '-12%' }}
              delay={0.9}
              float={{ duration: 6, y: [0, -6, 0] }}
              variant="yellow"
            />
          </motion.div>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to={DARK_BG} />

      {/* ───────────────── ZAŠTO IZABRATI NAS — numbered list ──────────────── */}
      <section style={{ background: DARK_BG, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '80px' }}
          >
            <Overline dark>Zašto Mi</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '700px'
            }}>
              Šta nas razlikuje od ostalih?
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 'clamp(28px, 4vw, 48px)',
            rowGap: 'clamp(36px, 5vw, 56px)'
          }}>
            {reasons.map((r, i) => (
              <ReasonItem key={i} index={i + 1} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── ŠTA NUDIMO ───────────────────────── */}
      <section style={{ background: DARK_GRADIENT, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '72px' }}
          >
            <Overline dark>Usluge</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Digitalni Arsenal za Vaš Rast
            </h2>
          </motion.div>

          <div>
            {services.map((s, idx) => (
              <ServiceStripe key={idx} index={idx + 1} {...s} isLast={idx === services.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#0d0d0d" to={LIGHT_BG} />

      {/* ────────────────────── NAŠI PROJEKTI (light) ────────────────────── */}
      <section style={{ background: LIGHT_BG, color: '#000', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px' }}
          >
            <Overline>Naši Projekti</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#000'
            }}>
              Šta smo gradili
            </h2>
          </motion.div>

          {/* tier layout: SEO is the specialty / featured card on top,
              other 3 services branch out beneath it */}
          <FeaturedProjectCard {...featuredProject} contactUrl={links.contact} />

          <BranchSeparator label="I takođe radim" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: 'clamp(20px, 3vw, 32px)'
          }}>
            {otherProjects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to={DARK_BG} />

      {/* ───────────────────────── PROCES ───────────────────────── */}
      <section style={{ background: DARK_BG, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '72px' }}
          >
            <Overline dark>Kako Radimo</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Od ideje do lansiranja
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(28px, 4vw, 48px)'
          }}>
            {processSteps.map((step, i) => (
              <ProcessBlock key={i} index={i + 1} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── PRICING ───────────────────────── */}
      <section style={{ background: DARK_GRADIENT, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px', textAlign: 'center' }}
          >
            <div style={{ display: 'inline-block' }}>
              <Overline dark>Paketi</Overline>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 20px'
            }}>
              Izaberite paket
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#888', maxWidth: '600px', margin: '0 auto' }}>
              Svi paketi uključuju besplatnu konsultaciju i opciju doplate dodatnih funkcionalnosti.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(24px, 3vw, 36px)',
            alignItems: 'stretch'
          }}>
            {packages.map((pkg, i) => (
              <PricingCard key={i} {...pkg} contactUrl={links.contact} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#0d0d0d" to={ACCENT} />

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
            Spremni da gradimo?
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#000',
            opacity: 0.75,
            margin: '0 0 44px',
            lineHeight: 1.6
          }}>
            Besplatna konsultacija, jasna ponuda, bez obaveza. Pošaljite kratak opis projekta
            i javljam se u 24 sata.
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
            <span>Pošalji upit</span>
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

// Browser-window mockup used as the hero visual — pure CSS, no images.
// Slight rotation gives it depth without being cartoonish.
function BrowserMockup() {
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
      {/* title bar */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
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
          seomacak.com
        </span>
      </div>

      {/* fake content */}
      <div style={{
        flex: 1,
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '11px'
      }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: ACCENT }} />
        <div style={{ height: '14px', borderRadius: '4px', background: '#1a1a1a', width: '82%', marginTop: '4px' }} />
        <div style={{ height: '8px', borderRadius: '3px', background: '#ddd', width: '95%' }} />
        <div style={{ height: '8px', borderRadius: '3px', background: '#ddd', width: '70%' }} />
        <div style={{
          marginTop: '8px',
          alignSelf: 'flex-start',
          padding: '7px 16px',
          borderRadius: '999px',
          background: '#000',
          color: ACCENT,
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.5px'
        }}>
          Saznaj više
        </div>
        <div style={{
          marginTop: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '7px'
        }}>
          <div style={{ aspectRatio: '1', borderRadius: '5px', background: '#f0f0f0' }} />
          <div style={{ aspectRatio: '1', borderRadius: '5px', background: '#f0f0f0' }} />
          <div style={{ aspectRatio: '1', borderRadius: '5px', background: '#f0f0f0' }} />
        </div>
      </div>
    </motion.div>
  )
}

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

function ReasonItem({ index, title, desc }) {
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
        fontSize: '1.25rem',
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

function ServiceStripe({ index, title, tagline, desc, bullets, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.08 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 'clamp(20px, 4vw, 56px)',
        padding: 'clamp(32px, 5vh, 56px) 0',
        borderTop: '1px solid #2a2a2a',
        borderBottom: isLast ? '1px solid #2a2a2a' : 'none',
        alignItems: 'baseline'
      }}
    >
      <span style={{
        fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
        fontWeight: 800,
        color: '#666',
        fontVariantNumeric: 'tabular-nums'
      }}>
        {String(index).padStart(2, '0')}
      </span>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: 'clamp(24px, 4vw, 60px)'
      }}>
        <div>
          <h3 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            margin: '0 0 8px',
            color: '#fff',
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h3>
          <p style={{
            color: ACCENT,
            fontSize: '0.95rem',
            fontWeight: 700,
            margin: 0
          }}>
            {tagline}
          </p>
        </div>
        <div>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#aaa',
            margin: '0 0 20px'
          }}>
            {desc}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{
                fontSize: '0.9rem',
                color: '#bbb',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ color: ACCENT, fontWeight: 900 }}>—</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedProjectCard({ title, tagline, desc, result, tech, contactUrl }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      style={{
        padding: 'clamp(36px, 5vw, 64px)',
        background: '#fff',
        border: `2px solid ${ACCENT}`,
        borderRadius: '4px',
        position: 'relative',
        // soft yellow glow behind the card to lift it visually
        boxShadow: '0 30px 60px rgba(253, 202, 64, 0.15), 0 10px 20px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* specialty badge */}
      <div style={{
        position: 'absolute',
        top: '-14px',
        left: 'clamp(24px, 4vw, 48px)',
        background: '#000',
        color: ACCENT,
        padding: '6px 16px',
        borderRadius: '999px',
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
      }}>
        ★ Specialty
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: 'clamp(28px, 4vw, 56px)',
        alignItems: 'start'
      }}>
        {/* left: title + tagline + desc */}
        <div>
          <h3 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 900,
            margin: '0 0 12px',
            color: '#000',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            {title}
          </h3>
          <p style={{
            color: '#000',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            fontWeight: 700,
            margin: '0 0 20px',
            display: 'inline-block',
            paddingBottom: '4px',
            borderBottom: `3px solid ${ACCENT}`
          }}>
            {tagline}
          </p>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.75,
            color: '#555',
            margin: 0
          }}>
            {desc}
          </p>
        </div>

        {/* right: result stat + tech tags */}
        <div>
          <div style={{
            padding: '24px',
            background: ACCENT,
            borderRadius: '4px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: 'clamp(1.6rem, 3vw, 2rem)',
              fontWeight: 900,
              color: '#000',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>
              {result}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#000',
              opacity: 0.7,
              marginTop: '6px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 700
            }}>
              Prosečan rezultat
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '0.7rem',
              color: '#999',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              Šta uključuje
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {tech.map((t, i) => (
                <span key={i} style={{
                  fontSize: '0.78rem',
                  padding: '5px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '999px',
                  color: '#333',
                  fontWeight: 600
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Link to={contactUrl} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 32px',
            background: '#000',
            color: ACCENT,
            borderRadius: '50px',
            border: '3px solid #000',
            textDecoration: 'none',
            fontSize: '0.95rem',
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
            }}>
            <span>Pričajmo o SEO-u</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

// Visual separator between the featured card and the smaller cards.
// Thin vertical line drops down from the featured card, branches into a small
// horizontal line, with a label in the center — implies tier hierarchy.
function BranchSeparator({ label }) {
  return (
    <div
      aria-hidden
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        margin: 'clamp(48px, 7vh, 72px) 0 clamp(32px, 5vh, 56px)'
      }}
    >
      {/* vertical drop */}
      <span style={{ width: '2px', height: '40px', background: ACCENT }} />
      {/* center label pill */}
      <span style={{
        background: '#000',
        color: ACCENT,
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        padding: '8px 18px',
        borderRadius: '999px',
        marginTop: '-1px',
        marginBottom: '-1px'
      }}>
        {label}
      </span>
      {/* horizontal split — fades out to suggest 3 branches */}
      <span style={{
        width: 'min(420px, 80%)',
        height: '2px',
        background: `linear-gradient(to right, transparent, ${ACCENT} 30%, ${ACCENT} 70%, transparent)`
      }} />
    </div>
  )
}

function ProjectCard({ title, desc, result, tech }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px',
        background: hovered ? '#fff' : 'transparent',
        border: `1px solid ${hovered ? '#000' : '#ddd'}`,
        borderRadius: '4px',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          margin: 0,
          color: '#000',
          letterSpacing: '-0.01em'
        }}>
          {title}
        </h3>
        <span style={{
          fontSize: '0.78rem',
          color: '#000',
          background: ACCENT,
          padding: '4px 10px',
          borderRadius: '999px',
          fontWeight: 700,
          whiteSpace: 'nowrap'
        }}>
          {result}
        </span>
      </div>
      <p style={{
        fontSize: '0.95rem',
        lineHeight: 1.65,
        color: '#555',
        margin: '0 0 20px',
        flex: 1
      }}>
        {desc}
      </p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        paddingTop: '16px',
        borderTop: '1px solid #eee'
      }}>
        {tech.map((t, i) => (
          <span key={i} style={{
            fontSize: '0.72rem',
            color: '#777',
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            {t}{i < tech.length - 1 ? ' ·' : ''}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

function ProcessBlock({ index, title, tagline, desc, bullets }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.08 }}
      style={{
        borderTop: `2px solid ${ACCENT}`,
        paddingTop: '28px'
      }}
    >
      <div style={{
        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
        fontWeight: 800,
        color: ACCENT,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        marginBottom: '20px',
        fontVariantNumeric: 'tabular-nums'
      }}>
        {String(index).padStart(2, '0')}
      </div>
      <h3 style={{
        fontSize: '1.35rem',
        fontWeight: 800,
        margin: '0 0 10px',
        color: '#fff',
        letterSpacing: '-0.01em',
        lineHeight: 1.2
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.9rem',
        color: ACCENT,
        fontWeight: 700,
        margin: '0 0 16px',
        fontStyle: 'italic'
      }}>
        {tagline}
      </p>
      <p style={{
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: '#888',
        margin: '0 0 18px'
      }}>
        {desc}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{
            fontSize: '0.85rem',
            color: '#bbb',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ color: ACCENT, fontWeight: 900 }}>→</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function PricingCard({ name, price, period, features, highlighted, contactUrl }) {
  // Non-numeric prices ("Po dogovoru", "Custom") need smaller type — the
  // 3.4rem clamp was chosen for short "999€"-style values and overflows on
  // longer phrases.
  const isNumericPrice = /\d/.test(price)
  const priceFontSize = isNumericPrice
    ? 'clamp(2.6rem, 5vw, 3.4rem)'
    : 'clamp(1.7rem, 3.5vw, 2.2rem)'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      style={{
        padding: 'clamp(28px, 4vw, 40px)',
        background: highlighted ? ACCENT : '#0f0f0f',
        color: highlighted ? '#000' : '#fff',
        border: `2px solid ${highlighted ? '#000' : '#2a2a2a'}`,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {highlighted && (
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#000',
          color: ACCENT,
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '0.7rem',
          fontWeight: 800,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          ★ Najpopularniji
        </div>
      )}

      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 800,
        margin: '0 0 20px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: highlighted ? '#000' : ACCENT
      }}>
        {name}
      </h3>

      <div style={{
        marginBottom: '28px',
        paddingBottom: '28px',
        borderBottom: `1px solid ${highlighted ? 'rgba(0,0,0,0.2)' : '#2a2a2a'}`
      }}>
        <div style={{
          fontSize: priceFontSize,
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1
        }}>
          {price}
        </div>
        <div style={{
          fontSize: '0.85rem',
          color: highlighted ? '#000' : '#888',
          opacity: highlighted ? 0.7 : 1,
          marginTop: '6px'
        }}>
          {period}
        </div>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '12px',
            fontSize: '0.92rem',
            color: highlighted ? '#000' : '#bbb',
            lineHeight: 1.5
          }}>
            <span style={{
              color: highlighted ? '#000' : ACCENT,
              fontWeight: 900,
              flexShrink: 0,
              marginTop: '2px'
            }}>
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={contactUrl}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px 28px',
          background: highlighted ? '#000' : ACCENT,
          color: highlighted ? ACCENT : '#000',
          borderRadius: '50px',
          border: '3px solid #000',
          textDecoration: 'none',
          fontSize: '0.95rem',
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
        <span>Odaberi paket</span>
        <span aria-hidden>→</span>
      </Link>
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
