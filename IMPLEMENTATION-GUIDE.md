# Implementacija Višejezičnosti - Uputstvo

## ✅ Kompletno Implementirano:

### 1. **Core System**
- ✅ translations.js - Svi tekstovi za SR i EN
- ✅ LanguageContext.jsx - State management sa localStorage
- ✅ LanguageSwitcher.jsx - SR | EN toggle dugme

### 2. **Komponente Sa Prevodima**
- ✅ **Header.jsx** - Navigation + LanguageSwitcher
- ✅ **PinnedHeroSection.jsx** (Homepage):
  - Hero tekst
  - "Šta Radimo?" naslov i kartice (SEO, Web Dev, Dizajn)
  - "Kako Radimo?" naslov i 4 koraka
  - LanguageSwitcher u navigation
- ✅ **SEO.jsx** - Sticky nalepnice ("Zašto SEO")
- ✅ **FAQSection.jsx** - Česta pitanja
- ✅ **About.jsx** - Hero i Founder sekcija

## 🎯 Kako Funkcioniše:

1. **Klik na SR | EN** - Instant menja sav tekst bez refresh-a
2. **localStorage** - Pamti izbor između sesija
3. **React Context** - Efikasan state management
4. **Draggable elementi** - Ne resetuju se (nema page reload)

## 🚀 Testiranje:

```bash
npm run dev
```

1. Otvori sajt
2. Klikni SR | EN dugme u navigation baru
3. Pogledaj kako se navigation, hero text, kartice menjaju
4. Osvježi stranicu - jezik ostaje isti

## 📋 Preostale Komponente Za Prevod:

Sve ove komponente imaju prevode spremne u `translations.js`, samo treba dodati:

### Blog.jsx
```jsx
import { useLanguage } from '../contexts/LanguageContext'

export default function Blog() {
  const { t } = useLanguage()
  
  return (
    <>
      <Header />
      <h1>{t.blog.hero.title} <span>{t.blog.hero.titleHighlight}</span></h1>
      <p>{t.blog.hero.subtitle}</p>
      
      {/* Categories */}
      <button>{t.blog.categories.all}</button>
      <button>{t.blog.categories.seo}</button>
      <button>{t.blog.categories.technical}</button>
      <button>{t.blog.categories.content}</button>
    </>
  )
}
```

### Kontakt.jsx
```jsx
const { t } = useLanguage()

<h1>{t.contact.hero.title} <span>{t.contact.hero.titleHighlight}</span></h1>
<input placeholder={t.contact.form.namePlaceholder} />
<input placeholder={t.contact.form.emailPlaceholder} />
<button>{t.contact.form.submit}</button>
```

### IzradaSajtova.jsx
```jsx
const { t } = useLanguage()

<h1>{t.webDev.hero.title}</h1>
<p>{t.webDev.hero.desc}</p>

{/* Why Choose Us */}
{t.webDev.whyChooseUs.reasons.map((reason, idx) => (
  <div key={idx}>
    <h3>{reason.title}</h3>
    <p>{reason.desc}</p>
  </div>
))}

{/* Process Steps */}
{t.webDev.process.steps.map((step, idx) => (
  <div key={idx}>
    <div>{step.step}</div>
    <h4>{step.title}</h4>
    <p>{step.desc}</p>
  </div>
))}
```

## 💡 Pattern Za Dodavanje Prevoda:

### 1. Import Hook
```jsx
import { useLanguage } from '../contexts/LanguageContext'
```

### 2. Koristi Hook
```jsx
export default function MyComponent() {
  const { t } = useLanguage()
  
  return <h1>{t.section.key}</h1>
}
```

### 3. Za Array podatke
```jsx
{t.section.items.map((item, idx) => (
  <div key={idx}>
    <h3>{item.title}</h3>
    <p>{item.desc}</p>
  </div>
))}
```

## 🔑 Ključne Karakteristike:

✅ **Bez osvežavanja** - React state instant menja tekst  
✅ **localStorage** - Jezik se pamti između sesija  
✅ **Type-safe** - Objektna notacija (t.section.key)  
✅ **Jednostavan toggle** - SR | EN dugme u Header-u  
✅ **Prirodan engleski** - Profesionalni prevodi  
✅ **Efikasno** - Context API + minimal re-renders  
✅ **Draggable friendly** - Nema page reload koji bi resetovao pozicije

## 📂 Struktura Prevoda:

```javascript
// translations.js
export const translationsSR = {
  nav: { home: 'Početna', about: 'O nama', ... },
  home: {
    hero: { title: '...', subtitle: '...' },
    whatWeDo: { 
      title: 'Šta Radimo?',
      cards: [{ title: '...', desc: '...' }]
    }
  },
  about: { ... },
  seo: { ... },
  blog: { ... },
  contact: { ... },
  webDev: { ... }
}

export const translationsEN = {
  // Ista struktura, engleski tekstovi
}
```

## ✅ Šta Radi Odmah:

1. **Navigation** - Svi linkovi prevedeni na obe stranice
2. **Homepage (PinnedHeroSection)**:
   - Hero naslov i podnaslov
   - "Šta Radimo?" sekcija sa 3 kartice
   - "Kako Radimo?" sekcija sa 4 koraka
3. **SEO Strana** - 46 sticky nalepnica prevedeno
4. **FAQ Sekcija** - 5 pitanja/odgovora
5. **About Strana** - Hero i Founder story

## 🎨 Dodavanje Novih Tekstova:

1. Otvori `/src/translations.js`
2. Dodaj ključeve u oba objekta (SR i EN):
```javascript
translationsSR.newSection = {
  title: 'Novi Naslov',
  desc: 'Opis...'
}

translationsEN.newSection = {
  title: 'New Title',
  desc: 'Description...'
}
```
3. Koristi: `{t.newSection.title}`

Sistem je spreman za produkciju! 🚀
