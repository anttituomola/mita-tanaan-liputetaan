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

## Error Code Reference

| Code | Status | Description |
|------|--------|-------------|
| `API_KEY_REQUIRED` | 401 | No API key provided for external request |
| `INVALID_API_KEY` | 401 | API key provided but not valid |

## Headers

- **WWW-Authenticate**: Included in 401 responses to indicate authentication method
- **Content-Type**: Always `application/json` for API responses
