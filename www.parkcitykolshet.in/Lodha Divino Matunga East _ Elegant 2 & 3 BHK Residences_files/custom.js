$(function () {
	"use strict";
	$('[data-toggle="tooltip"]').tooltip();
});


// $(window).on('load', function () {
// 	var delayMs = 10000; // delay in milliseconds

// 	setTimeout(function () {
// 		$('#enquire-modal').modal('show');
// 	}, delayMs);
// });


$(document).ready(function () {

	//code for Whatsapp message
	let urlString = window.location.href;
	console.log(urlString);
	$(document).ready(function () {
		const url = new URL(urlString);
		$(".website_url").val(url.href);
		const utm_source = url.searchParams.get('utm_source');
		const mainsource = url.searchParams.get('mainsource');

		// Check if the URL parameter is from utm_source
		if (utm_source) {
			// Check if the URL parameter is Google or google
			if (utm_source.toLowerCase() === 'google') {
				// document.getElementById('discovery').href = "https://api.whatsapp.com/send?phone=917304824642&text=Hello%2C%20I%20would%20like%20to%20explore%20further%20details%20about%20Lodha%20Divino%20-%20Matunga%20East,%20Mumbai.";
				// document.getElementById('discovery_mobile').href = "https://api.whatsapp.com/send?phone=917304824642&text=Hello%2C%20I%20would%20like%20to%20explore%20further%20details%20about%20Lodha%20Divino%20-%20Matunga%20East,%20Mumbai.";
					var whatsappBtnDesktop = document.getElementById("discovery");
            if (whatsappBtnDesktop) {
                whatsappBtnDesktop.parentNode.removeChild(whatsappBtnDesktop);
            }
            var whatsappBtnMobile = document.getElementById("discovery_mobile");
            if (whatsappBtnMobile) {
                whatsappBtnMobile.parentNode.removeChild(whatsappBtnMobile);
            }
			} else if (utm_source.toLowerCase() === 'ppc') {
				document.getElementById('discovery').href = "https://api.whatsapp.com/send?phone=917304824642&text=Hi%20I'm%20interested%20in%20Learning%20more%20About%20Lodha%20Divino%20-%20Matunga%20East,%20Mumbai.%20Please%20Share%20Details.";
				document.getElementById('discovery_mobile').href = "https://api.whatsapp.com/send?phone=917304824642&text=Hi%20I'm%20interested%20in%20Learning%20more%20about%20Lodha%20Divino%20-%20Matunga%20East,%20Mumbai.%20Please%20Share%20Details.";
			}
		} else if (mainsource) { // Check if the URL parameter is from mainsource
			// Check if the URL parameter is GoogleY, GoogleA, etc.
			if (mainsource.toLowerCase() === 'google') {
				// document.getElementById('discovery').href = "https://api.whatsapp.com/send?phone=917304824642&text=Hello%2C%20I%20would%20like%20to%20explore%20further%20details%20about%20Lodha%20Divino%20-%20Matunga%20East,%20Mumbai.";
				// document.getElementById('discovery_mobile').href = "https://api.whatsapp.com/send?phone=917304824642&text=Hello%2C%20I%20would%20like%20to%20explore%20further%20details%20about%20Lodha%20Divino%20-%20Matunga%20East,%20Mumbai.";
					var whatsappBtnDesktop = document.getElementById("discovery");
            if (whatsappBtnDesktop) {
                whatsappBtnDesktop.parentNode.removeChild(whatsappBtnDesktop);
            }
            var whatsappBtnMobile = document.getElementById("discovery_mobile");
            if (whatsappBtnMobile) {
                whatsappBtnMobile.parentNode.removeChild(whatsappBtnMobile);
            }
			} else if (mainsource.toLowerCase() === 'ppc') {
				document.getElementById('discovery').href = "https://api.whatsapp.com/send?phone=917304824642&text=Hi%20I'm%20interested%20in%20Learning%20more%20About%20Lodha%20Divino%20-%20Matunga%20East,%20Mumbai.%20Please%20Share%20Details.";
				document.getElementById('discovery_mobile').href = "https://api.whatsapp.com/send?phone=917304824642&text=Hi%20I'm%20interested%20in%20Learning%20more%20about%20Lodha%20Divino%20-%20Matunga%20East,%20Mumbai.%20Please%20Share%20Details.";
			}
		}
	});


	/////form name submission code//////////
	$(".custom-btn").click(function () {
		var myBookId = $(this).data('id');
		$(".form_name").val(myBookId);
		//document.getElementsByName('form_name').value = myBookId;
	});

	$(".data-id-btn").click(function () {
		var myBookId = $(this).data('id');
		$(".form_name").val(myBookId);
		//document.getElementsByName('form_name').value = myBookId;
	});




	// code for button more and less
	$(".moreBtn").click(function () {
		if ($(this).html() === 'Read more <i class="fa fa-chevron-down"></i>') {
			$(this).html('Read less <i class="fa fa-chevron-up"></i>');
		}
		else {
			$(this).html('Read more <i class="fa fa-chevron-down"></i>');
		}
		$(".moreText[data-hit=more" + $(this).data('target') + "]").slideToggle(500);
	});


	$(".moredisclaimerBtn").click(function () {
		if ($(this).html() === 'Read more <i class="fa fa-chevron-down"></i>') {
			$(this).html('Read less <i class="fa fa-chevron-up"></i>');
		}
		else {
			$(this).html('Read more <i class="fa fa-chevron-down"></i>');
		}
		$(".moredisclaimerText[data-hit=more" + $(this).data('target') + "]").slideToggle(500);
	});



// 	var exampleModal = document.getElementById('enquire-modal')
// 	exampleModal.addEventListener('show.bs.modal', function (event) {
// 		// Button that triggered the modal
// 		var button = event.relatedTarget
// 		// Extract info from data-bs-* attributes
// 		var recipient = button.getAttribute('data-bs-whatever')
// 		// If necessary, you could initiate an AJAX request here
// 		// and then do the updating in a callback.
// 		//
// 		// Update the modal's content.
// 		var modalTitle = exampleModal.querySelector('.modal-title')

// 		modalTitle.textContent = recipient
// 		modalBodyInput.value = recipient
// 	})



	if ($(window).innerWidth() < 576) {
		clearInterval(formInterval);
	}


	$(".num").on("keyup", function (e) {
		if (this.value != "") {
			$(".check").prop("checked", "checked");
		} else {
			$(".check").prop('checked', "");
		}
	});


	// Popup youtube JS
	$('.popup-youtube').magnificPopup({
		disableOn: 320,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});


});


///form submit///
function submitForm(event, formName) {
	event.preventDefault(); // Prevent default form submission
	var price = $(".price-sub-text").text();
	// alert(price);
	// Get form data
	var formData = new FormData(document.forms[formName]);
	var currentUrl = window.location.href; // Capture current URL

	// Clear previous errors
	var errorMessages = document.querySelectorAll('.error');
	errorMessages.forEach(function (error) {
		error.style.display = 'none';
	});

	// Get name and phone values
	var nameValue = formData.get('name');
	var phoneValue = formData.get('mobile');
	var formnameValue = formData.get('form_name');

	// Validate name and phone
	// var nameError = document.querySelectorAll('.error')[0];
	// var phoneError = document.querySelectorAll('.error')[1];
	var nameError = document.forms[formName].querySelectorAll('.error')[0];
	var phoneError = document.forms[formName].querySelectorAll('.error')[1];


	// If both fields are empty, display both error messages
	if (!nameValue && !phoneValue) {
		nameError.style.display = 'block';
		phoneError.style.display = 'block';
		return;
	}
	// Validate name and phone
	if (!nameValue) {
		nameError.style.display = 'block';
		document.querySelectorAll('.error')[0].style.display = 'block';
		return; // Exit function if name is empty
	}

	if (!phoneValue) {
		phoneError.style.display = 'block';
		return; // Exit function if phone is empty
	}


	var form_data = {
		name: formData.get('name'),
		email: formData.get('email'),
		mobile: formData.get('mobile'),
		mobile: formData.get('mobile'),
		form_name: formData.get('form_name'),
		website_url: formData.get('website_url'),
		price : price,
		currentUrl
	}

	// Add current URL to form data
	// Add current URL to form data
	formData += '&currentUrl=' + encodeURIComponent(currentUrl);
	// console.log(formData);
	// AJAX request
	$.ajax({
		type: 'POST',
		url: 'send_email.php',
		data: form_data,

		success: function (response) {
			if (formnameValue === 'Brochure') {
				window.location.href = 'thank-you?formName=Brochure'; // Redirect to xyx.html
				// 	window.location.href = 'thank-you.html';
			} else {
				window.location.href = 'thank-you.html'; // Redirect to thank-you.html
			}
		},
		error: function (xhr, status, error) {
// 			alert('Error occurred. Status: ' + xhr.status);
				window.location.href = 'thank-you.html';
		}
	});

}




////////whatsapp message ///////
// $(document).ready(function () {
// 	let url = window.location.href;
// 	let urlString = url.toString();
// 	  $.ajax({
// 		  url: "visitor.php",
// 		  type: "POST",
// 		  data: ({url: urlString}),
// 		  dataType:'json', // add json datatype to get json
// 			  success: function(data) {
// 				console.log ('success');
// 			  }
// 		});
//   });