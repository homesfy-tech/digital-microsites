// create base url for dynmic call for post and get data api url 

let baseUrl = window.location.href.includes("file")  || window.location.href.includes("localhost")?"https://api.homesfy.in/":"https://api.homesfy.in/"

// console.log(baseUrl)



// Get Data

let getProjectData = async (project_id) => {
    if (project_id) {
        const api_url = "https://api.homesfy.in/api/leads/projectdata/"+ project_id;
        // console.log(api_url)
    return await  $.get(api_url) 
        // return api_url;
    } else {
        return "Error : Project id not provided ";
    }
}

// Post data

var SendLead = async (obj,redirectUrl) => {
debugger
    const apiUrl = "api/leads/create";
       $.post(baseUrl + apiUrl, obj, function(data) {
        // if (!msg) {
        //     msg = "Thank You";
        // }
        if (!redirectUrl) {
            redirectUrl = "thankyou.html";
        }
        // alert(msg);
        window.location.href = redirectUrl;
        return 1
    })
}

//Get Static data function

// Device Data

var deviceData = function() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Windows Phone/i)) {
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

//Browser Data

var browserData = function() {
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
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        browser = "MSIE";
    }
    return browser;
}

// utm function static data

var queryForm = (settings = null) => {   
    var resultJson = {};
    var reset = settings && settings.reset ? settings.reset : !1;
    var self = window.location.toString();
    // var self = "https://www.raymond-thane.in/?utm_source=google&utm_medium=cpc&utm_campaign=Raymond-10X-Habitat_Thane_Search_1Sept20&utm_term=BrandAllAdGrp&utm_content=Non-DKI";
    var querystring = self.split("?");
    if (querystring.length > 1) {
        var pairs = querystring[1].split("&");
        for (i in pairs) {
            var keyval = pairs[i].split("=");
            if (reset || sessionStorage.getItem(keyval[0]) === null) {
                sessionStorage.setItem(keyval[0], keyval[1])
            }
            if (keyval[0] == "utm_source")
                resultJson.utmsource = keyval[1];
            // console.log(resultJson.utmsource)
            if (keyval[0] == "utm_medium")
                resultJson.utmmedium = keyval[1];
            // console.log(resultJson.utmmedium)
            if (keyval[0] == "utm_campaign")
                resultJson.utmcampaign = keyval[1];
            // console.log(resultJson.utmcampaign)
            if (keyval[0] == "utm_content")
                resultJson.utmcontent = keyval[1];
            if (keyval[0] == "utm_term")
                resultJson.utmterm = keyval[1]
            if (keyval[0] == "p_nationality")
                resultJson.param_nationality = keyval[1]
            if (keyval[0] == "p_regionid") {
                resultJson.param_region_id = keyval[1];   
            }
           
        }
         
         return resultJson;

    }
}


// IP address functin 

var getIpAddress = async () =>{
    var getAddress = await $.getJSON("https://jsonip.com?callback=?");
    var ipAddress = null;
    if(getAddress && getAddress.ip){
       ipAddress = getAddress.ip;
    }
     return ipAddress;
}

