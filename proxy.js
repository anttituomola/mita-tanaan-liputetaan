import { NextResponse } from 'next/server'

// Simple in-memory rate limiter for failed auth attempts
// Note: This is per-edge-instance, not global. For production scale, consider Vercel KV or Edge Config
const failedAuthAttempts = new Map()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_FAILED_ATTEMPTS = 10 // Max failed attempts per hour per IP

// IP blocking for repeated rate limit violations
const blockedIPs = new Map() // IP -> blocked until timestamp
const BLOCK_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const MAX_RATE_LIMIT_VIOLATIONS = 3 // Block after 3 rate limit violations
const rateLimitViolations = new Map() // IP -> array of violation timestamps

function getClientIP(request) {
	// Try various headers that Vercel/proxies use
	const forwarded = request.headers.get('x-forwarded-for')
	if (forwarded) {
		return forwarded.split(',')[0].trim()
	}
	return request.headers.get('x-real-ip') || 
		   request.headers.get('cf-connecting-ip') || 
		   'unknown'
}

function maskApiKey(apiKey) {
	if (!apiKey) return 'none'
	if (apiKey.length <= 8) return '***'
	return `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`
}

function logRequest(request, status, code, details = {}) {
	const timestamp = new Date().toISOString()
	const method = request.method
	const path = request.nextUrl.pathname
	const ip = getClientIP(request)
	const userAgent = request.headers.get('user-agent') || 'unknown'
	const referer = request.headers.get('referer') || 'none'
	
	const logEntry = {
		timestamp,
		method,
		path,
		ip,
		status,
		code,
		userAgent: userAgent.substring(0, 100), // Limit length
		referer: referer.substring(0, 100), // Limit length
		...details
	}
	
	console.log(`[API ${status}]`, JSON.stringify(logEntry))
}

function isIPBlocked(ip) {
	const blockedUntil = blockedIPs.get(ip)
	if (!blockedUntil) return false
	
	const now = Date.now()
	if (now > blockedUntil) {
		// Block expired, remove it
		blockedIPs.delete(ip)
		rateLimitViolations.delete(ip)
		return false
	}
	
	return true // Still blocked
}

function recordRateLimitViolation(ip) {
	const now = Date.now()
	const violations = rateLimitViolations.get(ip) || []
	
	// Remove old violations (older than block duration)
	const recentViolations = violations.filter(timestamp => timestamp > now - BLOCK_DURATION)
	
	// Add current violation
	recentViolations.push(now)
	rateLimitViolations.set(ip, recentViolations)
	
	// If too many violations, block the IP
	if (recentViolations.length >= MAX_RATE_LIMIT_VIOLATIONS) {
		const blockedUntil = now + BLOCK_DURATION
		blockedIPs.set(ip, blockedUntil)
		return true // IP is now blocked
	}
	
	return false // Not blocked yet
}

function checkRateLimit(ip) {
	const now = Date.now()
	const attempts = failedAuthAttempts.get(ip) || []
	
	// Remove old attempts outside the window
	const recentAttempts = attempts.filter(timestamp => timestamp > now - RATE_LIMIT_WINDOW)
	
	if (recentAttempts.length >= MAX_FAILED_ATTEMPTS) {
		return false // Rate limited
	}
	
	// Add current attempt
	recentAttempts.push(now)
	failedAuthAttempts.set(ip, recentAttempts)
	
	// Clean up old entries periodically (1% chance)
	if (Math.random() < 0.01) {
		const cutoff = now - RATE_LIMIT_WINDOW * 2
		for (const [key, timestamps] of failedAuthAttempts.entries()) {
			const recent = timestamps.filter(t => t > cutoff)
			if (recent.length === 0) {
				failedAuthAttempts.delete(key)
			} else {
				failedAuthAttempts.set(key, recent)
			}
		}
		// Also clean up expired blocks
		for (const [key, blockedUntil] of blockedIPs.entries()) {
			if (now > blockedUntil) {
				blockedIPs.delete(key)
				rateLimitViolations.delete(key)
			}
		}
	}
	
	return true // Not rate limited
}

export function proxy(request) {
	// Only apply to API routes
	if (request.nextUrl.pathname.startsWith('/api/')) {
		const host = request.headers.get('host')
		const referer = request.headers.get('referer')
		const userAgent = request.headers.get('user-agent') || ''
		const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '')

		// Allow localhost for development
		if (host && (host.includes('localhost') || host.includes('127.0.0.1'))) {
			return NextResponse.next()
		}

		// Check if IP is blocked first
		const clientIP = getClientIP(request)
		if (isIPBlocked(clientIP)) {
			const blockedUntil = blockedIPs.get(clientIP)
			const hoursRemaining = Math.ceil((blockedUntil - Date.now()) / (60 * 60 * 1000))
			logRequest(request, 403, 'IP_BLOCKED', {
				authType: 'blocked',
				reason: 'IP blocked due to repeated rate limit violations',
				blockedUntil: new Date(blockedUntil).toISOString(),
				hoursRemaining
			})
			return new NextResponse(
				JSON.stringify({
					error: 'IP address blocked',
					message: `This IP address has been temporarily blocked due to repeated violations. Block expires in ${hoursRemaining} hour(s).`,
					code: 'IP_BLOCKED',
					blockedUntil: new Date(blockedUntil).toISOString()
				}),
				{
					status: 403,
					headers: { 'Content-Type': 'application/json' }
				}
			)
		}

		// Check for valid API key first
		const validApiKeys = process.env.API_KEYS?.split(',').map(key => key.trim()) || []
		
		if (apiKey) {
			// API key provided - check if it's valid
			if (validApiKeys.includes(apiKey)) {
				logRequest(request, 200, 'VALID_API_KEY', {
					apiKeyMasked: maskApiKey(apiKey),
					authType: 'api_key'
				})
				return NextResponse.next()
			} else {
				// Invalid API key provided - check rate limit
				if (!checkRateLimit(clientIP)) {
					// Record this rate limit violation
					const isNowBlocked = recordRateLimitViolation(clientIP)
					
					logRequest(request, 429, 'RATE_LIMIT_EXCEEDED', {
						apiKeyMasked: maskApiKey(apiKey),
						authType: 'invalid_api_key',
						reason: 'Too many failed attempts',
						isNowBlocked
					})
					
					if (isNowBlocked) {
						return new NextResponse(
							JSON.stringify({
								error: 'IP address blocked',
								message: 'This IP address has been blocked due to repeated rate limit violations. Please contact support or try again in 24 hours.',
								code: 'IP_BLOCKED',
								blockedUntil: new Date(Date.now() + BLOCK_DURATION).toISOString()
							}),
							{
								status: 403,
								headers: { 'Content-Type': 'application/json' }
							}
						)
					}
					
					return new NextResponse(
						JSON.stringify({
							error: 'Too many failed authentication attempts',
							message: 'You have exceeded the rate limit for failed authentication attempts. Please try again later.',
							code: 'RATE_LIMIT_EXCEEDED',
							retryAfter: 60
						}),
						{
							status: 429,
							headers: { 
								'Content-Type': 'application/json',
								'Retry-After': '60'
							}
						}
					)
				}
				
				// Invalid API key provided
				logRequest(request, 401, 'INVALID_API_KEY', {
					apiKeyMasked: maskApiKey(apiKey),
					authType: 'invalid_api_key'
				})
				return new NextResponse(
					JSON.stringify({
						error: 'Invalid API key',
						message: 'The provided API key is not valid. Please check your key and try again.',
						code: 'INVALID_API_KEY'
					}),
					{
						status: 401,
						headers: { 'Content-Type': 'application/json' }
					}
				)
			}
		}

		// No API key provided - check if request is from allowed domain
		const allowedDomains = [
			'mitatanaanliputetaan.vercel.app',
			'mitatanaan-liputetaan.vercel.app'
		]

		if (referer) {
			const isFromAllowedDomain = allowedDomains.some(domain =>
				referer.includes(domain)
			)

			if (isFromAllowedDomain) {
				logRequest(request, 200, 'ALLOWED_DOMAIN', {
					authType: 'referer',
					domain: referer
				})
				return NextResponse.next()
			}
		}

		// No API key and not from allowed domain - check rate limit
		if (!checkRateLimit(clientIP)) {
			// Record this rate limit violation
			const isNowBlocked = recordRateLimitViolation(clientIP)
			
			logRequest(request, 429, 'RATE_LIMIT_EXCEEDED', {
				authType: 'no_api_key',
				reason: 'Too many requests without API key',
				isNowBlocked
			})
			
			if (isNowBlocked) {
				return new NextResponse(
					JSON.stringify({
						error: 'IP address blocked',
						message: 'This IP address has been blocked due to repeated rate limit violations. Please contact support or try again in 24 hours.',
						code: 'IP_BLOCKED',
						blockedUntil: new Date(Date.now() + BLOCK_DURATION).toISOString()
					}),
					{
						status: 403,
						headers: { 'Content-Type': 'application/json' }
					}
				)
			}
			
			return new NextResponse(
				JSON.stringify({
					error: 'Too many requests',
					message: 'You have exceeded the rate limit. Please include a valid API key or try again later.',
					code: 'RATE_LIMIT_EXCEEDED',
					retryAfter: 60
				}),
				{
					status: 429,
					headers: { 
						'Content-Type': 'application/json',
						'Retry-After': '60'
					}
				}
			)
		}

		// No API key and not from allowed domain
		logRequest(request, 401, 'API_KEY_REQUIRED', {
			authType: 'none',
			reason: 'No API key provided and not from allowed domain'
		})
		return new NextResponse(
			JSON.stringify({
				error: 'API key required',
				message: 'External API access requires a valid API key. Please include your API key in the X-API-Key header or Authorization header.',
				code: 'API_KEY_REQUIRED',
				documentation: 'https://mitatanaanliputetaan.vercel.app/rajapinta-api'
			}),
			{
				status: 401,
				headers: { 
					'Content-Type': 'application/json',
					'WWW-Authenticate': 'Bearer realm="API"'
				}
			}
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/api/:path*'
} 