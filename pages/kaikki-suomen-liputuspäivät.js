import { liputuspaivat } from "../liputuspaivat"
import Link from "next/link"
import dayjs from "dayjs"
import "dayjs/locale/fi"
import Seo, {
  SITE_URL,
  createWebPageSchema,
  createItemListSchema,
  createBreadcrumbSchema,
} from "../components/Seo"

dayjs.locale("fi")

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

const KAIKKI_LIPUTUSPAIVAT_PATH = '/kaikki-suomen-liputuspäivät'

export default function KaikkiLiputuspaivat({ sortedLiputuspaivat }) {
    const pageUrl = `${SITE_URL}${KAIKKI_LIPUTUSPAIVAT_PATH}`
    const pageTitle = "Kaikki Suomen liputuspäivät"
    const pageDescription = "Täydellinen lista kaikista Suomen virallisista ja vakiintuneista liputuspäivistä. Selaa päiviä, lue lisätietoja ja tutustu kunkin päivän historiaan."

    const listItems = sortedLiputuspaivat.map(day => ({
        name: day.name,
        url: `${SITE_URL}/liputuspaivat/${encodeURIComponent(day.name)}`
    }))

    const structuredData = [
        createWebPageSchema({
            url: pageUrl,
            name: pageTitle,
            description: pageDescription,
        }),
        createItemListSchema(listItems),
        createBreadcrumbSchema([
            { name: 'Etusivu', url: SITE_URL },
            { name: pageTitle, url: pageUrl },
        ]),
    ]

    return (
        <>
            <Seo
                title={pageTitle}
                description={pageDescription}
                canonical={pageUrl}
                structuredData={structuredData}
            />

            <div className="container">
                <h1>{pageTitle}</h1>
                <p>Alla on lista kaikista Suomen liputuspäivistä. Klikkaa päivän nimeä nähdäksesi lisätietoja.</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {sortedLiputuspaivat.map((day, index) => {
                        const dayUrl = `/liputuspaivat/${encodeURIComponent(day.name)}`
                        return (
                            <li key={index} style={{ marginBottom: '0.5rem', color: '#ffffff' }}>
                                <Link href={dayUrl}>
                                    <strong>{day.name}</strong>
                                </Link>
                                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{' - '}</span>
                                <time dateTime={day.dateTime} style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                    {day.formattedDate}
                                </time>
                                {day.official && (
                                    <span style={{ marginLeft: '0.5rem', fontSize: '0.9em', color: '#dc851fff', opacity: '0.9' }}>
                                        (Virallinen)
                                    </span>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
