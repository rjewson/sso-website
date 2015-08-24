$(function(){

 	$('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

	var wow = new WOW({
    	offset: 50
	});
    wow.init();

    console.log('Done');

});
