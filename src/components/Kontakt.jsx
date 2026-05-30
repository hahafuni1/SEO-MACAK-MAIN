import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Link from './Link'
import ScrollAwareHeader from './ScrollAwareHeader'
import SectionTransition from './SectionTransition'
import { useLanguage } from '../contexts/LanguageContext'
import SEOHead from './SEOHead'
import { localBusinessSchema } from '../lib/schema/localBusiness'
import { breadcrumbSchema } from '../lib/schema/breadcrumbs'
import { BASE_URL } from '../lib/routes'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Premium Minimal — Kontakt page.
// Single-section focused layout: hero text + direct contact info on the left,
// the form is the right column. No filler sections — this page exists to
// convert visitors into leads.

const LIGHT_BG = '#FBFAF8'
const ACCENT = '#FDCA40'
const SECTION_PAD_Y = 'clamp(80px, 14vh, 140px)'
const SECTION_PAD_X = 'clamp(24px, 5vw, 64px)'
const CONTAINER_MAX = '1100px'

const Overline = ({ children, dark = false }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '14px',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: dark ? ACCENT : '#000',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '32px'
  }}>
    <span style={{ display: 'inline-block', width: '40px', height: '1px', background: dark ? ACCENT : '#000' }} />
    {children}
  </span>
)

export default function Kontakt() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ ime: '', email: '', telefon: '', poruka: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [focusedField, setFocusedField] = useState(null)
  const honeypotRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // Honeypot check — bots that fill hidden fields get a fake success, humans never see this field
    if (honeypotRef.current?.value) {
      setStatus('success')
      setFormData({ ime: '', email: '', telefon: '', poruka: '' })
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.ime,
          email: formData.email,
          phone: formData.telefon || '(nije ostavljen)',
          message: formData.poruka,
          time: new Date().toLocaleString('sr-RS', { dateStyle: 'long', timeStyle: 'short' })
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setFormData({ ime: '', email: '', telefon: '', poruka: '' })
      setTimeout(() => setStatus('idle'), 5000)
      if (typeof window.plausible === 'function') {
        window.plausible('Contact Form Submit', { props: { status: 'success' } })
      }
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      if (typeof window.plausible === 'function') {
        window.plausible('Contact Form Submit', { props: { status: 'error' } })
      }
    }
  }

  const submitted = status === 'success'
  const sending = status === 'sending'
  const errored = status === 'error'

  return (
    <>
      <SEOHead>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema([{ name: 'Kontakt', url: BASE_URL + '/kontakt/' }]))}</script>
      </SEOHead>
      <ScrollAwareHeader />

      {/* ─────────────────── HERO + FORM (light) ─────────────────── */}
      <section style={{
        background: LIGHT_BG,
        color: '#000',
        minHeight: '100vh',
        padding: `clamp(140px, 18vh, 200px) ${SECTION_PAD_X} ${SECTION_PAD_Y}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* subtle dot pattern bg */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.06) 49%, rgba(0,0,0,0.06) 51%, transparent 52%),' +
            'linear-gradient(-45deg, transparent 48%, rgba(0,0,0,0.06) 49%, rgba(0,0,0,0.06) 51%, transparent 52%)',
          backgroundSize: '60px 60px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 0
        }} />
        {/* yellow glow behind the form */}
        <div aria-hidden style={{
          position: 'absolute',
          right: '-12%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(380px, 50vw, 720px)',
          height: 'clamp(380px, 50vw, 720px)',
          background: 'radial-gradient(circle, rgba(253, 202, 64, 0.28) 0%, rgba(253, 202, 64, 0.06) 45%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{
          maxWidth: CONTAINER_MAX,
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start'
        }}>
          {/* ─── left: hero text + direct contact info ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Overline>Kontakt</Overline>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 4.6rem)',
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              margin: '0 0 32px',
              color: '#000'
            }}>
              Hajde da{' '}
              <span style={{
                textDecoration: 'underline',
                textDecorationColor: ACCENT,
                textDecorationThickness: '6px',
                textUnderlineOffset: '8px'
              }}>
                pričamo
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.65,
              color: '#555',
              margin: '0 0 56px',
              maxWidth: '480px'
            }}>
              Popuni formu ili me direktno pozovi. Odgovaram lično, obično u roku od 24 sata.
            </p>

            {/* direct contact info */}
            <div style={{
              borderTop: '1px solid #ddd',
              paddingTop: '32px'
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#000',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '24px'
              }}>
                Direktno
              </div>
              <ContactRow label="Email" value="kontakt@seomacak.com" href="mailto:kontakt@seomacak.com" />
              <ContactRow label="Telefon" value="+381 62 105 8144" href="tel:+381621058144" />
              <ContactRow label="Lokacija" value="Beograd, Srbija · Remote ready" />
            </div>
          </motion.div>

          {/* ─── right: form ─── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            style={{
              background: '#fff',
              border: '2px solid #000',
              borderRadius: '8px',
              padding: 'clamp(28px, 4vw, 44px)',
              boxShadow: '8px 8px 0px 0px #1a1a1a',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <FormField
              label="Ime"
              name="ime"
              type="text"
              value={formData.ime}
              onChange={handleChange}
              placeholder="Marko Marković"
              focused={focusedField === 'ime'}
              onFocus={() => setFocusedField('ime')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="marko@primer.com"
              focused={focusedField === 'email'}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
            />
            <FormField
              label="Telefon"
              sublabel="(opciono)"
              name="telefon"
              type="tel"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="+381 62 105 8144"
              focused={focusedField === 'telefon'}
              onFocus={() => setFocusedField('telefon')}
              onBlur={() => setFocusedField(null)}
            />
            <FormField
              label="Poruka"
              name="poruka"
              type="textarea"
              value={formData.poruka}
              onChange={handleChange}
              placeholder="Reci ukratko o čemu se radi: sajt, SEO audit, redizajn, drugo..."
              focused={focusedField === 'poruka'}
              onFocus={() => setFocusedField('poruka')}
              onBlur={() => setFocusedField(null)}
              required
            />

            {/* Honeypot — hidden from real users, catches bots that fill all fields */}
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />

            <motion.button
              type="submit"
              disabled={submitted || sending}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '18px 32px',
                background: submitted ? '#4a9b4a' : (sending ? '#bbb' : ACCENT),
                color: submitted ? '#fff' : '#000',
                border: '3px solid #000',
                borderRadius: '50px',
                fontSize: '1.05rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                cursor: (submitted || sending) ? 'default' : 'pointer',
                boxShadow: (submitted || sending) ? 'none' : '5px 5px 0px 0px #C79F00',
                transition: 'all 0.1s ease',
                marginTop: '12px',
                fontFamily: 'Poppins, Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (submitted || sending) return
                e.currentTarget.style.transform = 'translate(3px, 3px)'
                e.currentTarget.style.boxShadow = '2px 2px 0px 0px #C79F00'
              }}
              onMouseLeave={(e) => {
                if (submitted || sending) return
                e.currentTarget.style.transform = 'translate(0, 0)'
                e.currentTarget.style.boxShadow = '5px 5px 0px 0px #C79F00'
              }}
            >
              {submitted ? '✓ Poruka poslata, javljam se uskoro' : (sending ? 'Šaljem...' : 'Pošalji poruku →')}
            </motion.button>

            {errored && (
              <p style={{
                fontSize: '0.88rem',
                color: '#c0392b',
                margin: 0,
                textAlign: 'center',
                fontWeight: 600,
                padding: '12px 16px',
                background: 'rgba(192, 57, 43, 0.08)',
                borderRadius: '8px',
                border: '1px solid rgba(192, 57, 43, 0.2)'
              }}>
                Nešto je puklo prilikom slanja. Pokušaj ponovo ili piši direktno na email.
              </p>
            )}

            <p style={{
              fontSize: '0.78rem',
              color: '#888',
              margin: 0,
              textAlign: 'center',
              letterSpacing: '0.2px'
            }}>
              Obično odgovaram u roku od 24h. Bez spam-a, bez deljenja podataka.
            </p>
          </motion.form>
        </div>
      </section>

      <SectionTransition from={LIGHT_BG} to={ACCENT} />

      {/* ───────────────────────── FINAL CTA (yellow) ───────────────────────── */}
      <section style={{
        background: ACCENT,
        color: '#000',
        padding: `${SECTION_PAD_Y} ${SECTION_PAD_X}`,
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '720px', margin: '0 auto' }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 20px'
          }}>
            Ne voliš forme?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#000',
            opacity: 0.75,
            margin: '0 0 36px',
            lineHeight: 1.6
          }}>
            Javi se direktno na email, odgovaram lično, ne kroz tim ili AI.
          </p>
          <a
            href="mailto:kontakt@seomacak.com"
            className="plausible-event-name=CTA+Click"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 44px',
              background: '#000',
              color: ACCENT,
              borderRadius: '50px',
              border: '3px solid #000',
              textDecoration: 'none',
              fontSize: '1.05rem',
              fontWeight: 900,
              letterSpacing: '0.5px',
              boxShadow: '5px 5px 0px 0px #1a1a1a',
              transition: 'all 0.1s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(3px, 3px)'
              e.currentTarget.style.boxShadow = '2px 2px 0px 0px #1a1a1a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)'
              e.currentTarget.style.boxShadow = '5px 5px 0px 0px #1a1a1a'
            }}
          >
            <span>kontakt@seomacak.com</span>
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </section>

      <SectionTransition from={ACCENT} to="#000000" />
    </>
  )
}

// ─────────────────── helpers ───────────────────

function ContactRow({ label, value, href }) {
  const content = (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '24px',
      padding: '14px 0',
      borderBottom: '1px solid #eee',
      alignItems: 'baseline'
    }}>
      <span style={{
        fontSize: '0.78rem',
        color: '#888',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        fontWeight: 600,
        minWidth: '70px'
      }}>
        {label}
      </span>
      <span style={{
        fontSize: '1rem',
        color: '#000',
        fontWeight: 600,
        letterSpacing: '0.2px'
      }}>
        {value}
      </span>
    </div>
  )
  if (href) {
    return (
      <a
        href={href}
        style={{ textDecoration: 'none', display: 'block', transition: 'opacity 0.2s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        {content}
      </a>
    )
  }
  return content
}

function FormField({ label, sublabel, name, type, value, onChange, placeholder, focused, onFocus, onBlur, required }) {
  const baseStyle = {
    width: '100%',
    padding: '14px 16px',
    background: focused ? '#fffdf6' : '#fafafa',
    border: `2px solid ${focused ? ACCENT : '#e0e0e0'}`,
    borderRadius: '6px',
    color: '#000',
    fontSize: '1rem',
    fontFamily: 'Poppins, Inter, sans-serif',
    outline: 'none',
    transition: 'background 0.2s ease, border-color 0.2s ease',
    boxSizing: 'border-box'
  }
  return (
    <div>
      <label style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        fontSize: '0.78rem',
        fontWeight: 800,
        color: '#000',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        marginBottom: '8px'
      }}>
        {label}
        {sublabel && (
          <span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#999', textTransform: 'none', letterSpacing: '0.3px' }}>
            {sublabel}
          </span>
        )}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          rows={4}
          style={{ ...baseStyle, resize: 'vertical', minHeight: '110px', lineHeight: 1.55 }}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          style={baseStyle}
        />
      )}
    </div>
  )
}
