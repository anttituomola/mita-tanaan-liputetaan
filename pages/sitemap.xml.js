import { liputuspaivat } from '../liputuspaivat'

const SITE_URL = 'https://mitatanaanliputetaan.vercel.app'
const KAIKKI_LIPUTUSPAIVAT_PATH = '/kaikki-suomen-liputuspäivät'

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0]

  // Static pages
  const urls = [
    {
      loc: SITE_URL,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.00'
    },
    {
      loc: `${SITE_URL}${KAIKKI_LIPUTUSPAIVAT_PATH}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.80'
    },
    {
      loc: `${SITE_URL}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.50'
    },
    {
      loc: `${SITE_URL}/rajapinta-api`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.50'
    }
  ]

  // Add all flag day pages
  liputuspaivat.forEach(day => {
    const encodedName = encodeURIComponent(day.name)
    urls.push({
      loc: `${SITE_URL}/liputuspaivat/${encodedName}`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: '0.60'
    })
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return sitemap
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap()

  res.setHeader('Content-Type', 'application/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default function Sitemap() {
  return null
}
