# Cloudflare Page Rules Configuration

## Cache Rules for adanithane-launch.com

### Rule 1: HTML Files - No Cache
- **URL Pattern**: `adanithane-launch.com/*.html`
- **Settings**:
  - Cache Level: Bypass
  - Browser Cache TTL: Respect Existing Headers

### Rule 2: CSS Files - Cache Everything
- **URL Pattern**: `adanithane-launch.com/*.css`
- **Settings**:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 year

### Rule 3: JavaScript Files - Cache Everything
- **URL Pattern**: `adanithane-launch.com/*.js`
- **Settings**:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 year

### Rule 4: Images - Cache Everything
- **URL Pattern**: `adanithane-launch.com/*.webp` OR `adanithane-launch.com/*.jpg` OR `adanithane-launch.com/*.png` OR `adanithane-launch.com/*.svg`
- **Settings**:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 year

### Rule 5: Assets Folder - Cache Everything
- **URL Pattern**: `adanithane-launch.com/assests/*`
- **Settings**:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 year

### Rule 6: Fonts - Cache Everything
- **URL Pattern**: `adanithane-launch.com/*.woff*` OR `adanithane-launch.com/*.ttf`
- **Settings**:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 year

## Speed Optimizations

### Auto Minify
- ✅ HTML
- ✅ CSS
- ✅ JavaScript

### Compression
- ✅ Brotli
- ✅ Gzip

### HTTP/2
- ✅ Enabled

### HTTP/3 (QUIC)
- ✅ Enabled

### Always Use HTTPS
- ✅ Enabled

### Security Level
- Medium

### SSL/TLS Encryption Mode
- Full (strict)

## DNS Configuration

### A Record
- Type: A
- Name: @
- Content: [Your S3 bucket endpoint IP]
- Proxy: ✅ (Orange cloud)

### CNAME Record
- Type: CNAME
- Name: www
- Content: adanithane-launch.com
- Proxy: ✅ (Orange cloud)

## Performance Settings

### Caching Level
- Standard

### Browser Cache TTL
- 1 year for static assets
- Respect existing headers for HTML

### Always Online
- ✅ Enabled

### Development Mode
- ❌ Disabled (for production)

## Security Settings

### Security Level
- Medium

### Bot Fight Mode
- ✅ Enabled

### Challenge Passage
- 30 minutes

### Browser Integrity Check
- ✅ Enabled
