//依赖api.js  jquery.js
(function(window){

	window.$api = {};
	
	var baseUrl = "http://localhost:8080/api/";
	
	//var baseUrl = "http://www.youche99.cn/api/";

	// 是否开启调试模式
	var debug = true;

	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	Date.prototype.format = function (fmt) { //author: meizz
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "h+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	
    // 发送sms
    window.$api.smsclick = function(btn,sec) {
        if (sec == 60) {
            // 开始倒计时
            $(btn).css('border', '0px');
            $(btn).text(--sec);
        } else if (sec == 0) {
            // 结束倒计时
            $(btn).attr('border', '1px');
            $(btn).text('发送');
            return;
        } else {
            $(btn).text(sec);
        }
        setTimeout(function() {
            $api.smsclick(btn, --sec);
        },1000);
    }
    
    //封装ajaxa
    window.$api.ajax = function(action, param ,sucFun, errFun,extParam) {
    	$api.print('action:' + action + ' param:' + JSON.stringify(param));
    	var url = baseUrl + action;
		var	type = action.toLowerCase();
		var _contentType = "application/x-www-form-urlencoded";
		
		// 如果参数中带有请求类型则优先
		if(extParam && extParam.type)
		{
			type = extParam.type;
		}

		if (type.indexOf('get') != -1) {
			type = 'GET';
		}else{
			type = 'POST';
			_contentType = "application/json";
			if(param)
			param = JSON.stringify(param);
		}

		var _reqParam = {
			url: url,
			type: type,
			contentType:_contentType,
			data: param,
			cache: false,
			async: true,
			beforeSend: function(req) {
				// 请求签名
				var uInfo = $api.getUserInfo();
    			  if (uInfo) {
    			     var stoken = uInfo.SToken;
    	             if (stoken) {
    		              req.setRequestHeader('stoken', stoken);
    		          }
    	         }
			},
			dataType: 'json',
			timeout: 10000,
			success: function(data) {
				try
				{
					if (data.suc) {
						sucFun && sucFun(data);
					}else{

						if(errFun)
						{
							errFun(data);
						}
						else
						{
							if (data.msg) {
								$api.print(data.msg);
							}
						}

					}
				}
				catch(e)
				{
					//判断是字符串还是js对象 打印Log
					if(typeof param == "object")
					{
						param = JSON.stringify(param);
					}
					$api.print('action:' + action + ' param:' + param + ' data:' + JSON.stringify(data) + 'exception:' + e);
				}
			},
			error: function(xhr, type) {
				if(debug)
					$api.print('请求服务器失败' + JSON.stringify(xhr) + '  ' + type);
			}
		}
		// 如果扩展参数存在
		if(extParam)
		{
			$.extend(_reqParam,extParam);
		}
		$api.print(JSON.stringify(_reqParam));
		// 调用jq的ajax
		$.ajax(_reqParam);
	}

    // 保存用户信息
	window.$api.setUserInfo = function(user){
		if (window.localStorage) {
		    localStorage.setItem("userinfo", user);	
		} else {
		    alert('您的浏览器版本太低了');	
		}
	}

	// 获取用户对象
	window.$api.getUserInfo = function(){
		if (window.localStorage) {
		    return localStorage.getItem("userinfo");	
		} else {
		    alert('您的浏览器版本太低了');	
		}
	}

	// 删除用户对象
	window.$api.rmUserInfo = function(){
		if (window.localStorage) {
			$api.removeItem('userinfo');
		}
		else {
			alert('您的浏览器版本太低了');	
		}
	}

	// 是否是debug模式
	window.$api.isDebug =  function()
	{
		return debug;
	}
	
	
	// 打印控制台console.log
	window.$api.print = function(s){
		if(debug){
			if(typeof s == "object")
			{
				console.log(JSON.stringify(s));
			}
			else
			{
				console.log(s);
			}
		}
	}

})(window);
