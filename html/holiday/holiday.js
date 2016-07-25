$(".mg-swiper-img").show();
var swiperlmzq = new Swiper('.mg-hot-swiper',{
	wrapperClass : 'mg-hot-list',
	slideClass : 'mg-hot-box',
	pagination : '.mg-hot-ico',
	bulletActiveClass : 'mg-hot-active',
	loop: true,
	autoplay: 30000
})

$(".mg-swiper-img").show();
var swiperlmzq = new Swiper('.mg-hd-swiper',{
	wrapperClass : 'mg-swiper-bx',
	slideClass : 'mg-swiper-img',
	pagination : '.mg-swiper-ico',
	bulletActiveClass : 'mg-swiper-active',
	loop: true,
	autoplay: 3000
});

$(".mg-sel").on("tap",function(){
	$(".mg-sel").find("span").removeClass('mg-click');
	$(this).find("span").addClass('mg-click');
})

$(".mg-detail-btn").on("tap",function(){
	var ONOFF=$(this).attr("onoff");
	if(ONOFF!="on"){
		$(this).attr("onoff","on");
		$(".mg-detail-msg").css("bottom","-10rem");
		$("body").append('<div class="mg-mark-black"></div>');
		$(".mg-detail-msg").show().animate({
			"bottom":"4.5rem"
		});
	}else{
		$(this).attr("onoff","off");
		$(".mg-detail-msg").css("bottom","4.5rem");
		$(".mg-detail-msg").show().animate({
			"bottom":"-10rem"
		});
		$(".mg-mark-black").remove();
		
	}
	
	
})