$(document).ready(function(){
	console.log("we scrollin'");
	$(window).scroll(function () {
			if ($(this).scrollTop() > 80) {
				console.log("scrolling 50+");
				$('#back-to-top').fadeIn();
			} else {
				console.log("scrolling");

				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
});