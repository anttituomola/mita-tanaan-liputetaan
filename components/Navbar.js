import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

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
            <div className="navArea">
                <nav>
                    <ul className="navbar">
                        <li><Link href="/" className="link">Mitä tänään liputetaan?</Link></li>
                        <li><Link href="/kaikkiSuomenLiputuspaivat" className="link">Kaikki liputuspäivät</Link></li>
                        <li><Link href="/about" className="link">Tietoa</Link></li>
                        <li><Link href="/rajapinta-api" className="link">Rajapinta eli API</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }

    return (
        <div className="navArea">
            <nav>
                <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
                </button>
                <ul className={`navbar ${isOpen ? 'open' : ''}`}>
                    <li>
                        <Link 
                            href="/" 
                            className={isActive('/') ? 'active' : ''}
                            onClick={handleLinkClick}
                        >
                            Mitä tänään liputetaan?
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/kaikkiSuomenLiputuspaivat" 
                            className={isActive('/kaikkiSuomenLiputuspaivat') ? 'active' : ''}
                            onClick={handleLinkClick}
                        >
                            Kaikki liputuspäivät
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/about" 
                            className={isActive('/about') ? 'active' : ''}
                            onClick={handleLinkClick}
                        >
                            Tietoa
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/rajapinta-api" 
                            className={isActive('/rajapinta-api') ? 'active' : ''}
                            onClick={handleLinkClick}
                        >
                            Rajapinta eli API
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar