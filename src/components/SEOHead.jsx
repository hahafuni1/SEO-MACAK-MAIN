// SEOHead — single Helmet wrapper used by every page.
// Emits all common head tags plus global Organization + WebSite JSON-LD on every page.
// Pass page-specific JSON-LD as children: <SEOHead><script type="application/ld+json">...</script></SEOHead>
// Override robots with the robots prop (e.g. robots="noindex, follow" for blog/404).

import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { getMetadata, SITE_NAME } from '../lib/seo'
import { organizationSchema } from '../lib/schema/organization'
import { websiteSchema } from '../lib/schema/website'

const GLOBAL_SCHEMAS = [organizationSchema(), websiteSchema()]

export default function SEOHead({ title, robots, ogType, ogImage, children }) {
  const { t } = useLanguage()
  const { pathname } = useLocation()

  const meta = getMetadata({
    pathname,
    t,
    overrides: {
      ...(robots  && { robots }),
      ...(ogType  && { ogType }),
      ...(ogImage && { ogImage }),
    },
  })

  // Allow pages to hard-code a title (e.g. 404 page whose pathname is unknown)
  const resolvedTitle = title ?? meta.title

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta name="robots" content={meta.robots} />

      {/* hreflang alternates */}
      {meta.hreflang && <link rel="alternate" hreflang="sr"        href={meta.hreflang.sr} />}
      {meta.hreflang && <link rel="alternate" hreflang="en"        href={meta.hreflang.en} />}
      {meta.hreflang && <link rel="alternate" hreflang="x-default" href={meta.hreflang.xDefault} />}

      {/* Open Graph */}
      <meta property="og:title"        content={meta.title} />
      <meta property="og:description"  content={meta.description} />
      <meta property="og:image"        content={meta.ogImage} />
      <meta property="og:image:alt"    content={meta.ogImageAlt} />
      <meta property="og:image:width"  content={String(meta.ogImageWidth)} />
      <meta property="og:image:height" content={String(meta.ogImageHeight)} />
      <meta property="og:url"          content={meta.canonical} />
      <meta property="og:type"         content={meta.ogType} />
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:locale"       content={meta.ogLocale} />

      {/* Search engine ownership verification — uncomment and fill in after verifying in GSC / Bing WMT */}
      {/* <meta name="google-site-verification" content="TODO-OWNER-FILL-FROM-GSC" /> */}
      {/* <meta name="msvalidate.01"             content="TODO-OWNER-FILL-FROM-BING" /> */}

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image"       content={meta.ogImage} />
      <meta name="twitter:image:alt"   content={meta.ogImageAlt} />

      {/* Global schemas — Organization + WebSite appear on every page */}
      {GLOBAL_SCHEMAS.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Page-specific JSON-LD and any other head additions */}
      {children}
    </Helmet>
  )
}
