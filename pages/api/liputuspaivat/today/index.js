import { liputuspaivat } from "../../../../liputuspaivat"
import {
	formatLiputuspaivaForApi,
	helsinkiTodayFormatted,
	isLiputuspaivaToday,
} from "../../../../utils/helsinkiToday"

function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	try {
		const date = helsinkiTodayFormatted()
		const liputuspaivatToday = liputuspaivat
			.filter((liputuspaiva) => isLiputuspaivaToday(liputuspaiva.date))
			.map(formatLiputuspaivaForApi)

		if (liputuspaivatToday.length === 0) {
			return res.status(200).json({
				data: [],
				date,
				message: 'Tänään ei ole liputuspäivä',
			})
		}

		return res.status(200).json({
			data: liputuspaivatToday,
			date,
		})
	} catch (error) {
		console.error('Error in today API:', error)
		return res.status(500).json({
			message: 'Virhe haettaessa tämän päivän liputuspäiviä',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined
		})
	}
}

export default handler
