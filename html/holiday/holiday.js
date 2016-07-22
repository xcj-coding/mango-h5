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

$(".mg-date-table dd span").on("tap",function(){
	var _this=$(this);
	console.log(_this.find("strong").size())
	if(_this.find("strong").size()>=1){
		$(".mg-date-table dd span").removeClass("mg-click");
		_this.addClass("mg-click");
	}

})