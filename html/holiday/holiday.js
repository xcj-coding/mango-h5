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
	console.log(ONOFF);
	if(ONOFF!="on"){
		$(this).attr("onoff","on");
		$("body").append('<div class="mg-mark-black mg-fadeIn"></div>');
		$(".mg-detail-msg").show().removeClass("mg-fadeOutRight").addClass("mg-fadeInRight");
	}else{
		$(this).attr("onoff","off");
		$(".mg-detail-msg").removeClass("mg-fadeInRight").addClass("mg-fadeOutRight");
		$(".mg-mark-black").remove();
		
	}
	
	
})