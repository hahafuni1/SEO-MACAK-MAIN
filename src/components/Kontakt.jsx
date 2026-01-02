
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import { Link } from 'react-router-dom'

const keyframes = `
  @keyframes moveDiagonalDots {
    from { background-position: 0px 0px; }
    to { background-position: 60px -60px; }
  }
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes floatInput {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-2px); }
  }
`

export default function Kontakt() {
  const [formData, setFormData] = useState({ ime: '', email: '', telefon: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ ime: '', email: '', telefon: '' })
    }, 3000)
  }

  const inputStyle = (isFocused) => ({
    padding: '18px 20px',
    background: isFocused ? 'rgba(253, 202, 64, 0.12)' : 'rgba(253, 202, 64, 0.05)',
    border: `2px solid ${isFocused ? '#FDCA40' : 'rgba(253, 202, 64, 0.15)'}`,
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'Poppins, Inter, sans-serif',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box',
    backdropFilter: 'blur(10px)',
  })

  return (
    <>
      <style>{keyframes}</style>
      <Header />
      <div style={{
        minHeight: '100vh',
        background: '#000',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: '140px 0 100px',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, #FDCA40 49%, #FDCA40 51%, transparent 52%)',
          backgroundSize: '60px 60px',
          opacity: 0.08,
          animation: 'moveDiagonalDots 4s linear infinite',
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        
        {/* Decorative Blobs */}
        <motion.div 
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(253, 202, 64, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '-200px',
            left: '-200px',
            zIndex: 0
          }}
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(253, 202, 64, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            bottom: '-150px',
            right: '-150px',
            zIndex: 0
          }}
          animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Additional Decorative Elements */}
        <motion.div 
          style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(253, 202, 64, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '50%',
            right: '5%',
            zIndex: 0
          }}
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(253, 202, 64, 0.09) 0%, transparent 70%)',
            borderRadius: '50%',
            bottom: '20%',
            left: '10%',
            zIndex: 0
          }}
          animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />

        {/* Extra Decorative Blobs */}
        <motion.div 
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, rgba(253, 202, 64, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '30%',
            left: '3%',
            zIndex: 0
          }}
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity }}
        />

        <motion.div 
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(253, 202, 64, 0.07) 0%, transparent 70%)',
            borderRadius: '50%',
            bottom: '35%',
            right: '8%',
            zIndex: 0
          }}
          animate={{ y: [0, 35, 0], x: [0, -25, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <motion.div 
          style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(253, 202, 64, 0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '70%',
            right: '20%',
            zIndex: 0
          }}
          animate={{ y: [0, -20, 0], x: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <div 
          style={{ 
            position: 'relative', 
            zIndex: 2, 
            width: '100%', 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '100px',
            padding: '0 40px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {/* Left Side - Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              paddingRight: '60px',
              paddingLeft: '20px'
            }}
          >
            <p style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#FDCA40',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '30px',
              opacity: 0.9
            }}>
              Započni saradnju
            </p>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 6vw, 3.2rem)',
              fontWeight: 900,
              color: '#fff',
              marginBottom: '36px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}>
              Pokreni svoj <span style={{ color: '#FDCA40', display: 'block' }}>rast</span>
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.8,
              fontWeight: 400
            }}>
              Popuni formu i naš tim će se javiti u roku od 24 časa. Spremni smo da vam pomognemo da postignete vaše poslovne ciljeve.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '42px',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '80px 60px',
              border: '1px solid rgba(253, 202, 64, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              minHeight: 'auto',
              justifyContent: 'center'
            }}
          >
            {/* Name Row */}
            {/* Ime Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#FDCA40',
                marginBottom: '10px',
                opacity: 0.8
              }}>
                Ime
              </label>
              <input
                type="text"
                name="ime"
                value={formData.ime}
                onChange={handleChange}
                onFocus={() => setFocusedField('ime')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="Marko"
                style={inputStyle(focusedField === 'ime')}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#FDCA40',
                marginBottom: '8px',
                opacity: 0.8
              }}>
                Email adresa
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="marko@example.com"
                style={inputStyle(focusedField === 'email')}
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#FDCA40',
                marginBottom: '8px',
                opacity: 0.8
              }}>
                Broj telefona
              </label>
              <input
                type="tel"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                onFocus={() => setFocusedField('telefon')}
                onBlur={() => setFocusedField(null)}
                required
                placeholder="+381 60 123 4567"
                style={inputStyle(focusedField === 'telefon')}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '18px 0',
                background: submitted ? 'rgba(253, 202, 64, 0.7)' : '#FDCA40',
                border: 'none',
                borderRadius: '12px',
                color: '#000',
                fontWeight: 900,
                fontSize: '1.05rem',
                cursor: submitted ? 'default' : 'pointer',
                marginTop: '24px',
                boxShadow: submitted ? 'none' : '0 12px 40px rgba(253, 202, 64, 0.25)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '0.5px',
                fontFamily: 'Poppins, Inter, sans-serif'
              }}
              disabled={submitted}
            >
              {submitted ? '✓ Poruka je poslata!' : 'Pošalji poruku'}
            </motion.button>
          </motion.form>
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#000', color: '#fff', padding: '80px 24px 40px', borderTop: '1px solid #333', width: '100%', marginTop: '160px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>SEO Mačak</h3>
            <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '0.9rem', marginBottom: 0 }}>
              Strucna SEO optimizacija, web development i dizajn za vas biznis.
            </p>
            <div style={{ marginTop: 24, color: '#666', fontSize: '0.9rem' }}>
              © 2024 SEO Mačak. Sva prava zadržana.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}