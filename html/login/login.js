$(function(){
	$(".mg-login-nav a").on("tap",function(){
		var _index=$(this).index();
		var per= 25 + (50*_index); 
		var title=["用户登录","用户注册"]
		$(".mg-login-form").hide().eq(_index).show();
		$(".mg-header h1").text(title[_index]);
		$(".mg-login-nav em").animate({
			left: per + "%"
		},50)
	})

	$(".mg-login-lock").on("tap",function(){
		if(!$(this).hasClass("mg-login-unlock")){
			$(this).siblings("input").attr("type","text");
			$(this).addClass("mg-login-unlock");
		}else{
			$(this).removeClass("mg-login-unlock");
			$(this).siblings("input").attr("type","password");
		}
		
	})
})