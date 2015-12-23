$(function(){
 

 	$('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

	var wow = new WOW({
    	offset: 50
	});
    wow.init();

    console.log('Done2');

	// $('.owl-carousel').owlCarousel({
	// 	items: 1,
 //       	loop: true,
 //        margin: 10,
 //        dots:true
	// });

	$('.carousel').slick({
		dots: true,
  		infinite: true,
  		speed: 500,
  		fade: true,
  		cssEase: 'linear',
  		autoplay:true,
  		autoplaySpeed: 2000
	});

});
