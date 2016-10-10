/*
 *  col-same-height - v1.0.0
 *  A jQuery plugin to keep columns at the same height
 *  
 *
 *  Author Joseph McMurray (pixel programmer)
 *  Website http://pixelprogrammer.net
 *  Under ISC License
 */
(function($) {

	var settings = null;

	$.fn.colSameHeight = function(options) {

		var el = this;

		var defaults = {
			breakpointCBs: {}, // breakpoint callback functions
		};

		settings = $.extend(defaults, options);

		setColSameHeight(el);
		$(window).resize(function() {
			setColSameHeight(el);
		});
	};

	function getCols(el) {
		
		var rows = {}; // we will use key maps
		el.each(function() {
			
			// check if there is a break point to stop setting its height
			var breakpoint = $(this).attr('data-col-break');

			if( $.isFunction(settings.breakpointCBs[breakpoint]) ) {
				// if false then we don't want to do anything
				if( !settings.breakpointCBs[breakpoint].call(this) ) {
					return;
				}
			}
			
			var group = $(this).attr('data-col-group');
			if( !(group in rows) ) {
				rows[group] = [];
			}

			rows[group].push(this);
		});

		return rows;
	}

	function setColSameHeight(el) {
		// reset the height so we can calculate it
		el.css('height', 'auto');
		
		var rows = getCols(el);
		var max_height;
		var height;

		for(var group in rows) {

			max_height = 0;

			if( rows.hasOwnProperty(group) ) {

				for( var i=0; i<rows[group].length; i++) {
					var element = $(rows[group][i]);

					var imgs = element.find('img');
					for(var j=0; j < imgs.length; j++) {
						attachImgHandler(imgs[j], rows[group]);
					}

					height = element.outerHeight();

					if( height > max_height ) {
						max_height = height;
					}
				}

				$(rows[group]).css('height', max_height);
			}
		}
	}

	function colEqualImgLoad(e) {
		setColSameHeight(e.data.el);
		
		$(e.currentTarget).off('load', colEqualImgLoad);
	}

	function attachImgHandler(img, group) {
		// attach a load event for when the image has not fully loaded.
		// We want to fire setColSameHeight() again as the img height from a loaded img can change the column height after the page has loaded
		if(!$(img).prop('complete')) {
			// pass in a reference to the group elements for the load object
			$(img).on('load', {el: $(group)}, colEqualImgLoad);
		}
	}
}(jQuery));