import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#002f6c" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
