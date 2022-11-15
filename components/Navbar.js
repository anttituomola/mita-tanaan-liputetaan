import Link from "next/link"

const Navbar = () => {
    return (
        <div className="navArea">
            <nav>
                <ul className="navbar">
                    <li><Link href="/">Mitä tänään liputetaan?</Link></li>
                    <li><Link href="/kaikkiSuomenLiputuspaivat">Kaikki liputuspäivät</Link></li>
                    <li><Link href="/about">Tietoa</Link></li>
                    <li><Link href="/rajapinta-api">Rajapinta eli API</Link></li>
                </ul>
            </nav>
        </div>)
}

export default Navbar