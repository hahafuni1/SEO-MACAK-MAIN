import { BASE_URL } from '../routes.js'

/**
 * breadcrumbSchema — takes an array of { name, url } items.
 * The home item is prepended automatically.
 *
 * @param {Array<{name: string, url: string}>} items
 */
export function breadcrumbSchema(items) {
  const homeItem = { name: 'Početna', url: BASE_URL + '/' }
  const all = [homeItem, ...items]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
