// Save lead function with validation
async function saveLead(name, email, country_code, number, tracking_lead_id, pref) {
    // For Indian numbers (+91), validate exactly 10 digits and starting digit
    if (country_code === "+91") {
        const cleanNumber = number.replace(/\D/g, "");
        if (cleanNumber.length !== 10 || /^[1-5]/.test(cleanNumber)) {
            alert("Invalid phone number. For Indian numbers, enter a valid 10-digit number starting with 6-9.");
            return false;
        }
    }

    // OTP handling
    const otpElement = document.querySelector(".dropnOtp");
    if (otpElement && otpElement.value === "" && parseInt(number)) {
        try {
            const response = await fetch("https://api.homesfy.in/api/users/send_otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: parseInt(number) }),
            });

            if (response.ok) {
                const data = await response.json();
                otpElement.value = data.otp;
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    }

    const fillOtps = [".FillOtp", ".FillOtp1", ".FillOtp2"]
        .map(selector => document.querySelector(selector))
        .filter(el => el);

    if (!otpElement || otpElement.value !== "" && fillOtps.some(el => otpElement.value === el.value)) {
        const getUtmData = queryForm();
        const ipAddress = await getIpAddress();
        const user_device = deviceData();
        const user_browser = browserData();
        const param_nationality = 1;

        const obj = {
            name,
            email,
            country_code,
            number,
            tracking_lead_id,
            nationality: param_nationality,
            source_id: 31,
            project_id: projectId,
            Digital: {
                user_device,
                user_browser,
                campaing_type: getUtmData ? getUtmData.utmcampaign : null,
                launch_name: "",
                client_ipaddress: ipAddress,
                client_pref: pref,
            },
        };

        if (getUtmData) {
            obj.Utm = {
                utm_medium: getUtmData.utmmedium,
                utm_source: getUtmData.utmsource,
                utm_content: getUtmData.utmcontent,
                utm_term: getUtmData.utmterm,
            };
        }

        if (is_magnet === 1) {
            obj.is_magnet = is_magnet;
            obj.magnet_id = magnet_id;
            obj.source_id = 49;
        }

        SendLead(obj, "thankyou.html");
    } else {
        if (otpElement && otpElement.value !== "") {
            alert("Invalid OTP");
            return false;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize API data with default project ID
    apiDataGet(projectId);

    // Form submission handler for all forms
    const formIds = ["ModalFormSlug1", "ModalFormSlug2", "ModalFormSlug3", "ModalFormSlug4"];
    
    formIds.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();

                const name = form.querySelector(".form-name").value;
                const email = null;
                const country_code = form.querySelector(".form-country").value;
                const number = form.querySelector(".form-number").value;
                const tracking_lead_id = form.dataset.trackingId || "default_tracking_id";

                saveLead(name, email, country_code, number, tracking_lead_id);
            });
        }
    });

    // Toggle elements when buttons are clicked
    setupToggleButton("dropbtn", "showdrop", "hidedrop");
    setupToggleButton("mbutton", "mfieldshow", "mfieldhide");
    setupToggleButton("popbutton", "popfieldshow", "popfieldhide");
});

// Function to set up button click handlers
function setupToggleButton(buttonId, showClass, hideClass) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener("click", function () {
            toggleVisibility(showClass, "block");
            toggleVisibility(hideClass, "none");
        });
    }
}

// Function to toggle visibility
function toggleVisibility(className, displayStyle) {
    document.querySelectorAll(`.${className}`).forEach(element => {
        element.style.display = displayStyle;
    });
}