// Emergency API blocker - blocks ALL external requests
export function emergencyBlock(handler) {
	return (req, res) => {
		const host = req.headers.host
		const referer = req.headers.referer

		// Only allow localhost for development
		if (host && (host.includes('localhost') || host.includes('127.0.0.1'))) {
			return handler(req, res)
		}

		// Only allow requests with referer from exact domain
		if (referer && (
			referer.includes('mitatanaanliputetaan.vercel.app') ||
			referer.includes('mitatanaan-liputetaan.vercel.app')
		)) {
			return handler(req, res)
		}

		// Block EVERYTHING else
		return res.status(503).json({
			error: 'API temporarily unavailable',
			message: 'External API access is currently disabled due to abuse.',
			code: 'EMERGENCY_BLOCK_ACTIVE'
		})
	}
} 