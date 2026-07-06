import Seo, {
  SITE_URL,
  createWebPageSchema,
  createBreadcrumbSchema,
} from '../components/Seo'

const About = () => {
  const pageTitle = 'Tietoa sivustosta'
  const pageUrl = `${SITE_URL}/about`
  const pageDescription =
    'Mitä tänään liputetaan? -sivusto kertoo nopeasti, mikä Suomen liputuspäivä tänään on. Tekijänä Antti Tuomola.'

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
        <h2>Tekijästä</h2>
        <p>
          <a
            href="https://anttituomola.fi"
            target="_blank"
            rel="noreferrer"
          >
            Antti Tuomola
          </a>{' '}
          on keski-ikäistyvä ohjelmistokehittäjä, joka kyllästyi miettimään, mitä
          tänään liputetaan.
        </p>
        <p>
          Huomasitko virheen? Puske korjaus sisään{' '}
          <a
            href="https://github.com/anttituomola/mita-tanaan-liputetaan"
            target="_blank"
            rel="noreferrer"
          >
            Githubissa
          </a>
          !
        </p>
      </div>
    </>
  )
}

export default About
