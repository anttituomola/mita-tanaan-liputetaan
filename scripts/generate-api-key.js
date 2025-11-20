#!/usr/bin/env node

// Simple script to generate API keys for the Finnish Flag Days API
const crypto = require('crypto')

function generateApiKey(prefix = 'mlt', length = 32) {
	const randomPart = crypto.randomBytes(length).toString('hex')
	return `${prefix}_${randomPart}`
}

console.log('🔐 Finnish Flag Days API - API Key Generator')
console.log('=' .repeat(50))
console.log()

// Generate a few options
const keys = [
	generateApiKey('mlt', 24),
	generateApiKey('mlt', 32),
	generateApiKey('flagdays', 20)
]

console.log('Generated API Keys (choose one):')
keys.forEach((key, index) => {
	console.log(`${index + 1}. ${key}`)
})

console.log()
console.log('📝 Setup Instructions:')
console.log('1. Choose one of the keys above')
console.log('2. Add it to your .env.local file:')
console.log('   API_KEYS=your_chosen_key_here')
console.log()
console.log('3. For multiple users, separate keys with commas:')
console.log('   API_KEYS=key1,key2,key3')
console.log()
console.log('4. Give the key to your user with these instructions:')
console.log('   - Add header: X-API-Key: your_key')
console.log('   - Or use: Authorization: Bearer your_key')
console.log()
console.log('🔒 Keep these keys secure and never commit them to version control!')
