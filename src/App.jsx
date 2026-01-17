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
        /* Default static cursor */
        *, *::before, *::after {
          cursor: url('/cursors/default.png') 16 16, auto;
        }
        /* Interactive elements - pointer cursor on hover */
        button:hover, a:hover, [role="button"]:hover, 
        input[type="button"]:hover, input[type="submit"]:hover, input[type="reset"]:hover,
        .cursor-pointer:hover, .cta:hover, .nav-pill a:hover,
        .cartoon-service-card:hover, .card:hover,
        label:hover, summary:hover,
        [tabindex]:not([tabindex="-1"]):hover {
          cursor: url('/cursors/pointer.png') 16 16, pointer !important;
        }
        /* Form elements - always show pointer */
        input:not([type="hidden"]), textarea, select,
        input[type="checkbox"], input[type="radio"] {
          cursor: url('/cursors/pointer.png') 16 16, pointer !important;
        }
        /* Links - always show pointer */
        a, a:link, a:visited, a:hover, a:active,
        button, [role="button"] {
          cursor: url('/cursors/pointer.png') 16 16, pointer !important;
        }
        /* Drag and drop - grab cursors */
        [draggable="true"], .draggable, .drag-handle,
        [style*="cursor: grab"], [style*="cursor:grab"] {
          cursor: url('/cursors/pointer.png') 16 16, grab !important;
        }
        [draggable="true"]:active, .draggable:active, .drag-handle:active,
        [style*="cursor: grabbing"], [style*="cursor:grabbing"] {
          cursor: url('/cursors/pointer.png') 16 16, grabbing !important;
        }
        /* Children inherit pointer cursor */
        button *, a *, [role="button"] *, .cta *,
        .cartoon-service-card *, .card *, .nav-pill a * {
          cursor: inherit !important;
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
