import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'
import "dayjs/locale/fi"
dayjs.locale("fi")
import { liputuspaivat } from '../liputuspaivat'

const flagdates = []
Object.values(liputuspaivat).forEach(day => {
  const today = dayjs("2022-2-5").format("DD.MM.YYYY")
  const liputuspaiva = dayjs(day.date).format("DD.MM.YYYY")
  if (today === liputuspaiva) {
    flagdates.push(day)
  }
})

console.log(flagdates)

export default function Home() {
  return (
    <div>
      <h1>Mitä tänään liputetaan?</h1>
      <h2>Tänään on {dayjs().format("dddd, DD.MM.YYYY")}</h2>
      <h3>{flagdates ? `Tänään liputetaan, koska on ${flagdates[0].name}` : "Tänään ei ole liputuspäivä"}</h3>
      <p>{flagdates ? `${flagdates[0].description}` : "no"}</p>
      <p>Lisätietoa ja lähde: {<a href={flagdates[0].links[0]} target="_blank" rel="noreferrer">Wikipedia</a>}</p>
    </div>
  )
}
