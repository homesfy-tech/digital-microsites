// Counters for dynamic items
let counters = {
    offers: 1,
    highlights: 1,
    prices: 1,
    location: 1,
    amenities: 1,
    locationDetailCounters: {} // Track detail counts per category
};

// **NEW FUNCTION**
// Resets the entire form to its default state
function resetForm() {
    // Reset counters
    counters = {
        offers: 1,
        highlights: 1,
        prices: 1,
        location: 1,
        amenities: 1,
        locationDetailCounters: {}
    };
    
    // Clear all static fields
    document.querySelectorAll('#contentForm input, #contentForm textarea').forEach(input => {
        input.value = '';
    });

    // Reset dynamic item containers to their original HTML
    document.getElementById('offersContainer').innerHTML = `
        <div class="dynamic-item">
            <input type="text" name="offer_1" placeholder="Enter offer">
            <button type="button" class="btn-remove" onclick="removeItem(this, 'offers')">&times;</button>
        </div>`;
    
    document.getElementById('highlightsContainer').innerHTML = `
        <div class="dynamic-item">
            <input type="text" name="highlight_1" placeholder="Enter highlight">
            <button type="button" class="btn-remove" onclick="removeItem(this, 'highlights')">&times;</button>
        </div>`;
    
    document.getElementById('pricesContainer').innerHTML = `
        <div class="dynamic-item" style="flex-direction: column; align-items: stretch;">
            <input type="text" name="price_1_type" placeholder="Type (e.g., 2 BHK)" style="margin-bottom: 8px;">
            <input type="text" name="price_1_area" placeholder="Area (e.g., 500 - 600 sqft)">
            <input type="text" name="price_1_price" placeholder="Price" style="margin-top: 8px;">
            <button type="button" class="btn-remove" onclick="removeItem(this, 'prices')" style="margin-top: 10px;">&times; Remove</button>
        </div>`;

    document.getElementById('amenitiesContainer').innerHTML = `
        <div class="dynamic-item">
            <input type="text" name="amenities_name1" placeholder="Enter amenity name">
            <button type="button" class="btn-remove" onclick="removeItem(this, 'amenities')">&times;</button>
        </div>`;

    // Reset location container
    document.getElementById('locationContainer').innerHTML = `
        <div class="location-category-group" style="margin-bottom: 25px; padding: 20px; background: var(--container-bg); border-radius: 8px; border: 1px solid var(--border-color); box-shadow: var(--shadow-soft);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                <input type="text" name="location_connectivity_1" placeholder="Category (e.g., Schools, Hospitals, Metro)" style="flex: 1; font-weight: 600; font-size: 1rem;">
                <button type="button" class="btn-remove" onclick="removeLocationCategory(this)">&times; Remove Category</button>
            </div>
            <div class="location-details-group" data-category-index="1">
                <div class="location-detail-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <input type="text" name="location_connectivity_1_value_1" placeholder="Location Placeholder Time" style="flex: 1;">
                    <input type="text" name="location_connectivity_1_distance_1" placeholder="Distance" style="width: 150px;">
                    <button type="button" class="btn-remove" onclick="removeLocationDetail(this)" style="padding: 8px 12px;">&times;</button>
                </div>
            </div>
            <button type="button" class="btn-add" onclick="addLocationDetail(1)" style="margin-top: 10px;">
                <span class="plus-icon">+</span> Add Detail
            </button>
        </div>`;
    
    // Reset project name display
    document.getElementById('projectNameDisplay').textContent = 'Enter project name to display here';
    
    // Reset location detail counters
    counters.locationDetailCounters = { 1: 1 };
    counters.location = 1;
    
    // Update stats
    updateStats();
}

// Get all form data
function getFormData() {
    const formData = {};
    const form = document.getElementById('contentForm');
    
    if (!form) {
        return formData;
    }
    
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.value && input.value.trim()) {
            formData[input.name] = input.value.trim();
        }
    });

    return formData;
}

// Update statistics
function updateStats() {
    const data = getFormData();
    const sections = ['Basic Information', 'SEO & Meta', 'Banner', 'Offers', 'Overview', 'Highlights', 'Prices', 'Amenities', 'Location', 'Developer', 'RERA'].length;
    
    const totalFieldsEl = document.getElementById('totalFields');
    const totalSectionsEl = document.getElementById('totalSections');
    if (totalFieldsEl) {
        totalFieldsEl.textContent = Object.keys(data).length;
    }
    if (totalSectionsEl) {
        totalSectionsEl.textContent = sections;
    }
}

// Add dynamic item
function addDynamicItem(type) {
    const container = document.getElementById(type + 'Container');
    if (!container) {
        console.error('Container not found for type:', type);
        return;
    }
    
    counters[type]++;
    const index = counters[type];

    let itemHTML = '';
    
    if (type === 'prices') {
        itemHTML = `
            <div class="dynamic-item" style="flex-direction: column; align-items: stretch;">
                <input type="text" name="price_${index}_type" placeholder="Type (e.g., 2 BHK)" style="margin-bottom: 8px;">
                <input type="text" name="price_${index}_area" placeholder="Area (e.g., 500 - 600 sqft)">
                <input type="text" name="price_${index}_price" placeholder="Price" style="margin-top: 8px;">
                <button type="button" class="btn-remove" onclick="removeItem(this, '${type}')" style="margin-top: 10px;">&times; Remove</button>
            </div>
        `;
    } else {
        const fieldName = type === 'offers' ? `offer_${index}` : 
                         type === 'highlights' ? `highlight_${index}` : 
                         type === 'amenities' ? `amenities_name${index}` : '';
        itemHTML = `
            <div class="dynamic-item">
                <input type="text" name="${fieldName}" placeholder="Enter ${type.slice(0, -1)}">
                <button type="button" class="btn-remove" onclick="removeItem(this, '${type}')">&times;</button>
            </div>
        `;
    }

    container.insertAdjacentHTML('beforeend', itemHTML);
    updateStats();
}

// Remove dynamic item
function removeItem(button, type) {
    const container = document.getElementById(type + 'Container');
    if (!container) {
        console.error('Container not found for type:', type);
        return;
    }
    
    if (container.children.length > 1) {
        button.closest('.dynamic-item').remove();
        updateStats();
    } else {
        alert(`At least one ${type.slice(0, -1)} item is required.`);
    }
}

// === NEW LOCATION FUNCTIONS ===

// Add a new location category
function addLocationCategory() {
    counters.location++;
    const categoryIndex = counters.location;
    
    // Initialize detail counter for this category
    if (!counters.locationDetailCounters[categoryIndex]) {
        counters.locationDetailCounters[categoryIndex] = 0;
    }
    
    const locationContainer = document.getElementById('locationContainer');
    const categoryHTML = `
        <div class="location-category-group" style="margin-bottom: 25px; padding: 20px; background: var(--container-bg); border-radius: 8px; border: 1px solid var(--border-color); box-shadow: var(--shadow-soft);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                <input type="text" name="location_connectivity_${categoryIndex}" placeholder="Category (e.g., Schools, Hospitals, Metro)" style="flex: 1; font-weight: 600; font-size: 1rem;">
                <button type="button" class="btn-remove" onclick="removeLocationCategory(this)">&times; Remove Category</button>
            </div>
            <div class="location-details-group" data-category-index="${categoryIndex}">
                <div class="location-detail-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <input type="text" name="location_connectivity_${categoryIndex}_value_1" placeholder="Location Placeholder Time" style="flex: 1;">
                    <input type="text" name="location_connectivity_${categoryIndex}_distance_1" placeholder="Distance" style="width: 150px;">
                    <button type="button" class="btn-remove" onclick="removeLocationDetail(this)" style="padding: 8px 12px;">&times;</button>
                </div>
            </div>
            <button type="button" class="btn-add" onclick="addLocationDetail(${categoryIndex})" style="margin-top: 10px;">
                <span class="plus-icon">+</span> Add Detail
            </button>
        </div>
    `;
    
    locationContainer.insertAdjacentHTML('beforeend', categoryHTML);
    counters.locationDetailCounters[categoryIndex] = 1;
    updateStats();
}

// Remove a location category
function removeLocationCategory(button) {
    const locationContainer = document.getElementById('locationContainer');
    if (locationContainer.children.length > 1) {
        const categoryGroup = button.closest('.location-category-group');
        const categoryIndex = categoryGroup.querySelector('.location-details-group').getAttribute('data-category-index');
        
        // Remove from counters
        delete counters.locationDetailCounters[categoryIndex];
        
        categoryGroup.remove();
        updateStats();
    } else {
        alert('At least one location category is required.');
    }
}

// Add a detail to a location category
function addLocationDetail(categoryIndex) {
    if (!counters.locationDetailCounters[categoryIndex]) {
        counters.locationDetailCounters[categoryIndex] = 0;
    }
    
    counters.locationDetailCounters[categoryIndex]++;
    const detailIndex = counters.locationDetailCounters[categoryIndex];
    
    // Find the details group for this category
    const detailsGroup = document.querySelector(`.location-details-group[data-category-index="${categoryIndex}"]`);
    if (!detailsGroup) {
        console.error('Details group not found for category:', categoryIndex);
        return;
    }
    
    const detailHTML = `
        <div class="location-detail-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <input type="text" name="location_connectivity_${categoryIndex}_value_${detailIndex}" placeholder="Location Placeholder Time" style="flex: 1;">
            <input type="text" name="location_connectivity_${categoryIndex}_distance_${detailIndex}" placeholder="Distance" style="width: 150px;">
            <button type="button" class="btn-remove" onclick="removeLocationDetail(this)" style="padding: 8px 12px;">&times;</button>
        </div>
    `;
    
    detailsGroup.insertAdjacentHTML('beforeend', detailHTML);
    updateStats();
}

// Remove a location detail
function removeLocationDetail(button) {
    const detailsGroup = button.closest('.location-details-group');
    const detailItems = detailsGroup.querySelectorAll('.location-detail-item');
    
    if (detailItems.length > 1) {
        button.closest('.location-detail-item').remove();
        updateStats();
    } else {
        alert('At least one detail is required per category.');
    }
}

// Parse and auto-fill locations from pasted text
function parseAndFillLocations() {
    const pasteArea = document.getElementById('locationPasteArea');
    if (!pasteArea) {
        alert('Paste area not found!');
        return;
    }
    
    const pastedText = pasteArea.value.trim();
    if (!pastedText) {
        alert('Please paste your location list first!');
        return;
    }
    
    // Split by newlines and filter empty lines
    const lines = pastedText.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    if (lines.length === 0) {
        alert('No valid lines found!');
        return;
    }
    
    // Function to detect category from location name
    function detectCategory(locationName) {
        const name = locationName.toLowerCase();
        if (name.includes('metro') || name.includes('station') || name.includes('railway')) {
            return 'Metro/Transport';
        } else if (name.includes('school') || name.includes('college') || name.includes('university') || name.includes('symbiosis')) {
            return 'Schools/Education';
        } else if (name.includes('hospital') || name.includes('clinic') || name.includes('medical')) {
            return 'Hospitals/Healthcare';
        } else if (name.includes('mall') || name.includes('market') || name.includes('mart') || name.includes('croma') || name.includes('d mart')) {
            return 'Shopping/Markets';
        } else if (name.includes('infosys') || name.includes('tech') || name.includes('it park') || name.includes('circle')) {
            return 'IT Parks/Offices';
        } else if (name.includes('chowk') || name.includes('road') || name.includes('junction')) {
            return 'Landmarks';
        }
        return 'Other';
    }
    
    // Group lines by category
    const categoryGroups = {};
    
    lines.forEach(line => {
        // Parse line: "Place Name – Time" or just "Place Name"
        let placeName = line;
        let timeInfo = '';
        
        const timeMatch = line.match(/^(.+?)\s*[–\-]\s*(.+)$/);
        if (timeMatch) {
            placeName = timeMatch[1].trim();
            timeInfo = timeMatch[2].trim();
        }
        
        const category = detectCategory(placeName);
        const fullText = timeInfo ? `${placeName} – ${timeInfo}` : placeName;
        
        if (!categoryGroups[category]) {
            categoryGroups[category] = [];
        }
        categoryGroups[category].push(fullText);
    });
    
    // Create categories and add details
    Object.keys(categoryGroups).forEach((category, catIdx) => {
        const details = categoryGroups[category];
        
        // Create new category (or use existing if category already exists)
        let categoryIndex;
        const existingCategory = Array.from(document.querySelectorAll('input[name^="location_connectivity_"]'))
            .find(input => input.value === category);
        
        if (existingCategory) {
            const categoryGroup = existingCategory.closest('.location-category-group');
            categoryIndex = categoryGroup.querySelector('.location-details-group').getAttribute('data-category-index');
        } else {
            addLocationCategory();
            categoryIndex = counters.location;
            
            // Wait for DOM to update, then set category name
            setTimeout(() => {
                const categoryInput = document.querySelector(`input[name="location_connectivity_${categoryIndex}"]`);
                if (categoryInput) {
                    categoryInput.value = category;
                }
            }, 100);
        }
        
        // Add details to this category
        details.forEach((detailText, detailIdx) => {
            setTimeout(() => {
                addLocationDetail(categoryIndex);
                
                // Wait a bit more, then fill the detail
                setTimeout(() => {
                    // The detailIndex will be detailIdx + 1 (since we just added it)
                    const detailIndex = detailIdx + 1;
                    const detailInput = document.querySelector(`input[name="location_connectivity_${categoryIndex}_value_${detailIndex}"]`);
                    
                    if (detailInput) {
                        detailInput.value = detailText;
                    } else {
                        // Fallback: find the last added input in this category
                        const detailsGroup = document.querySelector(`.location-details-group[data-category-index="${categoryIndex}"]`);
                        const allInputs = detailsGroup.querySelectorAll(`input[name^="location_connectivity_${categoryIndex}_value_"]`);
                        if (allInputs.length > 0) {
                            allInputs[allInputs.length - 1].value = detailText;
                        }
                    }
                    updateStats();
                }, 150 * (detailIdx + 1));
            }, 200 * (catIdx + 1) + 100 * detailIdx);
        });
    });
    
    // Clear the paste area after processing
    setTimeout(() => {
        pasteArea.value = '';
        alert(`✅ Successfully added ${lines.length} location${lines.length > 1 ? 's' : ''} in ${Object.keys(categoryGroups).length} categor${Object.keys(categoryGroups).length > 1 ? 'ies' : 'y'}!`);
    }, 1000);
}

// Generate CSV
function generateCSV() {
    const data = getFormData();
    
    if (!data.project_name) {
        alert('Please enter a project name.');
        return;
    }

    // Create CSV content
    let csvContent = 'Classname (Key),Content\n';
    
    Object.keys(data).forEach(key => {
        const value = data[key].replace(/"/g, '""'); // Escape double quotes
        csvContent += `${key},"${value}"\n`;
    });

    // Get filename
    const filename = document.getElementById('exportFilename').value.trim() || 
                   data.project_name.replace(/\s+/g, '-');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    if (typeof saveAs === 'undefined') {
        alert('FileSaver.js is not loaded! Please check your internet connection.');
        console.error('FileSaver not available');
        return;
    }
    
    saveAs(blob, filename + '.csv');
    
    alert('✅ CSV file downloaded successfully!');
}

// Generate HTML Doc file
function generateHTMLDoc() {
    const data = getFormData();
    
    if (!data.project_name) {
        alert('Please enter a project name.');
        return;
    }

    // Get filename
    const filename = document.getElementById('exportFilename').value.trim() || 
                   data.project_name.replace(/\s+/g, '-');

    const projectName = data.project_name || 'Project Documentation';
    
    // Collect amenities data
    const amenities = [];
    let amenityIndex = 1;
    while (data[`amenities_name${amenityIndex}`]) {
        amenities.push({
            index: amenityIndex,
            name: data[`amenities_name${amenityIndex}`]
        });
        amenityIndex++;
    }
    
    // Create HTML content with gallery and amenities sections
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; vertical-align: top; }
        th { background-color: #667eea; color: white; font-weight: bold; }
        td { color: #333; }
    </style>
</head>
<body>
    <h1>${projectName}</h1>
    <table>
        <tr>
            <th style="width: 30%;">Field Name</th>
            <th style="width: 70%;">Content</th>
        </tr>`;

    // Add all data as rows
    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value && value.trim()) {
            htmlContent += `
        <tr>
            <td><strong>${key}</strong></td>
            <td>${value.replace(/\n/g, '<br>')}</td>
        </tr>`;
        }
    });

    htmlContent += `
    </table>
    
    <!-- Gallery Section -->
    <section class="gallerySection" id="gallery">
        <div class="galleryContainer">
            <h2 class="galleryTitle">Gallery Of ${projectName}</h2>
            
            <div class="galleryCarousel">
                <div class="galleryTrack" id="galleryTrack">
                    <div class="gallerySlide" data-index="0">
                        <div class="galleryImageContainer">
                            <img src="assets/images/gallery/gg3.webp" alt="Infinity Pool" class="galleryImage" loading="lazy" width="400" height="300" sizes="(max-width: 768px) 50vw, 25vw">
                        </div>
                        <div class="galleryTextOverlay">Infinity Pool</div>
                    </div>
                    
                    <div class="gallerySlide" data-index="1">
                        <div class="galleryImageContainer">
                            <img src="assets/images/gallery/gg4.webp" alt="Fitness Center" class="galleryImage" loading="lazy" width="400" height="300" sizes="(max-width: 768px) 50vw, 25vw">
                        </div>
                        <div class="galleryTextOverlay">Fitness Center</div>
                    </div>
                    
                    <div class="gallerySlide" data-index="2">
                        <div class="galleryImageContainer">
                            <img src="assets/images/gallery/gg5.webp" alt="Sunset View" class="galleryImage" loading="lazy" width="400" height="300" sizes="(max-width: 768px) 50vw, 25vw">
                        </div>
                        <div class="galleryTextOverlay">Sunset View</div>
                    </div>
                    
                    <div class="gallerySlide" data-index="3">
                        <div class="galleryImageContainer">
                            <img src="assets/images/gallery/g4.webp" alt="Luxury Living" class="galleryImage" loading="lazy" width="400" height="300" sizes="(max-width: 768px) 50vw, 25vw">
                        </div>
                        <div class="galleryTextOverlay">Luxury Living</div>
                    </div>
                    
                    <div class="gallerySlide" data-index="4">
                        <div class="galleryImageContainer">
                            <img src="assets/images/gallery/g5.webp" alt="Modern Design" class="galleryImage" loading="lazy" width="400" height="300" sizes="(max-width: 768px) 50vw, 25vw">
                        </div>
                        <div class="galleryTextOverlay">Modern Design</div>
                    </div>
                    
                    <div class="gallerySlide" data-index="5">
                        <div class="galleryImageContainer">
                            <img src="assets/images/gallery/g6.webp" alt="Green Spaces" class="galleryImage" loading="lazy" width="400" height="300" sizes="(max-width: 768px) 50vw, 25vw">
                        </div>
                        <div class="galleryTextOverlay">Green Spaces</div>
                    </div>
                    
                    <div class="gallerySlide" data-index="6">
                        <div class="galleryImageContainer">
                            <img src="assets/images/gallery/g7.webp" alt="Architecture" class="galleryImage" loading="lazy" width="400" height="300" sizes="(max-width: 768px) 50vw, 25vw">
                        </div>
                        <div class="galleryTextOverlay">Architecture</div>
                    </div>
                </div>
                
                <button class="galleryPrev" id="galleryPrev" aria-label="Previous Gallery">
                    <i class="ri-arrow-left-s-line"></i>
                </button>
                
                <button class="galleryNext" id="galleryNext" aria-label="Next Gallery">
                    <i class="ri-arrow-right-s-line"></i>
                </button>
            </div>
            
            <div class="galleryDownload">
                <button class="galleryDownloadBtn">Download Gallery</button>
            </div>
        </div>
        
        <!-- Lightbox -->
        <div class="galleryLightbox" id="galleryLightbox">
            <div class="galleryLightboxContent">
                <button class="galleryLightboxClose" id="galleryLightboxClose" aria-label="Close Gallery Preview">
                    <i class="ri-close-line"></i>
                </button>
                <button class="galleryLightboxNav galleryLightboxPrev" id="galleryLightboxPrev" aria-label="Previous Gallery">
                    <i class="ri-arrow-left-s-line"></i>
                </button>
                <img class="galleryLightboxImage" id="galleryLightboxImage" src="" alt="">
                <button class="galleryLightboxNav galleryLightboxNext" id="galleryLightboxNext" aria-label="Next Gallery">
                    <i class="ri-arrow-right-s-line"></i>
                </button>
                <div class="galleryLightboxTitle" id="galleryLightboxTitle"></div>
                <div class="galleryLightboxCounter" id="galleryLightboxCounter">1 / 7</div>
            </div>
        </div>
    </section>

    <!-- Amenities Carousel Section -->
    <section class="amenitiesSection" id="amenities">
        <div class="amenitiesContainer">
            <h2 class="amenitiesTitle">Amenities of ${projectName}</h2>
            
            <div class="amenitiesCarousel">
                <div class="amenitiesTrack" id="amenitiesTrack">`;

    // Generate amenities slides - hide slides that don't have data
    for (let i = 1; i <= 10; i++) {
        const amenityName = data[`amenities_name${i}`] || `Amenity ${i}`;
        const hasData = !!data[`amenities_name${i}`];
        // Show first slide always, hide others if no data
        const displayStyle = (i === 1 || hasData) ? '' : 'style="display: none;"';
        
        // Determine image filename based on index
        let imageFile = '';
        if (i === 1) imageFile = 'aa2';
        else if (i === 2) imageFile = 'aa3';
        else imageFile = `a${i}`;
        
        htmlContent += `
                    <div class="amenitiesSlide" data-index="${i - 1}" ${displayStyle}>
                        <div class="amenitiesImageContainer">
                            <img src="assets/images/amenities/${imageFile}.webp" alt="${amenityName}" class="amenitiesImage" loading="lazy" width="300" height="200" sizes="(max-width: 768px) 50vw, 25vw">
                        </div>
                        <div class="amenitiesTextOverlay" data-field="amenities_name${i}">${amenityName}</div>
                    </div>`;
    }
    
    htmlContent += `
                </div>
                
                <button class="amenitiesPrev" id="amenitiesPrev" aria-label="Previous Amenities">
                    <i class="ri-arrow-left-s-line"></i>
                </button>
                
                <button class="amenitiesNext" id="amenitiesNext" aria-label="Next Amenities">
                    <i class="ri-arrow-right-s-line"></i>
                </button>
            </div>
            
            <div class="amenitiesDownload">
                <button class="amenitiesDownloadBtn">Download Amenities</button>
            </div>
        </div>
        
        <!-- Lightbox -->
        <div class="amenitiesLightbox" id="amenitiesLightbox">
            <div class="amenitiesLightboxContent">
                <button class="amenitiesLightboxClose" id="amenitiesLightboxClose" aria-label="Close Lightbox">
                    <i class="ri-close-line"></i>
                </button>
                
                <button class="amenitiesLightboxPrev" id="amenitiesLightboxPrev" aria-label="Previous Image">
                    <i class="ri-arrow-left-s-line"></i>
                </button>
                
                <img class="amenitiesLightboxImage" id="amenitiesLightboxImage" src="" alt="" loading="lazy">
                
                <button class="amenitiesLightboxNext" id="amenitiesLightboxNext" aria-label="Next Image">
                    <i class="ri-arrow-right-s-line"></i>
                </button>
                
                <div class="amenitiesLightboxTitle" id="amenitiesLightboxTitle"></div>
                <div class="amenitiesLightboxCounter" id="amenitiesLightboxCounter">1 / ${amenities.length || 6}</div>
            </div>
        </div>
    </section>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    
    if (typeof saveAs === 'undefined') {
        alert('FileSaver.js is not loaded! Please check your internet connection.');
        console.error('FileSaver not available');
        return;
    }
    
    saveAs(blob, filename + '.html');
    
    alert('✅ HTML document downloaded successfully!');
}

// Show format selection modal
function showFormatModal() {
    const data = getFormData();
    
    if (!data.project_name) {
        alert('Please enter a project name.');
        return;
    }
    
    document.getElementById('formatModal').style.display = 'block';
}

// Close format modal
function closeFormatModal() {
    document.getElementById('formatModal').style.display = 'none';
}

// Download in selected format
function downloadFormat(format) {
    const data = getFormData();
    
    if (!data.project_name) {
        alert('Please enter a project name.');
        return;
    }

    const filename = document.getElementById('exportFilename').value.trim() || 
                   data.project_name.replace(/\s+/g, '-');
    
    closeFormatModal();
    
    switch(format) {
        case 'html':
            downloadHTMLFormat(data, filename);
            break;
        case 'word':
            downloadWordFormat(data, filename);
            break;
        case 'google':
            downloadGoogleDocsFormat(data, filename);
            break;
    }
}

// Download HTML format
function downloadHTMLFormat(data, filename) {
    generateHTMLDoc(); // Use existing function
}

// Download Word format (HTML compatible with Word)
function downloadWordFormat(data, filename) {
    const projectName = data.project_name || 'Project Documentation';
    
    // Collect amenities data
    const amenities = [];
    let amenityIndex = 1;
    while (data[`amenities_name${amenityIndex}`]) {
        amenities.push({
            index: amenityIndex,
            name: data[`amenities_name${amenityIndex}`]
        });
        amenityIndex++;
    }
    
    // Create Word-compatible HTML (Word can open HTML files)
    let htmlContent = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="UTF-8">
    <meta name="ProgId" content="Word.Document">
    <meta name="Generator" content="Microsoft Word">
    <meta name="Originator" content="Microsoft Word">
    <title>${projectName}</title>
    <style>
        body { font-family: Calibri, Arial, sans-serif; padding: 40px; line-height: 1.6; }
        h1 { color: #2c3e50; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        h2 { color: #34495e; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; vertical-align: top; }
        th { background-color: #667eea; color: white; font-weight: bold; }
        td { color: #333; }
        ul { margin-left: 20px; }
        li { margin-bottom: 5px; }
    </style>
</head>
<body>
    <h1>${projectName}</h1>
    <h2>Project Information</h2>
    <table>
        <tr>
            <th style="width: 30%;">Field Name</th>
            <th style="width: 70%;">Content</th>
        </tr>`;

    // Add all data as rows
    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value && value.trim()) {
            htmlContent += `
        <tr>
            <td><strong>${key}</strong></td>
            <td>${value.replace(/\n/g, '<br>')}</td>
        </tr>`;
        }
    });

    htmlContent += `
    </table>
</body>
</html>`;

    // Save as .doc (Word can open HTML files saved with .doc extension)
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    
    if (typeof saveAs === 'undefined') {
        alert('FileSaver.js is not loaded! Please check your internet connection.');
        return;
    }
    
    saveAs(blob, filename + '.doc');
    alert('✅ Word document downloaded successfully!');
}

// Download Google Docs compatible format
function downloadGoogleDocsFormat(data, filename) {
    const projectName = data.project_name || 'Project Documentation';
    
    // Create HTML optimized for Google Docs import
    let htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${projectName}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.8; max-width: 800px; margin: 0 auto; }
        h1 { color: #1a73e8; border-bottom: 3px solid #1a73e8; padding-bottom: 10px; }
        h2 { color: #5f6368; margin-top: 30px; margin-bottom: 15px; }
        h3 { color: #202124; margin-top: 20px; }
        p { margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #dadce0; padding: 10px; text-align: left; }
        th { background-color: #f8f9fa; font-weight: 600; color: #202124; }
        ul, ol { margin-left: 20px; }
        li { margin-bottom: 8px; }
        strong { color: #202124; }
    </style>
</head>
<body>
    <h1>${projectName}</h1>
    <h2>Project Details</h2>
    <table>
        <tr>
            <th style="width: 30%;">Field Name</th>
            <th style="width: 70%;">Content</th>
        </tr>`;

    // Add all data as rows
    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value && value.trim()) {
            htmlContent += `
        <tr>
            <td><strong>${key}</strong></td>
            <td>${value.replace(/\n/g, '<br>')}</td>
        </tr>`;
        }
    });

    htmlContent += `
    </table>
    <p style="margin-top: 40px; color: #5f6368; font-size: 0.9em;">
        <em>This document can be imported into Google Docs for further editing.</em>
    </p>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    
    if (typeof saveAs === 'undefined') {
        alert('FileSaver.js is not loaded! Please check your internet connection.');
        return;
    }
    
    saveAs(blob, filename + '-google-docs.html');
    alert('✅ Google Docs compatible document downloaded! Import this HTML file into Google Docs.');
}

// Open directly in Google Docs with auto-copy
async function openInGoogleDocsDirect() {
    const data = getFormData();
    
    if (!data.project_name) {
        alert('Please enter a project name.');
        return;
    }
    
    closeFormatModal();
    
    const projectName = data.project_name || 'Project Documentation';
    
    // Create HTML table content for clipboard (Google Docs can paste HTML tables)
    let htmlTableContent = `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
<thead>
<tr style="background-color: #1a73e8; color: white;">
<th style="padding: 10px; text-align: left; width: 30%;">Field Name</th>
<th style="padding: 10px; text-align: left; width: 70%;">Content</th>
</tr>
</thead>
<tbody>`;

    // Add project name as header
    htmlTableContent += `<tr>
<td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f8f9fa;">Project Name</td>
<td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(projectName)}</td>
</tr>`;

    // Add all data as table rows
    Object.keys(data).forEach(key => {
        const value = data[key];
        if (value && value.trim()) {
            htmlTableContent += `<tr>
<td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f8f9fa;">${escapeHtml(key)}</td>
<td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(value.replace(/\n/g, '<br>'))}</td>
</tr>`;
        }
    });

    htmlTableContent += `</tbody></table>`;

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    // Try to copy HTML table to clipboard
    try {
        // Create a temporary element with HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlTableContent;
        document.body.appendChild(tempDiv);
        
        // Select the HTML content
        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        // Copy to clipboard
        const successful = document.execCommand('copy');
        selection.removeAllRanges();
        document.body.removeChild(tempDiv);
        
        if (successful) {
            // Open Google Docs
            const googleDocsWindow = window.open('https://docs.google.com/document/create', '_blank');
            
            if (googleDocsWindow) {
                setTimeout(() => {
                    alert('✅ Table copied to clipboard!\n✅ Google Docs opened!\n\n📝 Just press Ctrl+V (or Cmd+V on Mac) to paste the table!\n\nYour content will be pasted as a formatted table!');
                }, 1500);
            } else {
                alert('⚠️ Pop-up blocked! Please allow pop-ups.\n\nTable copied to clipboard - manually open Google Docs and paste.');
            }
        } else {
            // Fallback: Create copy page with HTML table
            createCopyPage(htmlTableContent, projectName, true);
        }
    } catch (error) {
        // Fallback: Create a simple page with copy button
        console.error('Clipboard error:', error);
        createCopyPage(htmlTableContent, projectName, true);
    }
}

// Create a simple page with copy button and Google Docs link
function createCopyPage(content, projectName, isHtmlTable = false) {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Copy to Google Docs - ${projectName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            padding: 40px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            max-width: 900px;
            width: 100%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 { 
            color: #1a73e8; 
            margin-bottom: 20px;
            font-size: 28px;
        }
        .copy-btn {
            background: #34a853;
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            margin: 20px 0;
            width: 100%;
            transition: all 0.3s;
        }
        .copy-btn:hover {
            background: #2d8f47;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(52,168,83,0.4);
        }
        .copy-btn.copied {
            background: #1a73e8;
        }
        .docs-btn {
            background: #1a73e8;
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            margin: 10px 0;
            width: 100%;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            transition: all 0.3s;
        }
        .docs-btn:hover {
            background: #1557b0;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(26,115,232,0.4);
        }
        .info {
            background: #e8f0fe;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            color: #1a73e8;
            font-size: 14px;
        }
        .content-preview {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid #dadce0;
        }
        .content-preview table {
            width: 100%;
            border-collapse: collapse;
        }
        .content-preview table td, .content-preview table th {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left;
        }
        .content-preview table th {
            background-color: #1a73e8;
            color: white;
            font-weight: bold;
        }
        .content-preview table tr:nth-child(even) td:first-child {
            background-color: #f8f9fa;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 Ready for Google Docs</h1>
        
        <div class="info">
            <strong>📋 Instructions:</strong><br>
            1. Click "Copy Table" button below (content will auto-copy)<br>
            2. Click "Open Google Docs" button<br>
            3. Press Ctrl+V (or Cmd+V) to paste<br>
            4. The table will be pasted with proper formatting! ✨
        </div>
        
        <button class="copy-btn" onclick="copyContent()" id="copyBtn">📋 Copy Table</button>
        
        <a href="https://docs.google.com/document/create" target="_blank" class="docs-btn">📧 Open Google Docs</a>
        
        <div class="content-preview" id="preview">${isHtmlTable ? content : escapeHtml(content.substring(0, 500))}...</div>
    </div>
    
    <script>
        function escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, m => map[m]);
        }
        
        const contentToCopy = ${JSON.stringify(content)};
        const isHtmlTable = ${isHtmlTable};
        
        function copyContent() {
            if (isHtmlTable) {
                // For HTML table, use execCommand to copy HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = contentToCopy;
                document.body.appendChild(tempDiv);
                
                const range = document.createRange();
                range.selectNodeContents(tempDiv);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                
                try {
                    const successful = document.execCommand('copy');
                    selection.removeAllRanges();
                    document.body.removeChild(tempDiv);
                    
                    if (successful) {
                        const btn = document.getElementById('copyBtn');
                        btn.textContent = '✅ Table Copied!';
                        btn.classList.add('copied');
                        setTimeout(() => {
                            btn.textContent = '📋 Copy Table';
                            btn.classList.remove('copied');
                        }, 2000);
                    } else {
                        alert('⚠️ Failed to copy. Please manually select and copy the table.');
                    }
                } catch (err) {
                    alert('⚠️ Failed to copy. Please manually select and copy the table.');
                }
            } else {
                // Plain text fallback
                const textarea = document.createElement('textarea');
                textarea.value = contentToCopy;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                textarea.setSelectionRange(0, 99999);
                
                try {
                    document.execCommand('copy');
                    const btn = document.getElementById('copyBtn');
                    btn.textContent = '✅ Copied!';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.textContent = '📋 Copy Table';
                        btn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    alert('⚠️ Failed to copy. Please manually select and copy the content.');
                }
                
                document.body.removeChild(textarea);
            }
        }
        
        // Auto-copy after page loads
        setTimeout(() => {
            copyContent();
        }, 500);
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    window.open(url, '_blank');
    window.open('https://docs.google.com/document/create', '_blank');
    
    alert('✅ Opening Google Docs and content page...\n\nTable will auto-copy - just paste it into Google Docs!');
}

// Close format modal when clicking outside
window.addEventListener('click', function(event) {
    const formatModal = document.getElementById('formatModal');
    if (event.target === formatModal) {
        formatModal.style.display = 'none';
    }
});

// Pre-fill with sample data
function loadSampleData() {
    // 1. Reset the form
    resetForm();

    const sampleData = {
        project_name: 'Vanaha Verdant',
        developer_name: 'By Shapoorji Pallonji Group',
        meta_title: 'Shapoorji Pallonji Vanaha Verdant, Bavdhan, Pune | Price, Floor Plans, Amenities | Download Brochure',
        meta_description: 'Shapoorji Pallonji Vanaha Verdant, Bavdhan, Pune- Residential Project By  Shapoorji Pallonji Offering Beautiful 2 & 3 BHK homes with world-class amenities and seamless connectivity for residents.',
        meta_keywords: 'Vanaha Bavdhan Shapoorji Vanaha Bavdhan Shapoorji Pallonji Vanaha Shapoorji Pallonji Vanaha Verdant Vanaha Verdant Bavdhan Vanaha Township Bavdhan',
        banner_title: 'Vanaha Verdant',
        banner_subtitle: 'By Shapoorji Pallonji Group',
        banner_location: 'Near Bavdhan, Pune',
        banner_price_description: 'Luxurious  2 & 3 BHK starting ₹ 1.05 Cr*',
        offer_1: 'EOI Window Now Open!',
        overview_description: 'Shapoorji Pallonji Vanaha Verdant at Bavdhan, Pune, redefines luxurious living with meticulously crafted 2 & 3 BHK homes. Spanning a vast 1000-acre township, Shapoorji Pallonji Vanaha Verdant boasts over 600 acres of lush greenery and a serene 1.43-acre forest zone. At Shapoorji Pallonji Vanaha Verdant, residents enjoy premium lifestyle amenities designed to elevate daily life. Fitness enthusiasts thrive on the Elevated Cycling Track, while the Watch Tower offers breathtaking panoramic views. Shapoorji Pallonji Vanaha Verdant encourages active recreation with an Outdoor Games Zone and Adventure Sport Zone for thrill-seekers. Families bond at the Barbeque and Outdoor Camping Zones, and the tranquil Bamboo Grove provides a peaceful retreat. Shapoorji Pallonji Vanaha Verdant fosters a vibrant, inclusive community where neighbors connect and grow together. This township isn\'t just a residence—it\'s a place to truly thrive, live, and belong',
        highlight_1: 'book now',
        price_1_type: '2bhk',
        price_1_area: '780 sqft',
        price_1_price: '1.05 Cr*',
        amenities_name1: 'Club house',
        amenities_name2: 'Pool',
        location_connectivity_1: 'Schools',
        location_connectivity_1_value_1: 'Sri Chaitanya Techno School – 10 min',
        about_developer: 'Shapoorji Pallonji Real Estate is a well-known and respected player in the Indian real estate market due to its cutting-edge design innovation, top-notch construction, and outstanding architecture. The organization is dedicated to providing high-quality lifestyle places, including magnificent buildings, reasonably priced apartments, and a helpful workplace. Over 13 million square feet of residential and 6 million square feet of commercial space have been developed by Shapoorji Pallonji Real Estate',
        rera_website: 'Project Registered under Government of India RERA Act 2016 | www.maharera.maharashtra.gov.in',
        homesfy_rera: 'Government RERA Authorised Advertiser\'s: Homesfy Realty Ltd, Registration No A51900000136',
        project_rera: 'PR1260002500246'
    };
    
    // 2. Add extra dynamic fields required by sample data
    addDynamicItem('amenities'); // Add field for amenities_name2

    // 3. Add extra EMPTY fields as per original logic
    for (let i = 0; i < 2; i++) { addDynamicItem('offers'); }
    for (let i = 0; i < 5; i++) { addDynamicItem('highlights'); }
    addDynamicItem('prices');
    
    // 4. Fill all fields (now that they exist)
    Object.keys(sampleData).forEach(key => {
        const input = document.querySelector(`input[name="${key}"], textarea[name="${key}"]`);
        if (input) {
            input.value = sampleData[key];
        }
    });

    // 5. Manually trigger project name update for display
    const projectNameInput = document.querySelector('input[name="project_name"]');
    if(projectNameInput) {
        document.getElementById('projectNameDisplay').textContent = projectNameInput.value;
    }
    
    // 6. Update stats
    updateStats();
}

// Show preview modal
function showPreview() {
    const data = getFormData();
    
    if (!data.project_name) {
        alert('Please enter a project name to preview.');
        return;
    }

    const modal = document.getElementById('previewModal');
    const previewBody = document.getElementById('previewBody');
    let previewHTML = '';

    // Basic Information
    if (data.project_name || data.developer_name) {
        previewHTML += `<div class="preview-section">
            <h3>Basic Information</h3>
            ${data.project_name ? `<p><strong>project_name:</strong> ${data.project_name}</p>` : ''}
            ${data.developer_name ? `<p><strong>developer_name:</strong> ${data.developer_name}</p>` : ''}
        </div>`;
    }

    // SEO & Meta
    if (data.meta_title || data.meta_description || data.meta_keywords) {
        previewHTML += `<div class="preview-section">
            <h3>SEO & Meta Information</h3>
            ${data.meta_title ? `<p><strong>meta_title:</strong> ${data.meta_title}</p>` : ''}
            ${data.meta_description ? `<p><strong>meta_description:</strong> ${data.meta_description}</p>` : ''}
            ${data.meta_keywords ? `<p><strong>meta_keywords:</strong> ${data.meta_keywords}</p>` : ''}
        </div>`;
    }

    // Banner Information
    if (data.banner_title || data.banner_subtitle || data.banner_location || data.banner_price_description || data.starting_price) {
        previewHTML += `<div class="preview-section">
            <h3>Banner Information</h3>
            ${data.banner_title ? `<p><strong>banner_title:</strong> ${data.banner_title}</p>` : ''}
            ${data.banner_subtitle ? `<p><strong>banner_subtitle:</strong> ${data.banner_subtitle}</p>` : ''}
            ${data.banner_location ? `<p><strong>banner_location:</strong> ${data.banner_location}</p>` : ''}
            ${data.banner_price_description ? `<p><strong>banner_price_description:</strong> ${data.banner_price_description}</p>` : ''}
            ${data.starting_price ? `<p><strong>starting_price:</strong> ${data.starting_price}</p>` : ''}
        </div>`;
    }

    // Special Offers
    const offers = Object.keys(data).filter(k => k.startsWith('offer_')).map(k => data[k]).filter(v => v);
    if (offers.length > 0) {
        previewHTML += `<div class="preview-section">
            <h3>Special Offers</h3>
            <ul>${Object.keys(data).filter(k => k.startsWith('offer_')).map(key => `<li><strong>${key}:</strong> ${data[key]}</li>`).join('')}</ul>
        </div>`;
    }

    // Overview
    if (data.overview_description) {
        previewHTML += `<div class="preview-section">
            <h3>Overview</h3>
            <p><strong>overview_description:</strong> ${data.overview_description.replace(/\n/g, '<br>')}</p>
        </div>`;
    }

    // Key Highlights
    const highlights = Object.keys(data).filter(k => k.startsWith('highlight_')).map(k => data[k]).filter(v => v);
    if (highlights.length > 0) {
        previewHTML += `<div class="preview-section">
            <h3>Key Highlights</h3>
            <ul>${Object.keys(data).filter(k => k.startsWith('highlight_')).map(key => `<li><strong>${key}:</strong> ${data[key]}</li>`).join('')}</ul>
        </div>`;
    }

    // Pricing Information
    const prices = [];
    let priceIndex = 1;
    while (data[`price_${priceIndex}_type`] || data[`price_${priceIndex}_area`] || data[`price_${priceIndex}_price`]) {
        prices.push({
            typeKey: `price_${priceIndex}_type`,
            areaKey: `price_${priceIndex}_area`,
            priceKey: `price_${priceIndex}_price`,
            type: data[`price_${priceIndex}_type`],
            area: data[`price_${priceIndex}_area`],
            price: data[`price_${priceIndex}_price`]
        });
        priceIndex++;
    }
    if (prices.length > 0) {
        previewHTML += `<div class="preview-section">
            <h3>Pricing Information</h3>`;
        prices.forEach(price => {
            previewHTML += `<p style="margin-top: 10px;">
                ${price.type ? `<strong>${price.typeKey}:</strong> ${price.type}<br>` : ''}
                ${price.area ? `<strong>${price.areaKey}:</strong> ${price.area}<br>` : ''}
                ${price.price ? `<strong>${price.priceKey}:</strong> ${price.price}` : ''}
            </p>`;
        });
        previewHTML += `</div>`;
    }

    // Amenities
    const amenities = Object.keys(data).filter(k => k.startsWith('amenities_name')).map(k => ({key: k, value: data[k]})).filter(v => v.value);
    if (amenities.length > 0) {
        previewHTML += `<div class="preview-section">
            <h3>Amenities</h3>
            <ul>${amenities.map(a => `<li><strong>${a.key}:</strong> ${a.value}</li>`).join('')}</ul>
        </div>`;
    }

    // Location & Connectivity - Updated for new structure
    const locationCategories = {};
    
    // First, collect all categories
    Object.keys(data).forEach(key => {
        if (key.startsWith('location_connectivity_') && !key.includes('_distance_')) {
            const catIndex = key.replace('location_connectivity_', '');
            locationCategories[catIndex] = {
                category: data[key],
                details: []
            };
        }
    });
    
    // Collect value and distance fields grouped by category and detail index
    Object.keys(locationCategories).forEach(catIndex => {
        // Look for value and distance fields for this category
        let detailIndex = 1;
        while (true) {
            const valueKey = `location_connectivity_${catIndex}_value_${detailIndex}`;
            const distanceKey = `location_connectivity_${catIndex}_distance_${detailIndex}`;
            
            if (data[valueKey] || data[distanceKey]) {
                locationCategories[catIndex].details.push({
                    value: data[valueKey] || '',
                    distance: data[distanceKey] || ''
                });
                detailIndex++;
            } else {
                break;
            }
        }
    });
    
    if (Object.keys(locationCategories).length > 0) {
        previewHTML += `<div class="preview-section">
            <h3>Location & Connectivity</h3>`;
        Object.keys(locationCategories).forEach(catIndex => {
            const category = locationCategories[catIndex];
            if (category.details.length > 0) {
                // Clean category name (remove trailing colon if present)
                const categoryName = (category.category || 'Category').replace(/:\s*$/, '');
                previewHTML += `<p style="margin-top: 15px;"><strong>${categoryName}:</strong></p><ul style="margin-top: 10px; margin-left: 20px;">`;
                category.details.forEach(detail => {
                    const detailText = typeof detail === 'string' ? detail : (detail.value || '');
                    const distanceText = typeof detail === 'object' && detail.distance ? ` - ${detail.distance}` : '';
                    if (detailText) {
                        previewHTML += `<li style="margin-bottom: 5px;">${detailText}${distanceText}</li>`;
                    }
                });
                previewHTML += `</ul>`;
            }
        });
        previewHTML += `</div>`;
    }

    // Developer Information
    if (data.about_developer) {
        previewHTML += `<div class="preview-section">
            <h3>Developer Information</h3>
            <p><strong>about_developer:</strong> ${data.about_developer.replace(/\n/g, '<br>')}</p>
        </div>`;
    }

    // RERA Information
    if (data.rera_website || data.homesfy_rera || data.project_rera) {
        previewHTML += `<div class="preview-section">
            <h3>RERA Information</h3>
            ${data.rera_website ? `<p><strong>rera_website:</strong> ${data.rera_website.replace(/\n/g, '<br>')}</p>` : ''}
            ${data.homesfy_rera ? `<p><strong>homesfy_rera:</strong> ${data.homesfy_rera.replace(/\n/g, '<br>')}</p>` : ''}
            ${data.project_rera ? `<p><strong>project_rera:</strong> ${data.project_rera}</p>` : ''}
        </div>`;
    }

    previewBody.innerHTML = previewHTML || '<p style="text-align: center; color: #999; padding: 40px;">No content to preview. Please fill in some fields first.</p>';
    modal.style.display = 'block';
}

// Close preview modal
function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update project name display
    const projectNameInput = document.querySelector('input[name="project_name"]');
    if (projectNameInput) {
        projectNameInput.addEventListener('input', function() {
            const projectName = this.value || 'Enter project name to display here';
            document.getElementById('projectNameDisplay').textContent = projectName;
        });
    }

    // Add event listeners to all inputs
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updateStats);
    });

    // Initialize stats
    updateStats();
    
    // Initialize location detail counters
    counters.locationDetailCounters = { 1: 1 };
});

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const fileName = file.name.toLowerCase();
    const reader = new FileReader();
    
    if (fileName.endsWith('.csv')) {
        reader.onload = function(e) {
            const text = e.target.result;
            parseAndLoadCSV(text);
        };
        reader.readAsText(file);
    } else if (fileName.endsWith('.html') || fileName.endsWith('.htm') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        // Handle HTML and Word files (our .docx files are HTML-based)
        reader.onload = function(e) {
            const text = e.target.result;
            parseAndLoadHTML(text);
        };
        reader.readAsText(file);
    } else if (fileName.endsWith('.txt')) {
        // Try to parse as CSV-like format
        reader.onload = function(e) {
            const text = e.target.result;
            // Check if it looks like CSV format
            if (text.includes(',') && text.includes('Classname')) {
                parseAndLoadCSV(text);
            } else {
                parseAndLoadHTML(text);
            }
        };
        reader.readAsText(file);
    } else {
        alert('Unsupported file format. Please upload CSV, HTML, Word (.doc/.docx), or TXT file.');
        event.target.value = '';
        return;
    }
    
    // Reset file input
    event.target.value = '';
}

// Parse CSV and load data
function parseAndLoadCSV(csvText) {
    // 1. Reset the form
    resetForm();
    
    const lines = csvText.split('\n');
    const data = {};
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line (handle quoted values)
        const match = line.match(/^([^,]+),"?(.+?)"?$/);
        if (match && match.length === 3) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^"|"$/g, '').replace(/""/g, '"');
            if (key && value) {
                data[key] = value;
            }
        }
    }
    
    // 2. Fill the form with uploaded data
    Object.keys(data).forEach(key => {
        const input = document.querySelector(`input[name="${key}"], textarea[name="${key}"]`);
        if (input) {
            input.value = data[key];
        } else {
            // Handle dynamic fields
            if (key.startsWith('offer_')) {
                const index = key.replace('offer_', '');
                while (counters.offers < parseInt(index)) {
                    addDynamicItem('offers');
                }
            } else if (key.startsWith('highlight_')) {
                const index = key.replace('highlight_', '');
                while (counters.highlights < parseInt(index)) {
                    addDynamicItem('highlights');
                }
            } else if (key.startsWith('amenities_name')) {
                const index = key.replace('amenities_name', '');
                while (counters.amenities < parseInt(index)) {
                    addDynamicItem('amenities');
                }
            } else if (key.startsWith('location_connectivity_')) {
                // Check if it's a category field (just connectivity, not _value_ or _distance_)
                if (!key.includes('_value_') && !key.includes('_distance_')) {
                    const index = key.replace('location_connectivity_', '');
                    while (counters.location < parseInt(index)) {
                        addLocationCategory();
                    }
                } else if (key.includes('_value_')) {
                    // Handle location value fields: location_connectivity_X_value_Y
                    const match = key.match(/location_connectivity_(\d+)_value_(\d+)/);
                    if (match) {
                        const catIndex = parseInt(match[1]);
                        const detailIndex = parseInt(match[2]);
                        
                        // Ensure category exists
                        while (counters.location < catIndex) {
                            addLocationCategory();
                        }
                        
                        // Ensure enough details exist for this category
                        if (!counters.locationDetailCounters[catIndex]) {
                            counters.locationDetailCounters[catIndex] = 0;
                        }
                        while (counters.locationDetailCounters[catIndex] < detailIndex) {
                            addLocationDetail(catIndex);
                        }
                    }
                } else if (key.includes('_distance_')) {
                    // Handle location distance fields: location_connectivity_X_distance_Y
                    const match = key.match(/location_connectivity_(\d+)_distance_(\d+)/);
                    if (match) {
                        const catIndex = parseInt(match[1]);
                        const detailIndex = parseInt(match[2]);
                        
                        // Ensure category exists
                        while (counters.location < catIndex) {
                            addLocationCategory();
                        }
                        
                        // Ensure enough details exist for this category
                        if (!counters.locationDetailCounters[catIndex]) {
                            counters.locationDetailCounters[catIndex] = 0;
                        }
                        while (counters.locationDetailCounters[catIndex] < detailIndex) {
                            addLocationDetail(catIndex);
                        }
                    }
                }
            } else if (key.startsWith('price_')) {
                const parts = key.split('_');
                if (parts.length === 3) {
                    const index = parts[1];
                    while (counters.prices < parseInt(index)) {
                        addDynamicItem('prices');
                    }
                }
            }
        }
    });
    
    // 3. Fill the fields *after* all dynamic items have been created
    setTimeout(() => {
        Object.keys(data).forEach(key => {
            const field = document.querySelector(`input[name="${key}"], textarea[name="${key}"]`);
            if (field) field.value = data[key];
        });

        // 4. Update project name display
        const projectNameInput = document.querySelector('input[name="project_name"]');
        if (projectNameInput && data.project_name) {
            document.getElementById('projectNameDisplay').textContent = data.project_name;
        }
        
        // 5. Update stats
        updateStats();
    }, 100);
    
    alert('✅ CSV file uploaded and loaded successfully!');
}

// Parse HTML/Word document and load data
function parseAndLoadHTML(htmlText) {
    // 1. Reset the form
    resetForm();
    
    // Remove BOM (Byte Order Mark) if present (common in UTF-8 files)
    if (htmlText.charCodeAt(0) === 0xFEFF) {
        htmlText = htmlText.slice(1);
    }
    // Also check for BOM at start
    htmlText = htmlText.replace(/^\ufeff/, '');
    
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    
    // Try to parse as HTML first
    try {
        tempDiv.innerHTML = htmlText;
    } catch (e) {
        // If parsing fails, try to extract just the body content
        const bodyMatch = htmlText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) {
            tempDiv.innerHTML = bodyMatch[1];
        } else {
            tempDiv.innerHTML = htmlText;
        }
    }
    
    // Try to find data table
    const tables = tempDiv.querySelectorAll('table');
    const data = {};
    
    if (tables.length > 0) {
        // Find the table with field names and content
        tables.forEach(table => {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td, th');
                if (cells.length >= 2) {
                    let fieldName = '';
                    let fieldValue = '';
                    
                    // Get text content from cells
                    const firstCell = cells[0];
                    const secondCell = cells[1];
                    
                    // Extract text, handling innerHTML if needed
                    if (firstCell.innerHTML) {
                        fieldName = firstCell.innerHTML.replace(/<strong[^>]*>|<\/strong>/gi, '').replace(/<[^>]*>/g, '').trim();
                    } else {
                        fieldName = firstCell.textContent.trim();
                    }
                    
                    if (secondCell.innerHTML) {
                        fieldValue = secondCell.innerHTML.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '').trim();
                    } else {
                        fieldValue = secondCell.textContent.trim();
                    }
                    
                    // Clean field name - remove any remaining HTML tags
                    fieldName = fieldName.replace(/<[^>]*>/g, '').trim();
                    fieldValue = fieldValue.replace(/<[^>]*>/g, '').trim();
                    
                    // Replace multiple newlines with single newline
                    fieldValue = fieldValue.replace(/\n+/g, '\n');
                    
                    if (fieldName && fieldValue) {
                        data[fieldName] = fieldValue;
                    }
                }
            });
        });
    } else {
        // If no table found, try to extract from any structured data
        // Look for data attributes or specific patterns
        const dataElements = tempDiv.querySelectorAll('[data-field], [name]');
        dataElements.forEach(element => {
            const fieldName = element.getAttribute('data-field') || element.getAttribute('name');
            const fieldValue = element.textContent.trim();
            if (fieldName && fieldValue) {
                data[fieldName] = fieldValue;
            }
        });
    }
    
    // If no data found in tables, try to parse as plain text with key-value pairs
    if (Object.keys(data).length === 0) {
        const textContent = tempDiv.textContent || htmlText;
        const lines = textContent.split('\n');
        
        lines.forEach(line => {
            const match = line.match(/^([^:]+):\s*(.+)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim();
                if (key && value) {
                    data[key] = value;
                }
            }
        });
    }
    
    if (Object.keys(data).length === 0) {
        alert('⚠️ Could not extract data from the document. Please ensure it contains a table with field names and values.');
        return;
    }
    
    // 2. Fill the form with uploaded data (similar to CSV parsing)
    Object.keys(data).forEach(key => {
        const input = document.querySelector(`input[name="${key}"], textarea[name="${key}"]`);
        if (input) {
            input.value = data[key];
        } else {
            // Handle dynamic fields
            if (key.startsWith('offer_')) {
                const index = key.replace('offer_', '');
                while (counters.offers < parseInt(index)) {
                    addDynamicItem('offers');
                }
            } else if (key.startsWith('highlight_')) {
                const index = key.replace('highlight_', '');
                while (counters.highlights < parseInt(index)) {
                    addDynamicItem('highlights');
                }
            } else if (key.startsWith('amenities_name')) {
                const index = key.replace('amenities_name', '');
                while (counters.amenities < parseInt(index)) {
                    addDynamicItem('amenities');
                }
            } else if (key.startsWith('location_connectivity_')) {
                if (!key.includes('_value_') && !key.includes('_distance_')) {
                    const index = key.replace('location_connectivity_', '');
                    while (counters.location < parseInt(index)) {
                        addLocationCategory();
                    }
                } else if (key.includes('_value_')) {
                    const match = key.match(/location_connectivity_(\d+)_value_(\d+)/);
                    if (match) {
                        const catIndex = parseInt(match[1]);
                        const detailIndex = parseInt(match[2]);
                        while (counters.location < catIndex) {
                            addLocationCategory();
                        }
                        if (!counters.locationDetailCounters[catIndex]) {
                            counters.locationDetailCounters[catIndex] = 0;
                        }
                        while (counters.locationDetailCounters[catIndex] < detailIndex) {
                            addLocationDetail(catIndex);
                        }
                    }
                } else if (key.includes('_distance_')) {
                    const match = key.match(/location_connectivity_(\d+)_distance_(\d+)/);
                    if (match) {
                        const catIndex = parseInt(match[1]);
                        const detailIndex = parseInt(match[2]);
                        while (counters.location < catIndex) {
                            addLocationCategory();
                        }
                        if (!counters.locationDetailCounters[catIndex]) {
                            counters.locationDetailCounters[catIndex] = 0;
                        }
                        while (counters.locationDetailCounters[catIndex] < detailIndex) {
                            addLocationDetail(catIndex);
                        }
                    }
                }
            } else if (key.startsWith('price_')) {
                const parts = key.split('_');
                if (parts.length === 3) {
                    const index = parts[1];
                    while (counters.prices < parseInt(index)) {
                        addDynamicItem('prices');
                    }
                }
            }
        }
    });
    
    // 3. Fill the fields *after* all dynamic items have been created
    setTimeout(() => {
        Object.keys(data).forEach(key => {
            const field = document.querySelector(`input[name="${key}"], textarea[name="${key}"]`);
            if (field) field.value = data[key];
        });

        // 4. Update project name display
        const projectNameInput = document.querySelector('input[name="project_name"]');
        if (projectNameInput && data.project_name) {
            document.getElementById('projectNameDisplay').textContent = data.project_name;
        }
        
        // 5. Update stats
        updateStats();
    }, 100);
    
    alert('✅ Document uploaded and loaded successfully!');
}

