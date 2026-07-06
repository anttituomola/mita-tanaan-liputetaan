import { liputuspaivat } from "../../liputuspaivat"
import dayjs from "dayjs"
import Seo, {
  SITE_URL,
  createWebPageSchema,
  createEventSchema,
  createBreadcrumbSchema,
} from "../../components/Seo"

function truncateDescription(text, maxLength = 155) {
  if (!text || text.length <= maxLength) return text
  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength) + '...'
}

export async function getStaticPaths() {
    const paths = liputuspaivat.map((day) => ({
        params: { liputuspaiva: day.name }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const flagDay = liputuspaivat.find(day => day.name === params.liputuspaiva)

    if (!flagDay) {
        return {
            notFound: true
        }
    }

    // Format date for serialization
    const formattedFlagDay = {
        ...flagDay,
        date: flagDay.date && typeof flagDay.date.format === 'function' ? flagDay.date.format() : flagDay.date,
        formattedDate: flagDay.date && typeof flagDay.date.format === 'function' ? flagDay.date.format("dddd, DD.MM.YYYY") : dayjs(flagDay.date).format("dddd, DD.MM.YYYY"),
        dateTime: flagDay.date && typeof flagDay.date.format === 'function' ? flagDay.date.format("YYYY-MM-DD") : dayjs(flagDay.date).format("YYYY-MM-DD")
    }

    return {
        props: {
            flagDay: formattedFlagDay
        }
    }
}

const Liputuspaiva = ({ flagDay }) => {
    const pageTitle = flagDay.name
    const pageUrl = `${SITE_URL}/liputuspaivat/${encodeURIComponent(flagDay.name)}`
    const pageDescription = truncateDescription(flagDay.description)

    const structuredData = [
        createWebPageSchema({
            url: pageUrl,
            name: pageTitle,
            description: pageDescription,
        }),
        createEventSchema(flagDay),
        createBreadcrumbSchema([
            { name: 'Etusivu', url: SITE_URL },
            { name: 'Kaikki liputuspäivät', url: `${SITE_URL}/kaikki-suomen-liputuspäivät` },
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
                <h1>{flagDay.name}</h1>
                <h2 className="flag-date">{flagDay.formattedDate}</h2>
                <p>
                    <small>{flagDay.official === true ? "Virallinen liputuspäivä" : "Vakiintunut liputuspäivä"}</small>
                </p>
                <p>{flagDay.description}</p>
                <p>Lue lisää: <a href={flagDay.links[0]} target="_blank" rel="noreferrer">Wikipedia</a></p>
            </div>
        </>
    )
}

export default Liputuspaiva
