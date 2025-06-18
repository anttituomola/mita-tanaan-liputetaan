// Simple in-memory rate limiter for API endpoints
const rateLimitMap = new Map()

export default function rateLimit(options = {}) {
	const {
		windowMs = 5 * 60 * 1000, // 5 minutes default
		maxRequests = 5, // 5 requests per window default
		message = 'Too many requests, please try again later.'
	} = options

	return (req, res, next) => {
		const ip = req.headers['x-forwarded-for'] ||
			req.headers['x-real-ip'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			'unknown'

		const now = Date.now()
		const windowStart = now - windowMs

		if (!rateLimitMap.has(ip)) {
			rateLimitMap.set(ip, [])
		}

		// Get requests for this IP
		const requests = rateLimitMap.get(ip)

		// Remove old requests outside the time window
		const recentRequests = requests.filter(timestamp => timestamp > windowStart)

		// Check if limit exceeded
		if (recentRequests.length >= maxRequests) {
			return res.status(429).json({
				error: message,
				retryAfter: Math.ceil(windowMs / 1000) // seconds
			})
		}

		// Add current request
		recentRequests.push(now)
		rateLimitMap.set(ip, recentRequests)

		// Clean up old entries periodically
		if (Math.random() < 0.01) { // 1% chance to clean up
			const cutoff = now - windowMs * 2
			for (const [key, timestamps] of rateLimitMap.entries()) {
				const recent = timestamps.filter(t => t > cutoff)
				if (recent.length === 0) {
					rateLimitMap.delete(key)
				} else {
					rateLimitMap.set(key, recent)
				}
			}
		}

		// Continue to the actual handler
		if (next) next()
	}
}

// Helper function to wrap API handlers with rate limiting
export function withRateLimit(handler, options = {}) {
	const limiter = rateLimit(options)

	return (req, res) => {
		limiter(req, res, () => handler(req, res))
	}
} 