import { motion } from 'framer-motion'
import ScrollAwareHeader from './ScrollAwareHeader'
import SEOHead from './SEOHead'
import { useLanguage } from '../contexts/LanguageContext'
import { breadcrumbSchema } from '../lib/schema/breadcrumbs'
import { BASE_URL } from '../lib/routes'

const LIGHT_BG = '#FBFAF8'
const SECTION_PAD_X = 'clamp(24px, 5vw, 64px)'
const CONTAINER_MAX = '800px'

export default function Privacy() {
  const { language } = useLanguage()
  const isEN = language === 'en'

  const breadcrumbs = isEN
    ? [{ name: 'Privacy Policy', url: BASE_URL + '/en/privacy/' }]
    : [{ name: 'Politika Privatnosti', url: BASE_URL + '/privatnost/' }]

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
            {isEN ? <PrivacyEN /> : <PrivacySR />}
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

function PrivacySR() {
  return (
    <>
      <h1 style={prose.h1}>Politika Privatnosti</h1>
      <span style={prose.date}>Poslednje ažuriranje: 30. maja 2026.</span>

      <h2 style={prose.h2}>1. Ko smo</h2>
      <p style={prose.p}>
        SEO Mačak je freelance servis za SEO optimizaciju i izradu sajtova sa sedištem u Beogradu, Srbija.
        Administrator podataka je Marko (kontakt@seomacak.com).
      </p>

      <h2 style={prose.h2}>2. Koje podatke prikupljamo</h2>
      <p style={prose.p}>Prikupljamo samo podatke koje vi direktno unesete:</p>
      <ul style={prose.ul}>
        <li>Ime i prezime</li>
        <li>Email adresa</li>
        <li>Broj telefona (opciono)</li>
        <li>Sadržaj poruke putem kontakt formulara</li>
      </ul>
      <p style={prose.p}>
        Kontakt formular šalje podatke putem usluge <strong>EmailJS</strong> (emailjs.com). EmailJS obrađuje podatke
        isključivo radi dostave poruke i ne čuva ih trajno. Pogledajte{' '}
        <a href="https://www.emailjs.com/legal/privacy-policy/" style={prose.a} target="_blank" rel="noopener noreferrer">
          politiku privatnosti EmailJS
        </a>.
      </p>

      <h2 style={prose.h2}>3. Analitika — nema kolačića</h2>
      <p style={prose.p}>
        Koristimo <strong>Plausible Analytics</strong> — privatnost-prijateljski alat koji <em>ne koristi kolačiće</em>,
        ne prikuplja lične podatke i ne prati korisnike između sajtova. Podaci su anonimni i agregatni.
        Ne potreban je pristanak korisnika po GDPR-u.
      </p>
      <p style={prose.p}>
        Plausible je u skladu sa GDPR, CCPA i ePrivacy direktivom. Više informacija:{' '}
        <a href="https://plausible.io/data-policy" style={prose.a} target="_blank" rel="noopener noreferrer">plausible.io/data-policy</a>.
      </p>

      <h2 style={prose.h2}>4. Svrha obrade</h2>
      <ul style={prose.ul}>
        <li>Odgovaranje na upite i pružanje usluga</li>
        <li>Analiza poseta radi poboljšanja sajta (anonimno)</li>
      </ul>

      <h2 style={prose.h2}>5. Čuvanje podataka</h2>
      <p style={prose.p}>
        Podaci iz kontakt formulara čuvaju se samo u email sandučetu administratora i brišu se na zahtev.
        Ne postoji baza podataka korisnika. Nema trećih lica koji dobijaju vaše podatke osim EmailJS-a za dostavu.
      </p>

      <h2 style={prose.h2}>6. Vaša prava (GDPR, Zakon o zaštiti podataka RS)</h2>
      <p style={prose.p}>Imate pravo na:</p>
      <ul style={prose.ul}>
        <li>Uvid u podatke koji se obrađuju</li>
        <li>Ispravku netačnih podataka</li>
        <li>Brisanje podataka ("pravo na zaborav")</li>
        <li>Prenosivost podataka</li>
        <li>Prigovor na obradu</li>
      </ul>
      <p style={prose.p}>
        Zahtev možete poslati na: <a href="mailto:kontakt@seomacak.com" style={prose.a}>kontakt@seomacak.com</a>
      </p>

      <h2 style={prose.h2}>7. Izmene politike</h2>
      <p style={prose.p}>
        Zadržavamo pravo izmene ove politike. Datum poslednjeg ažuriranja je uvek naveden na vrhu dokumenta.
      </p>
    </>
  )
}

function PrivacyEN() {
  return (
    <>
      <h1 style={prose.h1}>Privacy Policy</h1>
      <span style={prose.date}>Last updated: May 30, 2026.</span>

      <h2 style={prose.h2}>1. Who we are</h2>
      <p style={prose.p}>
        SEO Mačak is a freelance SEO optimization and web development service based in Belgrade, Serbia.
        The data controller is Marko (kontakt@seomacak.com).
      </p>

      <h2 style={prose.h2}>2. What data we collect</h2>
      <p style={prose.p}>We only collect data you submit directly:</p>
      <ul style={prose.ul}>
        <li>Your name</li>
        <li>Email address</li>
        <li>Phone number (optional)</li>
        <li>Message content via the contact form</li>
      </ul>
      <p style={prose.p}>
        The contact form is delivered via <strong>EmailJS</strong> (emailjs.com). EmailJS processes data solely
        for message delivery and does not store it permanently. See the{' '}
        <a href="https://www.emailjs.com/legal/privacy-policy/" style={prose.a} target="_blank" rel="noopener noreferrer">
          EmailJS privacy policy
        </a>.
      </p>

      <h2 style={prose.h2}>3. Analytics — no cookies</h2>
      <p style={prose.p}>
        We use <strong>Plausible Analytics</strong> — a privacy-first tool that uses <em>no cookies</em>,
        collects no personal data, and does not track users across sites. All data is anonymous and aggregated.
        No consent required under GDPR.
      </p>
      <p style={prose.p}>
        Plausible is GDPR, CCPA, and ePrivacy compliant. More at{' '}
        <a href="https://plausible.io/data-policy" style={prose.a} target="_blank" rel="noopener noreferrer">plausible.io/data-policy</a>.
      </p>

      <h2 style={prose.h2}>4. Purpose of processing</h2>
      <ul style={prose.ul}>
        <li>Responding to enquiries and delivering services</li>
        <li>Anonymous site-traffic analysis to improve the website</li>
      </ul>

      <h2 style={prose.h2}>5. Data retention</h2>
      <p style={prose.p}>
        Contact form data lives only in the administrator's email inbox and is deleted on request.
        There is no user database. No third parties receive your data beyond EmailJS for delivery.
      </p>

      <h2 style={prose.h2}>6. Your rights (GDPR / Serbian Personal Data Protection Act)</h2>
      <ul style={prose.ul}>
        <li>Right of access to data being processed</li>
        <li>Right to rectification of inaccurate data</li>
        <li>Right to erasure ("right to be forgotten")</li>
        <li>Right to data portability</li>
        <li>Right to object to processing</li>
      </ul>
      <p style={prose.p}>
        Submit requests to: <a href="mailto:kontakt@seomacak.com" style={prose.a}>kontakt@seomacak.com</a>
      </p>

      <h2 style={prose.h2}>7. Policy changes</h2>
      <p style={prose.p}>
        We reserve the right to update this policy. The last-updated date is always shown at the top.
      </p>
    </>
  )
}
