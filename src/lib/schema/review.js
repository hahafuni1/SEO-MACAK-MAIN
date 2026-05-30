import { BASE_URL } from '../routes.js'

// One verified review visible on the homepage (Željko, blockquote section).
// Add more entries here as new testimonials are added and made visible on-page.
export function reviewSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@id': `${BASE_URL}/#organization` },
    author: {
      '@type': 'Person',
      name: 'Željko',
      jobTitle: 'Specijalista za sisteme zaštite od insekata i kontrolu svetlosti',
    },
    reviewBody:
      'Momak je došao i uradio posao maksimalno dobro.',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    // Use the date the testimonial was published if known; otherwise approximate.
    // TODO (owner): replace with the actual date of the project.
    datePublished: '2024-01-01',
    publisher: { '@id': `${BASE_URL}/#organization` },
  }
}
