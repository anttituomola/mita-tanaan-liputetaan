import { liputuspaivat } from '../liputuspaivat';
import Link from 'next/link';
import dayjs from 'dayjs';
import Head from 'next/head';
import { useState } from 'react';

interface ApiLinkProps {
  href: string;
  children: React.ReactNode;
}

interface ApiResponse {
  data?: any;
  message?: string;
  count?: number;
  date?: string;
  weekRange?: {
    start: string;
    end: string;
  };
  month?: string;
}

const Api: React.FC = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApiData = async (endpoint: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      const data: ApiResponse = await response.json();
      setApiData(data);
    } catch (err) {
      setError(
        'Virhe haettaessa dataa: ' +
          (err instanceof Error ? err.message : 'Tuntematon virhe')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApiClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    endpoint: string
  ): void => {
    e.preventDefault();
    fetchApiData(endpoint);
  };

  const ApiLink: React.FC<ApiLinkProps> = ({ href, children }) => (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        handleApiClick(e, href)
      }
      className='api-link'
    >
      {children}
    </button>
  );

  return (
    <div>
      <Head>
        <title>
          Liputuspäivät-API eli rajapinta: kaikki Suomen liputuspäivät
        </title>
        <meta
          name='title'
          content='Ilmainen ja avoin rajapinta eli API suomalaisille liputuspäiville'
        />
        <meta
          name='description'
          content='Katso, mikä liputuspäivä tänään on? Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!'
        />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://mitatanaanliputetaan.vercel.app/'
        />
        <meta property='og:title' content='Mitä tänään liputetaan?' />
        <meta
          property='og:description'
          content='Katso, mikä liputuspäivä tänään on! Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!'
        />
        <meta property='og:image' content='mita_tanaan_liputetaan.png' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content='https://mitatanaanliputetaan.vercel.app/'
        />
        <meta property='twitter:title' content='Mitä tänään liputetaan?' />
        <meta
          property='twitter:description'
          content='Katso, mikä liputuspäivä tänään on! Lista kaikista Suomen liputuspäivistä, lisätiedot ja Wikipedia-linkit!'
        />
        <meta property='twitter:image' content='mita_tanaan_liputetaan.png' />
      </Head>

      <main className='container'>
        <div className='breakRows'>
          <h1>Rajapinta eli API</h1>

          <div
            className='api-notice'
            style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ marginTop: 0, color: '#856404' }}>
              ⚠️ API-käyttö tilapäisesti rajoitettu
            </h3>
            <p style={{ marginBottom: 0 }}>
              Ulkoisten kutsujen määrä on kasvanut liikaa, joten API on
              tilapäisesti suljettu ulkoisilta käyttäjiltä. Jos tarvitset
              API-käyttöä projektissasi, ole yhteydessä sähköpostitse. Sivuston
              sisäinen toiminnallisuus jatkaa normaalia toimintaa.
            </p>
          </div>

          <p>
            https://mitatanaanliputetaan.vercel.app/ tarjoaa avoimen rajapinnan
            Suomen liputuspäivädataan.
          </p>

          <h2>API Dokumentaatio</h2>
          <div className='api-docs'>
            <h3>Yleistä</h3>
            <p>
              Kaikki API-kutsut palauttavat JSON-muotoisen vastauksen. Jokainen
              liputuspäivä sisältää seuraavat kentät:
            </p>
            <ul>
              <li>
                <code>name</code> - Liputuspäivän nimi
              </li>
              <li>
                <code>date</code> - Päivämäärä ISO-muodossa
              </li>
              <li>
                <code>description</code> - Kuvaus liputuspäivästä
              </li>
              <li>
                <code>official</code> - Boolean-arvo, joka kertoo onko kyseessä
                virallinen liputuspäivä
              </li>
              <li>
                <code>links</code> - Lista linkkejä lisätietoihin
              </li>
            </ul>

            <h3>Päätepisteen tiedot</h3>
            <div className='endpoint-docs'>
              <h4>Kaikki liputuspäivät</h4>
              <p>
                <code>GET /api/liputuspaivat</code>
              </p>
              <p>Palauttaa kaikki liputuspäivät ja niiden lukumäärän.</p>

              <h4>Tämän päivän liputuspäivät</h4>
              <p>
                <code>GET /api/liputuspaivat/today</code>
              </p>
              <p>
                Palauttaa kuluvan päivän liputuspäivät. Jos liputuspäivää ei
                ole, palauttaa 404-vastauksen.
              </p>

              <h4>Tämän viikon liputuspäivät</h4>
              <p>
                <code>GET /api/liputuspaivat/thisWeek</code>
              </p>
              <p>
                Palauttaa kuluvan viikon (ma-su) liputuspäivät ja viikon
                päivämäärävälin.
              </p>

              <h4>Tämän kuukauden liputuspäivät</h4>
              <p>
                <code>GET /api/liputuspaivat/thisMonth</code>
              </p>
              <p>
                Palauttaa kuluvan kuukauden liputuspäivät ja kuukauden nimen.
              </p>
            </div>

            <h3>Kokeile API:a</h3>
            <p>Klikkaa alla olevia linkkejä nähdäksesi API-vastaukset:</p>
          </div>

          <ul className='api-list'>
            <li>
              <p>
                Kaikki liputuspäivät:{' '}
                <ApiLink href='/api/liputuspaivat'>/api/liputuspaivat</ApiLink>
              </p>
            </li>
            <li>
              <p>
                Kuluvan viikon liputuspäivät:{' '}
                <ApiLink href='/api/liputuspaivat/thisWeek'>
                  /api/liputuspaivat/thisWeek
                </ApiLink>
              </p>
            </li>
            <li>
              <p>
                Kuluvan kuun liputuspäivät:{' '}
                <ApiLink href='/api/liputuspaivat/thisMonth'>
                  /api/liputuspaivat/thisMonth
                </ApiLink>
              </p>
            </li>
            <li>
              <p>
                Kuluvan päivän liputuspäivät:{' '}
                <ApiLink href='/api/liputuspaivat/today'>
                  /api/liputuspaivat/today
                </ApiLink>
              </p>
            </li>
          </ul>

          {loading && <p className='api-status'>Ladataan...</p>}
          {error && <p className='api-status error'>{error}</p>}
          {apiData && (
            <div className='api-response'>
              <h2>API Vastaus:</h2>
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Api;
