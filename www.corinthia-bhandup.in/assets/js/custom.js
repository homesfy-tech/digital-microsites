async function saveLead(e, t, n, i, l, o) {
    if ("+91" === n) {
        let r = i.replace(/\D/g, "");
        if (10 !== r.length || /^[1-5]/.test(r)) return alert("Invalid phone number. For Indian numbers, enter a valid 10-digit number starting with 6-9."), !1;
    }
    let a = document.querySelector(".dropnOtp");
    if (a && "" === a.value && parseInt(i))
        try {
            let u = await fetch("https://api.homesfy.in/api/users/send_otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: parseInt(i) }) });
            if (u.ok) {
                let d = await u.json();
                a.value = d.otp;
            }
        } catch (m) {
            console.error("Error sending OTP:", m);
        }
    let s = [".FillOtp", ".FillOtp1", ".FillOtp2"].map((e) => document.querySelector(e)).filter((e) => e);
    if (!a || ("" !== a.value && s.some((e) => a.value === e.value))) {
        let c = queryForm(),
            p = await getIpAddress(),
            g = deviceData(),
            f = browserData(),
            y = {
                name: e,
                email: t,
                country_code: n,
                number: i,
                tracking_lead_id: l,
                nationality: 1,
                source_id: 31,
                project_id: projectId,
                Digital: { user_device: g, user_browser: f, campaing_type: c ? c.utmcampaign : null, launch_name: "", client_ipaddress: p, client_pref: o },
            };
        c && (y.Utm = { utm_medium: c.utmmedium, utm_source: c.utmsource, utm_content: c.utmcontent, utm_term: c.utmterm }),
            1 === is_magnet && ((y.is_magnet = is_magnet), (y.magnet_id = magnet_id), (y.source_id = 49)),
            localStorage.setItem("submittedCountryCode", n);
        localStorage.setItem("submittedPhone", i);

        // ✅ Only phone number pushed to GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'formSubmitted',
            phone_number: `${n}${i}`
        });

            SendLead(y, "thankyou.html");
    } else if (a && "" !== a.value) return alert("Invalid OTP"), !1;
}
function setupToggleButton(e, t, n) {
    let i = document.getElementById(e);
    i &&
        i.addEventListener("click", function () {
            toggleVisibility(t, "block"), toggleVisibility(n, "none");
        });
}
function toggleVisibility(e, t) {
    document.querySelectorAll(`.${e}`).forEach((e) => {
        e.style.display = t;
    });
}
document.addEventListener("DOMContentLoaded", function () {
    apiDataGet(projectId),
        ["ModalFormSlug1", "ModalFormSlug2", "ModalFormSlug3", "ModalFormSlug4"].forEach((e) => {
            let t = document.getElementById(e);
            t &&
                t.addEventListener("submit", function (e) {
                    e.preventDefault();
                    let n = t.querySelector(".form-name").value,
                        i = t.querySelector(".form-country").value,
                        l;
                    saveLead(n, null, i, t.querySelector(".form-number").value, t.dataset.trackingId || "default_tracking_id");
                });
        }),
        setupToggleButton("dropbtn", "showdrop", "hidedrop"),
        setupToggleButton("mbutton", "mfieldshow", "mfieldhide"),
        setupToggleButton("popbutton", "popfieldshow", "popfieldhide");
});
