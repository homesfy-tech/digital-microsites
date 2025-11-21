// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const settingsSection = document.getElementById('settingsSection');
const previewSection = document.getElementById('previewSection');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const loadingProgress = document.getElementById('loadingProgress');
const targetSizeSlider = document.getElementById('targetSize');
const targetSizeValue = document.getElementById('targetSizeValue');
const qualitySlider = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const autoReduceCheckbox = document.getElementById('autoReduce');
const ratioModeBtn = document.getElementById('ratioModeBtn');
const dimensionsModeBtn = document.getElementById('dimensionsModeBtn');
const ratioSettings = document.getElementById('ratioSettings');
const dimensionsSettings = document.getElementById('dimensionsSettings');
const aspectRatioSelect = document.getElementById('aspectRatio');
const customWidthInput = document.getElementById('customWidth');
const customHeightInput = document.getElementById('customHeight');
const maintainAspectRatioCheckbox = document.getElementById('maintainAspectRatio');
const downloadZipBtn = document.getElementById('downloadZipBtn');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const convertNewBtn = document.getElementById('convertNewBtn');
const imagesGrid = document.getElementById('imagesGrid');
const imageCount = document.getElementById('imageCount');
const totalOriginalSize = document.getElementById('totalOriginalSize');
const totalWebPSize = document.getElementById('totalWebPSize');
const totalSaved = document.getElementById('totalSaved');

// State
let currentFiles = [];
let convertedImages = [];
let currentModalIndex = -1;

// Individual image settings storage
let individualImageSettings = {};

// Event Listeners
browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
        handleFiles(files);
    }
});

uploadArea.addEventListener('click', (e) => {
    if (e.target !== browseBtn) {
        fileInput.click();
    }
});

targetSizeSlider.addEventListener('input', (e) => {
    targetSizeValue.textContent = e.target.value + ' KB';
    if (currentFiles.length > 0) {
        convertAllImages();
    }
});

qualitySlider.addEventListener('input', (e) => {
    qualityValue.textContent = e.target.value + '%';
    if (currentFiles.length > 0) {
        convertAllImages();
    }
});

autoReduceCheckbox.addEventListener('change', () => {
    if (currentFiles.length > 0) {
        convertAllImages();
    }
});

// Resize mode toggle
ratioModeBtn.addEventListener('click', () => {
    ratioModeBtn.classList.add('active');
    dimensionsModeBtn.classList.remove('active');
    ratioSettings.style.display = 'block';
    dimensionsSettings.style.display = 'none';
    if (currentFiles.length > 0) {
        convertAllImages();
    }
});

dimensionsModeBtn.addEventListener('click', () => {
    dimensionsModeBtn.classList.add('active');
    ratioModeBtn.classList.remove('active');
    ratioSettings.style.display = 'none';
    dimensionsSettings.style.display = 'block';
    if (currentFiles.length > 0) {
        convertAllImages();
    }
});

// Aspect ratio and dimensions change handlers
aspectRatioSelect.addEventListener('change', () => {
    if (currentFiles.length > 0) {
        convertAllImages();
    }
});

customWidthInput.addEventListener('input', () => {
    if (maintainAspectRatioCheckbox.checked && currentFiles.length > 0) {
        // Calculate height based on aspect ratio of first image
        // For now, just trigger reconversion
        if (currentFiles.length > 0) {
            convertAllImages();
        }
    } else if (currentFiles.length > 0) {
        convertAllImages();
    }
});

customHeightInput.addEventListener('input', () => {
    if (maintainAspectRatioCheckbox.checked && currentFiles.length > 0) {
        // Calculate width based on aspect ratio of first image
        // For now, just trigger reconversion
        if (currentFiles.length > 0) {
            convertAllImages();
        }
    } else if (currentFiles.length > 0) {
        convertAllImages();
    }
});

maintainAspectRatioCheckbox.addEventListener('change', () => {
    if (currentFiles.length > 0) {
        convertAllImages();
    }
});

downloadZipBtn.addEventListener('click', downloadAsZip);
downloadAllBtn.addEventListener('click', downloadAllImages);
convertNewBtn.addEventListener('click', reset);

// Modal event listeners
const modalClose = document.getElementById('modalClose');
const modalReconvertBtn = document.getElementById('modalReconvertBtn');
const modalDownloadBtn = document.getElementById('modalDownloadBtn');
const modalQualitySlider = document.getElementById('modalQualitySlider');
const modalQualityValue = document.getElementById('modalQualityValue');
const modalRatioModeBtn = document.getElementById('modalRatioModeBtn');
const modalDimensionsModeBtn = document.getElementById('modalDimensionsModeBtn');
const modalRatioSettings = document.getElementById('modalRatioSettings');
const modalDimensionsSettings = document.getElementById('modalDimensionsSettings');
const modalAspectRatio = document.getElementById('modalAspectRatio');
const modalCustomWidth = document.getElementById('modalCustomWidth');
const modalCustomHeight = document.getElementById('modalCustomHeight');
const modalMaintainAspectRatio = document.getElementById('modalMaintainAspectRatio');
const modalCropModeBtn = document.getElementById('modalCropModeBtn');
const modalCropSettings = document.getElementById('modalCropSettings');
const modalCropRatio = document.getElementById('modalCropRatio');
const modalCropOverlay = document.getElementById('modalCropOverlay');
const modalCropBox = document.getElementById('modalCropBox');
const modalOriginalWrapper = document.getElementById('modalOriginalWrapper');
const modalOriginalImage = document.getElementById('modalOriginalImage');
const modalResetCropBtn = document.getElementById('modalResetCropBtn');

// Crop state
let cropState = {
    isDragging: false,
    isResizing: false,
    startX: 0,
    startY: 0,
    cropX: 0,
    cropY: 0,
    cropWidth: 0,
    cropHeight: 0,
    imageWidth: 0,
    imageHeight: 0,
    imageX: 0,
    imageY: 0,
    aspectRatio: 1
};

modalClose.addEventListener('click', closeModal);
modalReconvertBtn.addEventListener('click', reconvertCurrentImage);
modalDownloadBtn.addEventListener('click', downloadModalImage);
modalQualitySlider.addEventListener('input', (e) => {
    modalQualityValue.textContent = e.target.value + '%';
});

// Modal resize mode toggle
modalRatioModeBtn.addEventListener('click', () => {
    modalRatioModeBtn.classList.add('active');
    modalDimensionsModeBtn.classList.remove('active');
    modalCropModeBtn.classList.remove('active');
    modalRatioSettings.style.display = 'block';
    modalDimensionsSettings.style.display = 'none';
    modalCropSettings.style.display = 'none';
    modalCropOverlay.style.display = 'none';
});

// Window resize handler for crop box
window.addEventListener('resize', () => {
    if (modalCropModeBtn && modalCropModeBtn.classList.contains('active')) {
        // Recalculate crop box position on resize
        setTimeout(() => {
            const currentOverlay = document.getElementById('modalCropOverlay');
            if (currentOverlay && currentOverlay.style.display !== 'none') {
                // Store current crop area in image coordinates
                const cropArea = getCropArea();
                // Recalculate image position
                const img = modalOriginalImage;
                const wrapper = modalOriginalWrapper;
                const imgRect = img.getBoundingClientRect();
                const wrapperRect = wrapper.getBoundingClientRect();
                
                cropState.imageX = imgRect.left - wrapperRect.left;
                cropState.imageY = imgRect.top - wrapperRect.top;
                cropState.imageWidth = imgRect.width;
                cropState.imageHeight = imgRect.height;
                
                // Convert back to overlay coordinates
                const scaleX = cropState.imageWidth / modalOriginalImage.naturalWidth;
                const scaleY = cropState.imageHeight / modalOriginalImage.naturalHeight;
                
                cropState.cropX = cropState.imageX + cropArea.x * scaleX;
                cropState.cropY = cropState.imageY + cropArea.y * scaleY;
                cropState.cropWidth = cropArea.width * scaleX;
                cropState.cropHeight = cropArea.height * scaleY;
                
                updateCropBoxDisplay();
            }
        }, 100);
    }
});

modalDimensionsModeBtn.addEventListener('click', () => {
    modalDimensionsModeBtn.classList.add('active');
    modalRatioModeBtn.classList.remove('active');
    modalCropModeBtn.classList.remove('active');
    modalRatioSettings.style.display = 'none';
    modalDimensionsSettings.style.display = 'block';
    modalCropSettings.style.display = 'none';
    modalCropOverlay.style.display = 'none';
});

modalCropModeBtn.addEventListener('click', () => {
    modalCropModeBtn.classList.add('active');
    modalRatioModeBtn.classList.remove('active');
    modalDimensionsModeBtn.classList.remove('active');
    modalRatioSettings.style.display = 'none';
    modalDimensionsSettings.style.display = 'none';
    modalCropSettings.style.display = 'block';
    modalCropOverlay.style.display = 'block';
    if (modalResetCropBtn) modalResetCropBtn.style.display = 'block';
    initializeCropBox();
});

// Crop ratio change handler
modalCropRatio.addEventListener('change', () => {
    if (modalCropModeBtn.classList.contains('active')) {
        // Reinitialize crop box with new ratio
        setTimeout(() => initializeCropBox(), 50);
    }
});

// Reset crop button
modalResetCropBtn.addEventListener('click', () => {
    initializeCropBox();
});

// Close modal when clicking outside
const imageModalElement = document.getElementById('imageModal');
if (imageModalElement) {
    imageModalElement.addEventListener('click', (e) => {
        if (e.target.id === 'imageModal' || e.target.classList.contains('modal')) {
        closeModal();
    }
});
}

// Helper function to calculate target dimensions based on resize mode (for global settings)
function calculateTargetDimensions(originalWidth, originalHeight) {
    const isRatioMode = ratioModeBtn.classList.contains('active');
    const originalAspectRatio = originalWidth / originalHeight;
    
    if (isRatioMode) {
        const selectedRatio = aspectRatioSelect.value;
        if (selectedRatio === 'original') {
            return { width: originalWidth, height: originalHeight };
        }
        
        // Parse ratio (e.g., "16:9" -> 16/9 = 1.777...)
        const [w, h] = selectedRatio.split(':').map(Number);
        const targetAspectRatio = w / h;
        
        // Determine whether to fit by width or height
        let targetWidth, targetHeight;
        if (originalAspectRatio > targetAspectRatio) {
            // Original is wider - fit by height
            targetHeight = originalHeight;
            targetWidth = targetHeight * targetAspectRatio;
        } else {
            // Original is taller - fit by width
            targetWidth = originalWidth;
            targetHeight = targetWidth / targetAspectRatio;
        }
        
        // Round and verify aspect ratio is maintained exactly
        targetWidth = Math.round(targetWidth);
        targetHeight = Math.round(targetHeight);
        
        // Verify and correct if rounding caused aspect ratio drift
        const actualRatio = targetWidth / targetHeight;
        if (Math.abs(actualRatio - targetAspectRatio) > 0.001) {
            // Recalculate to maintain exact ratio
            if (originalAspectRatio > targetAspectRatio) {
                targetHeight = originalHeight;
                targetWidth = Math.round(targetHeight * targetAspectRatio);
            } else {
                targetWidth = originalWidth;
                targetHeight = Math.round(targetWidth / targetAspectRatio);
            }
        }
        
        return { width: targetWidth, height: targetHeight };
    } else {
        // Custom dimensions mode
        let targetWidth = parseInt(customWidthInput.value) || originalWidth;
        let targetHeight = parseInt(customHeightInput.value) || originalHeight;
        
        // If maintain aspect ratio is checked, adjust dimensions to maintain exact original ratio
        if (maintainAspectRatioCheckbox.checked) {
            const customAspectRatio = targetWidth / targetHeight;
            if (originalAspectRatio > customAspectRatio) {
                // Original is wider - adjust height to maintain original ratio
                targetHeight = targetWidth / originalAspectRatio;
            } else {
                // Original is taller - adjust width to maintain original ratio
                targetWidth = targetHeight * originalAspectRatio;
            }
            
            // Round and verify ratio is maintained exactly
            targetWidth = Math.round(targetWidth);
            targetHeight = Math.round(targetHeight);
            
            // Verify ratio is maintained
            const actualRatio = targetWidth / targetHeight;
            if (Math.abs(actualRatio - originalAspectRatio) > 0.001) {
                // Recalculate if needed
                if (originalAspectRatio > customAspectRatio) {
                    targetHeight = Math.round(targetWidth / originalAspectRatio);
                } else {
                    targetWidth = Math.round(targetHeight * originalAspectRatio);
                }
            }
        }
        
        return { width: targetWidth, height: targetHeight };
    }
}

// Initialize crop box
function initializeCropBox() {
    if (currentModalIndex === -1) return;
    
    const img = modalOriginalImage;
    const wrapper = modalOriginalWrapper;
    
    // Get image position and size
    const imgRect = img.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    
    cropState.imageX = imgRect.left - wrapperRect.left;
    cropState.imageY = imgRect.top - wrapperRect.top;
    cropState.imageWidth = imgRect.width;
    cropState.imageHeight = imgRect.height;
    
    // Get aspect ratio from select
    const ratioValue = modalCropRatio.value;
    const [w, h] = ratioValue.split(':').map(Number);
    cropState.aspectRatio = w / h;
    
    // Calculate image's natural aspect ratio
    const imageNaturalAspectRatio = img.naturalWidth / img.naturalHeight;
    const imageDisplayAspectRatio = cropState.imageWidth / cropState.imageHeight;
    
    // Check if image already matches the selected ratio (with 2% tolerance)
    const tolerance = 0.02;
    const ratioDifference = Math.abs(imageNaturalAspectRatio - cropState.aspectRatio);
    const isAlreadyMatching = ratioDifference < tolerance * cropState.aspectRatio;
    
    let cropWidth, cropHeight;
    
    if (isAlreadyMatching) {
        // Image already matches the ratio - cover entire image (no crop needed)
        cropWidth = cropState.imageWidth;
        cropHeight = cropState.imageHeight;
        cropState.cropX = cropState.imageX;
        cropState.cropY = cropState.imageY;
    } else {
        // Image doesn't match - calculate maximum crop box size maintaining exact aspect ratio
        const imageAspectRatio = cropState.imageWidth / cropState.imageHeight;
        
        // Calculate maximum crop size that fits within image and maintains exact aspect ratio
        if (imageAspectRatio > cropState.aspectRatio) {
            // Image is wider than target - fit by height (use full height)
            cropHeight = cropState.imageHeight;
            cropWidth = cropHeight * cropState.aspectRatio;
            
            // If width exceeds image width, fit by width instead
            if (cropWidth > cropState.imageWidth) {
                cropWidth = cropState.imageWidth;
                cropHeight = cropWidth / cropState.aspectRatio;
            }
        } else {
            // Image is taller than target - fit by width (use full width)
            cropWidth = cropState.imageWidth;
            cropHeight = cropWidth / cropState.aspectRatio;
            
            // If height exceeds image height, fit by height instead
            if (cropHeight > cropState.imageHeight) {
                cropHeight = cropState.imageHeight;
                cropWidth = cropHeight * cropState.aspectRatio;
            }
        }
        
        // Center the crop box
        cropState.cropX = cropState.imageX + (cropState.imageWidth - cropWidth) / 2;
        cropState.cropY = cropState.imageY + (cropState.imageHeight - cropHeight) / 2;
    }
    
    cropState.cropWidth = cropWidth;
    cropState.cropHeight = cropHeight;
    
    updateCropBoxDisplay();
    setupCropInteractions();
}

// Update crop box display
function updateCropBoxDisplay() {
    const cropBox = window.modalCropBox || document.getElementById('modalCropBox');
    if (cropBox) {
        cropBox.style.left = cropState.cropX + 'px';
        cropBox.style.top = cropState.cropY + 'px';
        cropBox.style.width = cropState.cropWidth + 'px';
        cropBox.style.height = cropState.cropHeight + 'px';
    }
}

// Setup crop box drag and resize interactions
function setupCropInteractions() {
    // Get current overlay and box (may have been cloned)
    const currentOverlay = document.getElementById('modalCropOverlay');
    if (!currentOverlay) return;
    
    // Remove existing listeners by cloning
    const newOverlay = currentOverlay.cloneNode(true);
    currentOverlay.parentNode.replaceChild(newOverlay, currentOverlay);
    const newBox = newOverlay.querySelector('.crop-box');
    if (!newBox) return;
    
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialCropX = 0;
    let initialCropY = 0;
    
    // Mouse events
    newOverlay.addEventListener('mousedown', (e) => {
        const targetBox = newOverlay.querySelector('.crop-box');
        if (e.target === targetBox || targetBox.contains(e.target)) {
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            initialCropX = cropState.cropX;
            initialCropY = cropState.cropY;
            e.preventDefault();
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;
            
            // Calculate new position relative to wrapper
            let newX = initialCropX + deltaX;
            let newY = initialCropY + deltaY;
            
            // Constrain to image bounds (precise)
            const minX = cropState.imageX;
            const maxX = cropState.imageX + cropState.imageWidth - cropState.cropWidth;
            const minY = cropState.imageY;
            const maxY = cropState.imageY + cropState.imageHeight - cropState.cropHeight;
            
            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));
            
            cropState.cropX = newX;
            cropState.cropY = newY;
            updateCropBoxDisplay();
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Touch events for mobile
    newOverlay.addEventListener('touchstart', (e) => {
        const targetBox = newOverlay.querySelector('.crop-box');
        if (e.target === targetBox || targetBox.contains(e.target)) {
            isDragging = true;
            const touch = e.touches[0];
            dragStartX = touch.clientX;
            dragStartY = touch.clientY;
            initialCropX = cropState.cropX;
            initialCropY = cropState.cropY;
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            const deltaX = touch.clientX - dragStartX;
            const deltaY = touch.clientY - dragStartY;
            
            let newX = initialCropX + deltaX;
            let newY = initialCropY + deltaY;
            
            // Constrain to image bounds (precise)
            const minX = cropState.imageX;
            const maxX = cropState.imageX + cropState.imageWidth - cropState.cropWidth;
            const minY = cropState.imageY;
            const maxY = cropState.imageY + cropState.imageHeight - cropState.cropHeight;
            
            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));
            
            cropState.cropX = newX;
            cropState.cropY = newY;
            updateCropBoxDisplay();
            e.preventDefault();
        }
    }, { passive: false });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Update global references
    if (typeof window !== 'undefined') {
        window.modalCropOverlay = newOverlay;
        window.modalCropBox = newBox;
    }
}

// Get crop area in image coordinates
function getCropArea() {
    if (!modalOriginalImage || !modalOriginalImage.naturalWidth || !modalOriginalImage.naturalHeight) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }
    
    // Convert crop box coordinates to image coordinates
    const scaleX = modalOriginalImage.naturalWidth / cropState.imageWidth;
    const scaleY = modalOriginalImage.naturalHeight / cropState.imageHeight;
    
    // Calculate crop area in image coordinates
    let x = Math.max(0, (cropState.cropX - cropState.imageX) * scaleX);
    let y = Math.max(0, (cropState.cropY - cropState.imageY) * scaleY);
    let width = cropState.cropWidth * scaleX;
    let height = cropState.cropHeight * scaleY;
    
    // Ensure crop area doesn't exceed image bounds
    const maxWidth = modalOriginalImage.naturalWidth - x;
    const maxHeight = modalOriginalImage.naturalHeight - y;
    width = Math.min(width, maxWidth);
    height = Math.min(height, maxHeight);
    
    // Ensure aspect ratio is maintained exactly
    const cropAspectRatio = cropState.aspectRatio;
    const currentAspectRatio = width / height;
    
    // Adjust to maintain exact aspect ratio
    if (Math.abs(currentAspectRatio - cropAspectRatio) > 0.001) {
        if (currentAspectRatio > cropAspectRatio) {
            // Too wide - adjust width to match height
            width = height * cropAspectRatio;
            // Re-check bounds
            if (x + width > modalOriginalImage.naturalWidth) {
                width = modalOriginalImage.naturalWidth - x;
                height = width / cropAspectRatio;
            }
        } else {
            // Too tall - adjust height to match width
            height = width / cropAspectRatio;
            // Re-check bounds
            if (y + height > modalOriginalImage.naturalHeight) {
                height = modalOriginalImage.naturalHeight - y;
                width = height * cropAspectRatio;
            }
        }
    }
    
    // Round values while maintaining exact aspect ratio
    let roundedWidth = Math.round(width);
    let roundedHeight = Math.round(height);
    
    // Verify aspect ratio after rounding
    const roundedRatio = roundedWidth / roundedHeight;
    if (Math.abs(roundedRatio - cropAspectRatio) > 0.001) {
        // Adjust to maintain exact ratio
        if (roundedRatio > cropAspectRatio) {
            roundedWidth = Math.round(roundedHeight * cropAspectRatio);
        } else {
            roundedHeight = Math.round(roundedWidth / cropAspectRatio);
        }
    }
    
    return { 
        x: Math.round(x), 
        y: Math.round(y), 
        width: roundedWidth, 
        height: roundedHeight 
    };
}

// Helper function to calculate target dimensions for modal (individual image settings)
function calculateModalTargetDimensions(originalWidth, originalHeight) {
    // If crop mode is active, return crop dimensions
    if (modalCropModeBtn.classList.contains('active')) {
        const cropArea = getCropArea();
        
        // Ensure dimensions maintain exact aspect ratio
        const selectedRatio = modalCropRatio.value;
        const [w, h] = selectedRatio.split(':').map(Number);
        const targetAspectRatio = w / h;
        
        // Verify and correct aspect ratio to ensure exact match
        let finalWidth = cropArea.width;
        let finalHeight = cropArea.height;
        let currentAspectRatio = finalWidth / finalHeight;
        
        // Force exact aspect ratio match
        if (Math.abs(currentAspectRatio - targetAspectRatio) > 0.0001) {
            // Adjust to exact aspect ratio (prioritize maintaining crop area size)
            if (currentAspectRatio > targetAspectRatio) {
                // Too wide - adjust width to match height
                finalWidth = finalHeight * targetAspectRatio;
            } else {
                // Too tall - adjust height to match width
                finalHeight = finalWidth / targetAspectRatio;
            }
            
            // Round to integers while maintaining ratio
            finalWidth = Math.round(finalWidth);
            finalHeight = Math.round(finalWidth / targetAspectRatio);
            
            // Final verification
            currentAspectRatio = finalWidth / finalHeight;
            if (Math.abs(currentAspectRatio - targetAspectRatio) > 0.001) {
                // Recalculate from height if ratio still off
                finalHeight = Math.round(finalWidth / targetAspectRatio);
            }
        }
        
        return { 
            width: finalWidth, 
            height: finalHeight,
            cropArea: {
                x: cropArea.x,
                y: cropArea.y,
                width: finalWidth,
                height: finalHeight
            }
        };
    }
    
    const isRatioMode = modalRatioModeBtn.classList.contains('active');
    const originalAspectRatio = originalWidth / originalHeight;
    
    if (isRatioMode) {
        const selectedRatio = modalAspectRatio.value;
        if (selectedRatio === 'original') {
            return { width: originalWidth, height: originalHeight };
        }
        
        // Parse ratio (e.g., "16:9" -> 16/9 = 1.777...)
        const [w, h] = selectedRatio.split(':').map(Number);
        const targetAspectRatio = w / h;
        
        // Determine whether to fit by width or height
        let targetWidth, targetHeight;
        if (originalAspectRatio > targetAspectRatio) {
            // Original is wider - fit by height
            targetHeight = originalHeight;
            targetWidth = targetHeight * targetAspectRatio;
        } else {
            // Original is taller - fit by width
            targetWidth = originalWidth;
            targetHeight = targetWidth / targetAspectRatio;
        }
        
        // Round and verify aspect ratio is maintained exactly
        targetWidth = Math.round(targetWidth);
        targetHeight = Math.round(targetHeight);
        
        // Verify and correct if rounding caused aspect ratio drift
        const actualRatio = targetWidth / targetHeight;
        if (Math.abs(actualRatio - targetAspectRatio) > 0.001) {
            // Recalculate to maintain exact ratio
            if (originalAspectRatio > targetAspectRatio) {
                targetHeight = originalHeight;
                targetWidth = Math.round(targetHeight * targetAspectRatio);
            } else {
                targetWidth = originalWidth;
                targetHeight = Math.round(targetWidth / targetAspectRatio);
            }
        }
        
        return { width: targetWidth, height: targetHeight };
    } else {
        // Custom dimensions mode
        let targetWidth = parseInt(modalCustomWidth.value) || originalWidth;
        let targetHeight = parseInt(modalCustomHeight.value) || originalHeight;
        
        // If maintain aspect ratio is checked, adjust dimensions
        if (modalMaintainAspectRatio.checked) {
            const customAspectRatio = targetWidth / targetHeight;
            if (originalAspectRatio > customAspectRatio) {
                // Original is wider - adjust height
                targetHeight = Math.round(targetWidth / originalAspectRatio);
            } else {
                // Original is taller - adjust width
                targetWidth = Math.round(targetHeight * originalAspectRatio);
            }
        }
        
        return { width: targetWidth, height: targetHeight };
    }
}

// Functions
function handleFileSelect(e) {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
        handleFiles(files);
    }
}

function handleFiles(files) {
    if (files.length === 0) {
        alert('Please select at least one image file.');
        return;
    }

    currentFiles = files;
    
    // Show settings
    settingsSection.style.display = 'block';
    
    // Convert all images
    convertAllImages();
}

async function convertAllImages() {
    loadingOverlay.style.display = 'flex';
    loadingText.textContent = 'Converting your images...';
    loadingProgress.textContent = '';
    
    convertedImages = [];
    imagesGrid.innerHTML = '';
    
    try {
        // Process images in parallel for faster conversion
        const conversionPromises = currentFiles.map(async (file, index) => {
            loadingProgress.textContent = `Processing ${index + 1} of ${currentFiles.length}`;
            return await convertImage(file, index);
        });
        
        const results = await Promise.all(conversionPromises);
        convertedImages = results.sort((a, b) => a.index - b.index);
        
        // Add all image cards
        convertedImages.forEach((result, index) => {
            addImageCard(result, index);
        });
        
        // Update batch statistics
        updateBatchStats();
        
        // Show preview section
        previewSection.style.display = 'block';
        
    } catch (error) {
        console.error('Conversion error:', error);
        alert('An error occurred while converting images. Please try again.');
    } finally {
        loadingOverlay.style.display = 'none';
    }
}

async function convertImage(file, index) {
    const originalUrl = URL.createObjectURL(file);
    const img = await loadImage(originalUrl);
    
    const targetSizeKB = parseInt(targetSizeSlider.value);
    const initialQuality = parseInt(qualitySlider.value) / 100;
    const autoReduce = autoReduceCheckbox.checked;
    
    // Calculate target dimensions based on resize mode
    const targetDimensions = calculateTargetDimensions(img.width, img.height);
    
    // Check if we need to auto-reduce large images
    const originalSizeKB = file.size / 1024;
    let finalTargetSize = targetSizeKB;
    let aggressiveMode = false;
    
    if (autoReduce && originalSizeKB > 100) {
        // More aggressive reduction based on original size
        if (originalSizeKB > 2000) { // 2MB+
            finalTargetSize = Math.min(targetSizeKB, 60); // Very aggressive for 2MB+
            aggressiveMode = true;
        } else if (originalSizeKB > 500) { // 500KB+
            finalTargetSize = Math.min(targetSizeKB, 70); // Aggressive for 500KB+
            aggressiveMode = true;
        } else if (originalSizeKB > 200) { // 200KB+
            finalTargetSize = Math.min(targetSizeKB, 80); // Moderate for 200KB+
            aggressiveMode = true;
        } else {
            finalTargetSize = Math.min(targetSizeKB, 90); // Light for 100KB+
        }
    }
    
    const conversionResult = await convertToWebP(img, finalTargetSize, initialQuality, autoReduce && originalSizeKB > 100, targetDimensions);
    
    return {
        index: index,
        originalFile: file,
        originalUrl: originalUrl,
        originalSize: file.size,
        originalFormat: file.type.split('/')[1].toUpperCase(),
        width: img.width,
        height: img.height,
        convertedWidth: targetDimensions.width,
        convertedHeight: targetDimensions.height,
        convertedBlob: conversionResult.blob,
        convertedUrl: URL.createObjectURL(conversionResult.blob),
        convertedSize: conversionResult.blob.size,
        quality: conversionResult.quality,
        fileName: file.name.replace(/\.[^/.]+$/, ''),
        wasAutoReduced: autoReduce && originalSizeKB > 100,
        aggressiveMode: aggressiveMode,
        finalTargetSize: finalTargetSize
    };
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

async function convertToWebP(img, targetSizeKB, initialQuality, forceResize = false, targetDimensions = null) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Calculate canvas dimensions
    let canvasWidth, canvasHeight;
    let sourceX = 0, sourceY = 0, sourceWidth = img.width, sourceHeight = img.height;
    
    if (targetDimensions) {
        // Check if we have a crop area
        if (targetDimensions.cropArea) {
            // Crop mode - use crop area (ensure exact dimensions)
            sourceX = Math.max(0, Math.round(targetDimensions.cropArea.x));
            sourceY = Math.max(0, Math.round(targetDimensions.cropArea.y));
            sourceWidth = Math.max(1, Math.round(targetDimensions.cropArea.width));
            sourceHeight = Math.max(1, Math.round(targetDimensions.cropArea.height));
            
            // Ensure source doesn't exceed image bounds
            sourceX = Math.min(sourceX, img.width - 1);
            sourceY = Math.min(sourceY, img.height - 1);
            sourceWidth = Math.min(sourceWidth, img.width - sourceX);
            sourceHeight = Math.min(sourceHeight, img.height - sourceY);
            
            // Final canvas dimensions must match exactly
            canvasWidth = sourceWidth;
            canvasHeight = sourceHeight;
        } else {
            // Use target dimensions from aspect ratio or custom dimensions
            canvasWidth = targetDimensions.width;
            canvasHeight = targetDimensions.height;
        }
    } else if (!forceResize) {
        // User is manually adjusting quality - use original dimensions
        canvasWidth = img.width;
        canvasHeight = img.height;
    } else {
        // Auto-resize mode - calculate scale factor
        canvasWidth = img.width;
        canvasHeight = img.height;
    }
    
    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Draw image on canvas (with cropping if cropArea exists, otherwise scaling)
    if (targetDimensions && targetDimensions.cropArea) {
        // Draw cropped portion
        ctx.drawImage(
            img,
            sourceX, sourceY, sourceWidth, sourceHeight,
            0, 0, canvasWidth, canvasHeight
        );
    } else {
        // Draw image with scaling if dimensions changed
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    }
    
    // For manual quality adjustment without auto-reduction, use exact quality
    if (!forceResize && !targetDimensions) {
        const blob = await canvasToBlob(canvas, initialQuality);
        return { blob, quality: initialQuality };
    }
    
    // If we have target dimensions but need to auto-resize for file size, apply additional scaling
    if (forceResize && targetDimensions) {
        // Check if we need additional scaling for file size reduction
        const estimatedSize = (canvasWidth * canvasHeight * 4) / 1024; // Rough estimate
        const originalSizeKB = (canvasWidth * canvasHeight * 4) / 1024;
        
        // If the target dimensions result in a large file, scale down further
        if (originalSizeKB > targetSizeKB * 2) {
    let scaleFactor = 1;
            if (originalSizeKB > 2000) { // 2MB+
                scaleFactor = Math.sqrt(targetSizeKB * 1024 / estimatedSize) * 0.5;
            } else if (originalSizeKB > 500) { // 500KB+
                scaleFactor = Math.sqrt(targetSizeKB * 1024 / estimatedSize) * 0.6;
            } else if (originalSizeKB > 200) { // 200KB+
                scaleFactor = Math.sqrt(targetSizeKB * 1024 / estimatedSize) * 0.7;
            } else {
                scaleFactor = Math.sqrt(targetSizeKB * 1024 / estimatedSize) * 0.8;
            }
            
            // Ensure reasonable scale factors
            scaleFactor = Math.max(0.3, Math.min(1.0, scaleFactor));
            
            canvasWidth = Math.floor(canvasWidth * scaleFactor);
            canvasHeight = Math.floor(canvasHeight * scaleFactor);
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        }
    } else if (forceResize && !targetDimensions) {
        // For auto-reduction without target dimensions, calculate scale factor
        const estimatedSize = (img.width * img.height * 4) / 1024; // Rough estimate
        const originalSizeKB = (img.width * img.height * 4) / 1024;
        
        let scaleFactor = 1;
        if (originalSizeKB > 2000) { // 2MB+
            scaleFactor = Math.sqrt(targetSizeKB * 1024 / estimatedSize) * 0.5;
        } else if (originalSizeKB > 500) { // 500KB+
            scaleFactor = Math.sqrt(targetSizeKB * 1024 / estimatedSize) * 0.6;
        } else if (originalSizeKB > 200) { // 200KB+
            scaleFactor = Math.sqrt(targetSizeKB * 1024 / estimatedSize) * 0.7;
        } else {
            scaleFactor = Math.sqrt(targetSizeKB * 1024 / estimatedSize) * 0.8;
        }
        
        // Ensure minimum and maximum scale factors
        if (originalSizeKB > 2000) {
            scaleFactor = Math.max(0.2, Math.min(0.8, scaleFactor));
        } else if (originalSizeKB > 500) {
            scaleFactor = Math.max(0.25, Math.min(0.85, scaleFactor));
        } else {
            scaleFactor = Math.max(0.3, Math.min(0.9, scaleFactor));
        }
        
        canvasWidth = Math.floor(img.width * scaleFactor);
        canvasHeight = Math.floor(img.height * scaleFactor);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    }
    
    // Binary search for the right quality to achieve target size
    let quality = initialQuality;
    let blob = await canvasToBlob(canvas, quality);
    
    const targetSizeBytes = targetSizeKB * 1024;
    const tolerance = 10 * 1024; // 10KB tolerance
    
    // If the initial conversion is already within range, return it
    if (Math.abs(blob.size - targetSizeBytes) <= tolerance) {
        return { blob, quality };
    }
    
    // Binary search for optimal quality with more aggressive settings for large images
    let minQuality = forceResize ? 0.05 : 0.1; // Lower minimum for auto-reduction
    let maxQuality = 1.0;
    let attempts = 0;
    const maxAttempts = forceResize ? 15 : 10; // More attempts for auto-reduction
    
    while (attempts < maxAttempts) {
        if (blob.size > targetSizeBytes + tolerance) {
            // File too large, decrease quality
            maxQuality = quality;
            quality = (minQuality + quality) / 2;
        } else if (blob.size < targetSizeBytes - tolerance) {
            // File too small, increase quality
            minQuality = quality;
            quality = (quality + maxQuality) / 2;
        } else {
            // Within tolerance
            break;
        }
        
        blob = await canvasToBlob(canvas, quality);
        attempts++;
    }
    
    // If we still can't achieve the target size and we haven't resized yet, resize
    if (blob.size > targetSizeBytes + tolerance && !forceResize && quality <= 0.1) {
        // Image is too large even at lowest quality, need to resize
        const additionalScaleFactor = Math.sqrt(targetSizeBytes / blob.size) * 0.9;
        canvas.width = Math.floor(canvas.width * additionalScaleFactor);
        canvas.height = Math.floor(canvas.height * additionalScaleFactor);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Try again with resized image
        quality = initialQuality;
        blob = await canvasToBlob(canvas, quality);
        
        // One more binary search with resized image
        minQuality = 0.1;
        maxQuality = 1.0;
        attempts = 0;
        
        while (attempts < maxAttempts) {
            if (blob.size > targetSizeBytes + tolerance) {
                maxQuality = quality;
                quality = (minQuality + quality) / 2;
            } else if (blob.size < targetSizeBytes - tolerance) {
                minQuality = quality;
                quality = (quality + maxQuality) / 2;
            } else {
                break;
            }
            
            blob = await canvasToBlob(canvas, quality);
            attempts++;
        }
    }
    
    return { blob, quality };
}

function canvasToBlob(canvas, quality) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/webp', quality);
    });
}

function addImageCard(imageData, index) {
    const card = document.createElement('div');
    card.className = 'image-card';
    
    const savedPercent = ((imageData.originalSize - imageData.convertedSize) / imageData.originalSize * 100).toFixed(1);
    const targetSizeKB = parseInt(targetSizeSlider.value);
    const isWithinTarget = Math.abs(imageData.convertedSize / 1024 - targetSizeKB) <= 10;
    const originalSizeKB = imageData.originalSize / 1024;
    
    card.innerHTML = `
        <div class="image-card-header">
            <h3 title="${imageData.fileName}">${imageData.fileName}</h3>
            <div class="image-card-actions">
                <button class="icon-btn" onclick="viewImage(${index})" title="View Full Size">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>
                <button class="icon-btn ${!isWithinTarget ? 'highlight-adjust' : ''}" onclick="adjustQuality(${index})" title="${!isWithinTarget ? 'Needs adjustment - click to fix' : 'Adjust Quality'}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                </button>
                <button class="icon-btn" onclick="downloadSingleImage(${index})" title="Download">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </button>
            </div>
        </div>
        
        <div class="image-comparison">
            <div class="image-preview" data-orientation="${imageData.width > imageData.height ? 'landscape' : 'portrait'}">
                <div class="image-preview-label">Original</div>
                <div class="image-wrapper">
                    <img src="${imageData.originalUrl}" alt="Original" 
                         data-orientation="${imageData.width > imageData.height ? 'landscape' : 'portrait'}"
                         data-width="${imageData.width}" 
                         data-height="${imageData.height}"
                         loading="lazy">
                </div>
            </div>
            <div class="image-preview" data-orientation="${(imageData.convertedWidth || imageData.width) > (imageData.convertedHeight || imageData.height) ? 'landscape' : 'portrait'}">
                <div class="image-preview-label">WebP</div>
                <div class="image-wrapper">
                    <img src="${imageData.convertedUrl}" alt="Converted" 
                         data-orientation="${(imageData.convertedWidth || imageData.width) > (imageData.convertedHeight || imageData.height) ? 'landscape' : 'portrait'}"
                         data-width="${imageData.convertedWidth || imageData.width}" 
                         data-height="${imageData.convertedHeight || imageData.height}"
                         loading="lazy">
                </div>
            </div>
        </div>
        
        <div class="image-info">
            <p>
                <span><strong>Format:</strong> ${imageData.originalFormat} → WebP</span>
                ${imageData.wasAutoReduced ? `<span class="badge ${imageData.aggressiveMode ? 'badge-warning' : 'badge-success'}">${imageData.aggressiveMode ? 'Aggressive Reduction' : 'Auto-Reduced'}</span>` : ''}
            </p>
            <p>
                <span><strong>Dimensions:</strong> ${imageData.width} × ${imageData.height}</span>
                ${imageData.convertedWidth && imageData.convertedHeight && 
                  (imageData.convertedWidth !== imageData.width || imageData.convertedHeight !== imageData.height) 
                  ? `<span class="badge badge-success">→ ${imageData.convertedWidth} × ${imageData.convertedHeight}</span>` 
                  : ''}
            </p>
            <p>
                <span><strong>Original:</strong> ${formatFileSize(imageData.originalSize)}</span>
                ${originalSizeKB > 2000 ? '<span class="badge badge-warning">Very Large (2MB+)</span>' : 
                  originalSizeKB > 500 ? '<span class="badge badge-warning">Large (500KB+)</span>' : 
                  originalSizeKB > 100 ? '<span class="badge badge-warning">Medium (100KB+)</span>' : ''}
            </p>
            <p>
                <span><strong>WebP:</strong> ${formatFileSize(imageData.convertedSize)}</span>
                <span class="badge ${isWithinTarget ? 'badge-success' : 'badge-warning'}">
                    ${isWithinTarget ? '✓ Target' : 'Adjust'}
                </span>
            </p>
            <p>
                <span><strong>Quality:</strong> ${Math.round(imageData.quality * 100)}%</span>
                <span style="color: #10b981; font-weight: 600;">↓ ${savedPercent}%</span>
            </p>
        </div>
    `;
    
    imagesGrid.appendChild(card);
}

function updateBatchStats() {
    const totalOriginal = convertedImages.reduce((sum, img) => sum + img.originalSize, 0);
    const totalWebP = convertedImages.reduce((sum, img) => sum + img.convertedSize, 0);
    const savedPercent = ((totalOriginal - totalWebP) / totalOriginal * 100).toFixed(1);
    const autoReducedCount = convertedImages.filter(img => img.wasAutoReduced).length;
    
    imageCount.textContent = convertedImages.length;
    totalOriginalSize.textContent = formatFileSize(totalOriginal);
    totalWebPSize.textContent = formatFileSize(totalWebP);
    totalSaved.textContent = savedPercent + '%';
    
    // Update batch info to show auto-reduction info
    if (autoReducedCount > 0) {
        const batchInfo = document.querySelector('.batch-info p');
        batchInfo.innerHTML = `
            <span>Total Original Size: <strong id="totalOriginalSize">${formatFileSize(totalOriginal)}</strong></span>
            <span class="separator">•</span>
            <span>Total WebP Size: <strong id="totalWebPSize">${formatFileSize(totalWebP)}</strong></span>
            <span class="separator">•</span>
            <span>Saved: <strong id="totalSaved">${savedPercent}%</strong></span>
            <span class="separator">•</span>
            <span style="color: #f59e0b;"><strong>${autoReducedCount} auto-reduced</strong></span>
        `;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function downloadSingleImage(index) {
    const imageData = convertedImages[index];
    const url = imageData.convertedUrl;
    const a = document.createElement('a');
    a.href = url;
    a.download = `${imageData.fileName}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function downloadAllImages() {
    convertedImages.forEach((imageData, index) => {
        setTimeout(() => {
            downloadSingleImage(index);
        }, index * 200); // Stagger downloads to avoid browser blocking
    });
}

async function downloadAsZip() {
    if (!window.JSZip) {
        alert('ZIP functionality not available. Please try individual downloads.');
        return;
    }
    
    loadingOverlay.style.display = 'flex';
    loadingText.textContent = 'Creating ZIP file...';
    loadingProgress.textContent = '';
    
    try {
        const zip = new JSZip();
        
        // Add all converted images to ZIP (using the most current blob data)
        convertedImages.forEach((imageData, index) => {
            loadingProgress.textContent = `Adding ${index + 1} of ${convertedImages.length} to ZIP`;
            // Use the current convertedBlob which gets updated when user adjusts quality
            zip.file(`${imageData.fileName}.webp`, imageData.convertedBlob);
        });
        
        // Generate ZIP file
        loadingProgress.textContent = 'Generating ZIP file...';
        const zipBlob = await zip.generateAsync({type: "blob"});
        
        // Download ZIP file
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `optimized_images_${new Date().toISOString().split('T')[0]}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('ZIP creation error:', error);
        alert('Error creating ZIP file. Please try individual downloads.');
    } finally {
        loadingOverlay.style.display = 'none';
    }
}

function reset() {
    currentFiles = [];
    convertedImages = [];
    currentModalIndex = -1;
    individualImageSettings = {}; // Clear individual image settings
    fileInput.value = '';
    
    settingsSection.style.display = 'none';
    previewSection.style.display = 'none';
    imagesGrid.innerHTML = '';
    closeModal();
    
    // Reset sliders to default
    targetSizeSlider.value = 110;
    targetSizeValue.textContent = '110 KB';
    qualitySlider.value = 85;
    qualityValue.textContent = '85%';
    autoReduceCheckbox.checked = true;
    
    // Clean up URLs
    convertedImages.forEach(img => {
        URL.revokeObjectURL(img.originalUrl);
        URL.revokeObjectURL(img.convertedUrl);
    });
}

// Modal functions
function viewImage(index) {
    const imageData = convertedImages[index];
    currentModalIndex = index;
    
    document.getElementById('modalTitle').textContent = imageData.fileName;
    const modalOriginalImg = document.getElementById('modalOriginalImage');
    const modalWebPImg = document.getElementById('modalWebPImage');
    
    modalOriginalImg.src = imageData.originalUrl;
    modalWebPImg.src = imageData.convertedUrl;
    
    // Set orientation and original dimensions for proper display
    const originalOrientation = imageData.width > imageData.height ? 'landscape' : 'portrait';
    const convertedOrientation = (imageData.convertedWidth || imageData.width) > (imageData.convertedHeight || imageData.height) ? 'landscape' : 'portrait';
    
    modalOriginalImg.setAttribute('data-orientation', originalOrientation);
    modalOriginalImg.setAttribute('data-width', imageData.width);
    modalOriginalImg.setAttribute('data-height', imageData.height);
    
    // Function to apply original size display
    const applyOriginalSize = (img, orientation) => {
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.maxWidth = '100%';
        img.style.maxHeight = orientation === 'landscape' ? '70vh' : '80vh';
        img.style.objectFit = 'contain';
        img.style.display = 'block';
    };
    
    // Wait for images to load, then set proper dimensions
    const setupImageDisplay = (img, orientation) => {
        if (img.complete && img.naturalWidth > 0) {
            applyOriginalSize(img, orientation);
        } else {
            img.onload = () => {
                applyOriginalSize(img, orientation);
            };
            img.onerror = () => {
                // If image fails to load, still try to apply styles
                applyOriginalSize(img, orientation);
            };
        }
    };
    
    setupImageDisplay(modalOriginalImg, originalOrientation);
    setupImageDisplay(modalWebPImg, convertedOrientation);
    
    // Set current quality in modal
    const currentQuality = Math.round(imageData.quality * 100);
    modalQualitySlider.value = currentQuality;
    modalQualityValue.textContent = currentQuality + '%';
    
    // Load individual image settings if they exist, otherwise use current image dimensions
    const imageId = `image_${index}`;
    let settings = individualImageSettings[imageId];
    
    if (!settings) {
        // Check if image already has a specific aspect ratio that matches common ratios
        const imageAspectRatio = imageData.width / imageData.height;
        const commonRatios = {
            '1:1': 1.0,
            '4:5': 0.8,
            '5:4': 1.25,
            '16:9': 1.7777777777777777,
            '9:16': 0.5625,
            '4:3': 1.3333333333333333,
            '3:4': 0.75,
            '3:2': 1.5,
            '2:3': 0.6666666666666666
        };
        
        // Find matching ratio (with 2% tolerance)
        const tolerance = 0.02;
        let matchingRatio = null;
        for (const [ratio, value] of Object.entries(commonRatios)) {
            const diff = Math.abs(imageAspectRatio - value);
            if (diff < tolerance * value) {
                matchingRatio = ratio;
                break;
            }
        }
        
        // Initialize with current image converted dimensions or use global settings
        const isUsingCustom = imageData.convertedWidth && imageData.convertedHeight && 
                             (imageData.convertedWidth !== imageData.width || imageData.convertedHeight !== imageData.height);
        
        if (isUsingCustom) {
            // Image has custom dimensions, use dimension mode
            settings = {
                mode: 'dimensions',
                width: imageData.convertedWidth,
                height: imageData.convertedHeight,
                maintainAspectRatio: true
            };
        } else if (matchingRatio) {
            // Image already matches a common ratio - suggest crop mode with that ratio
            settings = {
                mode: 'crop',
                cropRatio: matchingRatio,
                width: imageData.width,
                height: imageData.height,
                maintainAspectRatio: true
            };
        } else {
            // Use global settings or default
            settings = {
                mode: ratioModeBtn.classList.contains('active') ? 'ratio' : 'dimensions',
                ratio: aspectRatioSelect.value,
                width: imageData.convertedWidth || imageData.width,
                height: imageData.convertedHeight || imageData.height,
                maintainAspectRatio: true
            };
        }
        individualImageSettings[imageId] = settings;
    }
    
    // Apply settings to modal controls
    if (settings.mode === 'crop') {
        modalCropModeBtn.classList.add('active');
        modalRatioModeBtn.classList.remove('active');
        modalDimensionsModeBtn.classList.remove('active');
        modalRatioSettings.style.display = 'none';
        modalDimensionsSettings.style.display = 'none';
        modalCropSettings.style.display = 'block';
        modalCropOverlay.style.display = 'block';
        if (modalResetCropBtn) modalResetCropBtn.style.display = 'block';
        if (settings.cropRatio) {
            modalCropRatio.value = settings.cropRatio;
        }
        // Wait for image to load, then initialize crop box
        if (modalOriginalImage.complete) {
            setTimeout(() => initializeCropBox(), 100);
        } else {
            modalOriginalImage.onload = () => {
                setTimeout(() => initializeCropBox(), 100);
            };
        }
    } else if (settings.mode === 'ratio') {
        modalRatioModeBtn.classList.add('active');
        modalDimensionsModeBtn.classList.remove('active');
        modalCropModeBtn.classList.remove('active');
        modalRatioSettings.style.display = 'block';
        modalDimensionsSettings.style.display = 'none';
        modalCropSettings.style.display = 'none';
        modalCropOverlay.style.display = 'none';
        if (settings.ratio) {
            modalAspectRatio.value = settings.ratio;
        }
    } else {
        modalDimensionsModeBtn.classList.add('active');
        modalRatioModeBtn.classList.remove('active');
        modalCropModeBtn.classList.remove('active');
        modalRatioSettings.style.display = 'none';
        modalDimensionsSettings.style.display = 'block';
        modalCropSettings.style.display = 'none';
        modalCropOverlay.style.display = 'none';
        if (settings.width) modalCustomWidth.value = settings.width;
        if (settings.height) modalCustomHeight.value = settings.height;
        modalMaintainAspectRatio.checked = settings.maintainAspectRatio !== false;
    }
    
    // Initialize crop box if not already done (for first time viewing)
    if (modalCropModeBtn.classList.contains('active')) {
        if (modalOriginalImage.complete) {
            setTimeout(() => initializeCropBox(), 100);
        } else {
            modalOriginalImage.onload = () => {
                setTimeout(() => initializeCropBox(), 100);
            };
        }
    }
    
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.style.display = 'flex';
    }
}

function adjustQuality(index) {
    viewImage(index); // Open modal and focus on quality adjustment
}

function closeModal() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.style.display = 'none';
    }
    currentModalIndex = -1;
}

async function reconvertCurrentImage() {
    if (currentModalIndex === -1) return;
    
    const imageData = convertedImages[currentModalIndex];
    const newQuality = parseInt(document.getElementById('modalQualitySlider').value) / 100;
    const targetSizeKB = parseInt(targetSizeSlider.value);
    
    console.log(`Reconverting with quality: ${newQuality} (${Math.round(newQuality * 100)}%)`);
    
    // Disable the reconvert button to prevent multiple clicks
    updateReconvertButtonState(true);
    
    loadingOverlay.style.display = 'flex';
    loadingText.textContent = `Reconverting ${imageData.fileName}...`;
    loadingProgress.textContent = '';
    
    try {
        // Load original image
        const img = await loadImage(imageData.originalUrl);
        
        // Calculate target dimensions based on modal resize settings (individual image settings)
        const targetDimensions = calculateModalTargetDimensions(img.width, img.height);
        
        // Save individual image settings
        const imageId = `image_${currentModalIndex}`;
        const isRatioMode = modalRatioModeBtn.classList.contains('active');
        const isCropMode = modalCropModeBtn.classList.contains('active');
        
        individualImageSettings[imageId] = {
            mode: isCropMode ? 'crop' : (isRatioMode ? 'ratio' : 'dimensions'),
            ratio: isRatioMode ? modalAspectRatio.value : null,
            cropRatio: isCropMode ? modalCropRatio.value : null,
            cropArea: isCropMode ? getCropArea() : null,
            width: isRatioMode ? null : parseInt(modalCustomWidth.value),
            height: isRatioMode ? null : parseInt(modalCustomHeight.value),
            maintainAspectRatio: modalMaintainAspectRatio.checked
        };
        
        // For manual quality adjustment, don't use auto-reduction
        const conversionResult = await convertToWebP(img, targetSizeKB, newQuality, false, targetDimensions);
        
        // Update target dimensions in image data
        imageData.convertedWidth = targetDimensions.width;
        imageData.convertedHeight = targetDimensions.height;
        
        console.log(`Original size: ${imageData.originalSize} bytes`);
        console.log(`New size: ${conversionResult.blob.size} bytes`);
        console.log(`Quality used: ${conversionResult.quality}`);
        
        // Update the converted image data with user's selected quality
        imageData.convertedBlob = conversionResult.blob;
        imageData.convertedSize = conversionResult.blob.size;
        imageData.quality = newQuality; // Use the user's selected quality, not algorithm result
        
        // Update the modal display
        const newUrl = URL.createObjectURL(conversionResult.blob);
        URL.revokeObjectURL(imageData.convertedUrl); // Clean up old URL
        imageData.convertedUrl = newUrl;
        
        const updatedWebPImg = document.getElementById('modalWebPImage');
        updatedWebPImg.src = newUrl;
        
        // Update image display to original size after load
        const convertedOrientation = (imageData.convertedWidth || imageData.width) > (imageData.convertedHeight || imageData.height) ? 'landscape' : 'portrait';
        updatedWebPImg.setAttribute('data-orientation', convertedOrientation);
        updatedWebPImg.setAttribute('data-width', imageData.convertedWidth);
        updatedWebPImg.setAttribute('data-height', imageData.convertedHeight);
        
        const updateWebPDisplay = () => {
            updatedWebPImg.style.width = 'auto';
            updatedWebPImg.style.height = 'auto';
            updatedWebPImg.style.maxWidth = '100%';
            updatedWebPImg.style.maxHeight = convertedOrientation === 'landscape' ? '70vh' : '80vh';
            updatedWebPImg.style.objectFit = 'contain';
        };
        
        if (updatedWebPImg.complete && updatedWebPImg.naturalWidth > 0) {
            updateWebPDisplay();
        } else {
            updatedWebPImg.onload = updateWebPDisplay;
        }
        
        // Keep the user's selected quality value, don't revert to algorithm result
        const userSelectedQuality = Math.round(newQuality * 100);
        document.getElementById('modalQualitySlider').value = userSelectedQuality;
        document.getElementById('modalQualityValue').textContent = userSelectedQuality + '%';
        
        // Update the card in the grid
        updateImageCard(currentModalIndex);
        
        // Update batch statistics
        updateBatchStats();
        
        // Show success message with file size info
        const sizeKB = (conversionResult.blob.size / 1024).toFixed(1);
        showNotification(`${imageData.fileName} updated! New size: ${sizeKB}KB`);
        
    } catch (error) {
        console.error('Reconversion error:', error);
        showNotification('Error reconverting image. Please try again.');
    } finally {
        loadingOverlay.style.display = 'none';
        // Re-enable the button
        updateReconvertButtonState(false);
    }
}

function downloadModalImage() {
    if (currentModalIndex === -1) return;
    downloadSingleImage(currentModalIndex);
}

function updateImageCard(index) {
    // Find the card and update its content
    const cards = document.querySelectorAll('.image-card');
    if (cards[index]) {
        // Remove old card
        cards[index].remove();
        
        // Add updated card with new position
        addImageCard(convertedImages[index], index);
        
        // Reorder all cards to maintain proper sequence
        reorderImageCards();
    }
}

// Add visual feedback for button states
function updateReconvertButtonState(isLoading) {
    const reconvertBtn = document.getElementById('modalReconvertBtn');
    if (isLoading) {
        reconvertBtn.disabled = true;
        reconvertBtn.textContent = 'Converting...';
        reconvertBtn.style.opacity = '0.7';
    } else {
        reconvertBtn.disabled = false;
        reconvertBtn.textContent = 'Reconvert';
        reconvertBtn.style.opacity = '1';
    }
}

function reorderImageCards() {
    // Clear the grid and re-add all cards in correct order
    imagesGrid.innerHTML = '';
    convertedImages.forEach((imageData, index) => {
        addImageCard(imageData, index);
    });
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    `;
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;
    `;
    
    // Add hover effect for close button
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = 'transparent';
    });
    
    // Close notification function
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Create content wrapper
    const content = document.createElement('div');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    `;
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    content.appendChild(messageSpan);
    content.appendChild(closeBtn);
    notification.appendChild(content);
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        z-index: 3000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        min-width: 250px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds (increased from 3 to give user more time)
    const autoCloseTimer = setTimeout(() => {
        closeNotification();
    }, 5000);
    
    // Clear auto-close timer if user manually closes
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoCloseTimer);
    });
}