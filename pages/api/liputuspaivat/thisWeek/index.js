import { liputuspaivat } from "../../../../liputuspaivat"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isoWeek from "dayjs/plugin/isoWeek"

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isoWeek)

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const today = dayjs()
        const weekStart = today.startOf('isoWeek')
        const weekEnd = today.endOf('isoWeek')

        const liputuspaivatThisWeek = liputuspaivat.filter(liputuspaiva => {
            const liputuspaivaDate = dayjs(liputuspaiva.date)
            return liputuspaivaDate.isSameOrAfter(weekStart, 'day') && 
                   liputuspaivaDate.isSameOrBefore(weekEnd, 'day')
        })

        if (liputuspaivatThisWeek.length === 0) {
            return res.status(404).json({ 
                message: 'Tällä viikolla ei ole liputuspäiviä',
                weekRange: {
                    start: weekStart.format('DD.MM.YYYY'),
                    end: weekEnd.format('DD.MM.YYYY')
                }
            })
        }

        return res.status(200).json({
            data: liputuspaivatThisWeek,
            weekRange: {
                start: weekStart.format('DD.MM.YYYY'),
                end: weekEnd.format('DD.MM.YYYY')
            }
        })
    } catch (error) {
        console.error('Error in thisWeek API:', error)
        return res.status(500).json({ 
            message: 'Virhe haettaessa tämän viikon liputuspäiviä',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}