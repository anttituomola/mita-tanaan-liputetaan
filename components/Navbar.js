import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false)
  }, [router.pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const isActive = (path) => {
    if (path === '/' && router.pathname !== '/') {
      return false
    }
    return router.pathname.startsWith(path)
  }

  // Only render the menu after client-side hydration
  if (!mounted) {
    return (
      <header className="navArea">
        <nav aria-label="Päävalikko">
          <ul className="navbar">
            <li>
              <Link href="/" className="link">
                Mitä tänään liputetaan?
              </Link>
            </li>
            <li>
              <Link href="/kaikki-suomen-liputuspäivät" className="link">
                Kaikki liputuspäivät
              </Link>
            </li>
            <li>
              <Link href="/about" className="link">
                Tietoa
              </Link>
            </li>
            <li>
              <Link href="/rajapinta-api" className="link">
                Rajapinta eli API
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

  return (
    <header className="navArea">
      <nav aria-label="Päävalikko">
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Sulje valikko' : 'Avaa valikko'}
          aria-expanded={isOpen}
          aria-controls="main-menu"
        >
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        </button>
        <ul
          id="main-menu"
          className={`navbar ${isOpen ? 'open' : ''}`}
        >
          <li>
            <Link
              href="/"
              className={isActive('/') ? 'active' : ''}
              onClick={handleLinkClick}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Mitä tänään liputetaan?
            </Link>
          </li>
          <li>
            <Link
              href="/kaikki-suomen-liputuspäivät"
              className={isActive('/kaikki-suomen-liputuspäivät') ? 'active' : ''}
              onClick={handleLinkClick}
              aria-current={isActive('/kaikki-suomen-liputuspäivät') ? 'page' : undefined}
            >
              Kaikki liputuspäivät
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={isActive('/about') ? 'active' : ''}
              onClick={handleLinkClick}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              Tietoa
            </Link>
          </li>
          <li>
            <Link
              href="/rajapinta-api"
              className={isActive('/rajapinta-api') ? 'active' : ''}
              onClick={handleLinkClick}
              aria-current={isActive('/rajapinta-api') ? 'page' : undefined}
            >
              Rajapinta eli API
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
