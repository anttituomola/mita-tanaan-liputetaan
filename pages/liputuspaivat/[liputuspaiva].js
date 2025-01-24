import { useRouter } from "next/router"
import { liputuspaivat } from "../../liputuspaivat"
import dayjs from "dayjs"
import Head from "next/head"
import { useState, useEffect } from "react"

const Liputuspaiva = () => {
    const router = useRouter()
    const { liputuspaiva } = router.query
    const [flagDay, setFlagDay] = useState(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (liputuspaiva) {
            const foundDay = Object.values(liputuspaivat).find(day => day.name === liputuspaiva)
            setFlagDay(foundDay || null)
        }
    }, [liputuspaiva])

    // Handle loading state
    if (!mounted || !flagDay) {
        return (
            <div className="container">
                <h2>Ladataan...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <Head>
                <title>{flagDay.name}: Mitä tänään liputetaan?</title>
                <meta name="title" content={flagDay.name} />
                <meta name="description" content={flagDay.description} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://mitatanaanliputetaan.vercel.app/" />
                <meta property="og:title" content="Mitä tänään liputetaan?" />
                <meta property="og:description" content="Katso, mikä liputuspäivä tänään on! Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />
                <meta property="og:image" content="../../mita_tanaan_liputetaan.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://mitatanaanliputetaan.vercel.app/" />
                <meta property="twitter:title" content="Mitä tänään liputetaan?" />
                <meta property="twitter:description" content="Katso, mikä liputuspäivä tänään on! Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />
                <meta property="twitter:image" content="../../mita_tanaan_liputetaan.png" />
            </Head>

            <h1>{flagDay.name}</h1>
            <h3>{dayjs(flagDay.date).format("dddd, DD.MM.YYYY")}</h3>
            <small><p>{flagDay.official === true ? "Virallinen liputuspäivä" : "Suositeltu liputuspäivä"}</p></small>
            <p>{flagDay.description}</p>
            <p>Lue lisää: <a href={flagDay.links[0]} target="_blank" rel="noreferrer">Wikipedia</a></p>
        </div>
    )
}

export default Liputuspaiva