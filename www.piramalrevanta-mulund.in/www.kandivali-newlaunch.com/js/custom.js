var projectId;
var RegNo;
var city;
let apiDataGet = async () => {

    let data = getProjectData(2312)       // Change Project_ID Integer Value only Ex:1131        
       .then((data) => {
            projectId = data.result.Project.p_id;
            phone_no = data.result.phone;
            whatsapp_url = data.result.wp_links_sms;
            whatsapp_url = whatsapp_url.split("=");
            whatsapp_url[2] = "I want to know more about " + whatsapp_url[2];
            whatsapp_url = whatsapp_url.join("=");
            city = data.result.Project.Region.city;
            RegNo = data.result.Project.Region.region_name;
            $(".phone_url").attr("href", "tel:" + phone_no + "");
            $(".whatsapp_url").attr("href", whatsapp_url + ".");
            $(".phone_no").html(phone_no);

        })
        .catch((error) => {
            var whatsapp_url = "https://api.whatsapp.com/send?phone=917304412403&text=Hi!"
            $(".whatsapp_url").attr("href", whatsapp_url);
            $(".phone_url").attr("href", "tel:" + 917304927701 + "");
            $(".phone_no").html("917304927701")
        });
}
apiDataGet();
var param_nationality = 1;

// $('input[type=checkbox]').on('change', function() {
//       this.value = this.checked ? 1 : 0;
//   }).change();

function OnlyAlphaValidationWithSpace(e) {
    if (navigator.appName.toLowerCase() == 'netscape') {
        var key1;
        var keychar1;
        key1 = e.which;
        keychar1 = String.fromCharCode(key1);
        if ((key1 == null) || (key1 == 0) || (key1 == 8) || (key1 == 9) || (key1 == 27) || (key1 == 46) || (key1 == 22)) {
            return true;
        } else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").indexOf(keychar1) > -1)) {
            return true;
        } else {
            return false;
        }
    } else {
        key1 = e.keyCode;
        keychar1 = String.fromCharCode(key1);
        if ((key1 == null) || (key1 == 0) || (key1 == 8) || (key1 == 9) || (key1 == 27) || (key1 == 46) || (key1 == 22)) {
            return true;
        } else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").indexOf(keychar1) > -1)) {
            return true;
        } else {
            return false;
        }
    }
}

function OnlyNumberValidationDash(e) {
    if (navigator.appName.toLowerCase() == 'netscape') {
        var key1;
        var keychar1;
        key1 = e.which;
        keychar1 = String.fromCharCode(key1);
        if ((key1 == null) || (key1 == 0) || (key1 == 8) || (key1 == 9) || (key1 == 27) || (key1 == 45)) {
            return true;
        } else if ((("0123456789").indexOf(keychar1) > -1)) {
            return true;
        } else {
            return false;
        }
    } else {
        key1 = e.keyCode;
        keychar1 = String.fromCharCode(key1);
        if ((key1 == null) || (key1 == 0) || (key1 == 8) || (key1 == 9) || (key1 == 27) || (key1 == 45)) {
            return true;
        } else if ((("0123456789").indexOf(keychar1) > -1)) {
            return true;
        } else {
            return false;
        }
    }
}

$('#dropEnquiry').on("submit", function () {
    var name = $('#dropEnquiry_Name').val();
    var email = null;
    var country_code = $('#dropEnquiry_CountryCode').val();
    var number = $('#dropEnquiry_Number').val();
    // var checkbox = $('#dropEnquiry_CheckBox').val();
    saveLead(name, email, country_code, number, 'top_enquire_form');
    return !1
})
$('#ModalForm').on("submit", function () {
    var name = $('#ModalForm_Name').val();
    var email = null;
    var country_code = $('#ModalForm_CountryCode').val();
    var number = $('#ModalForm_Number').val();
    // var checkbox = $('#ModalForm_CheckBox').val();
    saveLead(name, email, country_code, number, '_overview_homepage');
    return !1
})
$('#PopUpForm').on("submit", function () {
    var name = $('#PopUp_name').val();
    var email =null;
    var country_code = $('#PopUp_CountryCode').val();
    var number = $('#PopUp_number').val();
    // var checkbox = $('#PopUp_checkbox').val();
    saveLead(name, email, country_code, number, 'PopUp_form_overview_homepage');
    return !1
})

async function saveLead(name, email,country_code, number,  pref) {

    var getUtmData = queryForm();
    var ipAddress = await getIpAddress();
    var user_device = deviceData();
    var user_browser = browserData();

    var obj = {};
    obj.name = name;
    obj.email = email;
    obj.country_code = country_code;
    obj.number = number;
    // obj.is_tc_agree = parseInt(checkbox);
    // obj.admin_message= message; 
    obj.nationality = param_nationality; // 1 for indian & 2 for NRI (int)
    // obj.is_magnet = 1 ; // 1 for yes and 0 for no (int),
    // magnet_id =39603; //if magnet else blank (int)
    obj.source_id = 31;
    obj.project_id = projectId;
    if (getUtmData) {
        obj.Utm = {
            utm_medium: getUtmData.utmmedium,
            utm_source: getUtmData.utmsource,
            utm_content: getUtmData.utmcontent,
            utm_term: getUtmData.utmterm
        };
    }
    obj.Digital = {
        user_device: user_device,
        user_browser: user_browser,
        campaign_type: getUtmData ? getUtmData.utmcampaign : null,
        launch_name: "",
        client_ipaddress: ipAddress,
        client_pref: pref
    }
    if (pref == 'DownloadBrochure_overview_homepage') {
        SendLead(obj, "thankyou.html");
    } else {
        SendLead(obj, "thankyou.html");
    }
}