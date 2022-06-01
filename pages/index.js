import dayjs from 'dayjs'
import Link from 'next/link'
import Head from 'next/head'
import "dayjs/locale/fi"
dayjs.locale("fi")
import { liputuspaivat } from '../liputuspaivat'

const flagdates = []
Object.values(liputuspaivat).forEach(day => {
  const today = dayjs().format("DD.MM.YYYY")
  const liputuspaiva = dayjs(day.date).format("DD.MM.YYYY")
  if (today === liputuspaiva) {
    flagdates.push(day)
  }
})

const allFlaggDates = () => {
  const dates = Object.values(liputuspaivat).map(day => day)
  const sortedDates = dates.sort((a, b) => (a.date > b.date) ? 1 : -1)
  const today = dayjs()
  // Find the next date from today
  const nextDate = sortedDates.find(date => dayjs(date.date).isAfter(today))
  // Find all events before today
  const pastDates = sortedDates.filter(date => dayjs(date.date).isBefore(today))
  const previousDate = pastDates[pastDates.length - 1]
  return { nextDate, previousDate }
}

allFlaggDates()

let flagdate = ""
if (flagdates.length > 0) {
  flagdate = <>
    <h3 className='white'>Tänään liputetaan, koska on</h3><h1 className='theDay'>{flagdates[0].name}</h1>
    <p>{flagdates[0].description}</p>
    <p><small>Lisätietoa ja lähde: <a href={flagdates[0].links[0]}>Wikipedia</a></small></p>
  </>
} else {
  flagdate = <>
    <h1>Tänään ei liputeta</h1>
  </>
}

export default function Home() {
  const { nextDate, previousDate } = allFlaggDates()
  const previousLink = `/liputuspaivat/${previousDate.name}`
  return (
    <>
      <Head>
        <title>Mitä tänään liputetaan?</title>
        <meta name="title" content="Mitä tänään liputetaan?" />
        <meta name="description" content="Katso, mikä liputuspäivä tänään on? Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mitatanaanliputetaan.vercel.app/" />
        <meta property="og:title" content="Mitä tänään liputetaan?" />
        <meta property="og:description" content="Katso, mikä liputuspäivä tänään on? Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />
        <meta property="og:image" content="mita_tanaan_liputetaan.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mitatanaanliputetaan.vercel.app/" />
        <meta property="twitter:title" content="Mitä tänään liputetaan?" />
        <meta property="twitter:description" content="Katso, mikä liputuspäivä tänään on? Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />
        <meta property="twitter:image" content="mita_tanaan_liputetaan.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="730" />
      </Head>
      
      <div className='container'>
        <h2>Mitä tänään liputetaan?</h2>
        <h3>Tänään on {dayjs().format("dddd, DD.MM.YYYY")}</h3>
        {flagdate}
        <small><p><Link href="/kaikkiSuomenLiputuspaivat">Katso kaikki Suomen liputuspäivät</Link></p></small>
      </div>
      <div className='nearestDates'>
        <p className='left'>Edellinen liputuspäivä oli:
          <Link href={`/liputuspaivat/${previousDate.name}`}><a> {previousDate.name}, {dayjs(previousDate.date).format("DD.MM.YYYY")}</a></Link></p>
        <p className='right'>Seuraava liputuspäivä on:
          <Link href={`/liputuspaivat/${nextDate.name}`}><a> {nextDate.name}, {dayjs(nextDate.date).format("DD.MM.YYYY")}</a></Link></p>
      </div>
    </>
  )
}
