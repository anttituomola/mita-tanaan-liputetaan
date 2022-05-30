import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs'
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

let flagdate = ""
if (flagdates.length > 0) {
  flagdate = <>
    <h2>Tänään liputetaan, koska on {flagdates[0].name}</h2>
    <p>{flagdates[0].description}</p>
    <p><small>Lisätietoa ja lähde: <a href={flagdates[0].links[0]}>{flagdates[0].links[0]}</a></small></p>
  </>
} else {
  flagdate = <>
    <h2>Tänään ei liputeta</h2>
  </>
}

  console.log(flagdates)

  export default function Home() {
    return (
      <div className='container'>
        <h1>Mitä tänään liputetaan?</h1>
        <h3>Tänään on {dayjs().format("dddd, DD.MM.YYYY")}</h3>
        {flagdate}
      </div>
    )
  }
