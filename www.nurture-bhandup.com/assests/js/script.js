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
        const widgetLauncher = document.querySelector('#launcher');
        if (widgetLauncher) {
          widgetLauncher.style.bottom = '35px';  // move up
          widgetLauncher.style.left = '20px';     // move horizontally if needed
        }
      }
      
      function loadZeSnippet() {
        setTimeout(function () {
          var script = document.createElement('script');
          script.id = "ze-snippet";
          script.src = "https://static.zdassets.com/ekr/snippet.js?key=94b386d0-0e8f-40fe-b5ff-a939cb332fbc";
          document.head.appendChild(script);
      
          script.onload = function () {
            var checkWidgetInterval = setInterval(function () {
              if (typeof zE !== 'undefined' && document.querySelector('#launcher')) {
                clearInterval(checkWidgetInterval);
      
                // Initial reposition
                repositionWidget();
      
                // Reapply styles when widget opens or is minimized
                zE('webWidget:on', 'open', repositionWidget);
                zE('webWidget:on', 'close', repositionWidget);
                zE('webWidget:on', 'launcherClick', repositionWidget); // just in case
      
                // Optional: reapply every few seconds as a fallback
                setInterval(repositionWidget, 30000);
              }
            }, 100);
          };
        }, 4000);
      }
      
      loadZeSnippet();
      
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
            e.classList.contains("expanded") ? (e.classList.remove("expanded"), (t.innerText = "See More")) : (e.classList.add("expanded"), (t.innerText = "See Less"));
        });
    }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.querySelector(".amenitiesSlider"),
            t = document.querySelectorAll(".amenitiesSlide"),
            n = document.querySelector(".amenitiesPrev"),
            a = document.querySelector(".amenitiesNext");
        document.querySelectorAll(".amenitiesDownloadBtn");
        let i = document.querySelector(".amenitiesDotsContainer"),
            s = 0,
            l = t[0].clientWidth,
            c = 3,
            o,
            r = 0,
            d = 0,
            u = !1;
        function v() {
            (c = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3),
                (l = t[0].clientWidth),
                (function e() {
                    i.innerHTML = "";
                    let n = Math.ceil(t.length / c);
                    for (let a = 0; a < n; a++) {
                        let s = document.createElement("div");
                        s.classList.add("amenitiesDot"),
                            0 === a && s.classList.add("active"),
                            s.addEventListener("click", () => {
                                m(a * c), y();
                            }),
                            i.appendChild(s);
                    }
                })(),
                m(0);
        }
        function m(n) {
            let a, i;
            n < 0 ? (n = t.length - c) : n > t.length - c && (n = 0),
                (s = n),
                (e.style.transform = `translateX(-${s * l}px)`),
                (a = document.querySelectorAll(".amenitiesDot")),
                (i = Math.floor(s / c)),
                a.forEach((e, t) => {
                    e.classList.toggle("active", t === i);
                });
        }
        function L() {
            f(),
                (o = setInterval(() => {
                    m(s + 1);
                }, 3e3));
        }
        function f() {
            clearInterval(o);
        }
        function y() {
            f(), L();
        }
        n.addEventListener("click", () => {
            m(s - 1), y();
        }),
            a.addEventListener("click", () => {
                m(s + 1), y();
            }),
            e.addEventListener("touchstart", (e) => {
                (u = !0), (r = e.touches[0].clientX), f();
            }),
            e.addEventListener("touchmove", (e) => {
                u && (d = e.touches[0].clientX);
            }),
            e.addEventListener("touchend", () => {
                u && (r - d > 50 ? m(s + 1) : d - r > 50 && m(s - 1)), (u = !1), y();
            }),
            window.addEventListener("resize", () => {
                v();
            }),
            v(),
            L();
    }),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.querySelectorAll(".galleryItem"),
            t = document.querySelector(".galleryModal"),
            n = document.querySelector(".galleryModalContent img"),
            a = document.querySelector(".galleryCloseButton");
        function i() {
            t.classList.remove("active"),
                setTimeout(function () {
                    (t.style.display = "none"), (document.body.style.overflow = "auto");
                }, 300);
        }
        e.forEach((e) => {
            e.addEventListener("click", function () {
                let e = this.querySelector("img").getAttribute("data-full"),
                    a = this.querySelector("img").getAttribute("alt");
                (n.src = e),
                    (n.alt = a),
                    (t.style.display = "flex"),
                    (document.body.style.overflow = "hidden"),
                    setTimeout(function () {
                        t.classList.add("active");
                    }, 10);
            });
        }),
            a.addEventListener("click", function () {
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
            a = document.querySelector(".popupModal-right"),
            i = document.getElementById("virtual1"),
            s = document.getElementById("priceBreakupBtn"),
            l = document.querySelectorAll(".offerBoxEnquireButton, .aboutEnquireBtn, #overviewRequestBtn, #priceBreakupBtn, .floorPlan-button, .amenitiesDownloadBtn, .galleryDownloadButton, .firstFormCallBack"),
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
                        : s.classList.contains("firstFormCallBack") && ((i = "Instant Call Back"), c.classList.add("call"))),
                (c.textContent = i),
                (c.style.display = "block"),
                t.classList.add("active"),
                setTimeout(() => {
                    e.classList.add("active");
                }, 100);
        }
        function r() {
            e.classList.remove("active"),
                setTimeout(() => {
                    t.classList.remove("active"), (c.style.display = "none");
                }, 300);
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
            t && t.addEventListener("click", r),
            setTimeout(() => {
                o(null, "Limited Time Offer!");
            }, 3e3);
    });
