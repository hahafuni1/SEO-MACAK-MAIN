import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from './Link'
import Header from './Header'

const keyframes = `
  @keyframes moveDiagonalDots {
    from { background-position: 0px 0px; }
    to { background-position: 60px -60px; }
  }
`

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const articles = [
    {
      category: 'seo',
      title: '10 Razloga Zašto Vaš SEO Nije Funkcionisao (i Kako To Ispraviti)',
      excerpt: 'Analizirali smo 500+ failed SEO kampanja. Evo šta se ispostavilo kao najveće greške koje klijenti prave...',
      date: 'Dec 28, 2025',
      readTime: '8 min',
      tags: ['SEO', 'Strategy', 'Mistakes'],
      image: '🎯'
    },
    {
      category: 'seo',
      title: 'Kako Google Koristi AI Za Rangiranje - 2025 Vodiči',
      excerpt: 'Google se komplatno promijenio sa AI integracijama. Evo kako to utiče na vašu SEO strategiju...',
      date: 'Dec 25, 2025',
      readTime: '12 min',
      tags: ['AI', 'Google', 'Future of SEO'],
      image: '🤖'
    },
    {
      category: 'technical',
      title: 'Core Web Vitals Mastery: Kompletan Vodič za Brze Sajtove',
      excerpt: 'Učite kako optimizovati CLS, LCP i FID za brutalne mejnine performansi i bolji ranking...',
      date: 'Dec 22, 2025',
      readTime: '10 min',
      tags: ['Technical SEO', 'Performance', 'Core Web Vitals'],
      image: '⚡'
    },
    {
      category: 'content',
      title: 'Content Strategy Koja Rangira: Framework Od A Do Ž',
      excerpt: 'Radi li pisanje sadržaja bez strategije? Evo kako strukturirati content koji Google voli...',
      date: 'Dec 18, 2025',
      readTime: '15 min',
      tags: ['Content', 'Strategy', 'Writing'],
      image: '📝'
    },
    {
      category: 'seo',
      title: 'Lokalni SEO Za Male Biznise: Praktični Recept',
      excerpt: 'Ako ste mali lokal biznis, evo kako dominirati lokalnim pretraživanjem sa minimalnim budžetom...',
      date: 'Dec 15, 2025',
      readTime: '7 min',
      tags: ['Local SEO', 'GMB', 'Small Business'],
      image: '📍'
    },
    {
      category: 'technical',
      title: 'Linkovi: Kako Zaista Funkcionisuje Link Building 2025',
      excerpt: 'Link building se komplatno promijenio. Evo novog pristupa koji radnički zaista donosi rezultate...',
      date: 'Dec 12, 2025',
      readTime: '11 min',
      tags: ['Link Building', 'Authority', 'Backlinks'],
      image: '🔗'
    },
    {
      category: 'content',
      title: 'E-A-T & YMYL: Kako Zadobiti Povjerenje Google-a',
      excerpt: 'YMYL sajtovi trebaju E-A-T. Evo kako pokazati Google-u da ste ekspert, autoriteta i validan...',
      date: 'Dec 10, 2025',
      readTime: '9 min',
      tags: ['E-A-T', 'Authority', 'Trust'],
      image: '👑'
    },
    {
      category: 'seo',
      title: 'Competitive Analysis Za SEO: Šta Rade Pobjednici',
      excerpt: 'Analiziramo konkurente kako bi razumjeli šta i kako rade. Evo step-by-step procesa...',
      date: 'Dec 8, 2025',
      readTime: '10 min',
      tags: ['Competitor Analysis', 'Strategy', 'Research'],
      image: '🔍'
    },
    {
      category: 'technical',
      title: 'Page Speed Optimizacija: Moj Kompletna Toolkit',
      excerpt: 'Učite sve tehnike za ubrzanje sajta - od image optimization do caching strategije...',
      date: 'Dec 5, 2025',
      readTime: '13 min',
      tags: ['Page Speed', 'Performance', 'Technical'],
      image: '🚀'
    },
    {
      category: 'content',
      title: 'SEO Copywriting: Kako Pisati Za Google I Ljude',
      excerpt: 'Trik je pisati sadržaj koji Google rangira ILI čitaoci vole. Evo kako biti oba...',
      date: 'Dec 2, 2025',
      readTime: '8 min',
      tags: ['Copywriting', 'Content', 'Writing'],
      image: '✍️'
    }
  ]

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory)

  const categories = [
    { id: 'all', label: 'Sve Članke' },
    { id: 'seo', label: 'SEO Strategija' },
    { id: 'technical', label: 'Tehnički SEO' },
    { id: 'content', label: 'Sadržaj' }
  ]

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
          minHeight: '600px',
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
              📚 ZNANJE & INSIGHTS
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              marginBottom: '25px',
              fontWeight: '900',
              lineHeight: '1.15',
              color: '#fff'
            }}>
              SEO Blog: Pravi Savjeti, <span style={{ color: '#FDCA40' }}>Bez Bullshita</span>
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              marginBottom: '35px',
              color: '#d0d0d0',
              lineHeight: '1.7',
              maxWidth: '750px',
              margin: '0 auto 35px'
            }}>
              Artikli o SEO, razvoju, i strategiji pisani od osobe koja je zaista radila (i neuspjela) tisuće puta.
            </p>
          </motion.div>
        </section>

        {/* CATEGORY FILTER */}
        <section style={{
          padding: '60px 24px 40px',
          background: '#000',
          color: '#fff',
          borderBottom: '2px solid rgba(253, 202, 64, 0.2)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    padding: '12px 28px',
                    background: selectedCategory === cat.id ? '#FDCA40' : 'transparent',
                    color: selectedCategory === cat.id ? '#000' : '#FDCA40',
                    border: `2px solid ${selectedCategory === cat.id ? '#FDCA40' : 'rgba(253, 202, 64, 0.5)'}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section style={{
          padding: '80px 24px',
          background: '#000',
          color: '#fff'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '35px'
              }}
            >
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(253, 202, 64, 0.08) 0%, rgba(253, 202, 64, 0.02) 100%)',
                    border: '2px solid rgba(253, 202, 64, 0.15)',
                    borderRadius: '12px',
                    padding: '0',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  whileHover={{
                    borderColor: '#FDCA40',
                    boxShadow: '0 0 30px rgba(253, 202, 64, 0.2)',
                    y: -5
                  }}
                >
                  {/* Image/Icon */}
                  <div style={{
                    height: '180px',
                    background: 'linear-gradient(135deg, rgba(253, 202, 64, 0.1) 0%, rgba(253, 202, 64, 0.05) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '60px',
                    borderBottom: '1px solid rgba(253, 202, 64, 0.1)'
                  }}>
                    {article.image}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#FDCA40',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>
                        {article.category.toUpperCase()}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '800',
                      marginBottom: '12px',
                      color: '#fff',
                      lineHeight: '1.4',
                      flex: 1
                    }}>
                      {article.title}
                    </h3>

                    <p style={{
                      fontSize: '0.95rem',
                      color: '#a0a0a0',
                      marginBottom: '20px',
                      lineHeight: '1.5'
                    }}>
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '18px',
                      flexWrap: 'wrap'
                    }}>
                      {article.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.75rem',
                            background: 'rgba(253, 202, 64, 0.15)',
                            color: '#FDCA40',
                            padding: '5px 12px',
                            borderRadius: '4px',
                            fontWeight: '600'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '15px',
                      borderTop: '1px solid rgba(253, 202, 64, 0.1)',
                      fontSize: '0.85rem',
                      color: '#888'
                    }}>
                      <span>{article.date}</span>
                      <span>{article.readTime} read</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {filteredArticles.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                <p style={{ fontSize: '1.2rem', color: '#888' }}>
                  Nema članaka u ovoj kategoriji. Uskoro dolaze...
                </p>
              </div>
            )}
          </div>
        </section>

        {/* NEWSLETTER SIGNUP */}
        <section style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          color: '#fff'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '50px 35px',
              background: '#000',
              border: '2px solid rgba(253, 202, 64, 0.2)',
              borderRadius: '12px'
            }}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '900',
              marginBottom: '15px',
              color: '#fff'
            }}>
              Primi Svoje <span style={{ color: '#FDCA40' }}>Sabjete</span>
            </h2>
            <p style={{
              color: '#b0b0b0',
              marginBottom: '30px',
              fontSize: '1.05rem',
              lineHeight: '1.6'
            }}>
              Najbolje SEO artikli direktno u vašu inbox svaki petak. Bez spam-a, samo pravi savjeti.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <input
                type="email"
                placeholder="Unesite vašu email..."
                style={{
                  padding: '14px 18px',
                  background: 'rgba(253, 202, 64, 0.1)',
                  border: '2px solid rgba(253, 202, 64, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FDCA40'
                  e.target.style.background = 'rgba(253, 202, 64, 0.15)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(253, 202, 64, 0.3)'
                  e.target.style.background = 'rgba(253, 202, 64, 0.1)'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                style={{
                  padding: '14px 30px',
                  background: '#FDCA40',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#000',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(253, 202, 64, 0.3)'
                }}
              >
                Pretplati Se
              </motion.button>
            </div>
            <p style={{ marginTop: '15px', fontSize: '0.85rem', color: '#888' }}>
              Bez spam-a • Odjava u bilo kojem trenutku
            </p>
          </motion.div>
        </section>

        {/* FEATURED ARTICLES SECTION */}
        <section style={{
          padding: '100px 24px',
          background: '#000',
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
                Najčitaniji <span style={{ color: '#FDCA40' }}>Članci</span>
              </h2>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '35px'
            }}>
              {[
                {
                  title: '10 SEO Greške Koje Koštaju Vam $100,000',
                  views: '12,450',
                  shares: '340',
                  rating: '4.9'
                },
                {
                  title: 'Kako Iz 0 Doći Do $10K/Mjesečnog Trafika Sa SEO',
                  views: '8,920',
                  shares: '250',
                  rating: '4.8'
                },
                {
                  title: 'Novi Google Algorithm 2025: Što Se Promijenjeno',
                  views: '7,680',
                  shares: '180',
                  rating: '4.7'
                }
              ].map((article, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{
                    padding: '35px',
                    background: 'linear-gradient(135deg, rgba(253, 202, 64, 0.1) 0%, rgba(253, 202, 64, 0.02) 100%)',
                    border: '2px solid rgba(253, 202, 64, 0.15)',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                  whileHover={{ borderColor: '#FDCA40', y: -5 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
                    <span style={{ color: '#FDCA40', fontWeight: '800' }}>{article.rating}</span>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>({article.views} views)</span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#fff', fontWeight: '800', lineHeight: '1.4' }}>
                    {article.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#888' }}>
                    <span>👁️ {article.views} views</span>
                    <span>📤 {article.shares} shares</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
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
              Trebate Praktičan Savjet?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '40px',
              opacity: '0.95',
              lineHeight: '1.6'
            }}>
              Blog je odličan, ali ništa ne pomaže kao personalizirani SEO audit i strategija. Hajde da razgovaramo o vašem specifičnom slučaju.
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