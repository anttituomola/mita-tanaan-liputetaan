// Utility to generate secure API keys
import crypto from 'crypto'

/**
 * Generate a secure API key
 * @param {number} length - Length of the key (default: 32)
 * @returns {string} - Generated API key
 */
export function generateApiKey(length = 32) {
	return crypto.randomBytes(length).toString('hex')
}

/**
 * Generate a prefixed API key for easier identification
 * @param {string} prefix - Prefix for the key (default: 'mlt')
 * @param {number} length - Length of the random part (default: 24)
 * @returns {string} - Generated API key with prefix
 */
export function generatePrefixedApiKey(prefix = 'mlt', length = 24) {
	const randomPart = crypto.randomBytes(length).toString('hex')
	return `${prefix}_${randomPart}`
}

// Example usage (run this file directly to generate keys):
if (import.meta.url === `file://${process.argv[1]}`) {
	console.log('Generated API Keys:')
	console.log('Simple key:', generateApiKey())
	console.log('Prefixed key:', generatePrefixedApiKey())
	console.log('\nAdd one of these to your .env.local file as:')
	console.log('API_KEYS=your_generated_key_here')
	console.log('\nFor multiple keys, separate with commas:')
	console.log('API_KEYS=key1,key2,key3')
}
