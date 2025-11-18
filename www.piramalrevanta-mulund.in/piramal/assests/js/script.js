const hamburger = document.getElementById("hamburger"),
    navMenu = document.getElementById("nav-menu");
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    let e = hamburger.querySelector("i");
    navMenu.classList.contains("active") ? (e.classList.remove("fa-bars"), e.classList.add("fa-xmark")) : (e.classList.remove("fa-xmark"), e.classList.add("fa-bars"));
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
        if ((navLinks.forEach((e) => e.classList.remove("active")), e.classList.add("active"), window.innerWidth <= 768)) {
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
function repositionWidget() {
    let e = document.querySelector("#launcher");
    e && ((e.style.bottom = "35px"), (e.style.left = "20px"));
}
function loadZeSnippet() {
    setTimeout(function () {
        var e = document.createElement("script");
        (e.id = "ze-snippet"),
            (e.src = "https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc"),
            document.head.appendChild(e),
            (e.onload = function () {
                var e = setInterval(function () {
                    "undefined" != typeof zE &&
                        document.querySelector("#launcher") &&
                        (clearInterval(e),
                        repositionWidget(),
                        zE("webWidget:on", "open", repositionWidget),
                        zE("webWidget:on", "close", repositionWidget),
                        zE("webWidget:on", "launcherClick", repositionWidget),
                        setInterval(repositionWidget, 3e4));
                }, 100);
            });
    }, 4e3);
}
function toggleTab(e) {
    document.querySelectorAll('.tab input[type="checkbox"]').forEach(function (t) {
        t.id !== e && (t.checked = !1);
    });
}
loadZeSnippet(),
    whatsAppBtn && whatsAppBtn.addEventListener("click", function () {}),
    callBackBtn && callBackBtn.addEventListener("click", function () {}),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("overviewContent"),
            t = document.getElementById("seeMoreBtn");
        t.addEventListener("click", function () {
            e.classList.contains("expanded") ? (e.classList.remove("expanded"), (t.innerText = "See More")) : (e.classList.add("expanded"), (t.innerText = "See Less"));
        });
    }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.querySelector(".amenitiesSlider"),
            t = document.querySelectorAll(".amenitiesSlide"),
            n = document.querySelector(".amenitiesPrev"),
            l = document.querySelector(".amenitiesNext");
        document.querySelectorAll(".amenitiesDownloadBtn");
        let i = document.querySelector(".amenitiesDotsContainer"),
            a = 0,
            s = t[0].clientWidth,
            r = 3,
            o,
            d = 0,
            c = 0,
            u = !1;
        function p() {
            (r = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3),
                (s = t[0].clientWidth),
                (function e() {
                    i.innerHTML = "";
                    let n = Math.ceil(t.length / r);
                    for (let l = 0; l < n; l++) {
                        let a = document.createElement("div");
                        a.classList.add("amenitiesDot"),
                            0 === l && a.classList.add("active"),
                            a.addEventListener("click", () => {
                                m(l * r), g();
                            }),
                            i.appendChild(a);
                    }
                })(),
                m(0);
        }
        function m(n) {
            let l, i;
            n < 0 ? (n = t.length - r) : n > t.length - r && (n = 0),
                (a = n),
                (e.style.transform = `translateX(-${a * s}px)`),
                (l = document.querySelectorAll(".amenitiesDot")),
                (i = Math.floor(a / r)),
                l.forEach((e, t) => {
                    e.classList.toggle("active", t === i);
                });
        }
        function y() {
            v(),
                (o = setInterval(() => {
                    m(a + 1);
                }, 3e3));
        }
        function v() {
            clearInterval(o);
        }
        function g() {
            v(), y();
        }
        n.addEventListener("click", () => {
            m(a - 1), g();
        }),
            l.addEventListener("click", () => {
                m(a + 1), g();
            }),
            e.addEventListener("touchstart", (e) => {
                (u = !0), (d = e.touches[0].clientX), v();
            }),
            e.addEventListener("touchmove", (e) => {
                u && (c = e.touches[0].clientX);
            }),
            e.addEventListener("touchend", () => {
                u && (d - c > 50 ? m(a + 1) : c - d > 50 && m(a - 1)), (u = !1), g();
            }),
            window.addEventListener("resize", () => {
                p();
            }),
            p(),
            y();
    }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.querySelectorAll(".galleryItem"),
            t = document.querySelector(".galleryModal"),
            n = document.querySelector(".galleryModalContent img"),
            l = document.querySelector(".galleryCloseButton");
        function i() {
            t.classList.remove("active"),
                setTimeout(function () {
                    (t.style.display = "none"), (document.body.style.overflow = "auto");
                }, 300);
        }
        e.forEach((e) => {
            e.addEventListener("click", function () {
                let e = this.querySelector("img").getAttribute("data-full"),
                    l = this.querySelector("img").getAttribute("alt");
                (n.src = e),
                    (n.alt = l),
                    (t.style.display = "flex"),
                    (document.body.style.overflow = "hidden"),
                    setTimeout(function () {
                        t.classList.add("active");
                    }, 10);
            });
        }),
            l.addEventListener("click", function () {
                i();
            }),
            t.addEventListener("click", function (e) {
                e.target === t && i();
            }),
            document.addEventListener("keydown", function (e) {
                "Escape" === e.key && "flex" === t.style.display && i();
            }),
            e.forEach((e) => {
                let t = e.querySelector("img").getAttribute("data-full");
                new Image().src = t;
            }),
            document.querySelectorAll(".galleryDownloadButton").forEach((e) => {
                e.addEventListener("click", function () {});
            });
    }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("popupModal"),
            t = document.getElementById("blurOverlay"),
            n = document.getElementById("closeModal"),
            l = document.querySelector(".popupModal-right"),
            i = document.getElementById("virtual1"),
            a = document.getElementById("priceBreakupBtn"),
            s = document.querySelectorAll(".offerBoxEnquireButton, .aboutEnquireBtn, #overviewRequestBtn, #priceBreakupBtn, .floorPlan-button, .amenitiesDownloadBtn, .galleryDownloadButton, .firstFormCallBack"),
            r = document.createElement("h2");
        function o(n, l = "Enquiry Form") {
            n && n.preventDefault();
            let i = l,
                a = n ? n.target.closest("button, a, #virtual1, #priceBreakupBtn") : null;
            (r.className = ""),
                a &&
                    (a.classList.contains("offerBoxEnquireButton") || a.classList.contains("aboutEnquireBtn")
                        ? ((i = "Enquire Now"), r.classList.add("enquire"))
                        : a.classList.contains("nav-link") || "overviewRequestBtn" === a.id
                        ? ((i = "Request Brochure"), r.classList.add("brochure"))
                        : "priceBreakupBtn" === a.id
                        ? ((i = "Send Me Costing Details"), r.classList.add("costing"))
                        : a.classList.contains("floorPlan-button")
                        ? ((i = "Send Me Plan Details"), r.classList.add("enquire"))
                        : a.classList.contains("amenitiesDownloadBtn")
                        ? ((i = "Download Amenities"), r.classList.add("download"))
                        : a.classList.contains("galleryDownloadButton")
                        ? ((i = "Download Gallery"), r.classList.add("download"))
                        : "virtual1" === a.id
                        ? ((i = "Virtual Tour Request"), r.classList.add("virtual"))
                        : a.classList.contains("firstFormCallBack") && ((i = "Instant Call Back"), r.classList.add("call"))),
                (r.textContent = i),
                (r.style.display = "block"),
                t.classList.add("active"),
                setTimeout(() => {
                    e.classList.add("active");
                }, 100);
        }
        function d() {
            e.classList.remove("active"),
                setTimeout(() => {
                    t.classList.remove("active"), (r.style.display = "none");
                }, 300);
        }
        (r.id = "modalHeader"),
            (r.style.display = "none"),
            l && l.prepend(r),
            s.length > 0 &&
                s.forEach((e) => {
                    e.addEventListener("click", o);
                }),
            i && i.addEventListener("click", o),
            a && a.addEventListener("click", o),
            n && n.addEventListener("click", d),
            t && t.addEventListener("click", d),
            setTimeout(() => {
                o(null, "Limited Time Offer!");
            }, 3e3);
    });
const track = document.getElementById("amenitiesTrack"),
    prevBtn = document.getElementById("prevBtn"),
    nextBtn = document.getElementById("nextBtn"),
    indicatorsContainer = document.getElementById("amenitiesIndicators"),
    popup = document.getElementById("imagePopup"),
    popupImage = document.getElementById("popupImage"),
    popupClose = document.getElementById("popupClose"),
    popupPrev = document.getElementById("popupPrev"),
    popupNext = document.getElementById("popupNext"),
    popupOverlay = document.getElementById("popupOverlay");
let currentSlide = 0,
    currentImageIndex = 0,
    slideInterval,
    slides,
    totalSlides,
    allImages;
function initCarousel() {
    startAutoSlide(), setupEventListeners(), updateSlidePosition();
}
function updateSlidePosition() {
    (track.style.transform = `translateX(-${100 * currentSlide}%)`), updateIndicators();
}
function updateIndicators() {
    let e = document.querySelectorAll(".indicator");
    e.forEach((e, t) => {
        e.classList.toggle("active", t === currentSlide);
    });
}
function goToSlide(e) {
    (currentSlide = (e + totalSlides) % totalSlides), updateSlidePosition();
}
function startAutoSlide() {
    stopAutoSlide(),
        (slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5e3));
}
function stopAutoSlide() {
    slideInterval && clearInterval(slideInterval);
}
function setupMobileSlides() {
    let e = Array.from(document.querySelectorAll(".amenities-card"));
    for (; track.firstChild; ) track.removeChild(track.firstChild);
    indicatorsContainer.innerHTML = "";
    let t = window.innerWidth <= 768 ? 2 : 6,
        n = Math.ceil(e.length / t);
    for (let l = 0; l < n; l++) {
        let i = document.createElement("div");
        i.className = "amenities-slide";
        let a = l * t,
            s = a + t;
        e.slice(a, s).forEach((e) => {
            i.appendChild(e.cloneNode(!0));
        }),
            track.appendChild(i);
    }
    (totalSlides = (slides = document.querySelectorAll(".amenities-slide")).length),
        slides.forEach((e, t) => {
            let n = document.createElement("button");
            (n.className = "indicator" + (0 === t ? " active" : "")),
                (n.dataset.index = t),
                n.addEventListener("click", () => {
                    stopAutoSlide(), goToSlide(t), startAutoSlide();
                }),
                indicatorsContainer.appendChild(n);
        }),
        (currentSlide = 0),
        updateSlidePosition(),
        setupImageClickListeners();
}
function showPopup(e) {
    (currentImageIndex = e), (popupImage.src = allImages[e].src), (popupImage.alt = allImages[e].alt), (popup.style.display = "flex"), (document.body.style.overflow = "hidden");
}
function hidePopup() {
    (popup.style.display = "none"), (document.body.style.overflow = "");
}
function showNextImage() {
    (currentImageIndex = (currentImageIndex + 1) % allImages.length), (popupImage.src = allImages[currentImageIndex].src), (popupImage.alt = allImages[currentImageIndex].alt);
}
function showPrevImage() {
    (currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length), (popupImage.src = allImages[currentImageIndex].src), (popupImage.alt = allImages[currentImageIndex].alt);
}
function setupImageClickListeners() {
    (allImages = document.querySelectorAll(".amenities-image")).forEach((e, t) => {
        e.addEventListener("click", () => showPopup(t));
    });
}
function setupEventListeners() {
    prevBtn.addEventListener("click", () => {
        stopAutoSlide(), goToSlide(currentSlide - 1), startAutoSlide();
    }),
        nextBtn.addEventListener("click", () => {
            stopAutoSlide(), goToSlide(currentSlide + 1), startAutoSlide();
        }),
        popupClose.addEventListener("click", hidePopup),
        popupOverlay.addEventListener("click", hidePopup),
        popupPrev.addEventListener("click", showPrevImage),
        popupNext.addEventListener("click", showNextImage),
        document.addEventListener("keydown", (e) => {
            "flex" === popup.style.display && ("Escape" === e.key && hidePopup(), "ArrowRight" === e.key && showNextImage(), "ArrowLeft" === e.key && showPrevImage());
        });
    let e = 0;
    track.addEventListener(
        "touchstart",
        (t) => {
            (e = t.touches[0].clientX), stopAutoSlide();
        },
        { passive: !0 }
    ),
        track.addEventListener(
            "touchend",
            (t) => {
                let n = t.changedTouches[0].clientX,
                    l = e - n;
                Math.abs(l) > 50 && (l > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1)), startAutoSlide();
            },
            { passive: !0 }
        ),
        track.addEventListener("mouseenter", stopAutoSlide),
        track.addEventListener("mouseleave", startAutoSlide);
}
window.addEventListener("resize", setupMobileSlides),
    setupMobileSlides(),
    initCarousel(),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("amenitiesTrack"),
            t = document.getElementById("prevBtn"),
            n = document.getElementById("nextBtn"),
            l = document.getElementById("amenitiesIndicators"),
            i = document.getElementById("imagePopup"),
            a = document.getElementById("popupImage"),
            s = document.getElementById("popupClose"),
            r = document.getElementById("popupPrev"),
            o = document.getElementById("popupNext"),
            d = document.getElementById("popupOverlay"),
            c = 0,
            u = 0,
            p,
            m,
            y,
            v;
        function g() {
            (e.style.transform = `translateX(-${100 * c}%)`),
                (function e() {
                    let t = document.querySelectorAll(".indicator");
                    t.forEach((e, t) => {
                        e.classList.toggle("active", t === c);
                    });
                })();
        }
        function f(e) {
            (c = (e + y) % y), g();
        }
        function E() {
            h(),
                (p = setInterval(() => {
                    f(c + 1);
                }, 5e3));
        }
        function h() {
            p && clearInterval(p);
        }
        function L() {
            let t = Array.from(document.querySelectorAll(".amenities-card"));
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            l.innerHTML = "";
            let n = window.innerWidth <= 768 ? 2 : 3,
                s = Math.ceil(t.length / n);
            for (let r = 0; r < s; r++) {
                let o = document.createElement("div");
                o.className = "amenities-slide";
                let d = r * n,
                    p = d + n;
                t.slice(d, p).forEach((e) => {
                    o.appendChild(e.cloneNode(!0));
                }),
                    e.appendChild(o);
            }
            (y = (m = document.querySelectorAll(".amenities-slide")).length),
                m.forEach((e, t) => {
                    let n = document.createElement("button");
                    (n.className = "indicator" + (0 === t ? " active" : "")),
                        (n.dataset.index = t),
                        n.addEventListener("click", () => {
                            h(), f(t), E();
                        }),
                        l.appendChild(n);
                }),
                (c = 0),
                g(),
                (v = document.querySelectorAll(".amenities-image")).forEach((e, t) => {
                    e.addEventListener("click", () => {
                        var e;
                        (u = e = t), (a.src = v[e].src), (a.alt = v[e].alt), (i.style.display = "flex"), (document.body.style.overflow = "hidden");
                    });
                });
        }
        function k() {
            (i.style.display = "none"), (document.body.style.overflow = "");
        }
        function I() {
            (u = (u + 1) % v.length), (a.src = v[u].src), (a.alt = v[u].alt);
        }
        function B() {
            (u = (u - 1 + v.length) % v.length), (a.src = v[u].src), (a.alt = v[u].alt);
        }
        let S;
        window.addEventListener("resize", L),
            L(),
            E(),
            t.addEventListener("click", () => {
                h(), f(c - 1), E();
            }),
            n.addEventListener("click", () => {
                h(), f(c + 1), E();
            }),
            s.addEventListener("click", k),
            d.addEventListener("click", k),
            r.addEventListener("click", B),
            o.addEventListener("click", I),
            document.addEventListener("keydown", (e) => {
                "flex" === i.style.display && ("Escape" === e.key && k(), "ArrowRight" === e.key && I(), "ArrowLeft" === e.key && B());
            }),
            (S = 0),
            e.addEventListener(
                "touchstart",
                (e) => {
                    (S = e.touches[0].clientX), h();
                },
                { passive: !0 }
            ),
            e.addEventListener(
                "touchend",
                (e) => {
                    let t = e.changedTouches[0].clientX,
                        n = S - t;
                    Math.abs(n) > 50 && (n > 0 ? f(c + 1) : f(c - 1)), E();
                },
                { passive: !0 }
            ),
            e.addEventListener("mouseenter", h),
            e.addEventListener("mouseleave", E),
            g();
    }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.getElementById("newGalleryTrack"),
            t = document.getElementById("newGalleryPrevBtn"),
            n = document.getElementById("newGalleryNextBtn"),
            l = document.getElementById("newGalleryIndicators"),
            i = document.getElementById("newGalleryImagePopup"),
            a = document.getElementById("newGalleryPopupImage"),
            s = document.getElementById("newGalleryPopupClose"),
            r = document.getElementById("newGalleryPopupPrev"),
            o = document.getElementById("newGalleryPopupNext"),
            d = document.getElementById("newGalleryPopupOverlay"),
            c = 0,
            u = 0,
            p,
            m,
            y,
            v;
        function g() {
            (e.style.transform = `translateX(-${100 * c}%)`),
                (function e() {
                    let t = document.querySelectorAll(".newGallery-indicator");
                    t.forEach((e, t) => {
                        e.classList.toggle("active", t === c);
                    });
                })();
        }
        function f(e) {
            (c = (e + y) % y), g();
        }
        function E() {
            h(),
                (p = setInterval(() => {
                    f(c + 1);
                }, 5e3));
        }
        function h() {
            p && clearInterval(p);
        }
        function L() {
            let t = Array.from(document.querySelectorAll(".newGallery-card"));
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            l.innerHTML = "";
            let n = window.innerWidth <= 768 ? 2 : 3,
                s = Math.ceil(t.length / n);
            for (let r = 0; r < s; r++) {
                let o = document.createElement("div");
                o.className = "newGallery-slide";
                let d = r * n,
                    p = d + n;
                t.slice(d, p).forEach((e) => {
                    o.appendChild(e.cloneNode(!0));
                }),
                    e.appendChild(o);
            }
            (y = (m = document.querySelectorAll(".newGallery-slide")).length),
                m.forEach((e, t) => {
                    let n = document.createElement("button");
                    (n.className = "newGallery-indicator" + (0 === t ? " active" : "")),
                        (n.dataset.index = t),
                        n.addEventListener("click", () => {
                            h(), f(t), E();
                        }),
                        l.appendChild(n);
                }),
                (c = 0),
                g(),
                (v = document.querySelectorAll(".newGallery-image")).forEach((e, t) => {
                    e.addEventListener("click", () => {
                        var e;
                        (u = e = t), (a.src = v[e].src), (a.alt = v[e].alt), (i.style.display = "flex"), (document.body.style.overflow = "hidden");
                    });
                });
        }
        function k() {
            (i.style.display = "none"), (document.body.style.overflow = "");
        }
        function I() {
            (u = (u + 1) % v.length), (a.src = v[u].src), (a.alt = v[u].alt);
        }
        function B() {
            (u = (u - 1 + v.length) % v.length), (a.src = v[u].src), (a.alt = v[u].alt);
        }
        let S;
        window.addEventListener("resize", L),
            L(),
            E(),
            t.addEventListener("click", () => {
                h(), f(c - 1), E();
            }),
            n.addEventListener("click", () => {
                h(), f(c + 1), E();
            }),
            s.addEventListener("click", k),
            d.addEventListener("click", k),
            r.addEventListener("click", B),
            o.addEventListener("click", I),
            document.addEventListener("keydown", (e) => {
                "flex" === i.style.display && ("Escape" === e.key && k(), "ArrowRight" === e.key && I(), "ArrowLeft" === e.key && B());
            }),
            (S = 0),
            e.addEventListener(
                "touchstart",
                (e) => {
                    (S = e.touches[0].clientX), h();
                },
                { passive: !0 }
            ),
            e.addEventListener(
                "touchend",
                (e) => {
                    let t = e.changedTouches[0].clientX,
                        n = S - t;
                    Math.abs(n) > 50 && (n > 0 ? f(c + 1) : f(c - 1)), E();
                },
                { passive: !0 }
            ),
            e.addEventListener("mouseenter", h),
            e.addEventListener("mouseleave", E),
            g();
    });
