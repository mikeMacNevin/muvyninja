//plugin to fix touch/click - https://medium.com/@electrokinetix1/better-touch-vs-click-handling-in-jquery-f974a0144b2

$.fn.touch = function (callback) {
    $.touchMove = false;
    $.touch = false;
    $.touchAction = "";
    $(this).on("click", function (e) {
        if (!$.touch) {
            $.touchAction = 'click';
            let callbackReal = callback.bind(this);
            callbackReal(this, e);
        } else {
            $.touch = true;
        }
        $.touch = false;
    });
    $(this).on("touchend", function (e) {
        $(this).blur();
        if (typeof e.touches != typeof undefined) {
            e.preventDefault();
            $.touch = true;
            if ($.touchMove) {
                $.touchMove = false;
                return false;
            } else {
                $.touchAction = 'touch';
                let callbackReal = callback.bind(this);
                callbackReal(this, e);
            }
        }
    });
    $(this).on("touchmove", function (e) {
        $.touchMove = true;
    });
}	

// move 	
	$(window).scroll(function () {
			if ($(this).scrollTop() > 80) {
				$('#back-to-top').fadeIn();
			} else {

				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
