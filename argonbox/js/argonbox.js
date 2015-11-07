/**
 * Argonbox - jQuery lightbox plugin
 * Author: Björn Hansson
 * License: http://licence.visualidiot.com/
 */
(function($) {
    'use strict';

    $.fn.argonbox = function(options) {
        options = $.extend({}, $.fn.argonbox.defaults, options);

        return this.each(function() {
            var WINDOW_PADDING = 50,
                WINDOW_HEIGHT = window.innerHeight || $(window).height(), // Make it work on iPad & Android
                WINDOW_WIDTH = window.innerWidth || $(window).width(),
                allImgLinks = $('.argonbox a'),
                currentPos,
                prevImgLink,
                nextImgLink,
                lightbox = {
                    init: function() {
                        $('body').css('overflow-y', 'hidden'); // Hide scrollbars

                        // Display the overlay
                        $('<div id="argonbox-overlay"></div>')
                            .css('opacity', '0')
                            .animate({
                                'opacity': options.opacity
                            }, options.duration)
                            .appendTo('body');

                        // Create the lightbox container, but hidden
                        $('<div id="argonbox-lightbox"></div>')
                            .hide()
                            .appendTo('body');

                        // Create the description container
                        $('<div id="argonbox-description"><strong></strong></div>').appendTo('#argonbox-lightbox');

                        // Only add the navigation container if more than one image
                        if (allImgLinks.length > 1) {
                            if (options.bootstrap) { // If you want to use buttons from Bootstrap. (Bootstrap must of course be included in your site)
                                $('<div id="argonbox-navigation"><a href="#" id="argonbox-previous" class="btn btn-small"><i class="icon-arrow-left"></i></a> <a href="#" id="argonbox-next" class="btn btn-small"><i class="icon-arrow-right"></i></a></div>')
                                    .appendTo('#argonbox-description');
                            } else { // else use the standard buttons: www.glyphicons.com - http://creativecommons.org/licenses/by/3.0/
                                $('<div id="argonbox-navigation"><a href="#" id="argonbox-previous" class="argonbox-previousBtn">&nbsp;</a> <a href="#" id="argonbox-next" class="argonbox-nextBtn">&nbsp;</a></div>')
                                    .appendTo('#argonbox-description');
                            }
                        }

                        $('#argonbox-previous').click(function() {
                            lightbox.previous();
                            return false;
                        });

                        $('#argonbox-next').click(function() {
                            lightbox.next();
                            return false;
                        });

                        $('#argonbox-overlay').click(function() {
                            lightbox.close();
                            return false;
                        });
                    },
                    show: function() {
                        // Display the image on load
                        $('<img>')
                            .attr('src', $('a.argonbox-current').attr('href'))
                            .css({
                                'max-height': WINDOW_HEIGHT - WINDOW_PADDING, // So that the description is visible.
                                'max-width': WINDOW_WIDTH - WINDOW_PADDING
                            })
                            .load(function() {
                                $('#argonbox-lightbox')
                                    .css({
                                        'top': (WINDOW_HEIGHT - $('#argonbox-lightbox').height()) / 2,
                                        'left': (WINDOW_WIDTH - $('#argonbox-lightbox').width()) / 2
                                    })
                                    .show();
                            })
                            .prependTo('#argonbox-lightbox');

                        // Add the description
                        $('#argonbox-description strong').text($('a.argonbox-current').attr('title'));
                    },
                    close: function() {
                        $('#argonbox-overlay, #argonbox-lightbox').remove();
                        $('body').css('overflow-y', 'auto'); // Show scrollbars again
                        $('a').removeClass('argonbox-current');
                    },
                    next: function() {
                        $('#argonbox-lightbox').hide();

                        currentPos = allImgLinks.index($('a.argonbox-current'));
                        nextImgLink = allImgLinks.get(currentPos + 1); // Find next from current
                        if (!nextImgLink) {
                            nextImgLink = allImgLinks.get(0);
                        }

                        $('a').removeClass('argonbox-current');
                        $(nextImgLink).addClass('argonbox-current');
                        $('#argonbox-lightbox img').remove();

                        lightbox.show();
                    },
                    previous: function() {
                        currentPos = allImgLinks.index($('a.argonbox-current'));
                        prevImgLink = allImgLinks.get(currentPos - 1); // Find previous from current

                        $('a').removeClass('argonbox-current');
                        $(prevImgLink).addClass('argonbox-current');
                        $('#argonbox-lightbox img').remove();

                        lightbox.show();
                    }
                };
            // End of var declaration.

            // When argonbox() is called
            $(this).addClass('argonbox-current');
            lightbox.init();
            lightbox.show();
        });
    };

    $.fn.argonbox.defaults = {
        'duration': 'fast',
        'opacity': '0.9',
        'bootstrap': false,
        'navigation': true,
    };
})(jQuery);