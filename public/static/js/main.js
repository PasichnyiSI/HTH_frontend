$(document).on('click','.js-menu_toggle.closed',function(e){
	e.preventDefault(); $('.list_load, .list_item').stop();

	$('.side_menu').css({ 'left':'0px' });
    $('.burger_box').css({'visibility':'hidden'});
    $('.burger_box_opened').css({'visibility':'visible'});

	var count = $('.list_item').length;
	$('.list_load').slideDown( (count*.6)*100 );
	$('.list_item').each(function(i){
		var thisLI = $(this);
		timeOut = 100*i;
		setTimeout(function(){
			thisLI.css({
				'opacity':'1',
				'margin-left':'0'
			});
		},100*i);
	});
});

$(document).on('click','.js-menu_toggle.opened',function(e){
	e.preventDefault(); $('.list_load, .list_item').stop();

	$('.side_menu').css({ 'left':'-300px' });
    $('.burger_box').css({'visibility':'visible'});
    $('.burger_box_opened').css({'visibility':'hidden'});

	var count = $('.list_item').length;
	$('.list_item').css({
		'opacity':'0',
		'margin-left':'-20px'
	});
	$('.list_load').slideUp(300);
});

