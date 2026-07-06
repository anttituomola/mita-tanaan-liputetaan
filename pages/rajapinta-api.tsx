import { liputuspaivat } from '../liputuspaivat';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useState } from 'react';
import Seo, {
  SITE_URL,
  createWebPageSchema,
  createBreadcrumbSchema,
} from '../components/Seo';

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

  const pageTitle = 'Rajapinta eli API';
  const pageUrl = `${SITE_URL}/rajapinta-api`;
  const pageDescription =
    'Ilmainen ja avoin rajapinta eli API suomalaisille liputuspäiville. Hae kaikki liputuspäivät, tämän päivän, viikon tai kuukauden liputuspäivät JSON-muodossa.';

  const structuredData = [
    createWebPageSchema({
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
    }),
    createBreadcrumbSchema([
      { name: 'Etusivu', url: SITE_URL },
      { name: pageTitle, url: pageUrl },
    ]),
  ];

  return (
    <div>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonical={pageUrl}
        structuredData={structuredData}
      />

      <div className='container'>
        <div className='breakRows'>
          <h1>Rajapinta eli API</h1>

          <div className='api-notice'>
            <h2>🔐 API-käyttö vaatii API-avaimen</h2>
            <p>
              Väärinkäytön estämiseksi API vaatii nyt API-avaimen ulkoisiin kutsuihin. 
              Jos tarvitset API-käyttöä projektissasi, ole yhteydessä sähköpostitse 
              saadaksesi henkilökohtaisen API-avaimen. Sivuston sisäinen toiminnallisuus 
              jatkaa normaalia toimintaa.
            </p>
          </div>

          <p>
            https://mitatanaanliputetaan.vercel.app/ tarjoaa rajapinnan
            Suomen liputuspäivädataan.
          </p>

          <h2>API-dokumentaatio</h2>
          <div className='api-docs'>
            <h3>Yleistä</h3>
            <p>
              Kaikki API-kutsut palauttavat JSON-muotoisen vastauksen. Ulkoiset 
              kutsut vaativat API-avaimen HTTP-headerissa. Jokainen liputuspäivä 
              sisältää seuraavat kentät:
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

            <h3>Autentikointi</h3>
            <p>
              Ulkoiset API-kutsut vaativat API-avaimen. Lähetä avain joko:
            </p>
            <ul>
              <li><code>X-API-Key</code> headerissa</li>
              <li><code>Authorization: Bearer your-api-key</code> headerissa</li>
            </ul>
            <p>Esimerkki cURL-kutsusta:</p>
            <pre><code>curl -H &quot;X-API-Key: your-api-key&quot; https://mitatanaanliputetaan.vercel.app/api/liputuspaivat</code></pre>

            <h3>Päätepisteiden tiedot</h3>
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
              <h2>API-vastaus:</h2>
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Api;
