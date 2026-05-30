import { BASE_URL } from '../routes.js'

// TODO (owner): fill in your last name, LinkedIn, Twitter, GitHub URLs.
const SAME_AS = [
  // 'https://www.linkedin.com/in/marko-LASTNAME',
  // 'https://twitter.com/marko_handle',
]

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/about/#person`,
    // TODO (owner): add your last name
    name: 'Marko',
    jobTitle: 'SEO Specialist & Web Developer',
    description:
      'Freelance SEO specialist i web developer sa 3+ godine iskustva. 50+ završenih projekata, 30+ klijenata na #1 poziciji na Google-u.',
    image: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/marko-founder.webp`,
    },
    url: `${BASE_URL}/about/`,
    email: 'kontakt@seomacak.com',
    worksFor: { '@id': `${BASE_URL}/#organization` },
    knowsAbout: [
      'SEO optimizacija',
      'Tehnički SEO',
      'React web development',
      'Core Web Vitals',
      'Lokalni SEO',
      'Content strategija',
      'Google Search Console',
      'Schema markup',
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'Serbian' },
      { '@type': 'Language', name: 'English' },
    ],
    sameAs: SAME_AS,
  }
}
