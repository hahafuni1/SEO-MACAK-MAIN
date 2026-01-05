import React, { useRef, useEffect } from 'react'
import Header from './Header'
import Link from './Link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { PageTransitionContext } from './PageTransition'

const keyframes = `
  @keyframes moveDiagonalDots {
    from { background-position: 0px 0px; }
    to { background-position: 60px -60px; }
  }
`

export default function IzradaSajtova() {
  const portfolioContainerRef = useRef(null)
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Responsive carousel values
  const getCarouselValues = () => {
    if (windowWidth < 768) {
      return { paddingLeft: 20, paddingRight: 600, gap: 100, translateX: -2600 }
    } else if (windowWidth < 1024) {
      return { paddingLeft: 60, paddingRight: 700, gap: 150, translateX: -3200 }
    } else if (windowWidth < 1920) {
      return { paddingLeft: 180, paddingRight: 900, gap: 200, translateX: -3600 }
    } else {
      return { paddingLeft: 200, paddingRight: 1100, gap: 220, translateX: -4200 }
    }
  }

  const carouselValues = getCarouselValues()
  
  const { scrollYProgress } = useScroll({
    target: portfolioContainerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  // Carousel horizontal scroll animation - all cards move together in a row
  // Entire carousel track translates left as user scrolls
  // Progress: 0 = start (cards visible from left), 1 = end (cards off-screen to left)
  const carouselX = useTransform(smoothProgress, [0, 0.75], [0, carouselValues.translateX])

  const projects = [
    {
      title: 'E-Commerce Platforme',
      desc: 'Kreiramo unikatna e-commerce rešenja prilagođena vašem brendu, spajajući vrhunski dizajn sa besprekornim korisničkim iskustvom.',
      result: '-40% napuštenih korpi',
      tech: 'React, Node.js, Stripe',
      color: '#FF6B9D'
    },
    {
      title: 'SaaS Aplikacije',
      desc: 'Custom SaaS rešenja sa složenom backend logikom i intuitivnim frontend interfejsom.',
      result: 'Real-time obrada podataka',
      tech: 'React, PostgreSQL, AWS (po potrebi)',
      color: '#00BFFF'
    },
    {
      title: 'SEO Optimizacija',
      desc: 'Kompletan SEO audit i optimizacija dovodi do sigurnog uspeha u google pretrazivanju.',
      result: 'Visoki Google Rankovi',
      tech: 'Technical SEO, Link Building, Content Strategija',
      color: '#FFD700'
    },
    {
      title: 'Dizajn & Branding - Rebranding',
      desc: 'Kompletan rebranding uključujući novi logo, boju, tipografiju i jedan od najunikatnijih web dizajna u Srbiji.',
      result: '+200% angažmana dizajna',
      tech: 'Web Dizajn, UX/UI, Brand Strategija',
      color: '#00FF88'
    }
  ]
  return (
    <>
    <style>{keyframes}</style>
    <div>
      <Header />

      {/* HERO SECTION - Value Proposition & CTA */}
      <section style={{ padding: '100px 24px', background: '#000', color: '#fff', textAlign: 'center', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated moving background - diagonal pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0px 0px',
            opacity: 0.08,
            animation: 'moveDiagonalDots 3s linear infinite',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        <div style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '700', color: '#FDCA40' }}>Profesionalna Izrada Sajtova</h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', color: '#e0e0e0', lineHeight: '1.6' }}>
            Kreiraj snažnu online prisutnost sa modernim, brzim i SEO-optimizovanim sajtovima koji konvertuju posjetioce u klijente. U svetu gde prvi utisak traje samo nekoliko sekundi, mi gradimo platforme koje odmah ulivaju poverenje, dominiraju pretragom i pretvaraju tvoj digitalni prostor u najefikasniji prodajni alat koji radi za tebe 24/7.
          </p>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link 
              to="/kontakt/" 
              style={{ textDecoration: 'none' }}
            >
              <button style={{
                padding: '28px 90px',
                fontSize: '1.6rem',
                fontWeight: '700',
                fontFamily: 'Playfair Display, serif',
                backgroundImage: 'linear-gradient(90deg, #FDCA40 0%, #FDCA40 50%, #000 50%, #000 100%)',
                backgroundSize: '200% 100%',
                backgroundPosition: '0% center',
                color: '#000',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0 10px 30px rgba(253, 202, 64, 0.3)',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(253, 202, 64, 0.6), 0 0 30px rgba(253, 202, 64, 0.4)';
                e.currentTarget.style.backgroundPosition = '100% center';
                e.currentTarget.style.color = '#FDCA40';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(253, 202, 64, 0.3)';
                e.currentTarget.style.backgroundPosition = '0% center';
                e.currentTarget.style.color = '#000';
              }}>
                Potražite Besplatnu Ponudu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Trust & Authority */}
      <section style={{ padding: '80px 24px', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.8rem', 
            marginBottom: '60px', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #A0A0A0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: '#FDCA40'
          }}>Zašto Izabrati Nas?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', position: 'relative' }}>
            {[
              { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>', title: 'Brzi Sajtovi', desc: 'Optimizovani za brže učitavanje - veća konverzija i bolja SEO rangiranja', color: '#FFD700' },
              { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L15.09 8.26H22L17.55 12.5L18.91 18.76L12 14.5L5.09 18.76L6.45 12.5L2 8.26H8.91L12 2Z"/></svg>', title: 'Moderni Dizajn', desc: 'Responsive dizajn koji savršeno izgleda na svim uređajima', color: '#00BFFF' },
              { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>', title: 'SEO Optimizacija', desc: 'Ugrađene SEO najbolje prakse od početka - rang na Google-u', color: '#FF6B9D' },
              { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>', title: 'Mobilni First', desc: 'Prilagođeno za mobilne korisnike - većina trafika dolazi sa mobitela', color: '#00FF88' },
              { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>', title: 'Sigurnost', desc: 'SSL certifikat, zaštita podataka i redovne sigurnosne nadogradnje', color: '#FF9500' },
              { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', title: 'Podrška & Održavanje', desc: 'Dugoročna podrška, praćenje i redovne nadogradnje', color: '#FF1493' }
            ].map((item, idx) => {
              const isMiddleCard = idx === 3; // Srednja kartica (4. kartica - 0 indexed)
              const bgGradient = 'radial-gradient(135% 135% at 0% 0%, rgba(255,255,255,0.05) 0%, transparent 50%)';
              
              return (
                <div key={idx} style={{ 
                  background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%), ${bgGradient}`,
                  padding: isMiddleCard ? '45px' : '40px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isMiddleCard ? 'scale(1.05)' : 'scale(1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${item.color}`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${item.color}40, inset 0 0 20px ${item.color}10`;
                  e.currentTarget.style.transform = isMiddleCard ? 'scale(1.08)' : 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = isMiddleCard ? 'scale(1.05)' : 'scale(1)';
                }}>
                  {/* Icon Container */}
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '12px',
                    background: `${item.color}15`,
                    border: `2px solid ${item.color}40`,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '20px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${item.color}25`;
                    e.currentTarget.style.boxShadow = `0 0 15px ${item.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${item.color}15`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ color: item.color, width: '32px', height: '32px' }} dangerouslySetInnerHTML={{ __html: item.svg }} />
                  </div>
                  
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#FFFFFF', fontWeight: '700' }}>{item.title}</h3>
                  <p style={{ color: '#A0A0A0', lineHeight: '1.8', fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES - What We Offer */}
      <section style={{ padding: '100px 24px', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header with Sub-title */}
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px', color: '#FFFFFF' }}>Digitalni Arsenal za Vaš Rast</h2>
            <p style={{ fontSize: '1.1rem', color: '#A0A0A0', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>Kompletna rešenja za vašu digitalnu transformaciju - od razvoja do optimizacije i održavanja</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
            {[
              {
                svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
                title: 'Custom Razvoj',
                desc: 'Zaboravite na ograničene šablone. Kreiramo unikatna digitalna rešenja od nule, koristeći React za vrhunske performanse i bezbednost. Svaki red koda pišemo sa fokusom na brzinu i skalabilnost, osiguravajući da vaš sajt izgleda premium i funkcioniše besprekorno na svim uređajima.'
              },
              {
                svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
                title: 'E-Commerce Profit',
                desc: 'Digitalna prodavnica mora da uliva poverenje i olakšava kupovinu. Naša rešenja optimizujemo za maksimalan ROI, kreirajući intuitivne putanje koje povećavaju konverziju. Implementiramo napredne sisteme za upravljanje zalihama, pružajući vam stabilnu platformu za rast prodaje.'
              },
              {
                svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
                title: 'Google Dominacija',
                desc: 'Biti na internetu nije isto što i biti vidljiv. Naša strategija vas postavlja ispred konkurencije kroz tehničku optimizaciju i link building. SEO Mačak ne juri samo saobraćaj, već kvalitetne posete koje se direktno transformišu u realan poslovni profit.'
              }
            ].map((service, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                padding: '45px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(253, 202, 64, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(253, 202, 64, 0.2), inset 0 0 30px rgba(253, 202, 64, 0.05)';
                // Fade out icon & title
                const iconDiv = e.currentTarget.querySelector('[data-icon-title]');
                if (iconDiv) {
                  iconDiv.style.opacity = '0';
                  iconDiv.style.pointerEvents = 'none';
                }
                // Show description
                const descDiv = e.currentTarget.querySelector('[data-description]');
                if (descDiv) {
                  descDiv.style.opacity = '1';
                  descDiv.style.visibility = 'visible';
                  descDiv.style.transform = 'translateY(0)';
                  descDiv.style.pointerEvents = 'auto';
                }
                // Show overlay
                const overlay = e.currentTarget.querySelector('[data-overlay]');
                if (overlay) {
                  overlay.style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
                // Fade in icon & title
                const iconDiv = e.currentTarget.querySelector('[data-icon-title]');
                if (iconDiv) {
                  iconDiv.style.opacity = '1';
                  iconDiv.style.pointerEvents = 'auto';
                }
                // Hide description
                const descDiv = e.currentTarget.querySelector('[data-description]');
                if (descDiv) {
                  descDiv.style.opacity = '0';
                  descDiv.style.visibility = 'hidden';
                  descDiv.style.transform = 'translateY(20px)';
                  descDiv.style.pointerEvents = 'none';
                }
                // Hide overlay
                const overlay = e.currentTarget.querySelector('[data-overlay]');
                if (overlay) {
                  overlay.style.opacity = '0';
                }
              }}>
                
                {/* Icon & Title - Always visible, fades out on hover */}
                <div data-icon-title style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  transition: 'opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 10,
                  opacity: 1
                }}>
                  {/* Icon Container */}
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '14px',
                    background: 'rgba(253, 202, 64, 0.1)',
                    border: '2px solid rgba(253, 202, 64, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                    transition: 'all 0.3s ease',
                    margin: '0 auto 15px auto'
                  }}>
                    <div style={{ color: '#FDCA40', width: '40px', height: '40px' }} dangerouslySetInnerHTML={{ __html: service.svg }} />
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    margin: 0,
                    transition: 'font-size 0.4s ease'
                  }}>{service.title}</h3>
                </div>

                {/* Description - Hidden by default, revealed on hover */}
                <div data-description style={{
                  position: 'absolute',
                  inset: '45px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  pointerEvents: 'none',
                  zIndex: 10
                }}>
                  <p style={{
                    color: '#FFFFFF',
                    lineHeight: '1.6',
                    fontSize: '1.05rem',
                    margin: 0,
                    textAlign: 'center',
                    fontWeight: '500',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}>{service.desc}</p>
                </div>

                {/* Overlay background that appears on hover */}
                <div data-overlay style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.7) 0%, rgba(20, 20, 20, 0.7) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                  zIndex: 1,
                  borderRadius: '16px'
                }} />
              </div>
            ))}
          </div>

          {/* Main CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link 
              to="/kontakt/" 
              style={{ textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer' }}
            >
              <div style={{
                background: '#FDCA40',
                color: '#000',
                padding: '20px 50px',
                fontSize: '1.3rem',
                borderRadius: '6px',
                fontWeight: '700',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                pointerEvents: 'auto',
                display: 'inline-block',
                whiteSpace: 'nowrap'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 0 50px rgba(253, 202, 64, 0.8), 0 0 80px rgba(253, 202, 64, 0.4), 0 15px 40px rgba(0, 0, 0, 0.3)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                Besplatna Konsultacija
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CAROUSEL PORTFOLIO SECTION - Horizontal Scrolling Track */}
      <div ref={portfolioContainerRef} style={{ position: 'relative', height: '350vh' }}>
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          width: '100%',
          background: '#000', 
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          zIndex: 100
        }}>
          {/* Static Section Title - Fixed at top, no animation */}
          <div 
            style={{
              position: 'absolute',
              top: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 20,
              pointerEvents: 'none'
            }}
          >
            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Naše Usluge</h2>
          </div>

          {/* Horizontal Carousel Track - All cards in one row */}
          <motion.div
            style={{
              x: carouselX,
              display: 'flex',
              gap: `${carouselValues.gap}px`,
              paddingLeft: `${carouselValues.paddingLeft}px`,
              paddingRight: `${carouselValues.paddingRight}px`,
              paddingTop: '120px',
              paddingBottom: '60px',
              minWidth: 'fit-content',
              height: 'auto'
            }}
          >
            {projects.map((project, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '60px',
                flexShrink: 0,
                flexWrap: 'wrap',
                width: 'min(1200px, 90vw)'
              }}>
                {/* Card Content - Text */}
                <div style={{ flex: '1 1 420px', paddingTop: '40px', minWidth: '280px', maxWidth: '500px' }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '20px', lineHeight: '1.3' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: '#A0A0A0', marginBottom: '30px', lineHeight: '1.8', maxWidth: '550px' }}>
                    {project.desc}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    maxWidth: '550px'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 16px',
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}40`,
                      borderRadius: '8px',
                      width: 'fit-content'
                    }}>
                      <span style={{ color: project.color, fontWeight: '700' }}>✓</span>
                      <span style={{ color: project.color, fontSize: '1rem', fontWeight: '600' }}>{project.result}</span>
                    </div>
                    <div style={{ color: '#808080', fontSize: '0.95rem' }}>
                      <span style={{ fontWeight: '600', color: '#A0A0A0' }}>Tehnologije:</span> {project.tech}
                    </div>
                  </div>
                </div>

                {/* Card Visual - Image/Placeholder */}
                <div style={{
                  flex: '1 1 420px',
                  minWidth: '280px',
                  height: '450px',
                  background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                  padding: '40px',
                  borderRadius: '16px',
                  border: `1px solid ${project.color}40`,
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 0 30px ${project.color}30`,
                  flexShrink: 0
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: project.color,
                    opacity: 0.8
                  }} />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    color: project.color,
                    opacity: 0.3,
                    fontSize: '3rem',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}>
                    {project.title.split(' ')[0]}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* PROCESS - How We Work - New Design */}
      <section style={{ padding: '120px 24px', background: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        {/* Animated moving background - diagonal pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%)',
            backgroundSize: '60px 60px',
            backgroundPosition: '0px 0px',
            opacity: 0.04,
            animation: 'moveDiagonalDots 3s linear infinite',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
        <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* First Block - Strategija i Otkrivanje (01+02) */}
          <div style={{ marginBottom: '120px', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '0',
              fontSize: '180px',
              fontWeight: '900',
              color: '#FDCA40',
              opacity: '0.15',
              zIndex: 0,
              pointerEvents: 'none',
              lineHeight: '1'
            }}>01</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '30px', lineHeight: '1.2' }}>
                Strategija i Otkrivanje
              </h3>
              <p style={{ fontSize: '1.3rem', color: '#FDCA40', fontWeight: '700', marginBottom: '25px', maxWidth: '800px' }}>
                Vaš biznis zaslužuje plan, a ne samo šablon
              </p>
              <p style={{ fontSize: '1.1rem', color: '#A0A0A0', lineHeight: '1.8', maxWidth: '850px', marginBottom: '35px' }}>
                Ne krećemo u rad dok ne upoznamo vašeg idealnog kupca. Fokusiramo se na:
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxWidth: '850px' }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  marginBottom: '20px',
                  fontSize: '1.1rem',
                  color: '#FFFFFF'
                }}>
                  <span style={{
                    flexShrink: 0,
                    marginTop: '2px',
                    color: '#FDCA40',
                    fontSize: '1.3rem'
                  }}>🔍</span>
                  <span><strong>Analizu konkurencije</strong> – da biste uvek bili korak ispred.</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  marginBottom: '20px',
                  fontSize: '1.1rem',
                  color: '#FFFFFF'
                }}>
                  <span style={{
                    flexShrink: 0,
                    marginTop: '2px',
                    color: '#FDCA40',
                    fontSize: '1.3rem'
                  }}>🏗️</span>
                  <span><strong>Arhitekturu sajta</strong> – logičnu za ljude, jasnu za Google.</span>
                </li>
              </ul>

              <p style={{ fontSize: '1rem', color: '#A0A0A0', lineHeight: '1.8', maxWidth: '850px', marginTop: '30px' }}>
                Istraživanje je temelj svega. Analiziramo šta radi najbolje za vašu konkurenciju, koje ključne reči stvarno donose traffic, i kako se vaši potencijalni klijenti ponašaju online. Planiramo logičnu strukturu sajta koja olakšava korisnicima da pronađu ono što trebaju, a istovremeno signalizira Google-u da je vašaj sadržaj relevantan i vredan rangiranja.
              </p>
            </div>
          </div>

          {/* Second Block - Inženjering i Preciznost (03+04) */}
          <div style={{ marginBottom: '120px', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '0',
              fontSize: '180px',
              fontWeight: '900',
              color: '#FDCA40',
              opacity: '0.15',
              zIndex: 0,
              pointerEvents: 'none',
              lineHeight: '1'
            }}>02</div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'right' }}>
              <h3 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '30px', lineHeight: '1.2' }}>
                Inženjering i Preciznost
              </h3>
              <p style={{ fontSize: '1.3rem', color: '#FDCA40', fontWeight: '700', marginBottom: '25px' }}>
                Kod koji pretraživači obožavaju
              </p>
              <p style={{ fontSize: '1.1rem', color: '#A0A0A0', lineHeight: '1.8', maxWidth: '100%', marginBottom: '35px' }}>
                Dok drugi samo 'prave sajt', mi optimizujemo svaki red koda za maksimalnu brzinu.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  marginBottom: '0px',
                  fontSize: '1.1rem',
                  color: '#FFFFFF',
                  textAlign: 'right',
                  flexDirection: 'row-reverse'
                }}>
                  <span style={{
                    flexShrink: 0,
                    marginTop: '2px',
                    color: '#FDCA40',
                    fontSize: '1.3rem'
                  }}>⚡</span>
                  <span><strong>Munjevit odziv</strong> – jer niko ne voli da čeka.</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  marginBottom: '0px',
                  fontSize: '1.1rem',
                  color: '#FFFFFF',
                  textAlign: 'right',
                  flexDirection: 'row-reverse'
                }}>
                  <span style={{
                    flexShrink: 0,
                    marginTop: '2px',
                    color: '#FDCA40',
                    fontSize: '1.3rem'
                  }}>✓</span>
                  <span><strong>Rigorozno testiranje</strong> – vaš sajt će raditi savršeno na svakom uređaju.</span>
                </li>
              </ul>

              <p style={{ fontSize: '1rem', color: '#A0A0A0', lineHeight: '1.8', maxWidth: '100%', marginTop: '30px', textAlign: 'right' }}>
                Tehnička kompleksnost je skrivena iza jednostavnog interfejsa. Koristimo najnovije alate i najbolje prakse za web razvoj - React za dinamičnost, optimizovane slike, minifikovani CSS i JavaScript, te sve što pravi sajt bržim. Svaki piksel, svaki JavaScript event je testiram, debugovan i optimizovan. Rezultat svega toga je vaš sajt koji se učitava u milisekundama, što donosi veću konverziju i bolje SEO rangiranje.
              </p>
            </div>
          </div>

          {/* Third Block - Lansiranje i Kontinuirani Rast (05+06) */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '0',
              fontSize: '180px',
              fontWeight: '900',
              color: '#FDCA40',
              opacity: '0.15',
              zIndex: 0,
              pointerEvents: 'none',
              lineHeight: '1'
            }}>03</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '30px', lineHeight: '1.2' }}>
                Lansiranje i Kontinuirani Rast
              </h3>
              <p style={{ fontSize: '1.3rem', color: '#FDCA40', fontWeight: '700', marginBottom: '25px' }}>
                Mi ne odlazimo nakon klika na <span style={{ fontWeight: '900' }}>"Publish"</span>
              </p>
              <p style={{ fontSize: '1.1rem', color: '#A0A0A0', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto 35px auto' }}>
                Lansiranje je samo početak. Pratimo rezultate i vršimo fina podešavanja kako bi vaš profit nastavio da raste.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  marginBottom: '0px',
                  fontSize: '1.1rem',
                  color: '#FFFFFF',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <span style={{
                    flexShrink: 0,
                    marginTop: '2px',
                    color: '#FDCA40',
                    fontSize: '1.3rem'
                  }}>📊</span>
                  <span><strong>Analiza ponašanja</strong> – saznajte šta vaši klijenti zapravo žele.</span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  marginBottom: '0px',
                  fontSize: '1.1rem',
                  color: '#FFFFFF',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <span style={{
                    flexShrink: 0,
                    marginTop: '2px',
                    color: '#FDCA40',
                    fontSize: '1.3rem'
                  }}>🛡️</span>
                  <span><strong>Stalna podrška</strong> – vaš sajt ostaje siguran, moderan i uvek optimizovan.</span>
                </li>
              </ul>

              <p style={{ fontSize: '1rem', color: '#A0A0A0', lineHeight: '1.8', maxWidth: '900px', margin: '30px auto 0 auto', textAlign: 'center' }}>
                Koristeći Google Analytics, heatmape i A/B testiranja, vidimo tačno kako korisnici stupaju u interakciju sa vašim sajtom. Gde ostaju duže, gde odustaju, koje stranice konvertuju? Radimo redovne izveštaje da imate na uvid sta se desava u pozadini. Dodajemo nove stranice, optimizujemo postojeće, i kontinuirano poboljsavamo SEO strategiju na osnovu stvarnih podataka, ne nagađanja. Vaš sajt se nikada ne „završava" – on se stalno evoluira da bi donosio što bolje rezultate.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA SECTION - Final Call To Action */}
      {/* CTA SECTION - Final Call To Action */}
      <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #FDCA40 0%, #FDD968 100%)', color: '#000', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#000' }}>Spreman Za Promenu?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: '0.95', color: '#000' }}>
            Hajde da napravimo sajt koji će doneti stvarne rezultate za vaš biznis.
          </p>
          <Link 
            to="/kontakt/" 
            style={{ textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <div style={{
              background: '#000',
              color: '#FDCA40',
              padding: '20px 50px',
              fontSize: '1.3rem',
              borderRadius: '6px',
              fontWeight: '700',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              pointerEvents: 'auto',
              display: 'inline-block',
              whiteSpace: 'nowrap'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 0 50px rgba(253, 202, 64, 0.8), 0 0 80px rgba(253, 202, 64, 0.4), 0 15px 40px rgba(0, 0, 0, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              Zatraži Besplatnu Konsultaciju
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
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
