$("select").html(`
    <option disabled="disabled" value="">Country Code</option>
    <option data-countrycode="IN" value="+91" selected="">India(+91)</option>
    <option data-countrycode="AU" value="+61">Australia (+61)</option>
    <option data-countrycode="BH" value="+973">Bahrain (+973)</option>
    <option data-countrycode="CA" value="+1">Canada (+1)</option>
    <option data-countrycode="HK" value="+852">Hong Kong (+852)</option>
    <option data-countrycode="QA" value="+974">Qatar (+974)</option>
    <option data-countrycode="SA" value="+966">Saudi Arabia (+966)</option>
    <option data-countrycode="SG" value="+65">Singapore (+65)</option>
    <option data-countrycode="ZA" value="+27">South Africa (+27)</option>
    <option data-countrycode="AE" value="+971">United Arab Emirates (+971)</option>
    <option data-countrycode="US" value="+1">USA (+1)</option>
    <option data-countrycode="GB" name="countrycode" value="44">UK (+44)</option>
    <optgroup label="Other countries">
        <option data-countrycode="AF" value="+93">Afghanistan (+93)</option>
        <option data-countrycode="AL" value="+355">Albania (+355)</option>
        <option data-countrycode="DZ" value="+213">Algeria (+213)</option>
        <option data-countrycode="AS" value="+1-684">American Samoa (+1-684)</option>
        <option data-countrycode="AD" value="+376">Andorra (+376)</option>
        <option data-countrycode="AO" value="+244">Angola (+244)</option>
        <option data-countrycode="AI" value="+1-264">Anguilla (+1-264)</option>
        <option data-countrycode="AQ" value="+672">Antarctica (+672)</option>
        <option data-countrycode="AG" value="+1-268">Antigua and Barbuda (+1-268)</option>
        <option data-countrycode="AR" value="+54">Argentina (+54)</option>
        <option data-countrycode="AM" value="+374">Armenia (+374)</option>
        <option data-countrycode="AW" value="+297">Aruba (+297)</option>
        <option data-countrycode="AT" value="+43">Austria (+43)</option>
        <option data-countrycode="AZ" value="+994">Azerbaijan (+994)</option>
        <option data-countrycode="BS" value="+1-242">Bahamas (+1-242)</option>
        <option data-countrycode="BD" value="+880">Bangladesh (+880)</option>
        <option data-countrycode="BB" value="+1-246">Barbados (+1-246)</option>
        <option data-countrycode="BY" value="+375">Belarus (+375)</option>
        <option data-countrycode="BE" value="+32">Belgium (+32)</option>
        <option data-countrycode="BZ" value="+501">Belize (+501)</option>
        <option data-countrycode="BJ" value="+229">Benin (+229)</option>
        <option data-countrycode="BM" value="+1-441">Bermuda (+1-441)</option>
        <option data-countrycode="BT" value="+975">Bhutan (+975)</option>
        <option data-countrycode="BO" value="+591">Bolivia (+591)</option>
        <option data-countrycode="BA" value="+387">Bosnia and Herzegowina (+387)</option>
        <option data-countrycode="BW" value="+267">Botswana (+267)</option>
        <option data-countrycode="BV" value="+47">Bouvet Island (+47)</option>
        <option data-countrycode="BR" value="+55">Brazil (+55)</option>
        <option data-countrycode="IO" value="+246">British Indian Ocean Territory (+246)</option>
        <option data-countrycode="BN" value="+673">Brunei Darussalam (+673)</option>
        <option data-countrycode="BG" value="+359">Bulgaria (+359)</option>
        <option data-countrycode="BF" value="+226">Burkina Faso (+226)</option>
        <option data-countrycode="BI" value="+257">Burundi (+257)</option>
        <option data-countrycode="KH" value="+855">Cambodia (+855)</option>
        <option data-countrycode="CM" value="+237">Cameroon (+237)</option>
        <option data-countrycode="CV" value="+238">Cape Verde (+238)</option>
        <option data-countrycode="KY" value="+1-345">Cayman Islands (+1-345)</option>
        <option data-countrycode="CF" value="+236">Central African Republic (+236)</option>
        <option data-countrycode="TD" value="+235">Chad (+235)</option>
        <option data-countrycode="CL" value="+56">Chile (+56)</option>
        <option data-countrycode="CN" value="+86">China (+86)</option>
        <option data-countrycode="CX" value="+61">Christmas Island (+61)</option>
        <option data-countrycode="CC" value="+61">Cocos (Keeling) Islands (+61)</option>
        <option data-countrycode="CO" value="+57">Colombia (+57)</option>
        <option data-countrycode="KM" value="+269">Comoros (+269)</option>
        <option data-countrycode="CG" value="+242">Congo Democratic Republic of (+242)</option>
        <option data-countrycode="CK" value="+682">Cook Islands (+682)</option>
        <option data-countrycode="CR" value="+506">Costa Rica (+506)</option>
        <option data-countrycode="CI" value="+225">Cote D'Ivoire (+225)</option>
        <option data-countrycode="HR" value="+385">Croatia (+385)</option>
        <option data-countrycode="CU" value="+53">Cuba (+53)</option>
        <option data-countrycode="CY" value="+357">Cyprus (+357)</option>
        <option data-countrycode="CZ" value="+420">Czech Republic (+420)</option>
        <option data-countrycode="DK" value="+45">Denmark (+45)</option>
        <option data-countrycode="DJ" value="+253">Djibouti (+253)</option>
        <option data-countrycode="DM" value="+1-767">Dominica (+1-767)</option>
        <option data-countrycode="DO" value="+1-809">Dominican Republic (+1-809)</option>
        <option data-countrycode="TL" value="+670">Timor-Leste (+670)</option>
        <option data-countrycode="EC" value="+593">Ecuador (+593)</option>
        <option data-countrycode="EG" value="+20">Egypt (+20)</option>
        <option data-countrycode="SV" value="+503">El Salvador (+503)</option>
        <option data-countrycode="GQ" value="+240">Equatorial Guinea (+240)</option>
        <option data-countrycode="ER" value="+291">Eritrea (+291)</option>
        <option data-countrycode="EE" value="+372">Estonia (+372)</option>
        <option data-countrycode="ET" value="+251">Ethiopia (+251)</option>
        <option data-countrycode="FK" value="+500">Falkland Islands (Malvinas) (+500)</option>
        <option data-countrycode="FO" value="+298">Faroe Islands (+298)</option>
        <option data-countrycode="FJ" value="+679">Fiji (+679)</option>
        <option data-countrycode="FI" value="+358">Finland (+358)</option>
        <option data-countrycode="FR" value="+33">France (+33)</option>
        <option data-countrycode="GF" value="+594">French Guiana (+594)</option>
        <option data-countrycode="PF" value="+689">French Polynesia (+689)</option>
        <option data-countrycode="TF" value="+">French Southern Territories (+)</option>
        <option data-countrycode="GA" value="+241">Gabon (+241)</option>
        <option data-countrycode="GM" value="+220">Gambia (+220)</option>
        <option data-countrycode="GE" value="+995">Georgia (+995)</option>
        <option data-countrycode="DE" value="+49">Germany (+49)</option>
        <option data-countrycode="GH" value="+233">Ghana (+233)</option>
        <option data-countrycode="GI" value="+350">Gibraltar (+350)</option>
        <option data-countrycode="GR" value="+30">Greece (+30)</option>
        <option data-countrycode="GL" value="+299">Greenland (+299)</option>
        <option data-countrycode="GD" value="+1-473">Grenada (+1-473)</option>
        <option data-countrycode="GP" value="+590">Guadeloupe (+590)</option>
        <option data-countrycode="GU" value="+1-671">Guam (+1-671)</option>
        <option data-countrycode="GT" value="+502">Guatemala (+502)</option>
        <option data-countrycode="GN" value="+224">Guinea (+224)</option>
        <option data-countrycode="GW" value="+245">Guinea-bissau (+245)</option>
        <option data-countrycode="GY" value="+592">Guyana (+592)</option>
        <option data-countrycode="HT" value="+509">Haiti (+509)</option>
        <option data-countrycode="HM" value="+011">Heard Island and McDonald Islands (+011)</option>
        <option data-countrycode="HN" value="+504">Honduras (+504)</option>
        <option data-countrycode="HU" value="+36">Hungary (+36)</option>
        <option data-countrycode="IS" value="+354">Iceland (+354)</option>
        <option data-countrycode="ID" value="+62">Indonesia (+62)</option>
        <option data-countrycode="IR" value="+98">Iran (Islamic Republic of) (+98)</option>
        <option data-countrycode="IQ" value="+964">Iraq (+964)</option>
        <option data-countrycode="IE" value="+353">Ireland (+353)</option>
        <option data-countrycode="IL" value="+972">Israel (+972)</option>
        <option data-countrycode="IT" value="+39">Italy (+39)</option>
        <option data-countrycode="JM" value="+1-876">Jamaica (+1-876)</option>
        <option data-countrycode="JP" value="+81">Japan (+81)</option>
        <option data-countrycode="JO" value="+962">Jordan (+962)</option>
        <option data-countrycode="KZ" value="+7">Kazakhstan (+7)</option>
        <option data-countrycode="KE" value="+254">Kenya (+254)</option>
        <option data-countrycode="KI" value="+686">Kiribati (+686)</option>
        <option data-countrycode="KP" value="+850">Korea, Democratic People's Republic of (+850)</option>
        <option data-countrycode="KR" value="+82">South Korea (+82)</option>
        <option data-countrycode="KW" value="+965">Kuwait (+965)</option>
        <option data-countrycode="KG" value="+996">Kyrgyzstan (+996)</option>
        <option data-countrycode="LA" value="+856">Lao People's Democratic Republic (+856)</option>
        <option data-countrycode="LV" value="+371">Latvia (+371)</option>
        <option data-countrycode="LB" value="+961">Lebanon (+961)</option>
        <option data-countrycode="LS" value="+266">Lesotho (+266)</option>
        <option data-countrycode="LR" value="+231">Liberia (+231)</option>
        <option data-countrycode="LY" value="+218">Libya (+218)</option>
        <option data-countrycode="LI" value="+423">Liechtenstein (+423)</option>
        <option data-countrycode="LT" value="+370">Lithuania (+370)</option>
        <option data-countrycode="LU" value="+352">Luxembourg (+352)</option>
        <option data-countrycode="MO" value="+853">Macao (+853)</option>
        <option data-countrycode="MK" value="+389">Macedonia, The Former Yugoslav Republic of (+389)</option>
        <option data-countrycode="MG" value="+261">Madagascar (+261)</option>
        <option data-countrycode="MW" value="+265">Malawi (+265)</option>
        <option data-countrycode="MY" value="+60">Malaysia (+60)</option>
        <option data-countrycode="MV" value="+960">Maldives (+960)</option>
        <option data-countrycode="ML" value="+223">Mali (+223)</option>
        <option data-countrycode="MT" value="+356">Malta (+356)</option>
        <option data-countrycode="MH" value="+692">Marshall Islands (+692)</option>
        <option data-countrycode="MQ" value="+596">Martinique (+596)</option>
        <option data-countrycode="MR" value="+222">Mauritania (+222)</option>
        <option data-countrycode="MU" value="+230">Mauritius (+230)</option>
        <option data-countrycode="YT" value="+262">Mayotte (+262)</option>
        <option data-countrycode="MX" value="+52">Mexico (+52)</option>
        <option data-countrycode="FM" value="+691">Micronesia, Federated States of (+691)</option>
        <option data-countrycode="MD" value="+373">Moldova (+373)</option>
        <option data-countrycode="MC" value="+377">Monaco (+377)</option>
        <option data-countrycode="MN" value="+976">Mongolia (+976)</option>
        <option data-countrycode="MS" value="+1-664">Montserrat (+1-664)</option>
        <option data-countrycode="MA" value="+212">Morocco (+212)</option>
        <option data-countrycode="MZ" value="+258">Mozambique (+258)</option>
        <option data-countrycode="MM" value="+95">Myanmar (+95)</option>
        <option data-countrycode="NA" value="+264">Namibia (+264)</option>
        <option data-countrycode="NR" value="+674">Nauru (+674)</option>
        <option data-countrycode="NP" value="+977">Nepal (+977)</option>
        <option data-countrycode="NL" value="+31">Netherlands (+31)</option>
        <option data-countrycode="AN" value="+599">Netherlands Antilles (+599)</option>
        <option data-countrycode="NC" value="+687  ">New Caledonia (+687 )</option>
        <option data-countrycode="NZ" value="+64">New Zealand (+64)</option>
        <option data-countrycode="NI" value="+505">Nicaragua (+505)</option>
        <option data-countrycode="NE" value="+227">Niger (+227)</option>
        <option data-countrycode="NG" value="+234">Nigeria (+234)</option>
        <option data-countrycode="NU" value="+683">Niue (+683)</option>
        <option data-countrycode="NF" value="+672">Norfolk Island (+672)</option>
        <option data-countrycode="MP" value="+1-670">Northern Mariana Islands (+1-670)</option>
        <option data-countrycode="NO" value="+47">Norway (+47)</option>
        <option data-countrycode="OM" value="+968">Oman (+968)</option>
        <option data-countrycode="PK" value="+92">Pakistan (+92)</option>
        <option data-countrycode="PW" value="+680">Palau (+680)</option>
        <option data-countrycode="PA" value="+507">Panama (+507)</option>
        <option data-countrycode="PG" value="+675">Papua New Guinea (+675)</option>
        <option data-countrycode="PY" value="+595">Paraguay (+595)</option>
        <option data-countrycode="PE" value="+51">Peru (+51)</option>
        <option data-countrycode="PH" value="+63">Philippines (+63)</option>
        <option data-countrycode="PN" value="+64">Pitcairn (+64)</option>
        <option data-countrycode="PL" value="+48">Poland (+48)</option>
        <option data-countrycode="PT" value="+351">Portugal (+351)</option>
        <option data-countrycode="PR" value="+1-787">Puerto Rico (+1-787)</option>
        <option data-countrycode="RE" value="+262">Reunion (+262)</option>
        <option data-countrycode="RO" value="+40">Romania (+40)</option>
        <option data-countrycode="RU" value="+7">Russian Federation (+7)</option>
        <option data-countrycode="RW" value="+250">Rwanda (+250)</option>
        <option data-countrycode="KN" value="+1-869">Saint Kitts and Nevis (+1-869)</option>
        <option data-countrycode="LC" value="+1-758">Saint Lucia (+1-758)</option>
        <option data-countrycode="VC" value="+1-784">Saint Vincent and the Grenadines (+1-784)</option>
        <option data-countrycode="WS" value="+685">Samoa (+685)</option>
        <option data-countrycode="SM" value="+378">San Marino (+378)</option>
        <option data-countrycode="ST" value="+239">Sao Tome and Principe (+239)</option>
        <option data-countrycode="SN" value="+221">Senegal (+221)</option>
        <option data-countrycode="SC" value="+248">Seychelles (+248)</option>
        <option data-countrycode="SL" value="+232">Sierra Leone (+232)</option>
        <option data-countrycode="SK" value="+421">Slovakia (Slovak Republic) (+421)</option>
        <option data-countrycode="SI" value="+386">Slovenia (+386)</option>
        <option data-countrycode="SB" value="+677">Solomon Islands (+677)</option>
        <option data-countrycode="SO" value="+252">Somalia (+252)</option>
        <option data-countrycode="GS" value="+500">South Georgia and the South Sandwich Islands (+500)</option>
        <option data-countrycode="ES" value="+34">Spain (+34)</option>
        <option data-countrycode="LK" value="+94">Sri Lanka (+94)</option>
        <option data-countrycode="SH" value="+290">Saint Helena, Ascension and Tristan da Cunha (+290)</option>
        <option data-countrycode="PM" value="+508">St. Pierre and Miquelon (+508)</option>
        <option data-countrycode="SD" value="+249">Sudan (+249)</option>
        <option data-countrycode="SR" value="+597">Suriname (+597)</option>
        <option data-countrycode="SJ" value="+47">Svalbard and Jan Mayen Islands (+47)</option>
        <option data-countrycode="SZ" value="+268">Swaziland (+268)</option>
        <option data-countrycode="SE" value="+46">Sweden (+46)</option>
        <option data-countrycode="CH" value="+41">Switzerland (+41)</option>
        <option data-countrycode="SY" value="+963">Syrian Arab Republic (+963)</option>
        <option data-countrycode="TW" value="+886">Taiwan (+886)</option>
        <option data-countrycode="TJ" value="+992">Tajikistan (+992)</option>
        <option data-countrycode="TZ" value="+255">Tanzania, United Republic of (+255)</option>
        <option data-countrycode="TH" value="+66">Thailand (+66)</option>
        <option data-countrycode="TG" value="+228">Togo (+228)</option>
        <option data-countrycode="TK" value="+690">Tokelau (+690)</option>
        <option data-countrycode="TO" value="+676">Tonga (+676)</option>
        <option data-countrycode="TT" value="+1-868">Trinidad and Tobago (+1-868)</option>
        <option data-countrycode="TN" value="+216">Tunisia (+216)</option>
        <option data-countrycode="TR" value="+90">Turkey (+90)</option>
        <option data-countrycode="TM" value="+993">Turkmenistan (+993)</option>
        <option data-countrycode="TC" value="+1-649">Turks and Caicos Islands (+1-649)</option>
        <option data-countrycode="TV" value="+688">Tuvalu (+688)</option>
        <option data-countrycode="UG" value="+256">Uganda (+256)</option>
        <option data-countrycode="UA" value="+380">Ukraine (+380)</option>
        <option data-countrycode="GB" value="+44">United Kingdom (+44)</option>
        <option data-countrycode="US" value="+1">United States (+1)</option>
        <option data-countrycode="UM" value="+246">United States Minor Outlying Islands (+246)</option>
        <option data-countrycode="UY" value="+598">Uruguay (+598)</option>
        <option data-countrycode="UZ" value="+998">Uzbekistan (+998)</option>
        <option data-countrycode="VU" value="+678">Vanuatu (+678)</option>
        <option data-countrycode="VA" value="+379">Vatican City State (Holy See) (+379)</option>
        <option data-countrycode="VE" value="+58">Venezuela (+58)</option>
        <option data-countrycode="VN" value="+84">Vietnam (+84)</option>
        <option data-countrycode="VG" value="+1-284">Virgin Islands (British) (+1-284)</option>
        <option data-countrycode="VI" value="+1-340">Virgin Islands (U.S.) (+1-340)</option>
        <option data-countrycode="WF" value="+681">Wallis and Futuna Islands (+681)</option>
        <option data-countrycode="EH" value="+212">Western Sahara (+212)</option>
        <option data-countrycode="YE" value="+967">Yemen (+967)</option>
        <option data-countrycode="RS" value="+381">Serbia (+381)</option>
        <option data-countrycode="ZM" value="+260">Zambia (+260)</option>
        <option data-countrycode="ZW" value="+263">Zimbabwe (+263)</option>
        <option data-countrycode="AX" value="+358">Aaland Islands (+358)</option>
        <option data-countrycode="PS" value="+970">Palestine (+970)</option>
        <option data-countrycode="ME" value="+382">Montenegro (+382)</option>
        <option data-countrycode="GG" value="+44-1481">Guernsey (+44-1481)</option>
        <option data-countrycode="IM" value="+44-1624">Isle of Man (+44-1624)</option>
        <option data-countrycode="JE" value="+44-1534">Jersey (+44-1534)</option>
        <option data-countrycode="CW" value="+599">CuraÃ§ao (+599)</option>
        <option data-countrycode="CI" value="+225">Ivory Coast (+225)</option>
        <option data-countrycode="XK" value="+383">Kosovo (+383)</option>
    `)

// modal
var id;
$('[data-target][data-toggle=modal]').on('click', function () {
    id = $(this).attr('data-target');
    Title = {
        'Homemeeting': "Put your interests in action, get all the details right now.",
        'DownloadBrochure': "Mention your whatsapp number to receive Brochure on whatsapp",
        'PriceSection': "Get explicit details about the pricing and on spot offers",
        'FloorPlan': "You are trying to download a big file, get it on Whatsapp",
        'Location': "Due to huge rush at site we would request you to book your sitevisit in advance",
        'Gallery': "Inside features of the project at a glance",
        'video_call': 'Virtual Zoom Meetings - With the Experts',
        'default': "PLEASE SHARE YOUR DETAILS. OUR SALES EXPERT WILL CALL YOU SHORTLY"
    }
    $('.modal.form h4').text(Title[id])
    $('.modal.form').attr('id', id).modal('show');

});
var projectId;
var RegNo;
var city;
var is_magnet = 0;
var magnet_id;
var magnet_number;
var IVR_phone_no;
var whatsappNumber;

let apiDataGet = async () => {
   getProjectData(5693)       // Change Project_ID Integer Value only Ex:1131
        .then((data) => {          
            projectId = data.result.Project.p_id;
            IVR_phone_no = data.result.magnet_id ? data.result.magnet_number : data.result.phone;
            whatsappNumber= data.result.whatsupUser.phone;
            whatsapp_url = data.result.wp_links_sms;
            whatsapp_url = whatsapp_url.split("=");
            whatsapp_url[1] = data.result.magnet_id ? ("+91" + data.result.magnet_number + "&text") : whatsapp_url[1];
            whatsapp_url[2] = "I want to know more about " + whatsapp_url[2];
            whatsapp_url = whatsapp_url.join("=");
            city = data.result.Project.Region.city;
            RegNo = data.result.Project.Region.region_name;
            is_magnet = data.result.is_magnet;
            magnet_id = data.result.magnet_id ? data.result.magnet_id : null;
            // $(".phone_url").attr("href", "tel:" + IVR_phone_no?IVR_phone_no:917948540394 + "");
            // $(".whatsapp_url").attr("href", whatsapp_url + ".");
            // $(".phone_no").html(IVR_phone_no?IVR_phone_no:917948540394);
            const phoneNumberElements=document.getElementsByClassName('IVR_Phone_No_Text')
            for (let i = 0; i < phoneNumberElements.length; i++) {
                phoneNumberElements[i].innerText = IVR_phone_no ? IVR_phone_no : '+917948540394';
              }
            const phoneUrlElements = document.getElementsByClassName('IVR_Phone_No_Url');
            for (let i = 0; i < phoneUrlElements.length; i++) {
                phoneUrlElements[i].href = `tel:${IVR_phone_no?IVR_phone_no:+917948540394}`;
              }
            
            const whatsappUrlElement = document.getElementsByClassName('whatsapp_url');
            for (let i = 0; i < whatsappUrlElement.length; i++) {
                whatsappUrlElement[i].href = `https://api.whatsapp.com/send?phone=+91${whatsappNumber?whatsappNumber:+918976997450}&text=I want to know more about ${data.result.Project.project_name}`; // Replace with your new phone number
              }
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

$('#ModalFormSlug1').on("submit", function () {
    var name = $('#dropEnquiry_Name').val();
    var email = null;
    var country_code = $('#dropEnquiry_CountryCode').val();
    var number = $('#dropEnquiry_Number').val();
    // var checkbox = $('#dropEnquiry_CheckBox').val();
    saveLead(name, email, country_code, number, 'top_enquire_form');
    return !1
})
$('#ModalFormSlug4').on("submit", function () {
    var name = $('#dropEnquiry_Name1').val();
    var email = null;
    var country_code = $('#dropEnquiry_CountryCode1').val();
    var number = $('#dropEnquiry_Number1').val();
    // var checkbox = $('#dropEnquiry_CheckBox').val();
    saveLead(name, email, country_code, number, 'top_enquire_form');
    return !1
})
$('#ModalFormSlug2').on("submit", function () {
    var name = $('#ModalForm_Name').val();
    var email = null;
    var country_code = $('#ModalForm_CountryCode').val();
    var number = $('#ModalForm_Number').val();
    // var checkbox = $('#ModalForm_CheckBox').val();
    saveLead(name, email, country_code, number, id + '_overview_homepage');
    return !1
})
$('#ModalFormSlug3').on("submit", function () {
    var name = $('#PopUp_name').val();
    var email = null;
    var country_code = $('#PopUp_CountryCode').val();
    var number = $('#PopUp_number').val();
    // var checkbox = $('#PopUp_checkbox').val();
    saveLead(name, email, country_code, number, 'PopUp_form_overview_homepage');
    return !1
})

queryForm();
// var self = window.location.toString();
// var utmContent = self.includes("utm_content=Search"||"utm_utm_campaign=Search");

async function saveLead(name, email, country_code, number, tracking_lead_id, pref) {

    var getUtmData = queryForm();
    var ipAddress = await getIpAddress();
    var user_device = deviceData();
    var user_browser = browserData();

    var obj = {};
    obj.name = name;
    obj.email = email;
    obj.country_code = country_code;
    obj.number = number;
    obj.tracking_lead_id = tracking_lead_id;
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
        campaing_type: getUtmData ? getUtmData.utmcampaign : null,
        launch_name: "",
        client_ipaddress: ipAddress,
        client_pref: pref
    }
    if (is_magnet === 1) {
        obj.is_magnet = is_magnet;
        obj.magnet_id = magnet_id;
        obj.source_id = 49;
    }
    
    else {
        obj.source_id = 31;
    }
    localStorage.setItem("submittedCountryCode", country_code);
localStorage.setItem("submittedPhone", number);

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    event: 'formSubmitted',
    phone_number: `${country_code}${number}`
});

    if (pref == 'DownloadBrochure_overview_homepage') {
        SendLead(obj, "thankyou.html");
    } else {
        SendLead(obj, "thankyou.html");
    }
}
