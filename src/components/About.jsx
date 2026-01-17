import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from './Header'

const keyframes = `
  @keyframes moveDiagonalDots {
    from { background-position: 0px 0px; }
    to { background-position: 60px -60px; }
  }
`

export default function About() {
  return (
    <>
      <style>{keyframes}</style>
      <div>
        <Header />

        {/* HERO SECTION */}
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
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%)',
            backgroundSize: '60px 60px',
            opacity: 0.1,
            animation: 'moveDiagonalDots 4s linear infinite',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '900px', position: 'relative', zIndex: 2, textAlign: 'center' }}
          >
            <div style={{ marginBottom: '20px', fontSize: '1.1rem', color: '#FDCA40', fontWeight: '700', letterSpacing: '2px' }}>
              👋 UPOZNAJTE NAS
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              marginBottom: '25px',
              fontWeight: '900',
              lineHeight: '1.15',
              color: '#fff'
            }}>
              Ko je <span style={{ color: '#FDCA40' }}>SEO Mačak</span>?
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              marginBottom: '35px',
              color: '#d0d0d0',
              lineHeight: '1.7',
              maxWidth: '750px',
              margin: '0 auto 35px'
            }}>
              Više od agencije. Manja od korporacije. Tačno pravi partner za vaš digitalni rast.
            </p>
          </motion.div>
        </section>

        {/* FOUNDER STORY */}
        <section style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  borderRadius: '16px',
                  border: '4px solid #000',
                  boxShadow: '8px 8px 0px 0px #FDCA40',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src="/marko-founder.jpeg" 
                    alt="Marko - Osnivač SEO Mačka" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top'
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 style={{
                  fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                  marginBottom: '30px',
                  fontWeight: '900',
                  color: '#fff'
                }}>
                  Pokrenut od <span style={{ color: '#FDCA40' }}>Strasti</span>, Vođen <span style={{ color: '#FDCA40' }}>Rezultatima</span>
                </h2>

                <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
                  <p style={{ color: '#b0b0b0', lineHeight: '1.8', fontSize: '1.05rem' }}>
                    Ja sam Marko, osnivač SEO Mačka. Prije 7 godina, bio sam obični developer koji je primjetio nešto: sve što gradim ostane nevidljivo bez dobroga SEO-a.
                  </p>
                  <p style={{ color: '#b0b0b0', lineHeight: '1.8', fontSize: '1.05rem' }}>
                    Tada sam se zaronio u SEO. Godinama eksperimentisanja, stotinama projekata i nebrojenim greškama kasnije, naučio sam šta čini razliku između sajtova koji zarađuju i onih koji ostaju skriveni.
                  </p>
                  <p style={{ color: '#b0b0b0', lineHeight: '1.8', fontSize: '1.05rem' }}>
                    Kada sam video koliku moć imali ovi principi, znao sam da trebam da ih dijelim - ne kroz velike agencije, već kroz direktnu, iskrenu pomoć razvijaču i vlasnicima biznesa.
                  </p>
                </div>

                <div style={{
                  padding: '25px',
                  background: 'rgba(253, 202, 64, 0.1)',
                  borderLeft: '4px solid #FDCA40',
                  borderRadius: '8px'
                }}>
                  <p style={{ color: '#FDCA40', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '1px' }}>
                    ✨ MISIJA
                  </p>
                  <p style={{ color: '#b0b0b0', marginTop: '10px', lineHeight: '1.6' }}>
                    Pomoći preduzetnicima i agencijama da izgare onaj prvi komad rasta na Google-u, bez tehničkih frikcija, bez praznih obećanja.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
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
                Kako Radimo <span style={{ color: '#FDCA40' }}>Drugačije</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#b0b0b0' }}>
                Nista od "odjedi za sve" pristupa.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              {[
                {
                  title: 'Personal Touch',
                  icon: '🤝',
                  desc: 'Ja sam vaš direkt - ne jezivac iz agencije. Svaki email odgovaram lično, svaki poziv vodim ja.'
                },
                {
                  title: 'Technical Depth',
                  icon: '⚙️',
                  desc: 'Developer sam od srca. Razumijem HTML, CSS, JavaScript, Core Web Vitals - sve. Bez glupljenja.'
                },
                {
                  title: 'Transparentnost',
                  icon: '📊',
                  desc: 'Vidite sve - rankings, trafik, konverzije. Live dashboard, mjesečni pozivi, bez skrivenih metrika.'
                },
                {
                  title: 'Dugoročni Razmisak',
                  icon: '🎯',
                  desc: 'Ne radim za brze pare. Gradim vaš sajt da radi godinama, ne godinama iskljucivanja.'
                },
                {
                  title: 'Provjeren Tim',
                  icon: '👥',
                  desc: 'Kada je potrebna dodatna ekspertiza, radim samo sa najboljima - nikada sa slučajnim izvodačima.'
                },
                {
                  title: 'Skalabilnost',
                  icon: '📈',
                  desc: 'Počinjemo mali sa vašim budžetom, rastemo zajedno kako raste vaš business.'
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
                    borderRadius: '12px'
                  }}
                  whileHover={{ borderColor: '#FDCA40', background: 'rgba(253, 202, 64, 0.12)' }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#fff', fontWeight: '800' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#a0a0a0', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CREDENTIALS & EXPERIENCE */}
        <section style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
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
                Moje <span style={{ color: '#FDCA40' }}>Iskustvo</span>
              </h2>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '40px',
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              {[
                { stat: '7+', label: 'Godina Iskustva' },
                { stat: '200+', label: 'Projekata Završeno' },
                { stat: '45+', label: 'Klijenta sa #1 Rankingom' },
                { stat: '$2.5M+', label: 'Revenue Generirano' },
                { stat: '98%', label: 'Stopa Zadovoljstva' },
                { stat: '15+', label: 'Industrija Pokrivenih' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: '900',
                    color: '#FDCA40',
                    marginBottom: '10px'
                  }}>
                    {item.stat}
                  </div>
                  <p style={{ color: '#b0b0b0', fontSize: '1rem' }}>{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div style={{
              background: '#000',
              border: '2px solid rgba(253, 202, 64, 0.2)',
              borderRadius: '12px',
              padding: '50px 30px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#FDCA40', fontWeight: '800' }}>
                Specijalizovan U:
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '20px'
              }}>
                {[
                  'E-Commerce SEO',
                  'Local SEO',
                  'Technical SEO',
                  'Content Strategy',
                  'Link Building',
                  'Competitive Analysis',
                  'Technical Development',
                  'React & Modern Frameworks',
                  'API Integration',
                  'Performance Optimization',
                  'Web Security',
                  'Analytics & Tracking'
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{
                      padding: '15px 20px',
                      background: 'rgba(253, 202, 64, 0.1)',
                      border: '1px solid rgba(253, 202, 64, 0.3)',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      color: '#FDCA40',
                      fontWeight: '600'
                    }}
                  >
                    ✓ {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALUES & PHILOSOPHY */}
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
                Naše <span style={{ color: '#FDCA40' }}>Vrijednosti</span>
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '35px' }}>
              {[
                {
                  title: 'Integritet Iznad Svega',
                  desc: 'Bez crnih šešira, bez spam-a, bez trikova. Ako nešto ne mogu dostići etički, nije način na koji ću raditi.'
                },
                {
                  title: 'Edukacija & Empolerment',
                  desc: 'Želim da razumijete šta radim. Suradnjom sam sa klijentima, podučavam ih, dajem im moć da sami vode bitke.'
                },
                {
                  title: 'Brz Odgovori',
                  desc: 'Nema čekanja. Nema "odgovoriću u 3 dana". Najčešće odgovaram u 24 sata ili manje.'
                },
                {
                  title: 'Inovacija & Učenje',
                  desc: 'SEO se ne mijenja - eksplodira. Uvijek učim, pratim trendove, primjenjujem to za vas.'
                },
                {
                  title: 'Responsibilnost',
                  desc: 'Rezultati su moji rezultati. Ako ranking padne, ja to rješavam - bez skupih "konsultacija".'
                },
                {
                  title: 'Community First',
                  desc: 'Vjerujem u dijeljenje znanja. Pokretač sam lokalnih SEO grupa, redovni speaker, mentor.'
                }
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{
                    padding: '35px',
                    background: 'linear-gradient(135deg, rgba(253, 202, 64, 0.1) 0%, rgba(253, 202, 64, 0.02) 100%)',
                    border: '2px solid rgba(253, 202, 64, 0.2)',
                    borderRadius: '12px',
                    borderLeft: '5px solid #FDCA40'
                  }}
                >
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: '#FDCA40', fontWeight: '800' }}>
                    {value.title}
                  </h3>
                  <p style={{ color: '#a0a0a0', lineHeight: '1.6' }}>
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENT TESTIMONIALS */}
        <section style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
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
                Šta Kažu Klijenti <span style={{ color: '#FDCA40' }}>O Meni</span>
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              {[
                {
                  name: 'Petar Radičević',
                  role: 'Vlasnik, Online Prodaja',
                  text: 'Marko je promijenio sve. Nije se ponašao kao tipična agencija. Bio je partner, mentor, savjet. Moj biznis je sada 5x veći nego prije.'
                },
                {
                  name: 'Jelena Milovanski',
                  role: 'Marketing Director, B2B Kompanija',
                  text: 'Poznavali smo SEO, ali nismo znali kako ga implementirati. Marko je bio strpljiv, edukovan, i rezultati su nevjerovatan.'
                },
                {
                  name: 'Dejan Krstić',
                  role: 'CEO, Tech Startup',
                  text: 'Najjednostavnije - Marko je najbolja investicija koju sam napravio. Bez njega, ne bi bilo IPO-a.'
                },
                {
                  name: 'Ana Pavlović',
                  role: 'Vlasnik, Local Business',
                  text: 'Nitko drugi nije mogao postići što je Marko. Ako trebate SEO koji radnički, oni su rešenje.'
                },
                {
                  name: 'Miloš Tomić',
                  role: 'Agency Owner',
                  text: 'Referenciram Marko svim klijentima koji trebaju SEO. Ja se fokusiram na design i razvoj, on radi čuda sa rankingom.'
                },
                {
                  name: 'Tamara Đorđević',
                  role: 'E-Commerce Manager',
                  text: 'Transparentnost, brzina, rezultati. Sve tri stvari. Nema tog razloga da ne bi radio sa Markom.'
                }
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  style={{
                    padding: '35px',
                    background: '#000',
                    border: '2px solid rgba(253, 202, 64, 0.15)',
                    borderRadius: '12px',
                    borderTop: '4px solid #FDCA40'
                  }}
                >
                  <div style={{ display: 'flex', marginBottom: '15px', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#FDCA40', fontSize: '1.1rem' }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: '#b0b0b0', marginBottom: '20px', fontStyle: 'italic', lineHeight: '1.7' }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p style={{ color: '#FDCA40', fontWeight: '800', fontSize: '0.95rem' }}>
                      {testimonial.name}
                    </p>
                    <p style={{ color: '#888', fontSize: '0.85rem' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
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
              Jeste Li Spreman Za Razgovor?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '40px',
              opacity: '0.95',
              lineHeight: '1.6'
            }}>
              Nema pritiska, nema provjera, nema obaveza. Samo iskrena analiza gdje se nalazite i gdje možete biti.
            </p>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1 }}
                style={{
                  padding: '18px 50px',
                  fontSize: '1.1rem',
                  background: '#000',
                  border: '3px solid #FDCA40',
                  borderRadius: '50px',
                  color: '#FDCA40',
                  cursor: 'pointer',
                  fontWeight: '900',
                  boxShadow: '5px 5px 0px 0px #C79F00',
                  transition: 'all 0.1s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px 0px #C79F00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px 0px #C79F00';
                }}
              >
                Zakaži Razgovor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1 }}
                style={{
                  padding: '18px 50px',
                  fontSize: '1.1rem',
                  background: 'transparent',
                  border: '3px solid #000',
                  borderRadius: '50px',
                  color: '#000',
                  cursor: 'pointer',
                  fontWeight: '900',
                  boxShadow: '5px 5px 0px 0px white',
                  transition: 'all 0.1s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px 0px white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '5px 5px 0px 0px white';
                }}
              >
                Pročitaj Blog
              </motion.button>
            </div>
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
                    borderRadius: '50px',
                    border: '3px solid #000',
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
