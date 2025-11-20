# API Key Authentication Setup

This document explains how to set up and manage API keys for the Finnish Flag Days API.

## Quick Setup

1. **Generate an API key:**
   ```bash
   node scripts/generate-api-key.js
   ```

2. **Add to environment variables:**
   Create or update `.env.local`:
   ```
   API_KEYS=mlt_your_generated_key_here
   ```

3. **Give key to user:**
   The user can now make API calls with:
   ```bash
   curl -H "X-API-Key: mlt_your_generated_key_here" \
        https://mitatanaanliputetaan.vercel.app/api/liputuspaivat
   ```

## How It Works

- **Middleware Protection**: The `middleware.js` file checks for valid API keys
- **Multiple Keys**: Support multiple users by comma-separating keys in `API_KEYS`
- **Flexible Headers**: Accepts keys in `X-API-Key` or `Authorization: Bearer` headers
- **Local Development**: Localhost requests bypass API key requirements

## Managing Users

### Add a new user:
1. Generate a new key: `node scripts/generate-api-key.js`
2. Add to existing keys: `API_KEYS=existing_key,new_key`
3. Deploy the change
4. Give the new key to the user

### Remove a user:
1. Remove their key from the `API_KEYS` environment variable
2. Deploy the change
3. Their requests will be blocked immediately

### Monitor usage:
- Check your hosting platform's logs for API requests
- Look for requests with `X-API-Key` headers
- Monitor for any abuse patterns

## Security Notes

- ✅ Keys are checked server-side only
- ✅ No keys are exposed in client-side code
- ✅ Keys can be revoked instantly by updating environment variables
- ✅ Each user gets a unique key for tracking
- ⚠️ Store keys securely and never commit them to version control
- ⚠️ Use HTTPS only (which Vercel provides automatically)

## Example Usage

### JavaScript/Node.js:
```javascript
const response = await fetch('https://mitatanaanliputetaan.vercel.app/api/liputuspaivat', {
  headers: {
    'X-API-Key': 'your-api-key-here'
  }
});
const data = await response.json();
```

### Python:
```python
import requests

headers = {'X-API-Key': 'your-api-key-here'}
response = requests.get('https://mitatanaanliputetaan.vercel.app/api/liputuspaivat', headers=headers)
data = response.json()
```

### cURL:
```bash
# Note: Add User-Agent header to bypass Vercel's Security Checkpoint
curl -H "X-API-Key: your-api-key-here" \
     -H "User-Agent: Mozilla/5.0 (compatible; API-Client/1.0)" \
     https://mitatanaanliputetaan.vercel.app/api/liputuspaivat
```

**Important:** Vercel's Security Checkpoint may block requests without a browser-like User-Agent header. If you encounter a "Security Checkpoint" page, add a User-Agent header to your requests.
