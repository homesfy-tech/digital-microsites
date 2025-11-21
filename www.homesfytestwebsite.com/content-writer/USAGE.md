# Usage Documentation

## Libraries & External Tools

| What | Where | Line |
|------|-------|------|
| **FileSaver.js** (`saveAs`) | CSV/HTML/Word download | 425, 665, 789, 853 |
| **DOM API** | Form manipulation | Throughout |

## Core Functions

| Function | Purpose | Line |
|----------|---------|------|
| `resetForm()` | Reset form to default | 13-84 |
| `getFormData()` | Collect all form data | 87-104 |
| `updateStats()` | Update field/section counts | 107-119 |
| `addDynamicItem(type)` | Add offers/highlights/prices/amenities | 122-157 |
| `removeItem(button, type)` | Remove dynamic items | 160-173 |

## Location Functions

| Function | Purpose | Line |
|----------|---------|------|
| `addLocationCategory()` | Add location category group | 178-210 |
| `removeLocationCategory(button)` | Remove category | 213-227 |
| `addLocationDetail(categoryIndex)` | Add detail to category | 230-255 |
| `removeLocationDetail(button)` | Remove location detail | 258-268 |
| `parseAndFillLocations()` | Auto-parse pasted locations | 271-393 |

## Export Functions

| Function | Purpose | Line |
|----------|---------|------|
| `generateCSV()` | Export as CSV file | 396-428 |
| `generateHTMLDoc()` | Export as HTML document | 431-668 |
| `downloadWordFormat()` | Export as Word (.doc) | 720-791 |
| `downloadGoogleDocsFormat()` | Export for Google Docs | 794-855 |
| `openInGoogleDocsDirect()` | Open in Google Docs | 858-949 |

## Import Functions

| Function | Purpose | Line |
|----------|---------|------|
| `handleFileUpload(event)` | Handle file upload | 1457-1497 |
| `parseAndLoadCSV(csvText)` | Parse and load CSV | 1500-1623 |
| `parseAndLoadHTML(htmlText)` | Parse HTML/Word files | 1626-1821 |

## Utility Functions

| Function | Purpose | Line |
|----------|---------|------|
| `showFormatModal()` | Show export format modal | 671-680 |
| `closeFormatModal()` | Close modal | 683-685 |
| `downloadFormat(format)` | Download in selected format | 688-712 |
| `loadSampleData()` | Pre-fill sample data | 1180-1234 |
| `showPreview()` | Show content preview | 1237-1418 |
| `closePreview()` | Close preview modal | 1421-1423 |

## Event Listeners

| Event | Where | Line |
|-------|-------|------|
| `DOMContentLoaded` | Initialize on page load | 1434-1454 |
| `input` | Update stats on input | 1445-1447 |
| `click` | Close modals on outside click | 1172-1177, 1426-1431 |

## Data Structures

| Variable | Purpose | Line |
|----------|---------|------|
| `counters` | Track dynamic item counts | 2-9 |
| `counters.locationDetailCounters` | Track location details per category | 8, 183-184, 231-236 |

