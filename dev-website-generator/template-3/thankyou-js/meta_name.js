// meta.js

// Function to set meta tags from data-field attributes
function setMetaTags() {
    // Get meta title from data-field="meta_title"
    const titleElement = document.querySelector('title[data-field="meta_title"]');
    if (titleElement) {
        const titleText = titleElement.textContent || titleElement.innerText || titleElement.innerHTML;
        if (titleText && titleText.trim()) {
            document.title = titleText.trim();
        }
    }

    // Get meta description from data-field="meta_description"
    const metaDescriptionElement = document.querySelector('meta[name="description"][data-field="meta_description"]');
    if (metaDescriptionElement) {
        const descriptionContent = metaDescriptionElement.getAttribute("content");
        if (descriptionContent && descriptionContent.trim()) {
            // Ensure the content is properly set
            metaDescriptionElement.setAttribute("content", descriptionContent.trim());
        }
    }

    // Get meta keywords from data-field="meta_keywords"
    const metaKeywordsElement = document.querySelector('meta[name="keywords"][data-field="meta_keywords"]');
    if (metaKeywordsElement) {
        const keywordsContent = metaKeywordsElement.getAttribute("content");
        if (keywordsContent && keywordsContent.trim()) {
            // Ensure the content is properly set
            metaKeywordsElement.setAttribute("content", keywordsContent.trim());
        }
    }
}

// Call the function to set meta tags when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setMetaTags);
} else {
    // DOM already loaded, run immediately
    setMetaTags();
}

// Also run after a short delay to ensure all content is loaded
setTimeout(setMetaTags, 100);