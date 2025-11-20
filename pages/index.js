import dayjs from 'dayjs'
import Link from 'next/link'
import Head from 'next/head'
import "dayjs/locale/fi"
import { liputuspaivat } from '../liputuspaivat'

dayjs.locale("fi")

const SITE_URL = 'https://mitatanaanliputetaan.vercel.app'

export async function getStaticProps() {
  // Calculate today's flag days
  const today = dayjs()
  const todayFormatted = today.format("DD.MM.YYYY")
  const flagdates = liputuspaivat.filter(day => {
    const liputuspaiva = dayjs(day.date).format("DD.MM.YYYY")
    return todayFormatted === liputuspaiva
  })

  // Calculate next and previous dates
  const sortedDates = [...liputuspaivat].sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date))) ? 1 : -1)
  const nextDate = sortedDates.find(date => dayjs(date.date).isAfter(today))
  const yesterday = today.subtract(1, 'day')
  const pastDates = sortedDates.filter(date => dayjs(date.date).isBefore(yesterday))
  const previousDate = pastDates[pastDates.length - 1] || null

  // Format dates for serialization
  const formatDate = (date) => {
    if (!date) return null
    return {
      ...date,
      date: date.date && typeof date.date.format === 'function' ? date.date.format() : date.date,
      formattedDate: date.date && typeof date.date.format === 'function' ? date.date.format("DD.MM.YYYY") : dayjs(date.date).format("DD.MM.YYYY")
    }
  }

  return {
    props: {
      flagdates: flagdates.map(formatDate),
      nextDate: formatDate(nextDate),
      previousDate: formatDate(previousDate),
      todayFormatted: today.format("dddd, DD.MM.YYYY"),
      currentDate: today.format("YYYY-MM-DD")
    },
    revalidate: 3600 // Revalidate every hour
  }
}

export default function Home({ flagdates, nextDate, previousDate, todayFormatted, currentDate }) {
  const currentFlagDay = flagdates.length > 0 ? flagdates[0] : null
  const pageTitle = currentFlagDay 
    ? `${currentFlagDay.name} - Mitä tänään liputetaan?`
    : 'Mitä tänään liputetaan?'
  const pageDescription = currentFlagDay
    ? `Tänään on ${currentFlagDay.name}. ${currentFlagDay.description.substring(0, 150)}...`
    : 'Katso, mikä liputuspäivä tänään on! Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!'
  const ogImage = `${SITE_URL}/mita_tanaan_liputetaan.png`

  // Structured data for current flag day
  const structuredData = currentFlagDay ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": currentFlagDay.name,
    "startDate": currentFlagDay.date ? (currentFlagDay.date.includes('T') ? currentFlagDay.date.split('T')[0] : currentFlagDay.date) : currentDate,
    "description": currentFlagDay.description,
    "location": {
      "@type": "Place",
      "name": "Finland"
    }
  } : null

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href={SITE_URL} />
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="730" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={SITE_URL} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={ogImage} />
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
        )}
      </Head>
      
      <div className='container'>
        <h2>Mitä tänään liputetaan?</h2>
        <h3>Tänään on {todayFormatted}</h3>
        {currentFlagDay ? (
          <>
            <h3 className='white'>Tänään liputetaan, koska on</h3>
            <h1 className='theDay'>{currentFlagDay.name}</h1>
            <p>{currentFlagDay.description}</p>
            <p><small>Lisätietoa ja lähde: <a href={currentFlagDay.links[0]} target="_blank" rel="noreferrer">Wikipedia</a></small></p>
          </>
        ) : (
          <h1>Tänään ei liputeta</h1>
        )}
        <small><p><Link href="/kaikkiSuomenLiputuspaivat">Katso kaikki Suomen liputuspäivät</Link></p></small>
      </div>
      <div className='nearestDates'>
        {previousDate ? (
          <p className='left'>
            Edellinen liputuspäivä oli:{' '}
            <Link href={`/liputuspaivat/${encodeURIComponent(previousDate.name)}`}>
              {previousDate.name}, {previousDate.formattedDate}
            </Link>
          </p>
        ) : (
          <p className='left'>Edellinen liputuspäivä oli viime vuoden puolella!</p>
        )}
        {nextDate ? (
          <p className='right'>
            Seuraava liputuspäivä on:{' '}
            <Link href={`/liputuspaivat/${encodeURIComponent(nextDate.name)}`}>
              {nextDate.name}, {nextDate.formattedDate}
            </Link>
          </p>
        ) : (
          <p className='right'>Seuraava liputuspäivä on ensi vuonna!</p>
        )}
      </div>
    </>
  )
}