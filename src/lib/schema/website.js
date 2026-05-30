import { BASE_URL } from '../routes.js'

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'SEO Mačak',
    description: 'SEO optimizacija i izrada sajtova — Beograd, Srbija',
    inLanguage: ['sr', 'en'],
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      // Wire up a real search endpoint when site search is added.
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
