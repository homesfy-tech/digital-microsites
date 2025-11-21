// Banner Carousel JavaScript
document.addEventListener("DOMContentLoaded", function() {
    const carouselContainer = document.querySelector(".carouselBannerContainer");
    const carouselTrack = document.querySelector(".carouselBannerTrack");
    const prevButton = document.querySelector(".carouselBannerButton.prev");
    const nextButton = document.querySelector(".carouselBannerButton.next");
    const navLinks = document.querySelectorAll(".carouselBannerNav a");
    
    if (!carouselContainer || !carouselTrack) return;
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll(".carouselBannerItem").length;
    let autoPlayInterval;
    let isPaused = false;
    
    // Initialize carousel
    function initCarousel() {
        // Remove CSS animation
        carouselTrack.style.animation = "none";
        carouselTrack.style.transform = "translateX(0)";
        
        // Ensure proper initial positioning
        carouselTrack.style.width = "200%";
        
        // Start auto-play
        startAutoPlay();
        
        // Add event listeners
        if (prevButton) prevButton.addEventListener("click", () => goToSlide(currentSlide - 1));
        if (nextButton) nextButton.addEventListener("click", () => goToSlide(currentSlide + 1));
        
        // Add navigation links
        navLinks.forEach((link, index) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                goToSlide(index);
            });
        });
        
        // Pause on hover
        carouselContainer.addEventListener("mouseenter", pauseAutoPlay);
        carouselContainer.addEventListener("mouseleave", startAutoPlay);
        
        // Touch support for mobile
        let startX = 0;
        let endX = 0;
        
        carouselContainer.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            pauseAutoPlay();
        });
        
        carouselContainer.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentSlide + 1);
                } else {
                    goToSlide(currentSlide - 1);
                }
            }
            startAutoPlay();
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        if (slideIndex >= totalSlides) slideIndex = 0;
        
        currentSlide = slideIndex;
        const translateX = currentSlide * 50;
        
        // For 2 slides, each slide takes 50% of the track width
        carouselTrack.style.transform = `translateX(-${translateX}%)`;
        
        // Update navigation
        updateNavigation();
    }
    
    // Update navigation indicators
    function updateNavigation() {
        navLinks.forEach((link, index) => {
            link.classList.toggle("active", index === currentSlide);
        });
    }
    
    // Start auto-play
    function startAutoPlay() {
        if (!isPaused) {
            autoPlayInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 6000);
        }
    }
    
    // Pause auto-play
    function pauseAutoPlay() {
        clearInterval(autoPlayInterval);
        isPaused = true;
        setTimeout(() => { isPaused = false; }, 100);
    }
    
    // Initialize the carousel
    initCarousel();
});

// Existing code continues...
const hamburger = document.getElementById("hamburger"),
    navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    let e = hamburger.querySelector("i");
    navMenu.classList.contains("active")
        ? (e.classList.remove("fa-bars"), e.classList.add("fa-xmark"))
        : (e.classList.remove("fa-xmark"), e.classList.add("fa-bars"));
}),
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#nav-menu") && !e.target.closest("#hamburger")) {
            navMenu.classList.remove("active");
            let t = hamburger.querySelector("i");
            t.classList.remove("fa-xmark"), t.classList.add("fa-bars");
        }
    });
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((e) => {
    e.addEventListener("click", () => {
        if (
            (navLinks.forEach((e) => e.classList.remove("active")), e.classList.add("active"), window.innerWidth <= 768)
        ) {
            navMenu.classList.remove("active");
            let t = hamburger.querySelector("i");
            t.classList.remove("fa-xmark"), t.classList.add("fa-bars");
        }
    });
});
const desktopSubmitBtn = document.getElementById("desktopSubmitBtn"),
    desktopConsentCheckbox = document.getElementById("desktopConsentCheckbox");
desktopSubmitBtn &&
    desktopSubmitBtn.addEventListener("click", function () {
        if (!desktopConsentCheckbox.checked) {
            alert("Please accept the privacy policy to continue");
            return;
        }
    });
const mobileSubmitBtn = document.getElementById("mobileSubmitBtn"),
    mobileConsentCheckbox = document.getElementById("mobileConsentCheckbox");
mobileSubmitBtn &&
    mobileSubmitBtn.addEventListener("click", function () {
        if (!mobileConsentCheckbox.checked) {
            alert("Please accept the privacy policy to continue");
            return;
        }
        alert("Form submitted successfully!");
    });
const whatsAppBtn = document.querySelector(".firstFormWhatsApp"),
    callBackBtn = document.querySelector(".firstFormCallBack");
function loadZeSnippet() {
    setTimeout(function () {
        var e = document.createElement("script");
        (e.id = "ze-snippet"),
            (e.src = "https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc"),
            (e.defer = !0),
            document.head.appendChild(e),
            document.querySelector("#launcher");
    }, 4e3);
}
function toggleTab(e) {
    let t = document.querySelectorAll('.tab input[type="checkbox"]');
    t.forEach(function (t) {
        t.id !== e && (t.checked = !1);
    });
}
whatsAppBtn && whatsAppBtn.addEventListener("click", function () {}),
    callBackBtn && callBackBtn.addEventListener("click", function () {}),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("overviewContent"),
            t = document.getElementById("seeMoreBtn");
        t.addEventListener("click", function () {
            e.classList.contains("expanded")
                ? (e.classList.remove("expanded"), (t.innerText = "See More"))
                : (e.classList.add("expanded"), (t.innerText = "See Less"));
        });
    }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("popupModal"),
            t = document.getElementById("blurOverlay"),
            n = document.getElementById("closeModal"),
            a = document.querySelector(".popupModal-right"),
            i = document.getElementById("virtual1"),
            s = document.getElementById("priceBreakupBtn"),
            l = document.querySelectorAll(
                ".offerBoxEnquireButton, .aboutEnquireBtn, #overviewRequestBtn, #priceBreakupBtn, .floorPlan-button, .amenitiesDownloadBtn, .galleryDownloadButton, .firstFormCallBack, #freesitevisitbtn"
            ),
            c = document.createElement("h2");
        function o(n, a = "Enquiry Form") {
            n && n.preventDefault();
            let i = a,
                s = n ? n.target.closest("button, a, #virtual1, #priceBreakupBtn") : null;
            (c.className = ""),
                s &&
                    (s.classList.contains("offerBoxEnquireButton") || s.classList.contains("aboutEnquireBtn")
                        ? ((i = "Enquire Now"), c.classList.add("enquire"))
                        : s.classList.contains("nav-link") || "overviewRequestBtn" === s.id
                          ? ((i = "Request Brochure"), c.classList.add("brochure"))
                          : "priceBreakupBtn" === s.id
                            ? ((i = "Send Me Costing Details"), c.classList.add("costing"))
                            : s.classList.contains("floorPlan-button")
                              ? ((i = "Send Me Plan Details"), c.classList.add("enquire"))
                              : s.classList.contains("amenitiesDownloadBtn")
                                ? ((i = "Download Amenities"), c.classList.add("download"))
                                : s.classList.contains("galleryDownloadButton")
                                  ? ((i = "Download Gallery"), c.classList.add("download"))
                                  : "virtual1" === s.id
                                    ? ((i = "Virtual Tour Request"), c.classList.add("virtual"))
                                    : "freesitevisitbtn" === s.id
                                        ? ((i = "Schedule Site Visit"), c.classList.add("enquire"))
                                        : s.classList.contains("firstFormCallBack") &&
                                            ((i = "Instant Call Back"), c.classList.add("call"))),
                (c.textContent = i),
                (c.style.display = "block"),
                t.classList.add("active"),
                setTimeout(() => {
                    e.classList.add("active");
                    showpopupclose();
                }, 100);
        }
        function r() {
            e.classList.remove("active"),
                setTimeout(() => {
                    t.classList.remove("active"), (c.style.display = "none");
                    n.style.display = "none";
                    t.removeEventListener("click", r)
                }, 300);
        }
        function showpopupclose () {
            setTimeout(() => {
                n.style.display = "block";
                t && t.addEventListener("click", r)
            }, 4000);
        }
        (c.id = "modalHeader"),
            (c.style.display = "none"),
            a && a.prepend(c),
            l.length > 0 &&
                l.forEach((e) => {
                    e.addEventListener("click", o);
                }),
            i && i.addEventListener("click", o),
            s && s.addEventListener("click", o),
            n && n.addEventListener("click", r),
            setTimeout(() => {
                o(null, "Limited Time Offer!");
            }, 3e3);
    });


let globalCachedWidth=0,globalCachedHeight=0;
function updateGlobalDimensions(){globalCachedWidth=window.innerWidth,globalCachedHeight=window.innerHeight}

class GalleryCarousel {
    constructor() {
        if (
            ((this.originalSlides = Array.from(document.querySelectorAll(".gallery-carousel-slide"))),
            0 === this.originalSlides.length)
        )
            return;
        (this.galleryTotalSlides = this.originalSlides.length),
            (this.galleryImages = []),
            this.originalSlides.forEach((e) => {
                let t = e.querySelector(".gallery-carousel-image");
                t &&
                    (this.galleryImages.push(t.src),
                    (t.onerror = () => {
                        t.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4=";
                    }));
            }),
            (this.galleryCurrentIndex = 0),
            (this.galleryTrack = document.getElementById("galleryCarouselTrack")),
            (this.galleryDotsContainer = document.getElementById("galleryCarouselDots")),
            (this.galleryPrevBtn = document.getElementById("galleryCarouselPrev")),
            (this.galleryNextBtn = document.getElementById("galleryCarouselNext")),
            (this.galleryAutoPlayInterval = null),
            (this.galleryIsTransitioning = !1),
            (this.galleryPosition = this.galleryTotalSlides),
            (this.galleryLightbox = document.getElementById("galleryCarouselLightbox")),
            (this.galleryLightboxImage = document.getElementById("galleryCarouselLightboxImage")),
            (this.galleryLightboxClose = document.getElementById("galleryCarouselLightboxClose")),
            (this.galleryLightboxPrev = document.getElementById("galleryCarouselLightboxPrev")),
            (this.galleryLightboxNext = document.getElementById("galleryCarouselLightboxNext")),
            (this.galleryLightboxCounter = document.getElementById("galleryCarouselLightboxCounter")),
            (this.galleryLightboxCurrentIndex = 0),
            this.galleryTrack && this.galleryInit(),
            (window.galleryCarousel = this);
    }
    galleryInit() {
        this.galleryCloneSlides(),
            this.galleryCreateDots(),
            this.galleryBindEvents(),
            this.galleryBindLightboxEvents(),
            this.galleryUpdateCarousel(),
            this.galleryStartAutoPlay(),
            setTimeout(() => {
                this.galleryAutoPlayInterval || this.galleryStartAutoPlay();
            }, 1e3),
            "IntersectionObserver" in window &&
                new IntersectionObserver(
                    (e) => {
                        e.forEach((e) => {
                            e.isIntersecting ? this.galleryStartAutoPlay() : this.galleryStopAutoPlay();
                        });
                    },
                    { threshold: 0.1 }
                ).observe(this.galleryTrack);
    }
    galleryCloneSlides() {
        let e = document.createDocumentFragment(),
            t = document.createDocumentFragment();
        for (let i = 0; i < 3; i++) t.appendChild(this.originalSlides[i].cloneNode(!0));
        for (let l = this.galleryTotalSlides - 3; l < this.galleryTotalSlides; l++)
            e.appendChild(this.originalSlides[l].cloneNode(!0));
        this.galleryTrack.prepend(e), this.galleryTrack.appendChild(t), this.gallerySetupImageClickEvents();
    }
    gallerySetupImageClickEvents() {
        let e = this.galleryTrack.querySelectorAll(".gallery-carousel-slide");
        e.forEach((t, i) => {
            let l = t.querySelector(".gallery-carousel-image");
            l &&
                l.addEventListener("click", () => {
                    let t = (i - 3 + e.length) % this.galleryTotalSlides;
                    this.openGalleryLightbox(t);
                });
        });
    }
    galleryCreateDots() {
        for (let e = 0; e < this.galleryTotalSlides; e++) {
            let t = document.createElement("button");
            (t.className = "gallery-carousel-dot"),
                t.setAttribute("aria-label", `Go to ${e + 1} Gallery Image`),
                t.addEventListener("click", () => this.galleryGoToSlide(e)),
                this.galleryDotsContainer.appendChild(t);
        }
    }
    galleryBindEvents() {
        this.galleryPrevBtn.addEventListener("click", () => this.galleryPrevSlide()),
            this.galleryNextBtn.addEventListener("click", () => this.galleryNextSlide());
        let e = 0,
            t = 0;
        this.galleryTrack.addEventListener(
            "touchstart",
            (t) => {
                e = t.touches[0].clientX;
            },
            { passive: !0 }
        ),
            this.galleryTrack.addEventListener(
                "touchend",
                (i) => {
                    let l = e - (t = i.changedTouches[0].clientX);
                    Math.abs(l) > 50 && (l > 0 ? this.galleryNextSlide() : this.galleryPrevSlide());
                },
                { passive: !0 }
            ),
            this.galleryTrack.addEventListener("mouseenter", () => this.galleryStopAutoPlay()),
            this.galleryTrack.addEventListener("mouseleave", () => this.galleryStartAutoPlay());
    }
    galleryBindLightboxEvents() {
        this.galleryLightboxClose.addEventListener("click", () => this.closeGalleryLightbox()),
            this.galleryLightbox.addEventListener("click", (e) => {
                e.target === this.galleryLightbox && this.closeGalleryLightbox();
            }),
            this.galleryLightboxPrev.addEventListener("click", () => this.galleryLightboxPrevImage()),
            this.galleryLightboxNext.addEventListener("click", () => this.galleryLightboxNextImage());
    }
    openGalleryLightbox(e) {
        (this.galleryLightboxCurrentIndex = e),
            (this.galleryLightboxImage.src = this.galleryImages[e]),
            this.updateGalleryLightboxCounter(),
            this.galleryLightbox.classList.add("active"),
            this.galleryStopAutoPlay();
    }
    closeGalleryLightbox() {
        this.galleryLightbox.classList.remove("active"),
            this.galleryStartAutoPlay(),
            (document.body.style.overflow = "auto");
    }
    galleryLightboxPrevImage() {
        (this.galleryLightboxCurrentIndex =
            (this.galleryLightboxCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides),
            (this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex]),
            this.updateGalleryLightboxCounter();
    }
    galleryLightboxNextImage() {
        (this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex + 1) % this.galleryTotalSlides),
            (this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex]),
            this.updateGalleryLightboxCounter();
    }
    updateGalleryLightboxCounter() {
        this.galleryLightboxCounter.textContent = `${this.galleryLightboxCurrentIndex + 1} / ${this.galleryTotalSlides}`;
    }
    galleryUpdateCarousel() {
        requestAnimationFrame(() => {
            let e = this.galleryTrack.querySelectorAll(".gallery-carousel-slide"),
                t = this.galleryDotsContainer.querySelectorAll(".gallery-carousel-dot"),
                i = globalCachedWidth <= 768,
                l = this.galleryPosition + 1;
            e.forEach((e, t) => {
                e.classList.toggle("gallery-carousel-center", t === l);
            }),
                t.forEach((e, t) => {
                    e.classList.toggle("gallery-carousel-active", t === this.galleryCurrentIndex);
                });
            let s = -(this.galleryPosition * (i ? 100 : 33.333));
            this.galleryTrack.style.transform = `translateX(${s}%)`;
        });
    }
    galleryNextSlide() {
        this.galleryIsTransitioning ||
            ((this.galleryIsTransitioning = !0),
            this.galleryPosition++,
            (this.galleryCurrentIndex = (this.galleryCurrentIndex + 1) % this.galleryTotalSlides),
            this.galleryUpdateCarousel(),
            setTimeout(() => {
                let e = this.galleryTrack.querySelectorAll(".gallery-carousel-slide").length;
                if (this.galleryPosition >= e - 3) {
                    (this.galleryTrack.style.transition = "none"), (this.galleryPosition = 3);
                    let t = globalCachedWidth <= 768;
                    (this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * (t ? 100 : 33.333)}%)`),
                        setTimeout(() => {
                            this.galleryTrack.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
                        }, 50);
                }
                this.galleryIsTransitioning = !1;
            }, 800));
    }
    galleryPrevSlide() {
        this.galleryIsTransitioning ||
            ((this.galleryIsTransitioning = !0),
            this.galleryPosition--,
            (this.galleryCurrentIndex =
                (this.galleryCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides),
            this.galleryUpdateCarousel(),
            setTimeout(() => {
                if (this.galleryPosition <= 0) {
                    this.galleryTrack.style.transition = "none";
                    let e = this.galleryTrack.querySelectorAll(".gallery-carousel-slide").length;
                    this.galleryPosition = e - 6;
                    let t = globalCachedWidth <= 768;
                    (this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * (t ? 100 : 33.333)}%)`),
                        setTimeout(() => {
                            this.galleryTrack.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
                        }, 50);
                }
                this.galleryIsTransitioning = !1;
            }, 800));
    }
    galleryGoToSlide(e) {
        if (this.galleryIsTransitioning || e === this.galleryCurrentIndex) return;
        this.galleryIsTransitioning = !0;
        let t = e - this.galleryCurrentIndex;
        (this.galleryPosition += t),
            (this.galleryCurrentIndex = e),
            this.galleryUpdateCarousel(),
            setTimeout(() => {
                this.galleryIsTransitioning = !1;
            }, 800);
    }
    galleryStartAutoPlay() {
        this.galleryStopAutoPlay(),
            (this.galleryAutoPlayInterval = setInterval(() => {
                this.galleryNextSlide();
            }, 4e3));
    }
    galleryStopAutoPlay() {
        this.galleryAutoPlayInterval &&
            (clearInterval(this.galleryAutoPlayInterval), (this.galleryAutoPlayInterval = null));
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    new GalleryCarousel();
});
class AmenitiesCarousel {
    constructor() {
        if (
            ((this.originalSlides = Array.from(document.querySelectorAll(".amenities-slide"))),
            0 === this.originalSlides.length)
        )
            return;
        (this.amenitiesTotalSlides = this.originalSlides.length),
            (this.amenitiesImages = []),
            (this.amenitiesTexts = []),
            this.originalSlides.forEach((e) => {
                let t = e.querySelector(".amenities-image"),
                    i = e.querySelector(".amenities-text-overlay");
                t &&
                    i &&
                    (this.amenitiesImages.push(t.src),
                    this.amenitiesTexts.push(i.textContent),
                    (t.onerror = () => {
                        t.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4=";
                    }));
            }),
            (this.amenitiesCurrentIndex = 0),
            (this.amenitiesTrack = document.getElementById("amenitiesTrack")),
            (this.amenitiesDotsContainer = document.getElementById("amenitiesDots")),
            (this.amenitiesPrevBtn = document.getElementById("amenitiesPrev")),
            (this.amenitiesNextBtn = document.getElementById("amenitiesNext")),
            (this.amenitiesAutoPlayInterval = null),
            (this.amenitiesIsTransitioning = !1),
            (this.amenitiesPosition = this.amenitiesTotalSlides),
            (this.amenitiesLightbox = document.getElementById("amenitiesLightbox")),
            (this.amenitiesLightboxImage = document.getElementById("amenitiesLightboxImage")),
            (this.amenitiesLightboxClose = document.getElementById("amenitiesLightboxClose")),
            (this.amenitiesLightboxPrev = document.getElementById("amenitiesLightboxPrev")),
            (this.amenitiesLightboxNext = document.getElementById("amenitiesLightboxNext")),
            (this.amenitiesLightboxCounter = document.getElementById("amenitiesLightboxCounter")),
            (this.amenitiesLightboxTitle = document.getElementById("amenitiesLightboxTitle")),
            (this.amenitiesLightboxCurrentIndex = 0),
            this.amenitiesTrack && this.amenitiesInit(),
            (window.amenitiesCarousel = this);
    }
    amenitiesInit() {
        this.amenitiesCloneSlides(),
            this.amenitiesCreateDots(),
            this.amenitiesBindEvents(),
            this.amenitiesBindLightboxEvents(),
            this.amenitiesUpdateCarousel(),
            this.amenitiesStartAutoPlay(),
            setTimeout(() => {
                this.amenitiesAutoPlayInterval || this.amenitiesStartAutoPlay();
            }, 1e3),
            "IntersectionObserver" in window &&
                new IntersectionObserver(
                    (e) => {
                        e.forEach((e) => {
                            e.isIntersecting ? this.amenitiesStartAutoPlay() : this.amenitiesStopAutoPlay();
                        });
                    },
                    { threshold: 0.1 }
                ).observe(this.amenitiesTrack);
    }
    amenitiesCloneSlides() {
        let e = document.createDocumentFragment(),
            t = document.createDocumentFragment();
        for (let i = 0; i < 3; i++) t.appendChild(this.originalSlides[i].cloneNode(!0));
        for (let l = this.amenitiesTotalSlides - 3; l < this.amenitiesTotalSlides; l++)
            e.appendChild(this.originalSlides[l].cloneNode(!0));
        this.amenitiesTrack.prepend(e), this.amenitiesTrack.appendChild(t), this.amenitiesSetupImageClickEvents();
    }
    amenitiesSetupImageClickEvents() {
        let e = this.amenitiesTrack.querySelectorAll(".amenities-slide");
        e.forEach((t, i) => {
            let l = t.querySelector(".amenities-image");
            l &&
                l.addEventListener("click", () => {
                    let t = (i - 3 + e.length) % this.amenitiesTotalSlides;
                    this.openAmenitiesLightbox(t);
                });
        });
    }
    amenitiesCreateDots() {
        for (let e = 0; e < this.amenitiesTotalSlides; e++) {
            let t = document.createElement("button");
            (t.className = "amenities-dot"),
                t.setAttribute("aria-label", `Go to ${e + 1} Amenities Preview`),
                t.addEventListener("click", () => this.amenitiesGoToSlide(e)),
                this.amenitiesDotsContainer.appendChild(t);
        }
    }
    amenitiesBindEvents() {
        this.amenitiesPrevBtn.addEventListener("click", () => this.amenitiesPrevSlide()),
            this.amenitiesNextBtn.addEventListener("click", () => this.amenitiesNextSlide());
        let e = 0,
            t = 0;
        this.amenitiesTrack.addEventListener(
            "touchstart",
            (t) => {
                e = t.touches[0].clientX;
            },
            { passive: !0 }
        ),
            this.amenitiesTrack.addEventListener(
                "touchend",
                (i) => {
                    let l = e - (t = i.changedTouches[0].clientX);
                    Math.abs(l) > 50 && (l > 0 ? this.amenitiesNextSlide() : this.amenitiesPrevSlide());
                },
                { passive: !0 }
            ),
            this.amenitiesTrack.addEventListener("mouseenter", () => this.amenitiesStopAutoPlay()),
            this.amenitiesTrack.addEventListener("mouseleave", () => this.amenitiesStartAutoPlay());
    }
    amenitiesBindLightboxEvents() {
        this.amenitiesLightboxClose.addEventListener("click", () => this.closeAmenitiesLightbox()),
            this.amenitiesLightbox.addEventListener("click", (e) => {
                e.target === this.amenitiesLightbox && this.closeAmenitiesLightbox();
            }),
            this.amenitiesLightboxPrev.addEventListener("click", () => this.amenitiesLightboxPrevImage()),
            this.amenitiesLightboxNext.addEventListener("click", () => this.amenitiesLightboxNextImage()),
            document.addEventListener("keydown", (e) => {
                "Escape" === e.key &&
                    this.amenitiesLightbox.classList.contains("active") &&
                    this.closeAmenitiesLightbox();
            });
    }
    openAmenitiesLightbox(e) {
        (this.amenitiesLightboxCurrentIndex = e),
            (this.amenitiesLightboxImage.src = this.amenitiesImages[e]),
            (this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[e]),
            this.updateAmenitiesLightboxCounter(),
            this.amenitiesLightbox.classList.add("active"),
            this.amenitiesStopAutoPlay();
    }
    closeAmenitiesLightbox() {
        this.amenitiesLightbox.classList.remove("active"),
            this.amenitiesStartAutoPlay(),
            (document.body.style.overflow = "auto");
    }
    amenitiesLightboxPrevImage() {
        (this.amenitiesLightboxCurrentIndex =
            (this.amenitiesLightboxCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides),
            (this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex]),
            (this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex]),
            this.updateAmenitiesLightboxCounter();
    }
    amenitiesLightboxNextImage() {
        (this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex + 1) % this.amenitiesTotalSlides),
            (this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex]),
            (this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex]),
            this.updateAmenitiesLightboxCounter();
    }
    updateAmenitiesLightboxCounter() {
        this.amenitiesLightboxCounter.textContent = `${this.amenitiesLightboxCurrentIndex + 1} / ${this.amenitiesTotalSlides}`;
    }
    amenitiesUpdateCarousel() {
        requestAnimationFrame(() => {
            globalCachedWidth = window.innerWidth;
            let e = this.amenitiesTrack.querySelectorAll(".amenities-slide"),
                t = this.amenitiesDotsContainer.querySelectorAll(".amenities-dot"),
                i = globalCachedWidth <= 768,
                l = this.amenitiesPosition + 1;
            e.forEach((e, t) => {
                e.classList.toggle("amenities-center", t === l);
            }),
                t.forEach((e, t) => {
                    e.classList.toggle("amenities-active", t === this.amenitiesCurrentIndex);
                });
            let s = -(this.amenitiesPosition * (i ? 100 : 33.333));
            this.amenitiesTrack.style.transform = `translateX(${s}%)`;
        });
    }
    amenitiesNextSlide() {
        this.amenitiesIsTransitioning ||
            ((this.amenitiesIsTransitioning = !0),
            this.amenitiesPosition++,
            (this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex + 1) % this.amenitiesTotalSlides),
            this.amenitiesUpdateCarousel(),
            setTimeout(() => {
                let e = this.amenitiesTrack.querySelectorAll(".amenities-slide").length;
                if (this.amenitiesPosition >= e - 3) {
                    (this.amenitiesTrack.style.transition = "none"), (this.amenitiesPosition = 3);
                    let t = globalCachedWidth <= 768;
                    (this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * (t ? 100 : 33.333)}%)`),
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
                        }, 50);
                }
                this.amenitiesIsTransitioning = !1;
            }, 800));
    }
    amenitiesPrevSlide() {
        this.amenitiesIsTransitioning ||
            ((this.amenitiesIsTransitioning = !0),
            this.amenitiesPosition--,
            (this.amenitiesCurrentIndex =
                (this.amenitiesCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides),
            this.amenitiesUpdateCarousel(),
            setTimeout(() => {
                if (this.amenitiesPosition <= 0) {
                    this.amenitiesTrack.style.transition = "none";
                    let e = this.amenitiesTrack.querySelectorAll(".amenities-slide").length;
                    this.amenitiesPosition = e - 6;
                    let t = globalCachedWidth <= 768;
                    (this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * (t ? 100 : 33.333)}%)`),
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
                        }, 50);
                }
                this.amenitiesIsTransitioning = !1;
            }, 800));
    }
    amenitiesGoToSlide(e) {
        if (this.amenitiesIsTransitioning || e === this.amenitiesCurrentIndex) return;
        this.amenitiesIsTransitioning = !0;
        let t = e - this.amenitiesCurrentIndex;
        (this.amenitiesPosition += t),
            (this.amenitiesCurrentIndex = e),
            this.amenitiesUpdateCarousel(),
            setTimeout(() => {
                this.amenitiesIsTransitioning = !1;
            }, 800);
    }
    amenitiesStartAutoPlay() {
        this.amenitiesStopAutoPlay(),
            (this.amenitiesAutoPlayInterval = setInterval(() => {
                this.amenitiesNextSlide();
            }, 4e3));
    }
    amenitiesStopAutoPlay() {
        this.amenitiesAutoPlayInterval &&
            (clearInterval(this.amenitiesAutoPlayInterval), (this.amenitiesAutoPlayInterval = null));
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    new AmenitiesCarousel();
});


function repositionWidget(){let t=document.querySelector("#launcher"),e=window.matchMedia("(max-width:768px)").matches?"60px":"0px";if(t){t.style.setProperty("bottom",e,"important"),t.style.setProperty("left","5px","important"),t.style.setProperty("right","auto","important"),t.style.setProperty("transform","none","important");let n=document.querySelector("iframe[title*='Chat']");n&&n.parentElement&&(n.parentElement.style.setProperty("bottom",e,"important"),n.parentElement.style.setProperty("left","5px","important"),n.parentElement.style.setProperty("right","auto","important"))}}function forceRepositioning(){let t=window.matchMedia("(max-width:768px)").matches?"0px":"60px";["#launcher","[data-testid='launcher']",".zEWidget-launcher","iframe[title*='Chat']"].forEach((e=>{let n=document.querySelector(e);if(n){let e=n.parentElement||n;e.style.setProperty("bottom",t,"important"),e.style.setProperty("left","5px","important"),e.style.setProperty("right","auto","important"),e.style.setProperty("transform","none","important")}}))}function loadZeSnippet(){setTimeout((function(){var t=document.createElement("script");t.id="ze-snippet",t.src="https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc",document.head.appendChild(t),t.onload=function(){var t=setInterval((function(){if("undefined"!=typeof zE&&document.querySelector("#launcher")&&(clearInterval(t),repositionWidget(),zE("webWidget:on","open",(function(){setTimeout(repositionWidget,100)})),zE("webWidget:on","close",(function(){setTimeout(repositionWidget,100),setTimeout(forceRepositioning,500)})),zE("webWidget:on","minimize",(function(){setTimeout(repositionWidget,100),setTimeout(forceRepositioning,500)})),zE("webWidget:on","maximize",(function(){setTimeout(repositionWidget,100)})),zE("webWidget:on","launcherClick",(function(){setTimeout(repositionWidget,100)})),setInterval(forceRepositioning,2e3),window.MutationObserver)){const t=new MutationObserver((function(t){t.forEach((function(t){"attributes"!==t.type||"style"!==t.attributeName&&"class"!==t.attributeName||setTimeout(repositionWidget,50)}))}));setTimeout((function(){let e=document.querySelector("#launcher");e&&(t.observe(e,{attributes:!0,subtree:!0}),e.parentElement&&t.observe(e.parentElement,{attributes:!0,subtree:!0}))}),1e3)}}),100)}}),4e3)}function toggleTab(t){document.querySelectorAll('.tab input[type="checkbox"]').forEach((function(e){e.id!==t&&(e.checked=!1)}))}function addPersistentCSS(){const t=document.createElement("style");t.textContent="\n        #launcher,\n        [data-testid='launcher'],\n        .zEWidget-launcher {\n            bottom: 0px !important;\n            left: 5px !important;\n            right: auto !important;\n            transform: none !important;\n        }\n        \n        /* Target the iframe container as well */\n        iframe[title*=\"Chat\"] {\n            position: fixed !important;\n            bottom: 0px !important;\n            left: 5px !important;\n            right: auto !important;\n        }\n\n        @media (max-width:768px) {\n            #launcher,\n        [data-testid='launcher'],\n        .zEWidget-launcher {\n            bottom: 60px !important;\n            left: 5px !important;\n            right: auto !important;\n            transform: none !important;\n        }\n        \n        /* Target the iframe container as well */\n        iframe[title*=\"Chat\"] {\n            position: fixed !important;\n            bottom: 60px !important;\n            left: 5px !important;\n            right: auto !important;\n        }\n        }\n    ",document.head.appendChild(t)}addPersistentCSS(),loadZeSnippet(),window.addEventListener("resize",repositionWidget)
