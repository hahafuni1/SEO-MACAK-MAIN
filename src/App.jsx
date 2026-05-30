import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageTransition from './components/PageTransition'
import HomePage from './components/HomePage'
import About from './components/About'
import IzradaSajtova from './components/IzradaSajtova'
import SEO from './components/SEO'
import Blog from './components/Blog'
import Kontakt from './components/Kontakt'
import NotFound from './components/NotFound'
import CaseStudies from './components/CaseStudies'
import CaseStudyKomotraks from './components/CaseStudyKomotraks'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import Footer from './components/Footer'

// App renders routes + global decorations.
// Router context (BrowserRouter / MemoryRouter) is provided by the entry point
// so that entry-server.jsx can use MemoryRouter without window dependency.
// LanguageProvider lives inside the Router (in the entry points) so it can
// call useLocation() to derive the current language from the URL.
// Cursor CSS lives in css/styles.css (not here) to avoid SSR hydration mismatch
// caused by React HTML-encoding apostrophes in url() strings.
export default function App() {
  return (
    <>
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
          {/* Serbian routes (default / canonical) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about/" element={<About />} />
          <Route path="/izrada-sajtova/" element={<IzradaSajtova />} />
          <Route path="/seo/" element={<SEO />} />
          <Route path="/blog/" element={<Blog />} />
          <Route path="/kontakt/" element={<Kontakt />} />

          {/* English routes — same components, language derived from /en/ prefix */}
          <Route path="/en/" element={<HomePage />} />
          <Route path="/en/about/" element={<About />} />
          <Route path="/en/web-development/" element={<IzradaSajtova />} />
          <Route path="/en/seo/" element={<SEO />} />
          <Route path="/en/blog/" element={<Blog />} />
          <Route path="/en/contact/" element={<Kontakt />} />
          <Route path="/en/case-studies/" element={<CaseStudies />} />
          <Route path="/en/case-studies/komotraks/" element={<CaseStudyKomotraks />} />
          <Route path="/en/privacy/" element={<Privacy />} />
          <Route path="/en/terms/" element={<Terms />} />

          {/* Serbian new pages */}
          <Route path="/case-studies/" element={<CaseStudies />} />
          <Route path="/case-studies/komotraks/" element={<CaseStudyKomotraks />} />
          <Route path="/privatnost/" element={<Privacy />} />
          <Route path="/uslovi/" element={<Terms />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </PageTransition>
    </>
  )
}
