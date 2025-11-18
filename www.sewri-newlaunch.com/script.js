
document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelector(".headerMenuButton"),
        t = document.querySelector(".mobileMenu"),
        n = document.querySelector(".mobileMenuClose"),
        r = document.querySelectorAll(".mobileMenuLink");
    e.addEventListener("click", () => {
        t.classList.add("active");
    }),
        n.addEventListener("click", () => {
            t.classList.remove("active");
        }),
        r.forEach((e) => {
            e.addEventListener("click", () => {
                t.classList.remove("active");
            });
        }),
        window.addEventListener("scroll", () => {
            let e = document.querySelector(".mainHeader");
            window.scrollY > 50 ? (e.style.background = "rgba(0, 0, 0, 0.8)") : (e.style.background = "rgba(0, 0, 0, 0.3)");
        });
}),
    // document.addEventListener("DOMContentLoaded", function () {
    //     let e = document.querySelector(".bannerSlidesContainer"),
    //         t = document.querySelectorAll(".bannerCarouselSlide"),
    //         n = document.querySelector(".bannerPrevButton"),
    //         r = document.querySelector(".bannerNextButton"),
    //         i = document.querySelectorAll(".bannerIndicator"),
    //         o = 0,
    //         l = t.length,
    //         s;
    //     function c() {
    //         (e.style.transform = `translateX(-${100 * o}%)`),
    //             i.forEach((e, t) => {
    //                 e.classList.toggle("active", t === o);
    //             });
    //     }
    //     function a() {
    //         (o = (o + 1) % l), c();
    //     }
    //     function d() {
    //         u(), (s = setInterval(a, 5e3));
    //     }
    //     function u() {
    //         clearInterval(s);
    //     }
    //     c(),
    //         n.addEventListener("click", function e() {
    //             (o = (o - 1 + l) % l), c();
    //         }),
    //         r.addEventListener("click", a),
    //         i.forEach((e, t) => {
    //             e.addEventListener("click", function () {
    //                 var e;
    //                 (o = e = t), c();
    //             });
    //         }),
    //         d(),
    //         e.addEventListener("mouseenter", u),
    //         e.addEventListener("mouseleave", d);
    // }),
    document.querySelectorAll(".readMoreLink").forEach((e, t) => {
        let n = document.querySelectorAll(".clampText")[t],
            r = !1;
        e.addEventListener("click", (e1) => {
            e1.preventDefault();
            (r = !r), (n.style.webkitLineClamp = r ? "unset" : "6"), (e.textContent = r ? " Read Less" : " Read More");
        });
    }),
    // document.addEventListener("DOMContentLoaded", function () {
    //     let e = document.querySelector(".newGallerySlideWrapper"),
    //         t = document.querySelectorAll(".newGalleryDesktopSlide"),
    //         n = document.querySelector(".newGalleryPrev"),
    //         r = document.querySelector(".newGalleryNext"),
    //         i = 1,
    //         o = t.length - 1,
    //         l,
    //         s;
    //     function c() {
    //         (s = a()), (e.style.transition = "none"), (e.style.transform = `translateX(-${s * i}%)`);
    //     }
    //     function a() {
    //         return window.innerWidth <= 768 ? 100 : 33.333;
    //     }
    //     function d(t) {
    //         (i = t < 1 ? o : t > o ? 1 : t),
    //             (s = a()),
    //             (e.style.transition = "transform 0.5s ease"),
    //             (e.style.transform = `translateX(-${i * s}%)`),
    //             e.addEventListener("transitionend", function t() {
    //                 e.removeEventListener("transitionend", t), (0 === i || i === o + 1) && ((e.style.transition = "none"), (i = 0 === i ? o : 1), (e.style.transform = `translateX(-${i * s}%)`));
    //             });
    //     }
    //     function u() {
    //         l = setInterval(() => {
    //             d(i + 1);
    //         }, 5e3);
    //     }
    //     function y() {
    //         clearInterval(l), u();
    //     }
    //     n.addEventListener("click", (e) => {
    //         e.stopPropagation(), d(i - 1), y();
    //     }),
    //         r.addEventListener("click", (e) => {
    //             e.stopPropagation(), d(i + 1), y();
    //         }),
    //         c(),
    //         u(),
    //         window.addEventListener("resize", function e() {
    //             c(), d(i);
    //         });
    //     let v = document.querySelectorAll(".newGalleryImage"),
    //         f = document.querySelector(".newGalleryLightbox"),
    //         L = document.querySelector(".newGalleryLightboxImage"),
    //         m = document.querySelector(".newGalleryLightboxTitle"),
    //         E = document.querySelector(".newGalleryLightboxClose"),
    //         $ = document.querySelector(".newGalleryLightboxPrev"),
    //         g = document.querySelector(".newGalleryLightboxNext"),
    //         h = 0,
    //         S = [],
    //         q = [];
    //     function w() {
    //         f.classList.remove("active"), (document.body.style.overflow = ""), u();
    //     }
    //     function p() {
    //         (L.src = S[h]), (m.textContent = q[h]);
    //     }
    //     function k(e) {
    //         (h += e) < 0 ? (h = S.length - 1) : h >= S.length && (h = 0), p();
    //     }
    //     v.forEach((e, t) => {
    //         let n = e.querySelector("img"),
    //             r = e.querySelector(".newGalleryImageTitle").textContent;
    //         !(e.closest("#newGalleryFirstClone") || e.closest("#newGalleryLastClone")) &&
    //             (S.push(n.src),
    //                 q.push(r),
    //                 e.addEventListener("click", (e) => {
    //                     var n;
    //                     e.target.closest(".newGalleryNavButton") || ((h = n = t - 1) < 0 && (h = 0), h >= S.length && (h = S.length - 1), p(), f.classList.add("active"), (document.body.style.overflow = "hidden"), clearInterval(l));
    //                 }));
    //     }),
    //         E.addEventListener("click", w),
    //         $.addEventListener("click", () => k(-1)),
    //         g.addEventListener("click", () => k(1)),
    //         f.addEventListener("click", (e) => {
    //             e.target === f && w();
    //         }),
    //         document.addEventListener("keydown", (e) => {
    //             f.classList.contains("active") && ("Escape" === e.key ? w() : "ArrowLeft" === e.key ? k(-1) : "ArrowRight" === e.key && k(1));
    //         });
    // }),
    // document.addEventListener("DOMContentLoaded", function () {
    //     let e = document.querySelector(".newAmenitiesSlideWrapper"),
    //         t = document.querySelectorAll(".newAmenitiesDesktopSlide"),
    //         n = document.querySelector(".newAmenitiesPrev"),
    //         r = document.querySelector(".newAmenitiesNext"),
    //         i = 0,
    //         o = t.length - 1,
    //         l,
    //         s;
    //     function c() {
    //         (s = a()), (e.style.transition = "none"), (e.style.transform = `translateX(-${s * i}%)`);
    //     }
    //     function a() {
    //         return window.innerWidth <= 768 ? 100 : 33.333;
    //     }
    //     function d(t) {
    //         (i = t < 0 ? o : t > o ? 1 : t),
    //             (s = a()),
    //             (e.style.transition = "transform 0.5s ease"),
    //             (e.style.transform = `translateX(-${i * s}%)`),
    //             e.addEventListener("transitionend", function t() {
    //                 e.removeEventListener("transitionend", t), (0 === i || i === o + 1) && ((e.style.transition = "none"), (i = 0 === i ? o : 1), (e.style.transform = `translateX(-${i * s}%)`));
    //             });
    //     }
    //     function u() {
    //         l = setInterval(() => {
    //             d(i + 1);
    //         }, 5e3);
    //     }
    //     function y() {
    //         clearInterval(l), u();
    //     }
    //     n.addEventListener("click", () => {
    //         d(i - 1), y();
    //     }),
    //         r.addEventListener("click", () => {
    //             d(i + 1), y();
    //         }),
    //         c(),
    //         u(),
    //         window.addEventListener("resize", function e() {
    //             c(), d(i);
    //         });
    //     let v = document.querySelectorAll(".newAmenitiesImage"),
    //         f = document.querySelector(".newAmenitiesLightbox"),
    //         L = document.querySelector(".newAmenitiesLightboxImage"),
    //         m = document.querySelector(".newAmenitiesLightboxTitle"),
    //         E = document.querySelector(".newAmenitiesLightboxClose"),
    //         $ = document.querySelector(".newAmenitiesLightboxPrev"),
    //         g = document.querySelector(".newAmenitiesLightboxNext"),
    //         h = 0,
    //         S = [],
    //         q = [];
    //     function w() {
    //         f.classList.remove("active"), (document.body.style.overflow = ""), u();
    //     }
    //     function p() {
    //         (L.src = S[h]), (m.textContent = q[h]);
    //     }
    //     function k(e) {
    //         (h += e) < 0 ? (h = S.length - 1) : h >= S.length && (h = 0), p();
    //     }
    //     v.forEach((e, t) => {
    //         let n = e.querySelector("img"),
    //             r = e.querySelector(".newAmenitiesImageTitle").textContent;
    //         !e.closest("#newAmenitiesFirstClone") &&
    //             (S.push(n.src),
    //                 q.push(r),
    //                 e.addEventListener("click", () => {
    //                     var e;
    //                     (h = e = t - 1) < 0 && (h = 0), h >= S.length && (h = S.length - 1), p(), f.classList.add("active"), (document.body.style.overflow = "hidden"), clearInterval(l);
    //                 }));
    //     }),
    //         E.addEventListener("click", w),
    //         $.addEventListener("click", () => k(-1)),
    //         g.addEventListener("click", () => k(1)),
    //         f.addEventListener("click", (e) => {
    //             e.target === f && w();
    //         }),
    //         document.addEventListener("keydown", (e) => {
    //             f.classList.contains("active") && ("Escape" === e.key ? w() : "ArrowLeft" === e.key ? k(-1) : "ArrowRight" === e.key && k(1));
    //         });
    // }),
    // document.addEventListener("DOMContentLoaded", function () {
    //     let e = document.querySelector(".carousel"),
    //         t = document.querySelector(".carousel-inner"),
    //         n = document.querySelectorAll(".carousel-item"),
    //         r = document.querySelector(".carousel-control.prev"),
    //         i = document.querySelector(".carousel-control.next"),
    //         o = document.querySelectorAll(".carousel-indicator"),
    //         l = 0,
    //         s = n.length;
    //     function c() {
    //         return window.innerWidth > 768 ? 3 : 1;
    //     }
    //     function a() {
    //         return Math.ceil(s / c());
    //     }
    //     function d() {
    //         let e = c();
    //         (t.style.transform = `translateX(-${l * (100 / e)}%)`),
    //             o.forEach((t, n) => {
    //                 n < a() ? ((t.style.display = "block"), t.classList.toggle("active", n === Math.floor(l / e))) : (t.style.display = "none");
    //             });
    //     }
    //     function u() {
    //         return setInterval(function () {
    //             let e = c();
    //             l < s - e ? (l += e) : (l = 0), d();
    //         }, 3e3);
    //     }
    //     r.addEventListener("click", function () {
    //         let e = c();
    //         (l = Math.max(0, l - e)), d();
    //     }),
    //         i.addEventListener("click", function () {
    //             let e = c();
    //             (l = Math.min(s - e, l + e)), d();
    //         }),
    //         o.forEach((e, t) => {
    //             e.addEventListener("click", function () {
    //                 let e = c();
    //                 (l = t * e), d();
    //             });
    //         }),
    //         window.addEventListener("resize", d),
    //         (function () {
    //             let e = a();
    //             o.forEach((t, n) => {
    //                 t.style.display = n < e ? "block" : "none";
    //             });
    //         })(),
    //         d();
    //     let y = u();
    //     e.addEventListener("mouseenter", function () {
    //         clearInterval(y);
    //     }),
    //         e.addEventListener("mouseleave", function () {
    //             clearInterval(y), (y = u());
    //         });
    //     let v = 0,
    //         f = 0;
    //     e.addEventListener(
    //         "touchstart",
    //         function (e) {
    //             (v = e.changedTouches[0].screenX), clearInterval(y);
    //         },
    //         { passive: !0 }
    //     ),
    //         e.addEventListener(
    //             "touchend",
    //             function (e) {
    //                 (f = e.changedTouches[0].screenX),
    //                     (function () {
    //                         if (f < v - 50) {
    //                             let e = c();
    //                             (l = Math.min(s - e, l + e)), d();
    //                         }
    //                         if (f > v + 50) {
    //                             let t = c();
    //                             (l = Math.max(0, l - t)), d();
    //                         }
    //                     })(),
    //                     (y = u());
    //             },
    //             { passive: !0 }
    //         );
    // }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("modalFormContainer"),
            t = document.getElementById("modalFormOverlay"),
            n = document.getElementById("modalFormCloseBtn"),
            r = document.querySelector(".modalFormTitle");
        if (!(e && t && n && r)) return void console.warn("Modal elements not found!");
        function i(n) {
            e.classList.add("active"), t.classList.add("active"), (r.textContent = n || "Enquire Now");
            // showClosePopup();
        }
        function o() {
            e.classList.remove("active"), t.classList.remove("active");
            // t.removeEventListener("click",o);
            // n.style.display="none";
        }
        
        // function showClosePopup(){
        //     setTimeout(() => {
        //         n.style.display="block";
        //     t.addEventListener("click", o);
        //     }, 4000);
        // }
        setTimeout(() => {
            i("Enquire Now");
            // showClosePopup();
        }, 4e3),
            n.addEventListener("click", o),
            t.addEventListener("click", o),
            [
                { selector: ".overviewRequestBrochureButton", title: "Request Brochure" },
                { selector: ".overviewRegisterButton", title: "Register Now" },
                { selector: ".get-details", title: "Get Price Details" },
                { selector: ".floorPlanButtons", title: "View Plan" },
                { selector: ".floorPlanCta", title: "Download Amenities" },
                {selector:".floordownload",title:"Download Floor Plan"},
                { selector: ".gallery-cta", title: "Download Gallery" },
                { selector: ".map-cta", title: "Request Location Details" },
                { selector: ".tour-cta", title: "Request Virtual Tour" },
            ].forEach(({ selector: e, title: t }) => {
                document.querySelectorAll(e).forEach((e) => {
                    e.addEventListener("click", function (e) {
                        e.preventDefault(), i(t);
                    });
                });
            });
    });

//Amenities Script
//         class AmenitiesCarousel {
//             constructor() {
//                 // Get the original slides
//                 this.originalSlides = Array.from(document.querySelectorAll('.amenities-slide'));
//                 this.amenitiesTotalSlides = this.originalSlides.length;

//                 // Store data for lightbox
//                 this.amenitiesImages = [];
//                 this.amenitiesTexts = [];

//                 // Extract data from original slides
//                 this.originalSlides.forEach(slide => {
//                     const img = slide.querySelector('.amenities-image');
//                     const text = slide.querySelector('.amenities-text-overlay');
//                     this.amenitiesImages.push(img.src);
//                     this.amenitiesTexts.push(text.textContent);

//                     // Add error handling for images
//                     img.onerror = () => {
//                         img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
//                     };
//                 });

//                 // Setup carousel variables
//                 this.amenitiesCurrentIndex = 0;
//                 this.amenitiesTrack = document.getElementById('amenitiesTrack');
//                 // this.amenitiesDotsContainer = document.getElementById('amenitiesDots');
//                 this.amenitiesPrevBtn = document.getElementById('amenitiesPrev');
//                 this.amenitiesNextBtn = document.getElementById('amenitiesNext');
//                 this.amenitiesAutoPlayInterval = null;
//                 this.amenitiesIsTransitioning = false;

//                 // Calculate starting position for seamless infinite scroll
//                 this.amenitiesPosition = this.amenitiesTotalSlides;

//                 // Lightbox elements
//                 this.amenitiesLightbox = document.getElementById('amenitiesLightbox');
//                 this.amenitiesLightboxImage = document.getElementById('amenitiesLightboxImage');
//                 this.amenitiesLightboxClose = document.getElementById('amenitiesLightboxClose');
//                 this.amenitiesLightboxPrev = document.getElementById('amenitiesLightboxPrev');
//                 this.amenitiesLightboxNext = document.getElementById('amenitiesLightboxNext');
//                 this.amenitiesLightboxCounter = document.getElementById('amenitiesLightboxCounter');
//                 this.amenitiesLightboxTitle = document.getElementById('amenitiesLightboxTitle');
//                 this.amenitiesLightboxCurrentIndex = 0;

//                 // Initialize the carousel
//                 this.amenitiesInit();
//             }

//             amenitiesInit() {
//                 // Clone slides for infinite effect
//                 this.amenitiesCloneSlides();

//                 // Create dots
//                 // this.amenitiesCreateDots();

//                 // Bind events
//                 this.amenitiesBindEvents();
//                 this.amenitiesBindLightboxEvents();

//                 // Position the carousel
//                 this.amenitiesUpdateCarousel();

//                 // Start autoplay
//                 this.amenitiesStartAutoPlay();
//             }

//             amenitiesCloneSlides() {
//                 // Create clones for infinite scrolling effect
//                 const fragmentStart = document.createDocumentFragment();
//                 const fragmentEnd = document.createDocumentFragment();

//                 // Clone first 3 slides to the end
//                 for (let i = 0; i < 3; i++) {
//                     const clone = this.originalSlides[i].cloneNode(true);
//                     fragmentEnd.appendChild(clone);
//                 }

//                 // Clone last 3 slides to the beginning
//                 for (let i = this.amenitiesTotalSlides - 3; i < this.amenitiesTotalSlides; i++) {
//                     const clone = this.originalSlides[i].cloneNode(true);
//                     fragmentStart.appendChild(clone);
//                 }

//                 // Append clones to track
//                 this.amenitiesTrack.prepend(fragmentStart);
//                 this.amenitiesTrack.appendChild(fragmentEnd);

//                 // Setup image click events for all slides
//                 this.amenitiesSetupImageClickEvents();
//             }

//             // amenitiesSetupImageClickEvents() {
//             //     const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
//             //     slides.forEach((slide, index) => {
//             //         const img = slide.querySelector('.amenities-image');
//             //         img.addEventListener('click', () => {
//             //             // Calculate original image index
//             //             const totalSlides = slides.length;
//             //             const originalIndex = (index - 1 + totalSlides) % this.amenitiesTotalSlides;
//             //             console.log(originalIndex);
//             //             this.openAmenitiesLightbox(originalIndex);
//             //         });
//             //     });
//             // }

//             amenitiesSetupImageClickEvents() {
//     const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
//     slides.forEach((slide, index) => {
//         const img = slide.querySelector('.amenities-image');
//         img.addEventListener('click', () => {
//             // Check if the clicked slide is one of the original slides
//             if (index >= 3 && index < this.amenitiesTotalSlides + 3) {
//                 // Calculate the correct original image index by subtracting the 3 cloned slides at the start
//                 const originalIndex = index - 3;
//                 this.openAmenitiesLightbox(originalIndex);
//             }
//         });
//     });
// }

//             // amenitiesCreateDots() {
//             //     for (let i = 0; i < this.amenitiesTotalSlides; i++) {
//             //         const amenitiesDot = document.createElement('button');
//             //         amenitiesDot.className = 'amenities-dot';
//             //         amenitiesDot.addEventListener('click', () => this.amenitiesGoToSlide(i));
//             //         this.amenitiesDotsContainer.appendChild(amenitiesDot);
//             //     }
//             // }

//             amenitiesBindEvents() {
//                 this.amenitiesPrevBtn.addEventListener('click', () => this.amenitiesPrevSlide());
//                 this.amenitiesNextBtn.addEventListener('click', () => this.amenitiesNextSlide());

//                 // Touch events for mobile
//                 let amenitiesStartX = 0;
//                 let amenitiesEndX = 0;

//                 this.amenitiesTrack.addEventListener('touchstart', (e) => {
//                     amenitiesStartX = e.touches[0].clientX;
//                 },{passive:true});

//                 this.amenitiesTrack.addEventListener('touchend', (e) => {
//                     amenitiesEndX = e.changedTouches[0].clientX;
//                     const amenitiesDiff = amenitiesStartX - amenitiesEndX;

//                     if (Math.abs(amenitiesDiff) > 50) {
//                         if (amenitiesDiff > 0) {
//                             this.amenitiesNextSlide();
//                         } else {
//                             this.amenitiesPrevSlide();
//                         }
//                     }
//                 },{passive:true});

//                 // Pause autoplay on hover
//                 this.amenitiesTrack.addEventListener('mouseenter', () => this.amenitiesStopAutoPlay());
//                 this.amenitiesTrack.addEventListener('mouseleave', () => this.amenitiesStartAutoPlay());

//                 // Keyboard navigation
//                 document.addEventListener('keydown', (e) => {
//                     if (e.key === 'ArrowLeft') {
//                         this.amenitiesPrevSlide();
//                     } else if (e.key === 'ArrowRight') {
//                         this.amenitiesNextSlide();
//                     } else if (e.key === 'Escape' && this.amenitiesLightbox.classList.contains('active')) {
//                         this.closeAmenitiesLightbox();
//                     }
//                 });
//             }

//             amenitiesBindLightboxEvents() {
//                 // Close lightbox events
//                 this.amenitiesLightboxClose.addEventListener('click', () => this.closeAmenitiesLightbox());
//                 this.amenitiesLightbox.addEventListener('click', (e) => {
//                     if (e.target === this.amenitiesLightbox) {
//                         this.closeAmenitiesLightbox();
//                     }
//                 });

//                 // Lightbox navigation
//                 this.amenitiesLightboxPrev.addEventListener('click', () => this.amenitiesLightboxPrevImage());
//                 this.amenitiesLightboxNext.addEventListener('click', () => this.amenitiesLightboxNextImage());
//             }

//             openAmenitiesLightbox(index) {
//                 console.log(index);
//                 this.amenitiesLightboxCurrentIndex = index;
//                 this.amenitiesLightboxImage.src = this.amenitiesImages[index];
//                 this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[index];
//                 this.updateAmenitiesLightboxCounter();
//                 this.amenitiesLightbox.classList.add('active');
//                 this.amenitiesStopAutoPlay();
//                 document.body.style.overflow = 'hidden';
//             }

//             closeAmenitiesLightbox() {
//                 this.amenitiesLightbox.classList.remove('active');
//                 this.amenitiesStartAutoPlay();
//                 document.body.style.overflow = 'auto';
//             }

//             amenitiesLightboxPrevImage() {
//                 this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
//                 this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
//                 this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
//                 this.updateAmenitiesLightboxCounter();
//             }

//             amenitiesLightboxNextImage() {
//                 this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex + 1) % this.amenitiesTotalSlides;
//                 this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
//                 this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
//                 this.updateAmenitiesLightboxCounter();
//             }

//             updateAmenitiesLightboxCounter() {
//                 this.amenitiesLightboxCounter.textContent = `${this.amenitiesLightboxCurrentIndex + 1} / ${this.amenitiesTotalSlides}`;
//             }

//             amenitiesUpdateCarousel() {
//                 const amenitiesSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
//                 // const amenitiesDots = this.amenitiesDotsContainer.querySelectorAll('.amenities-dot');

//                 // Calculate which slide is in the center
//                 const amenitiesIsMobile = window.innerWidth <= 576;
//                 const amenitiesCenterIndex = amenitiesIsMobile ? 
//                     this.amenitiesPosition + 1 : 
//                     this.amenitiesPosition + 1;

//                 // Update center slide highlighting
//                 // amenitiesSlides.forEach((slide, index) => {
//                 //     slide.classList.remove('amenities-center');
//                 //     if (index === amenitiesCenterIndex) {
//                 //         slide.classList.add('amenities-center');
//                 //     }
//                 // });

//                 // Update active dot
//                 // amenitiesDots.forEach((dot, index) => {
//                 //     dot.classList.remove('amenities-active');
//                 //     if (index === this.amenitiesCurrentIndex) {
//                 //         dot.classList.add('amenities-active');
//                 //     }
//                 // });

//                 // Move carousel
//                 const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
//                 const amenitiesTranslateX = -(this.amenitiesPosition * amenitiesSlideWidth);
//                 this.amenitiesTrack.style.transform = `translateX(${amenitiesTranslateX}%)`;
//                 console.log("middle");
//             }

//             amenitiesNextSlide() {
//                 if (this.amenitiesIsTransitioning) return;
//                 this.amenitiesIsTransitioning = true;

//                 this.amenitiesPosition++;
//                 this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex + 1) % this.amenitiesTotalSlides;

//                 this.amenitiesUpdateCarousel();

//                 // Reset position for seamless infinite scroll
//                 setTimeout(() => {
//                     const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
//                     if (this.amenitiesPosition >= totalSlides - 3) {
//                         this.amenitiesTrack.style.transition = 'none';
//                         this.amenitiesPosition = 3;

//                         const amenitiesIsMobile = window.innerWidth <= 576;
//                         const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
//                         this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;
//                         console.log("rresetting");
//                         // amenitiesSlides[index].classList.add("amenities-center");
//                         console.log("Adding");
//                         setTimeout(() => {
//                             this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//                             console.log(this.amenitiesTrack.style.transform);
//                         }, 50);
//                     }
//                     this.amenitiesIsTransitioning = false;
//                 }, 600);
//             }

//             amenitiesPrevSlide() {
//                 if (this.amenitiesIsTransitioning) return;
//                 this.amenitiesIsTransitioning = true;

//                 this.amenitiesPosition--;
//                 this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;

//                 this.amenitiesUpdateCarousel();

//                 // Reset position for seamless infinite scroll
//                 setTimeout(() => {
//                     if (this.amenitiesPosition <= 0) {
//                         this.amenitiesTrack.style.transition = 'none';
//                         const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
//                         this.amenitiesPosition = totalSlides - 6;
//                         const amenitiesIsMobile = window.innerWidth <= 576;
//                         const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
//                         this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;

//                         setTimeout(() => {
//                             this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//                         }, 50);
//                     }
//                     this.amenitiesIsTransitioning = false;
//                 }, 600);
//             }

//             amenitiesGoToSlide(index) {
//                 if (this.amenitiesIsTransitioning || index === this.amenitiesCurrentIndex) return;

//                 this.amenitiesIsTransitioning = true;

//                 // Calculate the difference
//                 const diff = index - this.amenitiesCurrentIndex;
//                 this.amenitiesPosition += diff;
//                 this.amenitiesCurrentIndex = index;

//                 this.amenitiesUpdateCarousel();

//                 setTimeout(() => {
//                     this.amenitiesIsTransitioning = false;
//                 }, 600);
//             }

//             amenitiesStartAutoPlay() {
//                 this.amenitiesStopAutoPlay();
//                 this.amenitiesAutoPlayInterval = setInterval(() => {
//                     this.amenitiesNextSlide();
//                 }, 5000);
//             }

//             amenitiesStopAutoPlay() {
//                 if (this.amenitiesAutoPlayInterval) {
//                     clearInterval(this.amenitiesAutoPlayInterval);
//                     this.amenitiesAutoPlayInterval = null;
//                 }
//             }
//         }

//         // Initialize carousel when DOM is loaded
//         document.addEventListener('DOMContentLoaded', () => {
//             new AmenitiesCarousel();
//         });
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
        // this.amenitiesDotsContainer = document.getElementById('amenitiesDots');
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
        console.log("constructor");
    }

    amenitiesInit() {
        // Clone slides for infinite effect
        this.amenitiesCloneSlides();

        // Create dots
        // this.amenitiesCreateDots();

        // Bind events
        this.amenitiesBindEvents();
        this.amenitiesBindLightboxEvents();

        // Position the carousel
        this.amenitiesUpdateCarousel();
        console.log("initialized");

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
        // this.amenitiesSetupImageClickEvents();
    }

    // amenitiesSetupImageClickEvents() {
    //     const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
    //     slides.forEach((slide, index) => {
    //         const img = slide.querySelector('.amenities-image');
    //         // Remove previous event listener to prevent duplicates
    //         const newImg = img.cloneNode(true);
    //         img.parentNode.replaceChild(newImg, img);

    //         // Add the new event listener
    //         newImg.addEventListener('click', () => {
    //             let originalIndex = index - 3;
    //             if (originalIndex < 0) {
    //                 originalIndex = this.amenitiesTotalSlides + originalIndex;
    //             } else if (originalIndex >= this.amenitiesTotalSlides) {
    //                 originalIndex = originalIndex - this.amenitiesTotalSlides;
    //             }
    //             this.openAmenitiesLightbox(originalIndex);
    //         });
    //     });
    // }

    // amenitiesCreateDots() {
    //     for (let i = 0; i < this.amenitiesTotalSlides; i++) {
    //         const amenitiesDot = document.createElement('button');
    //         amenitiesDot.className = 'amenities-dot';
    //         amenitiesDot.addEventListener('click', () => this.amenitiesGoToSlide(i));
    //         this.amenitiesDotsContainer.appendChild(amenitiesDot);
    //     }
    // }

    amenitiesBindEvents() {
        this.amenitiesPrevBtn.addEventListener('click', () => this.amenitiesPrevSlide());
        this.amenitiesNextBtn.addEventListener('click', () => this.amenitiesNextSlide());

        // Touch events for mobile
        let amenitiesStartX = 0;
        let amenitiesEndX = 0;

        this.amenitiesTrack.addEventListener('touchstart', (e) => {
            amenitiesStartX = e.touches[0].clientX;
        }, {
            passive: true
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
        }, {
            passive: true
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
        console.log(index);
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
        console.log("previous");
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
        console.log("updating");
        const amenitiesSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
        // const amenitiesDots = this.amenitiesDotsContainer.querySelectorAll('.amenities-dot');

        // Calculate which slide is in the center
        const amenitiesIsMobile = window.innerWidth <= 576;
        const amenitiesCenterIndex = amenitiesIsMobile ?
            this.amenitiesPosition + 1 :
            this.amenitiesPosition + 1;

        // Update center slide highlighting
        // amenitiesSlides.forEach((slide, index) => {
        //     slide.classList.remove('amenities-center');
        //     if (index === amenitiesCenterIndex) {
        //         slide.classList.add('amenities-center');
        //     }
        // });

        // Update active dot
        // amenitiesDots.forEach((dot, index) => {
        //     dot.classList.remove('amenities-active');
        //     if (index === this.amenitiesCurrentIndex) {
        //         dot.classList.add('amenities-active');
        //     }
        // });

        // Move carousel
        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
        const amenitiesTranslateX = -(this.amenitiesPosition * amenitiesSlideWidth);
        this.amenitiesTrack.style.transform = `translateX(${amenitiesTranslateX}%)`;
        console.log("middle2");
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
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
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
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
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
// document.addEventListener('DOMContentLoaded', () => {
//     console.log("DOM loaded");
//     new AmenitiesCarousel();
// });
document.addEventListener('DOMContentLoaded', () => {
    new AmenitiesCarousel();
});


//Gallerry JS
// class GalleryCarousel {
//     constructor() {
//         // Get the original slides
//         this.originalSlides = Array.from(document.querySelectorAll('.gallery-slide'));
//         this.galleryTotalSlides = this.originalSlides.length;

//         // Store data for lightbox
//         this.galleryImages = [];
//         this.galleryTexts = [];

//         // Extract data from original slides
//         this.originalSlides.forEach(slide => {
//             const img = slide.querySelector('.gallery-image');
//             const text = slide.querySelector('.gallery-text-overlay');
//             this.galleryImages.push(img.src);
//             this.galleryTexts.push(text.textContent);

//             // Add error handling for images
//             img.onerror = () => {
//                 img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
//             };
//         });

//         // Setup carousel variables
//         this.galleryCurrentIndex = 0;
//         this.galleryTrack = document.getElementById('galleryTrack');
//         // this.galleryDotsContainer = document.getElementById('galleryDots');
//         this.galleryPrevBtn = document.getElementById('galleryPrev');
//         this.galleryNextBtn = document.getElementById('galleryNext');
//         this.galleryAutoPlayInterval = null;
//         this.galleryIsTransitioning = false;

//         // Calculate starting position for seamless infinite scroll
//         this.galleryPosition = this.galleryTotalSlides;

//         // Lightbox elements
//         this.galleryLightbox = document.getElementById('galleryLightbox');
//         this.galleryLightboxImage = document.getElementById('galleryLightboxImage');
//         this.galleryLightboxClose = document.getElementById('galleryLightboxClose');
//         this.galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
//         this.galleryLightboxNext = document.getElementById('galleryLightboxNext');
//         this.galleryLightboxCounter = document.getElementById('galleryLightboxCounter');
//         // this.galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
//         this.galleryLightboxCurrentIndex = 0;

//         // Initialize the carousel
//         this.galleryInit();
//     }

//     galleryInit() {
//         // Clone slides for infinite effect
//         this.galleryCloneSlides();

//         // Create dots
//         // this.galleryCreateDots();

//         // Bind events
//         this.galleryBindEvents();
//         this.galleryBindLightboxEvents();

//         // Position the carousel
//         this.galleryUpdateCarousel();

//         // Start autoplay
//         this.galleryStartAutoPlay();
//     }

//     galleryCloneSlides() {
//         // Create clones for infinite scrolling effect
//         const fragmentStart = document.createDocumentFragment();
//         const fragmentEnd = document.createDocumentFragment();

//         // Clone first 3 slides to the end
//         for (let i = 0; i < 3; i++) {
//             const clone = this.originalSlides[i].cloneNode(true);
//             fragmentEnd.appendChild(clone);
//         }

//         // Clone last 3 slides to the beginning
//         for (let i = this.galleryTotalSlides - 3; i < this.galleryTotalSlides; i++) {
//             const clone = this.originalSlides[i].cloneNode(true);
//             fragmentStart.appendChild(clone);
//         }

//         // Append clones to track
//         this.galleryTrack.prepend(fragmentStart);
//         this.galleryTrack.appendChild(fragmentEnd);

//         // Setup image click events for all slides
//         this.gallerySetupImageClickEvents();
//     }

//     gallerySetupImageClickEvents() {
//         const slides = this.galleryTrack.querySelectorAll('.gallery-slide');
//         slides.forEach((slide, index) => {
//             const img = slide.querySelector('.gallery-image');
//             img.addEventListener('click', () => {
//                 // Calculate original image index
//                 const totalSlides = slides.length;
//                 // const originalIndex = (index + totalSlides -1) % this.galleryTotalSlides;
//                 const originalIndex = (index + totalSlides - 3) % totalSlides;
//                 console.log(originalIndex,totalSlides);
//                 this.openGalleryLightbox(originalIndex);
//             });
//         });
//     }

//     // galleryCreateDots() {
//     //     for (let i = 0; i < this.galleryTotalSlides; i++) {
//     //         const galleryDot = document.createElement('button');
//     //         galleryDot.className = 'gallery-dot';
//     //         galleryDot.addEventListener('click', () => this.galleryGoToSlide(i));
//     //         this.galleryDotsContainer.appendChild(galleryDot);
//     //     }
//     // }

//     galleryBindEvents() {
//         this.galleryPrevBtn.addEventListener('click', () => this.galleryPrevSlide());
//         this.galleryNextBtn.addEventListener('click', () => this.galleryNextSlide());

//         // Touch events for mobile
//         let galleryStartX = 0;
//         let galleryEndX = 0;

//         this.galleryTrack.addEventListener('touchstart', (e) => {
//             galleryStartX = e.touches[0].clientX;
//         },{passive:true});

//         this.galleryTrack.addEventListener('touchend', (e) => {
//             galleryEndX = e.changedTouches[0].clientX;
//             const galleryDiff = galleryStartX - galleryEndX;

//             if (Math.abs(galleryDiff) > 50) {
//                 if (galleryDiff > 0) {
//                     this.galleryNextSlide();
//                 } else {
//                     this.galleryPrevSlide();
//                 }
//             }
//         },{passive:true});

//         // Pause autoplay on hover
//         this.galleryTrack.addEventListener('mouseenter', () => this.galleryStopAutoPlay());
//         this.galleryTrack.addEventListener('mouseleave', () => this.galleryStartAutoPlay());

//         // Keyboard navigation
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'ArrowLeft') {
//                 this.galleryPrevSlide();
//             } else if (e.key === 'ArrowRight') {
//                 this.galleryNextSlide();
//             } else if (e.key === 'Escape' && this.galleryLightbox.classList.contains('active')) {
//                 this.closeGalleryLightbox();
//             }
//         });
//     }

//     galleryBindLightboxEvents() {
//         // Close lightbox events
//         this.galleryLightboxClose.addEventListener('click', () => this.closeGalleryLightbox());
//         this.galleryLightbox.addEventListener('click', (e) => {
//             if (e.target === this.galleryLightbox) {
//                 this.closeGalleryLightbox();
//             }
//         });

//         // Lightbox navigation
//         this.galleryLightboxPrev.addEventListener('click', () => this.galleryLightboxPrevImage());
//         this.galleryLightboxNext.addEventListener('click', () => this.galleryLightboxNextImage());
//     }

//     openGalleryLightbox(index) {
//         console.log(index);
//         this.galleryLightboxCurrentIndex = index;
//         this.galleryLightboxImage.src = this.galleryImages[index];
//         // this.galleryLightboxTitle.textContent = this.galleryTexts[index];
//         this.updateGalleryLightboxCounter();
//         this.galleryLightbox.classList.add('active');
//         this.galleryStopAutoPlay();
//         document.body.style.overflow = 'hidden';
//     }

//     closeGalleryLightbox() {
//         this.galleryLightbox.classList.remove('active');
//         this.galleryStartAutoPlay();
//         document.body.style.overflow = 'auto';
//     }

//     galleryLightboxPrevImage() {
//         this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;
//         this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex];
//         // this.galleryLightboxTitle.textContent = this.galleryTexts[this.galleryLightboxCurrentIndex];
//         this.updateGalleryLightboxCounter();
//     }

//     galleryLightboxNextImage() {
//         this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex + 1) % this.galleryTotalSlides;
//         this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex];
//         // this.galleryLightboxTitle.textContent = this.galleryTexts[this.galleryLightboxCurrentIndex];
//         this.updateGalleryLightboxCounter();
//     }

//     updateGalleryLightboxCounter() {
//         this.galleryLightboxCounter.textContent = `${this.galleryLightboxCurrentIndex + 1} / ${this.galleryTotalSlides}`;
//     }

//     galleryUpdateCarousel() {
//         const gallerySlides = this.galleryTrack.querySelectorAll('.gallery-slide');
//         // const galleryDots = this.galleryDotsContainer.querySelectorAll('.gallery-dot');

//         // Calculate which slide is in the center
//         const galleryIsMobile = window.innerWidth <= 576;
//         const galleryCenterIndex = galleryIsMobile ? 
//             this.galleryPosition + 1 : 
//             this.galleryPosition + 1;

//         // Update center slide highlighting
//         // gallerySlides.forEach((slide, index) => {
//         //     slide.classList.remove('gallery-center');
//         //     if (index === galleryCenterIndex) {
//         //         slide.classList.add('gallery-center');
//         //     }
//         // });

//         // Update active dot
//         // galleryDots.forEach((dot, index) => {
//         //     dot.classList.remove('gallery-active');
//         //     if (index === this.galleryCurrentIndex) {
//         //         dot.classList.add('gallery-active');
//         //     }
//         // });

//         // Move carousel
//         const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
//         const galleryTranslateX = -(this.galleryPosition * gallerySlideWidth);
//         this.galleryTrack.style.transform = `translateX(${galleryTranslateX}%)`;
//         console.log("middle");
//     }

//     galleryNextSlide() {
//         if (this.galleryIsTransitioning) return;
//         this.galleryIsTransitioning = true;

//         this.galleryPosition++;
//         this.galleryCurrentIndex = (this.galleryCurrentIndex + 1) % this.galleryTotalSlides;

//         this.galleryUpdateCarousel();

//         // Reset position for seamless infinite scroll
//         setTimeout(() => {
//             const totalSlides = this.galleryTrack.querySelectorAll('.gallery-slide').length;
//             if (this.galleryPosition >= totalSlides - 3) {
//                 this.galleryTrack.style.transition = 'none';
//                 this.galleryPosition = 3;

//                 const galleryIsMobile = window.innerWidth <= 576;
//                 const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
//                 this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * gallerySlideWidth}%)`;
//                 console.log("rresetting");
//                 // gallerySlides[index].classList.add("gallery-center");
//                 console.log("Adding");
//                 setTimeout(() => {
//                     this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//                     console.log(this.galleryTrack.style.transform);
//                 }, 50);
//             }
//             this.galleryIsTransitioning = false;
//         }, 600);
//     }

//     galleryPrevSlide() {
//         if (this.galleryIsTransitioning) return;
//         this.galleryIsTransitioning = true;

//         this.galleryPosition--;
//         this.galleryCurrentIndex = (this.galleryCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;

//         this.galleryUpdateCarousel();

//         // Reset position for seamless infinite scroll
//         setTimeout(() => {
//             if (this.galleryPosition <= 0) {
//                 this.galleryTrack.style.transition = 'none';
//                 const totalSlides = this.galleryTrack.querySelectorAll('.gallery-slide').length;
//                 this.galleryPosition = totalSlides - 6;
//                 const galleryIsMobile = window.innerWidth <= 576;
//                 const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
//                 this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * gallerySlideWidth}%)`;

//                 setTimeout(() => {
//                     this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//                 }, 50);
//             }
//             this.galleryIsTransitioning = false;
//         }, 600);
//     }

//     galleryGoToSlide(index) {
//         if (this.galleryIsTransitioning || index === this.galleryCurrentIndex) return;

//         this.galleryIsTransitioning = true;

//         // Calculate the difference
//         const diff = index - this.galleryCurrentIndex;
//         this.galleryPosition += diff;
//         this.galleryCurrentIndex = index;

//         this.galleryUpdateCarousel();

//         setTimeout(() => {
//             this.galleryIsTransitioning = false;
//         }, 600);
//     }

//     galleryStartAutoPlay() {
//         this.galleryStopAutoPlay();
//         this.galleryAutoPlayInterval = setInterval(() => {
//             this.galleryNextSlide();
//         }, 5000);
//     }

//     galleryStopAutoPlay() {
//         if (this.galleryAutoPlayInterval) {
//             clearInterval(this.galleryAutoPlayInterval);
//             this.galleryAutoPlayInterval = null;
//         }
//     }
// }

// // Initialize carousel when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new GalleryCarousel();
// });
class GalleryCarousel {
    constructor() {
        // Get the original slides
        this.originalSlides = Array.from(document.querySelectorAll('.gallery-slide'));
        this.galleryTotalSlides = this.originalSlides.length;

        // Store data for lightbox
        this.galleryImages = [];
        this.galleryTexts = [];

        // Extract data from original slides
        this.originalSlides.forEach(slide => {
            const img = slide.querySelector('.gallery-image');
            const text = slide.querySelector('.gallery-text-overlay');
            this.galleryImages.push(img.src);
            this.galleryTexts.push(text.textContent);

            // Add error handling for images
            img.onerror = () => {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT09IjMyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY3NzI4RCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
            };
        });

        // Setup carousel variables
        this.galleryCurrentIndex = 0;
        this.galleryTrack = document.getElementById('galleryTrack');
        // this.galleryDotsContainer = document.getElementById('galleryDots');
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
        // this.galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
        this.galleryLightboxCurrentIndex = 0;

        // Initialize the carousel
        this.galleryInit();
    }

    galleryInit() {
        // Clone slides for infinite effect
        this.galleryCloneSlides();

        // Create dots
        // this.galleryCreateDots();

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

            // Remove previous event listener to prevent duplicates
            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);

            // Add the new event listener
            newImg.addEventListener('click', () => {
                let originalIndex = index - 3;
                if (originalIndex < 0) {
                    originalIndex = this.galleryTotalSlides + originalIndex;
                } else if (originalIndex >= this.galleryTotalSlides) {
                    originalIndex = originalIndex - this.galleryTotalSlides;
                }
                this.openGalleryLightbox(originalIndex);
            });
        });
    }

    // galleryCreateDots() {
    //     for (let i = 0; i < this.galleryTotalSlides; i++) {
    //         const galleryDot = document.createElement('button');
    //         galleryDot.className = 'gallery-dot';
    //         galleryDot.addEventListener('click', () => this.galleryGoToSlide(i));
    //         this.galleryDotsContainer.appendChild(galleryDot);
    //     }
    // }

    galleryBindEvents() {
        this.galleryPrevBtn.addEventListener('click', () => this.galleryPrevSlide());
        this.galleryNextBtn.addEventListener('click', () => this.galleryNextSlide());

        // Touch events for mobile
        let galleryStartX = 0;
        let galleryEndX = 0;

        this.galleryTrack.addEventListener('touchstart', (e) => {
            galleryStartX = e.touches[0].clientX;
        }, {
            passive: true
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
        }, {
            passive: true
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
        console.log(index);
        this.galleryLightboxCurrentIndex = index;
        this.galleryLightboxImage.src = this.galleryImages[index];
        // this.galleryLightboxTitle.textContent = this.galleryTexts[index];
        this.updateGalleryLightboxCounter();
        this.galleryLightbox.classList.add('active');
        this.galleryStopAutoPlay();
        document.body.style.overflow = 'hidden';
    }

    closeGalleryLightbox() {
        this.galleryLightbox.classList.remove('active');
        this.galleryStartAutoPlay();
        document.body.style.overflow = 'auto';
    }

    galleryLightboxPrevImage() {
        this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex - 1 + this.galleryTotalSlides) % this.galleryTotalSlides;
        this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex];
        // this.galleryLightboxTitle.textContent = this.galleryTexts[this.galleryLightboxCurrentIndex];
        this.updateGalleryLightboxCounter();
    }

    galleryLightboxNextImage() {
        this.galleryLightboxCurrentIndex = (this.galleryLightboxCurrentIndex + 1) % this.galleryTotalSlides;
        this.galleryLightboxImage.src = this.galleryImages[this.galleryLightboxCurrentIndex];
        // this.galleryLightboxTitle.textContent = this.galleryTexts[this.galleryLightboxCurrentIndex];
        this.updateGalleryLightboxCounter();
    }

    updateGalleryLightboxCounter() {
        this.galleryLightboxCounter.textContent = `${this.galleryLightboxCurrentIndex + 1} / ${this.galleryTotalSlides}`;
    }

    galleryUpdateCarousel() {
        const gallerySlides = this.galleryTrack.querySelectorAll('.gallery-slide');
        // const galleryDots = this.galleryDotsContainer.querySelectorAll('.gallery-dot');

        // Calculate which slide is in the center
        const galleryIsMobile = window.innerWidth <= 576;
        const galleryCenterIndex = galleryIsMobile ?
            this.galleryPosition + 1 :
            this.galleryPosition + 1;

        // Update center slide highlighting
        // gallerySlides.forEach((slide, index) => {
        //     slide.classList.remove('gallery-center');
        //     if (index === galleryCenterIndex) {
        //         slide.classList.add('gallery-center');
        //     }
        // });

        // Update active dot
        // galleryDots.forEach((dot, index) => {
        //     dot.classList.remove('gallery-active');
        //     if (index === this.galleryCurrentIndex) {
        //         dot.classList.add('gallery-active');
        //     }
        // });

        // Move carousel
        const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
        const galleryTranslateX = -(this.galleryPosition * gallerySlideWidth);
        this.galleryTrack.style.transform = `translateX(${galleryTranslateX}%)`;
        console.log("middle");
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
                const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
                this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * gallerySlideWidth}%)`;
                console.log("rresetting");
                // gallerySlides[index].classList.add("gallery-center");
                console.log("Adding");
                setTimeout(() => {
                    this.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    console.log(this.galleryTrack.style.transform);
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
                const gallerySlideWidth = galleryIsMobile ? 100 : 33.333;
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

//faqs JS
// document.querySelectorAll(".faqs-question").forEach((element,index)=>{
//     element.addEventListener("click",(e)=>{
//         e.preventDefault();
//         document.querySelectorAll(".faqs-arrow")[index].classList.toggle("faqs-arrow-active");
//         document.querySelectorAll(".faqs-answerContainer")[index].classList.toggle("faqs-answer-active");
//         document.querySelectorAll(".faqs-questionContainer")[index].classList.toggle("faqs-question-active");
//     });
// });

//highlight section JS


class CarouselManager {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.carouselId = carouselElement.dataset.carousel;
        this.images = carouselElement.querySelectorAll('.overviewCarouselImage');
        // this.thumbnails = carouselElement.querySelectorAll('.overviewThumbnail');
        this.currentImageIndex = 0;
        this.autoSlideInterval = null;
        this.restartTimeout = null;

        this.init();
    }

    init() {
        // this.addThumbnailEventListeners();
        this.addHoverEventListeners();
        this.startAutoSlide();
    }

    showImage(index) {
        // Remove active class from all images and thumbnails in this carousel
        this.images.forEach(img => img.classList.remove('active'));
        // this.thumbnails.forEach(thumb => thumb.classList.remove('active'));

        // Add active class to current image and thumbnail
        this.images[index].classList.add('active');
        // this.thumbnails[index].classList.add('active');

        this.currentImageIndex = index;
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.showImage(this.currentImageIndex);
    }

    startAutoSlide() {
        // Clear any existing interval before starting a new one
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        this.autoSlideInterval = setInterval(() => {
            this.nextImage();
        }, 4000); // Change image every 4 seconds
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
        // Also clear any pending restart timeout
        if (this.restartTimeout) {
            clearTimeout(this.restartTimeout);
            this.restartTimeout = null;
        }
    }

    // addThumbnailEventListeners() {
    //     this.thumbnails.forEach((thumbnail, index) => {
    //         thumbnail.addEventListener('click', () => {
    //             this.showImage(index);
    //             this.stopAutoSlide();

    //             // Clear any existing restart timeout before setting a new one
    //             if (this.restartTimeout) {
    //                 clearTimeout(this.restartTimeout);
    //             }

    //             // Restart auto-slide after 8 seconds of manual interaction
    //             this.restartTimeout = setTimeout(() => {
    //                 this.startAutoSlide();
    //                 this.restartTimeout = null;
    //             }, 8000);
    //         });
    //     });
    // }

    addHoverEventListeners() {
        // Pause auto-slide when hovering over this carousel
        this.carousel.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });

        this.carousel.addEventListener('mouseleave', () => {
            // Only restart if there's no pending restart timeout from thumbnail click
            if (!this.restartTimeout) {
                this.startAutoSlide();
            }
        });
    }
}

// Initialize all carousels when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => {
        new CarouselManager(carousel);
    });
});




let currentSlideIndex = 0;
const slides = document.querySelectorAll('.floorPlanCard');
const totalSlides = slides.length;
const slidesContainer = document.getElementById('floorPlanSlides');
const indicators = document.querySelectorAll('.floorPlanDot');

// Calculate slides to show based on screen size
function getSlidesToShow() {
    // if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 1;
    return 3;
}

function updateSlidePosition() {
    const slidesToShow = getSlidesToShow();
    const slideWidth = (slidesToShow === 3) ? 30 : 100;
    const translateX = -(currentSlideIndex * slideWidth);
    slidesContainer.style.transform = `translateX(${translateX}%)`;

    if (window.innerWidth > 768) {
        slidesContainer.style.transform = "none";
    }

    // Update slide widths
    slides.forEach(slide => {
        console.log(slideWidth);
        slide.style.minWidth = `${slideWidth}%`;
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlideIndex);
    });
}

function changeSlide(direction) {
    const maxIndex = totalSlides - getSlidesToShow();

    if (direction === 1) {
        currentSlideIndex = currentSlideIndex >= Math.floor(maxIndex) ? 0 : currentSlideIndex + 1;
    } else {
        currentSlideIndex = currentSlideIndex <= 0 ? Math.floor(maxIndex) : currentSlideIndex - 1;
    }

    updateSlidePosition();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    updateSlidePosition();
}

function viewPlan(planNumber) {
    alert(`Opening Plan ${planNumber} in full view...`);
    // Here you would implement modal or new page functionality
}

// function downloadBrochure() {
//     alert('Downloading complete brochure...');
//     // Here you would implement download functionality
// }

// Handle window resize
window.addEventListener('resize', () => {
    updateSlidePosition();
});

// Touch/Swipe support for mobile
let startX = 0;
let isDragging = false;

slidesContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slidesContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

slidesContainer.addEventListener('touchend', (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }

    isDragging = false;
});

// Initialize
updateSlidePosition();

// Auto-play (optional - uncomment to enable)
/*
setInterval(() => {
    changeSlide(1);
}, 5000);
*/




/* Widget */
// function repositionWidget() { let t = document.querySelector("#launcher"); if (t) { t.style.setProperty("bottom", "50px", "important"), t.style.setProperty("left", "5px", "important"), t.style.setProperty("right", "auto", "important"), t.style.setProperty("transform", "none", "important"); let e = document.querySelector("iframe[title*='Chat']"); e && e.parentElement && (e.parentElement.style.setProperty("bottom", "50px", "important"), e.parentElement.style.setProperty("left", "5px", "important"), e.parentElement.style.setProperty("right", "auto", "important")) } } function forceRepositioning() { ["#launcher", "[data-testid='launcher']", ".zEWidget-launcher", "iframe[title*='Chat']"].forEach((t => { let e = document.querySelector(t); if (e) { let t = e.parentElement || e; t.style.setProperty("bottom", "50px", "important"), t.style.setProperty("left", "5px", "important"), t.style.setProperty("right", "auto", "important"), t.style.setProperty("transform", "none", "important") } })) } function loadZeSnippet() { setTimeout((function () { var t = document.createElement("script"); t.id = "ze-snippet", t.src = "https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc", document.head.appendChild(t), t.onload = function () { var t = setInterval((function () { if ("undefined" != typeof zE && document.querySelector("#launcher") && (clearInterval(t), repositionWidget(), zE("webWidget:on", "open", (function () { setTimeout(repositionWidget, 100) })), zE("webWidget:on", "close", (function () { setTimeout(repositionWidget, 100), setTimeout(forceRepositioning, 500) })), zE("webWidget:on", "minimize", (function () { setTimeout(repositionWidget, 100), setTimeout(forceRepositioning, 500) })), zE("webWidget:on", "maximize", (function () { setTimeout(repositionWidget, 100) })), zE("webWidget:on", "launcherClick", (function () { setTimeout(repositionWidget, 100) })), setInterval(forceRepositioning, 2e3), window.MutationObserver)) { const t = new MutationObserver((function (t) { t.forEach((function (t) { "attributes" !== t.type || "style" !== t.attributeName && "class" !== t.attributeName || setTimeout(repositionWidget, 50) })) })); setTimeout((function () { let e = document.querySelector("#launcher"); e && (t.observe(e, { attributes: !0, subtree: !0 }), e.parentElement && t.observe(e.parentElement, { attributes: !0, subtree: !0 })) }), 1e3) } }), 100) } }), 4e3) } function toggleTab(t) { document.querySelectorAll('.tab input[type="checkbox"]').forEach((function (e) { e.id !== t && (e.checked = !1) })) } function addPersistentCSS() { const t = document.createElement("style"); t.textContent = "\n        #launcher,\n        [data-testid='launcher'],\n        .zEWidget-launcher {\n            bottom: 50px !important;\n            left: 5px !important;\n            right: auto !important;\n            transform: none !important;\n        }\n        \n        /* Target the iframe container as well */\n        iframe[title*=\"Chat\"] {\n            position: fixed !important;\n            bottom: 50px !important;\n            left: 5px !important;\n            right: auto !important;\n        }\n    ", document.head.appendChild(t) } addPersistentCSS(), loadZeSnippet()