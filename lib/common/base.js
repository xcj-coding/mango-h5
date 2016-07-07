/**
 * ajax封装，只用于支持XMLHttpRequest，用于移动端
 * @param  {[type]} obj 对象 url,method,data
 * @return {[type]}
 */
export const getDataFromAPI = (obj) => {
	let abj = obj || {};

	let method = (abj.method || 'GET').toUpperCase();
	let dataType = abj.dataType || "json";
	let abjData = abj.data;
	let url = abj.url;
	let params = function(abjData) {
		var arr = [];
		for (var name in abjData) {
			arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(abjData[name]));
		}
		arr.push(("v=" + Math.random()).replace(".", ""));
		return arr.join("&");
	};
	let success = abj.success;
	let fail = abj.fail;

	let xhr = (() => {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else {
			throw new Error('系统或者浏览器不支持XHR对象');
		}
	})();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				success && success(xhr.responseText, xhr.responseXML);
			} else {
				fail && fail(status);
			}
		}
	};

	if (method == "GET") {
		xhr.open("GET", url + "?" + params, true);
		xhr.send(null);
	} else if (method == "POST") {
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(params);
	}
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
/*检测电话号码是否合法*/
function checkMobile(num) {
	var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
	var flag = false;
	if (re.test(num)) {
		flag = true;
	} else {
		flag = false;
	}
	return flag;
}

// 检测密码是否合法
function checkPwd(obj) {
	var re = /^(?=.{6,16})(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z]*$/;
	var pwd = $(obj).val();
	var flag = false;
	if (re.test(pwd)) {
		flag = true;
	} else {
		flag = false;
	}
	return flag;
}

// 检验姓名：姓名是2-15字的汉字
function isCardName(s) {
	var patrn = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/;
	if (!patrn.exec(s)) {
		return false;
	}
	return true;
}

// 检验身份证
function isIdCard(s) {
	var patrn = /^\s*\d{15}\s*$/;
	var patrn1 = /^\s*\d{16}[\dxX]{2}\s*$/;
	if (!patrn.exec(s) && !patrn1.exec(s)) {
		return false;
	}
	return true;
}

// JsBridge
function TestJsBridge(callback) {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

	if (isAndroid) { // android 
		callback && callback(window.WebViewJavascriptBridge, isAndroid);
	} else { // ios
		if (window.WebViewJavascriptBridge) {
			callback && callback(WebViewJavascriptBridge, isAndroid);
		} else {
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				WebViewJavascriptBridge.init(function(message, responseCallback) {
					// log('JS got a message', message)
					var data = {
							'Javascript Responds': 'Wee!'
						}
						// log('JS responding with', data);

					responseCallback(data);
				});

				callback && callback(WebViewJavascriptBridge, isAndroid);
			}, false);
		};
	};
}

function cMsessionSet(name, key) { // 存储
	window.sessionStorage.setItem(name, key);
}

function cMsessionGet(name) { // 获取
	var result = window.sessionStorage.getItem(name);
	if (result == '' || result == "undefined" || result == "null" || result == null || result == undefined) {
		return '';
	};
	return result;
}

function cMlocalSet(name, key) { // 存储
	window.localStorage.setItem(name, key);
}

function cMlocalGet(name) { // 获取
	var result = window.localStorage.getItem(name);
	if (result == '' || result == "undefined" || result == null || result == undefined) {
		return '';
	};
	return result;
}
