import { useState, useEffect } from 'react'

const Footer = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Return a simple placeholder during server-side rendering
  if (!mounted) {
    return <footer className="footer"></footer>
  }

  return (
    <footer className="footer">
      <a href="https://anttituomola.fi" target="_blank" rel="noreferrer">
        © Antti Tuomola
      </a>
    </footer>
  )
}

export default Footer
