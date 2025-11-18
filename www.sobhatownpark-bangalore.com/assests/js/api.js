// Base URL for API calls
let baseUrl = window.location.href.includes("file") || window.location.href.includes("localhost") 
    ? "https://api.homesfy.in/" 
    : "https://api.homesfy.in/";

// Project variables
let projectId = 4209 ; // Default project ID
let RegNo;
let city;
let is_magnet = 0;
let magnet_id;
let magnet_number;
let IVR_phone_no;
let whatsappNumber;

// Get Project Data
async function getProjectData(project_id) {
    let urlString = window.location.toString();
    var url = new URL(urlString);
    var magnet_id = url.searchParams.get("magnet_id");
    
    try {
        let response;
        if (project_id && magnet_id) {
            const api_url = "https://api.homesfy.in/api/leads/projectdata/" + project_id + "?magnet_id=" + magnet_id;
            response = await fetch(api_url);
        } else if (project_id) {
            const api_url = "https://api.homesfy.in/api/leads/projectdata/" + project_id;
            response = await fetch(api_url);
        } else {
            return "Error : Project id not provided ";
        }
        
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("Failed to fetch project data");
        }
    } catch (error) {
        console.error("Error fetching project data:", error);
        return error;
    }
}

// Send Lead data
async function SendLead(obj, redirectUrl) {
    const apiUrl = "api/leads/create";
    
    try {
        const response = await fetch(baseUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });
        
        if (!redirectUrl) {
            redirectUrl = "thankyou.html";
        }
        
        if (response.ok) {
            window.location.href = redirectUrl;
            return 1;
        } else {
            throw new Error("Failed to send lead data");
        }
    } catch (error) {
        console.error("Error sending lead data:", error);
        return error;
    }
}

// Update contact elements in DOM
function updateContactElements(phoneNumber, whatsappNum, projectName) {
    // Update phone number text
    const phoneNumberElements = document.getElementsByClassName('IVR_Phone_No_Text');
    for (let i = 0; i < phoneNumberElements.length; i++) {
        phoneNumberElements[i].innerText = phoneNumber || '+917948540394';
    }
    
    // Update phone links
    const phoneUrlElements = document.getElementsByClassName('IVR_Phone_No_Url');
    for (let i = 0; i < phoneUrlElements.length; i++) {
        phoneUrlElements[i].href = `tel:${phoneNumber || '+917948540394'}`;
    }
    
    // Update WhatsApp links
    const whatsappUrlElements = document.getElementsByClassName('whatsapp_url');
    for (let i = 0; i < whatsappUrlElements.length; i++) {
        whatsappUrlElements[i].href = `https://api.whatsapp.com/send?phone=+91${whatsappNum || '8976997450'}&text=I want to know more about ${projectName || 'the property'}`;
    }
}

// Initialize API data
async function apiDataGet(projectId) {
    try {
        const data = await getProjectData(projectId);
        
        if (data && data.result) {
            projectId = data.result.Project.p_id;
            IVR_phone_no = data.result.magnet_id ? data.result.magnet_number : data.result.phone;
            whatsappNumber = data.result.whatsupUser.phone;
            
            let whatsapp_url = data.result.wp_links_sms;
            whatsapp_url = whatsapp_url.split("=");
            whatsapp_url[1] = data.result.magnet_id ? ("+91" + data.result.magnet_number + "&text") : whatsapp_url[1];
            whatsapp_url[2] = "I want to know more about " + whatsapp_url[2];
            whatsapp_url = whatsapp_url.join("=");
            
            city = data.result.Project.Region.city;
            RegNo = data.result.Project.Region.region_name;
            is_magnet = data.result.is_magnet;
            magnet_id = data.result.magnet_id ? data.result.magnet_id : null;
            
            // Update contact elements
            updateContactElements(IVR_phone_no, whatsappNumber, data.result.Project.project_name);
        }
    } catch (error) {
        console.error("Error initializing API data:", error);
        // Fallback values
        updateContactElements("917304927701", "917304412403", "the property");
    }
}

// Function to change project ID and update contact info
function changeProjectId(newProjectId) {
    projectId = newProjectId;
    apiDataGet(newProjectId); // This will automatically update all contact info
}

// Get IP address
async function getIpAddress() {
    try {
        const response = await fetch('https://api.ipify.org/?format=json', { mode: 'cors' });
        if (response.ok) {
            const data = await response.json();
            console.log(data, "IP Address");
            return data.ip || "0.0.0.0";
        } else {
            return "0.0.0.0";
        }
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return "0.0.0.0";
    }
}

// Get device data
function deviceData() {
    let device;
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || 
        navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Windows Phone/i)) {
        device = "Mobile";
    } else if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
        device = "Tablet";
    } else if (navigator.userAgent.match(/BlackBerry/i)) {
        device = "Blackberry";
    } else {
        device = "Desktop";
    }
    return device;
}

// Get browser data
function browserData() {
    let browser;
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        browser = "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != 94) {
        browser = "Chrome";
    } else if (navigator.userAgent.indexOf("Mozilla") != -1) {
        browser = "Mozilla";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        browser = "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browser = "Firefox";
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        browser = "MSIE";
    }
    return browser;
}

// Get query parameters
function queryForm(settings = null) {
    var resultJson = {};
    var reset = settings && settings.reset ? settings.reset : false;
    var self = window.location.toString();
    var querystring = self.split("?");
    
    if (querystring.length > 1) {
        var pairs = querystring[1].split("&");
        for (let i in pairs) {
            var keyval = pairs[i].split("=");
            if (reset || sessionStorage.getItem(keyval[0]) === null) {
                sessionStorage.setItem(keyval[0], keyval[1]);
            }
            
            if (keyval[0] == "utm_source")
                resultJson.utmsource = keyval[1];
            if (keyval[0] == "utm_medium")
                resultJson.utmmedium = keyval[1];
            if (keyval[0] == "utm_campaign")
                resultJson.utmcampaign = keyval[1];
            if (keyval[0] == "utm_content")
                resultJson.utmcontent = keyval[1];
            if (keyval[0] == "utm_term")
                resultJson.utmterm = keyval[1];
            if (keyval[0] == "p_nationality")
                resultJson.param_nationality = keyval[1];
            if (keyval[0] == "p_regionid")
                resultJson.param_region_id = keyval[1];
        }
        return resultJson;
    }
    return null;
}