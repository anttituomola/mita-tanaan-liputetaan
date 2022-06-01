import { liputuspaivat } from "../liputuspaivat"
import Link from "next/link"
import dayjs from "dayjs"
import Head from "next/head"

const getDates = () => {
    const dates = Object.keys(liputuspaivat).map(key => {
        return (
            <p key={key}>
                <Link href={"/liputuspaivat/" + liputuspaivat[key].name}>{liputuspaivat[key].name}</Link>
            </p>
        )
    })
    return dates
}
const dynamicPages = () => {
    return (
        <div className="container">
            <Head>
                <title>Kaikki Suomen liputuspäivät: mitätänäänliputetaan.fi</title>
                <meta name="title" content="Mitä tänään liputetaan? Kaikki Suomen liputuspäivät!" />
                <meta name="description" content="Katso, mikä liputuspäivä tänään on? Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!" />

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

            <h1>Kaikki Suomen liputuspäivät</h1>
            <div>{Object.keys(liputuspaivat).map(key => {
                return (
                    <p key={key}>
                        <Link className="link" href={"/liputuspaivat/" + liputuspaivat[key].name}>{liputuspaivat[key].name}</Link>,
                        {dayjs(liputuspaivat[key].date).format(" dddd, DD.MM.YYYY")}
                    </p>
                )
            })}</div>
        </div>
    )
}

export default dynamicPages