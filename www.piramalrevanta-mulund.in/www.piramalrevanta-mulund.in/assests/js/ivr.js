async function apiDataGet() {
    try {
        let e = await getProjectData(4256);
        if (e && e.result) {
            let t = document.querySelector(".firstFormPhoneIcon"),
                r = document.querySelector(".firstFormPhoneLink");
            if (t && r) {
                let a = e.result.magnet_id ? e.result.magnet_number : e.result.phone || "+918068926819";
                (t.textContent = a), (r.href = `tel:+91${a}`);
            }
            let n = document.querySelector(".firstFormWhatsApp");
            if (n) {
                let o = e.result.whatsupUser?.phone || "918068926819",
                    l = e.result.Project?.project_name || "Project";
                (n.href = `https://api.whatsapp.com/send?phone=${o}&text=I want to know more about ${l}`), (n.target = "_blank"), (n.rel = "noopener noreferrer");
            }
        }
    } catch (i) {
        console.error("Error initializing API data:", i);
        let $ = document.querySelector(".firstFormPhoneIcon"),
            s = document.querySelector(".firstFormPhoneLink");
        $ && s && (($.textContent = "+918068926819"), (s.href = "tel:+918068926819"));
    }
}
document.addEventListener("DOMContentLoaded", apiDataGet),
    document.addEventListener("DOMContentLoaded", function () {
        if (window.innerWidth <= 768) {
            let e = document.createElement("div");
            e.classList.add("mobile-bottom-bar");
            let t = document.createElement("a");
            t.classList.add("firstFormCallMobile"), (t.innerHTML = '<i class="fa-icon fa-call"></i> Call'), (t.href = "tel:+918068926819");
            let r = document.createElement("a");
            r.classList.add("firstFormWhatsAppMobile"),
                (r.href = "https://api.whatsapp.com/send?phone=918068926819&text=I want to know more about the project"),
                (r.target = "_blank"),
                (r.rel = "noopener noreferrer"),
                (r.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"></path>
    </svg>
    WhatsApp
`),
                e.appendChild(t),
                e.appendChild(r),
                document.body.appendChild(e);
        }
    });
