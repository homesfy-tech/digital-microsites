# Image to WebP Converter

A simple, beautiful web application that converts any image format to WebP while maintaining aspect ratio and optimizing for a target file size. Now supports **batch processing** for multiple files!

## Features

- 🎨 **Modern, Beautiful UI** - Clean and intuitive interface with gradient design
- 📁 **Drag & Drop Support** - Easy file upload with drag and drop functionality
- 🔢 **Fast Batch Processing** - Convert multiple images simultaneously for faster processing
- 🔄 **Multiple Format Support** - Converts JPG, PNG, GIF, BMP, TIFF, and more to WebP
- 📏 **Aspect Ratio Preservation** - Maintains original image proportions
- 🎯 **Smart Size Targeting** - Automatically adjusts quality to achieve target file size (100-120KB by default)
- ⚡ **Auto-Reduction** - Automatically reduces images over 100KB to target size
- 👁️ **Live Preview** - Side-by-side comparison of original and converted images for each file
- 🔍 **Full-Size Viewing** - Click to view images in full size modal
- ⚙️ **Per-Image Quality Control** - Adjust quality individually for each image
- ⚙️ **Customizable Settings** - Adjust target size and initial quality for all images
- 📦 **ZIP Download** - Download all images as a single ZIP file
- 💾 **Individual Downloads** - Download files one by one or all at once
- 📊 **Statistics** - View total savings, conversion stats, and auto-reduction count
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## How to Use

1. **Open the Website**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)

2. **Upload Images**
   - Drag and drop one or multiple images onto the upload area, or
   - Click "Browse Files" to select images from your device (select multiple with Ctrl/Cmd+Click)

3. **Adjust Settings (Optional)**
   - **Target File Size**: Set your desired output size for each image (50-200 KB)
   - **Initial Quality**: Set the starting quality for conversion (60-100%)
   - **Auto-reduce large images**: Automatically reduce images over 100KB (enabled by default)
   - Settings apply to all images in the batch

4. **View & Adjust Results**
   - See all converted images in a grid layout
   - Each card shows side-by-side comparison of original and WebP
   - **Click the eye icon** to view full-size images in a modal
   - **Click the settings icon** to adjust quality for individual images
   - View batch statistics: total size saved, conversion percentage, and auto-reduction count
   - Check individual file sizes, dimensions, and quality for each image
   - Visual badges show which images were auto-reduced

5. **Download Options**
   - **Download as ZIP**: Get all images in a single ZIP file (recommended)
   - **Download Individual Files**: Download files one by one or all at once
   - Files will be saved with original names and ".webp" extension

## Technical Details

- **No Server Required** - Runs entirely in the browser using HTML5 Canvas API
- **Privacy First** - All processing happens locally, no images are uploaded to any server
- **Smart Optimization** - Uses binary search algorithm to find optimal quality for target file size
- **Automatic Resizing** - If target size can't be achieved with quality adjustment alone, the image is intelligently resized
- **Parallel Processing** - All images are converted simultaneously for faster processing
- **Auto-Reduction** - Images over 100KB are automatically resized and optimized more aggressively

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- WebP format
- File API
- Blob API
- JSZip library (for ZIP downloads)

Recommended browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## File Structure

```
image-optimize/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Image conversion logic
└── README.md       # This file
```

## Customization

You can easily customize the default settings by editing these values in `script.js`:

```javascript
// Default target size (line with slider value)
targetSizeSlider.value = 110; // Change to your preferred KB

// Default quality
qualitySlider.value = 85; // Change to your preferred quality %
```

## How It Works

1. User uploads one or more images in any format
2. Each image is processed sequentially
3. Images are loaded into HTML5 Canvas elements
4. Canvas converts each image to WebP format
5. Binary search algorithm adjusts quality to match target file size
6. If needed, images are resized while maintaining aspect ratio
7. User can download individual images or all at once
8. All processing happens in the browser - no server uploads!

## License

Free to use for personal and commercial projects.

---

Enjoy converting your images to optimized WebP format! 🎉

