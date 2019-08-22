(function($) {
    "use strict";

    /*-- Variables --*/


    /*-- Preloader --*/
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow');
    });



    /*-- Menu Functions --*/
    $(document).delegate('.open', 'click', function(event) {
        $(this).addClass('oppenned');
        event.stopPropagation();
    })
    $(document).delegate('body', 'click', function(event) {
        $('.open').removeClass('oppenned');
    })
    $(document).delegate('.cls', 'click', function(event) {
        $('.open').removeClass('oppenned');
        event.stopPropagation();
    });

    /*-- Scroll menu --*/
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('#menu_area').addClass('menu-bg');
        } else {
            $('#menu_area').removeClass('menu-bg');
        }
    });


    /*-- Section Animation --*/
    $(function() {

        var Page = (function() {

            var $navArrows = $('#nav-arrows'),
                $nav = $('#nav-dots > span'),
                slitslider = $('#slider').slitslider({
                    onBeforeChange: function(slide, pos) {

                        $nav.removeClass('nav-dot-current');
                        $nav.eq(pos).addClass('nav-dot-current');

                    }
                }),

                init = function() {

                    initEvents();

                },
                initEvents = function() {

                    // add navigation events
                    $navArrows.children(':last').on('click', function() {

                        slitslider.next();
                        return false;

                    });

                    $navArrows.children(':first').on('click', function() {

                        slitslider.previous();
                        return false;

                    });

                    $nav.each(function(i) {

                        $(this).on('click', function(event) {

                            var $dot = $(this);

                            if (!slitslider.isActive()) {

                                $nav.removeClass('nav-dot-current');
                                $dot.addClass('nav-dot-current');

                            }

                            slitslider.jump(i + 1);
                            return false;

                        });

                    });

                };

            return {
                init: init
            };

        })();

        Page.init();

    });



    /*-- Magnific Popup --*/
    $(document).ready(function($) {

        var $container = $('#portfolio'),
            colWidth = function() {
                var w = $container.width(),
                    columnNum = 1,
                    columnWidth = 0;
                if (w > 1200) {
                    columnNum = 4;
                } else if (w > 900) {
                    columnNum = 4;
                } else if (w > 600) {
                    columnNum = 3;
                } else if (w > 300) {
                    columnNum = 1;
                }
                columnWidth = Math.floor(w / columnNum);
                $container.find('.portfolio-item').each(function() {
                    var $item = $(this),
                        multiplier_w = $item.attr('class').match(/item-w(\d)/),
                        multiplier_h = $item.attr('class').match(/item-h(\d)/),
                        width = multiplier_w ? columnWidth * multiplier_w[1] - 4 : columnWidth - 4,
                        height = multiplier_h ? columnWidth * multiplier_h[1] * 1.13 - 4 : columnWidth * 1.13 - 4;
                    $item.css({
                        width: width,
                        height: height
                    });
                });
                return columnWidth;
            }

        function refreshWaypoints() {
            setTimeout(function() {}, 1000);
        }

        $('nav.portfolio-filter ul a').on('click', function() {
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector
            }, refreshWaypoints());
            $('nav.portfolio-filter ul a').removeClass('active');
            $(this).addClass('active');
            return false;
        });

        function setPortfolio() {
            setColumns();
            $container.isotope('reLayout');
        }

        var isotope = function() {
            $container.isotope({
                resizable: true,
                itemSelector: '.portfolio-item',
                masonry: {
                    columnWidth: colWidth(),
                    gutterWidth: 0
                }
            });
        };
        isotope();
        $(window).smartresize(isotope);

        $.fn.viewportChecker = function(useroptions) {
            // Define options and extend with user.
            var options = {
                classToAdd: 'visible',
                offset: 100,
                callbackFunction: function(elem) {}
            };
            $.extend(options, useroptions);

            // Cache the given element and height of the browser
            var $elem = this,
                windowHeight = $(window).height();

        };
    });


    /*-- swiper slider (about area) --*/
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        speed: 3000,
        autoplay: 1000
    });

    /*-- counter js --*/
    $('.counternum').counterUp({
        delay: 10,
        time: 1000
    });

    /*-- Lighbox (protfolio area) --*/
    jQuery('a[data-gal]').each(function() {
        jQuery(this).attr('rel', jQuery(this).data('gal'));
    });
    jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
        animationSpeed: 'slow',
        slideshow: false,
        overlay_gallery: false,
        theme: 'light_square',
        social_tools: false,
        deeplinking: false
    });


    /*-- OWL Slider  (testimonial area) --*/
    $(".owl-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        center: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        smartSpeed: 450

    });

    /*-- Smooth scroll --*/
    var scroll = new SmoothScroll('li a[href*="#"]');

    /*-- accordion --*/
    $('.collapse').on('shown.bs.collapse', function(){
        $(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
    }).on('hidden.bs.collapse', function(){
        $(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
    });

    /*-- Progress bar --*/
    jQuery('.skillbar').each(function(){
        jQuery(this).find('.skillbar-bar').animate({
            width:jQuery(this).attr('data-percent')
        },4000);
    });


})(jQuery);