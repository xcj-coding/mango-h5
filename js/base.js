/**
 * 保密字符串
 * @param  {[type]} str 字符串
 * @param  {[type]} frontLen 前面保留位数
 * @param  {[type]} endLen 后面保留位数
 * @return {[type]} '熊**先生'
 */
var secrecyString = (str,frontLen,endLen)=>{
	let len = str.length - frontLen - endLen;
	let hideStr = '';
	for(let i = 0; i < len; i++){
		hideStr += '*';
	}
	return str.substr(0,frontLen) + hideStr + str.substr(str.length - endLen);
};
/**
 * ajax封装，只用于支持XMLHttpRequest，用于移动端
 * @param  {[type]} obj 对象
 * @return {[type]}
 */
var getDataFromAPI = (obj)=>{
	// let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	let xhr = (() => {
		if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}else{
			throw new Error('系统或者浏览器不支持XHR对象');
		}
	})();
	obj.url = obj.url;
	obj.data = ((data) => {
		let arr = [];
		for(let i of data){
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	})(obj.data)
	if(obj.method === 'get') obj.url += (obj.url.indexOf('?') === -1 ? '?' + obj.data : '&' + obj.data);
	if(obj.async === true){
		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4){
				callback();
			}
		};
	}
	xhr.open(obj.method, obj.url, obj.async);
	if(obj.method === 'post'){
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data)
	}else{
		xhr.send(null);
	}
	if(obj.async === false){
		callback();
	}
	function callback(){
		if(xhr.status == 200){
			if(obj.dataType == "text" || obj.dataType == "TEXT"){
				obj.success(xhr.responseText);
			}else if(obj.dataType == "xml" || obj.dataType == "XML"){
				obj.success(xhr.responseXML);
			}else if(obj.dataType == "json" || obj.dataType == "JSON"){
				obj.success(xhr.responseText);// 一个json字符串
			}
		}else{
			alert('获取数据错误。错误码：' + xhr.status + '，错误信息：' + xhr.statusText);
		}
	}
};
