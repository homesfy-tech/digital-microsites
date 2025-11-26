document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelector(".headerMenuButton"),
        l = document.querySelector(".mobileMenu"),
        t = document.querySelector(".mobileMenuClose"),
        r = document.querySelectorAll(".mobileMenuLink");
    e.addEventListener("click", () => {
        l.classList.add("active");
    }),
        t.addEventListener("click", () => {
            l.classList.remove("active");
        }),
        r.forEach((e) => {
            e.addEventListener("click", () => {
                l.classList.remove("active");
            });
        }),
        window.addEventListener("scroll", () => {
            let e = document.querySelector(".mainHeader");
            window.scrollY > 50 ? (e.style.background = "rgba(0, 0, 0, 0.8)") : (e.style.background = "rgba(0, 0, 0, 0.3)");
        });
}),
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.querySelector(".bannerSlidesContainer"),
            l = document.querySelectorAll(".bannerCarouselSlide"),
            t = document.querySelector(".bannerPrevButton"),
            r = document.querySelector(".bannerNextButton"),
            n = document.querySelectorAll(".bannerIndicator"),
            a = 0,
            i = l.length,
            d;
        function o() {
            (e.style.transform = `translateX(-${100 * a}%)`),
                n.forEach((e, l) => {
                    e.classList.toggle("active", l === a);
                });
        }
        function s() {
            (a = (a + 1) % i), o();
        }
        function u() {
            c(), (d = setInterval(s, 5e3));
        }
        function c() {
            clearInterval(d);
        }
        o(),
            t.addEventListener("click", function e() {
                (a = (a - 1 + i) % i), o();
            }),
            r.addEventListener("click", s),
            n.forEach((e, l) => {
                e.addEventListener("click", function () {
                    var e;
                    (e = l), (a = e), o();
                });
            }),
            u(),
            e.addEventListener("mouseenter", c),
            e.addEventListener("mouseleave", u);
    });
    