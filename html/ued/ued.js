var init={};
init.loading=function(t,bg){
	if(bg=="black"){
		var showHtml='<div class="mg-mark-black"></div><div class="mg-loading"><img src="/i/loading.gif" /></div>';
	}else{
		var showHtml='<div class="mg-mark"></div><div class="mg-loading"><img src="/i/loading.gif" /></div>';
	}
	$('body').append(showHtml);

	$(".mg-mark,.mg-mark-black").on("click",function(){
		$(".mg-mark,.mg-mark-black,.mg-loading").remove();
	})

	setTimeout(function(){
		$(".mg-mark,.mg-mark-black,.mg-loading").remove();
	},3*1000)

}

init.tips=function(data){
	var mark = data.mark ? 'mg-mark-black' : 'mg-mark'
	var title = data.title ? '<h3 class="mg-tips-tit mg-fs32">' + data.title +'</h3>':'';
	var message = data.message ? '<div class="mg-tips-text">' + data.message +'</div>':'';
	var button = data.button ? '<div class="mg-tips-btn mg-g">' + data.button + '</div>' :'';
	console.log(data.fn);

	var alertHtml='<div class="' + mark + '"></div><div class="mg-tips mg-fs28">'+ title + message + button + '</div>';
    $('body').append(alertHtml);

	$(".mg-mark,.mg-mark-black").on("click",function(){
		$(".mg-mark,.mg-mark-black,.mg-tips").remove();
	})
	if(data.fn){
		data.fn();
	}

	
}

$(function(){
	$(".mg-swiper-img").show();
	var swiperlmzq = new Swiper('.mg-swiper',{
		wrapperClass : 'mg-swiper-bx',
		slideClass : 'mg-swiper-img',
		pagination : '.mg-swiper-ico',
		bulletActiveClass : 'mg-swiper-active',
		loop: true,
		autoplay: 3000
	})

	var urlStr=(window.location.toString()).split("#")[1];
	if(!urlStr){
		$(".ued-box").eq(0).show(200);
	}
	$("#"+urlStr).show(200);


	$(".ued-nav a").on("click",function(){
		var anchor=$(this).attr("href");
		$(".ued-box").hide();
		$(anchor).show(200);
	})

	//px转rem换算
	$("#px_ipt").keyup(function(event) {
		var pxVal=parseFloat($(this).val());
		if(isNaN(pxVal)){
			$("#rem_ipt").val("请输入数字");
			return false;
		}
		$("#rem_ipt").val(parseFloat((pxVal/24).toFixed(4))+"rem");
	});
	$("#rem_ipt").keyup(function(event) {
		var remPx=parseFloat($(this).val());
		if(isNaN(remPx)){
			$("#px_ipt").val("请输入数字");
			return false;
		}
		$("#px_ipt").val(parseFloat((remPx*24).toFixed(4))+"px");
	});


	$("#load-btn1").on("click",function(){
		init.loading(4);
	})

	$("#load-btn2").on("click",function(){
		init.loading(4,"black");
	})
	$("#alert-btn1").on("click",function(){
		init.tips({
			'mark':'black',
			'title':'信息提示',
			'message':'信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容',
			'button':'<a class="mg-col mg-col2" href="">提交</a><a id="btn-close" class="mg-col mg-col2" href="javascript:;">取消</a>',
			'fn':function(){
				$("#btn-close").on("click",function(){
					$(".mg-mark,.mg-mark-black,.mg-tips").remove();
				})
			}
		});
	})

	$("#alert-btn2").on("click",function(){
		init.tips({
			'title':'信息提示',
			'message':'信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容信息内容',
			'button':'<a class="mg-col mg-col2" href="">提交</a><a id="btn-close" class="mg-col mg-col2" href="javascript:;">取消</a>',
			'fn':function(){
				$("#btn-close").on("click",function(){
					$(".mg-mark,.mg-mark-black,.mg-tips").remove();
				})
			}
		});
	})
})


