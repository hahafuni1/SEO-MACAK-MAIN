import React, { useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const keyframes = `
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
`

export default function SEO() {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx)
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
              <div style={{ marginBottom: '20px', fontSize: '1.1rem', color: '#FDCA40', fontWeight: '700', letterSpacing: '2px' }}>
                🎯 DOMINACIJA NA GOOGLE-U
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                marginBottom: '25px',
                fontWeight: '900',
                lineHeight: '1.15',
                color: '#fff'
              }}>
                SEO Strategija Koja <span style={{ color: '#FDCA40' }}>Konvertuje</span>
              </h1>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                marginBottom: '35px',
                color: '#d0d0d0',
                lineHeight: '1.7',
                maxWidth: '800px',
                margin: '0 auto 35px'
              }}>
                Proverite svoju online prisutnost sa SEO strategijom koja ne samo da vam donosi trafik, već i kvalitetne klijente koji su spremni da se konvertuju. Mi ne činimo obećanja - mi donosimo rezultate.
              </p>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  style={{
                    padding: '16px 45px',
                    fontSize: '1.1rem',
                    background: '#FDCA40',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000',
                    cursor: 'pointer',
                    fontWeight: '700',
                    boxShadow: '0 8px 24px rgba(253, 202, 64, 0.3)'
                  }}
                >
                  Zatraži SEO Audit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  style={{
                    padding: '16px 45px',
                    fontSize: '1.1rem',
                    background: 'transparent',
                    border: '2px solid #FDCA40',
                    borderRadius: '8px',
                    color: '#FDCA40',
                    cursor: 'pointer',
                    fontWeight: '700'
                  }}
                >
                  Pogledaj Rezultate
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION - Social Proof */}
        <section style={{
          padding: '60px 24px',
          background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
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
                { stat: '+85%', label: 'Prosječan rast organskog trafika', icon: '📈' },
                { stat: '+120%', label: 'Povećanje konverzija', icon: '🎯' },
                { stat: '47', label: 'Klijenta sa rangom #1', icon: '👑' },
                { stat: '+350%', label: 'ROI u prvoj godini', icon: '💰' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY SEO MATTERS - Authority Building */}
        <section style={{
          padding: '100px 24px',
          background: '#000',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '70px' }}
            >
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Zašto SEO? Zašto <span style={{ color: '#FDCA40' }}>Sada</span>?
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#b0b0b0', maxWidth: '700px', margin: '0 auto' }}>
                73% online iskustva započinje pretraživanjem. Ako niste na vrhu, gubite klijente svakog dana.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '35px' }}>
              {[
                {
                  title: 'Dugoročne Rezultate',
                  desc: 'Za razliku od plaćene reklame, organsko rangiranje raste tokom vremena i postaje jefter.',
                  icon: '📊'
                },
                {
                  title: 'Kredibilnost i Povjerenje',
                  desc: 'Korisnici vjeruju više organskim rezultatima nego plaćenim oglasima.',
                  icon: '🏆'
                },
                {
                  title: 'Viši ROI',
                  desc: 'SEO traffic ima 3x veću stopu konverzije od plaćene reklame.',
                  icon: '💎'
                },
                {
                  title: 'Kompetitivna Prednost',
                  desc: 'Dok konkurenti razmislјaju, vi ćete dominirati vašom industriji.',
                  icon: '⚔️'
                },
                {
                  title: '24/7 Marketing',
                  desc: 'Vaš sajt radi za vas čak i kada ne radite. Bez pauziranja kampanja.',
                  icon: '🤖'
                },
                {
                  title: 'Skalabilnost',
                  desc: 'Kada ranking poraste, trafik raste bez dodatnog ulaganja.',
                  icon: '🚀'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  style={{
                    padding: '35px',
                    background: 'linear-gradient(135deg, rgba(253, 202, 64, 0.08) 0%, rgba(253, 202, 64, 0.02) 100%)',
                    border: '2px solid rgba(253, 202, 64, 0.2)',
                    borderRadius: '12px',
                    transition: 'all 0.3s'
                  }}
                  whileHover={{ borderColor: '#FDCA40', background: 'rgba(253, 202, 64, 0.12)' }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#fff' }}>{item.title}</h3>
                  <p style={{ color: '#a0a0a0', lineHeight: '1.6' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES OFFERED - SEO Packages */}
        <section style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '70px' }}
            >
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Naše SEO <span style={{ color: '#FDCA40' }}>Usluge</span>
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
              {[
                {
                  title: 'Technical SEO Audit',
                  desc: 'Detaljno skeniranje vašeg sajta za pronalaženje problema koji sprečavaju rangiranje.',
                  items: ['Siteamp analiza', 'Brzina učitavanja', 'Mobile-friendliness', 'SSL sigurnost', 'Structured Data', 'Crawl problemi']
                },
                {
                  title: 'Keyword Strategy & Research',
                  desc: 'Pronalaženje visoko-vrijednih ključnih reči sa visokim potencijalom konverzije.',
                  items: ['Konkurentska analiza', 'Search intent mapping', 'Long-tail keywords', 'Local keywords', 'Trend analiza', 'Monetizacijska vrijednost']
                },
                {
                  title: 'On-Page Optimization',
                  desc: 'Optimizacija sadržaja, meta tagova i strukture za maksimalan ranking potencijal.',
                  items: ['Meta optimizacija', 'Heading struktura', 'Sadržaj optimizacija', 'Internal linking', 'Schema markup', 'Image optimization']
                },
                {
                  title: 'Content Strategy & Creation',
                  desc: 'Kreiraj sadržaj koji ranka i konvertuje posjetioce u klijente.',
                  items: ['Content calendar', 'Pillar pages', 'Blog posts', 'Topic clustering', 'E-books & guides', 'Case studies']
                },
                {
                  title: 'Link Building & Authority',
                  desc: 'Izgradnja autoriteta kroz visoko-kvalitetne backlinks od relevantnih sajtova.',
                  items: ['Prospect research', 'Outreach kampanja', 'Guest posting', 'Digital PR', 'Broken link building', 'Competitor analysis']
                },
                {
                  title: 'Local SEO',
                  desc: 'Dominacija lokalnih pretrage - postani #1 u tvojoj regiji.',
                  items: ['Google Business Profile', 'Local citations', 'Review management', 'Local content', 'Location pages', 'Map optimization']
                }
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{
                    padding: '40px',
                    background: '#000',
                    border: '2px solid rgba(253, 202, 64, 0.15)',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ borderColor: '#FDCA40', boxShadow: '0 0 30px rgba(253, 202, 64, 0.2)' }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#FDCA40',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s'
                  }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#FDCA40', fontWeight: '800' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#b0b0b0', marginBottom: '20px', lineHeight: '1.6' }}>
                    {service.desc}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {service.items.map((item, i) => (
                      <div key={i} style={{ fontSize: '0.9rem', color: '#a0a0a0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#FDCA40', fontWeight: '800' }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
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
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '70px' }}
            >
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Naš Proveren <span style={{ color: '#FDCA40' }}>Proces</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#b0b0b0' }}>
                Nije čarolija - to je strateški pristup zasnovan na godinama iskustva
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
              {[
                {
                  phase: '01',
                  title: 'Discovery & Audit',
                  desc: 'Detaljno skeniranje vašeg sajta, konkurencije i industrije'
                },
                {
                  phase: '02',
                  title: 'Strategy',
                  desc: 'Kreiramo prilagođenu SEO strategiju bazirano na vašim cilјevima'
                },
                {
                  phase: '03',
                  title: 'Implementation',
                  desc: 'Počinjemo sa on-page, technical i content optimizacijom'
                },
                {
                  phase: '04',
                  title: 'Authority Building',
                  desc: 'Izgradnja linkova i jačanje autoriteta vašeg brenda'
                },
                {
                  phase: '05',
                  title: 'Monitoring & Reporting',
                  desc: 'Redovni izvještaji, analytics i transparentnost'
                },
                {
                  phase: '06',
                  title: 'Optimization',
                  desc: 'Kontinuirana poboljšanja bazirano na podacima i rezultatima'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{
                    padding: '30px',
                    background: 'linear-gradient(135deg, rgba(253, 202, 64, 0.1) 0%, rgba(253, 202, 64, 0.02) 100%)',
                    border: '2px solid rgba(253, 202, 64, 0.15)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: '900',
                    color: '#FDCA40',
                    marginBottom: '15px',
                    opacity: 0.8
                  }}>
                    {item.phase}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fff', fontWeight: '800' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#a0a0a0', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES - Real Results */}
        <section style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '70px' }}
            >
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Dokazani <span style={{ color: '#FDCA40' }}>Rezultati</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#b0b0b0' }}>
                Pogledajte kako smo transformisali biznis naših klijenta kroz SEO
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
              {[
                {
                  client: 'E-Commerce Kompanija',
                  industry: 'Online Prodaja',
                  before: '15 monthly conversions',
                  after: '120+ monthly conversions',
                  growth: '+800%',
                  metrics: ['Organic traffic: +320%', 'Keyword rankings: 150+ top 10', 'ROI: 450%']
                },
                {
                  client: 'Local Service Business',
                  industry: 'Usluge',
                  before: '2-3 upita po mjesecu',
                  after: '35+ upita po mjesecu',
                  growth: '+1,150%',
                  metrics: ['Local visibility: #1 za 8 ključnih reči', 'Google My Business: +420% views', 'Phone calls: +380%']
                },
                {
                  client: 'B2B SaaS Platform',
                  industry: 'Software',
                  before: 'Nevidljivi u pretrazi',
                  after: 'Lider u industriji',
                  growth: '+650%',
                  metrics: ['Organic leads: +250 po mjesecu', 'Domain authority: 18→52', 'Monthly users: +580%']
                }
              ].map((caseStudy, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  style={{
                    padding: '40px',
                    background: '#000',
                    border: '2px solid rgba(253, 202, 64, 0.2)',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(90deg, #FDCA40, transparent)',
                  }} />
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#fff', fontWeight: '800' }}>
                    {caseStudy.client}
                  </h3>
                  <p style={{ color: '#FDCA40', fontSize: '0.9rem', marginBottom: '20px', fontWeight: '600' }}>
                    {caseStudy.industry}
                  </p>

                  <div style={{
                    background: 'rgba(253, 202, 64, 0.08)',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ color: '#a0a0a0' }}>Prije:</span>
                      <span style={{ color: '#b0b0b0', fontWeight: '600' }}>{caseStudy.before}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#a0a0a0' }}>Sada:</span>
                      <span style={{ color: '#FDCA40', fontWeight: '800' }}>{caseStudy.after}</span>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '2.2rem',
                    fontWeight: '900',
                    color: '#FDCA40',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    {caseStudy.growth}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(253, 202, 64, 0.2)', paddingTop: '20px' }}>
                    {caseStudy.metrics.map((metric, i) => (
                      <div key={i} style={{ fontSize: '0.95rem', color: '#a0a0a0', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#FDCA40' }}>▸</span> {metric}
                      </div>
                    ))}
                  </div>
                </motion.div>
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
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '70px' }}
            >
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Šta Kažu <span style={{ color: '#FDCA40' }}>Naši Klijenti</span>
              </h2>
            </motion.div>

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
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Detailed Answers */}
        <section style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '70px' }}
            >
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                Često Postavljana <span style={{ color: '#FDCA40' }}>Pitanja</span>
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gap: '20px' }}>
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
                  a: 'Mjesečni detalјni izvještaji sa svim bitnim metrikama - rankings, trafik, konverzije. Pristup live dashboard-u gdje možete pratiti sve u realnom vremenu. Redovne check-in pozive.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    background: '#000',
                    border: '2px solid rgba(253, 202, 64, 0.15)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '25px',
                      background: expandedFaq === idx ? 'rgba(253, 202, 64, 0.1)' : 'transparent',
                      border: 'none',
                      color: '#fff',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'background 0.3s'
                    }}
                  >
                    <h4 style={{ fontSize: '1.1rem', color: expandedFaq === idx ? '#FDCA40' : '#fff', fontWeight: '700', margin: 0 }}>
                      {item.q}
                    </h4>
                    <span style={{ fontSize: '1.5rem', color: '#FDCA40', transition: 'transform 0.3s', transform: expandedFaq === idx ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      +
                    </span>
                  </button>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      style={{
                        padding: '0 25px 25px',
                        borderTop: '1px solid rgba(253, 202, 64, 0.2)',
                        color: '#b0b0b0',
                        lineHeight: '1.7'
                      }}
                    >
                      {item.a}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO CHECKLIST - Value Add */}
        <section style={{
          padding: '100px 24px',
          background: '#000',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ textAlign: 'center', marginBottom: '70px' }}
            >
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                marginBottom: '20px',
                fontWeight: '900',
                color: '#fff'
              }}>
                SEO <span style={{ color: '#FDCA40' }}>Checklist</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#b0b0b0' }}>
                Besplatnu za preuzimanje - koristite je za sebe ili nam pošaljite vašu stranicu za audit
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '50px' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#FDCA40', fontWeight: '800' }}>
                  Technical SEO
                </h3>
                {[
                  'Site speed < 2 sekunde',
                  'Mobile responsive design',
                  'SSL certifikat (HTTPS)',
                  'XML sitemap',
                  'Robots.txt optimizovano',
                  'Structured data (Schema)',
                  'Core Web Vitals passed',
                  'No crawl errors'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', padding: '10px 0', borderBottom: '1px solid rgba(253, 202, 64, 0.1)' }}>
                    <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    <span style={{ color: '#a0a0a0' }}>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#FDCA40', fontWeight: '800' }}>
                  On-Page SEO
                </h3>
                {[
                  'Unique title tags (50-60 chars)',
                  'Meta descriptions',
                  'H1 sa primary keyword',
                  'LSI keywords u sadržaju',
                  'Internal linking strategija',
                  'Image alt text',
                  'Content length > 1000 reči',
                  'Readability score > 60'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', padding: '10px 0', borderBottom: '1px solid rgba(253, 202, 64, 0.1)' }}>
                    <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    <span style={{ color: '#a0a0a0' }}>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              style={{
                width: '100%',
                padding: '18px',
                background: '#FDCA40',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(253, 202, 64, 0.3)'
              }}
            >
              Preuzmi Kompletan SEO Checklist (PDF)
            </motion.button>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: '18px 50px',
                  fontSize: '1.1rem',
                  background: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FDCA40',
                  cursor: 'pointer',
                  fontWeight: '900',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                }}
              >
                Zatraži Besplatni SEO Audit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: '18px 50px',
                  fontSize: '1.1rem',
                  background: 'transparent',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  color: '#000',
                  cursor: 'pointer',
                  fontWeight: '900'
                }}
              >
                Zakaži Konsultaciju
              </motion.button>
            </div>

            <p style={{ marginTop: '30px', fontSize: '0.95rem', opacity: '0.8' }}>
              Nema obveza. Nema kreditne kartice potrebne. Nema spam-a. Samo konkretnе rezultate.
            </p>
          </motion.div>
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

              {/* RIGHT SIDE - BUTTON */}
              <div style={{ marginLeft: 'auto', marginRight: '-210npx', paddingRight: '24px', display: 'flex', alignItems: 'flex-start', marginTop: '40px' }}>
                <Link to="/kontakt/" style={{ textDecoration: 'none', pointerEvents: 'auto', cursor: 'pointer' }}>
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
                    e.target.style.transform = 'translateY(-8px) scale(1.08)';
                    e.target.style.boxShadow = '0 0 50px rgba(253, 202, 64, 0.8), 0 0 80px rgba(253, 202, 64, 0.4), 0 15px 40px rgba(0, 0, 0, 0.3)';
                  }} onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}>
                    Kontakt
                  </div>
                </Link>
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