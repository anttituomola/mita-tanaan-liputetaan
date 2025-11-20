import { liputuspaivat } from "../../liputuspaivat"
import dayjs from "dayjs"
import Head from "next/head"

const SITE_URL = 'https://mitatanaanliputetaan.vercel.app'

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
    const pageTitle = `${flagDay.name} - Mitä tänään liputetaan?`
    const pageUrl = `${SITE_URL}/liputuspaivat/${encodeURIComponent(flagDay.name)}`
    const ogImage = `${SITE_URL}/mita_tanaan_liputetaan.png`

    // Structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": flagDay.name,
        "startDate": flagDay.dateTime,
        "description": flagDay.description,
        "location": {
            "@type": "Place",
            "name": "Finland"
        }
    }

    return (
        <div className="container">
            <Head>
                <title>{pageTitle}</title>
                <link rel="canonical" href={pageUrl} />
                <meta name="title" content={pageTitle} />
                <meta name="description" content={flagDay.description} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={flagDay.description} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="730" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={pageUrl} />
                <meta property="twitter:title" content={pageTitle} />
                <meta property="twitter:description" content={flagDay.description} />
                <meta property="twitter:image" content={ogImage} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                />
            </Head>

            <h1>{flagDay.name}</h1>
            <h3>{flagDay.formattedDate}</h3>
            <small><p>{flagDay.official === true ? "Virallinen liputuspäivä" : "Suositeltu liputuspäivä"}</p></small>
            <p>{flagDay.description}</p>
            <p>Lue lisää: <a href={flagDay.links[0]} target="_blank" rel="noreferrer">Wikipedia</a></p>
        </div>
    )
}

export default Liputuspaiva