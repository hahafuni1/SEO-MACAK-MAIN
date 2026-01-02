import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const keyframes = `
  @keyframes moveDiagonalDots {
    from { background-position: 0px 0px; }
    to { background-position: 60px -60px; }
  }
`

export default function IzradaSajtova() {
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
            Kreiraj snažnu online prisutnost sa modernim, brzim i SEO-optimizovanim sajtovima koji konvertuju posjetioce u klijente.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ padding: '15px 40px', fontSize: '1.1rem', background: '#FDCA40', border: 'none', borderRadius: '5px', color: '#000', cursor: 'pointer', fontWeight: '600' }}>
              Zatraži Ponudu
            </button>
            <button style={{ padding: '15px 40px', fontSize: '1.1rem', background: 'transparent', border: '2px solid #FDCA40', borderRadius: '5px', color: '#FDCA40', cursor: 'pointer', fontWeight: '600' }}>
              Pogledaj Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Trust & Authority */}
      <section style={{ padding: '80px 24px', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Zašto Izabrati Nas?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { icon: '⚡', title: 'Brzi Sajtovi', desc: 'Optimizovani za brže učitavanje - veća konverzija i bolja SEO rangiranja' },
              { icon: '🎨', title: 'Moderni Dizajn', desc: 'Responsive dizajn koji savršeno izgleda na svim uređajima' },
              { icon: '🔍', title: 'SEO Optimizacija', desc: 'Ugrađene SEO najbolje prakse od početka - rang na Google-u' },
              { icon: '📱', title: 'Mobilni First', desc: 'Prilagođeno za mobilne korisnike - većina trafika dolazi sa mobitela' },
              { icon: '🔒', title: 'Sigurnost', desc: 'SSL certifikat, zaštita podataka i redovne sigurnosne nadogradnje' },
              { icon: '💬', title: 'Podrška & Održavanje', desc: 'Dugoročna podrška, praćenje i redovne nadogradnje' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#1a1a1a', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ color: '#b0b0b0', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - What We Offer */}
      <section style={{ padding: '80px 24px', background: '#111', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Naše Usluge</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '30px', border: 'left 4px solid #FDCA40' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Razvoj Custom Sajtova</h3>
              <p style={{ color: '#c0c0c0', marginBottom: '15px' }}>Jedinstveni sajtovi napravljen od nule prema vašim potrebama i brendu.</p>
              <ul style={{ color: '#a0a0a0', fontSize: '0.95rem', lineHeight: '1.8' }}>
                <li>✓ Custom HTML/CSS/JavaScript</li>
                <li>✓ React i moderne frontend tehnologije</li>
                <li>✓ Pozadinska integracija</li>
                <li>✓ Baze podataka</li>
              </ul>
            </div>

            <div style={{ padding: '30px', border: 'left 4px solid #FDCA40' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>E-Commerce Rješenja</h3>
              <p style={{ color: '#c0c0c0', marginBottom: '15px' }}>Prodaj online sa profesionalnim e-commerce platformama.</p>
              <ul style={{ color: '#a0a0a0', fontSize: '0.95rem', lineHeight: '1.8' }}>
                <li>✓ Katalog proizvoda</li>
                <li>✓ Sigurna plaćanja</li>
                <li>✓ Upravljanje zalihama</li>
                <li>✓ Analitika i izvještaji</li>
              </ul>
            </div>

            <div style={{ padding: '30px', border: 'left 4px solid #FDCA40' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>SEO Optimizacija</h3>
              <p style={{ color: '#c0c0c0', marginBottom: '15px' }}>Rang na prvoj stranici Google-a sa našim SEO strategijom.</p>
              <ul style={{ color: '#a0a0a0', fontSize: '0.95rem', lineHeight: '1.8' }}>
                <li>✓ Keyword istraživanje</li>
                <li>✓ On-page optimizacija</li>
                <li>✓ Technical SEO</li>
                <li>✓ Link building</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS - How We Work */}
      <section style={{ padding: '80px 24px', background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#FDCA40' }}>Naš Proces</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Konsultacija', desc: 'Razumijevanje vašeg poslovanja i ciljeva' },
              { step: '02', title: 'Planiranje', desc: 'Straterija, sitemap i dizajn koncepta' },
              { step: '03', title: 'Razvoj', desc: 'Kodiranje i implementacija funkcionalnosti' },
              { step: '04', title: 'Testiranje', desc: 'QA, sigurnost i optimizacija performansi' },
              { step: '05', title: 'Lansiranje', desc: 'Pokretanje i praćenje' },
              { step: '06', title: 'Podrška', desc: 'Održavanje i kontinuirana poboljšanja' }
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '25px', textAlign: 'center', background: '#1a1a1a', borderRadius: '8px' }}>
                <div style={{ fontSize: '2.5rem', color: '#FDCA40', fontWeight: '700', marginBottom: '10px' }}>{item.step}</div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA SECTION - Final Call To Action */}
      {/* CTA SECTION - Final Call To Action */}
      <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #FDCA40 0%, #FDD968 100%)', color: '#000', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#000' }}>Spreman Za Promjenu?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: '0.95', color: '#000' }}>
            Hajde da napravimo sajt koji će donijeti stvarne rezultate za vaš biznis.
          </p>
          <button style={{ padding: '18px 45px', fontSize: '1.1rem', background: '#000', border: 'none', borderRadius: '5px', color: '#FDCA40', cursor: 'pointer', fontWeight: '700' }}>
            Zatraži Besplatnu Konsultaciju
          </button>
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
