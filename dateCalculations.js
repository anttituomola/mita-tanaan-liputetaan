import dayjs from "dayjs"
import "dayjs/locale/fi"
dayjs.locale("fi")

export const mothersDay = () => {
    const mayFirst = dayjs(dayjs().year() + "-05-01")
    let firstSunday = ""
    if (dayjs(mayFirst).day() === 0) {
        firstSunday = mayFirst
    } else {
        firstSunday = dayjs(mayFirst).add(7 - dayjs(mayFirst).day(), "day")
    }
    const mothersDay = dayjs(firstSunday).add(7, "day")
    return mothersDay
} 

export const juhannus = () => {
    const aloituspaiva = dayjs(dayjs().year() + "-6-20")
    let juhannuspaiva = ""
    if (dayjs(aloituspaiva).day() === 6) {
        juhannuspaiva = aloituspaiva
    } else {
        juhannuspaiva = dayjs(aloituspaiva).add(6 - dayjs(aloituspaiva).day(), "day")
    }
    return juhannuspaiva
}

export const fathersDay = () => {
    const noverberFirst = dayjs(dayjs().year() + "-11-01")
    let firstSunday = ""
    if (dayjs(noverberFirst).day() === 0) {
        firstSunday = noverberFirst
    } else {
        firstSunday = dayjs(noverberFirst).add(7 - dayjs(noverberFirst).day(), "day")
    }
    const fathersDay = dayjs(firstSunday).add(7, "day")
    return fathersDay
}

export const kaatuneittenMuistopaiva = () => {
    const paiva = dayjs(mothersDay()).add(7, "day")
    return paiva
}

export const suomenLuonnonPaiva = () => {
    const augustFirst = dayjs(dayjs().year() + "-08-01")
    const augustLast = dayjs(augustFirst).endOf("month")
    
    // Find the last Saturday of August
    let lastSaturday = augustLast
    while (lastSaturday.day() !== 6) {
        lastSaturday = lastSaturday.subtract(1, "day")
    }
    
    return lastSaturday
}