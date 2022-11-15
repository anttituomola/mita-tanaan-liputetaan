import { liputuspaivat } from "../../../liputuspaivat"

export default function handler(req, res) {
    if (req.method === 'GET') {
        try {
            res.status(200).json(liputuspaivat)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
  }
  