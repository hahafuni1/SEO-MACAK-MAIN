import { BASE_URL } from '../routes.js'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'SEO Mačak',
    image: `${BASE_URL}/og-default.png`,
    logo: `${BASE_URL}/logo.webp`,
    url: BASE_URL,
    telephone: '+381621058144',
    email: 'kontakt@seomacak.com',
    // Home-based / service-area business — street address intentionally omitted.
    // Clients are served remotely or at their location; no public office.
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Beograd',
      addressRegion: 'Beograd',
      addressCountry: 'RS',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // TODO (owner): replace with exact coordinates
      latitude: '44.8176',
      longitude: '20.4569',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    // TODO (owner): confirm priceRange is accurate
    priceRange: '$$',
    currenciesAccepted: 'EUR, RSD',
    paymentAccepted: 'Bank transfer, Invoice',
    areaServed: {
      '@type': 'Country',
      name: 'Serbia',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      // One verified review visible on homepage (Željko).
      // Update ratingCount and ratingValue as real reviews are collected.
      ratingValue: '5',
      ratingCount: '1',
      bestRating: '5',
      worstRating: '1',
    },
  }
}
