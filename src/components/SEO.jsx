import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from './Link'
import ScrollAwareHeader from './ScrollAwareHeader'
import SectionTransition from './SectionTransition'
import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../contexts/LanguageContext'

// Premium Minimal — SEO page (showcase finale).
// Intentionally the richest page: keeps three showcase elements from the
// original (draggable sticker wall, 37-bar growth chart, auto-advancing FAQ
// with right-side answer card) and rebuilds everything else in the same
// Light / Dark / Accent palette used by the other redesigned pages.

const LIGHT_BG = '#FBFAF8'
const ACCENT = '#FDCA40'
const DARK_BG = '#000000'
const DARK_GRADIENT = 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)'
const SECTION_PAD_Y = 'clamp(80px, 14vh, 140px)'
const SECTION_PAD_X = 'clamp(24px, 5vw, 64px)'
const CONTAINER_MAX = '1100px'

// Inline keyframes — needed for sticker pop-in animation. Everything else
// uses framer-motion transitions inline.
const KEYFRAMES = `
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.5); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes faqProgressBarFill {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }
  .faq-progress-bar { animation: faqProgressBarFill 8s linear forwards !important; }
`

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

const FAQ_ITEMS = [
  {
    q: 'Koliko traje dok ne vidim rezultate?',
    a: 'SEO je maraton, ne sprint. Prve rezultate najčešće vidite za 8–12 nedelja, a značajne pomeraje u 4–6 meseci. Industrija, konkurencija i startna pozicija sajta najviše utiču na tempo.'
  },
  {
    q: 'Koliko koštaju vaše SEO usluge?',
    a: 'Cene zavise od obima posla. Lokalni SEO počinje od oko 200€ mesečno, dok je strateška optimizacija za jače konkurencije veća. Sve cene su transparentne, bez skrivenih troškova i bez dugoročnih ugovora.'
  },
  {
    q: 'Možete li garantovati #1 poziciju na Google-u?',
    a: 'Ne, i niko ozbiljan to ne radi. Mogu da garantujem pravilan pristup, jasne metrike i konkretne pomeraje, ali rangiranje zavisi i od Google-a i od konkurencije. Fokus je na rezultatima, ne na praznim obećanjima.'
  },
  {
    q: 'Šta se desi ako prekinem saradnju?',
    a: 'Pozicije ne padaju preko noći, ali bez kontinuirane optimizacije vremenom slabe. SEO je proces, ne jednokratan posao. Sve što radim ostaje vama: sajt, znanje, izveštaji, da možete da nastavite sami ili sa nekim drugim.'
  },
  {
    q: 'Radite li sa novim sajtovima ili samo sa starijim?',
    a: 'Sa oba. Stariji sajtovi često brže napreduju jer već imaju neki autoritet i istoriju. Nove projekte gradim sa SEO logikom od prvog reda koda, to dugoročno štedi i vreme i novac.'
  },
  {
    q: 'Kako pratim napredak?',
    a: 'Mesečni izveštaj sa svim važnim metrikama: pozicije, organski saobraćaj, konverzije. Po dogovoru pristup live dashboard-u i redovni check-in pozivi, bez agencijskog teatra i fancy slajdova bez smisla.'
  }
]

// Sticker texts for the "Zašto SEO sada?" draggable wall.
// Each is a punchy one-liner — argument for starting SEO today.
const STICKER_TEXTS = [
  'Konkurencija to već radi',
  'Google ne čeka',
  'Trafik koji ne plaćaš',
  'PPC staje kad budžet stane',
  'Top 3 = 75% klikova',
  '90% nikad ne ide na drugu stranu',
  'AI menja pravila igre',
  'Rezultat traje godinama',
  'Brand koji se sam gradi',
  'Lokalno = lokalni klijenti',
  '24/7 prodavac',
  'Bez stalnog oglasnog budžeta'
]

export default function SEO() {
  const { t } = useLanguage()
  // SR translations don't have a top-level `seo` block. Fall back to Serbian defaults.
  const seoMeta = t?.seo?.meta || {
    title: 'SEO Optimizacija | SEO Mačak',
    description: 'Profesionalna SEO optimizacija za stabilan organski rast — tehnički SEO, on-page, content i link building. Više klijenata bez konstantnog plaćanja oglasa.'
  }
  // ── FAQ state ──────────────────────────────────────────────────────────
  const [expandedFaq, setExpandedFaq] = useState(0)
  const [isFaqAutomatic, setIsFaqAutomatic] = useState(true)
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState(null)

  // ── Sticker wall state ────────────────────────────────────────────────
  const [refreshKey, setRefreshKey] = useState(0)
  const [visibleStickers, setVisibleStickers] = useState([])
  const [draggingIdx, setDraggingIdx] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [stickerPositions, setStickerPositions] = useState({})
  const [stickerZIndex, setStickerZIndex] = useState({})

  const allStickers = STICKER_TEXTS.map((text, idx) => {
    const colors = ['#fff', '#A8FF5C', '#FF6B6B', '#87CEEB']
    return { text, color: colors[idx % colors.length] }
  })

  const generateRandomPositions = (count) => {
    const positions = [
      { top: '2%', left: '12%' },
      { top: '8%', left: '72%' },
      { top: '32%', left: '8%' },
      { top: '18%', left: '48%' },
      { top: '48%', left: '68%' },
      { top: '55%', left: '22%' },
      { top: '28%', left: '62%' },
      { top: '62%', left: '5%' },
      { top: '12%', left: '35%' }
    ]
    return positions.slice(0, count)
  }

  const refreshStickers = () => {
    const randomCount = 9
    const shuffled = [...allStickers].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, randomCount)
    const positions = generateRandomPositions(randomCount)

    const stickerData = selected.map((sticker, idx) => ({
      ...sticker,
      rotate: (Math.random() * 6 - 3) + 'deg',
      radius: Math.random() > 0.5 ? '50px' : '15px',
      delay: (idx * 0.1) + 's',
      top: positions[idx].top,
      left: positions[idx].left,
      width: Math.random() > 0.5 ? '300px' : '260px',
      fontSize: '1.1rem',
      padding: '32px 40px',
      borderWidth: Math.random() > 0.8 ? '4px' : '3px'
    }))

    setVisibleStickers(stickerData)
    setRefreshKey(prev => prev + 1)
    setStickerPositions({})
    setStickerZIndex({})
  }

  const handleStickerMouseDown = (idx, e) => {
    if (e.button !== 0) return

    const stickerElement = document.querySelector(`[data-sticker-idx="${idx}"]`)
    if (!stickerElement) return

    setDraggingIdx(idx)
    const rect = stickerElement.getBoundingClientRect()

    // Convert percentage-based initial position to pixels on first drag,
    // so subsequent moves work in a consistent coordinate system.
    const pos = stickerPositions[idx]
    if (!pos) {
      const sticker = visibleStickers[idx]
      const container = document.querySelector('[data-sticker-container]')
      const containerRect = container?.getBoundingClientRect()

      if (container && containerRect) {
        const topValue = sticker.top.includes('%')
          ? (containerRect.height * parseFloat(sticker.top)) / 100
          : parseFloat(sticker.top)
        const leftValue = sticker.left.includes('%')
          ? (containerRect.width * parseFloat(sticker.left)) / 100
          : parseFloat(sticker.left)

        setStickerPositions(prev => ({ ...prev, [idx]: { x: leftValue, y: topValue } }))
      }
    }

    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setStickerZIndex(prev => ({ ...prev, [idx]: 9999 + Object.keys(prev).length }))
  }

  useEffect(() => {
    if (draggingIdx === null) return

    const handleMouseMove = (e) => {
      const stickerElement = document.querySelector(`[data-sticker-idx="${draggingIdx}"]`)
      const container = document.querySelector('[data-sticker-container]')
      if (!stickerElement || !container) return

      const stickerRect = stickerElement.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const stickerWidth = stickerRect.width
      const stickerHeight = stickerRect.height

      let x = e.clientX - dragOffset.x - containerRect.left
      let y = e.clientY - dragOffset.y - containerRect.top
      x = isNaN(x) ? 0 : x
      y = isNaN(y) ? 0 : y

      // Bounds: allow stickers to leave container partially but not vanish
      // off the page entirely.
      const minX = -stickerWidth + 60
      const minY = -stickerHeight + 60
      const maxX = containerRect.width - 60
      const maxY = containerRect.height - 60
      x = Math.max(minX, Math.min(x, maxX))
      y = Math.max(minY, Math.min(y, maxY))

      setStickerPositions(prev => ({ ...prev, [draggingIdx]: { x, y } }))
    }

    const handleMouseUp = () => setDraggingIdx(null)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [draggingIdx, dragOffset])

  useEffect(() => { refreshStickers() }, [])

  // Auto-advance FAQ every 8s until user clicks one
  useEffect(() => {
    if (!isFaqAutomatic) return
    const interval = setInterval(() => {
      setExpandedFaq((prev) => (prev + 1) % FAQ_ITEMS.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isFaqAutomatic])

  const handleFaqClick = (index) => {
    setExpandedFaq(index)
    setIsFaqAutomatic(false)
    setHoveredFaqIndex(null)
  }

  // ── Data ───────────────────────────────────────────────────────────────
  const stats = [
    { value: '75%', label: 'Klikova ide na prva 3 organska rezultata' },
    { value: '90%+', label: 'Korisnika preskače sponzorisane oglase' },
    { value: '2×', label: 'Veća konverzija u odnosu na hladne kanale' },
    { value: '24/7', label: 'Sajt radi za vas, bez dnevnog budžeta' }
  ]

  const services = [
    {
      title: 'Tehnički SEO audit',
      tagline: 'Pre nego što počneš da rasteš',
      desc: 'Detaljno skeniranje sajta: od brzine i crawl problema do Schema markup-a i mobile-friendly provere. Sve što Google vidi, vidim i ja.',
      bullets: ['Sitemap & robots analiza', 'Core Web Vitals', 'Crawl & index problemi', 'Schema & structured data']
    },
    {
      title: 'Keyword strategija',
      tagline: 'Reči koje stvarno donose klijente',
      desc: 'Nije svaka ključna reč isplativa. Pronalazim one koje imaju i search intent i komercijalnu vrednost, bez bacanja budžeta na prazne kljucne reci.',
      bullets: ['Konkurentska analiza', 'Search intent mapping', 'Long-tail prilike', 'Lokalne ključne reči']
    },
    {
      title: 'On-page optimizacija',
      tagline: 'Svaka stranica = jedna prilika',
      desc: 'Naslovi, meta opisi, struktura, internal linking, slike, schema. Sve što Google koristi da razume o čemu je stranica, radim ručno, sa fokusom.',
      bullets: ['Meta & heading struktura', 'Sadržajna optimizacija', 'Internal linking', 'Image SEO']
    },
    {
      title: 'Sadržajna strategija',
      tagline: 'Tekst koji rangira i konvertuje',
      desc: 'Content kalendar baziran na stvarnoj nameri pretrage. Pillar stranice, topic clustering i kvalitetni vodiči, ne AI spam za popunu.',
      bullets: ['Content kalendar', 'Pillar stranice', 'Topic clustering', 'Vodiči & case studije']
    },
    {
      title: 'Link building',
      tagline: 'Autoritet, ne broj linkova',
      desc: 'Kvalitetni backlinkovi sa relevantnih sajtova, bez kupovine, bez PBN-ova, bez taktika koje vode u Google penal. Sporije, ali sigurno.',
      bullets: ['Prospect istraživanje', 'Outreach kampanja', 'Gosting & digital PR', 'Broken link strategija']
    },
    {
      title: 'Lokalni SEO',
      tagline: 'Vladaj u svojoj regiji',
      desc: 'Google Business Profile, lokalni citation-i, recenzije, lokalni sadržaj, optimizacija za "near me" upite. Mali biznis može da dominira u svom gradu.',
      bullets: ['Google Business Profile', 'Lokalni citation-i', 'Upravljanje recenzijama', 'Optimizacija za mapu']
    }
  ]

  const whyMatters = [
    {
      title: 'Dominacija u organskoj pretrazi',
      subtitle: 'SEO vs PPC',
      stat: '90%+',
      desc: 'Preko 90% korisnika preskače sponzorisane rezultate i veruje organskim. Optimizacijom ne dobijate samo klikove, gradite kredibilitet kod idealnih kupaca.'
    },
    {
      title: 'Maksimalan ROI i održiv rast',
      subtitle: 'Dugoročna rentabilnost',
      stat: '24/7',
      desc: 'Google oglasi staju onog trenutka kad prestane budžet. SEO radi konstantno, kvalitetan sadržaj i tehnička optimizacija dovode klijente bez troška po kliku.'
    },
    {
      title: 'Konverzije bazirane na nameri',
      subtitle: 'Targetiran saobraćaj',
      stat: '2×',
      desc: 'SEO hvata korisnike u trenutku kada aktivno traže rešenje. Fokus na search intent znači da konverzije znaju da budu i dvostruko veće od hladnih kanala.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>{seoMeta.title}</title>
        <meta name="description" content={seoMeta.description} />
        <link rel="canonical" href="https://www.seomacak.com/seo/" />
        <meta property="og:title" content={seoMeta.title} />
        <meta property="og:description" content={seoMeta.description} />
        <meta property="og:image" content="https://www.seomacak.com/mackic-logo.png" />
        <meta property="og:url" content="https://www.seomacak.com/seo/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.seomacak.com/mackic-logo.png" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": ${JSON.stringify(FAQ_ITEMS.map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.a
                }
              })))}
            }
          `}
        </script>
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
                "name": "SEO Optimizacija",
                "item": "https://www.seomacak.com/seo/"
              }]
            }
          `}
        </script>
      </Helmet>
      <style>{KEYFRAMES}</style>
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
        <div aria-hidden style={{
          position: 'absolute',
          right: '-15%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(420px, 55vw, 800px)',
          height: 'clamp(420px, 55vw, 800px)',
          background: 'radial-gradient(circle, rgba(253, 202, 64, 0.35) 0%, rgba(253, 202, 64, 0.08) 45%, transparent 70%)',
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Overline>SEO Optimizacija</Overline>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              margin: '0 0 32px',
              color: '#000'
            }}>
              Pretvorite <GoogleText /> pretrage u{' '}
              <span style={{
                textDecoration: 'underline',
                textDecorationColor: ACCENT,
                textDecorationThickness: '6px',
                textUnderlineOffset: '8px'
              }}>
                stalne klijente
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#555',
              margin: '0 0 48px'
            }}>
              Kvalitet ispred kvantiteta. SEO strategija koja vaš sajt stavlja
              ispred konkurencije, bez praznih obećanja, bez crnih taktika
              i bez bacanja budžeta prazne metrike.
            </p>

            <Link
              to="/kontakt/"
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
              <span>Besplatna SEO analiza</span>
              <span aria-hidden style={{ fontSize: '1.3rem' }}>→</span>
            </Link>
          </motion.div>

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
            <SerpMockup />
          </motion.div>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to={DARK_BG} />

      {/* ─────────────────────────── STATS BAND ─────────────────────────── */}
      <section style={{
        background: DARK_BG,
        color: '#fff',
        padding: `clamp(60px, 10vh, 100px) ${SECTION_PAD_X}`,
        borderBottom: '1px solid #1a1a1a'
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: 'clamp(28px, 4vw, 48px)'
          }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  borderTop: `2px solid ${ACCENT}`,
                  paddingTop: '24px'
                }}
              >
                <div style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3rem)',
                  fontWeight: 900,
                  color: ACCENT,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '12px',
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {s.value}
                </div>
                <p style={{
                  fontSize: '0.92rem',
                  color: '#aaa',
                  lineHeight: 1.5,
                  margin: 0
                }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── SEO USLUGE ───────────────────────── */}
      <section style={{ background: DARK_GRADIENT, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '72px' }}
          >
            <Overline dark>Šta radim</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Kompletna SEO usluga
            </h2>
          </motion.div>

          <div>
            {services.map((s, idx) => (
              <ServiceStripe key={idx} index={idx + 1} {...s} isLast={idx === services.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#0d0d0d" to={ACCENT} />

      {/* ─────────────── STICKER WALL — Zašto SEO sada? ─────────────── */}
      <section style={{
        background: ACCENT,
        color: '#000',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`,
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{ display: 'inline-block' }}>
              <Overline>Zašto sada</Overline>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 16px',
              color: '#000'
            }}>
              12 razloga, izvuci 9
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: '#000',
              opacity: 0.7,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Hvataj i pomeraj kartice. Klikni dugme dole da povučeš novih 9 argumenata.
            </p>
          </motion.div>

          <div
            data-sticker-container
            style={{
              position: 'relative',
              minHeight: '600px',
              maxWidth: '1000px',
              margin: '0 auto',
              border: '6px dashed #000',
              borderRadius: '20px',
              padding: '40px',
              boxSizing: 'border-box',
              userSelect: 'none'
            }}
          >
            {visibleStickers.map((sticker, idx) => {
              const pos = stickerPositions[idx]
              const isBeingDragged = draggingIdx === idx
              return (
                <div
                  key={`${refreshKey}-${idx}`}
                  data-sticker-idx={idx}
                  style={{
                    position: 'absolute',
                    top: pos ? `${pos.y}px` : sticker.top,
                    left: pos ? `${pos.x}px` : sticker.left,
                    background: sticker.color,
                    color: '#000',
                    border: `${sticker.borderWidth} solid #000`,
                    borderRadius: sticker.radius,
                    padding: sticker.padding,
                    width: sticker.width,
                    textAlign: 'center',
                    fontSize: sticker.fontSize,
                    fontWeight: 900,
                    lineHeight: 1.35,
                    boxShadow: isBeingDragged ? '8px 8px 0px #000' : '6px 6px 0px #000',
                    transform: `rotate(${sticker.rotate}) ${isBeingDragged ? 'scale(1.05)' : ''}`,
                    transition: isBeingDragged ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    cursor: isBeingDragged ? 'grabbing' : 'grab',
                    animation: `popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${sticker.delay} forwards`,
                    opacity: 0,
                    zIndex: stickerZIndex[idx] || 100
                  }}
                  onMouseDown={(e) => handleStickerMouseDown(idx, e)}
                  onMouseEnter={(e) => {
                    if (draggingIdx === null) {
                      e.currentTarget.style.transform = 'rotate(0deg) scale(1.08)'
                      e.currentTarget.style.boxShadow = '3px 3px 0px #000'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (draggingIdx === null) {
                      e.currentTarget.style.transform = `rotate(${sticker.rotate})`
                      e.currentTarget.style.boxShadow = '6px 6px 0px #000'
                    }
                  }}
                >
                  {sticker.text}
                </div>
              )
            })}
          </div>

          <button
            onClick={refreshStickers}
            style={{
              marginTop: '48px',
              padding: '18px 40px',
              background: '#000',
              color: ACCENT,
              border: '3px solid #000',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 900,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              boxShadow: '5px 5px 0px 0px #1a1a1a',
              transition: 'all 0.1s ease',
              fontFamily: 'inherit'
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
            ↻  Novi argumenti
          </button>
        </div>
      </section>

      <SectionTransition from={ACCENT} to={DARK_BG} />

      {/* ─────────────── ZAŠTO JE SEO NAJISPLATIVIJI ─────────────── */}
      <section style={{ background: DARK_BG, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px' }}
          >
            <Overline dark>Zašto SEO</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 20px',
              maxWidth: '760px'
            }}>
              Najisplativija investicija za dugoročan rast
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: '#aaa',
              maxWidth: '700px',
              lineHeight: 1.65,
              margin: 0
            }}>
              PPC donosi trenutnu vidljivost. SEO gradi digitalnu imovinu
              koja raste s vremenom. Cilj je smanjiti zavisnost od skupih
              klikova i izgraditi autoritet koji Google nagrađuje.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(36px, 5vh, 56px)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {whyMatters.map((item, idx) => (
              <WhyMattersItem key={idx} index={idx + 1} isLast={idx === whyMatters.length - 1} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── GROWTH CHART — Samo postaje bolje ─────────────── */}
      <section style={{ background: DARK_GRADIENT, color: '#fff', padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}` }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '56px', textAlign: 'center' }}
          >
            <div style={{ display: 'inline-block' }}>
              <Overline dark>Rezultati</Overline>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: '0 0 20px'
            }}>
              Samo postaje bolje
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: '#aaa',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Kako izgleda tipičan rast organskog saobraćaja tokom 12+ meseci optimizacije.
            </p>
          </motion.div>

          <GrowthChart />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: 'clamp(28px, 4vw, 40px)',
            marginTop: 'clamp(48px, 8vh, 72px)',
            textAlign: 'center'
          }}>
            {[
              { value: '320%', label: 'Prosečan rast organskog saobraćaja' },
              { value: '6–12', label: 'Meseci do vrha Google-a' },
              { value: '24/7', label: 'Sajt radi za vas non-stop' }
            ].map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              >
                <p style={{
                  color: ACCENT,
                  fontSize: 'clamp(2.2rem, 4vw, 2.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  margin: '0 0 10px',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {s.value}
                </p>
                <p style={{ color: '#aaa', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#0d0d0d" to={DARK_BG} />

      {/* ─────────────── FAQ (dark, interactive right-side card) ─────────────── */}
      <section style={{
        background: DARK_BG,
        color: '#fff',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`,
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px' }}
          >
            <Overline dark>FAQ</Overline>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Najčešća pitanja
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
            gap: 'clamp(40px, 6vw, 60px)',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <motion.button
                    onClick={() => handleFaqClick(idx)}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '18px 24px',
                      textAlign: 'left',
                      border: `2px solid ${expandedFaq === idx ? '#000' : '#fff'}`,
                      borderRadius: '50px',
                      backgroundColor: expandedFaq === idx ? ACCENT : (hoveredFaqIndex === idx ? 'rgba(253, 202, 64, 0.12)' : 'transparent'),
                      color: expandedFaq === idx ? '#000' : ACCENT,
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: expandedFaq === idx ? 800 : 600,
                      transition: 'all 0.15s ease',
                      width: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: expandedFaq === idx ? '5px 5px 0px 0px #000' : '5px 5px 0px 0px #fff',
                      transform: hoveredFaqIndex === idx && expandedFaq !== idx ? 'translate(3px, 3px)' : 'translate(0, 0)',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={() => { if (expandedFaq !== idx) setHoveredFaqIndex(idx) }}
                    onMouseLeave={() => setHoveredFaqIndex(null)}
                  >
                    {item.q}
                    {expandedFaq === idx && isFaqAutomatic && (
                      <div
                        key={`progress-${expandedFaq}`}
                        className="faq-progress-bar"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '3px',
                          background: '#000',
                          borderRadius: '0 0 50px 0',
                          zIndex: 40,
                          transform: 'scaleX(0)',
                          transformOrigin: 'left'
                        }}
                      />
                    )}
                  </motion.button>
                </div>
              ))}
            </div>

            <div style={{
              position: 'relative',
              minHeight: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AnimatePresence mode="wait">
                {expandedFaq !== null && (
                  <motion.div
                    key={expandedFaq}
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: -1 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                      position: 'relative',
                      width: '95%',
                      maxWidth: '520px',
                      padding: '45px 40px',
                      background: ACCENT,
                      border: '4px solid #000',
                      borderRadius: '24px',
                      boxShadow: '8px 8px 0px 0px #000'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '30px',
                      background: '#fff',
                      border: '3px solid #000',
                      borderRadius: '50px',
                      padding: '8px 16px',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: '#000',
                      boxShadow: '3px 3px 0px 0px #000'
                    }}>
                      #{expandedFaq + 1}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.25 }}
                    >
                      <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        margin: '0 0 20px',
                        color: '#000',
                        lineHeight: 1.3
                      }}>
                        {FAQ_ITEMS[expandedFaq].q}
                      </h3>
                      <div style={{
                        width: '60px',
                        height: '4px',
                        background: '#000',
                        borderRadius: '2px',
                        marginBottom: '20px'
                      }} />
                      <p style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.7,
                        color: '#1a1a1a',
                        margin: 0,
                        fontWeight: 500
                      }}>
                        {FAQ_ITEMS[expandedFaq].a}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <SectionTransition from={DARK_BG} to={ACCENT} />

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
            Spreman za rast?
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#000',
            opacity: 0.75,
            margin: '0 0 44px',
            lineHeight: 1.6
          }}>
            Verovatno hvatate samo deo saobraćaja koji vam Google može doneti.
            Hajde da to promenimo: besplatna analiza, bez rizika, bez dugoročnih ugovora.
          </p>
          <Link
            to="/kontakt/"
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
            <span>Zatraži besplatnu analizu</span>
            <span aria-hidden>→</span>
          </Link>
          <p style={{ marginTop: '24px', fontSize: '0.9rem', color: '#000', opacity: 0.6 }}>
            Bez obaveze · Bez kreditne kartice · Odgovor u 24h
          </p>
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

function GoogleText() {
  const letters = [
    { ch: 'G', color: '#4285F4' },
    { ch: 'o', color: '#EA4335' },
    { ch: 'o', color: '#FBBC05' },
    { ch: 'g', color: '#4285F4' },
    { ch: 'l', color: '#34A853' },
    { ch: 'e', color: '#EA4335' }
  ]
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      {letters.map((l, i) => (
        <span key={i} style={{ color: l.color }}>{l.ch}</span>
      ))}
    </span>
  )
}

function SerpMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: '100%',
        maxWidth: '480px',
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e5e5e5',
        boxShadow: '0 30px 60px rgba(0,0,0,0.14), 0 12px 24px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        transform: 'rotate(-1deg)',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#fafafa'
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
          <GoogleText />
        </div>
        <div style={{
          flex: 1,
          height: '32px',
          borderRadius: '999px',
          border: '1px solid #ddd',
          background: '#fff',
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: '#888',
          fontFamily: 'monospace'
        }}>
          najbolji seo srbija
        </div>
      </div>

      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          padding: '14px',
          borderRadius: '8px',
          background: 'rgba(253, 202, 64, 0.18)',
          border: `2px solid ${ACCENT}`,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '12px',
            background: '#000',
            color: ACCENT,
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '0.6rem',
            fontWeight: 800,
            letterSpacing: '1px'
          }}>
            #1
          </div>
          <div style={{ fontSize: '0.65rem', color: '#1a73e8', marginBottom: '4px', fontFamily: 'monospace' }}>
            seomacak.com
          </div>
          <div style={{ height: '12px', borderRadius: '3px', background: '#1a73e8', width: '85%', opacity: 0.85, marginBottom: '8px' }} />
          <div style={{ height: '6px', borderRadius: '2px', background: '#aaa', width: '95%', marginBottom: '4px' }} />
          <div style={{ height: '6px', borderRadius: '2px', background: '#aaa', width: '70%' }} />
        </div>

        {[1, 2].map((i) => (
          <div key={i} style={{ padding: '6px 4px', opacity: 0.5 }}>
            <div style={{ height: '8px', borderRadius: '3px', background: '#888', width: '70%', marginBottom: '6px' }} />
            <div style={{ height: '5px', borderRadius: '2px', background: '#ccc', width: '95%', marginBottom: '3px' }} />
            <div style={{ height: '5px', borderRadius: '2px', background: '#ccc', width: '60%' }} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ServiceStripe({ index, title, tagline, desc, bullets, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.05 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 'clamp(20px, 4vw, 56px)',
        padding: 'clamp(28px, 4vh, 48px) 0',
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
        gap: 'clamp(20px, 4vw, 56px)'
      }}>
        <div>
          <h3 style={{
            fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
            fontWeight: 800,
            margin: '0 0 8px',
            color: '#fff',
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h3>
          <p style={{ color: ACCENT, fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
            {tagline}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#aaa', margin: '0 0 18px' }}>
            {desc}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {bullets.map((b, i) => (
              <li key={i} style={{
                fontSize: '0.88rem',
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

function WhyMattersItem({ index, title, subtitle, stat, desc, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.08 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 'clamp(24px, 4vw, 48px)',
        alignItems: 'start',
        paddingBottom: isLast ? 0 : 'clamp(28px, 4vh, 40px)',
        borderBottom: isLast ? 'none' : '1px solid #1a1a1a'
      }}
    >
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        background: 'rgba(253, 202, 64, 0.12)',
        border: `2px solid ${ACCENT}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.7rem)',
        fontWeight: 900,
        color: ACCENT,
        flexShrink: 0,
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums'
      }}>
        {stat}
      </div>
      <div>
        <p style={{
          fontSize: '0.8rem',
          color: ACCENT,
          fontWeight: 800,
          margin: '0 0 8px',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          {subtitle}
        </p>
        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          color: '#fff',
          margin: '0 0 14px',
          lineHeight: 1.3,
          letterSpacing: '-0.01em'
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '1rem',
          color: '#aaa',
          lineHeight: 1.7,
          margin: 0
        }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

// 37-bar growth chart — preserved showcase visual. Bars grow exponentially
// with simulated volatility to look like real SEO traffic data.
function GrowthChart() {
  const zones = [
    { start: 0, end: 10, label: '2–3 meseca:', sublabel: 'Aktivacija i start' },
    { start: 10, end: 22, label: '4–6 meseci:', sublabel: 'Ekspanzija' },
    { start: 22, end: 37, label: '6+ meseci:', sublabel: 'Probijanje granica' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: 'relative',
        padding: 'clamp(28px, 4vw, 44px)',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(253, 202, 64, 0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div style={{
        position: 'relative',
        height: '320px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '6px',
        padding: '0 10px'
      }}>
        {zones.map((zone, zoneIdx) => (
          <GrowthZoneTooltip key={zoneIdx} zone={zone} />
        ))}

        {Array.from({ length: 37 }).map((_, idx) => {
          const progress = idx / 36
          const baseLine = 15 + (progress * progress * 70)
          const seed = Math.sin(idx * 12.9898 + 78.233) * 43758.5453
          const volatility = ((seed - Math.floor(seed)) - 0.5) * 25
          const finalBoost = idx > 27 ? (idx - 27) * 2 : 0
          const height = Math.max(10, Math.min(98, baseLine + volatility + finalBoost))

          return (
            <motion.div
              key={idx}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.025,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                flex: 1,
                maxWidth: '16px',
                minWidth: '6px',
                height: `${height}%`,
                background: 'linear-gradient(to top, #C79F00, #FDCA40, #FFE082)',
                borderRadius: '100px 100px 0 0',
                transformOrigin: 'bottom',
                boxShadow: '0 0 15px rgba(253, 202, 64, 0.4)'
              }}
            />
          )
        })}
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '25px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>Početak</span>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>3 meseca</span>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>6 meseci</span>
        <span style={{ fontSize: '0.85rem', color: ACCENT, fontWeight: 700 }}>12+ meseci</span>
      </div>
    </motion.div>
  )
}

function GrowthZoneTooltip({ zone }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        bottom: 0,
        height: '100%',
        left: `${(zone.start / 37) * 100}%`,
        width: `${((zone.end - zone.start) / 37) * 100}%`,
        cursor: 'pointer',
        zIndex: 20
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(253, 202, 64, 0.15), transparent)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        borderRadius: '8px'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: `translateX(-50%) translateY(${isHovered ? '-15px' : '0px'})`,
        opacity: isHovered ? 1 : 0,
        transition: 'all 0.3s ease',
        pointerEvents: 'none',
        zIndex: 30,
        minWidth: '220px'
      }}>
        <div style={{
          padding: '14px 18px',
          borderRadius: '12px',
          background: ACCENT,
          boxShadow: '0 10px 40px rgba(253, 202, 64, 0.3)',
          textAlign: 'center'
        }}>
          <p style={{ fontWeight: 800, color: '#000', fontSize: '0.85rem', margin: '0 0 4px' }}>
            {zone.label}
          </p>
          <p style={{ color: 'rgba(0,0,0,0.7)', fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>
            {zone.sublabel}
          </p>
        </div>
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `10px solid ${ACCENT}`
        }} />
      </div>
    </div>
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
              onMouseLeave={(e) => e.target.style.color = '#aaa'}
            >
              {l.label}
            </Link>
          ) : (
            <a href={l.href} style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}
            >
              {l.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
