$(".mg-banner-img").show();
var swiperBanner = new Swiper('.mg-banner',{
	wrapperClass : 'mg-banner-bx',
	slideClass : 'mg-banner-img',
	pagination : '.mg-swiper-ico',
	bulletActiveClass : 'mg-swiper-active',
	loop: true,
	autoplay: 3000
})

$(".mg-tjcp-img").show();
var swiperTjcp = new Swiper('.mg-tjcp-warp',{
	wrapperClass : 'mg-tjcp-bx',
	slideClass : 'mg-tjcp-img',
	pagination : '.mg-swiper-ico',
	bulletActiveClass : 'mg-swiper-active',
	loop: true,
	autoplay: 8000
})

$(".mg-dbanner-img").show();
var swiperDBanner = new Swiper('.mg-dbanner',{
	wrapperClass : 'mg-dbanner-bx',
	slideClass : 'mg-dbanner-img',
	pagination : '.mg-swiper-ico',
	bulletActiveClass : 'mg-swiper-active',
	loop: true,
	autoplay: 3000
})


$("#load-btn").on("tap",function(){
	init.loading(4);
})

$("#alert-btn1").on("tap",function(){
	init.tips();
})

var init={};
init.loading=function(t){
	var showHtml='<div class="mg-mark"></div><div class="mg-loading"><img src="/i/loading.gif" /></div>'

	$('body').append(showHtml);

	$(".mg-mark").on("tap",function(){
		$(".mg-mark,.mg-loading").remove();
	})

	setTimeout(function(){
		$(".mg-mark,.mg-loading").remove();
	},3*1000)

}

init.tips=function(){
	var alertHtml='<div class="mg-mark"></div>'+
        '<div class="mg_tips mg-fs28">'+
            '<h3 class="mg_tips_tit mg-fs32">提示</h3>'+
            '<div class="mg_tips_text">提示的内容信息提示的内容信息提示的内容信息提示的内容信息</div>'+
            '<div class="mg_tips_btn g">'+
                '<a class="col col2" href="">提交</a>'+
                '<a class="col col2" href="">重试</a>'+
            '</div>'+
        '</div>';
    $('body').append(alertHtml);

	$(".mg-mark").on("tap",function(){
		$(".mg-mark,.mg_tips").remove();
	})

}