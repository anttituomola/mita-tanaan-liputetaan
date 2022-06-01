import dayjs from 'dayjs'
import Link from 'next/link'
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
  console.log(sortedDates)
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
