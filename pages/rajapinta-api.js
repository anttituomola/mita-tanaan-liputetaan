import { liputuspaivat } from "../liputuspaivat"
import Link from "next/link"
import dayjs from "dayjs"
import Head from "next/head"
import { useState } from 'react'

const Api = () => {
    const [apiData, setApiData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchApiData = async (endpoint) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(endpoint)
            const data = await response.json()
            setApiData(data)
        } catch (err) {
            setError('Virhe haettaessa dataa: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleApiClick = (e, endpoint) => {
        e.preventDefault()
        fetchApiData(endpoint)
    }

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
                    
                    <h2>API Dokumentaatio</h2>
                    <div className="api-docs">
                        <h3>Yleistä</h3>
                        <p>Kaikki API-kutsut palauttavat JSON-muotoisen vastauksen. Jokainen liputuspäivä sisältää seuraavat kentät:</p>
                        <ul>
                            <li><code>name</code> - Liputuspäivän nimi</li>
                            <li><code>date</code> - Päivämäärä ISO-muodossa</li>
                            <li><code>description</code> - Kuvaus liputuspäivästä</li>
                            <li><code>official</code> - Boolean-arvo, joka kertoo onko kyseessä virallinen liputuspäivä</li>
                            <li><code>links</code> - Lista linkkejä lisätietoihin</li>
                        </ul>

                        <h3>Päätepisteen tiedot</h3>
                        <div className="endpoint-docs">
                            <h4>Kaikki liputuspäivät</h4>
                            <p><code>GET /api/liputuspaivat</code></p>
                            <p>Palauttaa kaikki liputuspäivät ja niiden lukumäärän.</p>
                            
                            <h4>Tämän päivän liputuspäivät</h4>
                            <p><code>GET /api/liputuspaivat/today</code></p>
                            <p>Palauttaa kuluvan päivän liputuspäivät. Jos liputuspäivää ei ole, palauttaa 404-vastauksen.</p>
                            
                            <h4>Tämän viikon liputuspäivät</h4>
                            <p><code>GET /api/liputuspaivat/thisWeek</code></p>
                            <p>Palauttaa kuluvan viikon (ma-su) liputuspäivät ja viikon päivämäärävälin.</p>
                            
                            <h4>Tämän kuukauden liputuspäivät</h4>
                            <p><code>GET /api/liputuspaivat/thisMonth</code></p>
                            <p>Palauttaa kuluvan kuukauden liputuspäivät ja kuukauden nimen.</p>
                        </div>

                        <h3>Kokeile API:a</h3>
                        <p>Klikkaa alla olevia linkkejä nähdäksesi API-vastaukset:</p>
                    </div>

                    <ul className="api-list">
                        <li>
                            <p>Kaikki liputuspäivät: <a href="/api/liputuspaivat" onClick={(e) => handleApiClick(e, '/api/liputuspaivat')}>/api/liputuspaivat</a></p>
                        </li>
                        <li>
                            <p>Kuluvan viikon liputuspäivät: <a href="/api/liputuspaivat/thisWeek" onClick={(e) => handleApiClick(e, '/api/liputuspaivat/thisWeek')}>/api/liputuspaivat/thisWeek</a></p>
                        </li>
                        <li>
                            <p>Kuluvan kuun liputuspäivät: <a href="/api/liputuspaivat/thisMonth" onClick={(e) => handleApiClick(e, '/api/liputuspaivat/thisMonth')}>/api/liputuspaivat/thisMonth</a></p>
                        </li>
                        <li>
                            <p>Kuluvan päivän liputuspäivät: <a href="/api/liputuspaivat/today" onClick={(e) => handleApiClick(e, '/api/liputuspaivat/today')}>/api/liputuspaivat/today</a></p>
                        </li>
                    </ul>

                    {loading && <p className="api-status">Ladataan...</p>}
                    {error && <p className="api-status error">{error}</p>}
                    {apiData && (
                        <div className="api-response">
                            <h2>API Vastaus:</h2>
                            <pre>{JSON.stringify(apiData, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Api