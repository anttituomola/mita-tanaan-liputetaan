import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const HELSINKI_TZ = "Europe/Helsinki"

/** Current date/time in Finland (Europe/Helsinki). */
export function nowInHelsinki() {
	return dayjs().tz(HELSINKI_TZ)
}

/** Calendar date string for today in Helsinki (DD.MM.YYYY). */
export function helsinkiTodayFormatted() {
	return nowInHelsinki().format("DD.MM.YYYY")
}

/** True if the liputuspaiva calendar date is today in Helsinki. */
export function isLiputuspaivaToday(liputuspaivaDate) {
	const todayStr = helsinkiTodayFormatted()
	const paivaStr = dayjs(liputuspaivaDate).format("DD.MM.YYYY")
	return todayStr === paivaStr
}

export function formatLiputuspaivaForApi(paiva) {
	return {
		...paiva,
		date: dayjs.isDayjs(paiva.date) ? paiva.date.format() : paiva.date,
	}
}
