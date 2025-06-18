import { liputuspaivat } from "../../../../liputuspaivat"
import dayjs from "dayjs"
import { withRateLimit } from "../../../../utils/rateLimiter"

function handler(req, res) {
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

// Export with rate limiting: 3 requests per hour per IP
export default withRateLimit(handler, {
	windowMs: 60 * 60 * 1000, // 1 hour
	maxRequests: 3, // 3 requests per window
	message: 'Too many requests to today endpoint. Please wait before trying again.'
})
