import { liputuspaivat } from "../../../../liputuspaivat"
import dayjs from "dayjs"

function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	try {
		const today = dayjs()
		const liputuspaivatToday = liputuspaivat.filter(liputuspaiva => {
			const liputuspaivaDate = dayjs(liputuspaiva.date)
			return liputuspaivaDate.isSame(today, 'day')
		})

		if (liputuspaivatToday.length === 0) {
			return res.status(404).json({
				message: 'Tänään ei ole liputuspäivä',
				date: today.format('DD.MM.YYYY')
			})
		}

		return res.status(200).json({
			data: liputuspaivatToday,
			date: today.format('DD.MM.YYYY')
		})
	} catch (error) {
		console.error('Error in today API:', error)
		return res.status(500).json({
			message: 'Virhe haettaessa tämän päivän liputuspäiviä',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined
		})
	}
}

// Export with rate limiting: 3 requests per hour per IP
export default withRateLimit(handler, {
	windowMs: 60 * 60 * 1000, // 1 hour
	maxRequests: 3, // 3 requests per window
	message: 'Too many requests to today endpoint. Please wait before trying again.'
})
