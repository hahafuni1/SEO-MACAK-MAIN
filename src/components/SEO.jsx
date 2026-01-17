import React, { useState, useEffect } from 'react'
import Header from './Header'
import Link from './Link'
import { motion, AnimatePresence } from 'framer-motion'

const keyframes = `
  html, body {
    overflow-x: hidden !important;
    position: relative;
  }

  @keyframes moveDiagonalDots {
    from { background-position: 0px 0px; }
    to { background-position: 60px -60px; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(253, 202, 64, 0.3); }
    50% { box-shadow: 0 0 40px rgba(253, 202, 64, 0.6); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes faqProgressBarFill {
    from {
      transform: scaleX(0);
      transform-origin: left;
    }
    to {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  .faq-progress-bar {
    animation: faqProgressBarFill 8s linear forwards !important;
  }
`

export default function SEO() {
  const [expandedFaq, setExpandedFaq] = useState(0)
  const [isFaqAutomatic, setIsFaqAutomatic] = useState(true)
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState(null)
  const [hoveredBar, setHoveredBar] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [visibleStickers, setVisibleStickers] = useState([])
  const [draggingIdx, setDraggingIdx] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [stickerPositions, setStickerPositions] = useState({})
  const [stickerZIndex, setStickerZIndex] = useState({})

  const allStickers = [
    // Originalne kartice (6)
    { text: '93% saobraćaja kreće od Google-a', color: '#fff' },
    { text: 'Tvoja konkurencija već gradi autoritet', color: '#A8FF5C' },
    { text: 'SEO je digitalna imovina, ne trošak', color: '#fff' },
    { text: 'Budi tamo gde te kupci traže', color: '#A8FF5C' },
    { text: '3x viši ROI od plaćene reklame', color: '#fff' },
    { text: 'Tvoj sajt radi 24/7 za tebe', color: '#fff' },
    // Kategorija 1: Direktni odgovori (3)
    { text: 'Besplatan saobraćaj. Zauvek.', color: '#A8FF5C' },
    { text: 'Google-u treba vremena da te zavoli', color: '#fff' },
    { text: '93% iskustava kreće od pretrage', color: '#fff' },
    // Kategorija 2: Brojke (3)
    { text: 'Top 3 mesta = 60% svih klikova', color: '#fff' },
    { text: '0 RSD po svakom kliku', color: '#A8FF5C' },
    // Kategorija 3: Pametna investicija (2)
    { text: 'SEO je digitalna nekretnina', color: '#fff' },
    { text: 'Oglasi gase svetlo, SEO ne', color: '#A8FF5C' },
    { text: 'Dok ti čekaš, konkurencija profitira', color: '#FF6B6B' },
    
    // NOVA: Kategorija 4: "Statusni simbol" (4)
    { text: 'Google ti je potpisao diplomu', color: '#fff' },
    { text: 'Prva strana je digitalni centar grada', color: '#A8FF5C' },
    { text: 'Nevidljiv si na drugoj strani Google-a', color: '#FF6B6B' },
    { text: 'Tvoj brend na autopilotu', color: '#fff' },
    
    // NOVA: Kategorija 5: "Brutalne istine" (4)
    { text: '75% ljudi nikada ne klikne \'Next\'', color: '#FF6B6B' },
    { text: 'Plaćeni oglasi su iznajmljen stan', color: '#fff' },
    { text: 'Svaki dan čekanja = +10 koraka iza rivala', color: '#FF6B6B' },
    { text: 'Kupci veruju algoritmu, ne oglasu', color: '#A8FF5C' },
    
    // NOVA: Kategorija 6: "Investiciona magija" (4)
    { text: 'SEO radi i kad budžet presuši', color: '#A8FF5C' },
    { text: 'Smanji cenu po kupcu (CAC) na minimum', color: '#fff' },
    { text: 'Ovo je jedini marketing koji ne zastareva', color: '#A8FF5C' },
    { text: 'SEO je tvoj najjeftiniji radnik', color: '#A8FF5C' },
    
    // NOVA: Kategorija 7: "Finansijska inteligencija" (4)
    { text: 'Oglasi su kirija, SEO je tvoja kuća', color: '#fff' },
    { text: 'Plaćaj klikom ili vladaj tržištem', color: '#A8FF5C' },
    { text: 'Investicija koja ne traži platu 24/7', color: '#A8FF5C' },
    { text: 'Smanji trošak marketinga dok prodaja raste', color: '#fff' },
    
    // NOVA: Kategorija 8: "Psihologija i Poverenje" (4)
    { text: 'Ljubav na prvi klik (i prvu stranu)', color: '#fff' },
    { text: 'Kupci veruju Google-u, a Google veruje tebi', color: '#A8FF5C' },
    { text: 'Budi autoritet, a ne samo opcija', color: '#fff' },
    { text: 'Prva strana je dokaz da si najbolji', color: '#fff' },
    
    // NOVA: Kategorija 9: "Takmičarski duh" (4)
    { text: 'Tvoja konkurencija ti upravo krade kupce', color: '#FF6B6B' },
    { text: 'Dok ti oklevaš, oni grade zid', color: '#FF6B6B' },
    { text: 'Pretekni ih dok još spavaju', color: '#A8FF5C' },
    { text: 'Budi lovac, a ne plen na tržištu', color: '#fff' },
    
    // NOVA: Kategorija 10: "Realnost i Bolne tačke" (4)
    { text: 'Druga strana Google-a je pustinja', color: '#FF6B6B' },
    { text: 'Nevidljiv biznis je hobi, ne posao', color: '#fff' },
    { text: 'Tvoj sajt zaslužuje više od nula poseta', color: '#fff' },
    { text: 'Google te trenutno ignoriše. Promeni to.', color: '#FF6B6B' },
    
    // NOVA: Kategorija 11: "Vreme i Akumulacija" (4)
    { text: 'Najbolje vreme je bilo juče, drugo je SADA', color: '#fff' },
    { text: 'SEO je maraton koji kreće tvojim sprintom', color: '#A8FF5C' },
    { text: 'Danas gradiš temelje za profit u 2027', color: '#A8FF5C' },
    { text: 'Svaki dan čekanja je dan više za konkurenciju', color: '#FF6B6B' },
  ]

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
      { top: '12%', left: '35%' },
      { top: '72%', left: '58%' },
      { top: '42%', left: '38%' },
      { top: '22%', left: '78%' },
      { top: '68%', left: '18%' },
      { top: '82%', left: '72%' },
      { top: '58%', left: '42%' },
    ]
    return positions.slice(0, count)
  }

  const refreshStickers = () => {
    const randomCount = 9 // Tačno 9 kartica
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
      width: Math.random() > 0.5 ? '320px' : '280px',
      fontSize: '1.15rem',
      padding: '40px 48px',
      borderWidth: Math.random() > 0.8 ? '4px' : '3px'
    }))
    
    setVisibleStickers(stickerData)
    setRefreshKey(prev => prev + 1)
    setStickerPositions({})
    setStickerZIndex({})
  }

  const handleMouseDown = (idx, e) => {
    if (e.button !== 0) return
    
    const stickerElement = document.querySelector(`[data-sticker-idx="${idx}"]`)
    if (!stickerElement) return
    
    // Počni drag
    setDraggingIdx(idx)
    
    // Dobij trenutnu poziciju kartice
    const rect = stickerElement.getBoundingClientRect()
    
    // Ako nije već dragovan (nema pos), konvertuj percentage u piksele
    const pos = stickerPositions[idx]
    if (!pos) {
      const sticker = visibleStickers[idx]
      const container = document.querySelector('[data-sticker-container]')
      const containerRect = container?.getBoundingClientRect()
      
      if (container && containerRect) {
        // Konvertuj percentage u piksele
        const topValue = sticker.top.includes('%') 
          ? (containerRect.height * parseFloat(sticker.top)) / 100 + containerRect.top
          : parseFloat(sticker.top) + containerRect.top
          
        const leftValue = sticker.left.includes('%')
          ? (containerRect.width * parseFloat(sticker.left)) / 100 + containerRect.left
          : parseFloat(sticker.left) + containerRect.left
        
        // Postavi inicijalnu poziciju u pikselima
        setStickerPositions(prev => ({
          ...prev,
          [idx]: {
            x: leftValue - containerRect.left,
            y: topValue - containerRect.top
          }
        }))
      }
    }
    
    // Kalkuliši offset između kursora i leve gornje ivice kartice
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    
    // Postavi visok z-index za clicked sticker
    setStickerZIndex(prev => ({
      ...prev,
      [idx]: 9999 + Object.keys(prev).length
    }))
  }

  React.useEffect(() => {
    if (draggingIdx === null) return

    const handleMouseMove = (e) => {
      const stickerElement = document.querySelector(`[data-sticker-idx="${draggingIdx}"]`)
      const container = document.querySelector('[data-sticker-container]')
      
      if (!stickerElement || !container) return
      
      // Dobij veličinu sticker-a i container-a
      const stickerRect = stickerElement.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const stickerWidth = stickerRect.width
      const stickerHeight = stickerRect.height
      
      // Kalkuliši poziciju relativno prema container-u
      // Kursor je u viewport koordinatama, trebam da ga prevedem u container koordinate
      let x = e.clientX - dragOffset.x - containerRect.left
      let y = e.clientY - dragOffset.y - containerRect.top
      
      // Osiguraj da nisu NaN
      x = isNaN(x) ? 0 : x
      y = isNaN(y) ? 0 : y
      
      // Bounds - dozvoli da budu VAN container-a, ali ne van stranice
      const buffer = 10
      const minX = -stickerWidth - 200 // Može biti van levo, do levog bordera
      const minY = -stickerHeight - 200 // Može biti van gore, do početka sekcije
      const maxX = window.innerWidth - containerRect.left - buffer
      const maxY = document.documentElement.scrollHeight - containerRect.top - buffer
      
      // Ograniči na bounds - dozvoli kretanje van container-a
      x = Math.max(minX, Math.min(x, maxX))
      y = Math.max(minY, Math.min(y, maxY))

      setStickerPositions(prev => ({
        ...prev,
        [draggingIdx]: { x, y }
      }))
    }

    const handleMouseUp = () => {
      setDraggingIdx(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [draggingIdx, dragOffset])

  React.useEffect(() => {
    refreshStickers()
  }, [])

  // Auto-advance FAQ questions every 8 seconds
  useEffect(() => {
    if (!isFaqAutomatic) return

    const interval = setInterval(() => {
      setExpandedFaq((prev) => (prev + 1) % 6)
    }, 8000)

    return () => clearInterval(interval)
  }, [isFaqAutomatic])

  const handleFaqClick = (index) => {
    setExpandedFaq(index)
    setIsFaqAutomatic(false)
    setHoveredFaqIndex(null)
  }

  return (
    <>
      <style>{keyframes}</style>
      <div>
        <Header />

        {/* HERO SECTION - Premium SEO Focus */}
        <section style={{
          padding: '120px 24px 100px',
          background: '#000',
          color: '#fff',
          minHeight: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated diagonal background pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0px 0px',
            opacity: 0.12,
            animation: 'moveDiagonalDots 4s linear infinite',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '950px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                marginBottom: '25px',
                fontWeight: '900',
                lineHeight: '1.15',
                color: '#fff'
              }}>
                Pretvorite <span style={{ color: '#4285F4', textShadow: '2px 2px 4px rgba(0,0,0,0.5), 4px 4px 8px rgba(0,0,0,0.3)' }}>G</span><span style={{ color: '#EA4335', textShadow: '2px 2px 4px rgba(0,0,0,0.5), 4px 4px 8px rgba(0,0,0,0.3)' }}>o</span><span style={{ color: '#FDCA40', textShadow: '2px 2px 4px rgba(0,0,0,0.5), 4px 4px 8px rgba(0,0,0,0.3)' }}>o</span><span style={{ color: '#34A853', textShadow: '2px 2px 4px rgba(0,0,0,0.5), 4px 4px 8px rgba(0,0,0,0.3)' }}>g</span><span style={{ color: '#EA4335', textShadow: '2px 2px 4px rgba(0,0,0,0.5), 4px 4px 8px rgba(0,0,0,0.3)' }}>l</span><span style={{ color: '#4285F4', textShadow: '2px 2px 4px rgba(0,0,0,0.5), 4px 4px 8px rgba(0,0,0,0.3)' }}>e</span> pretrage u <span style={{ color: '#FDCA40' }}>stalne klijente</span>.
              </h1>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                marginBottom: '35px',
                color: '#d0d0d0',
                lineHeight: '1.7',
                maxWidth: '800px',
                margin: '0 auto 35px'
              }}>
                Kvalitet ispred kvantiteta. Strategija koja vaš sajt stavlja ispred konkurencije i zadržava pažnju onih koji su vam zaista bitni.
              </p>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION - Social Proof */}
        <section style={{
          padding: '60px 24px',
          background: '#000',
          color: '#fff',
          borderTop: '2px solid #FDCA40'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              textAlign: 'center'
            }}>
              {[
                { stat: '1/1', label: 'Personalizovan pristup. Svaki klijent dobija jednistvenu strategiju', icon: '📈' },
                { stat: '21.7%', label: 'Prosecna stopa konverzije za SEO', icon: '🎯' },
                { stat: '+85%', label: 'Procenat konverzije u SEO-u je duplo veća nego kod PPC oglasa', icon: '👑' },
                { stat: '+350%', label: 'ROI u prvoj godini', icon: '💰' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '30px',
                    borderRadius: '12px',
                    background: 'rgba(253, 202, 64, 0.05)',
                    border: '1px solid rgba(253, 202, 64, 0.2)'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
                  <div style={{ fontSize: '2.8rem', color: '#FDCA40', fontWeight: '900', marginBottom: '10px' }}>
                    {item.stat}
                  </div>
                  <p style={{ color: '#b0b0b0', fontSize: '1rem' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY SEO MATTERS - Authority Building */}
        <section style={{
          padding: '60px 24px 120px',
          background: '#FDCA40',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#000'
              }}>
                Zašto SEO? Zašto <span style={{ color: '#000' }}>Sada</span>?
              </h2>
            </div>

            {/* Sticker Wall Layout */}
            <div 
              data-sticker-container
              style={{ 
                position: 'relative',
                minHeight: '600px',
                width: '120%',
                marginLeft: '-10%',
                border: '6px dashed #000',
                borderRadius: '20px',
                padding: '50px',
                boxSizing: 'border-box',
                userSelect: 'none'
              }}>
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
                      fontWeight: '900',
                      lineHeight: '1.4',
                      boxShadow: isBeingDragged ? '8px 8px 0px #000' : '6px 6px 0px #000',
                      transform: `rotate(${sticker.rotate}) ${isBeingDragged ? 'scale(1.05)' : ''}`,
                      transition: isBeingDragged ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'grab',
                      animation: `popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${sticker.delay} forwards`,
                      opacity: 0,
                      zIndex: stickerZIndex[idx] || 9999
                    }}
                    onMouseDown={(e) => handleMouseDown(idx, e)}
                    onMouseEnter={(e) => {
                      if (draggingIdx === null) {
                        e.currentTarget.style.transform = 'rotate(0deg) scale(1.1)';
                        e.currentTarget.style.boxShadow = '2px 2px 0px #000';
                        e.currentTarget.style.cursor = 'grab';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (draggingIdx === null) {
                        e.currentTarget.style.transform = `rotate(${sticker.rotate})`;
                        e.currentTarget.style.boxShadow = '6px 6px 0px #000';
                      }
                    }}
                  >
                    {sticker.text}
                  </div>
                )
              })}
              
              {/* Refresh Button */}
              <button
                onClick={refreshStickers}
                style={{
                  position: 'absolute',
                  bottom: '-90px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#FDCA40',
                  color: '#000',
                  border: '3px solid #000',
                  borderRadius: '50px',
                  padding: '18px 48px',
                  fontSize: '1.15rem',
                  fontWeight: '900',
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '6px 6px 0px 0px #C79F00'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(-50%) translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px 0px #C79F00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(-50%)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px 0px #C79F00';
                }}
              >
                Novi argumenti
              </button>
            </div>
          </div>
          <style>{`
            @keyframes popIn {
              from {
                opacity: 0;
                transform: scale(0.5);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </section>

        {/* SERVICES OFFERED - SEO Packages */}
        <section style={{
          padding: '100px 24px',
          background: '#000',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '70px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Naše SEO <span style={{ color: '#FDCA40' }}>Usluge</span>
              </h2>
            </div>

            <div className="cartoon-services-grid">
              {[
                {
                  title: 'Technical SEO Audit',
                  desc: 'Detaljno skeniranje vašeg sajta za pronalaženje problema koji sprečavaju rangiranje.',
                  icon: '🔧',
                  items: ['Siteamp analiza', 'Brzina učitavanja', 'Mobile-friendliness', 'SSL sigurnost', 'Structured Data', 'Crawl problemi']
                },
                {
                  title: 'Keyword Strategy & Research',
                  desc: 'Pronalaženje visoko-vrijednih ključnih reči sa visokim potencijalom konverzije.',
                  icon: '🔍',
                  items: ['Konkurentska analiza', 'Search intent mapping', 'Long-tail keywords', 'Local keywords', 'Trend analiza', 'Monetizacijska vrijednost']
                },
                {
                  title: 'On-Page Optimization',
                  desc: 'Optimizacija sadržaja, meta tagova i strukture za maksimalan ranking potencijal.',
                  icon: '✨',
                  items: ['Meta optimizacija', 'Heading struktura', 'Sadržaj optimizacija', 'Internal linking', 'Schema markup', 'Image optimization']
                },
                {
                  title: 'Content Strategy & Creation',
                  desc: 'Kreiraj sadržaj koji ranka i konvertuje posjetioce u klijente.',
                  icon: '📝',
                  items: ['Content calendar', 'Pillar pages', 'Blog posts', 'Topic clustering', 'E-books & guides', 'Case studies']
                },
                {
                  title: 'Link Building & Authority',
                  desc: 'Izgradnja autoriteta kroz visoko-kvalitetne backlinks od relevantnih sajtova.',
                  icon: '🔗',
                  items: ['Prospect research', 'Outreach kampanja', 'Guest posting', 'Digital PR', 'Broken link building', 'Competitor analysis']
                },
                {
                  title: 'Local SEO',
                  desc: 'Dominacija lokalnih pretrage - postani #1 u tvojoj regiji.',
                  icon: '📍',
                  items: ['Google Business Profile', 'Local citations', 'Review management', 'Local content', 'Location pages', 'Map optimization']
                }
              ].map((service, idx) => (
                <div key={idx} className="cartoon-service-card">
                  <div className="cartoon-icon">{service.icon}</div>
                  <h3 className="cartoon-title">{service.title}</h3>
                  <p className="cartoon-desc">{service.desc}</p>
                  <div className="cartoon-items">
                    {service.items.map((item, i) => (
                      <div key={i} className="cartoon-item">
                        <span className="cartoon-item-icon">→</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR PROCESS - Transparent Methodology */}
        <section style={{
          padding: '100px 24px',
          background: '#000',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '70px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Zašto je <span style={{ color: '#FDCA40' }}>SEO</span> najisplativijija investicija za vaš biznis?
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#b0b0b0' }}>
                Dok plaćeni oglasi (PPC) donose trenutnu vidljivost, dugoročna SEO strategija gradi digitalnu imovinu koja raste s vremenom. Naš cilj je da smanjimo vašu zavisnost od skupih klikova i izgradimo autoritet koji Google nagrađuje visokim pozicijama.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '50px', maxWidth: '900px', margin: '0 auto' }}>
              {[
                {
                  title: 'Dominacija u organskoj pretrazi',
                  subtitle: 'SEO vs PPC',
                  stats: '90%+',
                  desc: 'Statistike pokazuju da preko 90% korisnika preskače sponzorisane oglase i poverenje poklanja organskim rezultatima. Optimizacijom sajta ne dobijate samo klikove, već i kredibilitet kod vaših idealnih kupaca.'
                },
                {
                  title: 'Maksimalan ROI i održiv rast',
                  subtitle: 'Dugoročna rentabilnost',
                  stats: '24/7',
                  desc: 'Za razliku od Google oglasa gde saobraćaj staje onog trenutka kada prestanete sa uplatama, SEO pruža stabilan povraćaj investicije (ROI). Kvalitetan sadržaj i tehnička optimizacija rade za vas 24/7, privlačeći nove klijente bez dodatnih troškova po svakom kliku.'
                },
                {
                  title: 'Konverzije zasnovane na nameri korisnika',
                  subtitle: 'Taraćene audience',
                  stats: '2x',
                  desc: 'SEO cilja korisnike u trenutku kada oni aktivno traže rešenje. Fokusiranjem na relevantne ključne reči i nameru pretrage (Search Intent), stopa konverzije na vašem sajtu može biti i do dvostruko veća u odnosu na hladne kanale prodaje.'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: '40px',
                    alignItems: 'flex-start',
                    paddingBottom: '40px',
                    borderBottom: idx < 2 ? '1px solid rgba(253, 202, 64, 0.15)' : 'none'
                  }}
                >
                  {/* Statistics Circle */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(253, 202, 64, 0.15)',
                    border: '2px solid rgba(253, 202, 64, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: '900',
                    color: '#FDCA40',
                    flexShrink: 0
                  }}>
                    {item.stats}
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      color: '#fff',
                      marginBottom: '6px',
                      lineHeight: '1.3'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#FDCA40',
                      fontWeight: '600',
                      marginBottom: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px'
                    }}>
                      {item.subtitle}
                    </p>
                    <p style={{
                      fontSize: '1.05rem',
                      color: '#c0c0c0',
                      lineHeight: '1.7',
                      marginBottom: 0
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS - Social Proof */}
        <section style={{
          padding: '100px 24px',
          background: '#000',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '70px' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Šta Kažu <span style={{ color: '#FDCA40' }}>Naši Klijenti</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {[
                {
                  name: 'Marko Nikolić',
                  role: 'CEO, E-Commerce Startup',
                  text: 'Najjednostavnije - SEO sa SEO Mačkom je transformisao moj biznis. U 6 mjeseci, prešli smo sa 0 sa 150+ monthly leads. Preporuka svima!',
                  rating: 5
                },
                {
                  name: 'Ana Marković',
                  role: 'Marketing Manager, Local Business',
                  text: 'Profesionalnost i transparentnost. Nisu obećali nemoguće, ali su donijeli spektakularne rezultate. ROI je nevjerovatan.',
                  rating: 5
                },
                {
                  name: 'Stefan Jovanović',
                  role: 'Vlasnik, Service Company',
                  text: 'Od kada radim sa njima, Google je postao moj best salesman. Ne mogu vjerovati koliko se moj biznis promijenio.',
                  rating: 5
                }
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '35px',
                    background: 'linear-gradient(135deg, rgba(253, 202, 64, 0.08) 0%, rgba(253, 202, 64, 0.02) 100%)',
                    border: '2px solid rgba(253, 202, 64, 0.2)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #FDCA40'
                  }}
                >
                  <div style={{ display: 'flex', marginBottom: '15px', gap: '3px' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{ color: '#FDCA40', fontSize: '1.2rem' }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: '#b0b0b0', marginBottom: '20px', fontStyle: 'italic', lineHeight: '1.7', fontSize: '1rem' }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p style={{ color: '#FDCA40', fontWeight: '800', fontSize: '1rem' }}>
                      {testimonial.name}
                    </p>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Styled like FAQSection */}
        <section style={{
          minHeight: '100vh',
          padding: '100px 24px',
          background: '#1a1a1a',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '300px',
            background: 'linear-gradient(180deg, #000 0%, #1a1a1a 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          <div style={{
            maxWidth: '1400px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '60px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 100
          }}>
            {/* LEFT SIDE - QUESTIONS */}
            <div style={{ position: 'relative', zIndex: 20 }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                marginBottom: '40px',
                color: '#fff',
                fontWeight: 800
              }}>
                Često Postavljana <span style={{ color: '#FDCA40' }}>Pitanja</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  {
                    q: 'Koliko vremena traje prije nego što vidim rezultate?',
                    a: 'SEO je marathon, ne sprint. Obično vidite prve rezultate u 8-12 nedjelja, a značajne rezultate u 4-6 mjeseci. Industrija, konkurencija i starting point su bitni faktori.'
                  },
                  {
                    q: 'Koliko koštaju vaše SEO usluge?',
                    a: 'Cijene se razlikuju ovisno o opsegu - lokalni SEO počinje od 500€/mjesečno, dok strategic SEO može biti više. Nude se i one-time audit-i. Sve cijene su transparentne bez skrivenih troškova.'
                  },
                  {
                    q: 'Možete li garantovati #1 ranking?',
                    a: 'Ne - i bilo ko ko to garantuje je neiskrena osoba. Međutim, sa pravilnom strategijom, može se dosići #1 za većinu relevantnih ključnih reči. Fokusiramo se na rezultate, ne na prazne obećanje.'
                  },
                  {
                    q: 'Šta se dešava ako prekinem uslugu?',
                    a: 'Ranking ne pada preko noći, ali će vremenom početi da pada bez kontinuirane optimizacije. SEO je kontinuirani proces. Mi prenosimo sve znanje tako da možete nastaviti sami ako odete.'
                  },
                  {
                    q: 'Da li radite samo sa new sajtovima ili i sa uspostavljenim?',
                    a: 'Radimo sa oba! Zapravo, često imamo bolje rezultate sa existing sajtovima jer već imaju neku auktoritetu i trafik. Nove sajtove gradimo sa SEO u misli od početka.'
                  },
                  {
                    q: 'Kako ćete mi izvještavati o napretku?',
                    a: 'Mjesečni detaljni izvještaji sa svim bitnim metrikama - rankings, trafik, konverzije. Pristup live dashboard-u gdje možete pratiti sve u realnom vremenu. Redovne check-in pozive.'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <motion.button
                      onClick={() => handleFaqClick(idx)}
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: '18px 24px',
                        textAlign: 'left',
                        border: '3px solid #000',
                        borderRadius: '50px',
                        backgroundColor: expandedFaq === idx ? '#FDCA40' : (hoveredFaqIndex === idx ? 'rgba(253, 202, 64, 0.15)' : 'transparent'),
                        color: expandedFaq === idx ? '#000' : '#FDCA40',
                        cursor: 'pointer',
                        fontSize: '1.05rem',
                        fontWeight: expandedFaq === idx ? 700 : 500,
                        transition: 'all 0.15s ease',
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: expandedFaq === idx ? '5px 5px 0px 0px #C79F00' : '5px 5px 0px 0px #333333',
                        transform: hoveredFaqIndex === idx && expandedFaq !== idx ? 'translate(3px, 3px)' : 'translate(0, 0)'
                      }}
                      onMouseEnter={() => {
                        if (expandedFaq !== idx) {
                          setHoveredFaqIndex(idx)
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredFaqIndex(null)
                      }}
                    >
                      {item.q}
                      
                      {/* Progress bar inside active button */}
                      {expandedFaq === idx && isFaqAutomatic && (
                        <div
                          key={`progress-${expandedFaq}`}
                          className="faq-progress-bar"
                          style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
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
            </div>

            {/* RIGHT SIDE - CARTOONY PREMIUM CARD */}
            <div style={{
              position: 'relative',
              minHeight: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AnimatePresence mode="wait">
                {expandedFaq !== null && (
                  <motion.div
                    key={expandedFaq}
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                      position: 'relative',
                      width: '95%',
                      maxWidth: '520px',
                      padding: '45px 40px',
                      background: '#FDCA40',
                      border: '4px solid #000',
                      borderRadius: '24px',
                      boxShadow: '8px 8px 0px 0px #000',
                      transform: 'rotate(-1deg)'
                    }}
                  >
                    {/* Corner accent */}
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '30px',
                      background: '#fff',
                      border: '3px solid #000',
                      borderRadius: '50px',
                      padding: '8px 16px',
                      fontSize: '0.85rem',
                      fontWeight: '800',
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
                        marginBottom: '20px',
                        color: '#000',
                        lineHeight: '1.3'
                      }}>
                        {[
                          { q: 'Koliko vremena traje prije nego što vidim rezultate?', a: 'SEO je marathon, ne sprint. Obično vidite prve rezultate u 8-12 nedjelja, a značajne rezultate u 4-6 mjeseci. Industrija, konkurencija i starting point su bitni faktori.' },
                          { q: 'Koliko koštaju vaše SEO usluge?', a: 'Cijene se razlikuju ovisno o opsegu - lokalni SEO počinje od 500€/mjesečno, dok strategic SEO može biti više. Nude se i one-time audit-i. Sve cijene su transparentne bez skrivenih troškova.' },
                          { q: 'Možete li garantovati #1 ranking?', a: 'Ne - i bilo ko ko to garantuje je neiskrena osoba. Međutim, sa pravilnom strategijom, može se dosići #1 za većinu relevantnih ključnih reči. Fokusiramo se na rezultate, ne na prazne obećanje.' },
                          { q: 'Šta se dešava ako prekinem uslugu?', a: 'Ranking ne pada preko noći, ali će vremenom početi da pada bez kontinuirane optimizacije. SEO je kontinuirani proces. Mi prenosimo sve znanje tako da možete nastaviti sami ako odete.' },
                          { q: 'Da li radite samo sa new sajtovima ili i sa uspostavljenim?', a: 'Radimo sa oba! Zapravo, često imamo bolje rezultate sa existing sajtovima jer već imaju neku auktoritetu i trafik. Nove sajtove gradimo sa SEO u misli od početka.' },
                          { q: 'Kako ćete mi izvještavati o napretku?', a: 'Mjesečni detaljni izvještaji sa svim bitnim metrikama - rankings, trafik, konverzije. Pristup live dashboard-u gdje možete pratiti sve u realnom vremenu. Redovne check-in pozive.' }
                        ][expandedFaq].q}
                      </h3>
                      
                      {/* Divider */}
                      <div style={{
                        width: '60px',
                        height: '4px',
                        background: '#000',
                        borderRadius: '2px',
                        marginBottom: '20px'
                      }} />
                      
                      <p style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.75',
                        color: '#1a1a1a',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        {[
                          { q: 'Koliko vremena traje prije nego što vidim rezultate?', a: 'SEO je marathon, ne sprint. Obično vidite prve rezultate u 8-12 nedjelja, a značajne rezultate u 4-6 mjeseci. Industrija, konkurencija i starting point su bitni faktori.' },
                          { q: 'Koliko koštaju vaše SEO usluge?', a: 'Cijene se razlikuju ovisno o opsegu - lokalni SEO počinje od 500€/mjesečno, dok strategic SEO može biti više. Nude se i one-time audit-i. Sve cijene su transparentne bez skrivenih troškova.' },
                          { q: 'Možete li garantovati #1 ranking?', a: 'Ne - i bilo ko ko to garantuje je neiskrena osoba. Međutim, sa pravilnom strategijom, može se dosići #1 za većinu relevantnih ključnih reči. Fokusiramo se na rezultate, ne na prazne obećanje.' },
                          { q: 'Šta se dešava ako prekinem uslugu?', a: 'Ranking ne pada preko noći, ali će vremenom početi da pada bez kontinuirane optimizacije. SEO je kontinuirani proces. Mi prenosimo sve znanje tako da možete nastaviti sami ako odete.' },
                          { q: 'Da li radite samo sa new sajtovima ili i sa uspostavljenim?', a: 'Radimo sa oba! Zapravo, često imamo bolje rezultate sa existing sajtovima jer već imaju neku auktoritetu i trafik. Nove sajtove gradimo sa SEO u misli od početka.' },
                          { q: 'Kako ćete mi izvještavati o napretku?', a: 'Mjesečni detaljni izvještaji sa svim bitnim metrikama - rankings, trafik, konverzije. Pristup live dashboard-u gdje možete pratiti sve u realnom vremenu. Redovne check-in pozive.' }
                        ][expandedFaq].a}
                      </p>
                    </motion.div>

                    {/* Unique decorative elements for each question */}
                    {expandedFaq === 0 && (
                      <>
                        <motion.div style={{ position: 'absolute', width: '50px', height: '50px', background: '#fff', border: '3px solid #000', borderRadius: '50%', bottom: '-15px', left: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '3px 3px 0px 0px #000' }} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>⏱️</motion.div>
                        <motion.div style={{ position: 'absolute', width: '40px', height: '40px', background: '#A8FF5C', border: '3px solid #000', borderRadius: '8px', top: '20px', left: '-15px', boxShadow: '3px 3px 0px 0px #000' }} animate={{ rotate: [12, 18, 12] }} transition={{ duration: 3, repeat: Infinity }} />
                        <motion.div style={{ position: 'absolute', width: '30px', height: '30px', background: '#87CEEB', border: '3px solid #000', borderRadius: '50%', bottom: '60px', right: '-10px', boxShadow: '2px 2px 0px 0px #000' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      </>
                    )}
                    {expandedFaq === 1 && (
                      <>
                        <motion.div style={{ position: 'absolute', width: '50px', height: '50px', background: '#fff', border: '3px solid #000', borderRadius: '50%', bottom: '-15px', left: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '3px 3px 0px 0px #000' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💰</motion.div>
                        <motion.div style={{ position: 'absolute', width: '35px', height: '35px', background: '#FFD700', border: '3px solid #000', borderRadius: '50%', top: '15px', left: '-12px', boxShadow: '3px 3px 0px 0px #000' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                        <motion.div style={{ position: 'absolute', width: '45px', height: '25px', background: '#98FB98', border: '3px solid #000', borderRadius: '6px', bottom: '40px', right: '-15px', boxShadow: '2px 2px 0px 0px #000' }} animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2.5, repeat: Infinity }} />
                      </>
                    )}
                    {expandedFaq === 2 && (
                      <>
                        <motion.div style={{ position: 'absolute', width: '50px', height: '50px', background: '#fff', border: '3px solid #000', borderRadius: '50%', bottom: '-15px', left: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '3px 3px 0px 0px #000' }} animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>🎯</motion.div>
                        <motion.div style={{ position: 'absolute', width: '0', height: '0', borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '35px solid #FF6B6B', top: '10px', left: '-20px', filter: 'drop-shadow(3px 3px 0px #000)' }} animate={{ rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                        <motion.div style={{ position: 'absolute', width: '40px', height: '40px', background: '#DDA0DD', border: '3px solid #000', borderRadius: '12px', bottom: '50px', right: '-12px', boxShadow: '2px 2px 0px 0px #000' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
                      </>
                    )}
                    {expandedFaq === 3 && (
                      <>
                        <motion.div style={{ position: 'absolute', width: '50px', height: '50px', background: '#fff', border: '3px solid #000', borderRadius: '50%', bottom: '-15px', left: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '3px 3px 0px 0px #000' }} animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>📊</motion.div>
                        <motion.div style={{ position: 'absolute', width: '50px', height: '30px', background: '#FFA07A', border: '3px solid #000', borderRadius: '15px', top: '25px', left: '-18px', boxShadow: '3px 3px 0px 0px #000' }} animate={{ scaleX: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
                        <motion.div style={{ position: 'absolute', width: '25px', height: '25px', background: '#20B2AA', border: '3px solid #000', borderRadius: '4px', bottom: '70px', right: '-8px', boxShadow: '2px 2px 0px 0px #000' }} animate={{ rotate: [0, 90, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                      </>
                    )}
                    {expandedFaq === 4 && (
                      <>
                        <motion.div style={{ position: 'absolute', width: '50px', height: '50px', background: '#fff', border: '3px solid #000', borderRadius: '50%', bottom: '-15px', left: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '3px 3px 0px 0px #000' }} animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>🏗️</motion.div>
                        <motion.div style={{ position: 'absolute', width: '35px', height: '45px', background: '#B0C4DE', border: '3px solid #000', borderRadius: '4px 4px 0 0', top: '15px', left: '-15px', boxShadow: '3px 3px 0px 0px #000' }} animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <motion.div style={{ position: 'absolute', width: '40px', height: '40px', background: '#F0E68C', border: '3px solid #000', borderRadius: '50%', bottom: '45px', right: '-15px', boxShadow: '2px 2px 0px 0px #000' }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      </>
                    )}
                    {expandedFaq === 5 && (
                      <>
                        <motion.div style={{ position: 'absolute', width: '50px', height: '50px', background: '#fff', border: '3px solid #000', borderRadius: '50%', bottom: '-15px', left: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '3px 3px 0px 0px #000' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>📈</motion.div>
                        <motion.div style={{ position: 'absolute', width: '45px', height: '35px', background: '#E6E6FA', border: '3px solid #000', borderRadius: '8px', top: '20px', left: '-18px', boxShadow: '3px 3px 0px 0px #000' }} animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 3, repeat: Infinity }} />
                        <motion.div style={{ position: 'absolute', width: '30px', height: '30px', background: '#90EE90', border: '3px solid #000', borderRadius: '50%', bottom: '55px', right: '-10px', boxShadow: '2px 2px 0px 0px #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>✓</motion.div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SAMO POSTAJE BOLJE - Growth Chart Section */}
        <section style={{
          padding: '100px 24px',
          background: '#000',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ 
                  fontSize: '1rem', 
                  color: '#FDCA40', 
                  fontWeight: '700', 
                  letterSpacing: '2px', 
                  marginBottom: '15px' 
                }}
              >
                REZULTATI
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: '900',
                  marginBottom: '20px',
                  color: '#fff',
                  lineHeight: '1.2'
                }}
              >
                Samo Postaje <span style={{ color: '#FDCA40' }}>Bolje.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ 
                  fontSize: '1.1rem', 
                  color: '#b0b0b0', 
                  maxWidth: '600px', 
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}
              >
                Pogledaj kako izgleda tipičan rast organskog trafika nakon naše SEO optimizacije
              </motion.p>
            </div>

            {/* Glassmorphism Chart Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                position: 'relative',
                padding: '40px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(253, 202, 64, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Chart Area */}
              <div style={{ 
                position: 'relative', 
                height: '320px', 
                display: 'flex', 
                alignItems: 'flex-end', 
                justifyContent: 'center', 
                gap: '6px',
                padding: '0 10px'
              }}>
                {/* Zone Tooltips */}
                {[
                  { start: 0, end: 10, label: '2-3 meseca nakon početka optimizacije:', sublabel: 'Aktivacija i Start' },
                  { start: 10, end: 22, label: '4-6 meseca nakon početka optimizacije:', sublabel: 'Ekspanzija Snage' },
                  { start: 22, end: 37, label: '6+ meseca nakon početka optimizacije:', sublabel: 'Probijanje Granica' }
                ].map((zone, zoneIdx) => {
                  const [isHovered, setIsHovered] = useState(false)
                  return (
                    <div
                      key={zoneIdx}
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
                      {/* Hover overlay */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(253, 202, 64, 0.15), transparent)',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        borderRadius: '8px'
                      }} />
                      
                      {/* Tooltip */}
                      <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: `translateX(-50%) translateY(${isHovered ? '-15px' : '0px'})`,
                        opacity: isHovered ? 1 : 0,
                        transition: 'all 0.3s ease',
                        pointerEvents: 'none',
                        zIndex: 30,
                        minWidth: '240px'
                      }}>
                        <div style={{
                          padding: '15px 20px',
                          borderRadius: '12px',
                          background: 'rgba(253, 202, 64, 0.95)',
                          boxShadow: '0 10px 40px rgba(253, 202, 64, 0.3)',
                          textAlign: 'center'
                        }}>
                          <p style={{ fontWeight: '700', color: '#000', fontSize: '0.85rem', marginBottom: '5px' }}>
                            {zone.label}
                          </p>
                          <p style={{ color: 'rgba(0,0,0,0.7)', fontWeight: '600', fontSize: '0.9rem' }}>
                            {zone.sublabel}
                          </p>
                        </div>
                        {/* Arrow */}
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '10px solid transparent',
                          borderRight: '10px solid transparent',
                          borderTop: '10px solid rgba(253, 202, 64, 0.95)'
                        }} />
                      </div>
                    </div>
                  )
                })}

                {/* Animated Bars - 37 pillars */}
                {Array.from({ length: 37 }).map((_, idx) => {
                  const progress = idx / 36
                  // Bazna visina raste eksponencijalno
                  const baseLine = 15 + (progress * progress * 70)
                  // Volatilnost - simulira realan SEO rast
                  const seed = Math.sin(idx * 12.9898 + 78.233) * 43758.5453
                  const volatility = ((seed - Math.floor(seed)) - 0.5) * 25
                  // Dodatni skok za zadnju grupu
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
                        delay: idx * 0.03,
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
                        boxShadow: '0 0 15px rgba(253, 202, 64, 0.4)',
                        position: 'relative'
                      }}
                    />
                  )
                })}
              </div>

              {/* X-Axis Labels */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '25px', 
                paddingTop: '20px', 
                borderTop: '1px solid rgba(255,255,255,0.1)' 
              }}>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>Početak</span>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>3 meseca</span>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>6 meseci</span>
                <span style={{ fontSize: '0.85rem', color: '#FDCA40', fontWeight: '700' }}>12+ meseci</span>
              </div>
            </motion.div>

            {/* Bottom Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px',
              marginTop: '60px',
              textAlign: 'center'
            }}>
              {[
                { value: '320%', label: 'Prosečan rast organskog trafika' },
                { value: '6-12', label: 'Meseci do vrha Google-a' },
                { value: '24/7', label: 'Vaš sajt radi za vas non-stop' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                >
                  <p style={{ color: '#FDCA40', fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>
                    {stat.value}
                  </p>
                  <p style={{ color: '#b0b0b0', fontSize: '1rem' }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA - Conversion Focused */}
        <section style={{
          padding: '120px 24px',
          background: 'linear-gradient(135deg, #FDCA40 0%, #FDD968 100%)',
          color: '#000',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            once={true}
            style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              marginBottom: '25px',
              fontWeight: '900',
              lineHeight: '1.2'
            }}>
              Spreman Za Rast?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '40px',
              opacity: '0.95',
              lineHeight: '1.6'
            }}>
              Hvataš samo 7% ukupnog trafika koji bi mogao dobiti sa SEO. Hajde da to promijenimo zajedno - bez rizika, bez dugoročnih ugovora.
            </p>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                to="/kontakt/" 
                style={{ textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <div style={{
                  background: '#000',
                  color: '#FDCA40',
                  padding: '20px 50px',
                  fontSize: '1.3rem',
                  borderRadius: '50px',
                  border: '3px solid #FDCA40',
                  fontWeight: '700',
                  transition: 'all 0.1s ease',
                  pointerEvents: 'auto',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  boxShadow: '5px 5px 0px 0px #C79F00'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px 0px #C79F00';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px 0px #C79F00';
                }}>
                  Zatraži Besplatnu Konsultaciju
                </div>
              </Link>
            </div>

            <p style={{ marginTop: '30px', fontSize: '0.95rem', opacity: '0.8' }}>
              Nema obveza. Nema kreditne kartice potrebne. Nema spam-a. Samo konkretnе rezultate.
            </p>
          </motion.div>
        </section>

        
        <footer style={{ background: '#000', color: '#fff', padding: '60px 24px 30px', borderTop: '1px solid #333', position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '80px', marginBottom: '60px', position: 'relative', alignItems: 'flex-start' }}>
              {/* LEFT SIDE - COLUMNS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(150px, auto))', gap: '40px', flex: '0 0 auto' }}>
                {/* FOOTER COLUMN 1 - BRAND */}
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>SEO Mačak</h3>
                  <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '0.9rem' }}>
                    Stručna SEO optimizacija, web development i dizajn za vaš biznis.
                  </p>
                </div>

                {/* FOOTER COLUMN 2 - LINKS */}
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Linkovi</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '10px' }}><Link to="/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Početna</Link></li>
                    <li style={{ marginBottom: '10px' }}><Link to="/izrada-sajtova/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Izrada sajtova</Link></li>
                    <li style={{ marginBottom: '10px' }}><Link to="/seo/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>SEO</Link></li>
                    <li style={{ marginBottom: '10px' }}><Link to="/blog/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Blog</Link></li>
                  </ul>
                </div>

                {/* FOOTER COLUMN 3 - MORE LINKS */}
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Kompanija</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '10px' }}><Link to="/about/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>O nama</Link></li>
                    <li style={{ marginBottom: '10px' }}><Link to="/kontakt/" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Kontakt</Link></li>
                    <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Privatnost</a></li>
                    <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#aaa', textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer', fontSize: '0.9rem' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Uslovi</a></li>
                  </ul>
                </div>

                {/* FOOTER COLUMN 4 - CONTACT */}
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '20px', color: '#fff' }}>Kontakt</h4>
                  <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.9rem' }}>email@example.com</p>
                  <p style={{ color: '#aaa', marginBottom: '10px', fontSize: '0.9rem' }}>+381 (0) 123 456 789</p>
                  <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Beograd, Srbija</p>
                </div>
              </div>
            </div>

          {/* FOOTER BOTTOM */}
          <div style={{ borderTop: '1px solid #333', paddingTop: '30px', textAlign: 'center', color: '#666' }}>
            <p style={{ margin: 0 }}>© 2024 SEO Mačak. Sva prava zadržana.</p>
          </div>
        </div>
        </footer>
      </div>
    </>
  )
}