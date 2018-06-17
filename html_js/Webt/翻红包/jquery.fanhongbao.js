/**
 * 翻红包游戏插件 
 */
(function(jQuery){
	jQuery.fn.fanhongbao = function(prop){
		var el=this;
		//默认属性值
		var defaultOptions={
			width:'350px', // 宽
            bgImg : '',  // 整个背景图片
            itemBgImg : '', // 元素背景图片
            itemAwardImg : '', // 中奖图片
            itemNoAwardImg:'',//未中奖图片
            level : 1, // 游戏关卡级别
        	onStart : null, //点击开始 传入param 返回true false, false时游戏停止
        	onStop : null, // 点击结束后
            onItemClick : null // 点红包
		}
		//用户自定义属性覆盖默认属性
		var param = jQuery.extend({},defaultOptions, prop);
		//计算游戏界面实际的宽
		var eleObj='';
		//如果指定间距
		if(param.padding){
			eleObj=computeWidth(param.width,param.padding);
		}
		//否则按默认1/4计算
		else{
			eleObj=computeWidth(param.width);
		}
		//上移高度
		var _tstepNum =eleObj.top;
		//左移高度
		var _lstepNum =eleObj.left;
        //盒子高度
        var height=eleObj.height;
        //元素宽高
        var eleWidth=eleObj.eleWidth;
		//速度
		var mSpeed = 100;
		var _timerArg = [];
		var _return = {
			init:function(level){
				param.level=level;
				param.bgImg=param.rootPath+'L'+level+'_bac2.png';
				param.itemBgImg=param.rootPath+'L'+level+'_bac_ele.png';
				//初始化游戏界面
				var _html="";
				//生成基本html框架
				el.html('<div class="fanhongbao"></div><div id="timer"><span>3</span></div>');
				//设置游戏框样式
				el.css({
					padding:eleObj.padding,
					width:eleObj.width,
					height:eleObj.height,
					'background-size':'100% 100%',
					position:'relative'
				});
				//设置游戏框内容宽高
				el.find('.fanhongbao').css({
					width:eleObj.width,
					height:eleObj.height,
					position:'relative'
				});
			    //生成子元素
		 		var mARoute = [];
			    mARoute=createARoute();
			    initData(el,mARoute);
			},
			// 开始
			start : function()
			{   
				el.find('.fanhongbao .side1').show().animate({'width':'100%'},300);
				el.find('.fanhongbao .side2').hide();
				// 执行onstart后游戏进入开始,且判断游戏关卡等级
				setTimeout(function(){
					jQuery('#timer span').html('2');
				},1000);
				setTimeout(function(){
					jQuery('#timer span').html('1');
				},2000);
				setTimeout(function(){
					jQuery('#timer').css('display','none');
				},3000);
				//每次清除事件
				el.find('.fanhongbao').off('click','.child',eleClickFun);
				//获取当前游戏等级
				var _level =param.level ;
				//根据等级初始化游戏方块位置
				// 平均速度 蛇传
				if(_level ==1)
				{
					mSpeed = param.onsetOperation.speed[0].mSpeed;
					mARoute=createARoute();
					initData(el,mARoute);
					el.find(".fanhongbao .child").css("transition-duration",param.onsetOperation.speed[0].transition);
					
				}
				else if(_level==2){
					mSpeed=param.onsetOperation.speed[1].mSpeed;
					mARoute=createARoute();
					initData(el,mARoute);
					el.find(".fanhongbao .child").css("transition-duration",param.onsetOperation.speed[1].transition);
				}
				// 平均速度 交叉
				else if(_level ==3)
				{
					mSpeed = param.onsetOperation.speed[2].mSpeed;
					mARoute=createBRoute();
					initData(el,mARoute);
					el.find(".fanhongbao .child").css("transition-duration",param.onsetOperation.speed[2].transition);		
				}
				
				// 平均速度 蛇传2
				else if(_level == 4)
				{
					mARoute=createCInit();
					initData(el,mARoute);
					mSpeed = param.onsetOperation.speed[3].mSpeed;
					mARoute=createCRoute();
					el.find(".fanhongbao .child").css("transition-duration",param.onsetOperation.speed[3].transition);
				}
				else if(_level==5){
					mSpeed =param.onsetOperation.speed[4].mSpeed;
					mARoute=createARoute();
					initData(el,mARoute);
					el.find(".fanhongbao .child").css("transition-duration",param.onsetOperation.speed[4].transition);
				}
				//随机生成index
				var index=GetRandomNum(0,9);
				//设置第index个child z-index值，以使其再最上方，防止重叠情况被其它元素盖住
				el.find(".fanhongbao .child").eq(index).css('z-index',3);
				//设置选中index背景为中奖背景
				el.find(".fanhongbao .child").eq(index).find('.side2').css('background-image','url('+param.rootPath+param.itemAwardImg+')');
				//游戏初始动画有奖方块翻转，告诉用户有奖方块
				setTimeout(function(){
					el.find(".fanhongbao .child").eq(index).find('.side1').stop().animate({width:0},400,function(){
						jQuery(this).hide().next().show();
						jQuery(this).next().animate({'width':'100%'},400)
					});
				},4000)
				//设置时间延迟，以使有奖方块翻转后停顿几秒再翻转回去
				setTimeout(function(){
					el.find(".fanhongbao .child").eq(index).find('.side2').stop().animate({'width':0},300,function(){
						jQuery(this).hide().prev().show();
						jQuery(this).prev().animate({'width':'100%'},300);
					});
				},6000);
				//设置时间延迟，使初始动画结束后再启动游戏定时器
				setTimeout(function(){
					if(_level==2){
						setTimeout(function(){
							mARoute.reverse();
						},ranTimer/2-2500);
					};
					if(_level==5){
						setTimeout(function(){
							mARoute.reverse();
						},ranTimer/5);
						setTimeout(function(){
							mARoute=setBRoute();
						},ranTimer/3+2000);
					}
					el.find(".fanhongbao .child").each(function(index,item){
						if(_level ==4)
						{
							_timerArg.push(start2(index,item,mARoute));
						}
						else{
							_timerArg.push(start(item,mARoute));
						}
					});
				},7000);
				//随机产生多少秒后自动停止
			    var ranTimer;
				//设置游戏停止
				ranTimer=Math.floor(Math.random()*(param.onsetOperation.Timer[_level-1].max-param.onsetOperation.Timer[_level-1].min)+param.onsetOperation.Timer[_level-1].min)+1;
				setTimeout(function(){
					//调用stop方法
					_return.stop();
					//点击停止按钮后才能点击元素
					el.find(".fanhongbao").on('click','.child',eleClickFun);
				},ranTimer)
				//游戏停止后为每个元素添加事件，让用户选择牌子
				var eleClickFun=function(){
					jQuery(this).find('.side1').stop().animate({width:0},300,function(){
						jQuery(this).hide().next().show();
						jQuery(this).next().animate({'width':'100%'},300);
					});
					//点击后就取消点击事件
				    el.find('.fanhongbao').off('click','.child',eleClickFun);
		            //用户点击元素后判断对错，显示正确牌子
					setTimeout(function(){
						if(el.find('.fanhongbao .child').eq(index).find('.side1').css('width')=='0px'){
							param.onItemClick(param,true);
						}
						else{
							//防止用户重复点击
							el.find('.fanhongbao .child').eq(index).find('.side1').stop().animate({width:0},300,function(){
								jQuery(this).hide().next().show();
								jQuery(this).next().animate({'width':'100%'},300);
							});
							index='';
							setTimeout(function(){
								param.onItemClick(param,false);
							},2000);	
						}
					},2000)
				};
			},
			
			// 停止
			stop : function()
			{	
				for (var i = 0; i < _timerArg.length; i++) {
					window.clearInterval(_timerArg[i]);
				}
				if(param.onStop)
				{
					param.onStop()
				}
			}
		}		
		function GetRandomNum(Min,Max)
		{   
			var Range = Max - Min;   
			var Rand = Math.random();   
			return(Min + Math.round(Rand * Range));   
		}  		 
		// 路由a
		function createARoute()	
		{
			mARoute = [];
			var _len = 10;
			var _templen = _len / 2;
			for (var i = 0; i < _len; i++) {
				if(i < _templen)
					mARoute.push({x:i*_lstepNum,y:0});
				else
					mARoute.push({x: (_len - i - 1) *_lstepNum,y:_tstepNum});
			}
			return mARoute;
		}
		// 路由b
		function createBRoute()
		{
			mARoute = [];
			mARoute.push({x:0,y:0});
			mARoute.push({x:1 * _lstepNum,y:_tstepNum});
			mARoute.push({x:2 * _lstepNum,y:0});
			mARoute.push({x:3 * _lstepNum,y:_tstepNum});
			mARoute.push({x:4 * _lstepNum,y:0});
			mARoute.push({x:4 * _lstepNum,y:_tstepNum});
			mARoute.push({x:3 * _lstepNum,y:0});
			mARoute.push({x:2 * _lstepNum,y:_tstepNum});
			mARoute.push({x:1 * _lstepNum,y:0});
			mARoute.push({x:0 * _lstepNum,y:_tstepNum});
			return mARoute;
		}
	  function setBRoute(){
		   mARoute[0]={x:0,y:0};
			mARoute[1]={x:1 * _lstepNum,y:_tstepNum};
			mARoute[2]={x:2 * _lstepNum,y:0};
			mARoute[3]={x:3 * _lstepNum,y:_tstepNum};
			mARoute[4]={x:4 * _lstepNum,y:0};
			mARoute[5]={x:4 * _lstepNum,y:_tstepNum};
			mARoute[6]={x:3 * _lstepNum,y:0};
			mARoute[7]={x:2 * _lstepNum,y:_tstepNum};
			mARoute[8]={x:1 * _lstepNum,y:0};
			mARoute[9]={x:0 * _lstepNum,y:_tstepNum};
			return mARoute;
	  }
		 // 路由c
		function createCRoute()
		{
		 	mARoute = [];
		 	mARoute.push({x:0,y:0}); //1
		 	mARoute.push({x:1 * _lstepNum,y:0}); //2
		 	mARoute.push({x:1 * _lstepNum,y:_tstepNum}); //3
		 	mARoute.push({x:2 * _lstepNum,y:_tstepNum}); // 4
		 	mARoute.push({x:2 * _lstepNum,y:0}); // 5
		 	mARoute.push({x:3 * _lstepNum,y:0}); // 6
		 	mARoute.push({x:3 * _lstepNum,y:_tstepNum}); //7
		 	mARoute.push({x:4 * _lstepNum,y:_tstepNum}); //8 8
		 	mARoute.push({x:4 * _lstepNum,y:0}); //9
		 	mARoute.push({x:3 * _lstepNum,y:0}); //6
		 	mARoute.push({x:3 * _lstepNum,y:_tstepNum}); //7 11
		 	mARoute.push({x:2 * _lstepNum,y:_tstepNum}); //4 12
		 	mARoute.push({x:2 * _lstepNum,y:0}); //5
		 	mARoute.push({x:1 * _lstepNum,y:0}); // 2
		 	mARoute.push({x:1 * _lstepNum,y:_tstepNum}); //3 15
		 	mARoute.push({x:0,y:_tstepNum}); //10
		 	return mARoute;
		}
		 
		function createCInit()
		 {
		 	mARoute = [];
		 	mARoute.push({x:0,y:0});
		 	mARoute.push({x:1 * _lstepNum,y:0});
		 	mARoute.push({x:1 * _lstepNum,y:_tstepNum});
		 	mARoute.push({x:2 * _lstepNum,y:_tstepNum});
		 	mARoute.push({x:2 * _lstepNum,y:0});
		 	mARoute.push({x:3 * _lstepNum,y:0});
		 	mARoute.push({x:3 * _lstepNum,y:_tstepNum});
		 	mARoute.push({x:4 * _lstepNum,y:_tstepNum});
		 	mARoute.push({x:4 * _lstepNum,y:0});
		 	mARoute.push({x:0,y:_tstepNum});
		 	return mARoute;
		 }	 
		 // 元素 启动
		function start(pid,pRoute)
		 {
		 	var _item = jQuery(pid);
			var _initX = parseInt(_item.css("left"));
			var _initY = parseInt(_item.css("top"));
			return setInterval(function(){
				var _txy = {x:_initX,y:_initY};
				var _nextxy = pRoute.nextXY(_txy);
				_initX = _nextxy.x;
				_initY = _nextxy.y;
				_item.css({"left":_initX+"px","top":_initY+"px"});
			},mSpeed);
		}
 
		// 复杂链路
		function start2(index,item,pRoute)
		{
			var _len = pRoute.length;
			var _startIndex = index;
			

			return setInterval(function(){
					if(_startIndex >= _len - 1)
					{
						_startIndex = 0;
					}
					else
					{
						_startIndex++;
					}
					var _xy = pRoute[_startIndex];
					jQuery(item).css({"left":_xy.x+"px","top":_xy.y+"px"});
			},mSpeed);

		}

		function initData(el,pRoute)
		{
			var _html = "";
			var _len = pRoute.length;
			for (var i = 0; i < _len; i++) {
				var _xy = pRoute[i];
				_html += '<div class="child" style="left:'+_xy.x+'px;top:'+_xy.y+'px"><span class="side1"></span><span class="side2"></span></div>';
			}
			el.css('background-image','url('+param.bgImg+')');
			el.find('.fanhongbao').html(_html);
		 	el.find('.fanhongbao .child').css({
				width:eleWidth,
				height:eleWidth
			});
			el.find('.fanhongbao .child .side1').css('background-image','url('+param.itemBgImg+')');
			el.find('.fanhongbao .child .side2').css('background-image','url('+param.rootPath+param.itemNoAwardImg+')');
		}
		//计算实际宽高与边距函数
		function computeWidth(pWidth,pMargin){
			pWidth=parseInt(pWidth);
			var _width,_height,_padding,_eleWidth,_left,_top;
			if(pMargin){
				_padding=parseInt(pMargin);
				_width=pWidth-(6*_padding);
				var i=0;
				while(_width>=0){
					_width=_width-5;
					i++;
				}
				_eleWidth=i-1;
				_width=(_eleWidth*5)+(4*_padding);
				_height=(_eleWidth*2)+_padding;
				_left=_eleWidth+_padding;
				_top=_left;
			}else{
				var i=0;
				while(pWidth>=0){
					pWidth=pWidth-52;
					i++;
				}
				_width=52*(i-1);
				_eleWidth=_width/6.5;
				_height=_eleWidth*2.25;
				_padding=_eleWidth*0.25;
				_width=_eleWidth*6
				_left=_eleWidth*1.25;
				_top=_left;	
			}
			return {
				width:_width,
				height:_height,
				padding:_padding,
				eleWidth:_eleWidth,
				left:_left,
				top:_top
			}
		}
		return _return;
	}
})(jQuery)
Array.prototype.nextXY = function(obj)
{
	var _len = this.length;
	for (var i = 0; i < _len; i++) {
		if(obj.x == this[i].x && obj.y == this[i].y)
		{
			if(i == (_len - 1))
				return this[0];
			else
				return this[i+1];
		}
	}
	return {x:0,y:0};
}