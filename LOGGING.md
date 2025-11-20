# API Request Logging

All API requests are logged to help monitor usage, debug issues, and identify abuse patterns.

## Log Format

Each log entry is a JSON object with the following structure:

```json
{
  "timestamp": "2025-01-15T10:30:45.123Z",
  "method": "GET",
  "path": "/api/liputuspaivat",
  "ip": "192.168.1.100",
  "status": 200,
  "code": "VALID_API_KEY",
  "userAgent": "curl/7.68.0",
  "referer": "none",
  "apiKeyMasked": "mlt_...f7d6",
  "authType": "api_key"
}
```

## Logged Information

### Standard Fields (All Requests)
- **timestamp**: ISO 8601 timestamp
- **method**: HTTP method (GET, POST, etc.)
- **path**: API endpoint path
- **ip**: Client IP address (from x-forwarded-for header)
- **status**: HTTP status code
- **code**: Internal code for the request type
- **userAgent**: User agent string (truncated to 100 chars)
- **referer**: Referer header (truncated to 100 chars)

### Additional Fields (Context-Specific)
- **apiKeyMasked**: Masked API key (first 4 + last 4 chars) for security
- **authType**: Type of authentication used
- **domain**: Domain for referer-based requests
- **reason**: Additional context about the request

## Request Types and Codes

| Code | Status | Description | Logged Fields |
|------|--------|-------------|--------------|
| `VALID_API_KEY` | 200 | Valid API key provided | apiKeyMasked, authType |
| `ALLOWED_DOMAIN` | 200 | Request from your website | domain, authType |
| `INVALID_API_KEY` | 401 | Invalid API key provided | apiKeyMasked, authType |
| `API_KEY_REQUIRED` | 401 | No API key provided | authType, reason |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many failed attempts | authType, reason |

## Security

- **API Keys**: Only masked versions are logged (first 4 + last 4 characters)
- **IP Addresses**: Logged for abuse detection and rate limiting
- **User Agents**: Truncated to prevent log bloat
- **Referers**: Truncated to prevent log bloat

## Viewing Logs

### Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Navigate to **Logs** tab
3. Filter by function: `proxy` or search for `[API`

### Vercel CLI
```bash
vercel logs --follow
```

### Filtering Logs

**View only failed requests:**
```bash
vercel logs | grep -E "\[API (401|429)\]"
```

**View only valid API key requests:**
```bash
vercel logs | grep "VALID_API_KEY"
```

**View rate limited requests:**
```bash
vercel logs | grep "RATE_LIMIT_EXCEEDED"
```

**View requests from specific IP:**
```bash
vercel logs | grep "192.168.1.100"
```

## Example Log Entries

### Successful API Request
```
[API 200] {"timestamp":"2025-01-15T10:30:45.123Z","method":"GET","path":"/api/liputuspaivat","ip":"192.168.1.100","status":200,"code":"VALID_API_KEY","userAgent":"curl/7.68.0","referer":"none","apiKeyMasked":"mlt_...f7d6","authType":"api_key"}
```

### Invalid API Key
```
[API 401] {"timestamp":"2025-01-15T10:31:12.456Z","method":"GET","path":"/api/liputuspaivat","ip":"192.168.1.100","status":401,"code":"INVALID_API_KEY","userAgent":"python-requests/2.28.0","referer":"none","apiKeyMasked":"abcd...xyz","authType":"invalid_api_key"}
```

### Rate Limited Request
```
[API 429] {"timestamp":"2025-01-15T10:32:00.789Z","method":"GET","path":"/api/liputuspaivat","ip":"192.168.1.100","status":429,"code":"RATE_LIMIT_EXCEEDED","userAgent":"curl/7.68.0","referer":"none","authType":"invalid_api_key","reason":"Too many failed attempts"}
```

### Website Request
```
[API 200] {"timestamp":"2025-01-15T10:33:15.234Z","method":"GET","path":"/api/liputuspaivat/today","ip":"192.168.1.100","status":200,"code":"ALLOWED_DOMAIN","userAgent":"Mozilla/5.0...","referer":"https://mitatanaanliputetaan.vercel.app/rajapinta-api","authType":"referer","domain":"https://mitatanaanliputetaan.vercel.app/rajapinta-api"}
```

## Monitoring Abuse

Use logs to identify:
- **Repeated invalid API key attempts** from the same IP
- **Rate limit triggers** - indicates potential abuse
- **Missing API key requests** - may indicate scraping attempts
- **Unusual user agents** - may indicate bots or scrapers

## Log Retention

- Vercel Hobby (Free): Logs retained for 24 hours
- Vercel Pro: Logs retained for 7 days
- Vercel Enterprise: Custom retention available

For longer retention, consider exporting logs to an external service or database.
