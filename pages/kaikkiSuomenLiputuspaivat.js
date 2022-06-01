import { liputuspaivat } from "../liputuspaivat"
import Link from "next/link"
import dayjs from "dayjs"

const getDates = () => {
    const dates = Object.keys(liputuspaivat).map(key => {
        return (
            <p key={key}>
                <Link href={"/liputuspaivat/" + liputuspaivat[key].name}>{liputuspaivat[key].name}</Link>
            </p>
        )
    })
    return dates
}
const dynamicPages = () => {
    return (
        <div className="container">
            <h1>Kaikki Suomen liputuspäivät</h1>
            <div>{Object.keys(liputuspaivat).map(key => {
                return (
                    <p key={key}>
                        <Link className="link" href={"/liputuspaivat/" + liputuspaivat[key].name}>{liputuspaivat[key].name}</Link>,
                        {dayjs(liputuspaivat[key].date).format(" dddd, DD.MM.YYYY")}
                    </p>
                )
            })}</div>
        </div>
    )
}

export default dynamicPages