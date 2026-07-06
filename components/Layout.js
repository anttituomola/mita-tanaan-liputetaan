import Navbar from './Navbar'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <main id="main-content">{props.children}</main>
      <Footer />
    </>
  )
}

export default Layout
