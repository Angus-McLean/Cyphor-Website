/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

var config = {};

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

// check if already signed in
$.get('/users/me', function (data) {
	if(!data) return;
	$('#displayname').text(data.email.match(/(.+)@/)[1]);
	$('#email').text(data.email);
	$('#row-signin').css('display','none');
	$('#row-download').css('display','');
	getChromeLink();
});

////// Form submissions //////
$('#alphasignin-btn').click(function() {
	$('#alphasignin [type=submit]').click();
});

$('#alphasignin').submit(function(e) {
	console.log('subscribe submit');
	e.preventDefault();
	var nofill_val = $('input[name=subscribenofill]').val();
	if(nofill_val == ''){
		$.post('/auth/signin', $('#alphasignin').serialize(), function(data) {
				// successful login
				console.log(data);

				$('#email').text(data.email);
				$('#row-signin').css('display','none');
				$('#row-download').css('display','');
				getChromeLink();
			}
		).fail(function (e) {
			console.error(e);
			$('#error-message').text('Unknown user or invalid password');
			setTimeout(function () {
				$('#error-message').text('');
			}, 1000);
		});
	}
	return false;
});

function getChromeLink() {
	$.get('/alpha/config', function (data) {
		config.extension_url = data.extension_url;
		var link = document.createElement('link');
		link.rel = 'chrome-webstore-item';
		link.href = data.extension_url;
		document.head.appendChild(link);
	});
}

function handleChromeInstallation () {
	console.log('triggered');
	var url = config.chrome_ext_url;
	chrome.webstore.install(url, function () {
		// redirect user to how to page
		//window.location = '/how_to';
		$('#download-errors').html('Thank you for installing Cyphor! We look forward to hearing your feedback at <a href="mailto:support@cyphor.io">support@cyphor.io</a>');
		console.log('successful extension install');
	}, function (e) {
		// chrome installation failed.. possibly be cause they're not signed in in the browser

		//$('#download-errors').text('Looks like there was a problem. Are you sure you\'re signed in to your Chrome Browser? \n Checkout "Trouble Installing?" below.');
		//$('#download-errors').html($('#download-errors').html().replace(/\n/g,'<br/>'));
		console.error('failed extension install', e);
	});
}
