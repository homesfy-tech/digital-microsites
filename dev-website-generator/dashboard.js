// Dashboard JavaScript for Microsite Generator

let selectedTemplate = 'template-1';
let parsedData = null;
let templateContent = null;
let uploadedImages = {}; // Store uploaded images by category
let templatesConfig = {}; // Template configurations
let availableTemplates = []; // List of available templates
let templateDataFields = {}; // Data fields found in each template
let gtmHeadCode = ''; // Store GTM head tag code
let gtmBodyCode = ''; // Store GTM body tag code
let customLocationIframe = ''; // Store custom location iframe/html
let dataFileInfo = null;

/**
 * Sync the optional custom location iframe snippet back into `parsedData`
 * so the generated microsite always reflects the latest embed the user typed.
 */
function syncCustomLocationToParsedData() {
  const trimmedValue = customLocationIframe && customLocationIframe.trim();
  if (!trimmedValue) {
    if (parsedData && parsedData.location_iframe) {
      delete parsedData.location_iframe;
      if (Object.keys(parsedData).length === 0) {
        parsedData = null;
      }
    }
    return;
  }

  if (!parsedData) {
    parsedData = {};
  }
  parsedData.location_iframe = trimmedValue;
}

const uploadedImageDataUrls = {};
const DASHBOARD_STORAGE_KEY = 'micrositeDashboardState_v1';
let pendingRestoredState = null;
let isRestoringState = false;
let saveStateTimeout = null;

if (typeof window !== 'undefined' && window.localStorage) {
    try {
        const storedState = window.localStorage.getItem(DASHBOARD_STORAGE_KEY);
        if (storedState) {
            pendingRestoredState = JSON.parse(storedState);
            if (pendingRestoredState.selectedTemplate) {
                selectedTemplate = pendingRestoredState.selectedTemplate;
            }
            if (pendingRestoredState.parsedData) {
                parsedData = pendingRestoredState.parsedData;
            }
            if (typeof pendingRestoredState.gtmHeadCode === 'string') {
                gtmHeadCode = pendingRestoredState.gtmHeadCode;
            }
            if (typeof pendingRestoredState.gtmBodyCode === 'string') {
                gtmBodyCode = pendingRestoredState.gtmBodyCode;
            }
            if (typeof pendingRestoredState.customLocationIframe === 'string') {
                customLocationIframe = pendingRestoredState.customLocationIframe;
            }
            if (pendingRestoredState.dataFileInfo) {
                dataFileInfo = pendingRestoredState.dataFileInfo;
            }
            if (pendingRestoredState.uploadedImages) {
                Object.assign(uploadedImageDataUrls, pendingRestoredState.uploadedImages);
            }
        }
    } catch (error) {
        console.warn('Failed to parse saved dashboard state:', error);
        pendingRestoredState = null;
    }
}

const MULTI_IMAGE_CATEGORIES = ['banner', 'mobBanner'];
const templateAssetCache = new Map();

function cloneBlob(blob) {
    if (!blob) return null;
    return blob.slice(0, blob.size, blob.type || undefined);
}

async function fetchTemplateAsset(fetchPath) {
    if (!fetchPath) return null;
    if (!templateAssetCache.has(fetchPath)) {
        templateAssetCache.set(fetchPath, (async () => {
            try {
                const response = await fetch(fetchPath);
                if (!response.ok) {
                    console.warn(`[ZIP] Skipping ${fetchPath} (status ${response.status})`);
                    return null;
                }
                return await response.blob();
            } catch (error) {
                console.warn(`[ZIP] Failed to fetch ${fetchPath}:`, error);
                return null;
            }
        })());
    }
    const blob = await templateAssetCache.get(fetchPath);
    return cloneBlob(blob);
}

function getCompressionOptionsForPath(filePath) {
    if (!filePath) return undefined;
    return /\.(webp|png|jpe?g|gif|ico|svg|mp4|webm|woff2?|ttf)$/i.test(filePath)
        ? { compression: 'STORE' }
        : undefined;
}

function resolveTemplateFetchPath(templateBase, relativePath) {
    if (!templateBase || !relativePath) return null;
    let cleanPath = relativePath.replace(/^\/+/, '');
    if (cleanPath.startsWith(templateBase + '/')) {
        return cleanPath;
    }
    return `${templateBase}/${cleanPath}`;
}

/**
 * Debounce persistence to localStorage so we do not thrash the storage
 * API every time a form field changes while the user is editing.
 */
function scheduleStateSave() {
    if (isRestoringState) return;
    if (saveStateTimeout) {
        clearTimeout(saveStateTimeout);
    }
    saveStateTimeout = setTimeout(() => {
        performStateSave();
    }, 200);
}

/**
 * Serialize the dashboard session (selected template, parsed data, GTM,
 * location iframe, file metadata, cached uploads) into localStorage.
 */
function performStateSave() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
        const serializedImages = {};
        Object.keys(uploadedImageDataUrls).forEach(category => {
            const entries = uploadedImageDataUrls[category];
            if (entries && entries.length) {
                serializedImages[category] = entries;
            }
        });

        const state = {
            selectedTemplate,
            parsedData,
            gtmHeadCode,
            gtmBodyCode,
            customLocationIframe,
            dataFileInfo,
            uploadedImages: serializedImages
        };

        window.localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.warn('Failed to save dashboard state:', error);
    }
}

/**
 * Convert an uploaded File object to a base64 data URL so we can preview
 * and persist images without hitting the file system again.
 */
function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

/**
 * Cache selected images in memory (and localStorage) as data URLs. This lets
 * us restore the dashboard state across reloads and show previews instantly.
 */
async function cacheImageDataUrls(category, files) {
    if (isRestoringState) return;
    if (!files) {
        delete uploadedImageDataUrls[category];
        scheduleStateSave();
        return;
    }

    const fileArray = Array.isArray(files) ? files : [files];

    try {
        const results = await Promise.all(fileArray.map(async (file, index) => {
            const dataUrl = await fileToDataUrl(file);
            if (!dataUrl) return null;
            return {
                name: file.name || `${category}-${index + 1}`,
                type: file.type || '',
                dataUrl
            };
        }));

        const filtered = results.filter(Boolean);
        if (filtered.length) {
            uploadedImageDataUrls[category] = filtered;
        } else {
            delete uploadedImageDataUrls[category];
        }
        scheduleStateSave();
    } catch (error) {
        console.warn(`Failed to cache images for ${category}:`, error);
    }
}

/**
 * Remove any previously cached image previews. Called when the user clears
 * uploads so we do not accidentally reuse stale assets.
 */
function clearCachedImages() {
    Object.keys(uploadedImageDataUrls).forEach(key => delete uploadedImageDataUrls[key]);
}

/**
 * Convert a stored data URL back into a File so the rest of the pipeline
 * can treat restored images exactly like freshly uploaded ones.
 */
async function dataUrlToFile(dataUrl, filename, type) {
    if (!dataUrl) return null;
    try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        return new File([blob], filename || 'image.webp', { type: type || blob.type || 'application/octet-stream' });
    } catch (error) {
        console.warn('Failed to convert data URL to file:', error);
        return null;
    }
}

/**
 * Normalize different collection-like inputs into a plain array. Upload UI
 * elements sometimes give us `FileList`, a single `File`, or an array already.
 */
function toArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (value instanceof FileList) return Array.from(value);
    return [value];
}

/**
 * Resolve the destination path (e.g., `assets/images/banner/banner1.webp`)
 * for a given image slot based on the template's mapping configuration.
 */
function getImageTargetPath(mapping, index) {
    if (!mapping) return null;
    const basePath = mapping.paths && mapping.paths[0] ? mapping.paths[0] : '';
    const safeIndex = index >= 0 ? index : 0;

    if (mapping.pattern && basePath) {
        return `${basePath}${mapping.pattern.replace('{index}', safeIndex + 1)}`;
    }

    if (mapping.paths && mapping.paths[safeIndex]) {
        return mapping.paths[safeIndex];
    }

    if (mapping.paths && mapping.paths.length === 1 && basePath) {
        if (basePath.endsWith('/')) {
            return `${basePath}${safeIndex + 1}.webp`;
        }
        const extMatch = basePath.match(/(\.[^./]+)$/);
        const ext = extMatch ? extMatch[1] : '';
        const prefix = extMatch ? basePath.slice(0, -ext.length) : basePath;
        return `${prefix}${safeIndex + 1}${ext}`;
    }

    return basePath || null;
}

function storeDefaultContent(container) {
    if (!container) return;
    if (!container.dataset.defaultContent) {
        container.dataset.defaultContent = container.innerHTML;
    }
}

function rebuildCarouselSlides(container, sources, options = {}) {
    if (!container) return 0;
    storeDefaultContent(container);
    const doc = container.ownerDocument || document;
    const {
        slideClass = '',
        imageWrapperClass = '',
        imageClass = '',
        overlayClass = '',
        overlayText = (index) => `Slide ${index + 1}`,
        altText = (index) => `Slide ${index + 1}`,
        width,
        height,
        sizes,
        loading = 'lazy'
    } = options;

    const restoreDefaults = () => {
        if (container.dataset.defaultContent !== undefined) {
            container.innerHTML = container.dataset.defaultContent;
            const slides = Array.from(container.querySelectorAll(`.${slideClass}`));
            slides.forEach((slide, idx) => slide.setAttribute('data-index', String(idx + 1)));
            return slides.length;
        }
        return 0;
    };

    if (!sources || !sources.length) {
        return restoreDefaults();
    }

    container.innerHTML = '';
    sources.forEach((src, idx) => {
        if (!src) return;
        const slide = doc.createElement('div');
        if (slideClass) slide.className = slideClass;
        slide.setAttribute('data-index', String(idx + 1));

        const wrapper = imageWrapperClass ? doc.createElement('div') : slide;
        if (imageWrapperClass) {
            wrapper.className = imageWrapperClass;
        }

        const img = doc.createElement('img');
        if (imageClass) img.className = imageClass;
        img.src = src;
        img.alt = altText(idx, src);
        img.setAttribute('loading', loading);
        if (width) img.setAttribute('width', width);
        if (height) img.setAttribute('height', height);
        if (sizes) img.setAttribute('sizes', sizes);
        
        // Add data-field attribute based on container context
        const containerId = container.id || '';
        const containerClass = container.className || '';
        if (containerId.includes('amenities') || containerClass.includes('amenities')) {
            img.setAttribute('data-field', 'amenities');
        } else if (containerId.includes('gallery') || containerClass.includes('gallery')) {
            img.setAttribute('data-field', 'gallery');
        }
        
        wrapper.appendChild(img);

        if (imageWrapperClass) {
            slide.appendChild(wrapper);
        }

        if (overlayClass) {
            const overlay = doc.createElement('div');
            overlay.className = overlayClass;
            overlay.textContent = overlayText(idx, src);
            slide.appendChild(overlay);
        }

        container.appendChild(slide);
    });

    return sources.length;
}

function setElementsVisibility(doc, selectors, visible) {
    selectors.forEach((selector) => {
        if (!selector) return;
        const el = doc.querySelector(selector);
        if (!el) return;
        el.style.display = visible ? '' : 'none';
    });
}

function updateCounterText(doc, selector, count) {
    if (!selector) return;
    const el = doc.querySelector(selector);
    if (!el) return;
    const total = count > 0 ? count : 0;
    el.textContent = total > 0 ? `1 / ${total}` : '0 / 0';
}

function applyBannerSlides(doc, desktopSources = [], mobileSources = []) {
    // Support multiple banner containers across templates
    const slidesContainer = doc.getElementById('bannerSlides') || 
                           doc.querySelector('.carouselBannerTrack') ||
                           doc.querySelector('.bannerSlidesContainer');
    if (!slidesContainer) return;

    // Detect template-3 style carousel
    const isTemplate3Carousel = slidesContainer.classList && slidesContainer.classList.contains('carouselBannerTrack');
    
    // Detect template-4 style carousel (bannerImageSection with bannerImageContainer structure)
    const isTemplate4Carousel = slidesContainer.classList && slidesContainer.classList.contains('bannerImageSection');
    
    // Detect template-5 style carousel (bannerSlidesContainer with bannerCarouselSlide structure)
    const isTemplate5Carousel = slidesContainer.classList && slidesContainer.classList.contains('bannerSlidesContainer');

    const defaultDesktop = slidesContainer.getAttribute('data-default-desktop') || '';
    const defaultMobile = slidesContainer.getAttribute('data-default-mobile') || '';

    const desktopList = (desktopSources || []).filter(Boolean);
    const mobileList = (mobileSources || []).filter(Boolean);

    const totalSlides = Math.max(desktopList.length, mobileList.length, 1);
    const fallbackDesktop = desktopList[0] || defaultDesktop;
    const fallbackMobile = mobileList[0] || defaultMobile || desktopList[0] || fallbackDesktop;

    // For template-4, remove only slides, preserve navigation buttons and dots
    if (isTemplate4Carousel) {
        const slides = slidesContainer.querySelectorAll('.bannerSlide, .bannerImageContainer');
        slides.forEach(slide => slide.remove());
    } else if (isTemplate5Carousel) {
        // For template-5, remove only slides, preserve navigation elements
        const slides = slidesContainer.querySelectorAll('.bannerCarouselSlide');
        slides.forEach(slide => slide.remove());
    } else {
        slidesContainer.innerHTML = '';
    }

    for (let i = 0; i < totalSlides; i++) {
        const desktopSrc = desktopList[i] || fallbackDesktop;
        const mobileSrc = mobileList[i] || fallbackMobile;

        if (isTemplate3Carousel) {
            const slide = doc.createElement('div');
            slide.className = 'carouselBannerItem';

            const picture = doc.createElement('picture');

            const sourceMob = doc.createElement('source');
            sourceMob.setAttribute('media', '(max-width: 600px)');
            sourceMob.setAttribute('srcset', mobileSrc || desktopSrc);
            sourceMob.setAttribute('data-field', 'mobBanner');
            picture.appendChild(sourceMob);

            const sourceDesktop = doc.createElement('source');
            sourceDesktop.setAttribute('media', '(min-width: 601px)');
            sourceDesktop.setAttribute('srcset', desktopSrc || mobileSrc);
            sourceDesktop.setAttribute('data-field', 'banner');
            picture.appendChild(sourceDesktop);

            const img = doc.createElement('img');
            img.setAttribute('src', desktopSrc || mobileSrc);
            img.setAttribute('alt', 'Banner');
            img.setAttribute('data-field', 'banner');
            img.setAttribute('loading', i === 0 ? 'eager' : 'lazy');
            img.setAttribute('decoding', 'async');
            img.style.width = '100%';
            img.style.height = 'auto';
            picture.appendChild(img);

            slide.appendChild(picture);
            slidesContainer.appendChild(slide);
        } else if (isTemplate4Carousel) {
            // Template-4 structure: bannerImageContainer.bannerSlide
            const slide = doc.createElement('div');
            slide.className = 'bannerImageContainer bannerSlide';
            if (i === 0) {
                slide.classList.add('is-active');
            }

            const picture = doc.createElement('picture');

            const sourceMob = doc.createElement('source');
            sourceMob.setAttribute('media', '(max-width: 768px)');
            sourceMob.setAttribute('srcset', mobileSrc || desktopSrc);
            sourceMob.setAttribute('data-field', 'mobBanner');
            picture.appendChild(sourceMob);

            const sourceDesktop = doc.createElement('source');
            sourceDesktop.setAttribute('media', '(min-width: 769px)');
            sourceDesktop.setAttribute('srcset', desktopSrc || mobileSrc);
            sourceDesktop.setAttribute('data-field', 'banner');
            picture.appendChild(sourceDesktop);

            const img = doc.createElement('img');
            img.className = 'bannerPropertyImage';
            img.setAttribute('src', desktopSrc || mobileSrc);
            img.setAttribute('alt', 'Banner');
            img.setAttribute('data-field', 'banner');
            img.setAttribute('loading', i === 0 ? 'eager' : 'lazy');
            img.setAttribute('decoding', 'async');
            img.setAttribute('width', '900');
            img.setAttribute('height', '1125');
            img.setAttribute('sizes', '(max-width: 768px) 100vw, 75vw');
            picture.appendChild(img);

            slide.appendChild(picture);
            
            // Insert slides before navigation buttons (bannerPrev, bannerNext, bannerDots)
            const firstNav = slidesContainer.querySelector('#bannerPrev, #bannerNext, #bannerDots');
            if (firstNav) {
                slidesContainer.insertBefore(slide, firstNav);
            } else {
                slidesContainer.appendChild(slide);
            }
        } else if (isTemplate5Carousel) {
            // Template-5 structure: bannerCarouselSlide
            const slide = doc.createElement('div');
            slide.className = 'bannerCarouselSlide';

            const picture = doc.createElement('picture');

            const sourceMob = doc.createElement('source');
            sourceMob.setAttribute('media', '(max-width: 768px)');
            sourceMob.setAttribute('srcset', mobileSrc || desktopSrc);
            sourceMob.className = 'bannerPropertyImage';
            sourceMob.setAttribute('data-field', 'mobBanner');
            picture.appendChild(sourceMob);

            const img = doc.createElement('img');
            img.className = 'bannerPropertyImage';
            img.setAttribute('src', desktopSrc || mobileSrc);
            img.setAttribute('alt', 'Banner');
            img.setAttribute('data-field', 'banner');
            img.setAttribute('width', '1280');
            img.setAttribute('height', '720');
            img.setAttribute('loading', i === 0 ? 'eager' : 'lazy');
            img.setAttribute('decoding', 'async');
            if (i === 0) {
                img.setAttribute('fetchpriority', 'high');
            }
            picture.appendChild(img);

            slide.appendChild(picture);
            slidesContainer.appendChild(slide);
        } else {
            const slide = doc.createElement('div');
            slide.className = 'bannerSlide';

            const picture = doc.createElement('picture');

            const sourceMob = doc.createElement('source');
            sourceMob.setAttribute('media', '(max-width: 768px)');
            sourceMob.setAttribute('srcset', mobileSrc || desktopSrc);
            sourceMob.setAttribute('data-field', 'mobBanner');
            picture.appendChild(sourceMob);

            const sourceDesktop = doc.createElement('source');
            sourceDesktop.setAttribute('media', '(min-width: 769px)');
            sourceDesktop.setAttribute('srcset', desktopSrc || mobileSrc);
            sourceDesktop.setAttribute('data-field', 'banner');
            picture.appendChild(sourceDesktop);

            const img = doc.createElement('img');
            img.setAttribute('src', desktopSrc || mobileSrc);
            img.setAttribute('alt', 'Banner');
            img.setAttribute('data-field', 'banner');
            img.setAttribute('loading', i === 0 ? 'eager' : 'lazy');
            img.setAttribute('decoding', 'async');
            picture.appendChild(img);

            slide.appendChild(picture);
            slidesContainer.appendChild(slide);
        }
    }

    // For template-3 carousel: inject prev/next buttons only when multiple slides
    if (isTemplate3Carousel) {
        const container = slidesContainer.closest('.carouselBannerContainer') || doc.querySelector('.carouselBannerContainer');
        if (container) {
            // Remove any existing controls wrapper we may have previously injected
            const existingWrapper = container.querySelector('.carouselBannerButtons');
            if (existingWrapper) existingWrapper.remove();

            if (totalSlides > 1) {
                // Create wrapper so CSS centers buttons vertically over the image
                const controlsWrapper = doc.createElement('div');
                controlsWrapper.className = 'carouselBannerButtons';

                const prevBtn = doc.createElement('button');
                prevBtn.className = 'carouselBannerButton prev';
                prevBtn.setAttribute('aria-label', 'Previous slide');
                prevBtn.textContent = '❮';

                const nextBtn = doc.createElement('button');
                nextBtn.className = 'carouselBannerButton next';
                nextBtn.setAttribute('aria-label', 'Next slide');
                nextBtn.textContent = '❯';

                controlsWrapper.appendChild(prevBtn);
                controlsWrapper.appendChild(nextBtn);
                container.appendChild(controlsWrapper);
            }
        }
    }
    
    // For template-4 carousel: show/hide navigation buttons and dots based on slide count
    if (isTemplate4Carousel) {
        const prevBtn = doc.getElementById('bannerPrev');
        const nextBtn = doc.getElementById('bannerNext');
        const dotsContainer = doc.getElementById('bannerDots');
        
        if (totalSlides > 1) {
            // Show navigation buttons
            if (prevBtn) {
                prevBtn.style.display = 'flex';
            }
            if (nextBtn) {
                nextBtn.style.display = 'flex';
            }
            
            // Create/update dots
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                dotsContainer.classList.add('has-multiple');
                for (let i = 0; i < totalSlides; i++) {
                    const dot = doc.createElement('button');
                    dot.type = 'button';
                    dot.className = 'bannerDot';
                    if (i === 0) {
                        dot.classList.add('active');
                    }
                    dot.setAttribute('data-slide', i.toString());
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    dotsContainer.appendChild(dot);
                }
            }
        } else {
            // Hide navigation buttons for single slide
            if (prevBtn) {
                prevBtn.style.display = 'none';
            }
            if (nextBtn) {
                nextBtn.style.display = 'none';
            }
            if (dotsContainer) {
                dotsContainer.classList.remove('has-multiple');
                dotsContainer.innerHTML = '';
            }
        }
    }
    
    // For template-5 carousel: show/hide navigation buttons and indicators based on slide count
    if (isTemplate5Carousel) {
        const bannerSection = slidesContainer.closest('.bannerImageSection');
        if (bannerSection) {
            let prevBtn = bannerSection.querySelector('.bannerPrevButton, .bannerNavButton.bannerPrevButton');
            let nextBtn = bannerSection.querySelector('.bannerNextButton, .bannerNavButton.bannerNextButton');
            let indicatorContainer = bannerSection.querySelector('.bannerIndicatorContainer');
            
            if (totalSlides > 1) {
                // Create navigation buttons if they don't exist
                if (!prevBtn) {
                    prevBtn = doc.createElement('button');
                    prevBtn.className = 'bannerNavButton bannerPrevButton';
                    prevBtn.innerHTML = '&#10094;';
                    prevBtn.setAttribute('aria-label', 'Previous banner image');
                    bannerSection.appendChild(prevBtn);
                }
                if (prevBtn) {
                    prevBtn.style.display = 'flex';
                }
                
                if (!nextBtn) {
                    nextBtn = doc.createElement('button');
                    nextBtn.className = 'bannerNavButton bannerNextButton';
                    nextBtn.innerHTML = '&#10095;';
                    nextBtn.setAttribute('aria-label', 'Next banner image');
                    bannerSection.appendChild(nextBtn);
                }
                if (nextBtn) {
                    nextBtn.style.display = 'flex';
                }
                
                // Create/update indicators
                if (!indicatorContainer) {
                    indicatorContainer = doc.createElement('div');
                    indicatorContainer.className = 'bannerIndicatorContainer';
                    bannerSection.appendChild(indicatorContainer);
                }
                if (indicatorContainer) {
                    indicatorContainer.innerHTML = '';
                    for (let i = 0; i < totalSlides; i++) {
                        const indicator = doc.createElement('span');
                        indicator.className = 'bannerIndicator';
                        if (i === 0) {
                            indicator.classList.add('active');
                        }
                        indicator.setAttribute('data-index', i.toString());
                        indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
                        indicatorContainer.appendChild(indicator);
                    }
                }
            } else {
                // Hide navigation buttons for single slide
                if (prevBtn) {
                    prevBtn.style.display = 'none';
                }
                if (nextBtn) {
                    nextBtn.style.display = 'none';
                }
                if (indicatorContainer) {
                    indicatorContainer.innerHTML = '';
                }
            }
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const previewSection = document.getElementById('previewSection');
    const dataPreviewBody = document.getElementById('dataPreviewBody');
    const generateBtn = document.getElementById('generateBtn');
    const previewBtn = document.getElementById('previewBtn');
    const statusMessage = document.getElementById('statusMessage');
    const loading = document.getElementById('loading');

    // File upload handling
    fileUploadArea.addEventListener('click', () => fileInput.click());
    
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.classList.add('dragover');
    });
    
    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.classList.remove('dragover');
    });
    
    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Google Docs URL support
    const googleDocsUrlInput = document.getElementById('googleDocsUrl');
    const loadGoogleDocBtn = document.getElementById('loadGoogleDocBtn');
    const clearDashboardBtn = document.getElementById('clearDashboardBtn');

    function updateFileInfoDisplay() {
        if (!fileInfo || !fileName || !fileSize) return;
        if (dataFileInfo) {
            fileInfo.classList.add('active');
            fileName.textContent = dataFileInfo.name || 'Data File';
            if (dataFileInfo.source === 'google-doc' && dataFileInfo.url) {
                const urlDisplay = dataFileInfo.url.length > 50 ? dataFileInfo.url.substring(0, 50) + '...' : dataFileInfo.url;
                fileSize.textContent = ` (${urlDisplay})`;
            } else if (typeof dataFileInfo.size === 'number') {
                fileSize.textContent = ` (${formatFileSize(dataFileInfo.size)})`;
            } else {
                fileSize.textContent = '';
            }
        } else {
            fileInfo.classList.remove('active');
            fileName.textContent = '';
            fileSize.textContent = '';
        }

        if (googleDocsUrlInput && (!dataFileInfo || dataFileInfo.source !== 'google-doc')) {
            googleDocsUrlInput.value = '';
        }
    }

    async function restoreUploadedImagesFromCache(savedMap) {
        if (!savedMap) return;
        clearCachedImages();
        const categories = Object.keys(savedMap);
        for (const category of categories) {
            const entries = savedMap[category];
            if (!entries || !entries.length) continue;

            const box = document.querySelector(`.image-upload-box[data-category="${category}"]`);
            if (!box) continue;

            const preview = box.querySelector('.image-preview');
            const removeBtn = box.querySelector('.image-remove');
            const isMultiple = box.dataset.multiple === 'true';
            const files = [];

            for (let index = 0; index < entries.length; index++) {
                const entry = entries[index];
                const file = await dataUrlToFile(entry.dataUrl, entry.name || `${category}-${index + 1}`, entry.type || 'image/webp');
                if (file) {
                    files.push(file);
                }
            }

            if (!files.length) continue;

            if (isMultiple) {
                uploadedImages[category] = files;
                if (preview) {
                    displayMultipleImages(preview, files);
                }
            } else {
                uploadedImages[category] = files[0];
                if (preview) {
                    displaySingleImage(preview, files[0]);
                }
            }

            box.classList.add('has-image');
            if (removeBtn) removeBtn.style.display = 'block';
            uploadedImageDataUrls[category] = entries;
        }
    }

    async function loadSavedState() {
        if (!pendingRestoredState) return;
        isRestoringState = true;
        try {
            if (pendingRestoredState.dataFileInfo) {
                dataFileInfo = pendingRestoredState.dataFileInfo;
            }
            updateFileInfoDisplay();

            if (pendingRestoredState.parsedData) {
                parsedData = pendingRestoredState.parsedData;
                displayDataPreview(parsedData);
                previewSection.classList.add('active');
                generateBtn.disabled = false;
                previewBtn.disabled = false;
            }

            if (pendingRestoredState.gtmHeadCode && gtmHeadInput) {
                gtmHeadCode = pendingRestoredState.gtmHeadCode;
                gtmHeadInput.value = gtmHeadCode;
            }
            if (pendingRestoredState.gtmBodyCode && gtmBodyInput) {
                gtmBodyCode = pendingRestoredState.gtmBodyCode;
                gtmBodyInput.value = gtmBodyCode;
            }
            if (typeof pendingRestoredState.customLocationIframe === 'string' && locationIframeInput) {
                customLocationIframe = pendingRestoredState.customLocationIframe;
                locationIframeInput.value = customLocationIframe;
            }
            if (googleDocsUrlInput && dataFileInfo && dataFileInfo.source === 'google-doc' && dataFileInfo.url) {
                googleDocsUrlInput.value = dataFileInfo.url;
            }

            syncCustomLocationToParsedData();

            if (pendingRestoredState.uploadedImages) {
                await restoreUploadedImagesFromCache(pendingRestoredState.uploadedImages);
            }

            if (selectedTemplate && availableTemplates.includes(selectedTemplate)) {
                const activeOption = document.querySelector(`.template-option[data-template="${selectedTemplate}"]`);
                if (activeOption) {
                    document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('active'));
                    activeOption.classList.add('active');
                }
            } else if (availableTemplates.length) {
                selectedTemplate = availableTemplates[0];
                const fallbackOption = document.querySelector(`.template-option[data-template="${selectedTemplate}"]`);
                if (fallbackOption) {
                    document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('active'));
                    fallbackOption.classList.add('active');
                }
            }
        } catch (error) {
            console.warn('Failed to restore dashboard state:', error);
        } finally {
            isRestoringState = false;
            pendingRestoredState = null;
            scheduleStateSave();
        }
    }

    function resetDashboardState() {
        if (saveStateTimeout) {
            clearTimeout(saveStateTimeout);
            saveStateTimeout = null;
        }
        isRestoringState = true;
        try {
            parsedData = null;
            templateContent = null;
            uploadedImages = {};
            clearCachedImages();
            templateAssetCache.clear();
            dataFileInfo = null;
            customLocationIframe = '';
            syncCustomLocationToParsedData();
            gtmHeadCode = '';
            gtmBodyCode = '';

            if (fileInput) fileInput.value = '';
            if (googleDocsUrlInput) googleDocsUrlInput.value = '';
            if (gtmHeadInput) gtmHeadInput.value = '';
            if (gtmBodyInput) gtmBodyInput.value = '';
            if (locationIframeInput) locationIframeInput.value = '';

            updateFileInfoDisplay();

            if (dataPreviewBody) dataPreviewBody.innerHTML = '';
            if (previewSection) previewSection.classList.remove('active');
            if (generateBtn) generateBtn.disabled = true;
            if (previewBtn) previewBtn.disabled = true;

            document.querySelectorAll('.image-upload-box').forEach(box => {
                const preview = box.querySelector('.image-preview');
                const removeBtn = box.querySelector('.image-remove');
                const input = box.querySelector('input[type="file"]');
                if (preview) {
                    preview.innerHTML = '';
                    preview.classList.remove('active');
                }
                if (removeBtn) removeBtn.style.display = 'none';
                if (input) input.value = '';
                box.classList.remove('has-image');
            });

            if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.removeItem(DASHBOARD_STORAGE_KEY);
            }
        } finally {
            isRestoringState = false;
        }
        pendingRestoredState = null;
        showStatus('Dashboard data cleared.', 'success');
        setTimeout(() => hideStatus(), 2000);
        scheduleStateSave();
    }

    if (clearDashboardBtn) {
        clearDashboardBtn.addEventListener('click', () => {
            if (confirm('This will remove all uploaded data, images, and settings. Continue?')) {
                resetDashboardState();
            }
        });
    }

    if (loadGoogleDocBtn && googleDocsUrlInput) {
        async function handleGoogleDocUrl() {
            const url = googleDocsUrlInput.value.trim();
            if (!url) {
                showStatus('Please enter a Google Docs URL', 'error');
                return;
            }
            
            if (!url.includes('docs.google.com/document')) {
                showStatus('Invalid Google Docs URL. Please paste the full URL from your browser.', 'error');
                return;
            }
            
            showLoading(true);
            hideStatus();
            
            try {
                const data = await fetchGoogleDoc(url);
                
                // Update UI (same as handleFile)
                fileName.textContent = 'Google Doc';
                const urlDisplay = url.length > 50 ? url.substring(0, 50) + '...' : url;
                fileSize.textContent = ` (${urlDisplay})`;
                fileInfo.classList.add('active');
                
                // Before setting parsedData, check data-field mapping
                const confirmed = await confirmDataFieldMapping(data);
                if (!confirmed) {
                    showLoading(false);
                    return;
                }
                
                parsedData = data;
                dataFileInfo = {
                    name: 'Google Doc',
                    source: 'google-doc',
                    url
                };
                const docLocationIframe = data.location_iframe && data.location_iframe.trim();
                if (docLocationIframe) {
                    customLocationIframe = docLocationIframe;
                    if (locationIframeInput) {
                        locationIframeInput.value = customLocationIframe;
                    }
                } else if (locationIframeInput && !customLocationIframe) {
                    locationIframeInput.value = '';
                }
                syncCustomLocationToParsedData();
                updateFileInfoDisplay();
                
                if (googleDocsUrlInput) {
                    googleDocsUrlInput.value = url;
                }
                displayDataPreview(data);
                previewSection.classList.add('active');
                generateBtn.disabled = false;
                previewBtn.disabled = false;
                
                showStatus('Google Doc loaded successfully!', 'success');
                setTimeout(() => hideStatus(), 2000);
                scheduleStateSave();
            } catch (error) {
                showStatus(error.message, 'error');
                updateFileInfoDisplay();
            } finally {
                showLoading(false);
            }
        }
        
        loadGoogleDocBtn.addEventListener('click', handleGoogleDocUrl);
        
        // Also allow Enter key to submit
        googleDocsUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleGoogleDocUrl();
            }
        });
        
        // Auto-detect when URL is pasted
        googleDocsUrlInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                const pastedUrl = googleDocsUrlInput.value.trim();
                if (pastedUrl.includes('docs.google.com/document')) {
                    // Auto-load after paste (small delay for better UX)
                    setTimeout(() => handleGoogleDocUrl(), 500);
                }
            }, 100);
        });
    }

    // Google Tag Manager code handling
    const gtmHeadInput = document.getElementById('gtmHeadCode');
    const gtmBodyInput = document.getElementById('gtmBodyCode');
    const locationIframeInput = document.getElementById('locationIframeInput');

    if (gtmHeadInput) {
        gtmHeadInput.addEventListener('input', (e) => {
            gtmHeadCode = e.target.value.trim();
            scheduleStateSave();
        });
    }

    if (gtmBodyInput) {
        gtmBodyInput.addEventListener('input', (e) => {
            gtmBodyCode = e.target.value.trim();
            scheduleStateSave();
        });
    }

    if (locationIframeInput) {
        locationIframeInput.addEventListener('input', (e) => {
            customLocationIframe = e.target.value.trim();
            syncCustomLocationToParsedData();
            scheduleStateSave();
        });
    }

    // Initialize templates on page load (will be called after function is defined)
    // Moved to end of DOMContentLoaded to ensure function is defined

    // Image upload handling
    document.querySelectorAll('.image-upload-box').forEach(box => {
        const input = box.querySelector('input[type="file"]');
        const preview = box.querySelector('.image-preview');
        const removeBtn = box.querySelector('.image-remove');
        const category = box.dataset.category;
        const pattern = box.dataset.pattern;
        const isMultiple = box.dataset.multiple === 'true';
        
        box.addEventListener('click', (e) => {
            if (e.target !== removeBtn && !e.target.closest('.image-remove')) {
                input.click();
            }
        });
        
        input.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length === 0) return;
            
            if (isMultiple) {
                uploadedImages[category] = files;
                displayMultipleImages(preview, files);
                cacheImageDataUrls(category, files);
            } else {
                uploadedImages[category] = files[0];
                displaySingleImage(preview, files[0]);
                cacheImageDataUrls(category, files[0]);
            }
            
            box.classList.add('has-image');
            removeBtn.style.display = 'block';
        });
        
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            delete uploadedImages[category];
            preview.innerHTML = '';
            preview.classList.remove('active');
            box.classList.remove('has-image');
            removeBtn.style.display = 'none';
            input.value = '';
            cacheImageDataUrls(category, null);
        });
    });

    function displaySingleImage(preview, file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            preview.classList.add('active');
        };
        reader.readAsDataURL(file);
    }

    function displayMultipleImages(preview, files) {
        preview.innerHTML = '<div class="image-preview-multiple"></div>';
        const container = preview.querySelector('.image-preview-multiple');
        
        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = `Preview ${index + 1}`;
                container.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
        
        preview.classList.add('active');
    }

    async function handleFile(file) {
        fileName.textContent = file.name;
        fileSize.textContent = ` (${formatFileSize(file.size)})`;
        fileInfo.classList.add('active');
        if (googleDocsUrlInput) {
            googleDocsUrlInput.value = '';
        }
        
        showLoading(true);
        hideStatus();
        
        try {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            let data = null;
            
            if (fileExtension === 'csv' || fileExtension === 'tsv') {
                data = await parseCSV(file, fileExtension);
            } else if (fileExtension === 'html') {
                data = await parseHTML(file);
            } else if (fileExtension === 'docx') {
                data = await parseDOCX(file);
            } else if (fileExtension === 'doc') {
                alert('Old .doc format is not supported. Please save your Google Doc as .docx format (File > Download > Microsoft Word (.docx))');
                updateFileInfoDisplay();
                return;
            } else {
                throw new Error('Unsupported file format. Supported: CSV, TSV, HTML, or DOCX');
            }
            
            // Before setting parsedData, check data-field mapping
            const confirmed = await confirmDataFieldMapping(data);
            if (!confirmed) {
                updateFileInfoDisplay();
                return;
            }
            
            parsedData = data;
            dataFileInfo = {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                source: 'upload'
            };

            const fileLocationIframe = data.location_iframe && data.location_iframe.trim();
            if (fileLocationIframe) {
                customLocationIframe = fileLocationIframe;
                if (locationIframeInput) {
                    locationIframeInput.value = customLocationIframe;
                }
            } else if (locationIframeInput && !customLocationIframe) {
                locationIframeInput.value = '';
            }
            syncCustomLocationToParsedData();
            updateFileInfoDisplay();
            
            displayDataPreview(data);
            previewSection.classList.add('active');
            generateBtn.disabled = false;
            previewBtn.disabled = false;
            showStatus('Data file loaded successfully!', 'success');
            setTimeout(() => hideStatus(), 2000);
            scheduleStateSave();
            
        } catch (error) {
            showStatus('Error parsing file: ' + error.message, 'error');
            updateFileInfoDisplay();
        } finally {
            showLoading(false);
        }
    }

    async function confirmDataFieldMapping(data) {
        // Load template to get data-field attributes
        const config = templatesConfig[selectedTemplate];
        if (!config) return true;
        
        try {
            const response = await fetch(config.htmlPath);
            if (!response.ok) return true;
            const html = await response.text();
            
            // Extract all data-field attributes from template
            const dataFieldRegex = /data-field=["']([^"']+)["']/gi;
            const templateFields = new Set();
            let match;
            while ((match = dataFieldRegex.exec(html)) !== null) {
                templateFields.add(match[1]);
            }
            
            // Check which data fields from uploaded file match template
            const dataFields = Object.keys(data);
            const matchedFields = dataFields.filter(field => templateFields.has(field));
            const unmatchedFields = dataFields.filter(field => !templateFields.has(field));
            const missingTemplateFields = Array.from(templateFields).filter(field => !dataFields.includes(field));
            
            // Show confirmation dialog
            return new Promise((resolve) => {
                const modal = document.createElement('div');
                modal.className = 'confirmation-modal';
                modal.innerHTML = `
                    <div class="confirmation-content">
                        <h3>Data Field Mapping Confirmation</h3>
                        <p>Template: <strong>${config.name}</strong></p>
                        
                        <div class="field-status">
                            <div class="status-group matched">
                                <h4>✓ Matched Fields (${matchedFields.length})</h4>
                                <div class="field-list">${matchedFields.slice(0, 10).map(f => `<span>${f}</span>`).join('')}${matchedFields.length > 10 ? ` <span>+${matchedFields.length - 10} more</span>` : ''}</div>
                            </div>
                            
                            ${unmatchedFields.length > 0 ? `
                            <div class="status-group unmatched">
                                <h4>⚠ Unmatched Fields (${unmatchedFields.length})</h4>
                                <p>These fields in your data file don't exist in the template:</p>
                                <div class="field-list">${unmatchedFields.slice(0, 10).map(f => `<span>${f}</span>`).join('')}${unmatchedFields.length > 10 ? ` <span>+${unmatchedFields.length - 10} more</span>` : ''}</div>
                            </div>
                            ` : ''}
                            
                            ${missingTemplateFields.length > 0 ? `
                            <div class="status-group missing">
                                <h4>ℹ Template Fields Not in Data (${missingTemplateFields.length})</h4>
                                <p>These template fields don't have data:</p>
                                <div class="field-list">${missingTemplateFields.slice(0, 10).map(f => `<span>${f}</span>`).join('')}${missingTemplateFields.length > 10 ? ` <span>+${missingTemplateFields.length - 10} more</span>` : ''}</div>
                            </div>
                            ` : ''}
                        </div>
                        
                        <div class="confirmation-buttons">
                            <button class="btn btn-secondary" id="cancelBtn">Cancel</button>
                            <button class="btn" id="confirmBtn">Yes, Proceed</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
                
                // Prevent clicks inside the content from closing the modal
                const content = modal.querySelector('.confirmation-content');
                if (content) {
                    content.addEventListener('click', (e) => {
                        e.stopPropagation();
                    });
                }
                
                // Handle button clicks
                const confirmBtn = modal.querySelector('#confirmBtn');
                const cancelBtn = modal.querySelector('#cancelBtn');
                
                if (confirmBtn) {
                    confirmBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (modal.parentNode) {
                    document.body.removeChild(modal);
                        }
                    resolve(true);
                });
                }
                
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (modal.parentNode) {
                    document.body.removeChild(modal);
                        }
                    resolve(false);
                });
                }
                
                // Close modal when clicking outside (on backdrop)
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        if (modal.parentNode) {
                            document.body.removeChild(modal);
                        }
                        resolve(false);
                    }
                });
                
                // Close modal on Escape key
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        if (modal.parentNode) {
                            document.body.removeChild(modal);
                        }
                        document.removeEventListener('keydown', handleEscape);
                        resolve(false);
                    }
                };
                document.addEventListener('keydown', handleEscape);
            });
        } catch (error) {
            console.warn('Could not verify data fields:', error);
            return true; // Continue anyway if we can't verify
        }
    }

    function displayDataPreview(data) {
        dataPreviewBody.innerHTML = '';
        Object.keys(data).forEach(key => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${escapeHtml(key)}</strong></td>
                <td>${escapeHtml(data[key])}</td>
            `;
            dataPreviewBody.appendChild(row);
        });
    }

    /**
     * Parse flat CSV/TSV exports from Google Sheets into a key/value object
     * keyed by header name so downstream template replacement is simple.
     */
    async function parseCSV(file, type) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target.result;
                    const delimiter = type === 'tsv' ? '\t' : ',';
                    const lines = text.split(/\r?\n/).filter(line => line.trim());
                    
                    if (lines.length < 2) {
                        throw new Error('File must have at least 2 rows (header + data)');
                    }
                    
                    const data = {};
                    const headers = lines[0].split(delimiter).map(h => h.trim());
                    
                    // Assuming single row of data (or take first data row)
                    for (let i = 1; i < lines.length; i++) {
                        const values = lines[i].split(delimiter).map(v => v.trim());
                        headers.forEach((header, index) => {
                            if (values[index]) {
                                data[header] = values[index];
                            }
                        });
                    }
                    
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    /**
     * Read an HTML file that contains a two-column table of field names/content
     * and turn it into the same key/value structure used across the app.
     */
    async function parseHTML(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(e.target.result, 'text/html');
                    const tables = doc.querySelectorAll('table');
                    
                    if (tables.length === 0) {
                        throw new Error('No table found in HTML file');
                    }
                    
                    const data = {};
                    const table = tables[0];
                    const rows = table.querySelectorAll('tr');
                    
                    // Skip header row if present
                    let isFirstRow = true;
                    rows.forEach(row => {
                        const cells = row.querySelectorAll('td, th');
                        if (cells.length >= 2) {
                            const fieldName = cells[0].textContent.trim();
                            const content = cells[1].textContent.trim();
                            
                            // Skip header row (usually contains "Field Name" and "Content")
                            if (isFirstRow && (fieldName.toLowerCase().includes('field') || fieldName.toLowerCase().includes('name'))) {
                                isFirstRow = false;
                                return;
                            }
                            isFirstRow = false;
                            
                            if (fieldName && content) {
                                data[fieldName] = content;
                            }
                        }
                    });
                    
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    /**
     * Leverage mammoth.js to convert the Google Docs download into HTML, then
     * reuse the table parser so DOCX uploads behave like CSV/HTML sources.
     */
    async function parseDOCX(file) {
        return new Promise((resolve, reject) => {
            // Check if mammoth is available
            if (typeof mammoth === 'undefined') {
                reject(new Error('mammoth.js library not loaded. Please refresh the page.'));
                return;
            }
            
            // Validate file type
            if (!file.name.toLowerCase().endsWith('.docx')) {
                reject(new Error('Invalid file type. Please upload a .docx file.'));
                return;
            }
            
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    
                    // Validate arrayBuffer
                    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                        throw new Error('File appears to be empty or corrupted.');
                    }
                    
                    // Validate DOCX file signature (ZIP file header)
                    const uint8Array = new Uint8Array(arrayBuffer);
                    // DOCX files start with ZIP signature: 50 4B 03 04 (PK\x03\x04)
                    if (uint8Array.length < 4 || uint8Array[0] !== 0x50 || uint8Array[1] !== 0x4B) {
                        throw new Error('Invalid DOCX file format. The file does not appear to be a valid .docx file. Please ensure you downloaded it correctly from Google Docs.');
                    }
                    
                    // Convert DOCX to HTML using mammoth
                    // Use arrayBuffer option (mammoth accepts both arrayBuffer and buffer)
                    const result = await mammoth.convertToHtml({ 
                        arrayBuffer: arrayBuffer 
                    });
                    
                    const html = result.value;
                    const messages = result.messages || [];
                    
                    // Log any warnings from mammoth
                    if (messages.length > 0) {
                        console.warn('Mammoth warnings:', messages);
                    }
                    
                    // Parse the HTML to extract table data (same as parseHTML)
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const tables = doc.querySelectorAll('table');
                    
                    if (tables.length === 0) {
                        throw new Error('No table found in DOCX file. Please ensure your Google Doc has a table with Field Name and Content columns.');
                    }
                    
                    const data = {};
                    const table = tables[0];
                    const rows = table.querySelectorAll('tr');
                    
                    // Skip header row if present
                    let isFirstRow = true;
                    rows.forEach(row => {
                        const cells = row.querySelectorAll('td, th');
                        if (cells.length >= 2) {
                            const fieldName = cells[0].textContent.trim();
                            const content = cells[1].textContent.trim();
                            
                            // Skip header row (usually contains "Field Name" and "Content")
                            if (isFirstRow && (fieldName.toLowerCase().includes('field') || fieldName.toLowerCase().includes('name'))) {
                                isFirstRow = false;
                                return;
                            }
                            isFirstRow = false;
                            
                            if (fieldName && content) {
                                data[fieldName] = content;
                            }
                        }
                    });
                    
                    resolve(data);
                } catch (error) {
                    console.error('Error parsing DOCX:', error);
                    // Provide more helpful error messages
                    if (error.message && error.message.includes('zip')) {
                        reject(new Error('Invalid DOCX file. Please ensure you downloaded the file correctly from Google Docs. Try: File > Download > Microsoft Word (.docx)'));
                    } else {
                        reject(error);
                    }
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsArrayBuffer(file);
        });
    }

    // Fetch Google Docs URL and parse data
    /**
     * Allow users to paste a shareable Google Docs URL and pull the document
     * contents directly without manual downloads.
     */
    async function fetchGoogleDoc(url) {
        try {
            // Extract document ID from Google Docs URL
            // Handles formats like:
            // https://docs.google.com/document/d/DOC_ID/edit
            // https://docs.google.com/document/d/DOC_ID/edit?tab=t.0
            const docIdMatch = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
            if (!docIdMatch) {
                throw new Error('Invalid Google Docs URL. Please paste the full URL from your browser.');
            }
            
            const docId = docIdMatch[1];
            
            // Convert to export URL (HTML format)
            const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=html`;
            
            console.log(`[Google Docs] Fetching from: ${exportUrl}`);
            
            // Fetch the exported HTML
            const response = await fetch(exportUrl);
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Access denied. Please ensure your Google Doc is shared with "Anyone with the link can view" (File > Share > Change to "Anyone with the link")');
                }
                throw new Error(`Could not access Google Doc (Status: ${response.status}). Please check the sharing settings.`);
            }
            
            const html = await response.text();
            
            // Parse HTML to extract table data (same as parseHTML)
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const tables = doc.querySelectorAll('table');
            
            if (tables.length === 0) {
                throw new Error('No table found in Google Doc. Please ensure your document has a table with "Field Name" and "Content" columns.');
            }
            
            const data = {};
            const table = tables[0];
            const rows = table.querySelectorAll('tr');
            
            // Skip header row if present
            let isFirstRow = true;
            rows.forEach(row => {
                const cells = row.querySelectorAll('td, th');
                if (cells.length >= 2) {
                    const fieldName = cells[0].textContent.trim();
                    const content = cells[1].textContent.trim();
                    
                    // Skip header row (usually contains "Field Name" and "Content")
                    if (isFirstRow && (fieldName.toLowerCase().includes('field') || fieldName.toLowerCase().includes('name'))) {
                        isFirstRow = false;
                        return;
                    }
                    isFirstRow = false;
                    
                    if (fieldName && content) {
                        data[fieldName] = content;
                    }
                }
            });
            
            console.log(`[Google Docs] Successfully parsed ${Object.keys(data).length} fields`);
            return data;
        } catch (error) {
            console.error('[Google Docs] Error:', error);
            throw new Error(`Error fetching Google Doc: ${error.message}`);
        }
    }

    // Generate microsite
    generateBtn.addEventListener('click', async () => {
        if (!parsedData) {
            showStatus('Please upload a data file first', 'error');
            return;
        }
        
        showLoading(true, 'Packaging assets… 0%');
        hideStatus();
        
        try {
            showLoading(true, 'Packaging assets… 10%');
            await generateMicrosite();
            showLoading(true, 'Packaging assets… 100%');
            showStatus('Microsite generated successfully! Check downloads folder.', 'success');
        } catch (error) {
            showStatus('Error generating microsite: ' + error.message, 'error');
        } finally {
            showLoading(false);
        }
    });

    // Preview microsite
    previewBtn.addEventListener('click', async () => {
        if (!parsedData) {
            showStatus('Please upload a data file first', 'error');
            return;
        }
        
        // Attempt to open the preview window immediately so the browser
        // treats it as a direct result of the user interaction.
        let previewWindow = null;
        let previewBlocked = false;
        
        try {
            previewWindow = window.open('', '_blank');
            previewBlocked = !previewWindow || previewWindow.closed || typeof previewWindow.closed === 'undefined';
            
            if (!previewBlocked) {
                previewWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <title>Preparing preview…</title>
                            <style>
                                body { font-family: sans-serif; background: #0a1828; color: #e5b973; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                            </style>
                        </head>
                        <body>
                            <div>Preparing preview…</div>
                        </body>
                    </html>
                `);
                previewWindow.document.close();
            }
        } catch (error) {
            previewBlocked = true;
            previewWindow = null;
        }
        
        showLoading(true, 'Preparing preview… 0%');
        hideStatus();
        
        try {
            showLoading(true, 'Preparing preview… 20%');
            let html = await generateMicrositeHTML();
            showLoading(true, 'Preparing preview… 60%');
            
            // Replace data-field attributes in index.html with parsed data (for all templates including template-5)
            if (parsedData) {
                html = replaceDataFieldsInHTML(html, parsedData);
            }
            
            // Convert uploaded images to data URLs for preview
            html = await embedImagesInPreview(html);
            showLoading(true, 'Preparing preview… 90%');
            
            if (previewBlocked) {
                // Popup blocked - try using blob URL instead
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const blobWindow = window.open(url, '_blank');
                
                if (!blobWindow || blobWindow.closed || typeof blobWindow.closed === 'undefined') {
                    // Still blocked - show error with instructions
                    showStatus('Popup blocked. Please allow popups for this site, or use "Generate & Download" button instead.', 'error');
                    URL.revokeObjectURL(url);
                    return;
                }
                
                // Clean up blob URL after window opens
                setTimeout(() => URL.revokeObjectURL(url), 100);
                showStatus('Preview opened in new window', 'success');
            } else if (previewWindow) {
                previewWindow.document.open();
                previewWindow.document.write(html);
                previewWindow.document.close();
                showLoading(true, 'Preview ready!');
                showStatus('Preview opened in new window', 'success');
            }
        } catch (error) {
            showStatus('Error generating preview: ' + error.message, 'error');
            if (!previewBlocked && previewWindow && !previewWindow.closed) {
                previewWindow.close();
            }
        } finally {
            showLoading(false);
        }
    });
    
    // Convert uploaded images to data URLs and embed in HTML for preview
    async function embedImagesInPreview(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const config = templatesConfig[selectedTemplate];
        if (!config) return html;

        // Ensure relative assets resolve correctly in preview
        try {
            const baseHref = new URL('./', new URL(config.htmlPath, window.location.href)).href;
            if (baseHref) {
                let baseEl = doc.querySelector('base[data-dashboard-base]');
                if (!baseEl) {
                    baseEl = doc.createElement('base');
                    baseEl.setAttribute('data-dashboard-base', 'true');
                    const head = doc.querySelector('head');
                    if (head) {
                        head.prepend(baseEl);
                    }
                }
                if (baseEl) {
                    baseEl.setAttribute('href', baseHref);
                }
            }
        } catch (error) {
            console.warn('Unable to set base href for preview:', error);
        }
        
        const imageMapping = config.imageMapping || getDefaultImageMapping(selectedTemplate);
        
        // Helper function to convert file to data URL
        async function fileToDataURL(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
        
        // Helper function to fetch image from URL and convert to data URL
        async function fetchImageAsDataURL(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) return null;
                const blob = await response.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                console.warn(`Failed to fetch image ${url}:`, error);
                return null;
            }
        }
        
        // Convert uploaded images to data URLs and store by category
        const imageDataUrls = {};
        
        // Process all uploaded image categories
        for (const [category, files] of Object.entries(uploadedImages)) {
            if (!imageMapping[category]) continue;
            
            const fileArray = Array.isArray(files) ? files : [files];
            
            for (let i = 0; i < fileArray.length; i++) {
                const file = fileArray[i];
                if (!file || !(file instanceof File)) continue;
                
                try {
                    const dataURL = await fileToDataURL(file);
                    
                    // Store by category and index
                    if (!imageDataUrls[category]) {
                        imageDataUrls[category] = [];
                    }
                    imageDataUrls[category][i] = dataURL;
                } catch (error) {
                    console.warn(`Failed to convert ${category} image ${i + 1} to data URL:`, error);
                }
            }
        }
        
        // Also fetch static template images (floorplan, price card images, icons) and embed them
        const templateBase = selectedTemplate;
        const staticImages = [
            // Price card images
            'assets/images/floorplan/price.webp',
            // Floor plan images
            'assets/images/floorplan/floorplan1.webp',
            'assets/images/floorplan/floorplan2.webp',
            'assets/images/floorplan/floorplan3.webp',
            // Banner defaults
            'assets/images/banner/banner1.webp',
            'assets/images/banner/mobBanner1.webp',
            // Icon images
            'assets/images/icons/call-icon.gif',
            'assets/images/icons/downloadblack.gif',
            'assets/images/icons/downloadIcon.gif',
            'assets/images/icons/pdf.webp',
            'assets/images/icons/phone-call.webp',
            'assets/images/icons/phoneblack.gif',
            'assets/images/icons/phoneIcoon.gif',
            'assets/images/icons/whatsapp-icon.gif',
            'assets/images/icons/whatsapp.svg',
            'assets/images/icons/whatsappblack.gif',
            'assets/images/icons/whatsappIcon.gif'
        ];
        
        const staticImageDataUrls = {};
        for (const imgPath of staticImages) {
            try {
                const fullPath = `${templateBase}/${imgPath}`;
                const dataURL = await fetchImageAsDataURL(fullPath);
                if (dataURL) {
                    staticImageDataUrls[imgPath] = dataURL;
                    // Also store with relative path variations
                    staticImageDataUrls[`/${imgPath}`] = dataURL;
                    const fileName = imgPath.split('/').pop();
                    staticImageDataUrls[fileName] = dataURL;
                    // Also store without leading slash
                    staticImageDataUrls[imgPath.replace(/^\//, '')] = dataURL;
                }
            } catch (error) {
                console.warn(`Failed to fetch static image ${imgPath}:`, error);
            }
        }
        
        // Now update images using the same DOM-based approach as updateImagePaths
        // Update logo using DOM - prioritize data-field attributes
        if (imageDataUrls['logo'] && imageMapping.logo) {
            const logoDataURL = imageDataUrls['logo'][0];
            
            // Priority 1: Find all elements with data-field="logo"
            const dataFieldLogo = doc.querySelectorAll('[data-field="logo"]');
            dataFieldLogo.forEach(el => {
                if (el.tagName === 'IMG') {
                    el.src = logoDataURL;
                } else if (el.tagName === 'LINK') {
                    el.href = logoDataURL;
                } else if (el.tagName === 'A') {
                    el.href = logoDataURL;
                }
            });
            
            // Priority 2: Fallback to pattern matching for elements without data-field
            const logoElements = doc.querySelectorAll('img[src*="logo"]:not([data-field]), link[href*="logo"]:not([data-field]), a[href*="logo"]:not([data-field])');
            logoElements.forEach(el => {
                const currentPath = el.tagName === 'IMG' ? el.getAttribute('src') : el.getAttribute('href');
                if (currentPath && (currentPath.includes('logo') || imageMapping.logo.replacePatterns.some(pattern => currentPath.includes(pattern)))) {
                    if (el.tagName === 'IMG') {
                        el.src = logoDataURL;
                    } else {
                        el.href = logoDataURL;
                    }
                }
            });
        }
        
        // Update banner slides (desktop/mobile) using DOM
        const bannerDesktopUrls = (imageDataUrls['banner'] || []).filter(Boolean);
        const bannerMobileUrls = (imageDataUrls['mobBanner'] || []).filter(Boolean);
        if ((bannerDesktopUrls.length || bannerMobileUrls.length) && (imageMapping.banner || imageMapping.mobBanner)) {
            applyBannerSlides(doc, bannerDesktopUrls, bannerMobileUrls);

            const slidesContainer = doc.getElementById('bannerSlides') || 
                                   doc.querySelector('.carouselBannerTrack') ||
                                   doc.querySelector('.bannerSlidesContainer');
            const primaryDesktop = bannerDesktopUrls[0] || slidesContainer?.getAttribute('data-default-desktop') || '';
            const primaryMobile = bannerMobileUrls[0] || slidesContainer?.getAttribute('data-default-mobile') || primaryDesktop;

            const preloadDesktopLinks = doc.querySelectorAll('link[rel="preload"][href*="banner"]');
            preloadDesktopLinks.forEach(link => {
                if (primaryDesktop) {
                    link.href = primaryDesktop;
                }
            });

            const preloadMobileLinks = doc.querySelectorAll('link[rel="preload"][href*="mobBanner"], link[rel="preload"][href*="banner-480"]');
            preloadMobileLinks.forEach(link => {
                if (primaryMobile) {
                    link.href = primaryMobile;
                }
            });
        }
        
        // Update favicon using DOM - prioritize data-field attributes
        if (imageDataUrls['favicon'] && imageMapping.favicon) {
            const faviconDataURL = imageDataUrls['favicon'][0];
            
            // Priority 1: Find all elements with data-field="favicon"
            const dataFieldFavicon = doc.querySelectorAll('link[data-field="favicon"]');
            dataFieldFavicon.forEach(link => {
                link.href = faviconDataURL;
            });
            
            // Priority 2: Fallback to standard favicon links without data-field
            const existingFavicons = doc.querySelectorAll('link[rel="icon"]:not([data-field]), link[rel="shortcut icon"]:not([data-field])');
            
            if (existingFavicons.length > 0) {
                // Update existing favicon
                existingFavicons.forEach(link => {
                    link.href = faviconDataURL;
                });
            } else if (dataFieldFavicon.length === 0) {
                // Create new favicon link if none exists
                const head = doc.querySelector('head');
                if (head) {
                    const faviconLink = doc.createElement('link');
                    faviconLink.rel = 'icon';
                    faviconLink.type = 'image/x-icon';
                    faviconLink.href = faviconDataURL;
                    head.appendChild(faviconLink);
                }
            }
        }
        
        // Update virtual tour using DOM
        if (imageDataUrls['vtour'] && imageMapping.vtour) {
            const vtourDataURL = imageDataUrls['vtour'][0];
            
            // First try to find virtual tour image by specific class/container/data-field
            const virtualTourSection = doc.querySelector('#virtual1, .virtualtourContainer, .virtualtourWrapper, .virtualTourSection, #virtualTourSite');
            if (virtualTourSection) {
                // Check for images with virtualtourImage class, data-field="vtour", or in tour section
                const vtourImg = virtualTourSection.querySelector('img.virtualtourImage, img[data-field="vtour"], img[src*="tour"], img[src*="vtour"], .tourImage');
                if (vtourImg) {
                    vtourImg.src = vtourDataURL;
                }
            }
            
            // Also check for images with data-field="vtour" anywhere in the document
            const dataFieldVtour = doc.querySelectorAll('img[data-field="vtour"]');
            dataFieldVtour.forEach(img => {
                img.src = vtourDataURL;
            });
            
            // Fallback: Find elements with virtual tour pattern (but exclude header/logo areas)
            const vtourElements = doc.querySelectorAll('img[src], iframe[src], a[href]');
            vtourElements.forEach(el => {
                // Skip header/logo areas
                if (el.closest('header, .header, .logo-container, .aboutLogo')) return;
                
                // Skip if already processed via data-field
                if (el.hasAttribute('data-field') && el.getAttribute('data-field') === 'vtour') return;
                
                const path = el.tagName === 'IMG' || el.tagName === 'IFRAME' ? el.getAttribute('src') : el.getAttribute('href');
                if (path && imageMapping.vtour.replacePatterns.some(pattern => path.includes(pattern))) {
                    // Also check if it's in virtual tour section
                    if (el.closest('#virtual1, .virtualtourContainer, .virtualtourWrapper, .virtualTourSection, #virtualTourSite') || 
                        el.classList.contains('virtualtourImage') ||
                        el.classList.contains('tourImage') ||
                        path.includes('tour') || path.includes('vtour')) {
                        if (el.tagName === 'IMG' || el.tagName === 'IFRAME') {
                            el.src = vtourDataURL;
                        } else {
                            el.href = vtourDataURL;
                        }
                    }
                }
            });
        }
        
        // Rebuild amenities carousel for preview when uploads exist (ensure works for 2+ images)
        if (imageDataUrls['amenities'] && imageMapping.amenities) {
            const amenitiesContainer = doc.getElementById('amenitiesTrack');
            if (amenitiesContainer) {
                const isTemplate3Amenities = amenitiesContainer.classList && amenitiesContainer.classList.contains('amenities-track');
                // Template-5 also uses amenities-track class, check for template-5 specific structure
                const isTemplate5Amenities = amenitiesContainer.classList && amenitiesContainer.classList.contains('amenities-track') && 
                                           amenitiesContainer.querySelector('.amenities-imageContainer');
                const slideClass = (isTemplate3Amenities || isTemplate5Amenities) ? 'amenities-slide' : 'amenitiesSlide';
                const imageWrapperClass = (isTemplate3Amenities || isTemplate5Amenities) ? (isTemplate5Amenities ? 'amenities-imageContainer' : '') : 'amenitiesImageContainer';
                const imageClass = (isTemplate3Amenities || isTemplate5Amenities) ? 'amenities-image' : 'amenitiesImage';
                const overlayClass = (isTemplate3Amenities || isTemplate5Amenities) ? 'amenities-text-overlay' : 'amenitiesTextOverlay';
                let sources = (imageDataUrls['amenities'] || []).filter(Boolean);
                if (sources.length === 2) sources = [...sources, sources[0]];
                const count = rebuildCarouselSlides(amenitiesContainer, sources, {
                    slideClass: slideClass,
                    imageWrapperClass: imageWrapperClass,
                    imageClass: imageClass,
                    overlayClass: overlayClass,
                    overlayText: (index) => `Amenity ${index + 1}`,
                    altText: (index) => `Amenity ${index + 1}`,
                    width: '300',
                    height: '200',
                    sizes: '(max-width: 768px) 50vw, 25vw'
                });
                setElementsVisibility(doc, ['#amenitiesPrev', '#amenitiesNext'], count > 1);
                updateCounterText(doc, '#amenitiesLightboxCounter', count);
            }
        }
        
        // Rebuild gallery carousel for preview when uploads exist (ensure works for 2+ images)
        if (imageDataUrls['gallery'] && imageMapping.gallery) {
            const galleryContainer = doc.getElementById('galleryCarouselTrack') || 
                                     doc.getElementById('galleryTrack') ||
                                     doc.querySelector('.gallery-carousel-track') ||
                                     doc.querySelector('.gallery-track');
            if (galleryContainer) {
                const isCarouselTrack = galleryContainer.id === 'galleryCarouselTrack' || galleryContainer.classList.contains('gallery-carousel-track');
                // Template-5 uses gallery-track class with gallery-imageContainer structure
                const isTemplate5Gallery = galleryContainer.classList && galleryContainer.classList.contains('gallery-track') && 
                                          galleryContainer.querySelector('.gallery-imageContainer');
                const slideClass = isCarouselTrack ? 'gallery-carousel-slide' : (isTemplate5Gallery ? 'gallery-slide' : 'gallerySlide');
                const imageClass = isCarouselTrack ? 'gallery-carousel-image' : (isTemplate5Gallery ? 'gallery-image' : 'galleryImage');
                const imageWrapperClass = isTemplate5Gallery ? 'gallery-imageContainer' : 'galleryImageContainer';
                const overlayClass = isTemplate5Gallery ? 'gallery-text-overlay' : 'galleryTextOverlay';
                // Remove any existing gallery text overlays
                galleryContainer.querySelectorAll('.galleryTextOverlay, .gallery-text-overlay').forEach(el => el.remove());
                let sources = (imageDataUrls['gallery'] || []).filter(Boolean);
                if (sources.length === 2) sources = [...sources, sources[0]];
                const count = rebuildCarouselSlides(galleryContainer, sources, {
                    slideClass: slideClass,
                    imageWrapperClass: imageWrapperClass,
                    imageClass: imageClass,
                    overlayClass: '', // Remove gallery text overlay
                    overlayText: (index) => '', // Empty overlay text
                    altText: (index) => `Gallery Image ${index + 1}`,
                    width: '400',
                    height: '300',
                    sizes: '(max-width: 768px) 50vw, 25vw'
                });
                setElementsVisibility(doc, ['#galleryPrev', '#galleryNext', '#galleryCarouselPrev', '#galleryCarouselNext'], count > 1);
                const counter1 = doc.querySelector('#galleryLightboxCounter');
                const counter2 = doc.querySelector('#galleryCarouselLightboxCounter');
                if (counter1) updateCounterText(doc, '#galleryLightboxCounter', count);
                if (counter2) updateCounterText(doc, '#galleryCarouselLightboxCounter', count);
            }
        }
        
        // Update overview images with first gallery image
        if (imageDataUrls['gallery'] && imageDataUrls['gallery'].length > 0) {
            const firstGalleryImage = imageDataUrls['gallery'][0];
            if (firstGalleryImage) {
                // Find all overview images by class
                const overviewImages = doc.querySelectorAll('.overviewImage, img.overviewImage');
                overviewImages.forEach(img => {
                    img.src = firstGalleryImage;
                    // Update data-src if present
                    if (img.hasAttribute('data-src')) {
                        img.setAttribute('data-src', firstGalleryImage);
                    }
                    // Ensure data-field is set for gallery
                    if (!img.hasAttribute('data-field')) {
                        img.setAttribute('data-field', 'gallery');
                    }
                });
            }
        }
        
        // Update QR images using DOM - prioritize data-field="qr"
        if (imageDataUrls['qr'] && imageMapping.qr) {
            const uploadedQr = (imageDataUrls['qr'] || []).filter(Boolean);
            const hasUploads = uploadedQr.length > 0;
            
            // Priority 1: Find all QR images with data-field="qr"
            const dataFieldQr = doc.querySelectorAll('img[data-field="qr"]');
            if (dataFieldQr.length > 0) {
                if (hasUploads) {
                    // Update existing QR images with uploaded data
                    dataFieldQr.forEach((img, idx) => {
                        if (uploadedQr[idx]) {
                            img.src = uploadedQr[idx];
                            img.setAttribute('data-src', uploadedQr[idx]);
                            img.style.display = '';
                            img.removeAttribute('style');
                        } else {
                            // Hide if no corresponding upload
                            img.style.display = 'none';
                        }
                    });
                    
                    // Add new QR images if we have more uploads than existing
                    if (uploadedQr.length > dataFieldQr.length) {
                        const aboutSection = doc.querySelector('.aboutSection');
                        if (aboutSection) {
                            const rowContainer = aboutSection.querySelector('.row.mob-center, .row');
                            if (rowContainer) {
                                for (let i = dataFieldQr.length; i < uploadedQr.length; i++) {
                                    const colDiv = doc.createElement('div');
                                    colDiv.className = 'col-lg-2 col-sm-3';
                                    const reraDiv = doc.createElement('div');
                                    reraDiv.className = 'rera-img';
                                    const qrImg = doc.createElement('img');
                                    qrImg.src = uploadedQr[i];
                                    qrImg.alt = `MahaRERA QR Code ${i + 1}`;
                                    qrImg.setAttribute('data-src', uploadedQr[i]);
                                    qrImg.setAttribute('data-field', 'qr');
                                    qrImg.setAttribute('loading', 'lazy');
                                    qrImg.setAttribute('width', '120');
                                    qrImg.setAttribute('height', '120');
                                    reraDiv.appendChild(qrImg);
                                    colDiv.appendChild(reraDiv);
                                    rowContainer.appendChild(colDiv);
                                }
                            }
                        }
                    }
                } else {
                    // No uploads - hide all QR images
                    dataFieldQr.forEach(img => {
                        img.style.display = 'none';
                    });
                }
            } else {
                // Priority 2: Fallback to rera-img containers
                const qrContainer = doc.querySelector('.aboutSectionQr');
                const aboutSection = doc.querySelector('.aboutSection');
                
                if (qrContainer || aboutSection) {
                    // Find all rera-img containers (QR image containers) - these are the actual QR containers
                    const reraImgContainers = (qrContainer || aboutSection).querySelectorAll('.rera-img');
                
                    if (reraImgContainers.length > 0) {
                    // Remove all existing QR images from rera-img containers
                    reraImgContainers.forEach(container => {
                        const existingImg = container.querySelector('img');
                        if (existingImg) {
                            existingImg.remove();
                        }
                    });
                    
                    // Create QR images dynamically for each uploaded file
                    imageDataUrls['qr'].forEach((dataURL, index) => {
                        // Find or create rera-img container for this QR
                        let reraContainer = reraImgContainers[index];
                        
                        if (!reraContainer && aboutSection) {
                            // Create new container structure if needed
                            const rowContainer = aboutSection.querySelector('.row.mob-center, .row');
                            if (rowContainer) {
                                const colDiv = doc.createElement('div');
                                colDiv.className = 'col-lg-2 col-sm-3';
                                reraContainer = doc.createElement('div');
                                reraContainer.className = 'rera-img';
                                colDiv.appendChild(reraContainer);
                                rowContainer.appendChild(colDiv);
                            }
                        }
                        
                        if (reraContainer) {
                            const qrImg = doc.createElement('img');
                            qrImg.src = dataURL;
                            qrImg.alt = `MahaRERA QR Code ${index + 1}`;
                            qrImg.setAttribute('data-src', dataURL);
                            qrImg.setAttribute('data-field', 'qr');
                            qrImg.setAttribute('loading', 'lazy');
                            qrImg.setAttribute('width', '120');
                            qrImg.setAttribute('height', '120');
                            reraContainer.appendChild(qrImg);
                        }
                    });
                    
                    // Remove any extra rera-img containers beyond uploaded count
                    if (reraImgContainers.length > imageDataUrls['qr'].length) {
                        for (let i = imageDataUrls['qr'].length; i < reraImgContainers.length; i++) {
                            const container = reraImgContainers[i];
                            const colDiv = container.closest('.col-lg-2, .col-sm-3');
                            if (colDiv) {
                                colDiv.remove();
                        } else {
                                container.remove();
                            }
                        }
                    }
                } else {
                    // No rera-img containers found, try to find QR images directly (but exclude logo)
                    const qrImages = Array.from((qrContainer || aboutSection).querySelectorAll('img[src*="qr"], img[src*="QR"]')).filter(img => {
                        // Exclude logo images - only find actual QR images
                        const isLogo = img.closest('.aboutLogo, .logo-container, header, .header');
                        return !isLogo;
                    });
                    
                    // Update existing QR images
                    const uploadedQr = (imageDataUrls['qr'] || []).filter(Boolean);
                    qrImages.forEach((img, idx) => {
                        if (uploadedQr[idx]) {
                            img.src = uploadedQr[idx];
                            img.setAttribute('data-src', uploadedQr[idx]);
                            img.style.display = '';
                            img.removeAttribute('style');
                        } else {
                            // Remove extra QR images
                            img.remove();
                        }
                    });
                    
                    // Add new QR images if we have more uploads than existing
                    if (uploadedQr.length > qrImages.length && aboutSection) {
                        const rowContainer = aboutSection.querySelector('.row.mob-center, .row');
                        if (rowContainer) {
                            for (let i = qrImages.length; i < uploadedQr.length; i++) {
                                const colDiv = doc.createElement('div');
                                colDiv.className = 'col-lg-2 col-sm-3';
                                const reraDiv = doc.createElement('div');
                                reraDiv.className = 'rera-img';
                                const qrImg = doc.createElement('img');
                                qrImg.src = uploadedQr[i];
                                qrImg.alt = `MahaRERA QR Code ${i + 1}`;
                                qrImg.setAttribute('data-src', uploadedQr[i]);
                                qrImg.setAttribute('data-field', 'qr');
                                qrImg.setAttribute('loading', 'lazy');
                                qrImg.setAttribute('width', '120');
                                qrImg.setAttribute('height', '120');
                                reraDiv.appendChild(qrImg);
                                colDiv.appendChild(reraDiv);
                                rowContainer.appendChild(colDiv);
                            }
                        }
                    }
                }
            } else {
                // Fallback: find QR images without container (but exclude header/logo)
                const qrImages = Array.from(doc.querySelectorAll('img[src*="qr"], img[src*="QR"]')).filter(img => {
                    const src = img.getAttribute('src');
                    // Exclude header/logo areas - only find actual QR images
                    const isHeaderLogo = img.closest('.headerLogo, .aboutLogo, .logo-container, header, .header');
                    if (isHeaderLogo) {
                        return false; // Skip header/logo
                    }
                    return src && (src.includes('qr') || src.includes('QR'));
                });
                
                const uploadedQr = (imageDataUrls['qr'] || []).filter(Boolean);
                // Update each QR image
                qrImages.forEach((img, idx) => {
                    if (uploadedQr[idx]) {
                        img.src = uploadedQr[idx];
                    } else {
                        img.remove();
                    }
                });
            }
        }
        
        // Embed static template images (floorplan, price card images) in preview
        if (Object.keys(staticImageDataUrls).length > 0) {
            // Update price card images (price.webp)
            doc.querySelectorAll('.price-floor-plan img, img[src*="floorplan/price"], img[src*="price.webp"]').forEach(img => {
                const src = img.getAttribute('src');
                if (src && (src.includes('price.webp') || src.includes('floorplan/price'))) {
                    // Try exact match first
                    if (staticImageDataUrls[src]) {
                        img.src = staticImageDataUrls[src];
                    } else {
                        // Try matching by filename or full path
                        const fileName = src.split('/').pop();
                        if (staticImageDataUrls[fileName]) {
                            img.src = staticImageDataUrls[fileName];
                        } else if (staticImageDataUrls['assets/images/floorplan/price.webp']) {
                            img.src = staticImageDataUrls['assets/images/floorplan/price.webp'];
                        } else if (staticImageDataUrls['/assets/images/floorplan/price.webp']) {
                            img.src = staticImageDataUrls['/assets/images/floorplan/price.webp'];
                        }
                    }
                }
            });
            
            // Update floorplan images (floorplan1.webp, floorplan2.webp, floorplan3.webp)
            // Handle both "floorplan" and "floorPlan" (camelCase) variations
            doc.querySelectorAll('.floorPlanSection img, .floorPlan-container img, #floorPlanContainer img, img[src*="floorplan"], img[src*="floorPlan"], img[src*="floorplan1"], img[src*="floorplan2"], img[src*="floorplan3"]').forEach(img => {
                const src = img.getAttribute('src');
                if (src && (src.toLowerCase().includes('floorplan') || src.includes('floorPlan')) && !src.includes('price.webp') && !src.includes('pricesheet')) {
                    // Try exact match first
                    if (staticImageDataUrls[src]) {
                        img.src = staticImageDataUrls[src];
                    } else {
                        // Try matching by filename
                        const fileName = src.split('/').pop();
                        if (staticImageDataUrls[fileName]) {
                            img.src = staticImageDataUrls[fileName];
                        } else {
                            // Match by specific floorplan number
                            if (src.includes('floorplan1')) {
                                if (staticImageDataUrls['assets/images/floorplan/floorplan1.webp']) {
                                    img.src = staticImageDataUrls['assets/images/floorplan/floorplan1.webp'];
                                } else if (staticImageDataUrls['/assets/images/floorplan/floorplan1.webp']) {
                                    img.src = staticImageDataUrls['/assets/images/floorplan/floorplan1.webp'];
                                }
                            } else if (src.includes('floorplan2')) {
                                if (staticImageDataUrls['assets/images/floorplan/floorplan2.webp']) {
                                    img.src = staticImageDataUrls['assets/images/floorplan/floorplan2.webp'];
                                } else if (staticImageDataUrls['/assets/images/floorplan/floorplan2.webp']) {
                                    img.src = staticImageDataUrls['/assets/images/floorplan/floorplan2.webp'];
                                }
                            } else if (src.includes('floorplan3')) {
                                if (staticImageDataUrls['assets/images/floorplan/floorplan3.webp']) {
                                    img.src = staticImageDataUrls['assets/images/floorplan/floorplan3.webp'];
                                } else if (staticImageDataUrls['/assets/images/floorplan/floorplan3.webp']) {
                                    img.src = staticImageDataUrls['/assets/images/floorplan/floorplan3.webp'];
                                }
                            }
                        }
                    }
                }
            });
            
            console.log(`[Preview] Embedded ${Object.keys(staticImageDataUrls).length} static template images (floorplan, price cards)`);
        }
        
        // Embed icon images in preview
        if (Object.keys(staticImageDataUrls).length > 0) {
            // Update all icon images
            doc.querySelectorAll('img[src*="icons/"], img[src*="/icons/"]').forEach(img => {
                const src = img.getAttribute('src');
                if (src && src.includes('icons')) {
                    // Try exact match first
                    if (staticImageDataUrls[src]) {
                        img.src = staticImageDataUrls[src];
                    } else {
                        // Try matching by filename
                        const fileName = src.split('/').pop();
                        if (staticImageDataUrls[fileName]) {
                            img.src = staticImageDataUrls[fileName];
                        } else {
                            // Try matching by full path variations
                            const normalizedPath = src.replace(/^\//, '');
                            if (staticImageDataUrls[normalizedPath]) {
                                img.src = staticImageDataUrls[normalizedPath];
                            } else if (staticImageDataUrls[`/${normalizedPath}`]) {
                                img.src = staticImageDataUrls[`/${normalizedPath}`];
                            } else {
                                // Try matching by extracting icons path
                                const iconsMatch = src.match(/icons\/([^\/]+)/);
                                if (iconsMatch && iconsMatch[1]) {
                                    const iconFileName = iconsMatch[1];
                                    const iconPath = `assets/images/icons/${iconFileName}`;
                                    if (staticImageDataUrls[iconPath]) {
                                        img.src = staticImageDataUrls[iconPath];
                                    } else if (staticImageDataUrls[`/${iconPath}`]) {
                                        img.src = staticImageDataUrls[`/${iconPath}`];
                                    } else if (staticImageDataUrls[iconFileName]) {
                                        img.src = staticImageDataUrls[iconFileName];
                                    }
                                }
                            }
                        }
                    }
                }
            });
            
            console.log(`[Preview] Embedded icon images`);
        }
        
        applyLocationIframe(doc);
        applyProjectNameTitles(doc);

        // Convert back to HTML string
        return doc.documentElement.outerHTML;
    }

    /**
     * Orchestrate the full publish flow: render HTML with injected content,
     * bundle required assets, and hand the finished microsite to the user.
     */
    async function generateMicrosite() {
        showLoading(true);
        hideStatus();
        
        try {
            const html = await generateMicrositeHTML();
            
            // Create ZIP file with HTML and all assets
            await downloadMicrositeZip(html);
            
            showStatus('Microsite generated and downloaded successfully!', 'success');
        } catch (error) {
            showStatus('Error generating microsite: ' + error.message, 'error');
        } finally {
            showLoading(false);
        }
    }

    /**
     * Package the rendered HTML and its assets into a downloadable ZIP file.
     * Falls back to raw HTML when JSZip is unavailable.
     */
    async function downloadMicrositeZip(html) {
        if (typeof JSZip === 'undefined') {
            // Fallback: download HTML only if JSZip not available
            downloadFile(html, 'index.html', 'text/html');
            showStatus('JSZip library not loaded. Downloading HTML only. Please include assets manually.', 'error');
            return;
        }

        const zip = new JSZip();
        
        // Replace data-field attributes in index.html with parsed data (for all templates including template-5)
        let processedHtml = html;
        if (parsedData) {
            processedHtml = replaceDataFieldsInHTML(html, parsedData);
        }
        
        // Add HTML file
        zip.file('index.html', processedHtml);
        showLoading(true, 'Packaging assets… 25%');

        // Copy all assets from template-1 folder
        await copyTemplateAssets(zip);
        showLoading(true, 'Packaging assets… 60%');

        // Add uploaded images
        await addUploadedImages(zip);
        showLoading(true, 'Packaging assets… 85%');
        
        // Generate and download ZIP
        const blob = await zip.generateAsync({ type: 'blob' });
        showLoading(true, 'Packaging assets… 100%');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${parsedData.project_name || 'microsite'}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Copy the template's stock assets (images, CSS, thank-you page, etc.) into
     * the output archive so the exported microsite works offline as-is.
     */
    async function copyTemplateAssets(zip) {
        const config = templatesConfig[selectedTemplate];
        if (!config) return;
        
        const templateBase = selectedTemplate;
        
        console.log(`[ZIP] Starting to copy all template assets from ${templateBase}...`);
        
        const allTemplateFiles = [
            'thankyou.html',
            'thankyou-css/all.min.css',
            'thankyou-css/bootstrap.css',
            'thankyou-css/bootstrap.min.css',
            'thankyou-css/owl.carousel.css',
            'thankyou-css/owl.theme.default.css',
            'thankyou-css/style.css',
            'thankyou-css/thanks.css',
            'thankyou-js/gtm.js',
            'thankyou-js/js',
            'thankyou-js/meta_name.js',
            'assets/images/address/a1.webp',
            'assets/images/address/a2.webp',
            'assets/images/address/a3.webp',
            'assets/images/address/a4.webp',
            'assets/images/address/map.webp',
            'assets/images/floorplan/floorplan1.webp',
            'assets/images/floorplan/floorplan2.webp',
            'assets/images/floorplan/floorplan3.webp',
            'assets/images/floorplan/price.webp',
            'assets/images/issue/12_upscaled.webp',
            'assets/images/issue/g1.webp',
            'assets/images/issue/gal05.webp',
            'assets/images/issue/gal06.webp',
            'assets/images/issue/gh3.webp',
            'assets/images/icons/call-icon.gif',
            'assets/images/icons/downloadblack.gif',
            'assets/images/icons/downloadIcon.gif',
            'assets/images/icons/pdf.webp',
            'assets/images/icons/phone-call.webp',
            'assets/images/icons/phoneblack.gif',
            'assets/images/icons/phoneIcoon.gif',
            'assets/images/icons/whatsapp-icon.gif',
            'assets/images/icons/whatsapp.svg',
            'assets/images/icons/whatsappblack.gif',
            'assets/images/icons/whatsappIcon.gif',
            'assets/images/icons/donwload-icon.gif',
            'assets/images/icons/donwload-icon.webp',
            'assets/images/icons/car.webp',
            // Navbar icon SVGs for template-3
            'assets/images/icons/homeDark.svg',
            'assets/images/icons/labelDark.svg',
            'assets/images/icons/floorPlan.svg',
            'assets/images/icons/amenitiesDark.svg',
            'assets/images/icons/galleryDark.svg',
            'assets/images/icons/locationDark.svg',
            'assets/images/icons/youtubeDark.svg',
            'assets/images/icons/downlaod.svg',
            'assets/images/icons/menu.svg',
            'assets/images/icons/whiteChat.svg',
            'assets/images/icons/whiteGetIt.svg',
            'assets/images/icons/freeSiteVisite.svg',
            'assets/images/icons/unmatchPrice.svg',
            'assets/images/icons/callDark.svg',
            'assets/js/api.js',
            'assets/js/countrydata.js',
            'assets/js/custom.js',
            'assets/images/vtour/1BHK.gif',
            'assets/images/vtour/video.webp',
            'assets/images/vtour/vtour1.webp',
            'assets/images/banner/banner.webp',
            'assets/images/banner/banner-480.webp',
            'assets/images/logo/logo.webp',
            'assets/images/logo/favicon.webp',
            'assets/images/qr/qr.webp'
        ];
        
        let copiedCount = 0;
        
        const assetTasks = allTemplateFiles.map(filePath => (async () => {
            const fetchPath = resolveTemplateFetchPath(templateBase, filePath);
            const blob = await fetchTemplateAsset(fetchPath);
            if (!blob) {
                // Log missing files, especially icon files
                if (filePath.includes('icons/')) {
                    console.warn(`[ZIP] ⚠ Missing icon file: ${filePath} (fetchPath: ${fetchPath})`);
                }
                return false;
            }
            
            let fileBlob = blob;
            if (filePath === 'thankyou.html') {
                const text = await blob.text();
                // Replace data-field attributes in thankyou.html with parsed data
                let processedText = replaceDataFieldsInHTML(text, parsedData);
                // Add GTM code to thankyou.html (GTM head and body code from dashboard inputs)
                fileBlob = new Blob([addGTMToHTML(processedText)], { type: 'text/html' });
                console.log(`[ZIP] ✓ Processed data-fields and added GTM to: ${filePath}`);
            }
            
            zip.file(filePath, fileBlob, getCompressionOptionsForPath(filePath));
            // Log icon files specifically for debugging
            if (filePath.includes('icons/')) {
                console.log(`[ZIP] ✓ Copied icon: ${filePath}`);
            } else {
                console.log(`[ZIP] ✓ Copied: ${filePath}`);
            }
            return true;
        })());
        
        const assetResults = await Promise.allSettled(assetTasks);
        copiedCount += assetResults.filter(result => result.status === 'fulfilled' && result.value).length;
        
        // Log icon files copy status for debugging
        const iconFiles = allTemplateFiles.filter(path => path.includes('icons/'));
        const copiedIconFiles = assetResults
            .map((result, idx) => ({ result, path: allTemplateFiles[idx] }))
            .filter(({ result, path }) => path.includes('icons/') && result.status === 'fulfilled' && result.value)
            .map(({ path }) => path);
        const failedIconFiles = assetResults
            .map((result, idx) => ({ result, path: allTemplateFiles[idx] }))
            .filter(({ result, path }) => path.includes('icons/') && (result.status === 'rejected' || !result.value))
            .map(({ path }) => path);
        
        if (iconFiles.length > 0) {
            console.log(`[ZIP] Icon files summary: ${copiedIconFiles.length}/${iconFiles.length} copied successfully`);
            if (copiedIconFiles.length > 0) {
                console.log(`[ZIP] ✓ Successfully copied icon files:`, copiedIconFiles.slice(0, 5), copiedIconFiles.length > 5 ? `... and ${copiedIconFiles.length - 5} more` : '');
            }
            if (failedIconFiles.length > 0) {
                console.error(`[ZIP] ✗ Failed to copy ${failedIconFiles.length} icon files:`, failedIconFiles);
                // Try to copy failed icon files again with alternative paths
                for (const failedPath of failedIconFiles) {
                    const altPaths = [
                        failedPath.replace(/^assets\//, ''),
                        failedPath.replace(/^\/assets\//, 'assets/'),
                        `${templateBase}/${failedPath}`,
                        `${templateBase}/${failedPath.replace(/^assets\//, '')}`
                    ];
                    for (const altPath of altPaths) {
                        try {
                            const fetchPath = resolveTemplateFetchPath(templateBase, altPath);
                            if (fetchPath) {
                                const blob = await fetchTemplateAsset(fetchPath);
                                if (blob) {
                                    zip.file(failedPath, blob, getCompressionOptionsForPath(failedPath));
                                    console.log(`[ZIP] ✓ Retry successful for icon: ${failedPath} (via ${altPath})`);
                                    break;
                                }
                            }
                        } catch (error) {
                            // Continue to next alternative path
                        }
                    }
                }
            }
        }
        
        const extraTasks = [];
        
        if (config.cssPath) {
            extraTasks.push((async () => {
                const fetchPath = resolveTemplateFetchPath(templateBase, config.cssPath);
                const cssBlob = await fetchTemplateAsset(fetchPath);
                if (!cssBlob) return false;
                const relativeCssPath = config.cssPath.startsWith(`${templateBase}/`)
                    ? config.cssPath.slice(templateBase.length + 1)
                    : config.cssPath.replace(/^\/+/, '');
                
                // For template-3, ensure icon paths in CSS are correct
                // CSS has relative paths like url('../images/icons/...') 
                // From assets/css/style.css, ../images/icons/ resolves to assets/images/icons/
                // This should work, but let's ensure paths are correct
                let processedCssBlob = cssBlob;
                
                // For template-3, verify and fix icon paths in CSS
                if (selectedTemplate === 'template-3') {
                    try {
                        const cssText = await cssBlob.text();
                        let updatedCss = cssText;
                        let hasChanges = false;
                        
                        // Convert any absolute icon paths to relative paths (from assets/css/)
                        // Pattern: url('/assets/images/icons/...') -> url('../images/icons/...')
                        const absolutePattern = /url\(['"]?\/assets\/images\/icons\/([^'"]+)['"]?\)/g;
                        if (absolutePattern.test(updatedCss)) {
                            updatedCss = updatedCss.replace(absolutePattern, "url('../images/icons/$1')");
                            hasChanges = true;
                        }
                        
                        // Convert paths without leading slash but with assets/
                        // Pattern: url('assets/images/icons/...') -> url('../images/icons/...')
                        const noSlashPattern = /url\(['"]?assets\/images\/icons\/([^'"]+)['"]?\)/g;
                        if (noSlashPattern.test(updatedCss)) {
                            updatedCss = updatedCss.replace(noSlashPattern, "url('../images/icons/$1')");
                            hasChanges = true;
                        }
                        
                        // Ensure all icon paths use the correct relative path format
                        // Pattern: url('../images/icons/...') - verify this is correct
                        // From assets/css/style.css, ../images/icons/ correctly resolves to assets/images/icons/
                        // So we keep these as-is
                        
                        if (hasChanges) {
                            processedCssBlob = new Blob([updatedCss], { type: 'text/css' });
                            console.log(`[ZIP] ✓ Updated CSS icon paths in: ${relativeCssPath}`);
                        } else {
                            // Verify relative paths are present
                            const relativeIconPattern = /url\(['"]?\.\.\/images\/icons\/([^'"]+)['"]?\)/g;
                            const matches = updatedCss.match(relativeIconPattern);
                            if (matches && matches.length > 0) {
                                console.log(`[ZIP] ✓ CSS has ${matches.length} icon paths with correct relative format`);
                            }
                        }
                    } catch (error) {
                        console.warn(`[ZIP] Could not process CSS for icon paths:`, error);
                        // Continue with original CSS blob
                    }
                }
                
                zip.file(relativeCssPath, processedCssBlob, getCompressionOptionsForPath(relativeCssPath));
                console.log(`[ZIP] ✓ Copied: ${relativeCssPath}`);
                return true;
            })());
        }

        if (config.jsPath) {
            extraTasks.push((async () => {
                const fetchPath = resolveTemplateFetchPath(templateBase, config.jsPath);
                const scriptBlob = await fetchTemplateAsset(fetchPath);
                if (!scriptBlob) return false;
                const relativeScriptPath = config.jsPath.startsWith(`${templateBase}/`)
                    ? config.jsPath.slice(templateBase.length + 1)
                    : config.jsPath.replace(/^\/+/, '');
                zip.file(relativeScriptPath, scriptBlob, getCompressionOptionsForPath(relativeScriptPath));
                console.log(`[ZIP] ✓ Copied: ${relativeScriptPath}`);
                return true;
            })());
        }
        
        if (extraTasks.length) {
            const extraResults = await Promise.allSettled(extraTasks);
            copiedCount += extraResults.filter(result => result.status === 'fulfilled' && result.value).length;
        }
        
        console.log(`[ZIP] Copied ${copiedCount} template files`);
        
        const imageMapping = config.imageMapping || getDefaultImageMapping(selectedTemplate);
        const fallbackTasks = [];
        
        const enqueueAsset = (outputPath, sourcePath) => {
            if (!outputPath) return;
            const fetchPath = resolveTemplateFetchPath(templateBase, sourcePath || outputPath);
            fallbackTasks.push((async () => {
                const blob = await fetchTemplateAsset(fetchPath);
                if (!blob) return false;
                zip.file(outputPath, blob, getCompressionOptionsForPath(outputPath));
                return true;
            })());
        };
        
        if (!uploadedImages['amenities'] && imageMapping.amenities) {
            const amenityPath = imageMapping.amenities.paths[0];
            for (let i = 1; i <= 10; i++) {
                const path = imageMapping.amenities.pattern 
                    ? `${amenityPath}${imageMapping.amenities.pattern.replace('{index}', i)}`
                    : `${amenityPath}${i}.webp`;
                enqueueAsset(path);
            }
        }
        
        if (!uploadedImages['gallery'] && imageMapping.gallery) {
            const galleryPath = imageMapping.gallery.paths[0];
            for (let i = 1; i <= 10; i++) {
                const path = imageMapping.gallery.pattern 
                    ? `${galleryPath}${imageMapping.gallery.pattern.replace('{index}', i)}`
                    : `${galleryPath}${i}.webp`;
                enqueueAsset(path);
            }
        }
        
        if (!uploadedImages['qr'] && imageMapping.qr) {
            const qrPath = imageMapping.qr.paths[0];
            for (let i = 1; i <= 5; i++) {
                const qrNum = i === 1 ? '1' : i;
                const path = imageMapping.qr.pattern 
                    ? `${qrPath}${imageMapping.qr.pattern.replace('{index}', qrNum)}`
                    : `${qrPath}${qrNum}.webp`;
                enqueueAsset(path);
            }
        }
        
        if (!uploadedImages['logo'] && imageMapping.logo) {
            const logoPath = imageMapping.logo.paths[0];
            enqueueAsset(logoPath);
        }
        
        if (!uploadedImages['banner'] && !uploadedImages['mobBanner'] && Array.isArray(config.bannerRootFiles) && config.bannerRootFiles.length) {
            const desktopRoot = config.bannerRootFiles.find(name => name === 'banner1.webp' || name === 'banner.png');
            if (desktopRoot) {
                const bannerPath = getImageTargetPath(imageMapping.banner, 0) || 'assets/images/banner/banner1.webp';
                enqueueAsset(bannerPath, desktopRoot);
            }
            
            const mobileRoot = config.bannerRootFiles.find(name => name === 'mobBanner1.webp' || name === 'banner-480.webp');
            if (mobileRoot) {
                const mobBannerPath = getImageTargetPath(imageMapping.mobBanner, 0) || 'assets/images/banner/mobBanner1.webp';
                enqueueAsset(mobBannerPath, mobileRoot);
            }
        }
        
        if (!uploadedImages['vtour'] && imageMapping.vtour) {
            // Use getImageTargetPath to get the correct file path
            let vtourPath = getImageTargetPath(imageMapping.vtour, 0);
            // If path is a directory, append tour1.webp
            if (!vtourPath || vtourPath.endsWith('/')) {
                const basePath = imageMapping.vtour.paths[0];
                if (imageMapping.vtour.pattern) {
                    vtourPath = `${basePath}${imageMapping.vtour.pattern.replace('{index}', '1')}`;
                } else {
                    vtourPath = basePath.endsWith('/') ? `${basePath}tour1.webp` : `${basePath}/tour1.webp`;
                }
            }
            if (vtourPath) {
                fallbackTasks.push((async () => {
                    let blob = await fetchTemplateAsset(resolveTemplateFetchPath(templateBase, vtourPath));
                    
                    if (!blob && Array.isArray(imageMapping.vtour.replacePatterns)) {
                        for (const pattern of imageMapping.vtour.replacePatterns) {
                            const candidate = pattern && pattern.replace(/^\//, '');
                            if (!candidate) continue;
                            blob = await fetchTemplateAsset(resolveTemplateFetchPath(templateBase, candidate));
                            if (blob) break;
                        }
                    }
                    
                    if (!blob) return false;
                    zip.file(vtourPath, blob, getCompressionOptionsForPath(vtourPath));
                    return true;
                })());
            }
        }
        
        if (fallbackTasks.length) {
            await Promise.allSettled(fallbackTasks);
        }

        // Ensure specific stock assets are present even when not uploaded (template variants)
        try {
            // Attempt template-3 style paths first
            enqueueAsset('assets/images/amenities/indian-family.webp');
            enqueueAsset('assets/images/floorPlan/pricesheet.webp');
            // Also attempt template-1/4/5 style casing as fallback
            enqueueAsset('assets/images/floorplan/pricesheet.webp');
        } catch (e) {
            // Non-fatal: these files may not exist in all templates
        }
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Replace data-field attributes in HTML content with values from parsedData
     * This is used for processing thankyou.html and other HTML files
     */
    function replaceDataFieldsInHTML(html, data) {
        if (!data || !html) return html;
        
        let processedHtml = html;
        
        // Process each field in parsedData
        Object.keys(data).forEach(fieldName => {
            const value = data[fieldName];
            if (!value || !value.trim()) return;
            
            // Handle meta tags with content attribute (special case)
            processedHtml = processedHtml.replace(
                new RegExp(
                    `(<meta[^>]*data-field=["']${escapeRegex(fieldName)}["'][^>]*content=["'])([^"']*)(["'][^>]*>)`,
                    'gi'
                ),
                `$1${escapeHtml(value.trim())}$3`
            );
            
            // Handle title tag (special case)
            processedHtml = processedHtml.replace(
                new RegExp(
                    `(<title[^>]*data-field=["']${escapeRegex(fieldName)}["'][^>]*>)([^<]*?)(</title>)`,
                    'gi'
                ),
                `$1${escapeHtml(value.trim())}$3`
            );
            
            // Handle other elements with data-field attribute
            const escapedFieldName = escapeRegex(fieldName);
            const escapedValue = escapeHtml(value.trim());
            
            const elementRegex = new RegExp(
                `(<([a-zA-Z][a-zA-Z0-9]*)[^>]*data-field=["']${escapedFieldName}["'][^>]*>)([\\s\\S]*?)(</\\2>)`,
                'gi'
            );
            
            processedHtml = processedHtml.replace(elementRegex, (match, openTag, tagName, content, closeTag) => {
                // Don't replace if it's inside script/style tags
                if (openTag.includes('<script') || openTag.includes('<style')) {
                    return match;
                }
                
                // For simple content without nested data-fields, replace all
                const hasNestedDataField = /data-field=["']/.test(content);
                if (!hasNestedDataField) {
                    return openTag + escapedValue + closeTag;
                }
                
                // If has nested data-fields, preserve them and only replace text nodes
                return match; // Keep original if complex structure
            });
        });
        
        return processedHtml;
    }

    /**
     * Merge any user-provided assets into the ZIP archive so banners, galleries,
     * QR codes, etc. overwrite the defaults shipped with the template.
     */
    async function addUploadedImages(zip) {
        const config = templatesConfig[selectedTemplate];
        if (!config) return;
        
        const imageMapping = config.imageMapping || getDefaultImageMapping(selectedTemplate);

        // Handle single image uploads
        const singleImageCategories = ['logo', 'favicon', 'vtour'];
        for (const category of singleImageCategories) {
            if (uploadedImages[category] && imageMapping[category]) {
                const file = uploadedImages[category];
                // Use getImageTargetPath to get the correct file path (handles directories and patterns)
                let path = getImageTargetPath(imageMapping[category], 0);
                // Fallback: if path is a directory, append tour1.webp for vtour
                if (!path || path.endsWith('/')) {
                    if (category === 'vtour') {
                        const basePath = imageMapping[category].paths[0];
                        path = basePath.endsWith('/') ? `${basePath}tour1.webp` : `${basePath}/tour1.webp`;
                    } else {
                        path = imageMapping[category].paths[0];
                    }
                }
                const arrayBuffer = await file.arrayBuffer();
                zip.file(path, arrayBuffer);
            }
        }

        async function addMultipleCategory(category, mapping) {
            if (!uploadedImages[category] || !mapping) return;
            const files = toArray(uploadedImages[category]).filter(file => file instanceof File);
            if (!files.length) return;

            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const targetPath = getImageTargetPath(mapping, index);
                if (!targetPath) continue;
                const arrayBuffer = await file.arrayBuffer();
                zip.file(targetPath, arrayBuffer);
            }
        }

        await addMultipleCategory('banner', imageMapping.banner);
        await addMultipleCategory('mobBanner', imageMapping.mobBanner);

        // Handle multiple image uploads (must be async)
        if (uploadedImages['amenities'] && imageMapping.amenities) {
            // Ensure files is an array
            let files = uploadedImages['amenities'];
            if (!Array.isArray(files)) {
                // Convert FileList or single file to array
                files = files instanceof FileList ? Array.from(files) : [files];
            }
            
            const prefix = imageMapping.amenities.paths[0];
            console.log(`[ZIP] Processing ${files.length} amenities images with prefix: ${prefix}`);
            
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                if (!file || !(file instanceof File)) {
                    console.warn(`[ZIP] Skipping invalid file at index ${index}`);
                    continue;
                }
                
                const path = imageMapping.amenities.pattern 
                    ? `${prefix}${imageMapping.amenities.pattern.replace('{index}', index + 1)}`
                    : `${prefix}${index + 1}.webp`;
                console.log(`[ZIP] Adding amenities image ${index + 1}: ${path} (file size: ${file.size} bytes, type: ${file.type})`);
                try {
                const arrayBuffer = await file.arrayBuffer();
                zip.file(path, arrayBuffer);
                    console.log(`[ZIP] ✓ Successfully added: ${path}`);
                } catch (error) {
                    console.error(`[ZIP] ✗ Failed to add ${path}:`, error);
            }
            }
            console.log(`[ZIP] Total amenities images processed: ${files.length}`);
        }

        if (uploadedImages['gallery'] && imageMapping.gallery) {
            const files = uploadedImages['gallery'];
            const prefix = imageMapping.gallery.paths[0];
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const path = imageMapping.gallery.pattern 
                    ? `${prefix}${imageMapping.gallery.pattern.replace('{index}', index + 1)}`
                    : `${prefix}${index + 1}.webp`;
                const arrayBuffer = await file.arrayBuffer();
                zip.file(path, arrayBuffer);
            }
        }

        if (uploadedImages['qr'] && imageMapping.qr) {
            const files = toArray(uploadedImages['qr']).filter(file => file instanceof File);
            if (files.length) {
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    const targetPath = getImageTargetPath(imageMapping.qr, index);
                    if (!targetPath) continue;
                    const arrayBuffer = await file.arrayBuffer();
                    zip.file(targetPath, arrayBuffer);
                }
            }
        }
    }

    /**
     * Load template metadata from `templates.json` (or auto-discover as a fallback)
     * and populate the in-memory registry used by the dashboard UI.
     */
    async function initializeTemplates() {
        // Start with empty config
        templatesConfig = {};
        availableTemplates = [];
        
        // Ensure template selector element exists
        const selector = document.getElementById('templateSelector');
        if (!selector) {
            console.error('❌ Template selector element (#templateSelector) not found in DOM!');
            console.error('Make sure the HTML contains: <div class="template-selector" id="templateSelector"></div>');
            throw new Error('Template selector element not found in DOM');
        }
        
        // Show loading state
        selector.innerHTML = '<div class="loading-templates" style="padding: 20px; text-align: center; color: #b8c5d0;">Loading templates...</div>';
        
        // Load templates.json - this is the only source of templates
        try {
            const response = await fetch('templates.json');
            if (response.ok) {
                const jsonConfig = await response.json();
                templatesConfig = { ...jsonConfig };
                availableTemplates = Object.keys(templatesConfig);
                console.log('✓ Loaded templates from templates.json:', availableTemplates);
                console.log('✓ Templates config:', templatesConfig);
            } else {
                console.warn('⚠️ templates.json not found (status:', response.status, '), will try auto-discovery...');
                // Only auto-discover if templates.json doesn't exist
                const discoveredTemplates = await autoDiscoverTemplates();
                availableTemplates = discoveredTemplates;
                
                // Add default configs for discovered templates
                discoveredTemplates.forEach(templateId => {
                    if (!templatesConfig[templateId]) {
                        templatesConfig[templateId] = getDefaultTemplateConfig(templateId);
                        console.log(`✓ Added default config for ${templateId}`);
                    }
                });
            }
        } catch (error) {
            console.error('❌ Error loading templates.json:', error);
            console.warn('⚠️ Will try auto-discovery as fallback...');
            // Only auto-discover if templates.json can't be loaded
            try {
                const discoveredTemplates = await autoDiscoverTemplates();
                availableTemplates = discoveredTemplates;
                
                // Add default configs for discovered templates
                discoveredTemplates.forEach(templateId => {
                    if (!templatesConfig[templateId]) {
                        templatesConfig[templateId] = getDefaultTemplateConfig(templateId);
                        console.log(`✓ Added default config for ${templateId}`);
                    }
                });
            } catch (discoverError) {
                console.error('❌ Auto-discovery also failed:', discoverError);
            }
        }
        
        // Ensure we have at least template-1 if nothing was found
        if (availableTemplates.length === 0) {
            console.warn('⚠️ No templates found, using default template-1');
            availableTemplates = ['template-1'];
            templatesConfig['template-1'] = getDefaultTemplateConfig('template-1');
        }
        
        console.log('✓ Final available templates:', availableTemplates);
        console.log('✓ Templates config keys:', Object.keys(templatesConfig));
        
        if (pendingRestoredState && pendingRestoredState.selectedTemplate && availableTemplates.includes(pendingRestoredState.selectedTemplate)) {
            selectedTemplate = pendingRestoredState.selectedTemplate;
        }
        if (!availableTemplates.includes(selectedTemplate) && availableTemplates.length) {
            selectedTemplate = availableTemplates[0];
        }
        
        // Render template selector
        try {
            renderTemplateSelector();
        } catch (renderError) {
            console.error('❌ Error rendering template selector:', renderError);
            selector.innerHTML = `
                <div class="loading-templates" style="padding: 40px; text-align: center;">
                    <p style="color: #e5b973; font-size: 18px; margin-bottom: 10px;">⚠️ Error Loading Templates</p>
                    <p style="color: #b8c5d0; font-size: 14px; margin-bottom: 20px;">${renderError.message}</p>
                    <button class="btn" style="margin-top: 15px; width: auto; padding: 10px 20px;" onclick="location.reload()">Refresh Page</button>
                </div>
            `;
        }
    }

    /**
     * Best-effort fallback that scans the repo for `template-*` folders when
     * `templates.json` is unavailable, ensuring the dashboard still boots.
     */
    async function autoDiscoverTemplates() {
        // Try to discover templates by checking folders that match template-* pattern
        // Only used as fallback if templates.json doesn't exist
        const discoveredTemplates = [];
        
        // Only check templates 1-10 (not 20) as fallback
        const commonTemplates = [];
        for (let i = 1; i <= 10; i++) {
            commonTemplates.push(`template-${i}`);
        }
        
        for (const templateId of commonTemplates) {
            // Skip if already in config (from templates.json)
            if (templatesConfig[templateId]) {
                discoveredTemplates.push(templateId);
                continue;
            }
            
            try {
                const response = await fetch(`${templateId}/index.html`);
                if (response.ok) {
                    // Template exists, will be added to config later
                    discoveredTemplates.push(templateId);
                    console.log(`✓ Discovered template: ${templateId}`);
                }
            } catch (e) {
                // Template doesn't exist, skip
            }
        }
        
        if (discoveredTemplates.length > 0) {
            console.log(`✓ Auto-discovered ${discoveredTemplates.length} templates:`, discoveredTemplates);
        }
        
        return discoveredTemplates;
    }

    function getDefaultTemplateConfig(templateId) {
        return {
            name: templateId.replace('template-', 'Template ').replace(/\b\w/g, l => l.toUpperCase()),
            description: `${templateId} Real Estate Template`,
            thumbnail: `${templateId}/preview.webp`,
            htmlPath: `${templateId}/index.html`,
            cssPath: `${templateId}/assets/css/style.css`,
            jsPath: `${templateId}/assets/js/script.js`,
            assetBase: `${templateId}/assets`,
            bannerRootFiles: ['banner1.webp', 'mobBanner1.webp'],
            imageMapping: getDefaultImageMapping(templateId)
        };
    }

    function getDefaultImageMapping(templateId) {
        // Generic image mapping that works for most templates
        return {
            logo: {
                paths: [`assets/images/logo/logo.webp`],
                replacePatterns: ["/logo.webp", "logo.webp"]
            },
            banner: {
                paths: [`assets/images/banner/banner1.webp`],
                replacePatterns: ["banner1.webp", "/banner1.webp", "banner.png", "/banner.webp", "/banner.png"]
            },
            mobBanner: {
                paths: [`assets/images/banner/mobBanner1.webp`],
                replacePatterns: ["mobBanner1.webp", "/mobBanner1.webp", "banner-480.webp", "/banner-480.webp"]
            },
            amenities: {
                paths: [`assets/images/amenities/`],
                replacePatterns: ["/amenities/"],
                multiple: true,
                pattern: "a{index}.webp"
            },
            gallery: {
                paths: [`assets/images/gallery/`],
                replacePatterns: ["/gallery/"],
                multiple: true,
                pattern: "g{index}.webp"
            },
            vtour: {
                paths: [`assets/images/vtour/tour1.webp`],
                replacePatterns: ["/vtour/", "/banner/banner.webp"]
            },
            qr: {
                paths: [`assets/images/qr/qr`],
                replacePatterns: ["/qr.webp", "/qr"],
                multiple: true,
                pattern: "qr{index}.webp"
            },
            favicon: {
                paths: [`assets/images/logo/favicon.ico`],
                replacePatterns: []
            }
        };
    }

    function renderTemplateSelector() {
        const selector = document.getElementById('templateSelector');
        if (!selector) {
            console.error('Template selector element not found!');
            return;
        }
        
        console.log('renderTemplateSelector called - availableTemplates:', availableTemplates.length, availableTemplates);
        console.log('templatesConfig keys:', Object.keys(templatesConfig));
        
        if (availableTemplates.length === 0) {
            console.warn('No templates available to render');
            selector.innerHTML = `
                <div class="loading-templates" style="padding: 40px; text-align: center;">
                    <p style="color: #e5b973; font-size: 18px; margin-bottom: 10px;">⚠️ No Templates Found</p>
                    <p style="color: #b8c5d0; font-size: 14px; margin-bottom: 20px;">Add template folders (template-1, template-2, etc.) or update templates.json</p>
                    <button class="btn" style="margin-top: 15px; width: auto; padding: 10px 20px;" onclick="location.reload()">Refresh</button>
                </div>
            `;
            return;
        }
        
        console.log('Rendering template selector with', availableTemplates.length, 'templates');
        
        // Clear selector but show loading state first
        selector.innerHTML = '<div class="loading-templates" style="padding: 20px; text-align: center; color: #b8c5d0;">Rendering templates...</div>';
        
        // Use a document fragment to build all templates first, then append at once
        const fragment = document.createDocumentFragment();
        let renderedCount = 0;
        
        availableTemplates.forEach(templateId => {
            try {
                const config = templatesConfig[templateId];
                if (!config) {
                    console.warn('No config found for template:', templateId);
                    return;
                }
                
                console.log('Rendering template option:', templateId, config);
                const option = document.createElement('div');
                option.className = `template-option ${selectedTemplate === templateId ? 'active' : ''}`;
                option.dataset.template = templateId;
                option.style.cursor = 'pointer'; // Ensure cursor shows it's clickable
            
            // Try to load thumbnail, fallback to placeholder
            const thumbnailSrc = config.thumbnail || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect width="200" height="150" fill="%23152338"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23e5b973" font-size="16"%3ETemplate%3C/text%3E%3C/svg%3E';
            
            option.innerHTML = `
                <div class="template-info">
                    <img src="${thumbnailSrc}" alt="${config.name}" class="template-thumbnail" 
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect width=%22200%22 height=%22150%22 fill=%22%23152338%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23e5b973%22 font-size=%2216%22%3E${config.name}%3C/text%3E%3C/svg%3E'">
                    <h3>${config.name}</h3>
                    <p style="color: #b8c5d0; font-size: 14px;">${config.description}</p>
                </div>
            `;
            
            // Handle thumbnail click - show preview
            const thumbnail = option.querySelector('.template-thumbnail');
            if (thumbnail) {
                thumbnail.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showTemplatePreview(thumbnailSrc, config.name);
                });
            }
            
            // Use both click and pointer events to ensure it works
            const handleTemplateSelect = (e) => {
                // Don't trigger if clicking on thumbnail
                if (e.target.classList.contains('template-thumbnail')) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Template selected:', templateId);
                
                // Update selected template
                document.querySelectorAll('.template-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                option.classList.add('active');
                selectedTemplate = templateId;
                templateAssetCache.clear();
                
                // Clear cached content
                templateContent = null;
                parsedData = null;
                uploadedImages = {};
                clearCachedImages();
                dataFileInfo = null;
                updateFileInfoDisplay();
                
                // Reset UI - access elements directly to avoid scope issues
                const fileInfoEl = document.getElementById('fileInfo');
                const previewSectionEl = document.getElementById('previewSection');
                const generateBtnEl = document.getElementById('generateBtn');
                const previewBtnEl = document.getElementById('previewBtn');
                
                if (fileInfoEl) {
                    fileInfoEl.classList.remove('active');
                    const fileNameEl = document.getElementById('fileName');
                    const fileSizeEl = document.getElementById('fileSize');
                    if (fileNameEl) fileNameEl.textContent = '';
                    if (fileSizeEl) fileSizeEl.textContent = '';
                }
                if (previewSectionEl) previewSectionEl.classList.remove('active');
                if (generateBtnEl) generateBtnEl.disabled = true;
                if (previewBtnEl) previewBtnEl.disabled = true;
                
                // Clear file input
                const fileInputEl = document.getElementById('fileInput');
                if (fileInputEl) fileInputEl.value = '';
                if (googleDocsUrlInput) googleDocsUrlInput.value = '';
                
                // Clear image uploads
                document.querySelectorAll('.image-upload-box').forEach(box => {
                    const preview = box.querySelector('.image-preview');
                    const removeBtn = box.querySelector('.image-remove');
                    const input = box.querySelector('input[type="file"]');
                    if (preview) {
                        preview.innerHTML = '';
                        preview.classList.remove('active');
                    }
                    if (removeBtn) removeBtn.style.display = 'none';
                    if (input) input.value = '';
                    box.classList.remove('has-image');
                });
                
                console.log('✓ Template changed to:', selectedTemplate);
                showStatus(`Template changed to ${config.name}`, 'success');
                setTimeout(() => hideStatus(), 2000);
                scheduleStateSave();
            };
            
            // Add multiple event listeners to ensure it works
            option.addEventListener('click', handleTemplateSelect);
            option.addEventListener('mousedown', (e) => {
                if (e.button === 0) { // Left mouse button
                    handleTemplateSelect(e);
                }
            });
            
            fragment.appendChild(option);
            renderedCount++;
            } catch (error) {
                console.error(`Error rendering template ${templateId}:`, error);
            }
        });
        
        // If no templates were rendered, show error message
        if (renderedCount === 0) {
            selector.innerHTML = `
                <div class="loading-templates" style="padding: 40px; text-align: center;">
                    <p style="color: #e5b973; font-size: 18px; margin-bottom: 10px;">⚠️ Error Rendering Templates</p>
                    <p style="color: #b8c5d0; font-size: 14px; margin-bottom: 20px;">Templates were loaded but could not be rendered. Check console for details.</p>
                    <button class="btn" style="margin-top: 15px; width: auto; padding: 10px 20px;" onclick="location.reload()">Refresh Page</button>
                </div>
            `;
            return;
        }
        
        console.log(`✓ Successfully rendered ${renderedCount} templates`);
        
        // Clear the loading message and append all templates at once
        selector.innerHTML = '';
        selector.appendChild(fragment);
        
        // Add a refresh button
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'btn btn-secondary';
        refreshBtn.textContent = '🔄 Refresh Templates';
        refreshBtn.style.marginTop = '20px';
        refreshBtn.style.width = 'auto';
        refreshBtn.style.padding = '10px 20px';
        refreshBtn.addEventListener('click', async () => {
            showStatus('Refreshing templates...', 'success');
            availableTemplates = [];
            templatesConfig = {};
            await initializeTemplates();
            await loadSavedState();
            showStatus('Templates refreshed!', 'success');
            setTimeout(() => hideStatus(), 2000);
        });
        selector.appendChild(refreshBtn);
    }

    // Helper function to add GTM code to any HTML document
    function addGTMToHTML(htmlString) {
        if (!gtmHeadCode && !gtmBodyCode) {
            return htmlString; // No GTM code to add
        }
        
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        
        // Add Google Tag Manager to head tag (at the start)
        if (gtmHeadCode) {
            const head = doc.querySelector('head');
            if (head) {
                // Create a temporary container to parse the GTM code
                const tempDiv = doc.createElement('div');
                tempDiv.innerHTML = gtmHeadCode;
                
                // Get all child nodes (including comments, scripts, etc.)
                const gtmHeadNodes = Array.from(tempDiv.childNodes);
                
                // Insert nodes at the beginning of head (in reverse order to maintain sequence)
                for (let i = gtmHeadNodes.length - 1; i >= 0; i--) {
                    const node = gtmHeadNodes[i];
                    // Clone the node to avoid issues
                    const clonedNode = node.cloneNode(true);
                    head.insertBefore(clonedNode, head.firstChild);
                }
            }
        }
        
        // Add Google Tag Manager to body tag (at the start)
        if (gtmBodyCode) {
            const body = doc.querySelector('body');
            if (body) {
                // Create a temporary container to parse the GTM code
                const tempDiv = doc.createElement('div');
                tempDiv.innerHTML = gtmBodyCode;
                
                // Get all child nodes (including comments, noscript, etc.)
                const gtmBodyNodes = Array.from(tempDiv.childNodes);
                
                // Insert nodes at the beginning of body (in reverse order to maintain sequence)
                for (let i = gtmBodyNodes.length - 1; i >= 0; i--) {
                    const node = gtmBodyNodes[i];
                    // Clone the node to avoid issues
                    const clonedNode = node.cloneNode(true);
                    body.insertBefore(clonedNode, body.firstChild);
                }
            }
        }
        
        // Convert DOM back to HTML string
        return doc.documentElement.outerHTML;
    }

    async function generateMicrositeHTML() {
        const config = templatesConfig[selectedTemplate];
        if (!config) {
            throw new Error(`Template configuration not found: ${selectedTemplate}`);
        }
        
        // Load template
        if (!templateContent) {
            try {
                const response = await fetch(config.htmlPath);
                if (!response.ok) {
                    throw new Error('Template fetch failed. Please open dashboard.html via a local web server.');
                }
                templateContent = await response.text();
            } catch (error) {
                throw new Error(`Failed to load template: ${error.message}`);
            }
        }
        
        // Load CSS and JS files
        let cssContent = '';
        let jsContent = '';
        
        try {
            const cssResponse = await fetch(config.cssPath);
            if (cssResponse.ok) {
                cssContent = await cssResponse.text();
            }
        } catch (error) {
            console.warn('Could not load CSS file:', error);
        }
        
        try {
            const jsResponse = await fetch(config.jsPath);
            if (jsResponse.ok) {
                jsContent = await jsResponse.text();
            }
        } catch (error) {
            console.warn('Could not load JS file:', error);
        }
        
        // Clone the template
        let html = templateContent;
        
        // Replace all data-field attributes - handle text content
        // First pass: direct field name matching
        Object.keys(parsedData).forEach(fieldName => {
            const value = parsedData[fieldName];
            if (!value || !value.trim()) return;
            
            // *** IMPORTANT: Skip location and price fields - handled by DOM manipulation later ***
            // Location fields (both old and new format)
            if (fieldName.startsWith('location_value_') || 
                fieldName.startsWith('location_connectivity_') ||
                fieldName.includes('_value_') && fieldName.includes('location_connectivity_') ||
                fieldName.includes('_distance_') && fieldName.includes('location_connectivity_')) {
                return;
            }
            // Price fields - handled by DOM manipulation for better reliability
            if (fieldName.startsWith('price_') && 
                (fieldName.endsWith('_type') || fieldName.endsWith('_area') || 
                 fieldName.endsWith('_price') || fieldName.endsWith('_value'))) {
                return;
            }
            
            // Handle meta tags with content attribute (special case)
            html = html.replace(
                new RegExp(
                    `(<meta[^>]*data-field=["']${escapeRegex(fieldName)}["'][^>]*content=["'])([^"']*)(["'][^>]*>)`,
                    'gi'
                ),
                `$1${escapeHtml(value.trim())}$3`
            );
            
            // Handle title tag (special case)
            html = html.replace(
                new RegExp(
                    `(<title[^>]*data-field=["']${escapeRegex(fieldName)}["'][^>]*>)([^<]*?)(</title>)`,
                    'gi'
                ),
                `$1${escapeHtml(value.trim())}$3`
            );
            
            // Handle other elements with data-field attribute
            // IMPORTANT: If element contains nested data-field elements, preserve them
            const escapedFieldName = escapeRegex(fieldName);
            const escapedValue = escapeHtml(value.trim());
            
            const elementRegex = new RegExp(
                `(<([a-zA-Z][a-zA-Z0-9]*)[^>]*data-field=["']${escapedFieldName}["'][^>]*>)([\\s\\S]*?)(</\\2>)`,
                'gi'
            );
            
            html = html.replace(elementRegex, (match, openTag, tagName, content, closeTag) => {
                // Don't replace if it's inside script/style tags
                if (openTag.includes('<script') || openTag.includes('<style')) {
                    return match;
                }
                
                // Check if content has nested data-field attributes - if so, preserve them
                const hasNestedDataField = /data-field=["']/.test(content);
                if (hasNestedDataField) {
                    // Parse this element's content to DOM to preserve nested elements
                    const tempParser = new DOMParser();
                    const tempDoc = tempParser.parseFromString(`<div>${content}</div>`, 'text/html');
                    const tempDiv = tempDoc.body.firstChild;
                    
                    // Collect all direct child nodes
                    const children = Array.from(tempDiv.childNodes);
                    const textParts = [];
                    const hasNestedElements = children.some(child => 
                        child.nodeType === 1 && child.hasAttribute && child.hasAttribute('data-field')
                    );
                    
                    if (hasNestedElements) {
                        // Has nested data-field elements - only replace text nodes, preserve nested elements
                        const newChildren = [];
                        let foundFirstText = false;
                        
                        for (const child of children) {
                            if (child.nodeType === 1) {
                                // Element node - preserve it (including nested data-field elements)
                                newChildren.push(child);
                            } else if (child.nodeType === 3) {
                                // Text node - replace first text with value, remove others
                                if (!foundFirstText) {
                                    child.textContent = value.trim();
                                    newChildren.push(child);
                                    foundFirstText = true;
                                }
                                // Skip subsequent text nodes (they'll be empty)
                            }
                        }
                        
                        // If no text node found, prepend text before first element
                        if (!foundFirstText && newChildren.length > 0) {
                            const textNode = tempDoc.createTextNode(value.trim());
                            tempDiv.insertBefore(textNode, newChildren[0]);
                        } else if (!foundFirstText && newChildren.length === 0) {
                            // No children, just add text
                            tempDiv.textContent = value.trim();
                        }
                        
                        const newContent = tempDiv.innerHTML;
                        return openTag + newContent + closeTag;
                    } else {
                        // No nested data-field elements, safe to replace all content
                return openTag + escapedValue + closeTag;
                    }
                } else {
                    // No nested data-fields, safe to replace all content
                    return openTag + escapedValue + closeTag;
                }
            });
        });
        
        // Second pass: handle data-field-alt fallback
        // If a field with data-field-alt doesn't have its primary field, use the alt field
        const altFieldRegex = /data-field=["']([^"']+)["'][^>]*data-field-alt=["']([^"']+)["']/gi;
        let match;
        while ((match = altFieldRegex.exec(html)) !== null) {
            const primaryField = match[1];
            const altField = match[2];
            
            // If primary field doesn't exist but alt field does, use alt field value
            if (!parsedData[primaryField] && parsedData[altField]) {
                const value = parsedData[altField].trim();
                if (value) {
                    const elementRegex = new RegExp(
                        `(<[^>]*data-field=["']${escapeRegex(primaryField)}["'][^>]*data-field-alt=["']${escapeRegex(altField)}["'][^>]*>)([^<]*?)(</[^>]*>)`,
                        'gi'
                    );
                    html = html.replace(elementRegex, (match, openTag, oldContent, closeTag) => {
                        if (openTag.includes('<script') || openTag.includes('<style')) {
                            return match;
                        }
                        return openTag + escapeHtml(value) + closeTag;
                    });
                }
            }
        }
        
        // Handle location dropdowns using DOM manipulation (much more reliable than regex)
        // Re-parse HTML since we converted it back to string above
        doc = new DOMParser().parseFromString(html, 'text/html');
        
        // Note: GTM will be added at the end of generateMicrositeHTML() after all DOM processing
        
        // ========== DYNAMIC ELEMENT CREATION ==========
        // Create elements dynamically based on data - no need for display:none!
        
        // Helper function to create dynamic elements
        function createDynamicElements(containerSelector, templateSelector, dataPattern, maxItems = 10) {
            const container = doc.querySelector(containerSelector);
            if (!container) return;
            
            // Find template element (first element with data-field matching pattern)
            const template = doc.querySelector(templateSelector);
            if (!template) return;
            
            // Collect all data items
            const items = [];
            for (let i = 1; i <= maxItems; i++) {
                const field = dataPattern.replace('{index}', i);
                const value = parsedData[field] ? parsedData[field].trim() : null;
                if (value) {
                    items.push({ index: i, field, value });
                }
            }
            
            // Remove all existing elements (except template)
            const existingElements = container.querySelectorAll(`[data-field^="${dataPattern.replace('{index}', '')}"]`);
            existingElements.forEach(el => {
                if (el !== template) {
                    el.remove();
                }
            });
            
            // Create new elements for each data item
            items.forEach(item => {
                const clone = template.cloneNode(true);
                clone.setAttribute('data-field', item.field);
                clone.textContent = item.value;
                // Remove any display:none style
                clone.style.display = '';
                clone.removeAttribute('style');
                container.appendChild(clone);
            });
            
            // Hide template if it's not being used
            if (template.hasAttribute('data-field')) {
                const templateField = template.getAttribute('data-field');
                const hasTemplateData = items.some(item => item.field === templateField);
                if (!hasTemplateData) {
                    template.style.display = 'none';
                }
            }
        }
        
        // Handle offers dynamically
        const offersContainer = doc.querySelector('.bannerOffer, .offerBoxContainer');
        if (offersContainer) {
            // Find the offer dotted section (for template-3, this is what we hide when no offers)
            const offerDottedSection = offersContainer.querySelector('.offerBoxDottedSection');
            
            // Find first offer element as template
            const offerTemplate = offersContainer.querySelector('.offerText[data-field^="offer_"]') || 
                                 offersContainer.querySelector('.offerText[data-field^="offer_"]') ||
                                 offersContainer.querySelector('.offerBoxManhattanStyle.offerText[data-field^="offer_"]') ||
                                 offersContainer.querySelector('.offerText');
            
            if (offerTemplate) {
                // Collect all offer data
                const offers = [];
                for (let i = 1; i <= 10; i++) {
                    const field = `offer_${i}`;
                    const value = parsedData[field] ? parsedData[field].trim() : null;
                    if (value) {
                        offers.push({ index: i, field, value });
                    }
                }
                
                // If no offers, hide only the dotted section (not the entire container)
                if (offers.length === 0) {
                    if (offerDottedSection) {
                        offerDottedSection.style.display = 'none';
                    }
                } else {
                    // Show the dotted section if it was hidden
                    if (offerDottedSection) {
                        offerDottedSection.style.display = '';
                        offerDottedSection.removeAttribute('style');
                    }
                    
                    // Remove all existing offers (except template if it's the first one)
                    const existingOffers = offersContainer.querySelectorAll('.offerText[data-field^="offer_"], .offerBoxManhattanStyle[data-field^="offer_"]');
                    existingOffers.forEach(el => {
                        // Keep template only if it matches offer_1 (first offer)
                        if (el !== offerTemplate) {
                            el.remove();
                        }
                    });
                    
                    // Create new offer elements for all offers
                    offers.forEach(offer => {
                        // Check if template matches this offer
                        if (offerTemplate.hasAttribute('data-field') && 
                            offerTemplate.getAttribute('data-field') === offer.field) {
                            // Update template instead of creating new
                            offerTemplate.textContent = offer.value;
                            offerTemplate.style.display = '';
                            offerTemplate.removeAttribute('style');
                        } else {
                            // Create new element
                            const clone = offerTemplate.cloneNode(true);
                            clone.setAttribute('data-field', offer.field);
                            clone.textContent = offer.value;
                            clone.style.display = '';
                            clone.removeAttribute('style');
                            // Insert into the dotted section or appropriate container
                            if (offerDottedSection && offer.index > 1) {
                                offerDottedSection.appendChild(clone);
                            } else if (offerDottedSection) {
                                // For first offer, update the existing one in dotted section
                                const existingInSection = offerDottedSection.querySelector('.offerText[data-field^="offer_"]');
                                if (existingInSection) {
                                    existingInSection.textContent = offer.value;
                                }
                            } else {
                                offersContainer.appendChild(clone);
                            }
                        }
                    });
                    
                    // Hide template if it doesn't have data
                    if (offerTemplate.hasAttribute('data-field')) {
                        const templateField = offerTemplate.getAttribute('data-field');
                        const hasTemplateData = offers.some(o => o.field === templateField);
                        if (!hasTemplateData) {
                            offerTemplate.style.display = 'none';
                        }
                    } else {
                        // Template doesn't have data-field, hide it
                        offerTemplate.style.display = 'none';
                    }
                }
            }
        }
        
        // Handle highlights dynamically
        const highlightsList = doc.querySelector('.highlightsList, .highlight-list');
        if (highlightsList) {
            // Find first highlight element as template
            const highlightTemplate = highlightsList.querySelector('li[data-field^="highlight_"]') || 
                                     highlightsList.querySelector('li');
            
            if (highlightTemplate) {
                // Collect all highlight data
                const highlights = [];
                for (let i = 1; i <= 10; i++) {
                    const field = `highlight_${i}`;
                    const value = parsedData[field] ? parsedData[field].trim() : null;
                    if (value) {
                        highlights.push({ index: i, field, value });
                    }
                }
                
                // Remove all existing highlights (except template)
                const existingHighlights = highlightsList.querySelectorAll('li[data-field^="highlight_"]');
                existingHighlights.forEach(el => {
                    if (el !== highlightTemplate) {
                        el.remove();
                    }
                });
                
                // Create new highlight elements
                highlights.forEach(highlight => {
                    // Check if template matches this highlight
                    if (highlightTemplate.hasAttribute('data-field') && 
                        highlightTemplate.getAttribute('data-field') === highlight.field) {
                        // Update template instead of creating new
                        highlightTemplate.textContent = highlight.value;
                        highlightTemplate.style.display = '';
                        highlightTemplate.removeAttribute('style');
                    } else {
                        // Create new element
                        const clone = highlightTemplate.cloneNode(true);
                        clone.setAttribute('data-field', highlight.field);
                        clone.textContent = highlight.value;
                        clone.style.display = '';
                        clone.removeAttribute('style');
                        highlightsList.appendChild(clone);
                    }
                });
                
                // Hide template if it doesn't have data
                if (highlightTemplate.hasAttribute('data-field')) {
                    const templateField = highlightTemplate.getAttribute('data-field');
                    const hasTemplateData = highlights.some(h => h.field === templateField);
                    if (!hasTemplateData) {
                        highlightTemplate.style.display = 'none';
                    }
                } else {
                    // Template doesn't have data-field, hide it
                    highlightTemplate.style.display = 'none';
                }
            }
        }
        
        // Handle price table rows dynamically (for template-3)
        const priceTable = doc.querySelector('.price-table');
        if (priceTable) {
            // Find first price row as template (skip header row)
            const priceRowTemplate = priceTable.querySelector('tr[data-field*="price_"]') ||
                                   priceTable.querySelector('tr:not(.tableHeadings):not(thead tr)');
            
            if (priceRowTemplate && !priceRowTemplate.classList.contains('tableHeadings')) {
                // Collect all price row data
                const priceRows = [];
                for (let i = 1; i <= 10; i++) {
                    const typeField = `price_${i}_type`;
                    const areaField = `price_${i}_area`;
                    const priceField = `price_${i}_price`;
                    
                    // Also check for alternative field names
                    const typeValue = parsedData[typeField]?.trim() || 
                                    parsedData[`price_type_${i}`]?.trim() || null;
                    const areaValue = parsedData[areaField]?.trim() || 
                                    parsedData[`price_area_${i}`]?.trim() || null;
                    const priceValue = parsedData[priceField]?.trim() || 
                                     parsedData[`price_value_${i}`]?.trim() || null;
                    
                    if (typeValue || areaValue || priceValue) {
                        priceRows.push({
                            index: i,
                            type: typeValue,
                            area: areaValue,
                            price: priceValue,
                            typeField: typeField,
                            areaField: areaField,
                            priceField: priceField
                        });
                    }
                }
                
                // Remove all existing price rows (except template and header)
                const existingRows = priceTable.querySelectorAll('tr:not(.tableHeadings):not(thead tr)');
                existingRows.forEach(row => {
                    if (row !== priceRowTemplate) {
                        row.remove();
                    }
                });
                
                // Create new price row elements
                priceRows.forEach(row => {
                    // Check if template matches this row
                    const templateTypeEl = priceRowTemplate.querySelector(`[data-field*="price_"][data-field*="_type"]`);
                    let isTemplate = false;
                    if (templateTypeEl && templateTypeEl.hasAttribute('data-field')) {
                        const templateField = templateTypeEl.getAttribute('data-field');
                        const templateNum = templateField.match(/\d+/);
                        isTemplate = templateNum && parseInt(templateNum[0]) === row.index;
                    }
                    
                    if (isTemplate) {
                        // Update template instead of creating new
                        const typeEl = priceRowTemplate.querySelector(`[data-field*="price_"][data-field*="_type"]`);
                        const areaEl = priceRowTemplate.querySelector(`[data-field*="price_"][data-field*="_area"]`);
                        const priceEl = priceRowTemplate.querySelector(`[data-field*="price_"][data-field*="_price"]`) ||
                                      priceRowTemplate.querySelector(`[data-field*="price_value"]`);
                        
                        if (typeEl) {
                            typeEl.setAttribute('data-field', row.typeField);
                            typeEl.textContent = row.type || '';
                        }
                        if (areaEl) {
                            areaEl.setAttribute('data-field', row.areaField);
                            // Add "Sq.ft" if not present and area is numeric
                            let areaText = row.area || '';
                            if (areaText && !isNaN(parseFloat(areaText)) && !areaText.includes('Sq')) {
                                areaText = areaText + ' Sq.ft';
                            }
                            areaEl.textContent = areaText;
                        }
                        if (priceEl) {
                            priceEl.setAttribute('data-field', row.priceField);
                            priceEl.textContent = row.price || '';
                        }
                        priceRowTemplate.style.display = '';
                        priceRowTemplate.removeAttribute('style');
                    } else {
                        // Create new row
                        const clone = priceRowTemplate.cloneNode(true);
                        clone.style.display = '';
                        clone.removeAttribute('style');
                        
                        // Update all data-field attributes and content
                        const typeEl = clone.querySelector(`[data-field*="price_"][data-field*="_type"]`);
                        const areaEl = clone.querySelector(`[data-field*="price_"][data-field*="_area"]`);
                        const priceEl = clone.querySelector(`[data-field*="price_"][data-field*="_price"]`) ||
                                      clone.querySelector(`[data-field*="price_value"]`);
                        
                        if (typeEl) {
                            typeEl.setAttribute('data-field', row.typeField);
                            typeEl.textContent = row.type || '';
                        }
                        if (areaEl) {
                            areaEl.setAttribute('data-field', row.areaField);
                            // Add "Sq.ft" if not present and area is numeric
                            let areaText = row.area || '';
                            if (areaText && !isNaN(parseFloat(areaText)) && !areaText.includes('Sq')) {
                                areaText = areaText + ' Sq.ft';
                            }
                            areaEl.textContent = areaText;
                        }
                        if (priceEl) {
                            priceEl.setAttribute('data-field', row.priceField);
                            priceEl.textContent = row.price || '';
                        }
                        
                        priceTable.appendChild(clone);
                    }
                });
                
                // Hide template if it doesn't have data
                const templateTypeEl = priceRowTemplate.querySelector(`[data-field*="price_"][data-field*="_type"]`);
                if (templateTypeEl && templateTypeEl.hasAttribute('data-field')) {
                    const templateField = templateTypeEl.getAttribute('data-field');
                    const templateNum = templateField.match(/\d+/);
                    const hasTemplateData = templateNum && priceRows.some(r => r.index === parseInt(templateNum[0]));
                    if (!hasTemplateData) {
                        priceRowTemplate.style.display = 'none';
                    }
                } else {
                    // Template doesn't have matching data-field, hide it
                    priceRowTemplate.style.display = 'none';
                }
            }
        }
        
        // Handle price cards dynamically
        const priceContainer = doc.querySelector('.price-container');
        if (priceContainer) {
            // Find first price card as template
            const priceCardTemplate = priceContainer.querySelector('.price-card[data-field*="price_"]') ||
                                    priceContainer.querySelector('.price-card');
            
            if (priceCardTemplate) {
                // Collect all price card data
                const priceCards = [];
                for (let i = 1; i <= 10; i++) {
                    const typeField = `price_${i}_type`;
                    const areaField = `price_${i}_area`;
                    const priceField = `price_${i}_price`;
                    
                    // Also check for alternative field names
                    const typeValue = parsedData[typeField]?.trim() || 
                                    parsedData[`price_type_${i}`]?.trim() || null;
                    const areaValue = parsedData[areaField]?.trim() || 
                                    parsedData[`price_area_${i}`]?.trim() || null;
                    const priceValue = parsedData[priceField]?.trim() || 
                                     parsedData[`price_value_${i}`]?.trim() || 
                                     parsedData[`price_${i}_value`]?.trim() || null;
                    
                    if (typeValue || areaValue || priceValue) {
                        priceCards.push({
                            index: i,
                            type: typeValue,
                            area: areaValue,
                            price: priceValue,
                            typeField: typeField,
                            areaField: areaField,
                            priceField: priceField
                        });
                    }
                }
                
                // Remove all existing price cards (except template)
                const existingCards = priceContainer.querySelectorAll('.price-card');
                existingCards.forEach(card => {
                    if (card !== priceCardTemplate) {
                        card.remove();
                    }
                });
                
                // Create new price card elements
                priceCards.forEach(card => {
                    // Check if template matches this card (check first field number)
                    const templateTypeEl = priceCardTemplate.querySelector(`[data-field*="price_"][data-field*="_type"]`);
                    let isTemplate = false;
                    if (templateTypeEl && templateTypeEl.hasAttribute('data-field')) {
                        const templateField = templateTypeEl.getAttribute('data-field');
                        const templateNum = templateField.match(/\d+/);
                        isTemplate = templateNum && parseInt(templateNum[0]) === card.index;
                    }
                    
                    if (isTemplate) {
                        // Update template instead of creating new
                        const typeEl = priceCardTemplate.querySelector(`[data-field*="price_"][data-field*="_type"]`);
                        const areaEl = priceCardTemplate.querySelector(`[data-field*="price_"][data-field*="_area"]`);
                        const priceEl = priceCardTemplate.querySelector(`[data-field*="price_"][data-field*="_price"]`) ||
                                      priceCardTemplate.querySelector(`[data-field*="price_value"]`);
                        
                        if (typeEl) {
                            typeEl.setAttribute('data-field', card.typeField);
                            typeEl.textContent = card.type || '';
                        }
                        if (areaEl) {
                            areaEl.setAttribute('data-field', card.areaField);
                            areaEl.textContent = card.area || '';
                        }
                        if (priceEl) {
                            priceEl.setAttribute('data-field', card.priceField);
                            priceEl.textContent = card.price || '';
                        }
                        priceCardTemplate.style.display = '';
                        priceCardTemplate.removeAttribute('style');
            } else {
                        // Create new card
                        const clone = priceCardTemplate.cloneNode(true);
                        clone.style.display = '';
                        clone.removeAttribute('style');
                        
                        // Update all data-field attributes and content
                        const typeEl = clone.querySelector(`[data-field*="price_"][data-field*="_type"]`) ||
                                     clone.querySelector(`[data-field="${card.typeField}"]`) ||
                                     clone.querySelector(`[data-field="price_type_${card.index}"]`);
                        const areaEl = clone.querySelector(`[data-field*="price_"][data-field*="_area"]`) ||
                                     clone.querySelector(`[data-field="${card.areaField}"]`) ||
                                     clone.querySelector(`[data-field="price_area_${card.index}"]`);
                        const priceEl = clone.querySelector(`[data-field*="price_"][data-field*="_price"]`) ||
                                      clone.querySelector(`[data-field="${card.priceField}"]`) ||
                                      clone.querySelector(`[data-field="price_value_${card.index}"]`);
                        
                        if (typeEl) {
                            typeEl.setAttribute('data-field', card.typeField);
                            typeEl.textContent = card.type || '';
                        }
                        if (areaEl) {
                            areaEl.setAttribute('data-field', card.areaField);
                            areaEl.textContent = card.area || '';
                        }
                        if (priceEl) {
                            priceEl.setAttribute('data-field', card.priceField);
                            priceEl.textContent = card.price || '';
                        }
                        
                        priceContainer.appendChild(clone);
                    }
                });
                
                // Hide template if it doesn't have data
                const templateTypeEl = priceCardTemplate.querySelector(`[data-field*="price_"][data-field*="_type"]`);
                if (templateTypeEl && templateTypeEl.hasAttribute('data-field')) {
                    const templateField = templateTypeEl.getAttribute('data-field');
                    const templateNum = templateField.match(/\d+/);
                    const hasTemplateData = templateNum && priceCards.some(c => c.index === parseInt(templateNum[0]));
                    if (!hasTemplateData) {
                        priceCardTemplate.style.display = 'none';
                    }
                        } else {
                    // Template doesn't have matching data-field, hide it
                    priceCardTemplate.style.display = 'none';
                }
            }
        }
        
        // Handle location tabs dynamically for template-3 (tabs structure)
        const tabsContainer = doc.querySelector('.tabs');
        if (tabsContainer) {
            // Find first tab as template
            const tabTemplate = tabsContainer.querySelector('.tab');
            
            if (tabTemplate) {
                // Collect all tabs that have data
                const tabsData = [];
                
                for (let i = 1; i <= 10; i++) {
                    const connectivityField = `location_connectivity_${i}`;
                    const connectivityData = parsedData[connectivityField] ? parsedData[connectivityField].trim() : null;
                    
                    // Collect items for this tab
                    const items = [];
                    for (let m = 1; m <= 15; m++) {
                        const valueField = `location_connectivity_${i}_value_${m}`;
                        const distanceField = `location_connectivity_${i}_distance_${m}`;
                        const valueData = parsedData[valueField] ? parsedData[valueField].trim() : null;
                        const distanceData = parsedData[distanceField] ? parsedData[distanceField].trim() : null;
                        
                        if (valueData || distanceData) {
                            items.push({
                                index: m,
                                value: valueData,
                                distance: distanceData,
                                valueField: valueField,
                                distanceField: distanceField
                            });
                        }
                    }
                    
                    // If tab has title or items, add it
                    if (connectivityData || items.length > 0) {
                        tabsData.push({
                            index: i,
                            title: connectivityData || 'Connectivity',
                            items: items,
                            connectivityField: connectivityField
                        });
                    }
                }
                
                console.log(`[Location Tabs] Found ${tabsData.length} tabs with data`);
                
                // Remove all existing tabs (except template)
                const existingTabs = tabsContainer.querySelectorAll('.tab');
                existingTabs.forEach(tab => {
                    if (tab !== tabTemplate) {
                        tab.remove();
                    }
                });
                
                // Create tabs dynamically
                tabsData.forEach((tabData, idx) => {
                    // Check if template matches this tab (first tab uses template if it matches)
                    const templateLabel = tabTemplate.querySelector(`.tab-label[data-field^="location_connectivity_"]`);
                    let isTemplate = false;
                    if (templateLabel && templateLabel.hasAttribute('data-field')) {
                        const templateField = templateLabel.getAttribute('data-field');
                        isTemplate = (idx === 0 && templateField === tabData.connectivityField) || 
                                   (idx === 0 && !tabsData.some(t => t.connectivityField === templateField));
                    }
                    
                    let tabEl;
                    if (isTemplate) {
                        // Use template for first tab
                        tabEl = tabTemplate;
                        tabEl.style.display = '';
                        tabEl.removeAttribute('style');
                        
                        // Update label
                        if (templateLabel) {
                            templateLabel.textContent = tabData.title;
                        }
                        
                        // Get tab content container for template
                        let contentEl = tabEl.querySelector('.tab-content');
                        if (!contentEl) {
                            contentEl = doc.createElement('div');
                            contentEl.className = 'tab-content';
                            tabEl.appendChild(contentEl);
                        }
                        
                        // Clear existing content and rebuild
                        contentEl.innerHTML = '';
                        
                        // Create tab content items dynamically for template too
                        if (tabData.items.length > 0) {
                            tabData.items.forEach((item, itemIdx) => {
                                const icon = doc.createElement('i');
                                icon.className = 'fa-solid fa-caret-right';
                                
                                const valueSpan = doc.createElement('span');
                                valueSpan.setAttribute('data-field', item.valueField);
                                valueSpan.textContent = item.value || '';
                                
                                const separator = doc.createTextNode(' - ');
                                
                                const distanceSpan = doc.createElement('span');
                                distanceSpan.setAttribute('data-field', item.distanceField);
                                distanceSpan.textContent = item.distance || '';
                                
                                const br = doc.createElement('br');
                                
                                contentEl.appendChild(icon);
                                contentEl.appendChild(document.createTextNode(' '));
                                contentEl.appendChild(valueSpan);
                                contentEl.appendChild(separator);
                                contentEl.appendChild(distanceSpan);
                                contentEl.appendChild(br);
                            });
                        }
                    } else {
                        // Create new tab
                        tabEl = tabTemplate.cloneNode(true);
                        tabEl.style.display = '';
                        tabEl.removeAttribute('style');
                        
                        // Update checkbox ID
                        const checkbox = tabEl.querySelector('input[type="checkbox"]');
                        const label = tabEl.querySelector('label.tab-label');
                        if (checkbox && label) {
                            const newId = `chck${tabData.index}`;
                            checkbox.id = newId;
                            checkbox.setAttribute('onclick', `toggleTab('${newId}')`);
                            label.setAttribute('for', newId);
                        }
                        
                        // Update label text and data-field
                        if (label) {
                            label.setAttribute('data-field', tabData.connectivityField);
                            label.textContent = tabData.title;
                        }
                        
                        tabsContainer.appendChild(tabEl);
                    }
                    
                    // Get tab content container
                    let contentEl = tabEl.querySelector('.tab-content');
                    if (!contentEl) {
                        contentEl = doc.createElement('div');
                        contentEl.className = 'tab-content';
                        tabEl.appendChild(contentEl);
                    }
                    
                    // Clear existing content but keep structure
                    contentEl.innerHTML = '';
                    
                    // Create tab content items dynamically
                    if (tabData.items.length > 0) {
                        tabData.items.forEach((item, itemIdx) => {
                            // Create item structure matching template: <i class="fa-solid fa-caret-right"></i> <span>value</span> - <span>distance</span><br>
                            const icon = doc.createElement('i');
                            icon.className = 'fa-solid fa-caret-right';
                            
                            const valueSpan = doc.createElement('span');
                            valueSpan.setAttribute('data-field', item.valueField);
                            valueSpan.textContent = item.value || '';
                            
                            const separator = doc.createTextNode(' - ');
                            
                            const distanceSpan = doc.createElement('span');
                            distanceSpan.setAttribute('data-field', item.distanceField);
                            distanceSpan.textContent = item.distance || '';
                            
                            const br = doc.createElement('br');
                            
                            // Append directly to content (not wrapped in div, matching template structure)
                            contentEl.appendChild(icon);
                            contentEl.appendChild(document.createTextNode(' '));
                            contentEl.appendChild(valueSpan);
                            contentEl.appendChild(separator);
                            contentEl.appendChild(distanceSpan);
                            contentEl.appendChild(br);
                        });
                    } else {
                        // If no items, hide the tab
                        tabEl.style.display = 'none';
                    }
                });
                
                // Hide template if it doesn't have data
                const templateLabel = tabTemplate.querySelector(`.tab-label[data-field^="location_connectivity_"]`);
                if (templateLabel && templateLabel.hasAttribute('data-field')) {
                    const templateField = templateLabel.getAttribute('data-field');
                    const hasTemplateData = tabsData.some(t => t.connectivityField === templateField);
                    if (!hasTemplateData) {
                        tabTemplate.style.display = 'none';
                    }
                }
            }
        }
        
        // Handle location dropdowns dynamically - create dropdowns based on data
        const mapRightContainer = doc.querySelector('.map-right');
        if (mapRightContainer) {
            // Find first dropdown as template
            const dropdownTemplate = mapRightContainer.querySelector('.map-dropdown');
            
            if (dropdownTemplate) {
                // Collect all dropdowns that have data
                const dropdownsData = [];
                
                for (let i = 1; i <= 10; i++) {
                    const connectivityField = `location_connectivity_${i}`;
                    const connectivityData = parsedData[connectivityField] ? parsedData[connectivityField].trim() : null;
                    
                    // Collect items for this dropdown
                    const items = [];
                    for (let m = 1; m <= 15; m++) {
                        const valueField = `location_connectivity_${i}_value_${m}`;
                        const distanceField = `location_connectivity_${i}_distance_${m}`;
                        const valueData = parsedData[valueField] ? parsedData[valueField].trim() : null;
                        const distanceData = parsedData[distanceField] ? parsedData[distanceField].trim() : null;
                        
                        if (valueData || distanceData) {
                            items.push({
                                index: m,
                                value: valueData,
                                distance: distanceData,
                                valueField: valueField,
                                distanceField: distanceField
                            });
                        }
                    }
                    
                    // If dropdown has title or items, add it
                    if (connectivityData || items.length > 0) {
                        dropdownsData.push({
                            index: i,
                            title: connectivityData || 'Connectivity',
                            items: items,
                            connectivityField: connectivityField
                        });
                    }
                }
                
                console.log(`[Location] Found ${dropdownsData.length} dropdowns with data`);
                
                // Remove all existing dropdowns (except template)
                const existingDropdowns = mapRightContainer.querySelectorAll('.map-dropdown');
                existingDropdowns.forEach(dropdown => {
                    if (dropdown !== dropdownTemplate) {
                        dropdown.remove();
                    }
                });
                
                // Get template connectivity item BEFORE we modify the template
                const itemTemplate = dropdownTemplate.querySelector('.connectivity-item');
                
                // Create dropdowns dynamically
                dropdownsData.forEach((dropdownData, idx) => {
                    // Check if template matches this dropdown (first dropdown uses template)
                    const templateTitleEl = dropdownTemplate.querySelector(`[data-field="${dropdownData.connectivityField}"]`);
                    const isTemplate = idx === 0 && templateTitleEl !== null;
                    
                    let dropdownEl;
                    if (isTemplate) {
                        // Use template for first dropdown
                        dropdownEl = dropdownTemplate;
                        dropdownEl.style.display = '';
                        dropdownEl.removeAttribute('style');
                        
                        // Update title
                        if (templateTitleEl) {
                            templateTitleEl.textContent = dropdownData.title;
                        }
                        
                        // Keep "active" class for first dropdown only
                        const btn = dropdownEl.querySelector('.map-dropdown-btn');
                        const content = dropdownEl.querySelector('.map-dropdown-content');
                        const arrow = dropdownEl.querySelector('.map-arrow');
                        if (btn && idx === 0) {
                            btn.classList.add('active');
                        } else if (btn) {
                            btn.classList.remove('active');
                        }
                        if (content && idx === 0) {
                            content.classList.add('active');
                        } else if (content) {
                            content.classList.remove('active');
                        }
                        if (arrow && idx === 0) {
                            arrow.classList.add('active');
                        } else if (arrow) {
                            arrow.classList.remove('active');
                        }
                        
                        // Clear existing items from template too
                        if (content) {
                            const existingItems = content.querySelectorAll('.connectivity-item');
                            existingItems.forEach(item => item.remove());
                        }
                    } else {
                        // Create new dropdown
                        dropdownEl = dropdownTemplate.cloneNode(true);
                        dropdownEl.style.display = '';
                        dropdownEl.removeAttribute('style');
                        
                        // Remove "active" classes from cloned dropdowns
                        const btn = dropdownEl.querySelector('.map-dropdown-btn');
                        const content = dropdownEl.querySelector('.map-dropdown-content');
                        const arrow = dropdownEl.querySelector('.map-arrow');
                        if (btn) btn.classList.remove('active');
                        if (content) content.classList.remove('active');
                        if (arrow) arrow.classList.remove('active');
                        
                        // Update title
                        const titleSpan = dropdownEl.querySelector(`[data-field^="location_connectivity_"]`);
                        if (titleSpan) {
                            titleSpan.setAttribute('data-field', dropdownData.connectivityField);
                            titleSpan.textContent = dropdownData.title;
                        } else {
                            // Find span in button
                            if (btn) {
                                const span = btn.querySelector('span:not(.map-arrow)');
                                if (span) {
                                    span.setAttribute('data-field', dropdownData.connectivityField);
                                    span.textContent = dropdownData.title;
                                }
                            }
                        }
                        
                        mapRightContainer.appendChild(dropdownEl);
                    }
                    
                    // Get dropdown content container
                    let contentEl = dropdownEl.querySelector('.map-dropdown-content');
                    if (!contentEl) {
                        contentEl = doc.createElement('div');
                        contentEl.className = 'map-dropdown-content';
                        const buttonEl = dropdownEl.querySelector('.map-dropdown-btn');
                        if (buttonEl && buttonEl.nextSibling) {
                            dropdownEl.insertBefore(contentEl, buttonEl.nextSibling);
                        } else {
                            dropdownEl.appendChild(contentEl);
                        }
                    }
                    
                    // Clear existing connectivity items
                    const existingItems = contentEl.querySelectorAll('.connectivity-item');
                    existingItems.forEach(item => item.remove());
                    
                    // Create connectivity items dynamically
                    if (itemTemplate && dropdownData.items.length > 0) {
                        dropdownData.items.forEach(item => {
                            const clone = itemTemplate.cloneNode(true);
                            
                            // Update location field
                            const locationEl = clone.querySelector('.location');
                            if (locationEl) {
                                locationEl.setAttribute('data-field', item.valueField);
                                locationEl.textContent = item.value || '';
                            }
                            
                            // Update distance/time field
                            const timeEl = clone.querySelector('.time');
                            if (timeEl) {
                                timeEl.setAttribute('data-field', item.distanceField);
                                timeEl.textContent = item.distance || '';
                            }
                            
                            // Show the item
                            clone.style.display = '';
                            clone.removeAttribute('style');
                            contentEl.appendChild(clone);
                        });
                    }
                });
                
                // Ensure map-cta button is at the bottom of map-right container
                const mapCtaButton = mapRightContainer.querySelector('.map-cta');
                if (mapCtaButton) {
                    // Remove it from current position
                    mapCtaButton.remove();
                    // Append it to the bottom
                    mapRightContainer.appendChild(mapCtaButton);
                }
                
                // Hide template if it doesn't have data
                const templateTitleEl = dropdownTemplate.querySelector(`[data-field^="location_connectivity_"]`);
                if (templateTitleEl) {
                    const templateField = templateTitleEl.getAttribute('data-field');
                    const hasTemplateData = dropdownsData.some(d => d.connectivityField === templateField);
                    if (!hasTemplateData) {
                        dropdownTemplate.style.display = 'none';
                    }
                } else if (dropdownsData.length === 0) {
                    // No dropdowns have data, hide template
                    dropdownTemplate.style.display = 'none';
                }
            }
        }
        
        // Helper function to show/hide elements using DOM
        function showElement(el, show) {
            if (!el) return;
            if (show) {
                // Force remove display:none - set style.display first
                el.style.display = '';
                
                // Also remove display:none from style attribute string
                const styleAttr = el.getAttribute('style');
                if (styleAttr) {
                    // Check if it contains display:none (case insensitive)
                    if (styleAttr.match(/display\s*:\s*none/i)) {
                        let newStyle = styleAttr
                            .replace(/display\s*:\s*none\s*;?/gi, '')
                            .replace(/;\s*;/g, ';')
                            .replace(/^\s*;\s*|\s*;\s*$/g, '')
                            .trim();
                        if (newStyle) {
                            el.setAttribute('style', newStyle);
                        } else {
                            el.removeAttribute('style');
                        }
                        // Ensure it's still shown after attribute change
                        el.style.display = '';
                    }
                }
            } else {
                el.style.display = 'none';
            }
        }
        
        // Update image paths based on uploaded images (using DOM)
        updateImagePaths(doc);

        // Update CSS/JS paths to ensure they're correct in generated HTML
        updateAssetPaths(doc);

        applyLocationIframe(doc);
        
        // Convert DOM back to HTML string
        html = doc.documentElement.outerHTML;
        
        // Add GTM code to index.html (GTM head and body code from dashboard inputs)
        html = addGTMToHTML(html);
        
        return html;
    }

    function updateImagePaths(doc) {
        const config = templatesConfig[selectedTemplate];
        if (!config) return;
        
        const imageMapping = config.imageMapping || getDefaultImageMapping(selectedTemplate);

        // Update logo using DOM - prioritize data-field attributes
        if (uploadedImages['logo'] && imageMapping.logo) {
            const logoPath = imageMapping.logo.paths[0];
            
            // Priority 1: Find all elements with data-field="logo"
            const dataFieldLogo = doc.querySelectorAll('[data-field="logo"]');
            dataFieldLogo.forEach(el => {
                if (el.tagName === 'IMG') {
                    el.src = logoPath;
                } else if (el.tagName === 'LINK') {
                    el.href = logoPath;
                } else if (el.tagName === 'A') {
                    el.href = logoPath;
                }
            });
            
            // Priority 2: Fallback to pattern matching for elements without data-field
            const logoElements = doc.querySelectorAll('img[src*="logo"]:not([data-field]), link[href*="logo"]:not([data-field]), a[href*="logo"]:not([data-field])');
            logoElements.forEach(el => {
                const currentPath = el.tagName === 'IMG' ? el.getAttribute('src') : el.getAttribute('href');
                if (currentPath && (currentPath.includes('logo') || imageMapping.logo.replacePatterns.some(pattern => currentPath.includes(pattern)))) {
                    if (el.tagName === 'IMG') {
                        el.src = logoPath;
                    } else {
                        el.href = logoPath;
                    }
                }
            });
        }

        // Update banner slides when files are uploaded
        const uploadedBannerFiles = toArray(uploadedImages['banner']);
        const uploadedMobBannerFiles = toArray(uploadedImages['mobBanner']);
        if ((uploadedBannerFiles.length || uploadedMobBannerFiles.length) && (imageMapping.banner || imageMapping.mobBanner)) {
            const desktopPaths = uploadedBannerFiles.map((_, idx) => getImageTargetPath(imageMapping.banner, idx)).filter(Boolean);
            const mobilePaths = uploadedMobBannerFiles.map((_, idx) => getImageTargetPath(imageMapping.mobBanner, idx)).filter(Boolean);

            applyBannerSlides(doc, desktopPaths, mobilePaths);

            const slidesContainer = doc.getElementById('bannerSlides') || 
                                   doc.querySelector('.carouselBannerTrack') ||
                                   doc.querySelector('.bannerSlidesContainer');
            const primaryDesktop = desktopPaths[0] || slidesContainer?.getAttribute('data-default-desktop') || '';
            const primaryMobile = mobilePaths[0] || slidesContainer?.getAttribute('data-default-mobile') || primaryDesktop;

            const preloadDesktopLinks = doc.querySelectorAll('link[rel="preload"][href*="banner"]');
            preloadDesktopLinks.forEach(link => {
                if (primaryDesktop) {
                    link.href = primaryDesktop;
                }
            });

            const preloadMobileLinks = doc.querySelectorAll('link[rel="preload"][href*="mobBanner"], link[rel="preload"][href*="banner-480"]');
            preloadMobileLinks.forEach(link => {
                if (primaryMobile) {
                    link.href = primaryMobile;
                }
            });
        }

        // Update favicon using DOM - prioritize data-field attributes
        if (uploadedImages['favicon'] && imageMapping.favicon) {
            const faviconPath = imageMapping.favicon.paths[0];
            
            // Priority 1: Find all elements with data-field="favicon"
            const dataFieldFavicon = doc.querySelectorAll('link[data-field="favicon"]');
            dataFieldFavicon.forEach(link => {
                link.href = faviconPath;
                link.setAttribute('type', 'image/x-icon');
            });
            
            // Priority 2: Fallback to standard favicon links without data-field
            const existingFavicons = doc.querySelectorAll('link[rel="icon"]:not([data-field]), link[rel="shortcut icon"]:not([data-field])');
            
            if (existingFavicons.length > 0) {
                // Update existing favicon
                existingFavicons.forEach(link => {
                    link.href = faviconPath;
                    link.setAttribute('type', 'image/x-icon');
                });
            } else if (dataFieldFavicon.length === 0) {
                // Create new favicon link if none exists
                const head = doc.querySelector('head');
                if (head) {
                    const faviconLink = doc.createElement('link');
                    faviconLink.rel = 'icon';
                    faviconLink.type = 'image/x-icon';
                    faviconLink.href = faviconPath;
                    head.appendChild(faviconLink);
                }
            }
        }

        // Update virtual tour using DOM
        if (uploadedImages['vtour'] && imageMapping.vtour) {
            // Use getImageTargetPath to get the actual file path, not just the directory
            let vtourPath = getImageTargetPath(imageMapping.vtour, 0);
            
            // Ensure we have a valid file path (not just a directory)
            if (!vtourPath || vtourPath.endsWith('/')) {
                const basePath = imageMapping.vtour.paths[0];
                if (imageMapping.vtour.pattern) {
                    // Replace {index} with 1 (since index 0 means first image)
                    vtourPath = `${basePath}${imageMapping.vtour.pattern.replace('{index}', '1')}`;
                } else {
                    // Default to tour1.webp if no pattern
                    vtourPath = basePath.endsWith('/') ? `${basePath}tour1.webp` : `${basePath}/tour1.webp`;
                }
            }
            
            // First try to find virtual tour image by specific class/container/data-field
            const virtualTourSection = doc.querySelector('#virtual1, .virtualtourContainer, .virtualtourWrapper, .virtualTourSection, #virtualTourSite');
            if (virtualTourSection) {
                // Check for images with virtualtourImage class, data-field="vtour", or in tour section
                const vtourImg = virtualTourSection.querySelector('img.virtualtourImage, img[data-field="vtour"], img[src*="tour"], img[src*="vtour"], .tourImage');
                if (vtourImg) {
                    vtourImg.src = vtourPath;
                }
            }
            
            // Also check for images with data-field="vtour" anywhere in the document
            const dataFieldVtour = doc.querySelectorAll('img[data-field="vtour"]');
            dataFieldVtour.forEach(img => {
                img.src = vtourPath;
            });
            
            // Fallback: Find elements with virtual tour pattern (but exclude header/logo areas)
            const vtourElements = doc.querySelectorAll('img[src], iframe[src], a[href]');
            vtourElements.forEach(el => {
                // Skip header/logo areas
                if (el.closest('header, .header, .logo-container, .aboutLogo')) return;
                
                // Skip if already processed via data-field
                if (el.hasAttribute('data-field') && el.getAttribute('data-field') === 'vtour') return;
                
                const path = el.tagName === 'IMG' || el.tagName === 'IFRAME' ? el.getAttribute('src') : el.getAttribute('href');
                if (path && imageMapping.vtour.replacePatterns.some(pattern => path.includes(pattern))) {
                    // Also check if it's in virtual tour section
                    if (el.closest('#virtual1, .virtualtourContainer, .virtualtourWrapper, .virtualTourSection, #virtualTourSite') || 
                        el.classList.contains('virtualtourImage') ||
                        el.classList.contains('tourImage') ||
                        path.includes('tour') || path.includes('vtour')) {
                        if (el.tagName === 'IMG' || el.tagName === 'IFRAME') {
                            el.src = vtourPath;
                        } else {
                            el.href = vtourPath;
                        }
                    }
                }
            });
        }

        const amenitiesContainer = doc.getElementById('amenitiesTrack');
        if (amenitiesContainer) {
            const amenityUploads = toArray(uploadedImages['amenities']);
            const amenitySources = amenityUploads.map((_, idx) => getImageTargetPath(imageMapping.amenities, idx)).filter(Boolean);
            const isTemplate3Amenities = amenitiesContainer.classList && amenitiesContainer.classList.contains('amenities-track');
            // Template-5 also uses amenities-track class, check for template-5 specific structure
            const isTemplate5Amenities = amenitiesContainer.classList && amenitiesContainer.classList.contains('amenities-track') && 
                                       amenitiesContainer.querySelector('.amenities-imageContainer');
            const slideClass = isTemplate3Amenities || isTemplate5Amenities ? 'amenities-slide' : 'amenitiesSlide';
            const imageWrapperClass = (isTemplate3Amenities || isTemplate5Amenities) ? (isTemplate5Amenities ? 'amenities-imageContainer' : '') : 'amenitiesImageContainer';
            const imageClass = (isTemplate3Amenities || isTemplate5Amenities) ? 'amenities-image' : 'amenitiesImage';
            const overlayClass = (isTemplate3Amenities || isTemplate5Amenities) ? 'amenities-text-overlay' : 'amenitiesTextOverlay';
            const amenitiesCount = rebuildCarouselSlides(amenitiesContainer, amenitySources, {
                slideClass: slideClass,
                imageWrapperClass: imageWrapperClass,
                imageClass: imageClass,
                overlayClass: overlayClass,
                overlayText: (index) => `Amenity ${index + 1}`,
                altText: (index) => `Amenity ${index + 1}`,
                width: '300',
                height: '200',
                sizes: '(max-width: 768px) 50vw, 25vw'
            });
            setElementsVisibility(doc, ['#amenitiesPrev', '#amenitiesNext'], amenitiesCount > 1);
            updateCounterText(doc, '#amenitiesLightboxCounter', amenitiesCount);
        }

        // Try multiple gallery container IDs to support different templates
        const galleryContainer = doc.getElementById('galleryTrack') || 
                                 doc.getElementById('galleryCarouselTrack') ||
                                 doc.querySelector('.gallery-carousel-track') ||
                                 doc.querySelector('.gallery-track');
        if (galleryContainer) {
            const galleryUploads = toArray(uploadedImages['gallery']);
            const galleryPaths = galleryUploads.map((_, idx) => getImageTargetPath(imageMapping.gallery, idx)).filter(Boolean);
            
            // Determine slide class based on container and template
            const isCarouselTrack = galleryContainer.id === 'galleryCarouselTrack' || galleryContainer.classList.contains('gallery-carousel-track');
            const isTemplate5Gallery = galleryContainer.classList && galleryContainer.classList.contains('gallery-track') && 
                                      galleryContainer.querySelector('.gallery-imageContainer');
            const slideClass = isCarouselTrack ? 'gallery-carousel-slide' : (isTemplate5Gallery ? 'gallery-slide' : 'gallerySlide');
            const imageClass = isCarouselTrack ? 'gallery-carousel-image' : (isTemplate5Gallery ? 'gallery-image' : 'galleryImage');
            const imageWrapperClass = isTemplate5Gallery ? 'gallery-imageContainer' : 'galleryImageContainer';
            const overlayClass = isTemplate5Gallery ? 'gallery-text-overlay' : 'galleryTextOverlay';
            // Remove any existing gallery text overlays
            galleryContainer.querySelectorAll('.galleryTextOverlay, .gallery-text-overlay').forEach(el => el.remove());
            
            const galleryCount = rebuildCarouselSlides(galleryContainer, galleryPaths, {
                slideClass: slideClass,
                imageWrapperClass: imageWrapperClass,
                imageClass: imageClass,
                overlayClass: '', // Remove gallery text overlay
                overlayText: (index) => '', // Empty overlay text
                altText: (index) => `Gallery Image ${index + 1}`,
                width: '400',
                height: '300',
                sizes: '(max-width: 768px) 50vw, 25vw'
            });
            
            // Try multiple navigation button IDs
            setElementsVisibility(doc, ['#galleryPrev', '#galleryNext', '#galleryCarouselPrev', '#galleryCarouselNext'], galleryCount > 1);
            // Update counter for both possible counter IDs
            const counter1 = doc.querySelector('#galleryLightboxCounter');
            const counter2 = doc.querySelector('#galleryCarouselLightboxCounter');
            if (counter1) updateCounterText(doc, '#galleryLightboxCounter', galleryCount);
            if (counter2) updateCounterText(doc, '#galleryCarouselLightboxCounter', galleryCount);
        }

        // Update overview images with first gallery image
        const galleryUploads = toArray(uploadedImages['gallery']);
        if (galleryUploads.length > 0 && imageMapping.gallery) {
            const firstGalleryPath = getImageTargetPath(imageMapping.gallery, 0);
            if (firstGalleryPath) {
                // Find all overview images by class
                const overviewImages = doc.querySelectorAll('.overviewImage, img.overviewImage');
                overviewImages.forEach(img => {
                    img.src = firstGalleryPath;
                    // Update data-src if present
                    if (img.hasAttribute('data-src')) {
                        img.setAttribute('data-src', firstGalleryPath);
                    }
                    // Ensure data-field is set for gallery
                    if (!img.hasAttribute('data-field')) {
                        img.setAttribute('data-field', 'gallery');
                    }
                });
            }
        }

        // Update QR codes using DOM - prioritize data-field attributes
        const qrContainer = doc.querySelector('.aboutSectionQr');
        const aboutSection = doc.querySelector('.aboutSection');
        
        if (qrContainer || aboutSection) {
            const qrUploads = toArray(uploadedImages['qr']);
            const hasUploads = qrUploads.length > 0 && imageMapping.qr;

            // Priority 1: Find all QR images with data-field="qr"
            const dataFieldQr = doc.querySelectorAll('img[data-field="qr"]');
            if (dataFieldQr.length > 0) {
                if (hasUploads) {
                    // Update existing QR images
                    dataFieldQr.forEach((img, idx) => {
                        if (qrUploads[idx]) {
                            const targetPath = getImageTargetPath(imageMapping.qr, idx);
                            if (targetPath) {
                                img.src = targetPath;
                                img.setAttribute('data-src', targetPath);
                                img.style.display = '';
                                img.removeAttribute('style');
                            }
                        } else {
                            // Hide if no corresponding upload
                            img.style.display = 'none';
                        }
                    });
                    
                    // Add new QR images if we have more uploads than existing
                    if (qrUploads.length > dataFieldQr.length && aboutSection) {
                        const rowContainer = aboutSection.querySelector('.row.mob-center, .row');
                        if (rowContainer) {
                            for (let i = dataFieldQr.length; i < qrUploads.length; i++) {
                                const colDiv = doc.createElement('div');
                                colDiv.className = 'col-lg-2 col-sm-3';
                                const reraDiv = doc.createElement('div');
                                reraDiv.className = 'rera-img';
                                const qrImg = doc.createElement('img');
                                const targetPath = getImageTargetPath(imageMapping.qr, i);
                                if (targetPath) {
                                    qrImg.src = targetPath;
                                    qrImg.setAttribute('data-src', targetPath);
                                }
                                qrImg.alt = `MahaRERA QR Code ${i + 1}`;
                                qrImg.setAttribute('data-field', 'qr');
                                qrImg.setAttribute('loading', 'lazy');
                                qrImg.setAttribute('width', '120');
                                qrImg.setAttribute('height', '120');
                                reraDiv.appendChild(qrImg);
                                colDiv.appendChild(reraDiv);
                                rowContainer.appendChild(colDiv);
                            }
                        }
                    }
                } else {
                    // No uploads - hide all QR images
                    dataFieldQr.forEach(img => {
                        img.style.display = 'none';
                    });
                }
            }

            // Priority 2: Fallback to rera-img containers (only if data-field QR images weren't found)
            if (dataFieldQr.length === 0) {
                const reraImgContainers = (qrContainer || aboutSection).querySelectorAll('.rera-img');
                
                if (reraImgContainers.length > 0) {
                    // Remove all existing QR images from rera-img containers
                    reraImgContainers.forEach(container => {
                        const existingImg = container.querySelector('img');
                        if (existingImg) {
                            existingImg.remove();
                        }
                    });
                    
                    if (hasUploads) {
                        // Create QR images dynamically for each uploaded file
                        qrUploads.forEach((_, idx) => {
                            // Find or create rera-img container for this QR
                            let reraContainer = reraImgContainers[idx];
                            
                            if (!reraContainer && aboutSection) {
                                // Create new container structure if needed
                                const rowContainer = aboutSection.querySelector('.row.mob-center, .row');
                                if (rowContainer) {
                                    const colDiv = doc.createElement('div');
                                    colDiv.className = 'col-lg-2 col-sm-3';
                                    reraContainer = doc.createElement('div');
                                    reraContainer.className = 'rera-img';
                                    colDiv.appendChild(reraContainer);
                                    rowContainer.appendChild(colDiv);
                                }
                            }
                            
                            if (reraContainer) {
                                const targetPath = getImageTargetPath(imageMapping.qr, idx);
                                if (targetPath) {
                                    const qrImg = doc.createElement('img');
                                    qrImg.src = targetPath;
                                    qrImg.alt = `MahaRERA QR Code ${idx + 1}`;
                                    qrImg.setAttribute('data-src', targetPath);
                                    qrImg.setAttribute('data-field', 'qr');
                                    qrImg.setAttribute('loading', 'lazy');
                                    qrImg.setAttribute('width', '120');
                                    qrImg.setAttribute('height', '120');
                                    reraContainer.appendChild(qrImg);
                                }
                            }
                        });
                        
                        // Remove any extra rera-img containers beyond uploaded count
                        if (reraImgContainers.length > qrUploads.length) {
                            for (let i = qrUploads.length; i < reraImgContainers.length; i++) {
                                const container = reraImgContainers[i];
                                const colDiv = container.closest('.col-lg-2, .col-sm-3');
                                if (colDiv) {
                                    colDiv.remove();
                                } else {
                                    container.remove();
                                }
                            }
                        }
                    }
                } else if (qrContainer) {
                    // Fallback: use original qrContainer logic if it exists
                    storeDefaultContent(qrContainer);

                    if (hasUploads) {
                        const templateImg = qrContainer.querySelector('img')?.cloneNode(true) || doc.createElement('img');
                        const baseAlt = templateImg.getAttribute('alt') || 'QR Code';

                        qrContainer.innerHTML = '';

                        qrUploads.forEach((_, idx) => {
                            const clone = templateImg.cloneNode(true);
                            clone.style.display = '';
                            clone.removeAttribute('style');

                            const targetPath = getImageTargetPath(imageMapping.qr, idx) || templateImg.getAttribute('src') || '';
                            if (targetPath) {
                                clone.setAttribute('src', targetPath);
                            }
                            clone.setAttribute('alt', `${baseAlt} ${idx + 1}`);
                            clone.setAttribute('data-field', 'qr');
                            qrContainer.appendChild(clone);
                        });
                    } else if (qrContainer.dataset.defaultContent !== undefined) {
                        qrContainer.innerHTML = qrContainer.dataset.defaultContent;
                    }
                }
            }
        }

        applyProjectNameTitles(doc);
    }

    function downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function showLoading(show, message) {
        const loadingProgress = document.getElementById('loadingProgress');
        if (loadingProgress) {
            if (typeof message === 'string' && message.trim()) {
                loadingProgress.textContent = message;
            } else if (show && !loadingProgress.textContent.trim()) {
                loadingProgress.textContent = 'Processing… 0%';
            }
        }
        if (show) {
            loading.classList.add('active');
        } else {
            loading.classList.remove('active');
        }
    }

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
    }

    function hideStatus() {
        statusMessage.className = 'status-message';
    }

    // Simple Template Preview Functions
    function showTemplatePreview(imageSrc, templateName) {
        const modal = document.getElementById('templatePreviewModal');
        const previewImage = document.getElementById('templatePreviewImage');
        const closeBtn = document.getElementById('templatePreviewClose');
        
        if (!modal || !previewImage) {
            console.error('Template preview modal elements not found');
            return;
        }
        
        previewImage.src = imageSrc;
        previewImage.alt = templateName || 'Template Preview';
        
        // Handle image load error
        previewImage.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect width="200" height="150" fill="%23152338"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23e5b973" font-size="16"%3E' + encodeURIComponent(templateName || 'Template') + '%3C/text%3E%3C/svg%3E';
        };
        
        // Close button handler
        if (closeBtn) {
            closeBtn.onclick = closeTemplatePreview;
        }
        
        // Close on background click
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeTemplatePreview();
            }
        };
        
        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeTemplatePreview();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        // Show modal
        modal.classList.add('active');
        // Prevent body scrolling but allow modal to scroll
        document.body.style.overflow = 'hidden';
    }
    
    function closeTemplatePreview() {
        const modal = document.getElementById('templatePreviewModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Note: The guard block for preview-time DOM updates has been removed
    // as it's redundant inside DOMContentLoaded where variables are properly scoped

    function updateAssetPaths(doc) {
        const config = templatesConfig[selectedTemplate];
        if (!config) return;
        
        // Update CSS path
        if (config.cssPath) {
            const relativeCssPath = config.cssPath.startsWith(`${selectedTemplate}/`)
                ? config.cssPath.slice(selectedTemplate.length + 1)
                : config.cssPath.replace(/^\/+/, '');
            
            // Find all CSS links
            const cssLinks = doc.querySelectorAll('link[rel="stylesheet"], link[rel="preload"][as="stylesheet"], link[rel="preload"][href*=".css"]');
            cssLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && (href.includes('style.css') || (href.includes('.css') && !href.startsWith('http')))) {
                    // Only update if it's a template CSS file, not external or thankyou CSS
                    if (!href.startsWith('http') && !href.includes('thankyou') && !href.includes('googleapis') && !href.includes('cdn')) {
                        link.setAttribute('href', relativeCssPath);
                    }
                }
            });
        }
        
        // Update JS path
        if (config.jsPath) {
            const relativeJsPath = config.jsPath.startsWith(`${selectedTemplate}/`)
                ? config.jsPath.slice(selectedTemplate.length + 1)
                : config.jsPath.replace(/^\/+/, '');
            
            // Find all script tags (but be careful not to update external scripts)
            const scriptTags = doc.querySelectorAll('script[src]');
            scriptTags.forEach(script => {
                const src = script.getAttribute('src');
                if (src && (src.includes('script.js') || src.includes('main.js'))) {
                    // Only update if it's a template JS file, not external or thankyou JS
                    if (!src.startsWith('http') && !src.includes('thankyou') && !src.includes('cdn') && !src.includes('googleapis')) {
                        script.setAttribute('src', relativeJsPath);
                    }
                }
            });
        }
    }

    function applyLocationIframe(doc) {
      if (!doc) return;

      // Get location iframe markup
      let rawValue = '';
      if (customLocationIframe && customLocationIframe.trim()) {
        rawValue = customLocationIframe.trim();
      } else if (parsedData && parsedData.location_iframe && parsedData.location_iframe.trim()) {
        rawValue = parsedData.location_iframe.trim();
      }
      if (!rawValue) return;
      
      let markup = '';
      if (rawValue.toLowerCase().includes('<iframe')) {
        markup = rawValue;
      } else {
        markup = `<iframe src="${rawValue}" width="600" height="450" style="border:0;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
      }

      const container = doc.querySelector('[data-location-iframe-container]');
      if (!container) return;

      container.innerHTML = markup;

      const dataFieldEl = doc.querySelector('[data-field="location_iframe"]');
      if (dataFieldEl) {
        dataFieldEl.textContent = markup;
      }

      const mapContent = doc.querySelector('.map-content');
      if (mapContent) {
        mapContent.classList.remove('map-right');
      }
    }

    function applyProjectNameTitles(doc) {
      if (!doc) return;

      const projectName =
        parsedData && typeof parsedData.project_name === 'string'
          ? parsedData.project_name.trim()
          : '';

      const titleElements = doc.querySelectorAll('[data-title-template]');
      if (!titleElements.length) return;

      titleElements.forEach((el) => {
        const template = el.getAttribute('data-title-template');
        if (!template) return;

        if (!el.hasAttribute('data-title-fallback')) {
          el.setAttribute('data-title-fallback', (el.textContent || '').trim());
        }

        const fallback = el.getAttribute('data-title-fallback') || '';

        if (projectName) {
          const updatedText = template.replace(/\{project_name\}/gi, projectName);
          el.textContent = updatedText;
        } else if (fallback) {
          el.textContent = fallback;
        }
      });
    }
    }

    // Initialize templates on page load (called here to ensure function is defined)
    initializeTemplates().then(function() {
        console.log('✓ Templates initialized successfully');
        loadSavedState();
    }).catch(function(error) {
        console.error('❌ Failed to initialize templates:', error);
        const selector = document.getElementById('templateSelector');
        if (selector) {
            selector.innerHTML = '<div class="loading-templates" style="padding: 40px; text-align: center;"><p style="color: #e5b973; font-size: 18px; margin-bottom: 10px;">⚠️ Error Loading Templates</p><p style="color: #b8c5d0; font-size: 14px; margin-bottom: 20px;">' + (error.message || 'Unknown error occurred') + '</p><button class="btn" style="margin-top: 15px; width: auto; padding: 10px 20px;" onclick="location.reload()">Refresh Page</button></div>';
        }
    });
});

// Initialize templates when DOM is ready (already called in DOMContentLoaded)
// Removed duplicate call to prevent initialization issues

window.addEventListener('beforeunload', () => {
    performStateSave();
});

function getLocationIframeMarkup() {
  let rawValue = '';
  if (customLocationIframe && customLocationIframe.trim()) {
    rawValue = customLocationIframe.trim();
  } else if (parsedData && parsedData.location_iframe && parsedData.location_iframe.trim()) {
    rawValue = parsedData.location_iframe.trim();
  }
  if (!rawValue) return '';

  if (rawValue.toLowerCase().includes('<iframe')) {
    return rawValue;
  }

  return `<iframe src="${rawValue}" width="600" height="450" style="border:0;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}


