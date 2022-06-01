import { useRouter } from "next/router"
import { liputuspaivat } from "../../liputuspaivat"
import dayjs from "dayjs"

const liputuspaiva = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const queryDate = router.query.liputuspaiva
    const theDate = {}

    for (let day in liputuspaivat) {
        if (liputuspaivat[day].name === queryDate) {
            theDate = liputuspaivat[day]
        }
    }

    return (
        <div className="container">
            <h1>{queryDate}</h1>
            <h3>{dayjs(theDate.date).format("dddd, DD.MM.YYYY")}</h3>
            <small><p>{theDate.official === true ? "Virallinen liputuspäivä" : "Suositeltu liputuspäivä"}</p></small>
            <p>{theDate.description}</p>
            <p>Lue lisää: {<a href={theDate.links} target="_blank" rel="noreferrer">Wikipedia</a>}</p>
        </div>
    )
}

export default liputuspaiva