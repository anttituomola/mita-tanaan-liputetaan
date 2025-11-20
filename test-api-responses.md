# API Key Error Response Testing

## Test Scenarios

### 1. No API Key (External Request)
```bash
curl https://mitatanaanliputetaan.vercel.app/api/liputuspaivat
```
**Expected Response:**
```json
{
  "error": "API key required",
  "message": "External API access requires a valid API key. Please include your API key in the X-API-Key header or Authorization header.",
  "code": "API_KEY_REQUIRED",
  "documentation": "https://mitatanaanliputetaan.vercel.app/rajapinta-api"
}
```
**Status Code:** `401 Unauthorized`

### 2. Invalid API Key
```bash
curl -H "X-API-Key: invalid_key_123" https://mitatanaanliputetaan.vercel.app/api/liputuspaivat
```
**Expected Response:**
```json
{
  "error": "Invalid API key",
  "message": "The provided API key is not valid. Please check your key and try again.",
  "code": "INVALID_API_KEY"
}
```
**Status Code:** `401 Unauthorized`

### 3. Valid API Key
```bash
curl -H "X-API-Key: mlt_adefe79b739ab5d5ce05beaf456529a2a4450899d1e1f7d6" https://mitatanaanliputetaan.vercel.app/api/liputuspaivat
```
**Expected Response:**
```json
{
  "data": [...],
  "count": 22
}
```
**Status Code:** `200 OK`

### 4. Request from Website (No API Key Needed)
When accessing from the website itself, no API key is required due to referer checking.

## Rate Limiting

**Important:** To protect against abuse and prevent consumption of Vercel's free tier limits, rate limiting is applied to failed authentication attempts:

- **Limit:** 10 failed attempts per minute per IP address
- **Window:** 60 seconds
- **After Limit:** Returns `429 Too Many Requests` with `Retry-After: 60` header

### Rate Limited Response
```bash
# After 10 failed attempts in 1 minute:
curl -H "X-API-Key: invalid" https://mitatanaanliputetaan.vercel.app/api/liputuspaivat
```
**Expected Response:**
```json
{
  "error": "Too many failed authentication attempts",
  "message": "You have exceeded the rate limit for failed authentication attempts. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 60
}
```
**Status Code:** `429 Too Many Requests`

## Error Code Reference

| Code | Status | Description |
|------|--------|-------------|
| `API_KEY_REQUIRED` | 401 | No API key provided for external request |
| `INVALID_API_KEY` | 401 | API key provided but not valid |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many failed authentication attempts |

## Headers

- **WWW-Authenticate**: Included in 401 responses to indicate authentication method
- **Content-Type**: Always `application/json` for API responses
- **Retry-After**: Included in 429 responses (seconds to wait before retrying)

## Protection Against Abuse

✅ **Rate Limiting**: Prevents abuse from consuming Vercel free tier limits  
✅ **IP-Based Tracking**: Tracks failed attempts per IP address  
✅ **Automatic Cleanup**: Old rate limit entries are automatically cleaned up  
⚠️ **Note**: Rate limiting is per-edge-instance. For global rate limiting across all instances, consider using Vercel KV or Edge Config
