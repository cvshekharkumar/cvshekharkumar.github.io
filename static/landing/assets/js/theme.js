(function($) {
    'use strict';

    /*--
    	Mobile Menu
    ------------------------*/
    $('.mobile-menu nav').meanmenu({
        meanScreenWidth: "990",
        meanMenuContainer: ".mobile-menu",
        onePage: false,
    });
		// top quearys menu 
		var emsmenu = $(".em-quearys-menu i.t-quearys");
		var emscmenu = $(".em-quearys-menu i.t-close");
		var emsinner = $(".em-quearys-inner");
		emsmenu.on('click', function(){
			emsinner.addClass('em-s-open').fadeToggle(1000);
			 $(this).addClass('em-s-hidden');
			  emscmenu.removeClass('em-s-hidden');
		});		
		emscmenu.on('click', function(){	
			emsinner.removeClass('em-s-open').fadeToggle(1000);
			$(this).addClass('em-s-hidden');
			emsmenu.removeClass('em-s-hidden');
		});	
	
	
 	$(".scroll-next a").on('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1250);
		event.preventDefault();
	});
    
    $('.thisItem').click(function () {
        $(".thisParent .thisItem").removeClass('change-bg-tabs');
        $(this).addClass('change-bg-tabs');
        $(".thisParentBody .thisItemBody").hide();
        $("#"+$(this).attr('id')+"-1").show();
        console.log($("#"+$(this).attr('id')+"-1").html(),"#"+$(this).attr('id')+"-1")
    });
    // $('#teacher').click(function () {
    //     $(".thisParent .thisItem").removeClass('white-bg');
    //     $(this).addClass('white-bg');
    //     $(".thisParentBody .thisItemBody").hide();
    //     $("#teacher-1").show();
    // });
    // $('#university').click(function () {
    //     $(".thisParent .thisItem").removeClass('white-bg');
    //     $(this).addClass('white-bg');
    //     $(".thisParentBody .thisItemBody").hide();
    //     $("#university-1").show();
    // });
	
    //Slider
    $(".slick-main").slick({
        autoplay: false,
        speed: 800,
        autoplayspeed: 3000,
        dots: false,
        arrows: true,
        fade: true,
        easing: 'linear',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 991, settings: { dots: false } },
            { breakpoint: 767, settings: { dots: false } },
            { breakpoint: 479, settings: { dots: false } },
        ]
    });
	
    //Single Portfolio
    $(".single-portfolio-slider").slick({
        autoplay: true,
        speed: 300,
        autoplayspeed: 3000,
        dots: false,
        arrows: true,
        fade: true,
        easing: 'linear',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });	
		if ($('.headrooma').length != 0) {
        // grab an element
        var myElement = document.querySelector(".headrooma");
        // construct an instance of Headroom, passing the element
        var headroom = new Headroom(myElement);
        // initialise
        headroom.init();
    }

	    /* ---------------------------------------------
		Humbergar Menu Js.
		--------------------------------------------- */
			$('.hamburger').on('click', function() {
				$(this).toggleClass('is-active');
				$(this).next().toggleClass('nav-show')
			});
    /*-----------------------------------------------------
	
	
	
	
	
    /*---------------------
    WOW active js 
    --------------------- */
	    /*---------------------
    WOW active js 
    --------------------- */
    new WOW().init();
    /*---------------------
    Nivo Slider active js 
    --------------------- */
    $('#mainSlider').nivoSlider({
        directionNav: true,
        animSpeed: 500,
        slices: 18,
        pauseTime: 900000,
        pauseOnHover: false,
        controlNav: true,
        prevText: '<i class="fa fa-angle-left nivo-prev-icon"></i>',
        nextText: '<i class="fa fa-angle-right nivo-next-icon"></i>'
    });
	
	
    new WOW().init();
    /*--------------------------
     scrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    // Venubox

    $('.venobox').venobox({

        numeratio: true,

        infinigall: true

    });



    /*--
    	One Page Nav
    ----------------------------------- */
    var top_offset = $('.one_page').height() - 100;
    $('.one_page .edution_menu .nav_scroll').onePageNav({
        currentClass: 'current',
        changeHedution: false,
        scrollSpeed: 1000,
        scrollOffset: top_offset,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    });
	



    /*---------------------
    counterUp
    --------------------- */
    $('.countr_text h1').counterUp({
        delay: 10,
        time: 1000
    });
	
    /* Portfolio Isotope  */

    $('.em_load').imagesLoaded(function() {

        if ($.fn.isotope) {

            var $portfolio = $('.em_load');

            $portfolio.isotope({

                itemSelector: '.grid-item',

                filter: '*',

                resizesContainer: true,

                layoutMode: 'masonry',

                transitionDuration: '0.8s'

            });


            $('.filter_menu li').on('click', function() {

                $('.filter_menu li').removeClass('current_menu_item');

                $(this).addClass('current_menu_item');

                var selector = $(this).attr('data-filter');

                $portfolio.isotope({

                    filter: selector,

                });

            });

        };

    });



    /*--------------------------
    	blog messonary
    ---------------------------- */
    $('.bgimgload').imagesLoaded(function() {
        if ($.fn.isotope) {
            var $blogmassonary = $('.blog-messonary');
            $blogmassonary.isotope({
                itemSelector: '.grid-item',
                filter: '*',
                resizesContainer: true,
                layoutMode: 'masonry',
                transitionDuration: '0.8s'
            });

        };
    });

    /*--------------------
    	testimonial 
    -----------------------------------*/

    $('.testimonial_list').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: true,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })  
	$('.twitter_carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: true,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1000: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })
	    $('.admission_curosel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-arrow-left''></i>", "<i class='fa fa-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1000: {
                items: 3
            },
            1920: {
                items: 4
            }
        }
    })
	
	    $('.service-curousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dots: true,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1000: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })
		
	    $('.about-curousel').owlCarousel({
        loop: true,
        autoplay: false,
        autoplayTimeout: 10000,
        dots: true,
        nav: false,
        navText: ["<i class='fa fa-long-arrow-left''></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1000: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })
	

    $('.blog_carousel').owlCarousel({
        nav: true,
		dots: false,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right''></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })
	
	
    $('.brand_curousel').owlCarousel({
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right''></i>"],
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 5
            },
            1920: {
                items: 5
            }
        }
    })




    $('.single_gallery').owlCarousel({
        nav: true,
        dots: false,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })

    $('.portfolio_gallery_post').owlCarousel({
        nav: true,
        dots: false,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1920: {
                items: 1
            }
        }
    })
	
    $('.service_carousel').owlCarousel({
        nav: true,
        dots: false,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    })



    // Mouse Direction Hover Iffect
    $('.single_protfolio').directionalHover();

    $('.single_protfolio').directionalHover({

        // CSS class for the overlay
        overlay: "em_port_content",

        // Linear or swing
        easing: "swing",
        speed: 50
    });
	
	
	  /* Tooltip Js */
	 $('[data-toggle="tooltip"]').tooltip();
	 
	 
    /* Venobox custom Js */
    $('.venobox_custom').venobox({
        framewidth: '290px', // default: ''
        frameheight: '290px', // default: ''
        border: '2px', // default: '0'
        bgcolor: '#fff', // default: '#fff'
    });
	
		/*---------------------
	 countdown
	--------------------- */
		$('[data-countdown]').each(function() {
		  var $this = $(this), finalDate = $(this).data('countdown');
		  $this.countdown(finalDate, function(event) {
			$this.html(event.strftime('<span class="cdowns days"><span class="time-counts">%-D</span> <p>Days</p></span> <span class="cdowns hour"><span class="time-counts">%-H</span> <p>Hour</p></span> <span class="cdowns minutes"><span class="time-counts">%M</span> <p>Min</p></span> <span class="cdowns second"> <span><span class="time-counts">%S</span> <p>Sec</p></span>'));
		  });
		});	
	
	
    /*--------------------------
      Gallery Isotope
    ---------------------------- */
    $('.prot_image_load').imagesLoaded(function() {

        if ($.fn.isotope) {
            var $portfolio = $('.gallery_items');
            $portfolio.isotope({
                itemSelector: '.grid-item',
                filter: '*',
                resizesContainer: true,
                layoutMode: 'masonry',
            });
            $('.filter-menu li').on('click', function() {
                $('.filter-menu li').removeClass('current_menu_item');
                $(this).addClass('current_menu_item');
                var selector = $(this).attr('data-filter');
                $portfolio.isotope({
                    filter: selector,
                });
            });
        };

    });

	
	


})(jQuery);