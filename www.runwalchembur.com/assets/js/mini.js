/**
 * Optimized JavaScript for External Script File
 * All code wrapped in proper event listeners and optimized for performance
 */

// Utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Safe element selector with error handling
    safeQuerySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return null;
        }
    },

    safeQuerySelectorAll(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.warn(`Invalid selector: ${selector}`, error);
            return [];
        }
    }
};

// Widget Positioning Module
const WidgetPositioner = {
    selectors: [
        "#launcher",
        "[data-testid='launcher']",
        ".zEWidget-launcher",
        "iframe[title*='Chat']"
    ],

    init() {
        this.addPersistentCSS();
        this.loadZeSnippet();
    },

    repositionWidget() {
        const launcher = Utils.safeQuerySelector("#launcher");
        if (launcher) {
            launcher.style.setProperty("bottom", "60px", "important");
            launcher.style.setProperty("left", "5px", "important");
            launcher.style.setProperty("right", "auto", "important");
            launcher.style.setProperty("transform", "none", "important");
            
            const launcherFrame = Utils.safeQuerySelector("iframe[title*='Chat']");
            if (launcherFrame?.parentElement) {
                const parent = launcherFrame.parentElement;
                parent.style.setProperty("bottom", "60px", "important");
                parent.style.setProperty("left", "5px", "important");
                parent.style.setProperty("right", "auto", "important");
            }
        }
    },

    forceRepositioning() {
        this.selectors.forEach(selector => {
            const element = Utils.safeQuerySelector(selector);
            if (element) {
                const container = element.parentElement || element;
                container.style.setProperty("bottom", "60px", "important");
                container.style.setProperty("left", "5px", "important");
                container.style.setProperty("right", "auto", "important");
                container.style.setProperty("transform", "none", "important");
            }
        });
    },

    addPersistentCSS() {
        const existingStyle = Utils.safeQuerySelector('#widget-positioning-style');
        if (existingStyle) return;

        const style = document.createElement('style');
        style.id = 'widget-positioning-style';
        style.textContent = `
            #launcher,
            [data-testid='launcher'],
            .zEWidget-launcher {
                bottom: 60px !important;
                left: 5px !important;
                right: auto !important;
                transform: none !important;
            }
            
            iframe[title*="Chat"] {
                position: fixed !important;
                bottom: 60px !important;
                left: 5px !important;
                right: auto !important;
            }
        `;
        document.head.appendChild(style);
    },

    loadZeSnippet() {
        // Check if script already exists
        if (Utils.safeQuerySelector('#ze-snippet')) return;

        setTimeout(() => {
            const script = document.createElement("script");
            script.id = "ze-snippet";
            script.src = "https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc";
            document.head.appendChild(script);

            script.onload = () => {
                const checkInterval = setInterval(() => {
                    if (typeof zE !== "undefined" && Utils.safeQuerySelector("#launcher")) {
                        clearInterval(checkInterval);
                        this.setupZendeskEvents();
                    }
                }, 100);

                // Clear interval after 30 seconds to prevent infinite checking
                setTimeout(() => clearInterval(checkInterval), 30000);
            };

            script.onerror = () => {
                console.error('Failed to load Zendesk widget');
            };
        }, 4000);
    },

    setupZendeskEvents() {
        const reposition = () => this.repositionWidget();
        const forceReposition = () => this.forceRepositioning();

        // Initial positioning
        reposition();
        
        // Listen to widget events with error handling
        const eventHandlers = {
            'open': () => setTimeout(reposition, 100),
            'close': () => {
                setTimeout(reposition, 100);
                setTimeout(forceReposition, 500);
            },
            'minimize': () => {
                setTimeout(reposition, 100);
                setTimeout(forceReposition, 500);
            },
            'maximize': () => setTimeout(reposition, 100),
            'launcherClick': () => setTimeout(reposition, 100)
        };

        Object.entries(eventHandlers).forEach(([event, handler]) => {
            try {
                zE("webWidget:on", event, handler);
            } catch (error) {
                console.warn(`Failed to bind Zendesk event: ${event}`, error);
            }
        });

        // Aggressive repositioning with throttling
        const throttledReposition = Utils.throttle(forceReposition, 2000);
        const repositionInterval = setInterval(throttledReposition, 2000);

        // Setup mutation observer with error handling
        this.setupMutationObserver();

        // Cleanup interval on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(repositionInterval);
        });
    },

    setupMutationObserver() {
        if (!window.MutationObserver) return;

        const observer = new MutationObserver(Utils.throttle((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                    setTimeout(() => this.repositionWidget(), 50);
                }
            });
        }, 100));
        
        setTimeout(() => {
            const launcher = Utils.safeQuerySelector("#launcher");
            if (launcher) {
                observer.observe(launcher, { attributes: true, subtree: true });
                if (launcher.parentElement) {
                    observer.observe(launcher.parentElement, { attributes: true, subtree: true });
                }
            }
        }, 1000);
    }
};

// Popup Modal Module
const PopupModal = {
    elements: {},
    isInitialized: false,

    init() {
        if (this.isInitialized) return;
        
        this.cacheElements();
        if (!this.elements.overlay) return;
        
        this.bindEvents();
        this.setupAutoPopup();
        this.isInitialized = true;
    },

    cacheElements() {
        this.elements = {
            overlay: Utils.safeQuerySelector("#popupOverlay"),
            modal: Utils.safeQuerySelector("#popupModal"),
            closeBtn: Utils.safeQuerySelector("#popupCloseBtn"),
            title: Utils.safeQuerySelector("#popupTitle"),
            form: Utils.safeQuerySelector("#popupForm"),
            virtual1: Utils.safeQuerySelector("#virtual1"),
            priceBreakupBtn: Utils.safeQuerySelector("#priceBreakupBtn"),
            floorPlan: Utils.safeQuerySelector("#floorPlan"),
            triggerButtons: Utils.safeQuerySelectorAll(".offerBoxEnquireButton, .aboutEnquireBtn, #overviewRequestBtn, #priceBreakupBtn, #floorPlan, .floorPlan-button, .amenitiesDownloadBtn, .galleryDownloadButton, .firstFormCallBack, .floorPlan-card")
        };
    },

    open(event, title = "Enquiry Form") {
        if (event) event.preventDefault();
        if (!this.elements.modal || !this.elements.overlay) return;

        let currentTitle = title;
        const targetElement = event?.target?.closest("button, a, #virtual1, #priceBreakupBtn, #floorPlan");

        // Reset modal classes
        this.elements.modal.className = "popupModal";

        // Determine popup type and apply appropriate class
        if (targetElement) {
            const config = this.getPopupConfig(targetElement);
            currentTitle = config.title;
            if (config.className) {
                this.elements.modal.classList.add(config.className);
            }
        }

        this.elements.title.textContent = currentTitle;
        this.elements.overlay.classList.add("popupActive");
        
        // Focus management for accessibility
        this.elements.closeBtn?.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    },

    close() {
        if (!this.elements.overlay || !this.elements.modal) return;
        
        this.elements.overlay.classList.remove("popupActive");
        this.elements.modal.className = "popupModal";
        
        // Restore body scroll
        document.body.style.overflow = '';
    },

    getPopupConfig(element) {
        const configs = {
            'offerBoxEnquireButton': { title: "Enquire Now", className: "popupEnquire" },
            'aboutEnquireBtn': { title: "Enquire Now", className: "popupEnquire" },
            'nav-link': { title: "Request Brochure", className: "popupBrochure" },
            'overviewRequestBtn': { title: "Request Brochure", className: "popupBrochure" },
            'priceBreakupBtn': { title: "Send Me Costing Details", className: "popupCosting" },
            'floorPlan': { title: "Send Me Plan Details", className: "popupCosting" },
            'amenitiesDownloadBtn': { title: "Download Amenities", className: "popupDownload" },
            'galleryDownloadButton': { title: "Download Gallery", className: "popupDownload" },
            'virtual1': { title: "Virtual Tour Request", className: "popupVirtual" },
            'firstFormCallBack': { title: "Instant Call Back", className: "popupCall" }
        };

        // Check by class names
        for (const [className, config] of Object.entries(configs)) {
            if (element.classList.contains(className)) {
                return config;
            }
        }

        // Check by ID
        if (configs[element.id]) {
            return configs[element.id];
        }

        return { title: "Enquiry Form", className: null };
    },

    bindEvents() {
        // Bind trigger buttons
        this.elements.triggerButtons.forEach(button => {
            button.addEventListener("click", (e) => this.open(e));
        });

        // Bind specific buttons
        if (this.elements.virtual1) {
            this.elements.virtual1.addEventListener("click", (e) => this.open(e));
        }

        if (this.elements.priceBreakupBtn) {
            this.elements.priceBreakupBtn.addEventListener("click", (e) => this.open(e));
        }

        // Close events
        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener("click", () => this.close());
        }

        if (this.elements.overlay) {
            this.elements.overlay.addEventListener("click", (e) => {
                if (e.target === this.elements.overlay) {
                    this.close();
                }
            });
        }

        // Form submission
        if (this.elements.form) {
            this.elements.form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.close();
            });
        }

        // ESC key handler
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.elements.overlay?.classList.contains("popupActive")) {
                this.close();
            }
        });
    },

    setupAutoPopup() {
        // Auto popup with delay
        setTimeout(() => {
            this.open(null, "Limited Time Offer!");
        }, 5000);
    }
};

// Navigation Module
const Navigation = {
    elements: {},
    observer: null,
    isInitialized: false,

    init() {
        if (this.isInitialized) return;
        
        this.cacheElements();
        this.setupIntersectionObserver();
        this.bindEvents();
        this.isInitialized = true;
    },

    cacheElements() {
        this.elements = {
            mobileMenu: Utils.safeQuerySelector('#navbarMobileMenu'),
            hamburger: Utils.safeQuerySelector('.navbarHamburger'),
            sections: Utils.safeQuerySelectorAll('section'),
            navLinks: Utils.safeQuerySelectorAll('.navbarMenuItem, .navbarMobileMenuLink'),
            body: document.body
        };
    },

    toggleMobileMenu() {
        if (!this.elements.mobileMenu || !this.elements.hamburger) return;

        this.elements.mobileMenu.classList.toggle('navbarMobileMenuActive');
        this.elements.hamburger.classList.toggle('navbarHamburgerActive');
        this.elements.body.classList.toggle('navbarBodyLocked');
    },

    closeMobileMenu() {
        if (!this.elements.mobileMenu || !this.elements.hamburger) return;

        this.elements.mobileMenu.classList.remove('navbarMobileMenuActive');
        this.elements.hamburger.classList.remove('navbarHamburgerActive');
        this.elements.body.classList.remove('navbarBodyLocked');
    },

    setupIntersectionObserver() {
        if (!window.IntersectionObserver || this.elements.sections.length === 0) return;

        this.observer = new IntersectionObserver(
            Utils.throttle((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.updateActiveNavLink(entry.target.getAttribute('id'));
                    }
                });
            }, 100),
            {
                threshold: 0.4,
                rootMargin: '0px 0px -20% 0px'
            }
        );

        this.elements.sections.forEach(section => {
            if (section.id) {
                this.observer.observe(section);
            }
        });
    },

    updateActiveNavLink(activeId) {
        this.elements.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = Utils.safeQuerySelector(`.navbarMenuItem[href="#${activeId}"], .navbarMobileMenuLink[href="#${activeId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },

    handleNavLinkClick(event) {
        const link = event.currentTarget;
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#') && href.length > 1) {
            window.history.pushState(null, null, href);
            
            const targetSection = Utils.safeQuerySelector(href);
            if (targetSection) {
                if (link.classList.contains('navbarMobileMenuLink')) {
                    this.closeMobileMenu();
                }
                
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (href === '#' || link.id === 'overviewRequestBtn') {
            event.preventDefault();
            
            if (link.classList.contains('navbarMobileMenuLink')) {
                this.closeMobileMenu();
            }
        }
    },

    bindEvents() {
        // Mobile menu toggle
        if (this.elements.hamburger) {
            this.elements.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Navigation links
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavLinkClick(e));
        });

        // Close mobile menu on resize
        window.addEventListener('resize', Utils.debounce(() => {
            if (window.innerWidth >= 768) {
                this.closeMobileMenu();
            }
        }, 250));
    },

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.isInitialized = false;
    }
};

// Banner Carousel Module
const BannerCarousel = {
    images: [
        'https://www.vihanginfinity-thane.com/assests/images/banner/banner.webp',
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    ],
    currentSlide: 0,
    autoSlideInterval: null,
    elements: {},
    isInitialized: false,

    init() {
        if (this.isInitialized) return;
        
        this.cacheElements();
        if (!this.elements.currentImage) return;
        
        this.preloadImages();
        this.bindEvents();
        this.startAutoSlide();
        this.isInitialized = true;
    },

    cacheElements() {
        this.elements = {
            currentImage: Utils.safeQuerySelector('#bannerCurrentImage'),
            loader: Utils.safeQuerySelector('#bannerLoader'),
            dots: Utils.safeQuerySelectorAll('.bannerDot'),
            form: Utils.safeQuerySelector('#bannerLeadForm'),
            banner: Utils.safeQuerySelector('.banner')
        };
    },

    preloadImages() {
        this.images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    },

    goToSlide(index) {
        if (index === this.currentSlide || !this.elements.currentImage) return;

        this.showLoader();
        this.currentSlide = index;

        this.elements.currentImage.style.transform = 'scale(1.1)';

        setTimeout(() => {
            this.elements.currentImage.src = this.images[this.currentSlide];
            this.elements.currentImage.onload = () => {
                this.elements.currentImage.style.transform = 'scale(1)';
                this.hideLoader();
            };
        }, 200);

        this.updateDots();
        this.restartAutoSlide();
    },

    updateDots() {
        this.elements.dots.forEach((dot, index) => {
            dot.classList.toggle('bannerDotActive', index === this.currentSlide);
        });
    },

    showLoader() {
        if (this.elements.loader) {
            this.elements.loader.style.display = 'block';
        }
    },

    hideLoader() {
        if (this.elements.loader) {
            this.elements.loader.style.display = 'none';
        }
    },

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.images.length;
        this.goToSlide(nextIndex);
    },

    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    },

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    },

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    },

    bindEvents() {
        // Dot navigation
        this.elements.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Form submission
        if (this.elements.form) {
            this.elements.form.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = e.target.querySelector('.bannerFormSubmit');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<span class="bannerFormSubmitText">Submitting...</span>';
                    submitBtn.disabled = true;

                    setTimeout(() => {
                        alert('Thank you for your interest! Our team will contact you soon.');
                        e.target.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }
            });
        }

        // Hover events
        if (this.elements.banner) {
            this.elements.banner.addEventListener('mouseenter', () => this.stopAutoSlide());
            this.elements.banner.addEventListener('mouseleave', () => this.startAutoSlide());
        }

        // Window resize
        window.addEventListener('resize', Utils.debounce(() => {
            this.restartAutoSlide();
        }, 250));
    }
};

// Overview Section Module
const OverviewSection = {
    elements: {},
    observer: null,
    isExpanded: false,
    isInitialized: false,

    init() {
        if (this.isInitialized) return;
        
        this.cacheElements();
        this.setupScrollAnimation();
        this.bindEvents();
        this.isInitialized = true;
    },

    cacheElements() {
        this.elements = {
            sections: Utils.safeQuerySelectorAll('.overview-section'),
            featureItems: Utils.safeQuerySelectorAll('.overview-features-item'),
            readMoreBtn: Utils.safeQuerySelector('#readMoreBtn'),
            overviewText: Utils.safeQuerySelector('#overviewText')
        };
    },

    setupScrollAnimation() {
        if (!window.IntersectionObserver) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        this.elements.sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            this.observer.observe(section);
        });
    },

    bindEvents() {
        // Feature items hover effects
        this.elements.featureItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(244, 196, 48, 0.05)';
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'all 0.3s ease';
            });

            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.transform = 'translateX(0)';
            });
        });

        // Read More functionality
        if (this.elements.readMoreBtn && this.elements.overviewText) {
            this.elements.readMoreBtn.addEventListener('click', () => {
                this.toggleReadMore();
            });
        }
    },

    toggleReadMore() {
        if (!this.isExpanded) {
            this.elements.overviewText.classList.remove('collapsed');
            this.elements.readMoreBtn.innerHTML = 'Read Less <span class="overview-read-more-arrow">▼</span>';
            this.elements.readMoreBtn.classList.add('expanded');
            this.isExpanded = true;
        } else {
            this.elements.overviewText.classList.add('collapsed');
            this.elements.readMoreBtn.innerHTML = 'Read More <span class="overview-read-more-arrow">▶</span>';
            this.elements.readMoreBtn.classList.remove('expanded');
            this.isExpanded = false;
            
            this.elements.overviewText.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

// Map Accordion Module
const MapAccordion = {
    elements: {},
    isInitialized: false,

    init() {
        if (this.isInitialized) return;
        
        this.cacheElements();
        this.bindEvents();
        this.isInitialized = true;
    },

    cacheElements() {
        this.elements = {
            headers: Utils.safeQuerySelectorAll('.map-accordion-header')
        };
    },

    bindEvents() {
        this.elements.headers.forEach(header => {
            header.addEventListener('click', (e) => this.handleAccordionClick(e));
        });
    },

    handleAccordionClick(event) {
        const header = event.currentTarget;
        const target = header.getAttribute('data-target');
        const content = Utils.safeQuerySelector(`#${target}`);
        
        if (!content) return;
        
        const isActive = header.classList.contains('map-active');

        // Close all accordions
        this.elements.headers.forEach(h => {
            h.classList.remove('map-active');
            const c = Utils.safeQuerySelector(`#${h.getAttribute('data-target')}`);
            if (c) c.classList.remove('map-active');
        });

        // Open clicked accordion if it wasn't active
        if (!isActive) {
            header.classList.add('map-active');
            content.classList.add('map-active');
        }
    }
};



            // Smooth scroll behavior
            document.documentElement.style.scrollBehavior = 'smooth';

            class GalleryCarousel {
                constructor() {
                    // Sample images - replace with your own
                    this.galleryImages = [
                        '/assets/images/gallery/g1.webp',
                        '/assets/images/gallery/g2.webp',
                        '/assets/images/gallery/g3.webp',
                        '/assets/images/gallery/g4.webp'
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
                    const loadingElement = document.querySelector('.gallery-loading');
                    if (loadingElement) {
                        loadingElement.style.display = 'none';
                    }
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
                        galleryImg.alt = `Gallery image ${(i % this.galleryTotalSlides) + 1} - Click to view full size`;
                        galleryImg.loading = 'lazy';
                        
                        // Add role and tabindex for keyboard navigation
                        galleryImg.setAttribute('role', 'button');
                        galleryImg.setAttribute('tabindex', '0');
                        galleryImg.setAttribute('aria-label', `View gallery image ${(i % this.galleryTotalSlides) + 1} in lightbox`);

                        // Add click event for lightbox
                        const openLightboxHandler = () => {
                            this.openLightbox(i % this.galleryTotalSlides);
                        };
                        
                        galleryImg.addEventListener('click', openLightboxHandler);
                        
                        // Add keyboard support for images
                        galleryImg.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openLightboxHandler();
                            }
                        });

                        // Add error handling for images
                        galleryImg.onerror = () => {
                            galleryImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                            galleryImg.alt = 'Image not found';
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
                    // Set up dots container with proper ARIA attributes
                    this.galleryDotsContainer.setAttribute('role', 'tablist');
                    this.galleryDotsContainer.setAttribute('aria-label', 'Gallery navigation dots');

                    for (let i = 0; i < this.galleryTotalSlides; i++) {
                        const galleryDot = document.createElement('button');
                        galleryDot.className = 'gallery-dot';
                        
                        // Add accessible attributes for dots
                        galleryDot.setAttribute('aria-label', `Go to gallery image ${i + 1} of ${this.galleryTotalSlides}`);
                        galleryDot.setAttribute('role', 'tab');
                        galleryDot.setAttribute('tabindex', i === 0 ? '0' : '-1');
                        galleryDot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
                        galleryDot.setAttribute('data-slide-index', i.toString());
                        
                        // Add click event
                        galleryDot.addEventListener('click', () => this.galleryGoToSlide(i));
                        
                        // Add keyboard navigation for dots
                        galleryDot.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                this.galleryGoToSlide(i);
                            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                                e.preventDefault();
                                this.handleDotKeyboardNavigation(e, i);
                            }
                        });
                        
                        this.galleryDotsContainer.appendChild(galleryDot);
                    }
                }

                handleDotKeyboardNavigation(event, currentIndex) {
                    const dots = this.galleryDotsContainer.querySelectorAll('.gallery-dot');
                    let targetIndex;
                    
                    if (event.key === 'ArrowLeft') {
                        targetIndex = currentIndex > 0 ? currentIndex - 1 : this.galleryTotalSlides - 1;
                    } else if (event.key === 'ArrowRight') {
                        targetIndex = currentIndex < this.galleryTotalSlides - 1 ? currentIndex + 1 : 0;
                    }
                    
                    if (targetIndex !== undefined) {
                        dots[targetIndex].focus();
                        this.galleryGoToSlide(targetIndex);
                    }
                }

                galleryBindEvents() {
                    // Add accessible labels to navigation buttons if they don't exist
                    if (!this.galleryPrevBtn.getAttribute('aria-label')) {
                        this.galleryPrevBtn.setAttribute('aria-label', 'Previous gallery image');
                    }
                    if (!this.galleryNextBtn.getAttribute('aria-label')) {
                        this.galleryNextBtn.setAttribute('aria-label', 'Next gallery image');
                    }

                    // Set up carousel container with proper ARIA attributes
                    const galleryContainer = this.galleryTrack.closest('.gallery-carousel, .gallery-container');
                    if (galleryContainer) {
                        galleryContainer.setAttribute('role', 'region');
                        galleryContainer.setAttribute('aria-label', 'Image gallery carousel');
                        galleryContainer.setAttribute('aria-live', 'polite');
                    }

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
                        if (!this.lightbox.classList.contains('active')) {
                            if (e.key === 'ArrowLeft') {
                                this.galleryPrevSlide();
                            } else if (e.key === 'ArrowRight') {
                                this.galleryNextSlide();
                            }
                        }
                    });
                }

                galleryBindLightboxEvents() {
                    // Add accessible labels to lightbox buttons if they don't exist
                    if (!this.lightboxClose.getAttribute('aria-label')) {
                        this.lightboxClose.setAttribute('aria-label', 'Close image lightbox');
                    }
                    if (!this.lightboxPrev.getAttribute('aria-label')) {
                        this.lightboxPrev.setAttribute('aria-label', 'Previous image in lightbox');
                    }
                    if (!this.lightboxNext.getAttribute('aria-label')) {
                        this.lightboxNext.setAttribute('aria-label', 'Next image in lightbox');
                    }

                    // Set up lightbox with proper ARIA attributes
                    this.lightbox.setAttribute('role', 'dialog');
                    this.lightbox.setAttribute('aria-modal', 'true');
                    this.lightbox.setAttribute('aria-label', 'Image lightbox');
                    this.lightbox.setAttribute('aria-hidden', 'true');

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
                    this.lightboxImage.alt = `Gallery image ${index + 1} - Full size view`;
                    this.updateLightboxCounter();
                    this.lightbox.classList.add('active');
                    
                    // Update ARIA attributes and focus management
                    this.lightbox.setAttribute('aria-hidden', 'false');
                    this.lightboxClose.focus();
                    
                    this.galleryStopAutoPlay();
                    document.body.style.overflow = 'hidden';
                    
                    // Announce to screen readers
                    this.announceToScreenReader(`Opened lightbox showing image ${index + 1} of ${this.galleryTotalSlides}`);
                }

                closeLightbox() {
                    this.lightbox.classList.remove('active');
                    this.lightbox.setAttribute('aria-hidden', 'true');
                    this.galleryStartAutoPlay();
                    document.body.style.overflow = 'auto';
                    
                    // Return focus to the image that opened the lightbox
                    const activeImage = this.galleryTrack.querySelector('.gallery-center .gallery-image');
                    if (activeImage) {
                        activeImage.focus();
                    }
                }

                lightboxPrevImage() {
                    this.lightboxCurrentIndex = (this.lightboxCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;
                    this.lightboxImage.src = this.galleryImages[this.lightboxCurrentIndex];
                    this.lightboxImage.alt = `Gallery image ${this.lightboxCurrentIndex + 1} - Full size view`;
                    this.updateLightboxCounter();
                    this.announceToScreenReader(`Showing image ${this.lightboxCurrentIndex + 1} of ${this.galleryTotalSlides}`);
                }

                lightboxNextImage() {
                    this.lightboxCurrentIndex = (this.lightboxCurrentIndex + 1) % this.galleryTotalSlides;
                    this.lightboxImage.src = this.galleryImages[this.lightboxCurrentIndex];
                    this.lightboxImage.alt = `Gallery image ${this.lightboxCurrentIndex + 1} - Full size view`;
                    this.updateLightboxCounter();
                    this.announceToScreenReader(`Showing image ${this.lightboxCurrentIndex + 1} of ${this.galleryTotalSlides}`);
                }

                updateLightboxCounter() {
                    this.lightboxCounter.textContent = `${this.lightboxCurrentIndex + 1} / ${this.galleryTotalSlides}`;
                    this.lightboxCounter.setAttribute('aria-label', `Image ${this.lightboxCurrentIndex + 1} of ${this.galleryTotalSlides}`);
                }

                announceToScreenReader(message) {
                    // Create or update a live region for screen reader announcements
                    let announcer = document.getElementById('gallery-announcer');
                    if (!announcer) {
                        announcer = document.createElement('div');
                        announcer.id = 'gallery-announcer';
                        announcer.setAttribute('aria-live', 'polite');
                        announcer.setAttribute('aria-atomic', 'true');
                        announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
                        document.body.appendChild(announcer);
                    }
                    announcer.textContent = message;
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

                    // Update active dot and accessibility attributes
                    galleryDots.forEach((dot, index) => {
                        dot.classList.remove('gallery-active');
                        dot.setAttribute('aria-selected', 'false');
                        dot.setAttribute('tabindex', '-1');
                        
                        if (index === this.galleryCurrentIndex) {
                            dot.classList.add('gallery-active');
                            dot.setAttribute('aria-selected', 'true');
                            dot.setAttribute('tabindex', '0');
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
                        
                        // Add accessible attributes
                        amenitiesDot.setAttribute('aria-label', `Go to amenity ${i + 1} of ${this.amenitiesTotalSlides}`);
                        amenitiesDot.setAttribute('role', 'tab');
                        amenitiesDot.setAttribute('tabindex', i === 0 ? '0' : '-1');
                        amenitiesDot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
                        
                        // Add click event
                        amenitiesDot.addEventListener('click', () => this.amenitiesGoToSlide(i));
                        
                        // Add keyboard navigation for dots
                        amenitiesDot.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                this.amenitiesGoToSlide(i);
                            }
                        });
                        
                        this.amenitiesDotsContainer.appendChild(amenitiesDot);
                    }
                    
                    // Set up role for dots container
                    this.amenitiesDotsContainer.setAttribute('role', 'tablist');
                    this.amenitiesDotsContainer.setAttribute('aria-label', 'Amenities carousel navigation');
                }

                amenitiesBindEvents() {
                    // Add accessible labels to navigation buttons if they don't have them
                    if (!this.amenitiesPrevBtn.getAttribute('aria-label')) {
                        this.amenitiesPrevBtn.setAttribute('aria-label', 'Previous amenity');
                    }
                    if (!this.amenitiesNextBtn.getAttribute('aria-label')) {
                        this.amenitiesNextBtn.setAttribute('aria-label', 'Next amenity');
                    }

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
                    // Add accessible labels to lightbox buttons if they don't have them
                    if (!this.amenitiesLightboxClose.getAttribute('aria-label')) {
                        this.amenitiesLightboxClose.setAttribute('aria-label', 'Close lightbox');
                    }
                    if (!this.amenitiesLightboxPrev.getAttribute('aria-label')) {
                        this.amenitiesLightboxPrev.setAttribute('aria-label', 'Previous image');
                    }
                    if (!this.amenitiesLightboxNext.getAttribute('aria-label')) {
                        this.amenitiesLightboxNext.setAttribute('aria-label', 'Next image');
                    }

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
                    
                    // Set focus to lightbox for screen readers
                    this.amenitiesLightbox.setAttribute('aria-hidden', 'false');
                    this.amenitiesLightboxClose.focus();
                    
                    this.amenitiesStopAutoPlay();
                    document.body.style.overflow = 'hidden';
                }

                closeAmenitiesLightbox() {
                    this.amenitiesLightbox.classList.remove('active');
                    this.amenitiesLightbox.setAttribute('aria-hidden', 'true');
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

                    // Update active dot and accessibility attributes
                    amenitiesDots.forEach((dot, index) => {
                        dot.classList.remove('amenities-active');
                        dot.setAttribute('aria-selected', 'false');
                        dot.setAttribute('tabindex', '-1');
                        
                        if (index === this.amenitiesCurrentIndex) {
                            dot.classList.add('amenities-active');
                            dot.setAttribute('aria-selected', 'true');
                            dot.setAttribute('tabindex', '0');
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
        

// MODal
        // Enhanced click functionality with ripple effect
        function addClickEffect(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create ripple effect
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.className = 'click-ripple';
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                // Enhanced click animation
                this.style.transform = this.classList.contains('pdf-download-btn-desktop') 
                    ? 'translateY(-2px) scale(0.95) rotate(2deg)' 
                    : 'translateY(-50%) scale(0.9) rotate(-5deg)';
                
                setTimeout(() => {
                    this.style.transform = this.classList.contains('pdf-download-btn-desktop')
                        ? 'translateY(-5px) scale(1.05)'
                        : 'translateY(-50%) scale(1.08) rotate(-2deg)';
                }, 100);
                
                setTimeout(() => {
                    this.style.transform = '';
                    ripple.remove();
                }, 300);
                
                // Create burst particles
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        createBurstParticle(this, e.clientX, e.clientY);
                    }, i * 30);
                }
                
                // Simulate download
                setTimeout(() => {
                    // alert('PDF Brochure download would start here!\n\nReplace this with your actual download logic.');
                }, 400);
            });
        }

        // Create burst particle effect
        function createBurstParticle(button, clickX, clickY) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: linear-gradient(45deg, #ff4444, #ff6666);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1001;
                box-shadow: 0 0 6px rgba(255, 68, 68, 0.6);
            `;
            
            particle.style.left = clickX + 'px';
            particle.style.top = clickY + 'px';
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 80;
            const endX = clickX + Math.cos(angle) * distance;
            const endY = clickY + Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - clickX}px, ${endY - clickY}px) scale(0) rotate(360deg)`, 
                    opacity: 0 
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }

        // Add click effects to both buttons
        addClickEffect(document.getElementById('desktopBtn'));
        addClickEffect(document.getElementById('mobileBtn'));

        // Add entrance animation
        window.addEventListener('load', function() {
            const desktopBtn = document.getElementById('desktopBtn');
            const mobileBtn = document.getElementById('mobileBtn');
            
            // Desktop entrance from right
            desktopBtn.style.transform = 'translateX(200px)';
            desktopBtn.style.opacity = '0';
            
            setTimeout(() => {
                desktopBtn.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                desktopBtn.style.transform = 'translateX(0)';
                desktopBtn.style.opacity = '1';
            }, 500);
            
            // Mobile entrance from left
            mobileBtn.style.transform = 'translateY(-50%) translateX(-200px)';
            mobileBtn.style.opacity = '0';
            
            setTimeout(() => {
                mobileBtn.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                mobileBtn.style.transform = 'translateY(-50%) translateX(0)';
                mobileBtn.style.opacity = '1';
            }, 500);
        });
    