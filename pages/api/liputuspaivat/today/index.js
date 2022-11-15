import { liputuspaivat } from "../../../../liputuspaivat"
import dayjs from "dayjs"

export default function handler(req, res) {
    const today = dayjs()
    const liputuspaivaOnToday = liputuspaivat.filter(liputuspaiva => {
        const liputuspaivaDate = dayjs(liputuspaiva.date)
        return liputuspaivaDate.isSame(today, 'day')
    })
    if (req.method === 'GET') {
        try {
            if (liputuspaivaOnToday.length > 0) {
                res.status(200).json(liputuspaivaOnToday)
            } else {
                res.status(404).json({ message: 'Tänään ei liputeta' })
            }
                
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
  }
  