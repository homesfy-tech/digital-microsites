document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelector(".headerMenuButton"),
        t = document.querySelector(".mobileMenu"),
        i = document.querySelector(".mobileMenuClose"),
        s = document.querySelectorAll(".mobileMenuLink");
    e.addEventListener("click", () => {
        t.classList.add("active");
    }),
        i.addEventListener("click", () => {
            t.classList.remove("active");
        }),
        s.forEach((e) => {
            e.addEventListener("click", () => {
                t.classList.remove("active");
            });
        }),
        window.addEventListener("scroll", () => {
            let e = document.querySelector(".mainHeader");
            window.scrollY > 50
                ? (e.style.background = "rgba(0, 0, 0, 0.8)")
                : (e.style.background = "rgba(0, 0, 0, 0.3)");
        });
}),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.querySelector(".bannerSlidesContainer"),
            t = document.querySelectorAll(".bannerCarouselSlide"),
            i = document.querySelector(".bannerPrevButton"),
            s = document.querySelector(".bannerNextButton"),
            n = document.querySelectorAll(".bannerIndicator"),
            l = 0,
            a = t.length,
            r;
        function o() {
            (e.style.transform = `translateX(-${100 * l}%)`),
                n.forEach((e, t) => {
                    e.classList.toggle("active", t === l);
                });
        }
        function h() {
            (l = (l + 1) % a), o();
        }
        function d() {
            g(), (r = setInterval(h, 5e3));
        }
        function g() {
            clearInterval(r);
        }
        o(),
            i.addEventListener("click", function e() {
                (l = (l - 1 + a) % a), o();
            }),
            s.addEventListener("click", h),
            n.forEach((e, t) => {
                e.addEventListener("click", function () {
                    var e;
                    (l = e = t), o();
                });
            }),
            d(),
            e.addEventListener("mouseenter", g),
            e.addEventListener("mouseleave", d);
    }),
    document.querySelectorAll(".readMoreLink").forEach((e, t) => {
        let i = document.querySelectorAll(".clampText")[t],
            s = !1;
        e.addEventListener("click", (e1) => {
            e1.preventDefault();
            (s = !s), (i.style.webkitLineClamp = s ? "unset" : "6"), (e.textContent = s ? " Read Less" : " Read More");
        });
    }),
    // document.addEventListener("DOMContentLoaded", function () {
    //     let e = document.querySelector(".newGallerySlideWrapper"),
    //         t = document.querySelectorAll(".newGalleryDesktopSlide"),
    //         i = document.querySelector(".newGalleryPrev"),
    //         s = document.querySelector(".newGalleryNext"),
    //         n = 1,
    //         l = t.length - 1,
    //         a,
    //         r;
    //     function o() {
    //         (r = h()), (e.style.transition = "none"), (e.style.transform = `translateX(-${r * n}%)`);
    //     }
    //     function h() {
    //         return window.innerWidth <= 768 ? 100 : 33.333;
    //     }
    //     function d(t) {
    //         (n = t < 1 ? l : t > l ? 1 : t),
    //             (r = h()),
    //             (e.style.transition = "transform 0.5s ease"),
    //             (e.style.transform = `translateX(-${n * r}%)`),
    //             e.addEventListener("transitionend", function t() {
    //                 e.removeEventListener("transitionend", t),
    //                     (0 === n || n === l + 1) &&
    //                         ((e.style.transition = "none"),
    //                         (n = 0 === n ? l : 1),
    //                         (e.style.transform = `translateX(-${n * r}%)`));
    //             });
    //     }
    //     function g() {
    //         a = setInterval(() => {
    //             d(n + 1);
    //         }, 5e3);
    //     }
    //     function c() {
    //         clearInterval(a), g();
    //     }
    //     i.addEventListener("click", (e) => {
    //         e.stopPropagation(), d(n - 1), c();
    //     }),
    //         s.addEventListener("click", (e) => {
    //             e.stopPropagation(), d(n + 1), c();
    //         }),
    //         o(),
    //         g(),
    //         window.addEventListener("resize", function e() {
    //             o(), d(n);
    //         });
    //     let y = document.querySelectorAll(".newGalleryImage"),
    //         m = document.querySelector(".newGalleryLightbox"),
    //         u = document.querySelector(".newGalleryLightboxImage"),
    //         L = document.querySelector(".newGalleryLightboxTitle"),
    //         I = document.querySelector(".newGalleryLightboxClose"),
    //         x = document.querySelector(".newGalleryLightboxPrev"),
    //         v = document.querySelector(".newGalleryLightboxNext"),
    //         S = 0,
    //         $ = [],
    //         b = [];
    //     function C() {
    //         m.classList.remove("active"), (document.body.style.overflow = ""), g();
    //     }
    //     function E() {
    //         (u.src = $[S]), (L.textContent = b[S]);
    //     }
    //     function A(e) {
    //         (S += e) < 0 ? (S = $.length - 1) : S >= $.length && (S = 0), E();
    //     }
    //     y.forEach((e, t) => {
    //         let i = e.querySelector("img"),
    //             s = e.querySelector(".newGalleryImageTitle").textContent;
    //         e.closest("#newGalleryFirstClone") ||
    //             e.closest("#newGalleryLastClone") ||
    //             ($.push(i.src),
    //             b.push(s),
    //             e.addEventListener("click", (e) => {
    //                 var i;
    //                 e.target.closest(".newGalleryNavButton") ||
    //                     ((S = i = t - 1) < 0 && (S = 0),
    //                     S >= $.length && (S = $.length - 1),
    //                     E(),
    //                     m.classList.add("active"),
    //                     (document.body.style.overflow = "hidden"),
    //                     clearInterval(a));
    //             }));
    //     }),
    //         I.addEventListener("click", C),
    //         x.addEventListener("click", () => A(-1)),
    //         v.addEventListener("click", () => A(1)),
    //         m.addEventListener("click", (e) => {
    //             e.target === m && C();
    //         }),
    //         document.addEventListener("keydown", (e) => {
    //             m.classList.contains("active") &&
    //                 ("Escape" === e.key ? C() : "ArrowLeft" === e.key ? A(-1) : "ArrowRight" === e.key && A(1));
    //         });
    // }),
    // document.addEventListener("DOMContentLoaded", function () {
    //     let e = document.querySelector(".newAmenitiesSlideWrapper"),
    //         t = document.querySelectorAll(".newAmenitiesDesktopSlide"),
    //         i = document.querySelector(".newAmenitiesPrev"),
    //         s = document.querySelector(".newAmenitiesNext"),
    //         n = 0,
    //         l = t.length - 1,
    //         a,
    //         r;
    //     function o() {
    //         (r = h()), (e.style.transition = "none"), (e.style.transform = `translateX(-${r * n}%)`);
    //     }
    //     function h() {
    //         return window.innerWidth <= 768 ? 100 : 33.333;
    //     }
    //     function d(t) {
    //         (n = t < 0 ? l : t > l ? 1 : t),
    //             (r = h()),
    //             (e.style.transition = "transform 0.5s ease"),
    //             (e.style.transform = `translateX(-${n * r}%)`),
    //             e.addEventListener("transitionend", function t() {
    //                 e.removeEventListener("transitionend", t),
    //                     (0 === n || n === l + 1) &&
    //                         ((e.style.transition = "none"),
    //                         (n = 0 === n ? l : 1),
    //                         (e.style.transform = `translateX(-${n * r}%)`));
    //             });
    //     }
    //     function g() {
    //         a = setInterval(() => {
    //             d(n + 1);
    //         }, 5e3);
    //     }
    //     function c() {
    //         clearInterval(a), g();
    //     }
    //     i.addEventListener("click", () => {
    //         d(n - 1), c();
    //     }),
    //         s.addEventListener("click", () => {
    //             d(n + 1), c();
    //         }),
    //         o(),
    //         g(),
    //         window.addEventListener("resize", function e() {
    //             o(), d(n);
    //         });
    //     let y = document.querySelectorAll(".newAmenitiesImage"),
    //         m = document.querySelector(".newAmenitiesLightbox"),
    //         u = document.querySelector(".newAmenitiesLightboxImage"),
    //         L = document.querySelector(".newAmenitiesLightboxTitle"),
    //         I = document.querySelector(".newAmenitiesLightboxClose"),
    //         x = document.querySelector(".newAmenitiesLightboxPrev"),
    //         v = document.querySelector(".newAmenitiesLightboxNext"),
    //         S = 0,
    //         $ = [],
    //         b = [];
    //     function C() {
    //         m.classList.remove("active"), (document.body.style.overflow = ""), g();
    //     }
    //     function E() {
    //         (u.src = $[S]), (L.textContent = b[S]);
    //     }
    //     function A(e) {
    //         (S += e) < 0 ? (S = $.length - 1) : S >= $.length && (S = 0), E();
    //     }
    //     y.forEach((e, t) => {
    //         let i = e.querySelector("img"),
    //             s = e.querySelector(".newAmenitiesImageTitle").textContent;
    //         e.closest("#newAmenitiesFirstClone") ||
    //             ($.push(i.src),
    //             b.push(s),
    //             e.addEventListener("click", () => {
    //                 var e;
    //                 (S = e = t - 1) < 0 && (S = 0),
    //                     S >= $.length && (S = $.length - 1),
    //                     E(),
    //                     m.classList.add("active"),
    //                     (document.body.style.overflow = "hidden"),
    //                     clearInterval(a);
    //             }));
    //     }),
    //         I.addEventListener("click", C),
    //         x.addEventListener("click", () => A(-1)),
    //         v.addEventListener("click", () => A(1)),
    //         m.addEventListener("click", (e) => {
    //             e.target === m && C();
    //         }),
    //         document.addEventListener("keydown", (e) => {
    //             m.classList.contains("active") &&
    //                 ("Escape" === e.key ? C() : "ArrowLeft" === e.key ? A(-1) : "ArrowRight" === e.key && A(1));
    //         });
    // }),
    // document.addEventListener("DOMContentLoaded", function () {
    //     let e = document.querySelector(".carousel"),
    //         t = document.querySelector(".carousel-inner"),
    //         i = document.querySelectorAll(".carousel-item"),
    //         s = document.querySelector(".carousel-control.prev"),
    //         n = document.querySelector(".carousel-control.next"),
    //         l = document.querySelectorAll(".carousel-indicator"),
    //         a = 0,
    //         r = i.length;
    //     function o() {
    //         return window.innerWidth > 768 ? 3 : 1;
    //     }
    //     function h() {
    //         return Math.ceil(r / o());
    //     }
    //     function d() {
    //         let e = o();
    //         (t.style.transform = `translateX(-${a * (100 / e)}%)`),
    //             l.forEach((t, i) => {
    //                 i < h()
    //                     ? ((t.style.display = "block"), t.classList.toggle("active", i === Math.floor(a / e)))
    //                     : (t.style.display = "none");
    //             });
    //     }
    //     function g() {
    //         return setInterval(function () {
    //             let e = o();
    //             a < r - e ? (a += e) : (a = 0), d();
    //         }, 3e3);
    //     }
    //     let c;
    //     s.addEventListener("click", function () {
    //         (a = Math.max(0, a - o())), d();
    //     }),
    //         n.addEventListener("click", function () {
    //             let e = o();
    //             (a = Math.min(r - e, a + e)), d();
    //         }),
    //         l.forEach((e, t) => {
    //             e.addEventListener("click", function () {
    //                 (a = t * o()), d();
    //             });
    //         }),
    //         window.addEventListener("resize", d),
    //         (c = h()),
    //         l.forEach((e, t) => {
    //             e.style.display = t < c ? "block" : "none";
    //         }),
    //         d();
    //     let y = g();
    //     e.addEventListener("mouseenter", function () {
    //         clearInterval(y);
    //     }),
    //         e.addEventListener("mouseleave", function () {
    //             clearInterval(y), (y = g());
    //         });
    //     let m = 0,
    //         u = 0;
    //     e.addEventListener(
    //         "touchstart",
    //         function (e) {
    //             (m = e.changedTouches[0].screenX), clearInterval(y);
    //         },
    //         { passive: !0 }
    //     ),
    //         e.addEventListener(
    //             "touchend",
    //             function (e) {
    //                 (u = e.changedTouches[0].screenX),
    //                     (function () {
    //                         if (u < m - 50) {
    //                             let e = o();
    //                             (a = Math.min(r - e, a + e)), d();
    //                         }
    //                         u > m + 50 && ((a = Math.max(0, a - o())), d());
    //                     })(),
    //                     (y = g());
    //             },
    //             { passive: !0 }
    //         );
    // }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("modalFormContainer"),
            t = document.getElementById("modalFormOverlay"),
            i = document.getElementById("modalFormCloseBtn"),
            s = document.querySelector(".modalFormTitle");
        if (!(e && t && i && s)) return void console.warn("Modal elements not found!");
        function n(i) {
            e.classList.add("active"), t.classList.add("active"), (s.textContent = i || "Enquire Now");
            // showClosePopup();
        }
        function l() {
            e.classList.remove("active"), t.classList.remove("active");
            // t.removeEventListener("click", l);
            // i.style.display = "none";
        }
        // function showClosePopup() {
        //     setTimeout(()=>{
        //         i.style.display = "block";
        //         t.addEventListener("click", l);
        //     },4000)
        // }
        setTimeout(() => {
            n("Enquire Now");
            // showClosePopup();
        }, 4e3),
            i.addEventListener("click", l),
            t.addEventListener("click", l),
            [
                { selector: ".overviewRequestBrochureButton", title: "Request Brochure" },
                { selector: ".overviewRegisterButton", title: "Register Now" },
                { selector: ".get-details", title: "Get Price Details" },
                { selector: ".floorPlanButtons", title: "View Plan" },
                { selector: ".floorPlanCta", title: "Download Amenities" },
                { selector: ".floordownload", title: "Download Floor Plan" },
                { selector: ".gallery-cta", title: "Download Gallery" },
                { selector: ".map-cta", title: "Request Location Details" },
                { selector: ".tour-cta", title: "Request Virtual Tour" },
            ].forEach(({ selector: e, title: t }) => {
                document.querySelectorAll(e).forEach((e) => {
                    e.addEventListener("click", function (e) {
                        e.preventDefault(), n(t);
                    });
                });
            });
    });
class AmenitiesCarousel {
    constructor() {
        (this.originalSlides = Array.from(document.querySelectorAll(".amenities-slide"))),
            (this.amenitiesTotalSlides = this.originalSlides.length),
            (this.amenitiesImages = []),
            (this.amenitiesTexts = []),
            this.originalSlides.forEach((e) => {
                let t = e.querySelector(".amenities-image"),
                    i = e.querySelector(".amenities-text-overlay");
                this.amenitiesImages.push(t.src),
                    this.amenitiesTexts.push(i.textContent),
                    (t.onerror = () => {
                        t.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+";
                    });
            }),
            (this.amenitiesCurrentIndex = 0),
            (this.amenitiesTrack = document.getElementById("amenitiesTrack")),
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
            this.amenitiesInit();
    }
    amenitiesInit() {
        this.amenitiesCloneSlides(),
            this.amenitiesBindEvents(),
            this.amenitiesBindLightboxEvents(),
            this.amenitiesUpdateCarousel(),
            this.amenitiesStartAutoPlay();
    }
    amenitiesCloneSlides() {
        let e = document.createDocumentFragment(),
            t = document.createDocumentFragment();
        for (let i = 0; i < 3; i++) {
            let s = this.originalSlides[i].cloneNode(!0);
            t.appendChild(s);
        }
        for (let n = this.amenitiesTotalSlides - 3; n < this.amenitiesTotalSlides; n++) {
            let l = this.originalSlides[n].cloneNode(!0);
            e.appendChild(l);
        }
        this.amenitiesTrack.prepend(e), this.amenitiesTrack.appendChild(t), this.amenitiesSetupImageClickEvents();
    }
    amenitiesSetupImageClickEvents() {
        let e = this.amenitiesTrack.querySelectorAll(".amenities-slide");
        e.forEach((e, t) => {
            let i = e.querySelector(".amenities-image"),
                s = i.cloneNode(!0);
            i.parentNode.replaceChild(s, i),
                s.addEventListener("click", () => {
                    let e = t - 3;
                    e < 0
                        ? (e = this.amenitiesTotalSlides + e)
                        : e >= this.amenitiesTotalSlides && (e -= this.amenitiesTotalSlides),
                        this.openAmenitiesLightbox(e);
                });
        });
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
                    t = i.changedTouches[0].clientX;
                    let s = e - t;
                    Math.abs(s) > 50 && (s > 0 ? this.amenitiesNextSlide() : this.amenitiesPrevSlide());
                },
                { passive: !0 }
            ),
            this.amenitiesTrack.addEventListener("mouseenter", () => this.amenitiesStopAutoPlay()),
            this.amenitiesTrack.addEventListener("mouseleave", () => this.amenitiesStartAutoPlay()),
            document.addEventListener("keydown", (e) => {
                "ArrowLeft" === e.key
                    ? this.amenitiesPrevSlide()
                    : "ArrowRight" === e.key
                      ? this.amenitiesNextSlide()
                      : "Escape" === e.key &&
                        this.amenitiesLightbox.classList.contains("active") &&
                        this.closeAmenitiesLightbox();
            });
    }
    amenitiesBindLightboxEvents() {
        this.amenitiesLightboxClose.addEventListener("click", () => this.closeAmenitiesLightbox()),
            this.amenitiesLightbox.addEventListener("click", (e) => {
                e.target === this.amenitiesLightbox && this.closeAmenitiesLightbox();
            }),
            this.amenitiesLightboxPrev.addEventListener("click", () => this.amenitiesLightboxPrevImage()),
            this.amenitiesLightboxNext.addEventListener("click", () => this.amenitiesLightboxNextImage());
    }
    openAmenitiesLightbox(e) {
        console.log(e),
            (this.amenitiesLightboxCurrentIndex = e),
            (this.amenitiesLightboxImage.src = this.amenitiesImages[e]),
            (this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[e]),
            this.updateAmenitiesLightboxCounter(),
            this.amenitiesLightbox.classList.add("active"),
            this.amenitiesStopAutoPlay(),
            (document.body.style.overflow = "hidden");
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
        this.amenitiesTrack.querySelectorAll(".amenities-slide");
        let e = window.innerWidth <= 576;
        this.amenitiesPosition;
        let t = -(this.amenitiesPosition * (e ? 100 : 33.333));
        this.amenitiesTrack.style.transform = `translateX(${t}%)`;
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
                    let t = window.innerWidth <= 576;
                    (this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * (t ? 100 : 33.333)}%)`),
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition =
                                "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                        }, 50);
                }
                this.amenitiesIsTransitioning = !1;
            }, 600));
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
                    let t = window.innerWidth <= 576;
                    (this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * (t ? 100 : 33.333)}%)`),
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition =
                                "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                        }, 50);
                }
                this.amenitiesIsTransitioning = !1;
            }, 600));
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
            }, 600);
    }
    amenitiesStartAutoPlay() {
        this.amenitiesStopAutoPlay(),
            (this.amenitiesAutoPlayInterval = setInterval(() => {
                this.amenitiesNextSlide();
            }, 5e3));
    }
    amenitiesStopAutoPlay() {
        this.amenitiesAutoPlayInterval &&
            (clearInterval(this.amenitiesAutoPlayInterval), (this.amenitiesAutoPlayInterval = null));
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new AmenitiesCarousel();
});
class GalleryCarousel {
    constructor() {
        (this.originalSlides = Array.from(document.querySelectorAll(".gallery-slide"))),
            (this.galleryTotalSlides = this.originalSlides.length),
            (this.galleryImages = []),
            (this.galleryTexts = []),
            this.originalSlides.forEach((e) => {
                let t = e.querySelector(".gallery-image"),
                    i = e.querySelector(".gallery-text-overlay");
                this.galleryImages.push(t.src),
                    this.galleryTexts.push(i.textContent),
                    (t.onerror = () => {
                        t.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT09IjMyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY3NzI4RCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPg==";
                    });
            }),
            (this.galleryCurrentIndex = 0),
            (this.galleryTrack = document.getElementById("galleryTrack")),
            (this.galleryPrevBtn = document.getElementById("galleryPrev")),
            (this.galleryNextBtn = document.getElementById("galleryNext")),
            (this.galleryAutoPlayInterval = null),
            (this.galleryIsTransitioning = !1),
            (this.galleryPosition = this.galleryTotalSlides),
            (this.galleryLightbox = document.getElementById("galleryLightbox")),
            (this.galleryLightboxImage = document.getElementById("galleryLightboxImage")),
            (this.galleryLightboxClose = document.getElementById("galleryLightboxClose")),
            (this.galleryLightboxPrev = document.getElementById("galleryLightboxPrev")),
            (this.galleryLightboxNext = document.getElementById("galleryLightboxNext")),
            (this.galleryLightboxCounter = document.getElementById("galleryLightboxCounter")),
            (this.galleryLightboxCurrentIndex = 0),
            this.galleryInit();
    }
    galleryInit() {
        this.galleryCloneSlides(),
            this.galleryBindEvents(),
            this.galleryBindLightboxEvents(),
            this.galleryUpdateCarousel(),
            this.galleryStartAutoPlay();
    }
    galleryCloneSlides() {
        let e = document.createDocumentFragment(),
            t = document.createDocumentFragment();
        for (let i = 0; i < 3; i++) {
            let s = this.originalSlides[i].cloneNode(!0);
            t.appendChild(s);
        }
        for (let n = this.galleryTotalSlides - 3; n < this.galleryTotalSlides; n++) {
            let l = this.originalSlides[n].cloneNode(!0);
            e.appendChild(l);
        }
        this.galleryTrack.prepend(e), this.galleryTrack.appendChild(t); 
        // this.gallerySetupImageClickEvents();
    }
    // gallerySetupImageClickEvents() {
    //     let e = this.galleryTrack.querySelectorAll(".gallery-slide");
    //     e.forEach((e, t) => {
    //         let i = e.querySelector(".gallery-image"),
    //             s = i.cloneNode(!0);
    //         i.parentNode.replaceChild(s, i),
    //             s.addEventListener("click", () => {
    //                 let e = t - 3;
    //                 e < 0
    //                     ? (e = this.galleryTotalSlides + e)
    //                     : e >= this.galleryTotalSlides && (e -= this.galleryTotalSlides),
    //                     this.openGalleryLightbox(e);
    //             });
    //     });
    // }
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
                    t = i.changedTouches[0].clientX;
                    let s = e - t;
                    Math.abs(s) > 50 && (s > 0 ? this.galleryNextSlide() : this.galleryPrevSlide());
                },
                { passive: !0 }
            ),
            this.galleryTrack.addEventListener("mouseenter", () => this.galleryStopAutoPlay()),
            this.galleryTrack.addEventListener("mouseleave", () => this.galleryStartAutoPlay()),
            document.addEventListener("keydown", (e) => {
                "ArrowLeft" === e.key
                    ? this.galleryPrevSlide()
                    : "ArrowRight" === e.key
                      ? this.galleryNextSlide()
                      : "Escape" === e.key &&
                        this.galleryLightbox.classList.contains("active") &&
                        this.closeGalleryLightbox();
            });
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
        console.log(e),
            (this.galleryLightboxCurrentIndex = e),
            (this.galleryLightboxImage.src = this.galleryImages[e]),
            this.updateGalleryLightboxCounter(),
            this.galleryLightbox.classList.add("active"),
            this.galleryStopAutoPlay(),
            (document.body.style.overflow = "hidden");
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
        this.galleryTrack.querySelectorAll(".gallery-slide");
        let e = window.innerWidth <= 576;
        this.galleryPosition;
        let t = -(this.galleryPosition * (e ? 100 : 33.333));
        (this.galleryTrack.style.transform = `translateX(${t}%)`), console.log("middle");
    }
    galleryNextSlide() {
        this.galleryIsTransitioning ||
            ((this.galleryIsTransitioning = !0),
            this.galleryPosition++,
            (this.galleryCurrentIndex = (this.galleryCurrentIndex + 1) % this.galleryTotalSlides),
            this.galleryUpdateCarousel(),
            setTimeout(() => {
                let e = this.galleryTrack.querySelectorAll(".gallery-slide").length;
                if (this.galleryPosition >= e - 3) {
                    (this.galleryTrack.style.transition = "none"), (this.galleryPosition = 3);
                    let t = window.innerWidth <= 576;
                    (this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * (t ? 100 : 33.333)}%)`),
                        console.log("rresetting"),
                        console.log("Adding"),
                        setTimeout(() => {
                            (this.galleryTrack.style.transition =
                                "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"),
                                console.log(this.galleryTrack.style.transform);
                        }, 50);
                }
                this.galleryIsTransitioning = !1;
            }, 600));
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
                    let e = this.galleryTrack.querySelectorAll(".gallery-slide").length;
                    this.galleryPosition = e - 6;
                    let t = window.innerWidth <= 576;
                    (this.galleryTrack.style.transform = `translateX(-${this.galleryPosition * (t ? 100 : 33.333)}%)`),
                        setTimeout(() => {
                            this.galleryTrack.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                        }, 50);
                }
                this.galleryIsTransitioning = !1;
            }, 600));
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
            }, 600);
    }
    galleryStartAutoPlay() {
        this.galleryStopAutoPlay(),
            (this.galleryAutoPlayInterval = setInterval(() => {
                this.galleryNextSlide();
            }, 5e3));
    }
    galleryStopAutoPlay() {
        this.galleryAutoPlayInterval &&
            (clearInterval(this.galleryAutoPlayInterval), (this.galleryAutoPlayInterval = null));
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new GalleryCarousel();
});
// class CarouselManager {
//     constructor(e) {
//         (this.carousel = e),
//             (this.carouselId = e.dataset.carousel),
//             (this.images = e.querySelectorAll(".overviewCarouselImage")),
//             (this.currentImageIndex = 0),
//             (this.autoSlideInterval = null),
//             (this.restartTimeout = null),
//             this.init();
//     }
//     init() {
//         this.addHoverEventListeners(), this.startAutoSlide();
//     }
//     showImage(e) {
//         this.images.forEach((e) => e.classList.remove("active")),
//             this.images[e].classList.add("active"),
//             (this.currentImageIndex = e);
//     }
//     nextImage() {
//         (this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length),
//             this.showImage(this.currentImageIndex);
//     }
//     startAutoSlide() {
//         this.autoSlideInterval && clearInterval(this.autoSlideInterval),
//             (this.autoSlideInterval = setInterval(() => {
//                 this.nextImage();
//             }, 4e3));
//     }
//     stopAutoSlide() {
//         this.autoSlideInterval && (clearInterval(this.autoSlideInterval), (this.autoSlideInterval = null)),
//             this.restartTimeout && (clearTimeout(this.restartTimeout), (this.restartTimeout = null));
//     }
//     addHoverEventListeners() {
//         this.carousel.addEventListener("mouseenter", () => {
//             this.stopAutoSlide();
//         }),
//             this.carousel.addEventListener("mouseleave", () => {
//                 this.restartTimeout || this.startAutoSlide();
//             });
//     }
// }
// document.addEventListener("DOMContentLoaded", () => {
//     let e = document.querySelectorAll("[data-carousel]");
//     e.forEach((e) => {
//         new CarouselManager(e);
//     });
// });
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".floorPlanCard"),
    totalSlides = slides.length,
    slidesContainer = document.getElementById("floorPlanSlides"),
    indicators = document.querySelectorAll(".floorPlanDot");
function getSlidesToShow() {
    return window.innerWidth <= 768 ? 1 : 3;
}

// function repositionWidget() {
//     let t = document.querySelector("#launcher");
//     if (t) {
//         t.style.setProperty("bottom", "50px", "important"),
//             t.style.setProperty("left", "5px", "important"),
//             t.style.setProperty("right", "auto", "important"),
//             t.style.setProperty("transform", "none", "important");
//         let e = document.querySelector("iframe[title*='Chat']");
//         e &&
//             e.parentElement &&
//             (e.parentElement.style.setProperty("bottom", "50px", "important"),
//             e.parentElement.style.setProperty("left", "5px", "important"),
//             e.parentElement.style.setProperty("right", "auto", "important"));
//     }
// }
// function forceRepositioning() {
//     ["#launcher", "[data-testid='launcher']", ".zEWidget-launcher", "iframe[title*='Chat']"].forEach((t) => {
//         let e = document.querySelector(t);
//         if (e) {
//             let t = e.parentElement || e;
//             t.style.setProperty("bottom", "50px", "important"),
//                 t.style.setProperty("left", "5px", "important"),
//                 t.style.setProperty("right", "auto", "important"),
//                 t.style.setProperty("transform", "none", "important");
//         }
//     });
// }
// function loadZeSnippet() {
//     setTimeout(function () {
//         var t = document.createElement("script");
//         (t.id = "ze-snippet"),
//             (t.src = "https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc"),
//             document.head.appendChild(t),
//             (t.onload = function () {
//                 var t = setInterval(function () {
//                     if (
//                         "undefined" != typeof zE &&
//                         document.querySelector("#launcher") &&
//                         (clearInterval(t),
//                         repositionWidget(),
//                         zE("webWidget:on", "open", function () {
//                             setTimeout(repositionWidget, 100);
//                         }),
//                         zE("webWidget:on", "close", function () {
//                             setTimeout(repositionWidget, 100), setTimeout(forceRepositioning, 500);
//                         }),
//                         zE("webWidget:on", "minimize", function () {
//                             setTimeout(repositionWidget, 100), setTimeout(forceRepositioning, 500);
//                         }),
//                         zE("webWidget:on", "maximize", function () {
//                             setTimeout(repositionWidget, 100);
//                         }),
//                         zE("webWidget:on", "launcherClick", function () {
//                             setTimeout(repositionWidget, 100);
//                         }),
//                         setInterval(forceRepositioning, 2e3),
//                         window.MutationObserver)
//                     ) {
//                         const t = new MutationObserver(function (t) {
//                             t.forEach(function (t) {
//                                 "attributes" !== t.type ||
//                                     ("style" !== t.attributeName && "class" !== t.attributeName) ||
//                                     setTimeout(repositionWidget, 50);
//                             });
//                         });
//                         setTimeout(function () {
//                             let e = document.querySelector("#launcher");
//                             e &&
//                                 (t.observe(e, { attributes: !0, subtree: !0 }),
//                                 e.parentElement && t.observe(e.parentElement, { attributes: !0, subtree: !0 }));
//                         }, 1e3);
//                     }
//                 }, 100);
//             });
//     }, 4e3);
// }
// function toggleTab(t) {
//     document.querySelectorAll('.tab input[type="checkbox"]').forEach(function (e) {
//         e.id !== t && (e.checked = !1);
//     });
// }
// function addPersistentCSS() {
//     const t = document.createElement("style");
//     (t.textContent =
//         "\n        #launcher,\n        [data-testid='launcher'],\n        .zEWidget-launcher {\n            bottom: 50px !important;\n            left: 5px !important;\n            right: auto !important;\n            transform: none !important;\n        }\n        \n        /* Target the iframe container as well */\n        iframe[title*=\"Chat\"] {\n            position: fixed !important;\n            bottom: 50px !important;\n            left: 5px !important;\n            right: auto !important;\n        }\n    "),
//         document.head.appendChild(t);
// }
// addPersistentCSS(), loadZeSnippet();

// function updateSlidePosition(){let e=getSlidesToShow(),t=100/e,i=-(currentSlideIndex*t);slidesContainer.style.transform=`translateX(${i}%)`,window.innerWidth>768&&(slidesContainer.style.transform="none"),slides.forEach(e=>{e.style.minWidth=`${t}%`}),indicators.forEach((e,t)=>{e.classList.toggle("active",t===currentSlideIndex)})}function changeSlide(e){let t=totalSlides-getSlidesToShow();currentSlideIndex=1===e?currentSlideIndex>=Math.floor(t)?0:currentSlideIndex+1:currentSlideIndex<=0?Math.floor(t):currentSlideIndex-1,updateSlidePosition()}function currentSlide(e){currentSlideIndex=e-1,updateSlidePosition()}function viewPlan(e){alert(`Opening Plan ${e} in full view...`)}window.addEventListener("resize",()=>{updateSlidePosition()});let startX=0,isDragging=!1;slidesContainer.addEventListener("touchstart",e=>{startX=e.touches[0].clientX,isDragging=!0}),slidesContainer.addEventListener("touchmove",e=>{isDragging&&e.preventDefault()}),slidesContainer.addEventListener("touchend",e=>{if(!isDragging)return;let t=e.changedTouches[0].clientX,i=startX-t;Math.abs(i)>50&&(i>0?changeSlide(1):changeSlide(-1)),isDragging=!1}),updateSlidePosition();

function updateSlidePosition() {
    let e = getSlidesToShow(),
        t = (e === 3) ? 30 : 100,
        i = -(currentSlideIndex * t);
    (slidesContainer.style.transform = `translateX(${i}%)`),
        window.innerWidth > 768 && (slidesContainer.style.transform = "none"),
        slides.forEach((e) => {
            e.style.minWidth = `${t}%`;
        }),
        indicators.forEach((e, t) => {
            e.classList.toggle("active", t === currentSlideIndex);
        });
}
function changeSlide(e) {
    let t = totalSlides - getSlidesToShow();
    (currentSlideIndex =
        1 === e
            ? currentSlideIndex >= Math.floor(t)
                ? 0
                : currentSlideIndex + 1
            : currentSlideIndex <= 0
              ? Math.floor(t)
              : currentSlideIndex - 1),
        updateSlidePosition();
}
function currentSlide(e) {
    (currentSlideIndex = e - 1), updateSlidePosition();
}
function viewPlan(e) {
    alert(`Opening Plan ${e} in full view...`);
}
window.addEventListener("resize", () => {
    updateSlidePosition();
});
let startX = 0,
    isDragging = !1;
slidesContainer.addEventListener("touchstart", (e) => {
    (startX = e.touches[0].clientX), (isDragging = !0);
}),
    slidesContainer.addEventListener("touchmove", (e) => {
        isDragging && e.preventDefault();
    }),
    slidesContainer.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        let t = e.changedTouches[0].clientX,
            i = startX - t;
        Math.abs(i) > 50 && (i > 0 ? changeSlide(1) : changeSlide(-1)), (isDragging = !1);
    }),
    updateSlidePosition();
