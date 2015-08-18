$(function(){

	//Reservations
	var _reservationView = new ReservationView({
		el:$('#reservation'),
		locationsJSONUrl:'states.json'
	});

	$('.owl-carousel').owlCarousel({
		    loop:true,
		    nav:true,
		    autoplay:true,
		    autoplayTimeout:5000,
		    margin:0,
		    navContainer:'.owl-carousel',
		    responsive:{
		        0:{
		            items:1
		        }
		    }
		})

})

//Carousel
