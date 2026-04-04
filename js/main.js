(function($) {
	"use strict"
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});
	$('body').scrollspy({
		target: '#nav',
		offset: $(window).height() / 2
	});
	$("#nav .main-nav a[href^='#']").on('click', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});
	$('#back-to-top').on('click', function(){
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});
	$('#nav .nav-collapse').on('click', function() {
		$('#nav').toggleClass('open');
	});
	$('.has-dropdown a').on('click', function() {
		$(this).parent().toggleClass('open-drop');
	});
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});
	$('.work').magnificPopup({
		delegate: '.lightbox',
		type: 'image'
	});
	$('#about-slider').owlCarousel({
		items:1,
		loop:true,
		margin:15,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		dots : true,
		autoplay : true,
		animateOut: 'fadeOut'
	});
	$('#submit-message').on('click', function(e){
		e.preventDefault();
		var $this = $(this);
		$.ajax({
			type: "POST",
			url: '/api/mail',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {
				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],input[type=email],textarea').filter(':visible').val('');
					$('#succes').html(data.msg).fadeIn('slow').delay(2000).fadeOut('slow');
				} else {
					$('#error').html(data.msg).fadeIn('slow').delay(2000).fadeOut('slow');
				}
			}
		});
	});
	$('#goto-contact').on('click', function(){ 
		window.location.href = "#contact";
	});
})(jQuery);
