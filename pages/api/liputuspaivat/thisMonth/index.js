import { liputuspaivat } from "../../../../liputuspaivat"
import dayjs from "dayjs"

export default function handler(req, res) {
    const today = dayjs()
    const liputuspaivatOnThisMonth = liputuspaivat.filter(liputuspaiva => {
        const liputuspaivaDate = dayjs(liputuspaiva.date)
        return liputuspaivaDate.isSame(today, 'month')
    })
    if (req.method === 'GET') {
        try {
            res.status(200).json(liputuspaivatOnThisMonth)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
  }
  