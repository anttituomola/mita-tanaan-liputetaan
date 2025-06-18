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

// Helper function to block external requests
function blockExternalRequests(req, res, next) {
	const host = req.headers.host
	const referer = req.headers.referer
	const origin = req.headers.origin

	// Allow localhost and local development
	if (host && (host.includes('localhost') || host.includes('127.0.0.1'))) {
		return next()
	}

	// Allow requests from same domain
	if (referer && referer.includes(host)) {
		return next()
	}

	// Allow requests from same origin
	if (origin && origin.includes(host)) {
		return next()
	}

	// Block all other external requests
	return res.status(403).json({
		error: 'API access temporarily disabled for external requests',
		message: 'This API is currently only available for internal use'
	})
}

// Helper function to wrap API handlers with external blocking and rate limiting
export function withRateLimit(handler, options = {}) {
	const limiter = rateLimit(options)

	return (req, res) => {
		// First block external requests
		blockExternalRequests(req, res, () => {
			// Then apply rate limiting
			limiter(req, res, () => handler(req, res))
		})
	}
} 