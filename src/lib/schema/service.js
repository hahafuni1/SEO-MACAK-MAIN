import { BASE_URL } from '../routes.js'

export function seoServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/seo/#service`,
    name: 'SEO Optimizacija',
    alternateName: 'SEO Optimization',
    serviceType: 'Search Engine Optimization',
    description:
      'Profesionalna SEO optimizacija — tehnički SEO, on-page optimizacija, link building, lokalni SEO i content strategija za srpska i EU tržišta.',
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Serbia' },
      { '@type': 'Country', name: 'European Union' },
    ],
    url: `${BASE_URL}/seo/`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '200',
      offerCount: '4',
      offers: [
        {
          '@type': 'Offer',
          name: 'Lokalni SEO',
          description: 'SEO za lokalne biznise u Srbiji — Google Business, lokalne ključne reči, citati.',
          priceCurrency: 'EUR',
          price: '200',
          priceSpecification: { '@type': 'UnitPriceSpecification', priceType: 'monthly' },
        },
        {
          '@type': 'Offer',
          name: 'Tehnički SEO',
          description: 'Core Web Vitals, strukturirani podaci, crawlability, site arhitektura.',
        },
        {
          '@type': 'Offer',
          name: 'On-page SEO',
          description: 'Optimizacija sadržaja, meta tagova, internih linkova i header hijerarhije.',
        },
        {
          '@type': 'Offer',
          name: 'Link Building',
          description: 'Izgradnja kvalitetnih backlink profila sa relevantnih domaćih i inostranih izvora.',
        },
      ],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SEO Usluge',
      itemListElement: [
        'Tehnički SEO audit',
        'On-page optimizacija',
        'Keyword research',
        'Link building',
        'Lokalni SEO',
        'Content strategija',
        'Core Web Vitals',
        'Schema markup',
      ].map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
    },
  }
}

export function webDevServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/izrada-sajtova/#service`,
    name: 'Izrada Sajtova',
    alternateName: 'Website Development',
    serviceType: 'Web Development',
    description:
      'Izrada brzih, modernih sajtova i web aplikacija u React-u. SEO-friendly arhitektura, performance-first pristup, prilagođeno mobilnim uređajima.',
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Serbia' },
      { '@type': 'Country', name: 'European Union' },
    ],
    url: `${BASE_URL}/izrada-sajtova/`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Usluge',
      itemListElement: [
        'Custom React razvoj',
        'WordPress razvoj',
        'E-commerce sajt',
        'Landing page',
        'SaaS aplikacija',
        'Redesign i migracija',
        'Performance optimizacija',
        'SEO-friendly arhitektura',
      ].map((name, i) => ({ '@type': 'ListItem', position: i + 1, name })),
    },
  }
}
