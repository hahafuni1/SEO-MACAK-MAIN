import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQData = [
  {
    question: 'Šta je SEO optimizacija?',
    answer: 'SEO (Search Engine Optimization) je proces poboljšanja vidljivosti vašeg sajta u pretražnim rezultatima. Koristi se kombinacija tehnika za povećanje organskog prometa.'
  },
  {
    question: 'Koliko dugo traje da vidim rezultate?',
    answer: 'Rezultati se obično počinju viđati između 3-6 meseci, u zavisnosti od konkurencije i vremenske linije. Dugoročni rezultati mogu biti i bolji nakon 6-12 meseci.'
  },
  {
    question: 'Da li radite lokalno ili nacionalno?',
    answer: 'Radimo na svim nivoima - lokalno, nacionalno i međunarodno. Prilagođavamo strategije prema vašim ciljevima i gde vašim kupcima trebate biti vidljivi.'
  },
  {
    question: 'Koja je razlika između SEO i PPC?',
    answer: 'SEO je organsko rangiranje koje se gradi tokom vremena, dok je PPC (plaćena pretraga) trenutna vidljivost. SEO je dugoročno rešenje, a PPC je brz rezultat.'
  },
  {
    question: 'Kako će moj sajt izgledati?',
    answer: 'Kreiramo moderne, brze i mobilno-optimizovane sajte. Svaki sajt je prilagođen vašem brendu sa intuitivnom navigacijom i boljom konverzijom korisnika.'
  }
]

export default function FAQSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isAutomatic, setIsAutomatic] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-advance questions every 10 seconds (only if automatic)
  useEffect(() => {
    if (!isAutomatic) return

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % FAQData.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [isAutomatic])

  const handleQuestionClick = (index) => {
    setSelectedIndex(index)
    setIsAutomatic(false)
    setHoveredIndex(null)
  }

  // ═══════════════════════════════════════════════════════════
  // MOBILE VERSION - Accordion style, simple animations
  // ═══════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <section style={{
        minHeight: '100vh',
        padding: '60px 20px',
        background: '#1a1a1a',
        color: '#fff',
        position: 'relative',
        zIndex: 500
      }}>
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(180deg, #000 0%, #1a1a1a 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '32px',
            color: '#fff',
            fontWeight: 800,
            textAlign: 'center'
          }}>
            Česta <span style={{ color: '#FDCA40' }}>Pitanja</span>
          </h2>

          {/* Accordion FAQ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQData.map((item, index) => (
              <motion.div
                key={index}
                initial={false}
                style={{
                  background: selectedIndex === index 
                    ? 'linear-gradient(135deg, rgba(253, 202, 64, 0.2) 0%, rgba(253, 202, 64, 0.1) 100%)'
                    : 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  border: selectedIndex === index 
                    ? '2px solid rgba(253, 202, 64, 0.5)' 
                    : '2px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden'
                }}
              >
                {/* Question button */}
                <button
                  onClick={() => handleQuestionClick(index)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'transparent',
                    border: 'none',
                    color: selectedIndex === index ? '#FDCA40' : '#fff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span>{item.question}</span>
                  <motion.span
                    animate={{ rotate: selectedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      fontSize: '1.2rem',
                      color: '#FDCA40',
                      flexShrink: 0
                    }}
                  >
                    ▼
                  </motion.span>
                </button>

                {/* Answer - Animated collapse */}
                <AnimatePresence>
                  {selectedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 20px 20px 20px',
                        color: '#ccc',
                        fontSize: '0.95rem',
                        lineHeight: 1.7
                      }}>
                        {item.answer}
                      </div>

                      {/* Progress bar for auto-advance */}
                      {isAutomatic && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 10, ease: 'linear' }}
                          style={{
                            height: '3px',
                            background: '#FDCA40',
                            transformOrigin: 'left'
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Simple decorative glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(253, 202, 64, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: -1
          }} />
        </div>
      </section>
    )
  }

  // ═══════════════════════════════════════════════════════════
  // DESKTOP VERSION - Full animations, bubble design
  // ═══════════════════════════════════════════════════════════

  return (
    <section style={{
      minHeight: '100vh',
      padding: '100px 24px',
      background: '#1a1a1a',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 500
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
      
      <style>{`
        @keyframes progressBarFill {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
        .progress-bar {
          animation: progressBarFill 10s linear forwards !important;
        }
      `}</style>

      <div style={{
        maxWidth: '1400px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 100
      }}>
        {/* LEFT SIDE - QUESTIONS */}
        <div style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            marginBottom: '40px',
            color: '#fff',
            fontWeight: 800
          }}>
            Česta <span style={{ color: '#FDCA40' }}>Pitanja</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', pointerEvents: 'auto' }}>
            {FAQData.map((item, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <motion.button
                  onClick={() => handleQuestionClick(index)}
                  type="button"
                  style={{
                    padding: '18px 24px',
                    textAlign: 'left',
                    border: '3px solid #000',
                    borderRadius: '50px',
                    backgroundColor: selectedIndex === index ? '#FDCA40' : (hoveredIndex === index ? 'rgba(253, 202, 64, 0.15)' : 'transparent'),
                    color: selectedIndex === index ? '#000' : '#FDCA40',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: selectedIndex === index ? 700 : 500,
                    transition: 'all 0.15s ease',
                    pointerEvents: 'auto',
                    zIndex: 30,
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: selectedIndex === index ? '5px 5px 0px 0px #C79F00' : '5px 5px 0px 0px #333333',
                    transform: hoveredIndex === index && selectedIndex !== index ? 'translate(3px, 3px)' : 'translate(0, 0)'
                  }}
                  onMouseEnter={() => {
                    if (selectedIndex !== index) {
                      setHoveredIndex(index)
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null)
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.question}
                  
                  {/* PROGRESS BAR INSIDE BUTTON */}
                  {selectedIndex === index && isAutomatic && (
                    <div
                      className="progress-bar"
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

        {/* RIGHT SIDE - BUBBLE ANSWER */}
        <div style={{
          position: 'relative',
          minHeight: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* STRELICA - RED CIRCLE CONTAINER */}
          <div style={{
            position: 'absolute',
            top: '157%',
            right: '-20%',
            transform: 'translateY(-50%)',
            width: '1000px',
            height: '1000px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 15,
            pointerEvents: 'auto'
          }}>
            <img 
              src="/strelica.webp" 
              alt="Strelica" 
              style={{
                width: '90%',
                height: '90%',
                objectFit: 'contain',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: '95%',
                maxWidth: '650px',
                padding: '60px 50px',
                background: 'linear-gradient(135deg, rgba(253, 202, 64, 0.15) 0%, rgba(253, 202, 64, 0.05) 100%)',
                border: '2px solid rgba(253, 202, 64, 0.3)',
                borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 60px rgba(253, 202, 64, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  marginBottom: '24px',
                  color: '#FDCA40'
                }}>
                  {FAQData[selectedIndex].question}
                </h3>
                <p style={{
                  fontSize: '1.3rem',
                  lineHeight: '1.8',
                  color: '#ddd',
                  margin: 0
                }}>
                  {FAQData[selectedIndex].answer}
                </p>
              </motion.div>

              {/* DECORATIVE BUBBLE ELEMENTS */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  background: 'rgba(253, 202, 64, 0.1)',
                  borderRadius: '50%',
                  bottom: '-50px',
                  right: '-50px',
                  pointerEvents: 'none'
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  width: '140px',
                  height: '140px',
                  background: 'rgba(253, 202, 64, 0.05)',
                  borderRadius: '50%',
                  top: '-70px',
                  left: '-70px',
                  pointerEvents: 'none'
                }}
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </AnimatePresence>

          {/* BACKGROUND GLOW */}
          <motion.div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(253, 202, 64, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: -1
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </div>

    </section>
  )
}
