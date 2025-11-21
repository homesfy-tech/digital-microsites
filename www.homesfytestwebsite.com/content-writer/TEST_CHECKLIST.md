# Testing Checklist

## Pre-Flight Checks ✅

- [x] HTML file is valid
- [x] CSS styles are loaded
- [x] JavaScript functions are defined
- [x] FileSaver.js CDN is loaded
- [x] No linter errors

## Functional Testing

### 1. Dashboard Display
- [x] Header displays correctly
- [x] Left panel shows instructions
- [x] Right panel has all form fields
- [x] Buttons are visible and styled

### 2. Sample Data Loading
- [ ] Click "Load Sample Data" button
- [ ] Verify all fields are populated
- [ ] Check project name updates in left panel
- [ ] Verify dynamic items are added (offers, highlights, prices, location)
- [ ] Check statistics update correctly

### 3. Manual Data Entry
- [ ] Enter project name
- [ ] Fill in basic information
- [ ] Add multiple offers using ➕ button
- [ ] Add multiple highlights using ➕ button
- [ ] Add multiple price entries using ➕ button
- [ ] Add multiple location connectivity using ➕ button
- [ ] Verify remove button (✕) works
- [ ] Confirm at least one item is required

### 4. CSV Export
- [ ] Click "Download CSV/Excel" button
- [ ] Verify file downloads
- [ ] Open CSV in Excel/Sheets
- [ ] Check format: `Classname (Key),Content`
- [ ] Verify all fields are exported
- [ ] Test with custom filename
- [ ] Test with auto-generated filename

### 5. Word Document Export
- [ ] Click "Download Word Doc" button
- [ ] Verify file downloads
- [ ] Open DOC file in Word
- [ ] Check formatting is professional
- [ ] Verify sections are organized
- [ ] Check tables display correctly
- [ ] Verify lists are formatted
- [ ] Test with custom filename
- [ ] Test with auto-generated filename

### 6. Responsive Design
- [ ] Resize browser window
- [ ] Check mobile view (< 968px)
- [ ] Verify panels stack vertically
- [ ] Confirm buttons are accessible

### 7. Browser Compatibility
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

### 8. Edge Cases
- [ ] Empty project name (should show warning)
- [ ] Very long text in fields
- [ ] Special characters in content
- [ ] Only one item in dynamic sections
- [ ] All fields empty
- [ ] Very long project name

## Expected Results

### CSV Format
```csv
Classname (Key),Content
project_name,Your Project Name
developer_name,Developer Name
meta_title,SEO Title
...
```

### Word Document
- Professional layout
- Clear sections with headers
- Tables for pricing
- Bullet lists for offers/highlights
- Proper spacing and formatting
- All content included

## Known Features

✅ Dynamic field addition (➕ button)
✅ Dynamic field removal (✕ button)
✅ Real-time statistics
✅ Project name display
✅ Custom filename support
✅ Auto-generated filename
✅ CSV export with proper escaping
✅ Word document with styling
✅ Responsive design
✅ Sample data loading
✅ Form validation

## Notes

- All testing should be done with browser DevTools open to check for console errors
- FileSaver.js is loaded from CDN - requires internet connection
- No server-side code - everything runs in browser
- No database - all data is client-side only
- Refresh clears all unsaved data

