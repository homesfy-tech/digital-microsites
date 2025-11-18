// Header 
        function toggleMobileNav() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.classList.toggle('open');
        }

        function showSection(sectionId, linkElement) {
            // Hide all sections
            const sections = document.querySelectorAll('.header-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Remove active class from all nav links
            const navLinks = document.querySelectorAll('.header-nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Add active class to clicked link
            linkElement.classList.add('active');
        }

        function showMobileSection(sectionId, linkElement) {
            // Hide all sections
            const sections = document.querySelectorAll('.header-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Remove active class from all mobile nav links
            const mobileNavLinks = document.querySelectorAll('.header-mobile-nav-link');
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Add active class to clicked link
            linkElement.classList.add('active');

            // Close mobile nav
            document.getElementById('mobileNav').classList.remove('open');
        }

        // Close mobile nav when clicking outside
        document.addEventListener('click', function(event) {
            const mobileNav = document.getElementById('mobileNav');
            const toggle = document.querySelector('.header-mobile-toggle');
            const header = document.querySelector('.header-mobile-header');
            
            if (window.innerWidth <= 768 && 
                !mobileNav.contains(event.target) && 
                !toggle.contains(event.target) && 
                !header.contains(event.target) && 
                mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
            }
        });

// Banner Carousel
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


        // Overview

   function overviewViewDetails() {
            // Add your view details functionality here
            alert('View Details clicked! Add your custom functionality here.');
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


// Map
    function mapOpenDirections() {
            window.open('https://www.google.com/maps/dir//Lodha+Signet,+Matunga', '_blank');
        }

        function mapViewLarger(event) {
            event.preventDefault();
            window.open('https://www.google.com/maps/place/Lodha+Signet,+Matunga/@19.0374710,72.8777370,17z', '_blank');
        }

        // Enhanced entrance animation
        document.addEventListener('DOMContentLoaded', function() {
            const mapItems = document.querySelectorAll('.map-advantage-item');
            
            // Add staggered animation delays
            mapItems.forEach((item, index) => {
                item.style.animationDelay = `${0.1 + (index * 0.15)}s`;
            });

            // Add hover sound effect simulation
            mapItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
        });


// Vtour

 function startVirtualTour() {
            // Add click animation
            const card = document.querySelector('.vtour-card');
            card.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                card.style.transform = '';
                // Here you would typically redirect to the virtual tour or open a modal
                alert('Starting Virtual Tour...\n\nThis is where you would integrate your virtual tour functionality.');
            }, 150);
        }

        // Add some interactive hover effects
        document.querySelector('.vtour-card').addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });

        // Prevent context menu on right click for better UX
        document.querySelector('.vtour-card').addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });