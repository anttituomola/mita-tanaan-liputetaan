import { liputuspaivat } from "../../../liputuspaivat"

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        if (!liputuspaivat || liputuspaivat.length === 0) {
            return res.status(404).json({ message: 'Liputuspäiviä ei löytynyt' })
        }

        return res.status(200).json({
            data: liputuspaivat,
            count: liputuspaivat.length
        })
    } catch (error) {
        console.error('Error in liputuspaivat API:', error)
        return res.status(500).json({ 
            message: 'Virhe haettaessa liputuspäiviä',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}