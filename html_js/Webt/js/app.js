(function($){
	var first_b = true;
	//var StaticURL = "http://test.feichangyoucai.net/fcyc2-web/";
	var StaticURL = "http://192.168.1.61:8080/fcyc-web/";
	top.ver = '7.8.7.8';
 	
 	/**
 	 * 覆盖插件方法
 	 */
	window.plus = {webview:{},navigator:{},nativeUI:{},runtime:{}};
	plus.webview.viewPool = plus.webview.viewPool || {}; //view池
	plus.webview.__currView  // 焦点view
	
	/**
	 * 创建新窗口
	 * @param {String} url
	 * @param {String} name
	 * @param {Object} styles
	 */
	plus.webview.create = function(url,name,styles,data){
		
		var cw = plus.webview.currentWebview();
		if(cw)
		{
			// 参数重置
			cw.id = "";
			cw.backid = null;
			cw.projectStatus = null;
			cw.title = "";
			cw.projectId = null;
			cw.pStatus = null;
			cw.tiyanbiaoId = null;
			cw.btnid = null;
			cw.noticeId = null;
			cw.transId = null;
			cw.transMoney = null;
			cw.totalCount = null;
			cw.projectProfit = null;
			cw.projectTerm = null;
			cw.typroject = null;
			cw.lockExitFlg = null;
			cw.vmobileTel = null;
			cw.vname = null;
			cw.vidNumber = null;
			cw.vcode = null;
			cw.vrs = null;
			cw.vpassword = null;
			cw.vexpandCode = null;
			cw.url = null;
		}
		
		var iframe = null;
		var view = null;
		for(key in data){
			cw[key] = data[key];
		}
		// 如果view不存在,就创建
		if(!cw){
			//创建外层容器
			view = document.createElement('div');
			view.style.position = "fixed";
			view.style.overflow="hidden";
			view.style.top = '0';
			view.style.bottom = "0";
			view.style.left = "0";
			view.style.right = "0";
			view.display = "none";
			view.classList.add('dui-view');
			view.style.webkitOverflowScrolling = "touch";
			view.style.overflowY = "scroll";
			iframe = document.createElement('iframe');
			iframe.style.width = "100%";
			iframe.style.height = "100%";
			iframe.src = url;
			view.appendChild(iframe);
			top.document.body.appendChild(view);			
		}else{
			view = cw;
			iframe = cw.querySelector('iframe');
			if(url.indexOf("http") != -1)
			{
				iframe.src = url;	
			}
			else
			{
				iframe.src = 'PBox/'+url;
			}
			
		}
		view.id = url.substring(url.indexOf("/")+1, url.indexOf("."));
		iframe.name = name;
		plus.webview.viewPool[name] = view;
		
		//显示
		view.show = function(display){
			view.display = display || "block";
			view.classList.add('curr-view');
		}

		//关闭
		view.close = function(){
			view.display = 'none';
			view.classList.remove('curr-view');
			$(view).remove();
		}
		
		// 样式绑定
		view.setStyle = function(styles){
			if(styles!==undefined){
				var key;
				for(key in styles){
					this.style[key] = styles[key];
				}
			}
		}.bind(view);
		
		//设置下拉刷新
		view.setPullToRefresh = function(){
			
			
		}
		
		// 关闭load
		view.endPullToRefresh = function()
		{
			//$.hideLoading();
		}
		
		// 重新加载
		view.reload = function()
		{
			this.querySelector('iframe').contentWindow.location.reload(true);
		}
		
		if(styles!==undefined){
			var key;
			for(key in styles){
				view.style[key] = styles[key];
			}
		}
		
		if(plus.webview.__currView===undefined){
			plus.webview.__currView = view;
		}
		return view;
	};
	
	//返回或设置焦点view
	plus.webview.currentWebview = function(view){
		return top.document.querySelector('.curr-view')
	}
	
	//H5的本地数据库
	plus.storage = localStorage;
	
	plus.webview.close = function(wv_id){
		var wv = document.getElementById(wv_id);
		wv.style.display = 'none';
		wv.classList.remove('curr-view');
	}
	
	plus.webview.all = function(){
		return document.querySelectorAll('.dui-view');	
	}
	
	plus.nativeUI.confirm  = function(msg,callback)
	{
		GenerateHtml("confirm", msg);
      	btnOk(callback);
      	btnNo();
	}
	
	plus.nativeUI.alert = function(msg,callback)
	{
		 GenerateHtml("alert", msg);
      	 btnOk(callback); 
     	 btnNo();
	}
	
	plus.nativeUI.toast = function(msg)
	{
		$.showMsg(msg);
	}
	
	 // 弹窗生成Html
	 var GenerateHtml = function (type,msg) {
	 
	    var _html = "";
	 
	    _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">提示</span>';
		_html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
	 
	    if (type == "alert") {
	  		_html += '<input id="mb_btn_ok" type="button" value="确定" />';
		}
		if (type == "confirm") {
		  _html += '<input id="mb_btn_ok" type="button" value="确定" />';
		  _html += '<input id="mb_btn_no" type="button" value="取消" />';
		}
		_html += '</div></div>';
	 	
	 	//必须先将_html添加到body，再设置Css样式
		$("body").append(_html); GenerateCss();
	}
	 
	// 弹窗生成Css
	var GenerateCss = function () {
	 
		$("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
			filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
		});
		 
		$("#mb_con").css({ zIndex: '999999', width: '300px', position: 'fixed',
			backgroundColor: 'White', borderRadius: '15px'
		});
		 
		$("#mb_tit").css({ display: 'block', fontSize: '14px', color: '#444', padding: '10px 15px',
			backgroundColor: '#DDD', borderRadius: '15px 15px 0 0',
		  	borderBottom: '3px solid #009BFE', fontWeight: 'bold'
		});
		 
		$("#mb_msg").css({ padding: '20px', lineHeight: '20px',
		borderBottom: '1px dashed #DDD', fontSize: '13px'
		    });
		 
		$("#mb_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '9px',
			border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',
			lineHeight: '16px', cursor: 'pointer', borderRadius: '12px', fontFamily: '微软雅黑'
		});
		 
		$("#mb_btnbox").css({ margin: '15px 0 10px 0', textAlign: 'center' });
		$("#mb_btn_ok,#mb_btn_no").css({height: '30px', color: 'white', border: 'none' });
		$("#mb_btn_ok").css({ backgroundColor: '#168bbb' });
		$("#mb_btn_no").css({ backgroundColor: 'gray', marginLeft: '20px' });
		
		var _widht = document.documentElement.clientWidth; //屏幕宽
		var _height = document.documentElement.clientHeight; //屏幕高
		 
		var boxWidth = $("#mb_con").width();
		var boxHeight = $("#mb_con").height();
		 
		    //让提示框居中
		$("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
	}
	
	//确定按钮事件
	var btnOk = function (callback) {
	    $("#mb_btn_ok").click(function () {
	      $("#mb_box,#mb_con").remove();
	      if (typeof (callback) == 'function') {
	        callback();
	      }
	    });
	}
 
  	//取消按钮事件
  	var btnNo = function () {
    	$("#mb_btn_no,#mb_ico").click(function () {
    		$("#mb_box,#mb_con").remove();
    	});
  	}
  	
  
	/**
	 * 覆盖结束
	 */
	var URL = StaticURL + "{0}.action";
	function accMul(arg1,arg2) 
	{ 
		var m=0,s1=arg1.toString(),s2=arg2.toString(); 
		try{m+=s1.split(".")[1].length}catch(e){} 
		try{m+=s2.split(".")[1].length}catch(e){} 
		return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m); 
	} 
	$.extend($, {
		baseUrl: StaticURL,
		ibrReady: function(rfun){
			window.cw = plus.webview.currentWebview();
			window.userinfo = $.getUserinfo();
			rfun();
		},
		
		ajaxPost: function(an, p, fun, tip, load, t,asy){
			var sw = null, k = "";
			
			if(p){
				p.ver = top.ver;
			}
			else
			{
				p = {ver:top.ver};
			}
			k = strEnc(JSON.stringify(p), 'CC72CDCE4D3D231724B53C2273C5265E');
			$.ajax(
				{
					type : "POST",
					url : StaticURL+an+'.action',
					data : 'k='+k,
					timeout : t || 5000,
					async : !!asy,
					success : function(data){
						try
						{
							if(data)
							{
								var _resJson = JSON.parse(data);
								if(_resJson && _resJson.suc)
								{
									fun(_resJson);
								}
								else
								{
									$.showMsg(_resJson.msg);
								}
							}
							else
							{
								console.log(data);
								$.showMsg("请求服务器失败");
							}
							//$.hideLoading();
						}
						catch(e) 
						{
							console.log(e);
							//$.hideLoading();
							$.showMsg("数据异常");
							
						}
					
					},
					error : function(data)
					{
						$.hideLoading();
						$.showMsg("请求网络异常");
					}
				
				}		
			);
		},
		
		showMsg: function(msg){
			$.toast(msg,3000);
		},
		
		showLongMsg: function(msg){
			$.toast(msg,5000);
		},
		
		toast : function(msg,time)
		{
			if(!msg) return;
			//设置消息体  
	        var msgDIV = new Array();  
	        msgDIV.push('<div id="toastMessage">');  
	        msgDIV.push('<span>'+msg+'</span>');  
	        msgDIV.push('</div>');  
	        var msgEntity = $(msgDIV.join('')).appendTo($('body'));
	        msgEntity.css({'position': 'fixed','z-index':'999999','background-color':'black','color':'white','font-size':'12px','padding':'10px','margin':'10px'});
	        var v = 70; // 透明
	        msgEntity[0].filters ? msgEntity[0].style.filter = 'alpha(opacity=' + v + ')' : msgEntity[0].style.opacity = v / 100;
	        //设置消息样式
	        var windowW = $(window).width();
			var windowH = $(window).height();
			var left = (windowW - msgEntity.width()) / 2;
			var bottom = windowH / 8;
			msgEntity.css({bottom:bottom+'px',left:left+"px"});
			setTimeout(function(){$("#toastMessage").remove();},time);
		},
		
		showAlert: function(msg){
			alert(msg);
		},
		
		showLoading : function(){
			var loadingBoxTemp = '<div id="loading-box" style="position: fixed;left: 0;top:0;right: 0;bottom: 0;background: rgba(0,0,0,0.3);z-index: 9999998;"></div>'
			var imgTemp = '<div style="z-index: 9999999;left: 50%;top:50%;width: 100px;height: 100px;position: fixed;transform:translate(-50%,-50%);"></div>'
	
			var loadingBox = $(loadingBoxTemp);
			var img = $(imgTemp);
			img.css("background-image","url('../assets/img/loading.gif')");
			loadingBox.append(img);
	
			$(document.body).append(loadingBox);
		},
	
		hideLoading : function(){
			try
			{
				$('#loading-box').remove();
			}
			catch(e)
			{
				
			}
		},
	
		
		/**
		 * 打开窗体
		 * @param {Object} sw
		 * @param {Object} f
		 * @param {Object} data
		 */
		openView: function (sw, f, data){
			var swid = sw.substring(sw.indexOf("/")+1, sw.indexOf("."));
			var sw_style = {};
			var opv = null;
			opv=plus.webview.create(sw, swid, sw_style, (data||{}));
			opv.show();
		},
		
		/**
		 * 打开静态
		 * @param {Object} data
		 */
		openStaticView: function(data){
			$.openView(data.url);
		},
		
		/** 用户信息 **/
		getUserinfo: function(){
			var userinfo = localStorage.getItem("userinfo")||false;
			if(userinfo){
				userinfo = JSON.parse(userinfo); 
			}
			return userinfo;
		},
		
		
		setUserinfo: function(userinfo){
			localStorage.setItem("userinfo",  JSON.stringify(userinfo));
		},
		
		updataUserInfo:function(fun){
			var param = {mobileTel: userinfo.mobileTel, password: userinfo.password};
			$.ajaxPost("login", param, function(data){
				if(!!data){
					data.res.password = param.password;
					$.setUserinfo(data.res);
					if(!!fun){
						fun();
					}
				}
			}, null, true);
		},
		
		/**
		 * 退出
		 */
		logout: function(){
			plus.storage.removeItem("userinfo");
		},
		
		/**
		 * 下拉刷新,上拉加载
		 * @param {Object} fun
		 */
		pullToRefresh: function(func1,func2,divItem)
		{
			// 构造html
			var _html = '<div id="slideDown" style="margin-top: 0;width: 100%;"><div id="slideDown1" style="width: 100%;background: #DCDCDC;display: none;padding-top: 15px;"><p style="text-align:center;font-size: 10px;color: #000000;">松开刷新</p></div><div id="slideDown2" style="width: 100%;background: #DCDCDC;display: none;padding-top: 15px;"><p style="text-align:center;font-size: 10px;color: #000000;">正在刷新 ...</p></div></div>';
			if(divItem)
			{
				$("#"+divItem).html(_html);
			}
			else
			{
				var _firstDom = $(document.body).children().get(0);
				$(_firstDom).before(_html);
			}
			var startX, startY;
			var endX, endY;
			var distanceX, distanceY;
			document.addEventListener("touchstart", function(e) {
				startX = e.targetTouches[0].pageX;
				startY = e.targetTouches[0].pageY;
			});
			
			document.addEventListener("touchmove", function(e) {
				touchFuc("m",e);
			});
			
			// 安卓触发
			document.addEventListener("touchcancel", function(e) {
				touchFuc("e",e);
			});
			
			// IOS触发  部分安卓机也触发比如5.0系统
			document.addEventListener("touchend", function(e) {
				touchFuc("e",e);
			});
			
			function touchFuc(s,e) {

				endX = event.changedTouches[0].pageX;
				endY = event.changedTouches[0].pageY;
				//endY = e.targetTouches[0].pageY;
				//console.log(event);
				
				distanceX = Math.abs(startX - endX);
				distanceY = Math.abs(startY - endY);
				if (distanceX > distanceY) {
					startX - endX > 0 ? swipeLeft(endX,endY,s) : swipeRight(endX,endY,s);
				} else {
					if (startY != endY) {
						startY - endY > 0 ? swipeUp(endX,endY,s) : swipeDown(endX,endY,s,e);
					}
				}
			
			}
			
			//第一步：下拉过程 
	        function slideDownStep1(dist){  // dist 下滑的距离，用以拉长背景模拟拉伸效果 
	            var slideDown1 = document.getElementById("slideDown1"),
	            slideDown2 = document.getElementById("slideDown2");
	            $(slideDown2).css("display","none");
	            $(slideDown1).css("display","block"); 
	            $(slideDown1).css("height",Math.abs(dist) + "px");
	        } 
	        
	        //第二步：下拉，然后松开， 
	        function slideDownStep2(){  
	            var slideDown1 = document.getElementById("slideDown1");
	            var slideDown2 = document.getElementById("slideDown2"); 
	            $(slideDown1).css("display","none"); 
	            $(slideDown2).css("height","50px"); 
	            $(slideDown2).css("display","block"); 
	            //刷新数据 
	            //location.reload(); 
	        } 
	        
	        //第三步：刷新完成，回归之前状态 
	        function slideDownStep3(){  
	       
	            var slideDown1 = document.getElementById("slideDown1");
	            var slideDown2 = document.getElementById("slideDown2"); 
	            $(slideDown1).css("display","none");
	            $(slideDown2).css("display","none");
	            //fun();
	        } 
			
			//定义页面向左滑动事件
			function swipeLeft(X,Y,S) {
				console.log('left');	
			}
			
			//定义页面向右滑动事件
			function swipeRight(X,Y,S) {
				console.log('right');
			}

			function swipeUp(X,Y,S) {
				//document.writeln('Up');
//				if(S == "e")
//				{
//					console.log('cwtop'+$(cw).scrollTop());
//					console.log('thistop'+$(this).scrollTop());
//					
//					var _bottomNum = $(document).height() - ($(cw).scrollTop() + $(top.window).height());
//					if(_bottomNum <= 1)
//					{
//						if(func2)
//						{
//							func2();
//						}
//					}
//				}
				
			}
			
			//定义页面向下滑动事件
			function swipeDown(X,Y,S,e) {
				var scroTop = 0;
				if($.getPhoneSystem() == 'ios')
				{
					scroTop = $(cw).scrollTop();
				}
				else
				{
					scroTop = $(this).scrollTop();
				}
				if(scroTop <= 0)
				{
					e.preventDefault();
					if(S == "m")
					{
						 var _end = (startY - Y); 
						// console.log(_end);
	                    	//下滑才执行操作 
	                    	if(_end < 0){ 
	                        	slideDownStep1(_end); 
	                    	}	
					}
					else
					{
						slideDownStep2(); 
	                    //刷新成功则 
	                    if(func1)
	                    {
	                    		func1();
	                    }
	                    //模拟刷新成功进入第三步 
	                    setTimeout(function(){  
	                        slideDownStep3(); 
	                    },1000); 
				    }
				}
			}
		},
		
		/**
		 * 按钮样式选中
		 * @param {Object} btnId
		 */
		indexBtnChange:function(btnId){
			var docm = $(top.document);
			docm.find(".ibr-active").removeClass().addClass();
			docm.find("#"+btnId).addClass("ibr-active");
		},
		
		/*以上为app方法，以下为web方法*/
		toMoney: function(num){
			return num.toString().split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('');
		},
		toShortDate: function(data){
			return data.substring(5, (data.length - 3));
		},
		toDateStr: function(date){
			return date.substring(0, date.indexOf(" "));
		},
		getPhoneSystem : function()
		{
			var ua = navigator.userAgent.toLowerCase();	
			if (/iphone|ipad|ipod/.test(ua)) {
				    return "ios";		
			} else if (/android/.test(ua)) {
				    return "android";	
			}	
		},
		loadMore : function(divId,fn)
		{
			var _loadhtml = '<div id="moreLoad" style="border: #CCC solid 1px; width: 100%; height: 50px;text-align: center; line-height: 45px; font-size: 15px;color: #C0C0C0;"><strong>点击加载</strong></div>';
			$("#"+divId).append(_loadhtml).find("#moreLoad").click(function(){
				
				if(fn)
				{
					// 先删除掉 再增加
					$("#moreLoad").remove();
					if(fn())
					{
						// 设置滚动条位置,在IOS下会自动回滚到top,所以通过该方法滚动到原来位置
						if($.getPhoneSystem() == 'ios')
						{
							$(cw).focus();
						}
						$.loadMore(divId,fn);
					}
				}
			});
		},
		sendCode: function(btn, tid, fun){
			var phone = "";
			var s = null;
			if(tid != ""){
				phone = $("#" + tid);
			}
			if(phone === "" || /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone.val())){
				if(!btn.hasClass("ibr-quiet")){
					btn.addClass("ibr-quiet");
					btn.text("重新发送(120秒)");
					var m = 119;
					s = setInterval(function(){
						btn.text("重新发送("+m+"秒)");
						if(m == 0){
							clearInterval(s);
							btn.removeClass("ibr-quiet");
							btn.text("发送验证码");
						}
						m--;
					}, 1000);
					if(!!fun){
						fun();
					}
				}
			}else{
				phone.focus();
				plus.nativeUI.toast("您输入的手机号码有误！");
			}
			return s;
		},
		createProducts: function(elist,list, pdata, ps){
			
			var nyflag = "", state = null,
				estr = "" ,pDiv = "", pdiv = "", state_str = "", bfb = 0, bfb_str = "", bfbl_str = "", pcs= null, sclass = "", gm="", jx="";
			for(var i = 0; i < pdata.length; i++){
				// 体验标
				//console.log('product list data:'+JSON.stringify(pdata[i]));
				if(pdata[i].projectType == null){
					gm = pdata[i].projectProfit;
					if(gm.toString().indexOf(".") !== -1){
					gm = gm.toString().split(".");
					gm = gm[0] + "<em>." + gm[1] + "</em>"; 
				}
				var lockExitFlag = pdata[i].lockExitFlag
				if(pdata[i].lockExitFlag == 2){
					$("#ibr-s-experiencelist").hide();
				}
				if(pdata[i].lockExitFlag == 1){
					estr = "已售罄";
					$("#ibr-s-experiencelist").show();
				}
				if(pdata[i].lockExitFlag == 0){
					estr = "体验标";
					$("#ibr-s-experiencelist").show();
				}
				pDiv = '<div class="ibr-product" style="margin-bottom:0"><label class="ibr-product-type ibr-product-ty">体&nbsp;验&nbsp;标</label>'
				+'<div class="ibr-product-content">'
		  		+'<input type="hidden" id="ibr-projectId" value="'+pdata[i].projectId+'"/>'
			  	+'<div class="ibr-product-data"><span class="ibr-product-lilv"><label id="ibr-projectProfit">'+gm+'</label></span></div>'
			  	+'<div class="ibr-product-data"><span class="ibr-product-yue" style="font-size: 23px;"><label id="ibr-projectTerm">'+pdata[i].projectTerm+'</label></span></div>'
			  	+'<div class="ibr-product-data"><div><div class="ibr-circle"><div class="tymask"><div class="bkt tyb"><span>'+estr+'</span></div></div></div></div></div></div>'
			  	+'<div class="ibr-product-title"><div class="ibr-product-no"></div><div id="p">模拟真实标的投标和收益过程，<a class="tyb">仅供体验券使用。</a></div></div></div>'
				elist.html(elist.html() +pDiv);
				if(estr == "体验标"){
					$("#ibr-s-experiencelist").children(".ibr-product").click(function(){
					$.openView("product_tiyanbiao.html","right",{backid:"main",projectId:$("#ibr-projectId").val(),lockExitFlag:lockExitFlag});
				});
				}
				}else{
				// 普通标
				state_str = ""; bfb = 0; bfb_str = ""; bfbl_str = ""; nyflag = "";
				sclass = ""; gm = pdata[i].projectProfit; jx = "";
				if(pdata[i].newHandFlag == 1){
					nyflag = '<label class="ibr-newflag">新</label>';
				}
				if(!!pdata[i].qualityProductID){
					nyflag += '<label class="ibr-highflag">优</label>';
				}
				if(pdata[i].lotteryProductAPPURL){
					nyflag+='<img class="image_jiang" src=\"../assets/img/prize/jiang.png\">'
				}
				if(pdata[i].increaseInterest !== 0){
					jx = "+" + pdata[i].increaseInterest + "%";
				}
				if(gm.toString().indexOf(".") !== -1){
					gm = gm.toString().split(".");
					gm = gm[0] + "<em>." + gm[1] + "</em>"; 
				}
				
				bfb = accMul(pdata[i].qualityProductTitel,100);
				pcs = pdata[i].pageControlStatus.split(",");
				if(userinfo){
					if(((userinfo.offlineReferee !== undefined)&&(userinfo.offlineReferee !== "")) && (pcs[0] == "02" || pcs[0] == "03")){
						pcs[0] = "04";
					}
				}
				switch(pcs[0]){
					case "04": {
						state_str = '<div class="mask kt"><span>'+bfb+'</span>%</div>';
						bfb = bfb*3.6;
						if(bfb<=180){
							bfb_str = ' style="-webkit-transform:rotate('+bfb+'deg)"';
						}else{
							bfb_str = ' style="-webkit-transform:rotate(180deg)"';
							bfbl_str = ' style="-webkit-transform:rotate('+(bfb-180)+'deg)"';
						}
					}
					break;
					case "00":{
						sclass = " ylz";
						state_str = '<div class="mask bkt ylz"><span>预览中</span></div>';
					}
					break;
					case "01":{
						sclass = " yzt";
						state_str = '<div class="mask bkt yzt"><span>已暂停</span></div>';
					}
					break;
					case "02":{
						sclass = " djs";
						state_str = '<div class="mask dkt djs"><span>'+$.toShortDate(pdata[i].saleTime)+'</span></div>';
					}
					break;
					case "03":{
						sclass = " djs";
						state_str = '<div class="mask dkt djs"><span>'+$.toShortDate(pdata[i].saleTime)+'</span></div>';
					}
					break;
					case "05":{
						sclass = " ymb";
						state_str = '<div class="mask bkt ymb"><span>已满标</span></div>';
					}
					break;
					case "06":{
						sclass = " hkz";
						state_str = '<div class="mask bkt hkz"><span>还款中</span></div>';
					}
					break;
					case "07":{
						sclass = " kxz";
						state_str = '<div class="mask bkt kxz"><span>宽限中</span></div>';
					}
					break;
					case "08":{
						sclass = " ckz"
						state_str = '<div class="mask bkt ckz"><span>催款中</span></div>';
					}
					break;
					case "09":
						sclass = " yhk";
						state_str = '<div class="mask bkt yhk"><span>已还款</span></div>';
					break;
					case "10":{
						sclass = " yhk";
						state_str = '<div class="mask bkt yhk"><span>已还款</span></div>';
					}
					break;
				}
				state = $('<div><div class="ibr-circle"><div class="ibr-pie_left"><div class="ibr-left'+sclass+'"'+bfbl_str+'></div></div><div class="ibr-pie_right"><div class="ibr-right'+sclass+'"'+bfb_str+'></div></div>'+state_str+'</div></div>');
				
				pdiv = '<div class="ibr-product" data-pid="'+pdata[i].projectId+'"><label class="ibr-product-type"' + 'style="background-color:' 
				         + pdata[i].typeColor + ';">'+pdata[i].typeName+'</label>'+nyflag+'<div class="ibr-product-content">'
				         + '<div class="ibr-product-data"><span class="ibr-product-lilv" data-jx="'
				         + jx +'">'+gm
				         +'</span></div><div class="ibr-product-data"><span class="ibr-product-qx">'
				         + pdata[i].projectTerm + '</span></div><div class="ibr-product-data"><span class="ibr-product-gm">'
				         + (pdata[i].projectScale/10000) +'</span></div><div class="ibr-product-data">'
				         + state.html()+ '</div></div><div class="ibr-product-title"><div class="ibr-product-no">'
				         + pdata[i].projectName.substring(1, pdata[i].projectName.indexOf("】"))
				         +'</div><div>'+pdata[i].projectName.substring(pdata[i].projectName.indexOf("】")+1)+'</div></div></div>';
				         list.html(list.html() + pdiv);
				$(".ibr-products-list").children(".ibr-product").off();
				$(".ibr-products-list").children(".ibr-product").click(function(){
					//var param = {projectId:$(this).data("pid"), userId: "", adminFlg:""};
					$.openView("product_detail.html", "right", {projectId:$(this).data("pid"), title:$(this).find(".ibr-product-type").text(), pStatus:ps});
				});
				
				
			}
		  }
		},
		getBankIcon: function(bankname){
			var bank_icons = {"农业银行":" ibr-bankicon000","安徽省农村信用社":" ibr-bankicon001","安山银行":" ibr-bankicon002","安阳银行":" ibr-bankicon003","潍坊银行":" ibr-bankicon004","广西北部湾银行":" ibr-bankicon005","河北银行":" ibr-bankicon006","北京银行":" ibr-bankicon007","北京农商银行":" ibr-bankicon008","中国银行":" ibr-bankicon009","承德银行":" ibr-bankicon010","朝阳银行":" ibr-bankicon011","东莞银行":" ibr-bankicon012","丹东银行":" ibr-bankicon013","渤海银行":" ibr-bankicon014","锦州银行":" ibr-bankicon015","平顶山银行":" ibr-bankicon016","青海银行":" ibr-bankicon017","苏州银行":" ibr-bankicon018","营口银行":" ibr-bankicon019","周口银行":" ibr-bankicon020","包商银行":" ibr-bankicon021","中原银行":" ibr-bankicon022","开封市商业银行":" ibr-bankicon023","建设银行":" ibr-bankicon024","重庆三峡银行":" ibr-bankicon025","国家开发银行":" ibr-bankicon026","成都银行":" ibr-bankicon027","成都农商银行":" ibr-bankicon028","光大银行":" ibr-bankicon029","南充市商业银行":" ibr-bankicon030","兴业银行":" ibr-bankicon031","中信银行":" ibr-bankicon032","招商银行":" ibr-bankicon033","民生银行":" ibr-bankicon034","交通银行":" ibr-bankicon035","重庆银行":" ibr-bankicon036","重庆农村商业银行":" ibr-bankicon037","长沙银行":" ibr-bankicon038","常熟农商银行":" ibr-bankicon039","浙商银行":" ibr-bankicon040","浙江稠州商业银行":" ibr-bankicon041","江南农村商业银行":" ibr-bankicon042","龙江银行":" ibr-bankicon043","大连银行":" ibr-bankicon044","东莞农村商业银行":" ibr-bankicon045","德阳银行":" ibr-bankicon046","东营银行":" ibr-bankicon047","德州银行":" ibr-bankicon048","恒丰银行":" ibr-bankicon049","富滇银行":" ibr-bankicon050","福建海峡银行":" ibr-bankicon051","抚顺银行":" ibr-bankicon052","阜新银行":" ibr-bankicon053","广州银行":" ibr-bankicon054","广发银行":" ibr-bankicon055","广东农信":" ibr-bankicon056","桂林银行":" ibr-bankicon057","广州农商银行":" ibr-bankicon058","甘肃省农村信用社":" ibr-bankicon059","广西农村信用社":" ibr-bankicon060","贵阳银行":" ibr-bankicon061","赣州银行":" ibr-bankicon062","贵州省农村信用社":" ibr-bankicon063","内蒙古银行":" ibr-bankicon064","韩亚银行":" ibr-bankicon065","湖北银行":" ibr-bankicon066","湖北银行黄石分行":" ibr-bankicon067","河北省农村信用社":" ibr-bankicon068","湖北银行宜昌分行":" ibr-bankicon069","邯郸银行":" ibr-bankicon070","漢口银行":" ibr-bankicon071","东亚银行":" ibr-bankicon072","湖南省农村信用社":" ibr-bankicon073","河南省农村信用社":" ibr-bankicon074","华融湘江银行":" ibr-bankicon075","徽商银行":" ibr-bankicon076","衡水银行":" ibr-bankicon077","湖北省农村信用":" ibr-bankicon078","华夏银行":" ibr-bankicon079","杭州银行":" ibr-bankicon080","湖州银行":" ibr-bankicon081","工商银行":" ibr-bankicon082","华金银行":" ibr-bankicon083","晋城银行":" ibr-bankicon084","九江银行":" ibr-bankicon085","吉林银行":" ibr-bankicon086","吉林省农村信用社":" ibr-bankicon087","济宁银行":" ibr-bankicon088","江苏江阴农村商业银行":" ibr-bankicon089","晋商银行":" ibr-bankicon090","江苏银行":" ibr-bankicon091","江苏省农村信用社联合社":" ibr-bankicon092","嘉兴银行":" ibr-bankicon093","江西省农村信用社":" ibr-bankicon094","晋中银行":" ibr-bankicon095","昆仑银行":" ibr-bankicon096","库尔勒市商业银行":" ibr-bankicon097","昆山农村商业银行":" ibr-bankicon098","廊坊银行":" ibr-bankicon099","莱商银行":" ibr-bankicon100","临商银行":" ibr-bankicon101","乐山市商业银行":" ibr-bankicon102","辽阳银行":" ibr-bankicon103","兰州银行":" ibr-bankicon104","浙江民泰商业银行":" ibr-bankicon105","宁波银行":" ibr-bankicon106","鄞州银行":" ibr-bankicon107","江西银行":" ibr-bankicon108","南海农商银行":" ibr-bankicon109","南京银行":" ibr-bankicon110","宁夏银行":" ibr-bankicon111","黄河农村商业银行":" ibr-bankicon112","鄂尔多斯银行":" ibr-bankicon113","邮政储蓄银行":" ibr-bankicon114","青岛银行":" ibr-bankicon115","齐鲁银行":" ibr-bankicon116","三门峡银行":" ibr-bankicon117","四川省农村信用社":" ibr-bankicon118","顺德农商银行":" ibr-bankicon119","山东省农村信用社":" ibr-bankicon120","上海银行":" ibr-bankicon121","上海农商银行":" ibr-bankicon122","盛京银行":" ibr-bankicon123","平安银行":" ibr-bankicon124","浦发银行":" ibr-bankicon125","上饶银行":" ibr-bankicon126","深圳农村商业银行":" ibr-bankicon127","绍兴银行":" ibr-bankicon128","陕西信合":" ibr-bankicon129","石嘴山银行":" ibr-bankicon130","泰安市商业银行":" ibr-bankicon131","天津银行":" ibr-bankicon132","太仓农村商业银行":" ibr-bankicon133","天津农商银行":" ibr-bankicon134","台州银行":" ibr-bankicon135","乌鲁木齐市商业银行":" ibr-bankicon136","威海市商业银行":" ibr-bankicon137","武汉农村商业银行":" ibr-bankicon138","吴江农村商业银行":" ibr-bankicon139","无锡农村商业银行":" ibr-bankicon140","温州银行":" ibr-bankicon141","西安银行":" ibr-bankicon142","中原银行(原许昌银行)":" ibr-bankicon143","中山小榄村镇银行":" ibr-bankicon144","邢台银行":" ibr-bankicon145","新乡银行":" ibr-bankicon146","信阳银行":" ibr-bankicon147","宜宾市商业银行":" ibr-bankicon148","尧都农商银行":" ibr-bankicon149","云南省农村信用社":" ibr-bankicon150","阳泉市商业银行":" ibr-bankicon151","玉溪市商业银行":" ibr-bankicon152","齐商银行":" ibr-bankicon153","自贡市商业银行":" ibr-bankicon154","张家口市商业银行":" ibr-bankicon155","浙江农信":" ibr-bankicon156","浙江泰隆商业银行":" ibr-bankicon157","张家港农村商业银行":" ibr-bankicon158","贵州银行":" ibr-bankicon159","郑州银行":" ibr-bankicon160"};
			var res = {icon:"", name:""};
			res.icon = bank_icons[bankname]||"ibr-bankicon999";
			if(res.icon === "ibr-bankicon999"){
				res.name = bankname;
			}
			return res;
		},
		onswipePage: function(fun, noTag){
			var sx = 0, ex = 0, sy= 0, ey=0, fx = "", ish = true;
			document.addEventListener("touchstart", function(e){
				if(e.target.tagName != noTag){
					sx = event.targetTouches[0].pageX;
					sy = event.targetTouches[0].pageY;
				}
			}, false);
			document.addEventListener('touchmove', function(e){
				if(e.target.tagName != noTag){
					tfx = ""; ish = true;
					ex = event.targetTouches[0].pageX;
					ey = event.targetTouches[0].pageY;
					if(ey - sy < -10){
						ish = false;
					}else if(ey - sy > 10){
						ish = false;
					}
					if(ex - sx < -10 && ish){
						fx = "left";
					}else if(ex - sx > 10 && ish){
						fx = "rigth";
					}
					fun(fx);
				}
			}, false);
		}
	});
	
	$.fn.verifyForm = function(){
		//tester
		var inputs = $(this[0]).find("input, select");
		var tester = "", thisC = null, tipstr = "", res = {data:{}, result:true};
		var vphone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, vpwd = /^([0-9a-zA-Z\`\~\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\'\\\:\"\|\,\.\/\<\>\?]){6,12}$/, 
			vcardid = /\d{17}[\d|x]|\d{15}/, nullv = "";
		inputs.each(function(ii){
			thisC = $(this);
			tester = thisC.data("tester")||"";
			tipstr = thisC.attr("placeholder")||thisC.find("option").first().text();
			if(thisC[0].tagName === "SELECT"){
				nullv = "-1";
			}else{
				nullv = "";
				tipstr = "请输入" + tipstr;
			}

			
			if(tester.indexOf("vnull") != -1 && thisC.val().trim() === nullv){
				plus.nativeUI.toast(tipstr);
				res.result = false;
			}else if(thisC.val().trim() != ""){ 
				if(tester.indexOf("vphone") != -1 && !vphone.test(thisC.val())){
					plus.nativeUI.toast("您输入的"+tipstr+"有误");
					res.result = false;
				}else if(tester.indexOf("vpwd") != -1 && !vpwd.test(thisC.val())){
					plus.nativeUI.toast("请输入6~12位密码(密码只能由数字、字母、符号组成)");
					res.result = false;
				}else if(tester.indexOf("vcardid") != -1 && !vcardid.test(thisC.val())){
					plus.nativeUI.toast("您输入的身份证有误！");
					res.result = false;
				}
			}
			if(!res.result){
				res.data = null;
				thisC.focus();
				return res.result;
			}else{
				res.data[thisC.attr("name")] = thisC.val();
			}
		});
		return res;
	}
	$.fn.txt_delall = function(){
		if($(this).length > 0){
			$(this).each(function(){
				var right = $(this).width() + $(this).offset().left - 32;
				$(this).after('<a class="del-ai" style="left: '+right+'px;"><i class="ibr-icon-times-circle"></i></a>');
				$(this).on("input",function(){
					if(this.value.length > 0){
						$(this).next().show();
					}else{
						$(this).next().hide();
					}
				});
				$(".del-ai").click(function(){
					$(this).prev().val("");
					$(this).prev().focus();
					$(this).hide();
				});
			});	
		}
	}
	$.fn.bindCity = function(cid, txt){
    	var city = {cityb:["\u62db\u5546\u94f6\u884c","\u5de5\u5546\u94f6\u884c","\u5efa\u8bbe\u94f6\u884c","\u6d66\u53d1\u94f6\u884c","\u519c\u4e1a\u94f6\u884c","\u6c11\u751f\u94f6\u884c","\u6df1\u5733\u53d1\u5c55\u94f6\u884c","\u5174\u4e1a\u94f6\u884c","\u4ea4\u901a\u94f6\u884c","\u5149\u5927\u94f6\u884c","\u4e2d\u56fd\u94f6\u884c","\u5e7f\u5dde\u94f6\u8054","\u5317\u4eac\u94f6\u884c","\u0042\u0045\u0041\u4e1c\u4e9a\u94f6\u884c","\u6e24\u6d77\u94f6\u884c","\u5e73\u5b89\u94f6\u884c","\u5e7f\u53d1\u94f6\u884c","\u4e0a\u6d77\u519c\u5546\u94f6\u884c","\u90ae\u653f\u50a8\u84c4\u94f6\u884c","\u4e2d\u4fe1\u94f6\u884c","\u676d\u5dde\u94f6\u884c","\u5fbd\u5546\u94f6\u884c","\u5357\u4eac\u94f6\u884c","\u6d59\u5546\u94f6\u884c","\u664b\u57ce\u94f6\u884c","\u5546\u4e1a\u94f6\u884c","\u5b81\u6ce2\u94f6\u884c","\u65e5\u7167\u94f6\u884c","\u6cb3\u5317\u94f6\u884c","\u519c\u6751\u4fe1\u7528\u793e\u8054\u5408\u793e","\u534e\u590f\u94f6\u884c","\u6e29\u5dde\u94f6\u884c","\u5e7f\u5dde\u94f6\u884c","\u5927\u8fde\u94f6\u884c","\u4e1c\u839e\u94f6\u884c","\u5bcc\u6ec7\u94f6\u884c","\u9a7b\u9a6c\u5e97\u94f6\u884c","\u4e0a\u6d77\u94f6\u884c","\u7a20\u5dde\u94f6\u884c","\u5b89\u5409\u519c\u6751\u4fe1\u7528\u5408\u4f5c\u8054\u793e","\u5317\u90e8\u6e7e\u94f6\u884c","\u6210\u90fd\u94f6\u884c","\u94f6\u8054\u4ee3\u4ed8","\u519c\u6751\u5408\u4f5c\u94f6\u884c","\u94f6\u5ea7\u6751\u9547\u94f6\u884c","\u4e1c\u6d77\u94f6\u884c","\u897f\u5b89\u94f6\u884c","\u9752\u5c9b\u94f6\u884c","\u65b0\u4e61\u94f6\u884c","\u6e56\u5317\u94f6\u884c","\u54c8\u5c14\u6ee8\u94f6\u884c","\u90d1\u5dde\u94f6\u884c","\u519c\u6751\u4fe1\u7528\u5408\u4f5c\u8054\u793e","\u8d35\u5dde\u94f6\u884c","\u8d63\u5dde\u94f6\u884c","\u76db\u4eac\u94f6\u884c","\u8d35\u9633\u94f6\u884c","\u77f3\u5634\u5c71\u94f6\u884c","\u6c5f\u5357\u56fd\u6c11\u6751\u9547\u94f6\u884c","\u6d4e\u5b81\u94f6\u884c","\u90af\u90f8\u94f6\u884c","\u957f\u6c99\u94f6\u884c","\u7ecd\u5174\u94f6\u884c","\u6842\u6797\u94f6\u884c","\u9f50\u5546\u94f6\u884c","\u6c47\u4e30\u94f6\u884c","\u9526\u5dde\u94f6\u884c","\u4fe1\u7528\u5408\u4f5c\u793e","\u6751\u9547\u94f6\u884c","\u4e1c\u8425\u94f6\u884c","\u70df\u53f0\u94f6\u884c","\u5357\u660c\u94f6\u884c","\u6c5f\u82cf\u94f6\u884c","\u8499\u53e4\u94f6\u884c","\u957f\u5b89\u94f6\u884c","\u53a6\u95e8\u94f6\u884c","\u6f4d\u574a\u94f6\u884c","\u6d77\u5ce1\u94f6\u884c\u0020","\u9f50\u9c81\u94f6\u884c","\u53f0\u5dde\u94f6\u884c","\u5fb7\u5dde\u94f6\u884c","\u83b1\u5546\u94f6\u884c","\u6c49\u53e3\u94f6\u884c","\u6052\u4e30\u94f6\u884c","\u8861\u6c34\u94f6\u884c","\u67f3\u5dde\u94f6\u884c","\u5408\u80a5\u94f6\u884c","\u4e09\u5ce1\u94f6\u884c"],
    	city0:["\u5317\u4eac","\u5929\u6d25","\u6cb3\u5317","\u5c71\u897f","\u5185\u8499\u53e4","\u8fbd\u5b81","\u5409\u6797","\u9ed1\u9f99\u6c5f","\u4e0a\u6d77","\u6c5f\u82cf","\u6d59\u6c5f","\u5b89\u5fbd","\u798f\u5efa","\u6c5f\u897f","\u5c71\u4e1c","\u6cb3\u5357","\u6e56\u5317","\u6e56\u5357","\u5e7f\u4e1c","\u5e7f\u897f","\u6d77\u5357","\u91cd\u5e86","\u56db\u5ddd","\u8d35\u5dde","\u4e91\u5357","\u897f\u85cf","\u9655\u897f","\u7518\u8083","\u9752\u6d77","\u5b81\u590f","\u65b0\u7586","\u53f0\u6e7e","\u9999\u6e2f","\u6fb3\u95e8","\u56fd\u5916"],
    	city1:["\u4e1c\u57ce","\u897f\u57ce","\u5d07\u6587","\u5ba3\u6b66","\u671d\u9633","\u4e30\u53f0","\u77f3\u666f\u5c71","\u6d77\u6dc0","\u95e8\u5934\u6c9f","\u623f\u5c71","\u901a\u5dde","\u987a\u4e49","\u660c\u5e73","\u5927\u5174","\u5e73\u8c37","\u6000\u67d4","\u5bc6\u4e91","\u5ef6\u5e86"],
    	city2:["\u548c\u5e73","\u6cb3\u4e1c","\u6cb3\u897f","\u5357\u5f00","\u6cb3\u5317","\u7ea2\u6865","\u5858\u6cbd","\u6c49\u6cbd","\u5927\u6e2f","\u4e1c\u4e3d","\u897f\u9752","\u6d25\u5357","\u5317\u8fb0","\u5b81\u6cb3","\u6b66\u6e05","\u9759\u6d77","\u5b9d\u577b","\u84df\u53bf"],
    	city3:["\u77f3\u5bb6\u5e84","\u5510\u5c71","\u79e6\u7687\u5c9b","\u90af\u90f8","\u90a2\u53f0","\u4fdd\u5b9a","\u5f20\u5bb6\u53e3","\u627f\u5fb7","\u6ca7\u5dde","\u5eca\u574a","\u8861\u6c34"],
    	city4:["\u592a\u539f","\u5927\u540c","\u9633\u6cc9","\u957f\u6cbb","\u664b\u57ce","\u6714\u5dde","\u664b\u4e2d","\u8fd0\u57ce","\u5ffb\u5dde","\u4e34\u6c7e","\u5415\u6881"],
    	city5:["\u547c\u548c\u6d69\u7279","\u5305\u5934","\u4e4c\u6d77","\u8d64\u5cf0","\u901a\u8fbd","\u9102\u5c14\u591a\u65af","\u547c\u4f26\u8d1d\u5c14","\u5df4\u5f66\u6dd6\u5c14","\u4e4c\u5170\u5bdf\u5e03","\u6d77\u62c9\u5c14","\u96c6\u5b81","\u5df4\u5f66\u6d69\u7279","\u4e4c\u5170\u6d69\u7279","\u9521\u6797\u6d69\u7279","\u4e34\u6cb3","\u4e4c\u5170\u5bdf\u5e03\u76df","\u5174\u5b89\u76df","\u963f\u62c9\u5584\u76df","\u5174\u5b89","\u9521\u6797\u90ed\u52d2","\u963f\u62c9\u5584"],
    	city6:["\u6c88\u9633","\u5927\u8fde","\u978d\u5c71","\u629a\u987a","\u672c\u6eaa","\u4e39\u4e1c","\u9526\u5dde","\u8425\u53e3","\u961c\u65b0","\u8fbd\u9633","\u76d8\u9526","\u94c1\u5cad","\u671d\u9633","\u846b\u82a6\u5c9b"],
    	city7:["\u957f\u6625","\u5409\u6797","\u56db\u5e73","\u8fbd\u6e90","\u901a\u5316","\u767d\u5c71","\u677e\u539f","\u767d\u57ce","\u6885\u6cb3\u53e3","\u73f2\u6625","\u5ef6\u5409","\u5ef6\u8fb9"],
    	city8:["\u54c8\u5c14\u6ee8","\u9f50\u9f50\u54c8\u5c14","\u9e21\u897f","\u9e64\u5c97","\u53cc\u9e2d\u5c71","\u5927\u5e86","\u4f0a\u6625","\u4f73\u6728\u65af","\u4e03\u53f0\u6cb3","\u7261\u4e39\u6c5f","\u9ed1\u6cb3","\u7ee5\u5316","\u672a\u77e5","\u5927\u5174\u5b89\u5cad"],
    	city9:["\u9ec4\u6d66","\u5357\u533a","\u5362\u6e7e","\u5f90\u6c47","\u957f\u5b81","\u9759\u5b89","\u666e\u9640","\u95f8\u5317","\u8679\u53e3","\u6768\u6d66","\u95f5\u884c","\u5b9d\u5c71","\u5609\u5b9a","\u6d66\u4e1c\u65b0\u533a","\u91d1\u5c71","\u677e\u6c5f","\u5357\u6c47","\u5949\u8d24","\u9752\u6d66","\u5d07\u660e"],
    	city10:["\u5357\u4eac","\u65e0\u9521","\u5f90\u5dde","\u5e38\u5dde","\u82cf\u5dde","\u5357\u901a","\u8fde\u4e91\u6e2f","\u6dee\u5b89","\u76d0\u57ce","\u626c\u5dde","\u9547\u6c5f","\u6cf0\u5dde","\u5bbf\u8fc1"],
    	city11:["\u676d\u5dde","\u5b81\u6ce2","\u6e29\u5dde","\u5609\u5174","\u6e56\u5dde","\u7ecd\u5174","\u91d1\u534e","\u8862\u5dde","\u821f\u5c71","\u53f0\u5dde","\u4e3d\u6c34"],
    	city12:["\u5408\u80a5","\u829c\u6e56","\u868c\u57e0","\u6dee\u5357","\u9a6c\u978d\u5c71","\u6dee\u5317","\u94dc\u9675","\u5b89\u5e86","\u9ec4\u5c71","\u6ec1\u5dde","\u961c\u9633","\u5bbf\u5dde","\u516d\u5b89","\u4eb3\u5dde","\u6c60\u5dde","\u5ba3\u57ce"],
    	city13:["\u798f\u5dde","\u53a6\u95e8","\u8386\u7530","\u4e09\u660e","\u6cc9\u5dde","\u6f33\u5dde","\u5357\u5e73","\u9f99\u5ca9","\u5b81\u5fb7"],
    	city14:["\u5357\u660c","\u666f\u5fb7\u9547","\u840d\u4e61","\u4e5d\u6c5f","\u65b0\u4f59","\u9e70\u6f6d","\u8d63\u5dde","\u5409\u5b89","\u5b9c\u6625","\u629a\u5dde","\u4e0a\u9976"],
    	city15:["\u6d4e\u5357","\u9752\u5c9b","\u6dc4\u535a","\u67a3\u5e84","\u4e1c\u8425","\u70df\u53f0","\u6f4d\u574a","\u6d4e\u5b81","\u6cf0\u5b89","\u5a01\u6d77","\u65e5\u7167","\u83b1\u829c","\u4e34\u6c82","\u5fb7\u5dde","\u804a\u57ce","\u6ee8\u5dde","\u83cf\u6cfd"],
    	city16:["\u90d1\u5dde","\u5f00\u5c01","\u6d1b\u9633","\u5e73\u9876\u5c71","\u5b89\u9633","\u9e64\u58c1","\u65b0\u4e61","\u7126\u4f5c","\u6fee\u9633","\u8bb8\u660c","\u6f2f\u6cb3","\u4e09\u95e8\u5ce1","\u5357\u9633","\u5546\u4e18","\u4fe1\u9633","\u5468\u53e3","\u9a7b\u9a6c\u5e97","\u6f62\u5ddd","\u6d4e\u6e90"],
    	city17:["\u6b66\u6c49","\u9ec4\u77f3","\u5341\u5830","\u4ed9\u6843","\u5b9c\u660c","\u8944\u6a0a","\u9102\u5dde","\u8346\u95e8","\u5b5d\u611f","\u8346\u5dde","\u9ec4\u5188","\u54b8\u5b81","\u968f\u5dde","\u6c5f\u6c49","\u5929\u95e8","\u6f5c\u6c5f","\u795e\u519c\u67b6\u6797\u533a","\u6069\u65bd"],
    	city18:["\u957f\u6c99","\u682a\u6d32","\u6e58\u6f6d","\u8861\u9633","\u90b5\u9633","\u5cb3\u9633","\u5e38\u5fb7","\u5f20\u5bb6\u754c","\u76ca\u9633","\u90f4\u5dde","\u6c38\u5dde","\u6000\u5316","\u5a04\u5e95","\u5409\u9996","\u6e58\u897f"],
    	city19:["\u5e7f\u5dde","\u97f6\u5173","\u6df1\u5733","\u73e0\u6d77","\u6c55\u5934","\u4f5b\u5c71","\u6c5f\u95e8","\u6e5b\u6c5f","\u8302\u540d","\u987a\u5fb7","\u6f6e\u9633","\u8087\u5e86","\u60e0\u5dde","\u6885\u5dde","\u6c55\u5c3e","\u6cb3\u6e90","\u9633\u6c5f","\u6e05\u8fdc","\u4e1c\u839e","\u4e2d\u5c71","\u6f6e\u5dde","\u63ed\u9633","\u4e91\u6d6e"],
    	city20:["\u5357\u5b81","\u67f3\u5dde","\u6842\u6797","\u68a7\u5dde","\u5317\u6d77","\u9632\u57ce\u6e2f","\u94a6\u5dde","\u8d35\u6e2f","\u7389\u6797","\u767e\u8272","\u8d3a\u5dde","\u6cb3\u6c60","\u6765\u5bbe","\u5d07\u5de6"],
    	city21:["\u6d77\u53e3","\u4e09\u4e9a","\u510b\u5dde"],
    	city22:["\u4e07\u5dde","\u6daa\u9675","\u6e1d\u4e2d","\u5927\u6e21\u53e3","\u6c5f\u5317","\u6c99\u576a\u575d","\u4e5d\u9f99\u5761","\u5357\u5cb8","\u5317\u789a","\u4e07\u76db","\u53cc\u6865","\u6e1d\u5317","\u5df4\u5357","\u957f\u5bff","\u7da6\u6c5f","\u6f7c\u5357","\u94dc\u6881","\u5927\u8db3","\u8363\u660c","\u74a7\u5c71","\u6881\u5e73","\u57ce\u53e3","\u4e30\u90fd","\u57ab\u6c5f","\u6b66\u9686","\u5fe0\u53bf","\u5f00\u53bf","\u4e91\u9633","\u5949\u8282","\u5deb\u5c71","\u5deb\u6eaa","\u9ed4\u6c5f","\u77f3\u67f1","\u79c0\u5c71","\u9149\u9633","\u5f6d\u6c34","\u6c5f\u6d25","\u5408\u5ddd","\u6c38\u5ddd","\u5357\u5ddd"],
    	city23:["\u6210\u90fd","\u81ea\u8d21","\u6500\u679d\u82b1","\u6cf8\u5dde","\u5fb7\u9633","\u7ef5\u9633","\u5e7f\u5143","\u9042\u5b81","\u5185\u6c5f","\u4e50\u5c71","\u5357\u5145","\u7709\u5c71","\u5b9c\u5bbe","\u5e7f\u5b89","\u8fbe\u5dde","\u96c5\u5b89","\u5df4\u4e2d","\u8d44\u9633","\u963f\u575d","\u7518\u5b5c","\u51c9\u5c71"],
    	city24:["\u8d35\u9633","\u516d\u76d8\u6c34","\u9075\u4e49","\u5b89\u987a","\u5174\u4e49","\u51ef\u91cc","\u90fd\u5300","\u94dc\u4ec1","\u9ed4\u897f\u5357","\u6bd5\u8282","\u9ed4\u4e1c\u5357","\u9ed4\u5357"],
    	city25:["\u6606\u660e","\u6012\u6c5f","\u66f2\u9756","\u7389\u6eaa","\u4fdd\u5c71","\u662d\u901a","\u4e3d\u6c5f","\u666e\u6d31","\u4e34\u6ca7","\u7248\u7eb3","\u695a\u96c4","\u7ea2\u6cb3","\u6587\u5c71","\u897f\u53cc\u7248\u7eb3","\u5927\u7406","\u5fb7\u5b8f","\u6012\u6c5f\u5088","\u8fea\u5e86"],
    	city26:["\u62c9\u8428","\u660c\u90fd","\u5c71\u5357","\u65e5\u5580\u5219","\u90a3\u66f2","\u963f\u91cc","\u6797\u829d"],
    	city27:["\u897f\u5b89","\u94dc\u5ddd","\u5b9d\u9e21","\u54b8\u9633","\u6e2d\u5357","\u5ef6\u5b89","\u6c49\u4e2d","\u6986\u6797","\u5b89\u5eb7","\u5546\u6d1b"],
    	city28:["\u5170\u5dde","\u5609\u5cea\u5173","\u91d1\u660c","\u767d\u94f6","\u5929\u6c34","\u6b66\u5a01","\u5f20\u6396","\u5e73\u51c9","\u9152\u6cc9","\u5e86\u9633","\u5b9a\u897f","\u9647\u5357","\u4e34\u590f","\u7518\u5357"],
    	city29:["\u897f\u5b81","\u683c\u5c14\u6728","\u6d77\u4e1c","\u6d77\u5317","\u9ec4\u5357","\u6d77\u5357","\u679c\u6d1b","\u7389\u6811","\u6d77\u897f"],
    	city30:["\u94f6\u5ddd","\u77f3\u5634\u5c71","\u5434\u5fe0","\u56fa\u539f","\u4e2d\u536b"],
    	city31:["\u4e4c\u9c81\u6728\u9f50","\u514b\u62c9\u739b\u4f9d","\u594e\u5c6f","\u5410\u9c81\u756a","\u54c8\u5bc6","\u660c\u5409","\u535a\u5c14\u5854\u62c9","\u5df4\u97f3\u90ed\u695e","\u963f\u514b\u82cf","\u514b\u5b5c\u52d2\u82cf","\u5580\u4ec0","\u548c\u7530","\u4f0a\u7281","\u5854\u57ce","\u963f\u52d2\u6cf0","\u77f3\u6cb3\u5b50"],
    	city32:["\u53f0\u6e7e"],
    	city33:["\u9999\u6e2f"],
    	city34:["\u6fb3\u95e8"],
    	city35:["\u7f8e\u56fd","\u6fb3\u5927\u5229\u4e9a","\u52a0\u62ff\u5927","\u82f1\u56fd","\u65e5\u672c","\u65b0\u52a0\u5761","\u5fb7\u56fd","\u6cd5\u56fd","\u97e9\u56fd","\u6bd4\u5229\u65f6","\u65b0\u897f\u5170","\u745e\u5178","\u745e\u58eb","\u8377\u5170","\u963f\u8054\u914b","\u82ac\u5170","\u4e39\u9ea6","\u6cf0\u56fd","\u897f\u73ed\u7259","\u610f\u5927\u5229","\u632a\u5a01","\u5965\u5730\u5229","\u7231\u5c14\u5170","\u9a6c\u6765\u897f\u4e9a","\u5c3c\u65e5\u5229\u4e9a","\u4fc4\u7f57\u65af","\u5df4\u897f","\u5357\u975e","\u8461\u8404\u7259","\u58a8\u897f\u54e5","\u5370\u5c3c","\u8d8a\u5357","\u4ee5\u8272\u5217","\u79d1\u5a01\u7279","\u5e0c\u814a","\u5308\u7259\u5229","\u5176\u4ed6"]}
    	
    	var thisC = $(this), tmp = "";
    	for(var i = 0; i < city["city" + cid].length; i++){
    		if(cid === "0"){
    			tmp = "data-cid='"+(i+1)+"'";
    		}
    		thisC.append("<option value='" + city["city" + cid][i] + "' "+tmp+">" + city["city" + cid][i] +"</option>");
    	}
    }
})(Zepto);