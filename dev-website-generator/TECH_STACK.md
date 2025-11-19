# Tech Stack

## Frontend
- **HTML/CSS/JavaScript** - Vanilla JS, no frameworks. Simple and fast.
- **LocalStorage** - Saves dashboard state (template selection, uploaded data, images).
  - Used in `dashboard.js` line 38-74: saves/restores user selections on page reload.

## Libraries

### Mammoth.js
- **What**: Converts `.docx` files (Google Docs exports) to HTML for parsing.
- **Where**: Loaded via CDN in `index.html` line 910.
- **Usage**: `dashboard.js` lines 1211-1244
  - Function `parseDOCX()` at line 1211
  - Converts DOCX to HTML: `mammoth.convertToHtml()` at line 1244
  - Then parses HTML table to extract field data (lines 1256-1288)

### JSZip
- **What**: Bundles generated microsite (HTML + assets) into downloadable ZIP files.
- **Where**: Loaded via CDN in `index.html` line 911.
- **Usage**: `dashboard.js` lines 1961-1994
  - Function `downloadMicrositeZip()` at line 1961
  - Creates ZIP: `new JSZip()` at line 1969
  - Adds HTML: `zip.file('index.html', html)` at line 1972
  - Copies template assets: `copyTemplateAssets(zip)` at line 1976
  - Adds uploaded images: `addUploadedImages(zip)` at line 1980
  - Generates ZIP blob: `zip.generateAsync()` at line 1984
  - Downloads ZIP file: lines 1986-1993

## Templates Configuration

### templates.json
- **Location**: Root directory (`/templates.json`)
- **What**: Defines template metadata, paths, and image mappings.
- **How it's loaded**: `dashboard.js` line 2323
  - Function `initializeTemplates()` at line 2316
  - Fetches: `fetch('templates.json')` at line 2323
  - Stores config: `templatesConfig = { ...jsonConfig }` at line 2326
  - Used throughout: `templatesConfig[selectedTemplate]` (lines 979, 1492, 2001, etc.)

### Structure
```json
{
  "template-1": {
    "htmlPath": "template-1/index.html",      // Main HTML file
    "cssPath": "template-1/assets/css/style.css",  // Stylesheet
    "jsPath": "template-1/assets/js/script.js",   // JavaScript
    "assetBase": "template-1/assets",        // Base path for assets
    "imageMapping": {                         // Image replacement rules
      "logo": {
        "paths": ["assets/images/logo/logo.webp"],
        "replacePatterns": ["/logo.webp", "logo.webp"]
      }
    }
  }
}
```

### How Paths Work
- **assetBase**: Base directory for all template assets (line 2004)
- **imageMapping**: Defines where to find/replace images in templates
  - `paths`: Where images are stored in template folder
  - `replacePatterns`: What strings to search/replace in HTML
  - `pattern`: Naming pattern for multiple images (e.g., `banner{index}.webp`)
- **Usage**: Lines 2000-2130 - copies assets based on config paths

## Deployment
- **Cloudflare Workers** - Hosted on Cloudflare edge network via `wrangler.toml`.
  - Config: `wrangler.toml` (lines 1-5)
  - Assets directory: `.` (current directory)

## Why These Choices
- **Vanilla JS** - No build step, works everywhere, easy to maintain.
- **Mammoth.js** - Enables Google Docs import without backend processing.
- **JSZip** - Client-side ZIP creation, no server needed for file bundling.
- **Cloudflare Workers** - Fast global CDN, simple static hosting.

