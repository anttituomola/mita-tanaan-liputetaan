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

		// Check for valid API key first
		const validApiKeys = process.env.API_KEYS?.split(',').map(key => key.trim()) || []
		
		if (apiKey) {
			// API key provided - check if it's valid
			if (validApiKeys.includes(apiKey)) {
				return NextResponse.next()
			} else {
				// Invalid API key provided
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
				return NextResponse.next()
			}
		}

		// No API key and not from allowed domain
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