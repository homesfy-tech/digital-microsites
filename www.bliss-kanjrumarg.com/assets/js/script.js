      function toggleMobileNav() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }

        function closeMobileNav() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }

        function scrollToSection(sectionId, linkElement) {
            // Update active nav link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            linkElement.classList.add('active');

            // Scroll to section
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile nav if on mobile
            if (window.innerWidth <= 768) {
                closeMobileNav();
            }
        }

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Update active nav link based on visible section
                    const sectionId = entry.target.id;
                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Scroll progress bar
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('progressBar').style.width = scrollPercent + '%';
        }

        window.addEventListener('scroll', updateScrollProgress);

        // Close mobile nav when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.querySelector('.mobile-toggle');
            const mobileHeader = document.querySelector('.mobile-header');
            
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('open') &&
                !sidebar.contains(event.target) && 
                !toggle.contains(event.target) && 
                !mobileHeader.contains(event.target)) {
                closeMobileNav();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileNav();
            }
        });

        // Initial animation for first section
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.querySelector('#overview').classList.add('animate');
            }, 300);
        });



        // Banner Section
 let bannerCurrentSlide = 0;
        const bannerSlides = document.querySelectorAll('.bannerCarouselSlide');
        const bannerDots = document.querySelectorAll('.bannerNavDot');
        const bannerTotalSlides = bannerSlides.length;

        function bannerShowSlide(index) {
            // Hide all slides
            bannerSlides.forEach(slide => slide.classList.remove('active'));
            bannerDots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide
            bannerSlides[index].classList.add('active');
            bannerDots[index].classList.add('active');
            
            // Update mobile dots
            const bannerMobileDots = document.querySelectorAll('.bannerMobileNavDot');
            bannerMobileDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function bannerNextSlide() {
            bannerCurrentSlide = (bannerCurrentSlide + 1) % bannerTotalSlides;
            bannerShowSlide(bannerCurrentSlide);
        }

        function bannerPreviousSlide() {
            bannerCurrentSlide = (bannerCurrentSlide - 1 + bannerTotalSlides) % bannerTotalSlides;
            bannerShowSlide(bannerCurrentSlide);
        }

        // Dot navigation
        bannerDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                bannerCurrentSlide = index;
                bannerShowSlide(bannerCurrentSlide);
            });
        });

        // Mobile dot navigation
        document.addEventListener('DOMContentLoaded', () => {
            const bannerMobileDots = document.querySelectorAll('.bannerMobileNavDot');
            bannerMobileDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    bannerCurrentSlide = index;
                    bannerShowSlide(bannerCurrentSlide);
                });
            });
        });

        // Auto-rotate carousel every 5 seconds
        setInterval(() => {
            bannerNextSlide();
        }, 5000);

        // Form submission
        function bannerHandleSubmit(event) {
            event.preventDefault();
            alert('Thank you for your interest! We will contact you soon.');
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                bannerPreviousSlide();
            } else if (e.key === 'ArrowRight') {
                bannerNextSlide();
            }
        });


// Overview Section
 function overviewViewDetails() {
            // Add your view details functionality here
            // alert('View Details clicked! Add your custom functionality here.');
        }

        // Add smooth scroll animation when page loads
        document.addEventListener('DOMContentLoaded', function() {
            const overviewContainer = document.querySelector('.overview-container');
            overviewContainer.style.opacity = '0';
            overviewContainer.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                overviewContainer.style.transition = 'all 0.8s ease-out';
                overviewContainer.style.opacity = '1';
                overviewContainer.style.transform = 'translateY(0)';
            }, 100);
        });

        // Add button click animation
        document.querySelector('.overview-button').addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            let rect = this.getBoundingClientRect();
            let size = Math.max(rect.width, rect.height);
            let x = e.clientX - rect.left - size / 2;
            let y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: scale(0);
                animation: overviewRipple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add ripple animation styles
        const overviewRippleStyles = document.createElement('style');
        overviewRippleStyles.textContent = `
            @keyframes overviewRipple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(overviewRippleStyles);


        // Amenities

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
                    amenitiesDot.setAttribute("aria-label",`Go to ${i+1} Amenities Preview`);
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
                // document.body.style.overflow = 'hidden';
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



        // GALLERY
        class GalleryCarousel {
    constructor() {
        // Get the original slides
        this.originalSlides = Array.from(document.querySelectorAll('.gallery-slide'));
        this.galleryTotalSlides = this.originalSlides.length;
        
        // Store data for lightbox
        this.galleryImages = [];
        
        // Extract data from original slides
        this.originalSlides.forEach(slide => {
            const img = slide.querySelector('.gallery-image');
            this.galleryImages.push(img.src);
            
            // Add error handling for images
            img.onerror = () => {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
            };
        });
        
        // Setup carousel variables
        this.galleryCurrentIndex = 0;
        this.galleryTrack = document.getElementById('galleryTrack');
        this.galleryDotsContainer = document.getElementById('galleryDots');
        this.galleryPrevBtn = document.getElementById('galleryPrev');
        this.galleryNextBtn = document.getElementById('galleryNext');
        this.galleryAutoPlayInterval = null;
        this.galleryIsTransitioning = false;
        
        // Calculate starting position for seamless infinite scroll
        this.galleryPosition = this.galleryTotalSlides;
        
        // Lightbox elements
        this.galleryLightbox = document.getElementById('galleryLightbox');
        this.galleryLightboxImage = document.getElementById('galleryLightboxImage');
        this.galleryLightboxClose = document.getElementById('galleryLightboxClose');
        this.galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
        this.galleryLightboxNext = document.getElementById('galleryLightboxNext');
        this.galleryLightboxCounter = document.getElementById('galleryLightboxCounter');
        this.galleryLightboxCurrentIndex = 0;
        
        // Initialize the carousel
        this.galleryInit();
    }
    
    galleryInit() {
        // Clone slides for infinite effect
        this.galleryCloneSlides();
        
        // Create dots
        this.galleryCreateDots();
        
        // Bind events
        this.galleryBindEvents();
        this.galleryBindLightboxEvents();
        
        // Position the carousel
        this.galleryUpdateCarousel();
        
        // Start autoplay
        this.galleryStartAutoPlay();
    }
    
    galleryCloneSlides() {
        // Create clones for infinite scrolling effect
        const fragmentStart = document.createDocumentFragment();
        const fragmentEnd = document.createDocumentFragment();
        
        // Clone first 3 slides to the end
        for (let i = 0; i < 3; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            fragmentEnd.appendChild(clone);
        }
        
        // Clone last 3 slides to the beginning
        for (let i = this.galleryTotalSlides - 3; i < this.galleryTotalSlides; i++) {
            const clone = this.originalSlides[i].cloneNode(true);
            fragmentStart.appendChild(clone);
        }
        
        // Append clones to track
        this.galleryTrack.prepend(fragmentStart);
        this.galleryTrack.appendChild(fragmentEnd);
        
        // Setup image click events for all slides
        this.gallerySetupImageClickEvents();
    }
    
    gallerySetupImageClickEvents() {
        const slides = this.galleryTrack.querySelectorAll('.gallery-slide');
        slides.forEach((slide, index) => {
            const img = slide.querySelector('.gallery-image');
            img.addEventListener('click', () => {
                // Calculate original image index
                const totalSlides = slides.length;
                const originalIndex = (index - 3 + totalSlides) % this.galleryTotalSlides;
                this.openGalleryLightbox(originalIndex);
            });
        });
    }
    
    galleryCreateDots() {
        for (let i = 0; i < this.galleryTotalSlides; i++) {
            const galleryDot = document.createElement('button');
            galleryDot.className = 'gallery-dot';
            galleryDot.setAttribute("aria-label",`Go to ${i+1} Image`);
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
            
            if (Math.abs(galleryDiff) > 50) {
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
            } else if (e.key === 'Escape' && this.galleryLightbox.classList.contains('active')) {
                this.closeGalleryLightbox();
            }
        });
    }
    
    galleryBindLightboxEvents() {
        // Close lightbox events
        this.galleryLightboxClose.addEventListener('click', () => this.closeGalleryLightbox());
        this.galleryLightbox.addEventListener('click', (e) => {
            if (e.target === this.galleryLightbox) {
                this.closeGalleryLightbox();
            }
        });
        
        // Lightbox navigation
        this.galleryLightboxPrev.addEventListener('click', () => this.galleryLightboxPrevImage());
        this.galleryLightboxNext.addEventListener('click', () => this.galleryLightboxNextImage());
    }
    
    openGalleryLightbox(index) {
        this.galleryLightboxCurrentIndex = index;
        this.galleryLightboxImage.src = this.galleryImages[index];
        this.updateGalleryLightboxCounter();
        this.galleryLightbox.classList.add('active');
        this.galleryStopAutoPlay();
        // document.body.style.overflow = 'hidden';
    }
    
    closeGalleryLightbox() {
        this.galleryLightbox.classList.remove('active');
        this.galleryStartAutoPlay();
        document.body.style.overflow = 'auto';
    }
    
    galleryLightboxPrevImage() {
        this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;
        this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex];
        this.updateGalleryLightboxCounter();
    }
    
    galleryLightboxNextImage() {
        this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex + 1) % this.galleryTotalSlides;
        this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex];
        this.updateGalleryLightboxCounter();
    }
    
    updateGalleryLightboxCounter() {
        this.galleryLightboxCounter.textContent = `${this.galleryLightboxCurrentIndex + 1} / ${this.galleryTotalSlides}`;
    }
    
    galleryUpdateCarousel() {
        const gallerySlides = this.galleryTrack.querySelectorAll('.gallery-slide');
        const galleryDots = this.galleryDotsContainer.querySelectorAll('.gallery-dot');
        
        // Calculate which slide is in the center
        const galleryIsMobile = window.innerWidth <= 576;
        const galleryCenterIndex = galleryIsMobile ? 
            this.galleryPosition + 1 : 
            this.galleryPosition + 1;
        
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
        
        // Move carousel
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
        
        // Reset position for seamless infinite scroll
        setTimeout(() => {
            const totalSlides = this.galleryTrack.querySelectorAll('.gallery-slide').length;
            if (this.galleryPosition >= totalSlides - 3) {
                this.galleryTrack.style.transition = 'none';
                this.galleryPosition = 3;
                
                const galleryIsMobile = window.innerWidth <= 576;
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
        
        // Reset position for seamless infinite scroll
        setTimeout(() => {
            if (this.galleryPosition <= 0) {
                this.galleryTrack.style.transition = 'none';
                const totalSlides = this.galleryTrack.querySelectorAll('.gallery-slide').length;
                this.galleryPosition = totalSlides - 6;
                
                const galleryIsMobile = window.innerWidth <= 576;
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
        
        // Calculate the difference
        const diff = index - this.galleryCurrentIndex;
        this.galleryPosition += diff;
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
        }, 5000);
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

// Map
deskmap = document.querySelectorAll(".connectivityContent");
mobilemap = document.querySelectorAll(".connectivityContentMobile");

function closeConnectivity() {
    deskmap.forEach((element,index)=>{
        element.classList.remove("map-active");
        document.getElementsByClassName("connectivityArrow")[index].textContent= '▶';
    })
}

function closeConnectivityMobile() {
    mobilemap.forEach((element,index)=>{
        element.classList.remove("map-active");
        document.getElementsByClassName('connectivityArrowMobile')[index].textContent= '▶';
    })
}
            function toggleConnectivity(index) {
            
            // Mobile version
            
            
            const content = document.getElementsByClassName('connectivityContent')[index];
            const arrow = document.getElementsByClassName("connectivityArrow")[index];
                    if (content && content.classList.contains('map-active')) {
                        content.classList.remove('map-active');
                        arrow.textContent = '▶';
                    } else if (content) {
                        closeConnectivity();
                        content.classList.add('map-active');
                        arrow.textContent = '▼';
                    }

            
            const mobileContent = document.getElementsByClassName('connectivityContentMobile')[index];
            const mobileArrow = document.getElementsByClassName('connectivityArrowMobile')[index];
            if (mobileContent && mobileContent.classList.contains('map-active')) {
                mobileContent.classList.remove('map-active');
                mobileArrow.textContent = '▶';
            } else if (mobileContent) {
                closeConnectivityMobile();
                mobileContent.classList.add('map-active');
                mobileArrow.textContent = '▼';
            }
        }


        // 

document.addEventListener("DOMContentLoaded", function () {
    let modalFromOverlay = document.getElementById("modalFromOverlay"),
        modalFromContainer = document.querySelector(".modalFromContainer"),
        modalFromCloseBtn = document.querySelector(".modalFromCloseBtn"),
        modalFromTitle = document.querySelector(".modalFromTitle"),
        modalFromForm = document.getElementById("modalFromForm"),
        modalFromTriggerButtons = document.querySelectorAll(
            ".offerBoxEnquireButton, .aboutEnquireBtn, #overviewRequestBtn, #priceBreakupBtn, #floorPlan, .floorPlan-button, .amenitiesDownloadBtn, .galleryDownloadButton, .firstFormCallBack, .floorPlan-card, .virtual"
        );

    function modalFromOpen(event, title = "GOT QUESTIONS?") {
        if (event) {
            event.preventDefault();
        }

        let modalCurrentTitle = title,
            modalTargetElement = event ? event.target.closest("button, a, .virtual, #priceBreakupBtn, #floorPlan") : null;

        // Remove all modal type classes
        modalFromContainer.className = "modalFromContainer";

        if (modalTargetElement) {
            if (modalTargetElement.classList.contains("offerBoxEnquireButton") || modalTargetElement.classList.contains("aboutEnquireBtn")) {
                modalCurrentTitle = "ENQUIRE NOW";
                modalFromContainer.classList.add("modalEnquire");
            } else if (modalTargetElement.classList.contains("nav-link") || modalTargetElement.id === "overviewRequestBtn") {
                modalCurrentTitle = "REQUEST BROCHURE";
                modalFromContainer.classList.add("modalBrochure");
            } else if (modalTargetElement.id === "priceBreakupBtn") {
                modalCurrentTitle = "SEND ME COSTING DETAILS";
                modalFromContainer.classList.add("modalCosting");
            } else if (modalTargetElement.id === "floorPlan") {
                modalCurrentTitle = "SEND ME PLAN DETAILS";
                modalFromContainer.classList.add("modalCosting");
            } else if (modalTargetElement.classList.contains("amenitiesDownloadBtn")) {
                modalCurrentTitle = "DOWNLOAD AMENITIES";
                modalFromContainer.classList.add("modalDownload");
            } else if (modalTargetElement.classList.contains("galleryDownloadButton")) {
                modalCurrentTitle = "DOWNLOAD GALLERY";
                modalFromContainer.classList.add("modalDownload");
            } else if (modalTargetElement.classList.contains("virtual")) {
                modalCurrentTitle = "VIRTUAL TOUR REQUEST";
                modalFromContainer.classList.add("modalVirtual");
            } else if (modalTargetElement.classList.contains("firstFormCallBack")) {
                modalCurrentTitle = "INSTANT CALL BACK";
                modalFromContainer.classList.add("modalCall");
            }
        }

        modalFromTitle.textContent = modalCurrentTitle;
        modalFromOverlay.classList.add("modalActive");
        document.body.style.overflow = "hidden";
    }

    function modalFromClose() {
        modalFromOverlay.classList.remove("modalActive");
        modalFromContainer.className = "modalFromContainer";
        document.body.style.overflow = "";
    }

    window.modalFromClose = modalFromClose;

    if (modalFromTriggerButtons.length > 0) {
        modalFromTriggerButtons.forEach((button) => {
            button.addEventListener("click", modalFromOpen);
        });
    }

    if (modalFromOverlay) {
        modalFromOverlay.addEventListener("click", function (e) {
            if (e.target === modalFromOverlay) {
                modalFromClose();
            }
        });
    }

    if (modalFromForm) {
        modalFromForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("modalFromName").value;
            const country = document.getElementById("modalFromCountry").value;
            const mobile = document.getElementById("modalFromMobile").value;

            console.log("Form submitted:", { name, country, mobile });

            alert("Thank you! We'll get back to you soon.");
            modalFromForm.reset();
            modalFromClose();
        });
    }

    // Auto popup after 4 seconds
    setTimeout(() => {
        modalFromOpen(null, "LIMITED TIME OFFER!");
    }, 4000);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modalFromOverlay.classList.contains("modalActive")) {
            modalFromClose();
        }
    });

    const mobileInput = document.getElementById("modalFromMobile");
    if (mobileInput) {
        mobileInput.addEventListener("input", function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    }
});


// floor Caurosel
    window.addEventListener("resize",updatefloorCarousel);
    window.addEventListener("load",updatefloorCarousel);
    let floorInterval = null;
    let findex = 0;
    let floorcount = document.querySelectorAll(".plan-card").length;
    let floorWrapper = document.querySelector(".plan-gallery");

    function updatefloorCarousel(){
        if (window.innerWidth<=768) {
            clearInterval(floorInterval);
            findex=0;
            floorCarousel();
            floorInterval = setInterval(floorCarousel, 5000);
        }
        else {
            clearInterval(floorInterval);
            floorWrapper.style.transform = `translateX(0%)`;
        }
    }

    function floorCarousel() {
        findex++;
        if(findex >=floorcount) {
            findex = 0;
        }
        floorWrapper.style.transform = `translateX(-${findex*100}%)`;
    }

    document.querySelector(".floor_prevBtn").addEventListener("click",()=>{
        clearInterval(floorInterval);
        if(findex == 0 ) {
            findex = floorcount-1;
        }
        else {findex-=1;}
        floorWrapper.style.transform = `translateX(-${findex*100}%)`;
        floorInterval = setInterval(floorCarousel, 5000);
    })

    document.querySelector(".floor_nextBtn").addEventListener("click",()=>{
        clearInterval(floorInterval);
        if(findex == floorcount-1 ) {
            findex = 0;
        }
        else {findex+=1;}
        floorWrapper.style.transform = `translateX(-${findex*100}%)`;
        floorInterval = setInterval(floorCarousel, 5000);
    })
