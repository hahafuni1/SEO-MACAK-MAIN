import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from './Link'
import FAQSection from './FAQSection'
import ScrollAwareHeader from './ScrollAwareHeader'
import SectionTransition from './SectionTransition'
import { useLanguage } from '../contexts/LanguageContext'
import logoImg from '/logo.webp'
import SEOHead from './SEOHead'
import { localBusinessSchema } from '../lib/schema/localBusiness'
import { reviewSchema } from '../lib/schema/review'

// Premium Minimal homepage.
// Layout philosophy:
//   - light hero → dark service list → dark portfolio → dark FAQ → yellow CTA → dark footer
//   - heavy whitespace, thin separators, tabular numbered list for services
//   - no decorative blobs, no offset cartoon shadows on this page

const LIGHT_BG = '#FBFAF8'
const ACCENT = '#FDCA40'
const DARK_BG = '#000000'
const DARK_GRADIENT = 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)'
const SECTION_PAD_Y = 'clamp(80px, 14vh, 140px)'
const SECTION_PAD_X = 'clamp(24px, 5vw, 64px)'
const CONTAINER_MAX = '1100px'

// Reusable section overline ("— LABEL") used throughout the page.
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

export default function HomePage() {
  const { t, links } = useLanguage()

  const services = [
    {
      title: t.home.whatWeDo.cards[0].title,
      desc: t.home.whatWeDo.cards[0].desc,
      href: '/seo/'
    },
    {
      title: t.home.whatWeDo.cards[1].title,
      desc: t.home.whatWeDo.cards[1].desc,
      href: '/izrada-sajtova/'
    },
    {
      title: t.home.whatWeDo.cards[2].title,
      desc: t.home.whatWeDo.cards[2].desc,
      href: '/izrada-sajtova/'
    }
  ]

  return (
    <>
      <SEOHead>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(reviewSchema())}</script>
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
        {/* very subtle diagonal dot pattern in the background — barely visible
            but adds texture so the light section doesn't feel like a void */}
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
        {/* large soft yellow glow blob, sits behind the logo column */}
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
            <Overline>Portfolio 2026</Overline>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              margin: '0 0 32px',
              color: '#000'
            }}>
              {t.home.hero.title.split(' ').map((word, i, arr) => (
                <React.Fragment key={i}>
                  {i === Math.floor(arr.length / 2) ? (
                    <span style={{
                      textDecoration: 'underline',
                      textDecorationColor: ACCENT,
                      textDecorationThickness: '6px',
                      textUnderlineOffset: '8px'
                    }}>{word}</span>
                  ) : word}
                  {i < arr.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#555',
              margin: '0 0 48px'
            }}>
              {t.home.hero.subtitle}
            </p>

            <Link
              to={links.contact}
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
              <span>{t.nav.contact}</span>
              <span aria-hidden style={{ fontSize: '1.3rem' }}>→</span>
            </Link>
          </motion.div>

          {/* ─── logo column ─── */}
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
            {/* gentle float for the logo */}
            <motion.img
              src={logoImg}
              alt="SEO Mačak logo"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 'clamp(220px, 32vw, 420px)',
                height: 'auto',
                position: 'relative',
                zIndex: 2,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))'
              }}
            />

            {/* floating accent badges around the logo */}
            <HeroBadge
              text="★ 4.7 / 5"
              sub="50+ projekata"
              style={{ top: '8%', right: '-4%' }}
              delay={0.5}
              float={{ duration: 4, y: [0, -6, 0] }}
            />
            <HeroBadge
              text="Osnovano 2023"
              sub="+3 god"
              style={{ bottom: '6%', left: '-2%' }}
              delay={0.7}
              float={{ duration: 5, y: [0, 8, 0] }}
              variant="dark"
            />
            <HeroBadge
              text="30+"
              sub="projekata"
              style={{ top: '46%', left: '-8%' }}
              delay={0.9}
              float={{ duration: 6, y: [0, -6, 0] }}
              variant="yellow"
            />
          </motion.div>
        </div>

        {/* subtle scroll cue. Positioning wrapper is plain (not motion) so framer
            doesn't override translateX(-50%) with its own transform from y animation. */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1, duration: 0.6 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
            style={{
              fontSize: '0.75rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#999',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Skroluj</span>
            <span style={{ width: '1px', height: '40px', background: '#999' }} />
          </motion.div>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to={DARK_BG} />

      {/* ───────────────────── ŠTA RADIMO — numbered list ───────────────────── */}
      <section style={{
        background: DARK_BG,
        color: '#fff',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '80px' }}
          >
            <Overline dark>Usluge</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '700px'
            }}>
              {t.home.whatWeDo.title}
            </h2>
          </motion.div>

          <div>
            {services.map((s, idx) => (
              <ServiceRow key={idx} index={idx + 1} {...s} isLast={idx === services.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── KAKO RADIMO — minimal stepper ───────────────────── */}
      <section style={{
        background: DARK_GRADIENT,
        color: '#fff',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '72px' }}
          >
            <Overline dark>Proces</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              {t.home.howWeWork.title}
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(28px, 4vw, 56px)'
          }}>
            {t.home.howWeWork.steps.map((step, i) => (
              <ProcessStep key={i} index={i + 1} title={step.title} desc={step.desc} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#0d0d0d" to={LIGHT_BG} />

      {/* ───────────────────── TESTIMONIAL (light) ───────────────────── */}
      <section style={{
        background: LIGHT_BG,
        color: '#000',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* huge decorative quote mark in the background */}
        <span aria-hidden style={{
          position: 'absolute',
          top: 'clamp(-40px, -6vw, -80px)',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(20rem, 40vw, 36rem)',
          lineHeight: 0.8,
          color: ACCENT,
          opacity: 0.18,
          fontFamily: 'Georgia, serif',
          fontWeight: 900,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0
        }}>
          “
        </span>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '48px', display: 'flex', justifyContent: 'center' }}
          >
            <Overline>Recenzija</Overline>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ margin: 0 }}
          >
            <blockquote style={{
              margin: '0 0 56px',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)',
              lineHeight: 1.08,
              fontWeight: 900,
              color: '#000',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase'
            }}>
              <span style={{ color: ACCENT }}>„</span>Momak je došao i uradio posao{' '}
              <span style={{
                textDecoration: 'underline',
                textDecorationColor: ACCENT,
                textDecorationThickness: '6px',
                textUnderlineOffset: '8px'
              }}>
                maksimalno dobro
              </span>
              .<span style={{ color: ACCENT }}>"</span>
            </blockquote>

            <figcaption style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span aria-hidden style={{
                display: 'block',
                width: '60px',
                height: '3px',
                background: '#000',
                marginBottom: '8px'
              }} />
              <span style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                color: '#000',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Željko
              </span>
              <span style={{
                fontSize: '0.95rem',
                color: '#666',
                lineHeight: 1.6,
                maxWidth: '620px',
                fontWeight: 500
              }}>
                Specijalista za sisteme zaštite od insekata i kontrolu svetlosti u stambenim i poslovnim objektima
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to="#1a1a1a" />

      {/* ───────────────────── PORTFOLIO HIGHLIGHT ───────────────────── */}
      <section style={{
        background: DARK_GRADIENT,
        color: '#fff',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px' }}
          >
            <Overline dark>Skorasnji Rad</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Komotraks
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center'
            }}
          >
            {/* image */}
            <div style={{
              aspectRatio: '4/3',
              background: '#0a0a0a',
              border: '1px solid #222',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <img
                src="/komotraks-project.webp"
                alt="Komotraks — ugradnja komarnika, harmonika vrata i zavesa u Beogradu"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* info */}
            <div>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: '#b0b0b0',
                margin: '0 0 36px'
              }}>
                Kompletna optimizacija i modernizacija sajta. Kroz detaljnu SEO analizu, dizajnersko unapređenje i tehničku optimizaciju, dostigli smo povećanje konverzije od 60% i poboljšanje brzine učitavanja za 30%.
              </p>

              {/* result stats — thin rows, no cards */}
              <div style={{ marginBottom: '36px' }}>
                {[
                  { value: '#1', label: 'Pozicija za Top 3 keyworda u niši' },
                  { value: '+60%', label: 'povećanje konverzije' },
                  { value: '+30%', label: 'brže učitavanje' },
                  { value: '+200%', label: 'organski trafik' }
                ].map((stat, i, arr) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    padding: '18px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid #222' : 'none',
                    gap: '20px'
                  }}>
                    <span style={{ color: '#888', fontSize: '0.95rem' }}>{stat.label}</span>
                    <span style={{ color: ACCENT, fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* services used — thin chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                {['SEO Optimizacija', 'Web Design', 'React Development', 'Performance'].map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.78rem',
                    padding: '6px 14px',
                    border: '1px solid #333',
                    borderRadius: '999px',
                    color: '#aaa',
                    letterSpacing: '0.5px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <Link to={links.komotraks} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                color: ACCENT,
                textDecoration: 'none',
                paddingBottom: '6px',
                borderBottom: `2px solid ${ACCENT}`,
                transition: 'gap 0.3s ease'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.gap = '20px' }}
                onMouseLeave={(e) => { e.currentTarget.style.gap = '12px' }}
              >
                <span>Saznaj više o projektu</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────── FOUNDER TEASER ─────────────────────── */}
      <section style={{
        background: DARK_GRADIENT,
        color: '#fff',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center'
            }}
          >
            {/* photo with thin frame + yellow corner accent */}
            <div style={{ position: 'relative', maxWidth: '420px', justifySelf: 'center', width: '100%' }}>
              <div style={{
                aspectRatio: '4/5',
                overflow: 'hidden',
                border: '1px solid #333',
                position: 'relative'
              }}>
                <img
                  src="/marko-founder.webp"
                  alt="Marko — osnivač SEO Mačka"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'grayscale(15%)'
                  }}
                />
              </div>
              {/* yellow accent corner */}
              <div aria-hidden style={{
                position: 'absolute',
                bottom: '-12px',
                right: '-12px',
                width: '60px',
                height: '60px',
                borderRight: `2px solid ${ACCENT}`,
                borderBottom: `2px solid ${ACCENT}`,
                pointerEvents: 'none'
              }} />
            </div>

            {/* intro text — short version of the About page story */}
            <div>
              <Overline dark>Ko stoji iza</Overline>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 28px'
              }}>
                Ja sam <span style={{ color: ACCENT }}>Marko</span>, osnivač SEO Mačka.
              </h2>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: '#b0b0b0',
                margin: '0 0 20px'
              }}>
                Pre nekih 4 godine bio sam običan junior developer, kodirao sam, učio, pravio sajtove kao i svi ostali. Onda sam pre godinu dana primetio nešto što me je zakucalo: sve što napravim ostane nevidljivo bez dobrog SEO-a.
              </p>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: '#b0b0b0',
                margin: '0 0 36px'
              }}>
                Tu mi je kliknulo. Zaronio sam u SEO, čitao, testirao, lomio sajtove pa ih popravljao. Shvatio sam da razlika između sajtova koji zarađuju i onih koji skupljaju prašinu nije magija, to su konkretne stvari koje se mogu naučiti i primeniti.
              </p>

              <Link to={links.about} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                color: ACCENT,
                textDecoration: 'none',
                paddingBottom: '6px',
                borderBottom: `2px solid ${ACCENT}`,
                transition: 'gap 0.3s ease'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.gap = '20px' }}
                onMouseLeave={(e) => { e.currentTarget.style.gap = '12px' }}
              >
                <span>Cela priča</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────────── FAQ ───────────────────────────── */}
      <FAQSection />

      <SectionTransition from="#1a1a1a" to={ACCENT} />

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
            {t.home.expertQuestion.text} {t.home.expertQuestion.highlight} {t.home.expertQuestion.textEnd}
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#000',
            opacity: 0.7,
            margin: '0 0 44px',
            lineHeight: 1.6
          }}>
            Iskrena analiza gde se nalazite i gde možete biti. Bez pritiska, bez obaveza.
          </p>
          <Link
            to={links.contact}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
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
            <span>Započni razgovor</span>
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </section>

      <SectionTransition from={ACCENT} to="#000000" />
    </>
  )
}

// ─────────────────── helpers ───────────────────

function ServiceRow({ index, title, desc, href, isLast }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 'clamp(20px, 4vw, 60px)',
          padding: 'clamp(28px, 5vh, 48px) 0',
          borderTop: '1px solid #222',
          borderBottom: isLast ? '1px solid #222' : 'none',
          color: 'inherit',
          textDecoration: 'none',
          alignItems: 'baseline',
          transition: 'border-color 0.3s ease'
        }}
      >
        <span style={{
          fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
          fontWeight: 800,
          color: hovered ? ACCENT : '#666',
          fontVariantNumeric: 'tabular-nums',
          transition: 'color 0.3s ease'
        }}>
          {String(index).padStart(2, '0')}
        </span>

        <div>
          <h3 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
            color: hovered ? ACCENT : '#fff',
            transition: 'color 0.3s ease'
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#888',
            margin: 0,
            maxWidth: '640px'
          }}>
            {desc}
          </p>
        </div>

        <span aria-hidden style={{
          fontSize: '1.6rem',
          color: hovered ? ACCENT : '#444',
          transform: hovered ? 'translateX(8px)' : 'translateX(0)',
          transition: 'transform 0.3s ease, color 0.3s ease'
        }}>
          →
        </span>
      </Link>
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
        boxShadow: `4px 4px 0 0 #1a1a1a`,
        fontFamily: 'Poppins, Inter, sans-serif',
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        whiteSpace: 'nowrap',
        zIndex: 3,
        ...style
      }}
    >
      <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
        {text}
      </span>
      {sub && (
        <span style={{ fontSize: '0.7rem', color: palette.sub, fontWeight: 500, letterSpacing: '0.3px' }}>
          {sub}
        </span>
      )}
    </motion.div>
  )
}

function ProcessStep({ index, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.08 }}
      style={{
        borderTop: `2px solid ${ACCENT}`,
        paddingTop: '24px'
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
        fontSize: '1.15rem',
        fontWeight: 800,
        margin: '0 0 12px',
        color: '#fff',
        letterSpacing: '-0.01em'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '0.95rem',
        lineHeight: 1.65,
        color: '#888',
        margin: 0
      }}>
        {desc}
      </p>
    </motion.div>
  )
}
