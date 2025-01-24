import { liputuspaivat } from "../liputuspaivat"
import Link from "next/link"
import dayjs from "dayjs"
import Head from "next/head"

const Api = () => {
    return (
        <div>
            <Head>
                <title>Liputuspäivät-API eli rajapinta: kaikki Suomen liputuspäivät</title>
                <meta name="title" content="Ilmainen ja avoin rajapinta eli API suomalaisille liputuspäiville" />
                <meta name="description" content="Katso, mikä liputuspäivä tänään on? Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://mitatanaanliputetaan.vercel.app/" />
                <meta property="og:title" content="Mitä tänään liputetaan?" />
                <meta property="og:description" content="Katso, mikä liputuspäivä tänään on! Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />
                <meta property="og:image" content="mita_tanaan_liputetaan.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://mitatanaanliputetaan.vercel.app/" />
                <meta property="twitter:title" content="Mitä tänään liputetaan?" />
                <meta property="twitter:description" content="Katso, mikä liputuspäivä tänään on! Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />
                <meta property="twitter:image" content="mita_tanaan_liputetaan.png" />
            </Head>

            <main className="container">
                <div className="breakRows">
                    <h1>Rajapinta eli API</h1>
                    <p>mitätänäänliputetaan.fi tarjoaa käyttöösi avoimen rajapinnan Suomen liputuspäivädataan.</p>
                    <p>Voit hakea liputuspäivätiedot JSON-muodossa osoitteesta <a href="https://mitatanaanliputetaan.vercel.app/api/liputuspaivat">/api/liputuspaivat</a></p>
                    <p>Kuluvan viikon liputuspäivät <a href="https://mitatanaanliputetaan.vercel.app/api/liputuspaivat/thisWeek">/api/liputuspaivat/thisWeek</a></p>
                    <p>Kuluvan kuun liputuspäivät <a href="https://mitatanaanliputetaan.vercel.app/api/liputuspaivat/thisMonth">/api/liputuspaivat/thisMonth</a></p>
                    <p>Kuluvan päivän liputuspäivät <a href="https://mitatanaanliputetaan.vercel.app/api/liputuspaivat/today">/api/liputuspaivat/today</a></p>
                </div>
            </main>
        </div>
    )
}

export default Api