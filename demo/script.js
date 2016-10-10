$(document).ready(function() {
	$('.col-same-height').colSameHeight({
		breakpointCBs: {
			lg: function(el) {
				var screen_width = $(window).width();
				if( screen_width > 800 ) {
					return true;
				}

				return false;
			}
		}
	});
});