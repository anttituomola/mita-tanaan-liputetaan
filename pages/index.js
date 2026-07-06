import dayjs from 'dayjs'
import Link from 'next/link'
import "dayjs/locale/fi"
import { liputuspaivat } from '../liputuspaivat'
import Seo, {
  SITE_URL,
  createWebSiteSchema,
  createWebPageSchema,
  createEventSchema,
  createBreadcrumbSchema,
} from '../components/Seo'

dayjs.locale("fi")

function truncateDescription(text, maxLength = 155) {
  if (!text || text.length <= maxLength) return text
  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength) + '...'
}

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
      formattedDate: date.date && typeof date.date.format === 'function' ? date.date.format("DD.MM.YYYY") : dayjs(date.date).format("DD.MM.YYYY"),
      dateTime: date.date && typeof date.date.format === 'function' ? date.date.format("YYYY-MM-DD") : dayjs(date.date).format("YYYY-MM-DD")
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

  const pageTitlePart = currentFlagDay ? currentFlagDay.name : undefined
  const pageDescription = currentFlagDay
    ? `Tänään liputetaan, koska on ${currentFlagDay.name}. ${truncateDescription(currentFlagDay.description)}`
    : 'Tänään ei ole liputuspäivää. Katso seuraava liputuspäivä ja lista kaikista Suomen virallisista ja vakiintuneista liputuspäivistä.'

  const structuredData = [
    createWebSiteSchema(),
    createWebPageSchema({
      url: SITE_URL,
      name: 'Mitä tänään liputetaan?',
      description: pageDescription,
    }),
    ...(currentFlagDay ? [createEventSchema(currentFlagDay)] : []),
    createBreadcrumbSchema([
      { name: 'Etusivu', url: SITE_URL },
    ]),
  ]

  return (
    <>
      <Seo
        title={pageTitlePart}
        description={pageDescription}
        canonical={SITE_URL}
        structuredData={structuredData}
      />

      <div className='container'>
        <h1>Mitä tänään liputetaan?</h1>
        <p className='date'>Tänään on {todayFormatted}</p>
        {currentFlagDay ? (
          <>
            <p className='white'>Tänään liputetaan, koska on</p>
            <h2 className='theDay'>{currentFlagDay.name}</h2>
            <p>{currentFlagDay.description}</p>
            <p>
              <small>
                Lisätietoa ja lähde:{' '}
                <a href={currentFlagDay.links[0]} target="_blank" rel="noreferrer">
                  Wikipedia
                </a>
              </small>
            </p>
          </>
        ) : (
          <h2>Tänään ei liputeta</h2>
        )}
        <small>
          <p>
            <Link href="/kaikki-suomen-liputuspäivät">
              Katso kaikki Suomen liputuspäivät
            </Link>
          </p>
        </small>
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
