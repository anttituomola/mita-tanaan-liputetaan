import { NextResponse } from 'next/server'

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

		// Check for valid API key
		const validApiKeys = process.env.API_KEYS?.split(',').map(key => key.trim()) || []
		if (apiKey && validApiKeys.includes(apiKey)) {
			return NextResponse.next()
		}

		// Block known problematic user agents
		const blockedUserAgents = [
			'homeassistant',
			'python-requests',
			'curl',
			'wget',
			'postman',
			'insomnia',
			'httpx',
			'requests'
		]

		const isBlockedUserAgent = blockedUserAgents.some(blocked =>
			userAgent.toLowerCase().includes(blocked.toLowerCase())
		)

		if (isBlockedUserAgent) {
			return new NextResponse(
				JSON.stringify({
					error: 'API access blocked',
					message: 'External API access is currently disabled',
					code: 'BLOCKED_AT_EDGE'
				}),
				{
					status: 403,
					headers: { 'Content-Type': 'application/json' }
				}
			)
		}

		// Only allow requests with proper referer from our domain
		const allowedDomains = [
			'mitatanaanliputetaan.vercel.app',
			'mitatanaan-liputetaan.vercel.app'
		]

		if (referer) {
			const isFromAllowedDomain = allowedDomains.some(domain =>
				referer.includes(domain)
			)

			if (isFromAllowedDomain) {
				return NextResponse.next()
			}
		}

		// Block all other external requests
		return new NextResponse(
			JSON.stringify({
				error: 'API access blocked',
				message: 'External API access is currently disabled',
				code: 'BLOCKED_AT_EDGE'
			}),
			{
				status: 403,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/api/:path*'
} 