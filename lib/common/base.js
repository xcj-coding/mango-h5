/**
 * ajax封装，只用于支持XMLHttpRequest，用于移动端
 * @param  {[type]} obj 对象 url,type,data,dataType,success,error
 * @return {[type]}
 */
export const getDataFromAPI = (obj) => {
	let abj = {},objObj,objStr;

	if(typeof obj.data === "string"){
		objObj = JSON.parse(obj.data);
		// objObj.sid = getCookie("sid") ? getCookie("sid") : '';
		// objObj.uid = getCookie("uid") ? getCookie("uid") : '';
		objStr = JSON.stringify(objObj);
	}

	// 测试地址
	// abj.url = 'http://10.10.130.212:8001/' + obj.url;
	abj.url = 'http://apitest.mangocity.com:8001/' + obj.url;

	abj.type = obj.type;
	abj.dataType = obj.dataType || "json";
	abj.data = objStr;
	abj.success = obj.success || ((data) => console.log('成功回流' + data));
	abj.error = obj.error || ((data) => console.log('失败回流' + data));

	$.ajax(abj);
};
/**
 * 保密字符串
 * @param  {[type]} str 字符串
 * @param  {[type]} frontLen 前面保留位数
 * @param  {[type]} endLen 后面保留位数
 * @return {[type]} '熊**先生'
 */
export const secrecyString = (str, frontLen, endLen) => {
	let len = str.length - frontLen - endLen;
	let hideStr = '';
	for (let i = 0; i < len; i++) {
		hideStr += '*';
	}
	return str.substr(0, frontLen) + hideStr + str.substr(str.length - endLen);
};
//焦点轮播图首尾图不显示问题
export const swiperImgShow = (o) => {
	o.find(".swiper-slide-duplicate img").each(function() {
		var _this=$(this);
		var errorState = true;
		_this.css({opacity: 1}).siblings(".mg-img-default").hide();
		_this.error(function(){
			_this.css({opacity: 0}).siblings(".mg-img-default").show();
		})
	});
	
}
/**
 * 地图位置定位
 * callback 回调函数，取位置
 * 如：getLocation(function(data){
 *          alert(data);
 *     });
 * 
 */
export const getLocation = (obj) => {
	let locationOBJ=obj || {};

	if (navigator.geolocation){   
        navigator.geolocation.getCurrentPosition(showPosition,showError);   
    }else{     
        Tips({
         	'message':'浏览器不支持地理定位。',
    	}); 
    	locationOBJ.callback('深圳');
    }

    function showError(error){ 
	    switch(error.code) {   
	        case error.PERMISSION_DENIED:   
		        Tips({
		         	'message':'定位失败,用户拒绝请求地理定位',
	        	}); 
					
	            break;   
	        case error.POSITION_UNAVAILABLE:   
	        	Tips({
		         	'message':'定位失败,位置信息是不可用',
	        	});   
	            break;   
	        case error.TIMEOUT:  
	        	Tips({
		         	'message':'定位失败,请求获取用户位置超时',
	        	});    
	            break;   
	        case error.UNKNOWN_ERROR: 
	        	Tips({
		         	'message':'定位失败,定位系统失效',
	        	});    
	            break;   
	    }
	   	locationOBJ.callback('深圳');
	} 
	function showPosition(position){   
	    var latlon = position.coords.latitude+','+position.coords.longitude;
	    //baidu百度接口  
	    var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0";
	    $.ajax({    
	        type: "GET",    
	        dataType: "jsonp",    
	        url: url,  
	        async: false, 
	        beforeSend: function(){    
	            Tips({
		         	'message':'正在定位...',
	        	}); 
	        	locationOBJ.callback('深圳');
	        },   
	        success: function (json) {    
	            if(json.status==0){ 
	                locationOBJ.callback(json.result.addressComponent.city.replace("市","")); 
	            }else{
	            	Tips({
			         	'message':'地址位置获取失败',
		        	}); 
		        	locationOBJ.callback('深圳');
	            } 
	        },   
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            Tips({
		         	'message':'地址位置获取失败',
	        	}); 
	        	locationOBJ.callback('深圳');  
	        }   
	    });    
	}  
}
/**
 * O={
 * 	 mark:"white",  显示遮罩层，如果没值时为黑色透明，white为白色透明
 *   title:"",      为标题，如果没值时不显示标题   
 * 	 message:"",    为提示内容，必填
 *   button:"<a class="mg-col mg-col2" href="">提交</a><a id="btn-close" class="mg-col mg-col2" href="javascript:;">取消</a>",  为下面按钮区，如果没值时不显示铵钮
 *   fn:function(){   弹窗加载完成，回调函数
 *		...
 *	 }
 * }
 *
 */
export const Tips = (o) => {
	let mark = o.mark=="white" ? 'mg-mark' : 'mg-mark-black';
	let title = o.title ? '<h3 class="mg-tips-tit mg-fs32">' + o.title +'</h3>':'';
	let message = o.message ? '<div class="mg-tips-text">' + o.message +'</div>':'';
	let button = o.button ? '<div class="mg-tips-btn mg-g">' + o.button + '</div>' :'';
	
	let alertHtml='<div class="' + mark + ' mg-fadeIn"></div><div class="mg-tips mg-fadeIn">'+ title + message + button + '</div>';
    $('body').append(alertHtml);

	$(".mg-mark,.mg-mark-black").on("click",function(){
		$(".mg-mark,.mg-mark-black,.mg-tips").remove();
	})
	if(!o.button){
		setTimeout(function(){
			$(".mg-mark,.mg-mark-black,.mg-tips").remove();
		},3000)
	}
	if(o.fn){
		o.fn();
	}
}




/***********************************全局挂载(用于工具类函数)***********************************/

/**
 * [setCookie 设置cookie]
 * @param {[type]} cName  [key值]
 * @param {[type]} value  [value值]
 * @param {[type]} expire [过期时间(天)]
 */
window.setCookie = function(cName,value,expire){
	let expireDate = new Date();
	expireDate.setTime(expireDate.getTime()+expire*24*60*60*1000);
	document.cookie = cName + "=" + escape(value) + ((expire==null) ? "" : ";expires="+expireDate.toGMTString());
}
/**
 * [getCookie 获取cookie]
 * @param  {[type]} cName [key值]
 */
window.getCookie = function(cName){
    var arr = document.cookie.match(new RegExp(["(^| )" , cName , "=([^;]*)(;|$)"].join('')));
    if(arr != null) return unescape(arr[2]); return null;
}
/**
 * [MgSessionSet sessionStorage set]
 * @param  {[type]} key [key值]
 * @param  {[type]} value  [value值]
 */
window.MgSessionSet = function(key, value) {
	window.sessionStorage.setItem(key, value);
}
/**
 * [MgSessionGet sessionStorage get]
 * @param {[type]} key [key值]
 */
window.MgSessionGet = function(key) {
	var result = window.sessionStorage.getItem(key);
	if (result == '' || result == "undefined" || result == "null" || result == null || result == undefined) {
		return '';
	};
	return result;
}
/**
 * [MgLocalSet localStorage set]
 * @param {[type]} key   [key值]
 * @param {[type]} value [value值]
 */
window.MgLocalSet = function(key, value) {
	window.localStorage.setItem(key, value);
}
/**
 * [MgLocalGet localStorage get]
 * @param {[type]} key [key值]
 */
window.MgLocalGet = function(key) {
	var result = window.localStorage.getItem(key);
	if (result == '' || result == "undefined" || result == "null" || result == null || result == undefined) {
		return '';
	};
	return result;
}
