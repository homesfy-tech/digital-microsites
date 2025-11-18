document.addEventListener('DOMContentLoaded', function () {
    function navbarToggleMenu() {
        const navbarMobileMenu = document.getElementById('navbarMobileMenu');
        const navbarHamburger = document.querySelector('.navbarHamburger');
        const body = document.body;

        navbarMobileMenu.classList.toggle('navbarMobileMenuActive');
        navbarHamburger.classList.toggle('navbarHamburgerActive');
        body.classList.toggle('navbarBodyLocked');
    }

    // Close mobile menu when clicking on menu items
    document.querySelectorAll('.navbarMobileMenuLink').forEach(link => {
        link.addEventListener('click', () => {
            navbarToggleMenu();
        });
    });

    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            const navbarMobileMenu = document.getElementById('navbarMobileMenu');
            const navbarHamburger = document.querySelector('.navbarHamburger');
            const body = document.body;

            navbarMobileMenu.classList.remove('navbarMobileMenuActive');
            navbarHamburger.classList.remove('navbarHamburgerActive');
            body.classList.remove('navbarBodyLocked');
        }
    });
});



// Form submission
document.getElementById('bannerLeadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.bannerFormSubmit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span class="bannerFormSubmitText">Submitting...</span>';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your interest! Our team will contact you soon.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Pause auto-slide on hover
document.querySelector('.banner').addEventListener('mouseenter', bannerStopAutoSlide);
document.querySelector('.banner').addEventListener('mouseleave', bannerStartAutoSlide);

// Initialize on page load
document.addEventListener('DOMContentLoaded', bannerInit);

// Handle window resize
window.addEventListener('resize', () => {
    // Restart auto-slide to prevent timing issues
    bannerRestartAutoSlide();
});



// Add smooth scrolling and interactive effects
document.addEventListener('DOMContentLoaded', function () {
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to sections
    const sections = document.querySelectorAll('.overview-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Add hover effects to feature items
    const featureItems = document.querySelectorAll('.overview-features-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'rgba(244, 196, 48, 0.05)';
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mouseleave', function () {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });

     }); 

    document.addEventListener("DOMContentLoaded", function () {
        // Read More functionality
        const readMoreBtn = document.getElementById('readMoreBtn');
        const overviewText = document.getElementById('overviewText');
        let isExpanded = false;

        if (readMoreBtn && overviewText) {
            readMoreBtn.addEventListener('click', function () {
                if (!isExpanded) {
                    // Expand text
                    overviewText.classList.remove('collapsed');
                    readMoreBtn.innerHTML = 'Read Less <span class="overview-read-more-arrow">▼</span>';
                    readMoreBtn.classList.add('expanded');
                    isExpanded = true;
                } else {
                    // Collapse text
                    overviewText.classList.add('collapsed');
                    readMoreBtn.innerHTML = 'Read More <span class="overview-read-more-arrow">▶</span>';
                    readMoreBtn.classList.remove('expanded');
                    isExpanded = false;

                    // Smooth scroll back to the beginning of the section
                    overviewText.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        } else {
            console.warn('readMoreBtn or overviewText not found in DOM.');
        }
    });




    // Add click interaction to the enquire button
    document.querySelector('.enquire-btn').addEventListener('click', function () {
        // Add a subtle click animation
        this.style.transform = 'translateY(0) scale(0.98)';

        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
            // Here you would typically handle the form submission or redirect
            alert('Thank you for your interest! Our team will contact you soon.');
        }, 150);
    });

    // Add hover effect to benefit items
    document.querySelectorAll('.benefit-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'rgba(255, 201, 71, 0.1)';
            this.style.transform = 'translateX(3px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });


    // <!-- Map -->

    // Accordion functionality
    document.addEventListener('DOMContentLoaded', function () {
        const mapAccordionHeaders = document.querySelectorAll('.map-accordion-header');

        mapAccordionHeaders.forEach(header => {
            header.addEventListener('click', function () {
                const target = this.getAttribute('data-target');
                const content = document.getElementById(target);
                const isActive = this.classList.contains('map-active');

                // Close all accordions
                mapAccordionHeaders.forEach(h => {
                    h.classList.remove('map-active');
                    const c = document.getElementById(h.getAttribute('data-target'));
                    c.classList.remove('map-active');
                });

                // Open clicked accordion if it wasn't active
                if (!isActive) {
                    this.classList.add('map-active');
                    content.classList.add('map-active');
                }
            });
        });
    });

    function handleSiteVisit() {
        alert('Site visit request submitted! Our team will contact you soon.');
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';



    class GalleryCarousel {
        constructor() {
            // Sample images - replace with your own
            this.galleryImages = [
                'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
            ];

            this.galleryCurrentIndex = 0;
            this.galleryTotalSlides = this.galleryImages.length;
            this.galleryTrack = document.getElementById('galleryTrack');
            this.galleryDotsContainer = document.getElementById('galleryDots');
            this.galleryPrevBtn = document.getElementById('galleryPrev');
            this.galleryNextBtn = document.getElementById('galleryNext');
            this.galleryAutoPlayInterval = null;
            this.galleryIsTransitioning = false;
            this.galleryPosition = 0;

            // Lightbox elements
            this.lightbox = document.getElementById('lightbox');
            this.lightboxImage = document.getElementById('lightboxImage');
            this.lightboxClose = document.getElementById('lightboxClose');
            this.lightboxPrev = document.getElementById('lightboxPrev');
            this.lightboxNext = document.getElementById('lightboxNext');
            this.lightboxCounter = document.getElementById('lightboxCounter');
            this.lightboxCurrentIndex = 0;

            this.galleryInit();
        }

        async galleryInit() {
            await this.galleryCreateSlides();
            this.galleryCreateDots();
            this.galleryBindEvents();
            this.galleryBindLightboxEvents();
            this.galleryUpdateCarousel();
            this.galleryStartAutoPlay();

            // Hide loading message
            document.querySelector('.gallery-loading').style.display = 'none';
        }

        async galleryCreateSlides() {
            // Create many duplicates for true infinite scroll
            const galleryInfiniteImages = [];

            // Add multiple copies of images for seamless infinite scroll
            for (let i = 0; i < 5; i++) {
                galleryInfiniteImages.push(...this.galleryImages);
            }

            for (let i = 0; i < galleryInfiniteImages.length; i++) {
                const gallerySlide = document.createElement('div');
                gallerySlide.className = 'gallery-slide';

                const galleryImg = document.createElement('img');
                galleryImg.className = 'gallery-image';
                galleryImg.src = galleryInfiniteImages[i];
                galleryImg.alt = `Gallery image ${(i % this.galleryTotalSlides) + 1}`;
                galleryImg.loading = 'lazy';

                // Add click event for lightbox
                galleryImg.addEventListener('click', () => {
                    this.openLightbox(i % this.galleryTotalSlides);
                });

                // Add error handling for images
                galleryImg.onerror = () => {
                    galleryImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                };

                gallerySlide.appendChild(galleryImg);
                this.galleryTrack.appendChild(gallerySlide);
            }

            // Start position to show first image in center
            this.galleryPosition = this.galleryTotalSlides;
            this.galleryCurrentIndex = 0;
            this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * 33.333}%)`;
        }

        galleryCreateDots() {
            for (let i = 0; i < this.galleryTotalSlides; i++) {
                const galleryDot = document.createElement('button');
                galleryDot.className = 'gallery-dot';
                galleryDot.addEventListener('click', () => this.galleryGoToSlide(i));
                this.galleryDotsContainer.appendChild(galleryDot);
            }
        }

        galleryBindEvents() {
            this.galleryPrevBtn.addEventListener('click', () => this.galleryPrevSlide());
            this.galleryNextBtn.addEventListener('click', () => this.galleryNextSlide());

            // Touch events for mobile
            let galleryStartX = 0;
            let galleryEndX = 0;

            this.galleryTrack.addEventListener('touchstart', (e) => {
                galleryStartX = e.touches[0].clientX;
            });

            this.galleryTrack.addEventListener('touchend', (e) => {
                galleryEndX = e.changedTouches[0].clientX;
                const galleryDiff = galleryStartX - galleryEndX;

                if (Math.abs(galleryDiff) > 50) { // Minimum swipe distance
                    if (galleryDiff > 0) {
                        this.galleryNextSlide();
                    } else {
                        this.galleryPrevSlide();
                    }
                }
            });

            // Pause autoplay on hover
            this.galleryTrack.addEventListener('mouseenter', () => this.galleryStopAutoPlay());
            this.galleryTrack.addEventListener('mouseleave', () => this.galleryStartAutoPlay());

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.galleryPrevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.galleryNextSlide();
                }
            });
        }

        galleryBindLightboxEvents() {
            // Close lightbox events
            this.lightboxClose.addEventListener('click', () => this.closeLightbox());
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });

            // Lightbox navigation
            this.lightboxPrev.addEventListener('click', () => this.lightboxPrevImage());
            this.lightboxNext.addEventListener('click', () => this.lightboxNextImage());

            // Keyboard events for lightbox
            document.addEventListener('keydown', (e) => {
                if (this.lightbox.classList.contains('active')) {
                    if (e.key === 'Escape') {
                        this.closeLightbox();
                    } else if (e.key === 'ArrowLeft') {
                        this.lightboxPrevImage();
                    } else if (e.key === 'ArrowRight') {
                        this.lightboxNextImage();
                    }
                }
            });
        }

        openLightbox(index) {
            this.lightboxCurrentIndex = index;
            this.lightboxImage.src = this.galleryImages[index];
            this.updateLightboxCounter();
            this.lightbox.classList.add('active');
            this.galleryStopAutoPlay();
            document.body.style.overflow = 'hidden';
        }

        closeLightbox() {
            this.lightbox.classList.remove('active');
            this.galleryStartAutoPlay();
            document.body.style.overflow = 'auto';
        }

        lightboxPrevImage() {
            this.lightboxCurrentIndex = (this.lightboxCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;
            this.lightboxImage.src = this.galleryImages[this.lightboxCurrentIndex];
            this.updateLightboxCounter();
        }

        lightboxNextImage() {
            this.lightboxCurrentIndex = (this.lightboxCurrentIndex + 1) % this.galleryTotalSlides;
            this.lightboxImage.src = this.galleryImages[this.lightboxCurrentIndex];
            this.updateLightboxCounter();
        }

        updateLightboxCounter() {
            this.lightboxCounter.textContent = `${this.lightboxCurrentIndex + 1} / ${this.galleryTotalSlides}`;
        }

        galleryUpdateCarousel() {
            const gallerySlides = this.galleryTrack.querySelectorAll('.gallery-slide');
            const galleryDots = this.galleryDotsContainer.querySelectorAll('.gallery-dot');

            // Calculate which slide is in the center based on screen size
            const galleryIsMobile = window.innerWidth <= 480;
            const galleryCenterIndex = galleryIsMobile ?
                this.galleryPosition + 1 : // Mobile: center of 2 visible slides
                this.galleryPosition + 1;   // Desktop: center of 3 visible slides

            // Update center slide highlighting
            gallerySlides.forEach((slide, index) => {
                slide.classList.remove('gallery-center');
                if (index === galleryCenterIndex) {
                    slide.classList.add('gallery-center');
                }
            });

            // Update active dot
            galleryDots.forEach((dot, index) => {
                dot.classList.remove('gallery-active');
                if (index === this.galleryCurrentIndex) {
                    dot.classList.add('gallery-active');
                }
            });

            // Move carousel with different calculations for mobile vs desktop
            const gallerySlideWidth = galleryIsMobile ? 50 : 33.333;
            const galleryTranslateX = -(this.galleryPosition * gallerySlideWidth);
            this.galleryTrack.style.transform = `translateX(${galleryTranslateX}%)`;
        }

        galleryNextSlide() {
            if (this.galleryIsTransitioning) return;
            this.galleryIsTransitioning = true;

            this.galleryPosition++;
            this.galleryCurrentIndex = (this.galleryCurrentIndex + 1) % this.galleryTotalSlides;

            this.galleryUpdateCarousel();

            // Reset position when we've gone too far (seamless infinite scroll)
            setTimeout(() => {
                if (this.galleryPosition >= this.galleryTotalSlides * 3) {
                    this.galleryTrack.style.transition = 'none';
                    this.galleryPosition = this.galleryTotalSlides;

                    const galleryIsMobile = window.innerWidth <= 480;
                    const gallerySlideWidth = galleryIsMobile ? 50 : 33.333;
                    this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * gallerySlideWidth}%)`;

                    setTimeout(() => {
                        this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 50);
                }
                this.galleryIsTransitioning = false;
            }, 600);
        }

        galleryPrevSlide() {
            if (this.galleryIsTransitioning) return;
            this.galleryIsTransitioning = true;

            this.galleryPosition--;
            this.galleryCurrentIndex = (this.galleryCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;

            this.galleryUpdateCarousel();

            // Reset position when we've gone too far back (seamless infinite scroll)
            setTimeout(() => {
                if (this.galleryPosition <= 0) {
                    this.galleryTrack.style.transition = 'none';
                    this.galleryPosition = this.galleryTotalSlides * 2;

                    const galleryIsMobile = window.innerWidth <= 480;
                    const gallerySlideWidth = galleryIsMobile ? 50 : 33.333;
                    this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * gallerySlideWidth}%)`;

                    setTimeout(() => {
                        this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 50);
                }
                this.galleryIsTransitioning = false;
            }, 600);
        }

        galleryGoToSlide(index) {
            if (this.galleryIsTransitioning || index === this.galleryCurrentIndex) return;

            this.galleryIsTransitioning = true;

            // Calculate the shortest path to the target slide
            const galleryDiff = index - this.galleryCurrentIndex;
            this.galleryPosition += galleryDiff;
            this.galleryCurrentIndex = index;

            this.galleryUpdateCarousel();

            setTimeout(() => {
                this.galleryIsTransitioning = false;
            }, 600);
        }

        galleryStartAutoPlay() {
            this.galleryStopAutoPlay();
            this.galleryAutoPlayInterval = setInterval(() => {
                this.galleryNextSlide();
            }, 4000);
        }

        galleryStopAutoPlay() {
            if (this.galleryAutoPlayInterval) {
                clearInterval(this.galleryAutoPlayInterval);
                this.galleryAutoPlayInterval = null;
            }
        }
    }

    // Initialize carousel when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        new GalleryCarousel();
    });


    // <!-- Amenities -->

    class AmenitiesCarousel {
        constructor() {
            // Get the original slides
            this.originalSlides = Array.from(document.querySelectorAll('.amenities-slide'));
            this.amenitiesTotalSlides = this.originalSlides.length;

            // Store data for lightbox
            this.amenitiesImages = [];
            this.amenitiesTexts = [];

            // Extract data from original slides
            this.originalSlides.forEach(slide => {
                const img = slide.querySelector('.amenities-image');
                const text = slide.querySelector('.amenities-text-overlay');
                this.amenitiesImages.push(img.src);
                this.amenitiesTexts.push(text.textContent);

                // Add error handling for images
                img.onerror = () => {
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                };
            });

            // Setup carousel variables
            this.amenitiesCurrentIndex = 0;
            this.amenitiesTrack = document.getElementById('amenitiesTrack');
            this.amenitiesDotsContainer = document.getElementById('amenitiesDots');
            this.amenitiesPrevBtn = document.getElementById('amenitiesPrev');
            this.amenitiesNextBtn = document.getElementById('amenitiesNext');
            this.amenitiesAutoPlayInterval = null;
            this.amenitiesIsTransitioning = false;

            // Calculate starting position for seamless infinite scroll
            this.amenitiesPosition = this.amenitiesTotalSlides;

            // Lightbox elements
            this.amenitiesLightbox = document.getElementById('amenitiesLightbox');
            this.amenitiesLightboxImage = document.getElementById('amenitiesLightboxImage');
            this.amenitiesLightboxClose = document.getElementById('amenitiesLightboxClose');
            this.amenitiesLightboxPrev = document.getElementById('amenitiesLightboxPrev');
            this.amenitiesLightboxNext = document.getElementById('amenitiesLightboxNext');
            this.amenitiesLightboxCounter = document.getElementById('amenitiesLightboxCounter');
            this.amenitiesLightboxTitle = document.getElementById('amenitiesLightboxTitle');
            this.amenitiesLightboxCurrentIndex = 0;

            // Initialize the carousel
            this.amenitiesInit();
        }

        amenitiesInit() {
            // Clone slides for infinite effect
            this.amenitiesCloneSlides();

            // Create dots
            this.amenitiesCreateDots();

            // Bind events
            this.amenitiesBindEvents();
            this.amenitiesBindLightboxEvents();

            // Position the carousel
            this.amenitiesUpdateCarousel();

            // Start autoplay
            this.amenitiesStartAutoPlay();
        }

        amenitiesCloneSlides() {
            // Create clones for infinite scrolling effect
            const fragmentStart = document.createDocumentFragment();
            const fragmentEnd = document.createDocumentFragment();

            // Clone first 3 slides to the end
            for (let i = 0; i < 3; i++) {
                const clone = this.originalSlides[i].cloneNode(true);
                fragmentEnd.appendChild(clone);
            }

            // Clone last 3 slides to the beginning
            for (let i = this.amenitiesTotalSlides - 3; i < this.amenitiesTotalSlides; i++) {
                const clone = this.originalSlides[i].cloneNode(true);
                fragmentStart.appendChild(clone);
            }

            // Append clones to track
            this.amenitiesTrack.prepend(fragmentStart);
            this.amenitiesTrack.appendChild(fragmentEnd);

            // Setup image click events for all slides
            this.amenitiesSetupImageClickEvents();
        }

        amenitiesSetupImageClickEvents() {
            const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
            slides.forEach((slide, index) => {
                const img = slide.querySelector('.amenities-image');
                img.addEventListener('click', () => {
                    // Calculate original image index
                    const totalSlides = slides.length;
                    const originalIndex = (index - 3 + totalSlides) % this.amenitiesTotalSlides;
                    this.openAmenitiesLightbox(originalIndex);
                });
            });
        }

        amenitiesCreateDots() {
            for (let i = 0; i < this.amenitiesTotalSlides; i++) {
                const amenitiesDot = document.createElement('button');
                amenitiesDot.className = 'amenities-dot';
                amenitiesDot.addEventListener('click', () => this.amenitiesGoToSlide(i));
                this.amenitiesDotsContainer.appendChild(amenitiesDot);
            }
        }

        amenitiesBindEvents() {
            this.amenitiesPrevBtn.addEventListener('click', () => this.amenitiesPrevSlide());
            this.amenitiesNextBtn.addEventListener('click', () => this.amenitiesNextSlide());

            // Touch events for mobile
            let amenitiesStartX = 0;
            let amenitiesEndX = 0;

            this.amenitiesTrack.addEventListener('touchstart', (e) => {
                amenitiesStartX = e.touches[0].clientX;
            });

            this.amenitiesTrack.addEventListener('touchend', (e) => {
                amenitiesEndX = e.changedTouches[0].clientX;
                const amenitiesDiff = amenitiesStartX - amenitiesEndX;

                if (Math.abs(amenitiesDiff) > 50) {
                    if (amenitiesDiff > 0) {
                        this.amenitiesNextSlide();
                    } else {
                        this.amenitiesPrevSlide();
                    }
                }
            });

            // Pause autoplay on hover
            this.amenitiesTrack.addEventListener('mouseenter', () => this.amenitiesStopAutoPlay());
            this.amenitiesTrack.addEventListener('mouseleave', () => this.amenitiesStartAutoPlay());

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.amenitiesPrevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.amenitiesNextSlide();
                } else if (e.key === 'Escape' && this.amenitiesLightbox.classList.contains('active')) {
                    this.closeAmenitiesLightbox();
                }
            });
        }

        amenitiesBindLightboxEvents() {
            // Close lightbox events
            this.amenitiesLightboxClose.addEventListener('click', () => this.closeAmenitiesLightbox());
            this.amenitiesLightbox.addEventListener('click', (e) => {
                if (e.target === this.amenitiesLightbox) {
                    this.closeAmenitiesLightbox();
                }
            });

            // Lightbox navigation
            this.amenitiesLightboxPrev.addEventListener('click', () => this.amenitiesLightboxPrevImage());
            this.amenitiesLightboxNext.addEventListener('click', () => this.amenitiesLightboxNextImage());
        }

        openAmenitiesLightbox(index) {
            this.amenitiesLightboxCurrentIndex = index;
            this.amenitiesLightboxImage.src = this.amenitiesImages[index];
            this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[index];
            this.updateAmenitiesLightboxCounter();
            this.amenitiesLightbox.classList.add('active');
            this.amenitiesStopAutoPlay();
            document.body.style.overflow = 'hidden';
        }

        closeAmenitiesLightbox() {
            this.amenitiesLightbox.classList.remove('active');
            this.amenitiesStartAutoPlay();
            document.body.style.overflow = 'auto';
        }

        amenitiesLightboxPrevImage() {
            this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
            this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
            this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
            this.updateAmenitiesLightboxCounter();
        }

        amenitiesLightboxNextImage() {
            this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex + 1) % this.amenitiesTotalSlides;
            this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
            this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
            this.updateAmenitiesLightboxCounter();
        }

        updateAmenitiesLightboxCounter() {
            this.amenitiesLightboxCounter.textContent = `${this.amenitiesLightboxCurrentIndex + 1} / ${this.amenitiesTotalSlides}`;
        }

        amenitiesUpdateCarousel() {
            const amenitiesSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
            const amenitiesDots = this.amenitiesDotsContainer.querySelectorAll('.amenities-dot');

            // Calculate which slide is in the center
            const amenitiesIsMobile = window.innerWidth <= 576;
            const amenitiesCenterIndex = amenitiesIsMobile ?
                this.amenitiesPosition + 1 :
                this.amenitiesPosition + 1;

            // Update center slide highlighting
            amenitiesSlides.forEach((slide, index) => {
                slide.classList.remove('amenities-center');
                if (index === amenitiesCenterIndex) {
                    slide.classList.add('amenities-center');
                }
            });

            // Update active dot
            amenitiesDots.forEach((dot, index) => {
                dot.classList.remove('amenities-active');
                if (index === this.amenitiesCurrentIndex) {
                    dot.classList.add('amenities-active');
                }
            });

            // Move carousel
            const amenitiesSlideWidth = amenitiesIsMobile ? 50 : 33.333;
            const amenitiesTranslateX = -(this.amenitiesPosition * amenitiesSlideWidth);
            this.amenitiesTrack.style.transform = `translateX(${amenitiesTranslateX}%)`;
        }

        amenitiesNextSlide() {
            if (this.amenitiesIsTransitioning) return;
            this.amenitiesIsTransitioning = true;

            this.amenitiesPosition++;
            this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex + 1) % this.amenitiesTotalSlides;

            this.amenitiesUpdateCarousel();

            // Reset position for seamless infinite scroll
            setTimeout(() => {
                const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                if (this.amenitiesPosition >= totalSlides - 3) {
                    this.amenitiesTrack.style.transition = 'none';
                    this.amenitiesPosition = 3;

                    const amenitiesIsMobile = window.innerWidth <= 576;
                    const amenitiesSlideWidth = amenitiesIsMobile ? 50 : 33.333;
                    this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;

                    setTimeout(() => {
                        this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 50);
                }
                this.amenitiesIsTransitioning = false;
            }, 600);
        }

        amenitiesPrevSlide() {
            if (this.amenitiesIsTransitioning) return;
            this.amenitiesIsTransitioning = true;

            this.amenitiesPosition--;
            this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;

            this.amenitiesUpdateCarousel();

            // Reset position for seamless infinite scroll
            setTimeout(() => {
                if (this.amenitiesPosition <= 0) {
                    this.amenitiesTrack.style.transition = 'none';
                    const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                    this.amenitiesPosition = totalSlides - 6;

                    const amenitiesIsMobile = window.innerWidth <= 576;
                    const amenitiesSlideWidth = amenitiesIsMobile ? 50 : 33.333;
                    this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;

                    setTimeout(() => {
                        this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 50);
                }
                this.amenitiesIsTransitioning = false;
            }, 600);
        }

        amenitiesGoToSlide(index) {
            if (this.amenitiesIsTransitioning || index === this.amenitiesCurrentIndex) return;

            this.amenitiesIsTransitioning = true;

            // Calculate the difference
            const diff = index - this.amenitiesCurrentIndex;
            this.amenitiesPosition += diff;
            this.amenitiesCurrentIndex = index;

            this.amenitiesUpdateCarousel();

            setTimeout(() => {
                this.amenitiesIsTransitioning = false;
            }, 600);
        }

        amenitiesStartAutoPlay() {
            this.amenitiesStopAutoPlay();
            this.amenitiesAutoPlayInterval = setInterval(() => {
                this.amenitiesNextSlide();
            }, 5000);
        }

        amenitiesStopAutoPlay() {
            if (this.amenitiesAutoPlayInterval) {
                clearInterval(this.amenitiesAutoPlayInterval);
                this.amenitiesAutoPlayInterval = null;
            }
        }
    }

    // Initialize carousel when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        new AmenitiesCarousel();
    });







    // Function to toggle mobile menu
    function navbarToggleMenu() {
        const mobileMenu = document.getElementById('navbarMobileMenu');
        const hamburger = document.querySelector('.navbarHamburger');
        mobileMenu.classList.toggle('navbarMobileMenuActive');
        hamburger.classList.toggle('navbarHamburgerActive');
        document.body.classList.toggle('navbarBodyLocked');
    }

    // Active section detection
    document.addEventListener('DOMContentLoaded', function () {
        // Get all sections that should be observed
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbarMenuItem, .navbarMobileMenuLink');

        // Create Intersection Observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });

                    // Get the ID of the visible section
                    const id = entry.target.getAttribute('id');

                    // Find corresponding link and add active class
                    const matchingLink = document.querySelector(`.navbarMenuItem[href="#${id}"], .navbarMobileMenuLink[href="#${id}"]`);
                    if (matchingLink) {
                        matchingLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.4,
            rootMargin: '0px 0px -20% 0px'

        });

        // Observe each section
        sections.forEach(section => {
            observer.observe(section);
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('navbarMobileMenu');
                    const hamburger = document.querySelector('.navbarHamburger');
                    if (mobileMenu.classList.contains('navbarMobileMenuActive')) {
                        mobileMenu.classList.remove('navbarMobileMenuActive');
                        hamburger.classList.remove('navbarHamburgerActive');
                        document.body.classList.remove('navbarBodyLocked');
                    }

                    // Scroll to section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });


// Popup Form Section

