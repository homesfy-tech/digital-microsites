# Image Optimization Guide

## Overview
This guide provides the exact image dimensions, aspect ratios, and file sizes needed to optimize images for better LCP (Largest Contentful Paint) and FCP (First Contentful Paint) performance.

---

## 📸 1. Mobile Banner Image (`banner-480.webp`)

### Current Status
- **Current Size**: 1536 × 1920 pixels (73.8 KiB)
- **Displayed Size**: 824 × 1030 pixels
- **Issue**: Image is 1.86× larger than needed
- **Savings Potential**: ~52.6 KiB

### Recommended Dimensions
- **Width**: 900 pixels
- **Height**: 1125 pixels
- **Aspect Ratio**: 4:5 (0.8:1)
- **Format**: WebP
- **Target File Size**: ~21-25 KiB (compressed)

### Why This Size?
- Maximum mobile viewport width: 768px (tablets)
- Typical mobile phones: 375px - 428px width
- For retina displays (2x): 768px × 2 = 1536px width
- But considering actual display: 824px × 2 = 1648px
- **900px covers 2x displays** on most mobile devices without being oversized
- Aspect ratio 4:5 matches CSS `aspect-ratio: 4/5` perfectly

### Instructions
1. Resize your banner image to **900 × 1125 pixels**
2. Maintain 4:5 aspect ratio
3. Export as WebP with 80-85% quality
4. Replace `banner-480.webp` file

---

## 🖼️ 2. Logo Image (`logo.webp`)

### Current Status
- **Current Size**: 300 × 114 pixels (8.1 KiB)
- **Displayed Size**: 
  - Desktop: 211 × 80 pixels (height: 60px)
  - Mobile: ~105 × 40 pixels (height: 40px)
- **Issue**: Image is 1.42× larger than needed
- **Savings Potential**: ~5.4 KiB

### Recommended Dimensions
- **Width**: 210 pixels
- **Height**: 80 pixels
- **Aspect Ratio**: 21:8 (2.625:1)
- **Format**: WebP
- **Target File Size**: ~2.7-3.5 KiB (compressed)

### Why This Size?
- Desktop display: 105px width × 60px height → proportional width = 105px
- For retina (2x): 105px × 2 = 210px width
- Height: 60px × 2 = 120px, but we use 80px (matches original aspect ratio)
- **210 × 80px covers 2x displays** on desktop and mobile

### Instructions
1. Resize your logo to **210 × 80 pixels**
2. Maintain original aspect ratio (approximately 21:8)
3. Export as WebP with 85-90% quality (logos need sharp edges)
4. Replace logo file on server

---

## 🖼️ 3. Desktop Banner Image (`banner.webp`)

### Current Status
- **Aspect Ratio**: 16:9 (from CSS)
- **Display**: Takes 70% of viewport width on desktop

### Recommended Dimensions
- **Width**: 1920 pixels (for Full HD displays)
- **Height**: 1080 pixels
- **Aspect Ratio**: 16:9
- **Format**: WebP
- **Target File Size**: ~150-200 KiB (compressed)

### Why This Size?
- Desktop viewport: typically 1920px wide
- Banner takes 70%: 1920px × 0.7 = 1344px
- For retina (2x): 1344px × 2 = 2688px
- **1920px covers standard displays**, consider 2x version if needed
- Aspect ratio 16:9 matches CSS perfectly

### Instructions
1. Resize your banner image to **1920 × 1080 pixels**
2. Maintain 16:9 aspect ratio
3. Export as WebP with 75-80% quality
4. Replace `banner.webp` file

---

## 📊 Summary Table

| Image | Current Size | Recommended Size | Aspect Ratio | Estimated Savings |
|-------|-------------|-----------------|--------------|-------------------|
| `banner-480.webp` | 1536 × 1920px | **900 × 1125px** | 4:5 | ~52.6 KiB |
| `logo.webp` | 300 × 114px | **210 × 80px** | 21:8 | ~5.4 KiB |
| `banner.webp` | Variable | **1920 × 1080px** | 16:9 | Variable |

**Total Estimated Savings: ~58 KiB**

---

## 🎯 Performance Impact

### LCP (Largest Contentful Paint)
- **Banner image** is typically the LCP element
- Reducing banner-480.webp from 73.8 KiB to ~21 KiB = **71% reduction**
- Faster LCP = Better user experience = Higher SEO rankings

### FCP (First Contentful Paint)
- **Logo** appears in header (above the fold)
- Reducing logo size improves FCP
- Faster header rendering = Better perceived performance

### Network Savings
- **Total savings**: ~58 KiB per page load
- On 3G connection: ~0.5-1 second faster load time
- On 4G connection: ~0.2-0.3 second faster load time

---

## 🛠️ Tools for Image Optimization

### Recommended Tools:
1. **Squoosh** (https://squoosh.app/) - Google's online image optimizer
2. **ImageOptim** (Mac) - Desktop app
3. **TinyPNG/TinyJPG** - Online WebP converter
4. **Photoshop/GIMP** - For precise resizing

### Optimization Settings:
- **WebP Quality**: 80-85% for photos, 85-90% for logos
- **Enable lossless compression** for logos
- **Remove metadata** (EXIF data)
- **Use progressive encoding** if supported

---

## ✅ Checklist

- [ ] Resize `banner-480.webp` to 900 × 1125px
- [ ] Resize `logo.webp` to 210 × 80px  
- [ ] Verify `banner.webp` is 1920 × 1080px (or optimize if larger)
- [ ] Export all images as WebP format
- [ ] Test on mobile devices (various screen sizes)
- [ ] Test on desktop (various resolutions)
- [ ] Verify aspect ratios match CSS exactly
- [ ] Run Lighthouse test to verify improvements
- [ ] Check that images don't appear pixelated on retina displays

---

## 📱 Device Testing Recommendations

### Mobile Testing:
- iPhone SE (375px width)
- iPhone 12/13 (390px width)
- iPhone 14 Pro Max (428px width)
- iPad Mini (768px width)

### Desktop Testing:
- 1920 × 1080 (Full HD)
- 2560 × 1440 (2K)
- 3840 × 2160 (4K - for retina)

---

## ⚠️ Important Notes

1. **Aspect Ratios Must Match**: Changing aspect ratios will break the layout
2. **Retina Displays**: Always provide 2x resolution for sharp images
3. **WebP Format**: Ensure server supports WebP (most modern servers do)
4. **Fallback**: Current implementation uses `<picture>` element with fallback
5. **Compression**: Balance file size vs quality - test on actual devices

---

## 🚀 Expected Results

After implementing these optimizations:
- ✅ LCP improvement: 0.5-1.5 seconds faster
- ✅ FCP improvement: 0.2-0.5 seconds faster
- ✅ Network transfer reduction: ~58 KiB
- ✅ Better mobile experience
- ✅ Improved SEO scores
- ✅ Reduced bandwidth costs

---

*Last Updated: Based on current CSS and HTML structure*

