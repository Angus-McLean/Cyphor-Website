/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
	if ($(".navbar").offset().top > 50) {
		$(".navbar-fixed-top").addClass("top-nav-collapse");
	} else {
		$(".navbar-fixed-top").removeClass("top-nav-collapse");
	}
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
	$('.navbar-toggle:visible').click();
});

// fading slogan
$(function() {
	var arrPoints = ['Facebook', 'Gmail', 'Slack', 'LinkedIn', 'Skype', 'Twitter'];
	var arrInd = 0;
	setInterval(function () {
		arrInd++;
		arrInd = arrInd % arrPoints.length;
		fadeInText($('#rotateWord')[0], arrPoints[arrInd]);
	}, 3000);

	function fadeInText(element, insertText) {
		element.classList.add('hide-text');
		element.classList.remove('show-text');
		setTimeout(function() {
			element.textContent = insertText;
		}, 700);
		setTimeout(function() {
			element.classList.remove('hide-text');
			element.classList.add('show-text');
		}, 700);
	}
})

// Form input css
$('#contactform [name="email"]').blur(function () {
	var inputElem = $('#contactform [name="email"]');
	if(inputElem.val() != ""){
		inputElem.prop('required',true);
	} else {
		inputElem.prop('required',false);
	}
})


////// Form submissions //////
$('#subscribe-btn').click(function() {
	$('#subscribeform [type=submit]').click();
});

$('#subscribeform').submit(function(e) {
	console.log('subscribe submit');
	e.preventDefault();
	var nofill_val = $('input[name=subscribenofill]').val();
	if(nofill_val == ''){
		$.post('/forms/subscribe', $('#subscribeform').serialize(), function(data) {

				console.log(data);
				$('#subscribe-btn > span')[0].innerText =  " THANK YOU!";
				$('#subscribeform').reset();
				setTimeout(function () {
					$('#subscribe-btn > span')[0].innerText =  " SUBSCRIBE";
				}, 5000);
			}
		);
	}
	return false;
});

$('#contact-btn').click(function() {
	$('#contactform [type=submit]').click()
});

$('#contactform').submit(function(e) {
	console.log('contactform submit');
	e.preventDefault();
	var nofill_val = $('input[name=contactnofill]').val();
	if(nofill_val == ''){
		$.post('/forms/contact', $('#contactform').serialize(), function(data) {
				console.log(data);
				$('#contact-btn > span')[0].innerText =  " THANK YOU!";
				$('#contactform').reset();
				setTimeout(function () {
					$('#contact-btn > span')[0].innerText =  " SUBMIT";
				}, 5000);
			}
		);
	}
	return false;
});

$(document).ready(function() {
	$('.open-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		iframe : {
			markup : '<div class="mfp-iframe-scaler">'+
			'<div class="mfp-close"></div>'+
			'<iframe width="560" height="315" src="https://www.youtube.com/embed/rNh4tvw3Zmo?autoplay=1" frameborder="0" allowfullscreen></iframe>'+
		  '</div>'
		},

		fixedContentPos: false
	});
});
