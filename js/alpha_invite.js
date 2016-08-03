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

////// Form submissions //////
$('#alpha_invite-btn').click(function() {
	$('#alpha_invite [type=submit]').click();
});

$('#alpha_invite').submit(function(e) {
	console.log('subscribe submit');
	e.preventDefault();
	var nofill_val = $('input[name=subscribenofill]').val();
	if(nofill_val == ''){
		$.post('/auth/invite', $('#alpha_invite').serialize(), function(data) {
				// successful login
				console.log(data);
				$('#error-message').html('Great your friend is signed up! <br/> Don\'t forget to send them their invite token.');
			}
		).fail(function (e) {
			console.error(e);
			$('#error-message').text(e.responseText);
			setTimeout(function () {
				$('#error-message').text('');
			}, 5000);
		});
	}
	return false;
});
