import { liputuspaivat } from "../../../../liputuspaivat"
import dayjs from "dayjs"

function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	try {
		const today = dayjs()
		const monthStart = today.startOf('month')
		const monthEnd = today.endOf('month')

		const liputuspaivatThisMonth = liputuspaivat.filter(liputuspaiva => {
			const liputuspaivaDate = dayjs(liputuspaiva.date)
			return liputuspaivaDate.isSame(today, 'month')
		})

		if (liputuspaivatThisMonth.length === 0) {
			return res.status(404).json({
				message: 'Tässä kuussa ei ole liputuspäiviä',
				month: today.format('MMMM YYYY')
			})
		}

		return res.status(200).json({
			data: liputuspaivatThisMonth,
			month: today.format('MMMM YYYY')
		})
	} catch (error) {
		console.error('Error in thisMonth API:', error)
		return res.status(500).json({
			message: 'Virhe haettaessa tämän kuukauden liputuspäiviä',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined
		})
	}
}

export default handler