import Link from "next/link"

const Navbar = () => {
    return (
        <div className="navArea">
            <nav>
                <ul className="navbar">
                    <li><Link href="/">Mitä tänään liputetaan?</Link></li>
                    <li><Link href="/kaikkiSuomenLiputuspaivat">Kaikki liputuspäivät</Link></li>
                    <li><Link href="/about">Tietoa</Link></li>
                </ul>
            </nav>
        </div>)
}

export default Navbar