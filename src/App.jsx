import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageTransition from './components/PageTransition'
import PinnedHeroSection from './components/PinnedHeroSection'
import About from './components/About'
import IzradaSajtova from './components/IzradaSajtova'
import SEO from './components/SEO'
import Blog from './components/Blog'
import Kontakt from './components/Kontakt'

export default function App(){
  return (
    <Router>
      <style>{`
        @keyframes moveDiagonalDots {
          from { background-position: 0px 0px; }
          to { background-position: 60px -60px; }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          backgroundImage: 'linear-gradient(45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%)',
          backgroundSize: '60px 60px',
          opacity: 0.8,
          animation: 'moveDiagonalDots 4s linear infinite',
          pointerEvents: 'none'
        }}
      />
      <PageTransition>
        <Routes>
          <Route path="/" element={<PinnedHeroSection />} />
          <Route path="/about/" element={<About />} />
          <Route path="/izrada-sajtova/" element={<IzradaSajtova />} />
          <Route path="/seo/" element={<SEO />} />
          <Route path="/blog/" element={<Blog />} />
          <Route path="/kontakt/" element={<Kontakt />} />
        </Routes>
      </PageTransition>
    </Router>
  )
}
