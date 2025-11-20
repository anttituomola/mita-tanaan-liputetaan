import { liputuspaivat } from "../liputuspaivat"
import Link from "next/link"
import dayjs from "dayjs"
import "dayjs/locale/fi"
import Head from "next/head"

dayjs.locale("fi")

const SITE_URL = 'https://mitatanaanliputetaan.vercel.app'

export async function getStaticProps() {
    // Sort flag days by date
    const sortedDates = [...liputuspaivat].sort((a, b) => {
        return dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
    })

    // Format dates for serialization
    const formattedDates = sortedDates.map(day => ({
        ...day,
        date: day.date && typeof day.date.format === 'function' ? day.date.format() : day.date,
        formattedDate: day.date && typeof day.date.format === 'function' ? day.date.format("dddd, DD.MM.YYYY") : dayjs(day.date).format("dddd, DD.MM.YYYY"),
        dateTime: day.date && typeof day.date.format === 'function' ? day.date.format("YYYY-MM-DD") : dayjs(day.date).format("YYYY-MM-DD")
    }))

    return {
        props: {
            sortedLiputuspaivat: formattedDates
        }
    }
}

export default function KaikkiLiputuspaivat({ sortedLiputuspaivat }) {
    const pageUrl = `${SITE_URL}/kaikkiSuomenLiputuspaivat`
    const ogImage = `${SITE_URL}/mita_tanaan_liputetaan.png`
    const pageTitle = "Kaikki Suomen liputuspäivät - Mitä tänään liputetaan?"
    const pageDescription = "Täydellinen lista kaikista Suomen liputuspäivistä. Selaa virallisia ja vakiintuneita liputuspäiviä, lue lisätietoja ja tutustu jokaisen päivän historiaan."

    return (
        <div className="container">
            <Head>
                <title>{pageTitle}</title>
                <link rel="canonical" href={pageUrl} />
                <meta name="title" content={pageTitle} />
                <meta name="description" content={pageDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="730" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={pageUrl} />
                <meta property="twitter:title" content={pageTitle} />
                <meta property="twitter:description" content={pageDescription} />
                <meta property="twitter:image" content={ogImage} />
            </Head>

            <h1>Kaikki Suomen liputuspäivät</h1>
            <p>Alla on lista kaikista Suomen liputuspäivistä. Klikkaa päivän nimeä nähdäksesi lisätietoja.</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {sortedLiputuspaivat.map((day, index) => {
                    const dayUrl = `/liputuspaivat/${encodeURIComponent(day.name)}`
                    return (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>
                            <Link href={dayUrl}>
                                <strong>{day.name}</strong>
                            </Link>
                            {' - '}
                            <time dateTime={day.dateTime}>
                                {day.formattedDate}
                            </time>
                            {day.official && (
                                <span style={{ marginLeft: '0.5rem', fontSize: '0.9em', color: '#666' }}>
                                    (Virallinen)
                                </span>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}