/**
 * ArgonBox v1.0 - jQuery lightbox plugin
 * Björn Hansson - 2012
 * License: http://licence.visualidiot.com/
 */
(function($) {
	$.fn.argonBox = function(options) {
		options = $.extend({}, $.fn.argonBox.defaults, options);
		
		return this.each(function() {
		
			var windowHeigth = window.innerHeight || $(window).height(), // Make it work on iPad & Android
				windowWidth  = window.innerWidth  || $(window).width(),
				allLinks = $('.argonbox a'),
				pos,
				prev,
				next,
				
				// (methods not finished yet)
				methods = {
					init : function( options ) {
						// will be used later
					},
					show : function( ) {
						// will be used later
					},
					close : function( ) { 
						$('#overlay, #lightbox').remove();
						$('body').css('overflow-y', 'auto'); // Show scrollbars
						$('a').removeClass('current');
					},
					update : function( content ) {
						// will be used later
					}
				};
			// End of var declaration.
			
			
			$('body').css('overflow-y', 'hidden'); // Hide scrollbars
	
			// Display the overlay
			$('<div id="overlay"></div>')
			.css('opacity', '0')
			.animate({'opacity' : options.opacity}, options.duration)
			.appendTo('body');
	
			// Create the lightbox container
			$('<div id="lightbox"></div>')
			.hide()
			.appendTo('body');
	
			// Display the image on load
			$('<img>')
			.attr('src', $(this).attr('href'))
			.css({
				'max-height': windowHeigth-40, // -40, so that the description is visible.
				'max-width':  windowWidth-40
			})
			.load(function() {
				$('#lightbox')
				.css({
					'top':  (windowHeigth - $('#lightbox').height()) / 2,
					'left': (windowWidth  - $('#lightbox').width())  / 2
				})
				.fadeIn();
			})
			.appendTo('#lightbox');
			
			// Create the description container
			$('<div id="description"></div>')
			.text($(this).attr('title'))
			.appendTo('#lightbox');
			
			// Create the navigation container
			if(options.bootstrap) { // If you want to use Bootstrap. (Bootstrap must of course be included in your site)
				$('<div id="navigation"><a href="#" id="previous" class="btn btn-small"><i class="icon-arrow-left"></i></a> <a href="#" id="next" class="btn btn-small"><i class="icon-arrow-right"></i></a></div>')
				.appendTo('#description');
			}
			else { // else use the standard buttons: www.glyphicons.com - http://creativecommons.org/licenses/by/3.0/
				$('<div id="navigation"><a href="#" id="previous" class="previousBtn">&nbsp;</a> <a href="#" id="next" class="nextBtn">&nbsp;</a></div>')
				.appendTo('#description');
			}
			
			// Current link/image
			$(this).addClass('current');
			
			// Previous link click
			$('#previous').click(function() {
				pos = allLinks.index($('a.current'));
				prev = allLinks.get(pos-1); // Find previous from current
				
				methods.close();

				prev.click(); // Make this current
				return false;
			});
			
			// Next link click
			$('#next').click(function() {
				pos = allLinks.index($('a.current'));
				next = allLinks.get(pos+1);
				
				if(!next) {
					next = allLinks.get(0);
				}
				methods.close();

				next.click();
				return false;
			});
	  
			// Remove it all on click
			$('#overlay, #lightbox').click(function() {
				methods.close();
			});
		});
	};

	$.fn.argonBox.defaults = {
		'duration': 'fast',
		'opacity': '0.9',
		'bootstrap': false,
		'navigation': true,
	}
}) (jQuery);