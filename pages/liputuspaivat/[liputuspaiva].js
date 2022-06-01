import { useRouter } from "next/router"
import { liputuspaivat } from "../../liputuspaivat"
import dayjs from "dayjs"
import Head from "next/head"

const liputuspaiva = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const queryDate = router.query.liputuspaiva
    const theDate = {}

    for (let day in liputuspaivat) {
        if (liputuspaivat[day].name === queryDate) {
            theDate = liputuspaivat[day]
        }
    }

    return (
        <div className="container">
            <Head>
                <title>{theDate.name}: Mitä tänään liputetaan?</title>
                <meta name="title" content={theDate.name} />
                <meta name="description" content={theDate.description} />

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
            </Head>

            <h1>{queryDate}</h1>
            <h3>{dayjs(theDate.date).format("dddd, DD.MM.YYYY")}</h3>
            <small><p>{theDate.official === true ? "Virallinen liputuspäivä" : "Suositeltu liputuspäivä"}</p></small>
            <p>{theDate.description}</p>
            <p>Lue lisää: {<a href={theDate.links} target="_blank" rel="noreferrer">Wikipedia</a>}</p>
        </div>
    )
}

export default liputuspaiva