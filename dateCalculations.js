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
    // Get the last day of August
    const augustLast = dayjs(dayjs().year() + "-08-31")
    
    // Find the last Saturday of August
    // If August 31st is Saturday (day 6), that's our date
    // Otherwise, go back to the previous Saturday
    let lastSaturday = ""
    if (dayjs(augustLast).day() === 6) {
        lastSaturday = augustLast
    } else {
        // Go back to the previous Saturday
        const daysToSubtract = dayjs(augustLast).day() === 0 ? 1 : dayjs(augustLast).day() + 1
        lastSaturday = dayjs(augustLast).subtract(daysToSubtract, "day")
    }
    
    return lastSaturday
}