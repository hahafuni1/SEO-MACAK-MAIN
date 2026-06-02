import { motion } from 'framer-motion'
import ScrollAwareHeader from './ScrollAwareHeader'
import SEOHead from './SEOHead'
import { useLanguage } from '../contexts/LanguageContext'
import { breadcrumbSchema } from '../lib/schema/breadcrumbs'
import { BASE_URL } from '../lib/routes'

const LIGHT_BG = '#FBFAF8'
const SECTION_PAD_X = 'clamp(24px, 5vw, 64px)'
const CONTAINER_MAX = '800px'

export default function Terms() {
  const { language } = useLanguage()
  const isEN = language === 'en'

  const breadcrumbs = isEN
    ? [{ name: 'Terms of Service', url: BASE_URL + '/en/terms/' }]
    : [{ name: 'Uslovi Korišćenja', url: BASE_URL + '/uslovi/' }]

  return (
    <>
      <SEOHead>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(breadcrumbs))}</script>
      </SEOHead>
      <ScrollAwareHeader />

      <section style={{
        background: LIGHT_BG,
        minHeight: '100vh',
        padding: `clamp(120px, 16vh, 180px) ${SECTION_PAD_X} clamp(80px, 12vh, 120px)`,
      }}>
        <div style={{ maxWidth: CONTAINER_MAX, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {isEN ? <TermsEN /> : <TermsSR />}
          </motion.div>
        </div>
      </section>
    </>
  )
}

const prose = {
  h1: { fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 16px', lineHeight: 1.05 },
  date: { fontSize: '0.85rem', color: '#888', marginBottom: '56px', display: 'block' },
  h2: { fontSize: '1.25rem', fontWeight: 800, marginTop: '48px', marginBottom: '12px' },
  p: { fontSize: '1rem', lineHeight: 1.8, color: '#333', marginBottom: '16px' },
  ul: { paddingLeft: '24px', marginBottom: '16px', color: '#333', lineHeight: 2 },
  a: { color: '#000', textDecoration: 'underline' },
}

function TermsSR() {
  return (
    <>
      <h1 style={prose.h1}>Uslovi Korišćenja</h1>
      <span style={prose.date}>Poslednje ažuriranje: 30. maja 2026.</span>

      <h2 style={prose.h2}>1. Ugovorne strane</h2>
      <p style={prose.p}>
        Ovi uslovi uređuju poslovni odnos između SEO Mačak (pružalac usluga, u daljem tekstu "SEO Mačak")
        i klijenta koji naruči usluge putem ovog sajta ili direktnom komunikacijom.
      </p>

      <h2 style={prose.h2}>2. Usluge</h2>
      <p style={prose.p}>SEO Mačak pruža sledeće usluge:</p>
      <ul style={prose.ul}>
        <li>SEO optimizacija (tehnički SEO, on-page, link building, lokalni SEO)</li>
        <li>Izrada sajtova i web aplikacija (React, WordPress)</li>
        <li>Performance optimizacija</li>
        <li>Mesečno praćenje i izveštavanje</li>
      </ul>
      <p style={prose.p}>
        Tačan obim posla definiše se ponudom pre početka saradnje. Sve promene obima moraju biti dogovorene pisanim putem.
      </p>

      <h2 style={prose.h2}>3. Plaćanje</h2>
      <p style={prose.p}>
        Plaćanje se vrši prema dogovorenoj dinamici iz ponude (avans, mesečno ili po etapama).
        Kašnjenje u plaćanju daje SEO Mačak pravo na privremenu obustavu radova.
        Fakture se ispostavljaju elektronskim putem.
      </p>

      <h2 style={prose.h2}>4. Trajanje i raskid</h2>
      <p style={prose.p}>
        Ugovor važi do završetka dogovorenog posla ili, kod mesečnih usluga, dok jedna od strana ne otkaže
        sa otkaznim rokom od 15 dana. Klijent zadržava sve materijale i pristupe koji su mu isporučeni.
      </p>

      <h2 style={prose.h2}>5. Autorska prava i vlasništvo</h2>
      <p style={prose.p}>
        Po finalnoj uplati, klijent stiče potpuno vlasništvo nad isporučenim sajtom, kodom i sadržajem.
        SEO Mačak zadržava pravo da projekat pomene kao referencu (uz saglasnost klijenta).
      </p>

      <h2 style={prose.h2}>6. Garancije i odgovornost</h2>
      <p style={prose.p}>
        SEO Mačak se obavezuje na profesionalan pristup i primenu poznatih best-practice tehnika.
        Garantovane pozicije na Google-u nisu moguće i takva obećanja nisu deo naše ponude.
        Promene u Google algoritmu ili akcije trećih lica van su naše kontrole.
      </p>
      <p style={prose.p}>
        Odgovornost SEO Mačak ograničena je na iznos uplaćen za konkretnu uslugu.
      </p>

      <h2 style={prose.h2}>7. Poverljivost</h2>
      <p style={prose.p}>
        Obe strane se obavezuju na čuvanje poverljivosti poslovnih informacija dobijenih tokom saradnje.
      </p>

      <h2 style={prose.h2}>8. Merodavno pravo</h2>
      <p style={prose.p}>
        Na ovaj ugovor primenjuje se pravo Republike Srbije. Sve sporove stranke će nastojati rešiti
        sporazumno, a u suprotnom je nadležan sud u Beogradu.
      </p>

      <h2 style={prose.h2}>9. Kontakt</h2>
      <p style={prose.p}>
        Za sva pitanja: <a href="mailto:markodevedzic30@gmail.com" style={prose.a}>markodevedzic30@gmail.com</a>
      </p>
    </>
  )
}

function TermsEN() {
  return (
    <>
      <h1 style={prose.h1}>Terms of Service</h1>
      <span style={prose.date}>Last updated: May 30, 2026.</span>

      <h2 style={prose.h2}>1. Parties</h2>
      <p style={prose.p}>
        These terms govern the business relationship between SEO Mačak (service provider, "SEO Mačak")
        and the client who orders services through this website or direct communication.
      </p>

      <h2 style={prose.h2}>2. Services</h2>
      <p style={prose.p}>SEO Mačak provides the following services:</p>
      <ul style={prose.ul}>
        <li>SEO optimization (technical SEO, on-page, link building, local SEO)</li>
        <li>Website and web application development (React, WordPress)</li>
        <li>Performance optimization</li>
        <li>Monthly monitoring and reporting</li>
      </ul>
      <p style={prose.p}>
        The exact scope is defined in a written proposal before work begins. All scope changes must be agreed in writing.
      </p>

      <h2 style={prose.h2}>3. Payment</h2>
      <p style={prose.p}>
        Payment follows the schedule set out in the proposal (upfront, monthly, or milestone-based).
        Late payment entitles SEO Mačak to temporarily suspend work. Invoices are issued electronically.
      </p>

      <h2 style={prose.h2}>4. Term and termination</h2>
      <p style={prose.p}>
        The agreement runs until project completion or, for ongoing services, until either party cancels
        with 15 days' notice. The client retains all delivered materials and access credentials.
      </p>

      <h2 style={prose.h2}>5. Intellectual property</h2>
      <p style={prose.p}>
        Upon final payment, the client owns the delivered website, code, and content outright.
        SEO Mačak retains the right to reference the project as a case study (with client consent).
      </p>

      <h2 style={prose.h2}>6. Warranties and liability</h2>
      <p style={prose.p}>
        SEO Mačak commits to a professional approach applying established best practices.
        Guaranteed search rankings are not possible and form no part of our offering.
        Changes to Google's algorithm or third-party actions are beyond our control.
      </p>
      <p style={prose.p}>
        SEO Mačak's liability is limited to the amount paid for the specific service in question.
      </p>

      <h2 style={prose.h2}>7. Confidentiality</h2>
      <p style={prose.p}>
        Both parties agree to keep confidential any business information received during the engagement.
      </p>

      <h2 style={prose.h2}>8. Governing law</h2>
      <p style={prose.p}>
        These terms are governed by the laws of the Republic of Serbia. Disputes will first be addressed
        through good-faith negotiation; failing that, the competent court in Belgrade has jurisdiction.
      </p>

      <h2 style={prose.h2}>9. Contact</h2>
      <p style={prose.p}>
        For any questions: <a href="mailto:markodevedzic30@gmail.com" style={prose.a}>markodevedzic30@gmail.com</a>
      </p>
    </>
  )
}
