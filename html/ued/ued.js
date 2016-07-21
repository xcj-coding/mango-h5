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


})