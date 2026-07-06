import Head from 'next/head'

export const SITE_URL = 'https://mitatanaanliputetaan.vercel.app'
export const SITE_NAME = 'Mitä tänään liputetaan?'
export const DEFAULT_DESCRIPTION =
  'Katso, mikä liputuspäivä tänään on! Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/mita_tanaan_liputetaan.png`

export function createWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'fi',
  }
}

export function createWebPageSchema({ url, name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name,
    description: description || DEFAULT_DESCRIPTION,
    inLanguage: 'fi',
    isPartOf: { '@type': 'WebSite', url: SITE_URL },
  }
}

export function createEventSchema(flagDay) {
  const startDate =
    flagDay.dateTime ||
    (flagDay.date && typeof flagDay.date === 'string' ? flagDay.date.split('T')[0] : undefined)

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: flagDay.name,
    startDate,
    description: flagDay.description,
    location: {
      '@type': 'Place',
      name: 'Finland',
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  }
}

export function createBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function createItemListSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  }
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  structuredData,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:locale" content="fi_FI" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="730" />
      <meta property="og:image:alt" content="Mitä tänään liputetaan? - Suomen liputuspäivät" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {structuredData &&
        (Array.isArray(structuredData) ? structuredData : [structuredData]).map(
          (data, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            />
          )
        )}
    </Head>
  )
}
