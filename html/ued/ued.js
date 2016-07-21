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
        '<div class="mg-tips mg-fs28">'+
            '<h3 class="mg-tips-tit mg-fs32">提示</h3>'+
            '<div class="mg-tips-text">提示的内容信息提示的内容信息提示的内容信息提示的内容信息</div>'+
            '<div class="mg-tips-btn mg-g">'+
                '<a class="mg-col mg-col2" href="">提交</a>'+
                '<a class="mg-col mg-col2" href="">重试</a>'+
            '</div>'+
        '</div>';
    $('body').append(alertHtml);

	$(".mg-mark").on("tap",function(){
		$(".mg-mark,.mg_tips").remove();
	})

}


$(function(){

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


	$("#load-btn").on("tap",function(){
		init.loading(4);
	})

	$("#alert-btn1").on("tap",function(){
		init.tips();
	})
})


