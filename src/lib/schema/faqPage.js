/**
 * faqPageSchema — takes an array of { q, a } items and returns FAQPage JSON-LD.
 *
 * @param {Array<{q: string, a: string}>} items
 */
export function faqPageSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}
