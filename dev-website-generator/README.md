# Microsite Generator Dashboard

A web-based dashboard to generate customized microsites from template-1 based on data files.

## Features

- **Template Selection**: Choose from available templates (currently Template 1)
- **Data File Upload**: Support for CSV, TSV, and HTML table formats
- **Data Mapping**: Automatically maps data fields to HTML elements using `data-field` attributes
- **Dynamic Content**: Automatically shows/hides offers, highlights, and location dropdowns based on data availability
- **Preview**: Preview generated microsite before downloading
- **Download**: Download the customized HTML file

## How to Use

### 1. Start a Local Web Server

Since the dashboard needs to fetch the template file, you need to run it via a local web server.

**Option A: Using Python (Recommended)**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option B: Using Node.js**
```bash
npx http-server -p 8000
```

**Option C: Using PHP**
```bash
php -S localhost:8000
```

### 2. Open the Dashboard

Navigate to `http://localhost:8000/dashboard.html` in your browser.

### 3. Upload Your Data File

The data file should be in one of these formats:

#### CSV/TSV Format
```
Field Name,Content
project_name,Vanaha Verdant
developer_name,By Shapoorji Pallonji Group
meta_title,Shapoorji Pallonji Vanaha Verdant, Bavdhan, Pune...
offer_1,EOI Window Now Open!
offer_2,EOI Amount up to ₹90,000
...
```

#### HTML Table Format
```html
<table>
  <tr>
    <th>Field Name</th>
    <th>Content</th>
  </tr>
  <tr>
    <td>project_name</td>
    <td>Vanaha Verdant</td>
  </tr>
  ...
</table>
```

### 4. Generate and Download

1. Review the data preview table
2. Click "Preview" to see the generated microsite in a new window
3. Click "Generate & Download" to download the HTML file

## Data Field Mapping

The dashboard maps data fields to HTML elements using `data-field` attributes. For example:

- `project_name` → Elements with `data-field="project_name"`
- `offer_1`, `offer_2`, etc. → Offer text spans
- `location_connectivity_1`, `location_value_1` → Location dropdowns
- `highlight_1`, `highlight_2`, etc. → Highlight list items

## Special Behavior

### Offers
- If `offer_1`, `offer_2`, etc. have data, they will be displayed
- Offers without data will remain hidden with `display: none`

### Location Dropdowns
- Location dropdowns with data will be visible
- Empty location dropdowns will be hidden

### Highlights
- Highlights with data will be shown
- Highlights without data will be hidden

## Sample Data

A sample data file (`sample-data.csv`) is provided with example data for "Vanaha Verdant" project.

## Important Notes

1. **Original Template**: The original `template-1/index.html` is never modified. The dashboard creates a new HTML file based on the template.

2. **File Paths**: Generated HTML files maintain relative paths to assets. Make sure to keep the `assets/` folder structure when deploying.

3. **Browser Compatibility**: Modern browsers are required (Chrome, Firefox, Safari, Edge).

## Troubleshooting

### "Failed to load template" error
- Make sure you're running the dashboard via a local web server (not `file://` protocol)
- Check that `template-1/index.html` exists in the correct location

### Data not appearing in preview
- Verify your data file has the correct field names matching the `data-field` attributes
- Check that the CSV/HTML format is correct

### Offers not showing
- Ensure the offer fields (`offer_1`, `offer_2`, etc.) have non-empty values
- Check that the field names match exactly (case-sensitive)

## File Structure

```
website-generator/
├── dashboard.html          # Main dashboard interface
├── dashboard.js            # Dashboard JavaScript logic
├── sample-data.csv         # Sample data file
├── README.md              # This file
└── template-1/
    ├── index.html         # Template HTML (not modified)
    ├── script.js          # Template JavaScript
    ├── style.css          # Template CSS
    └── assets/            # Template assets
```

