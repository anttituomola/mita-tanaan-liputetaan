
const api = () => {
    return (
        <div>
            <main className="container2">
                <h1>Rajapinta eli API</h1>
                <p>mitätänäänliputetaan.fi tarjoaa käyttöösi avoimen rajapinnan Suomen liputuspäivädataan.</p>
                <p>Voit hakea liputuspäivätiedot JSON-muodossa osoitteesta <a href="https://mitatanaanliputetaan.fi/api/liputuspäivät">https://mitatanaanliputetaan.fi/api/liputuspaivat</a></p>
                <p>Kuluvan viikon liputuspäivät <a href="https://mitatanaanliputetaan.fi/api/liputuspäivät/thisWeek">https://mitatanaanliputetaan.fi/api/liputuspaivat/thisWeek</a></p>
                <p>Kuluvan kuun liputuspäivät <a href="https://mitatanaanliputetaan.fi/api/liputuspäivät/thisMonth">https://mitatanaanliputetaan.fi/api/liputuspaivat/thisMonth</a></p>
                <p>Kuluvan päivän liputuspäivät <a href="https://mitatanaanliputetaan.fi/api/today">https://mitatanaanliputetaan.fi/api/today</a></p>
            </main>

        </div>

    )
}

export default api