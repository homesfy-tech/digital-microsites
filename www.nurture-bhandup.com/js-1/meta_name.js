// meta.js

// Define your meta title and description here
const metaTitle = "Lodha Divino Matunga East | Elegant 2 & 3 BHK Residences";
const metaDescription = "Experience luxury at Lodha Divino, Matunga East. Discover elegant 2 & 3 BHK homes with top-notch amenities and exceptional design. Visit us today to find your perfect residence!";

// Function to set meta tags
function setMetaTags() {
    document.title = metaTitle;

    // Set meta description
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute("content", metaDescription);
    } else {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.setAttribute("name", "description");
        metaDescriptionTag.setAttribute("content", metaDescription);
        document.head.appendChild(metaDescriptionTag);
    }
}

// Call the function to set meta tags
setMetaTags();