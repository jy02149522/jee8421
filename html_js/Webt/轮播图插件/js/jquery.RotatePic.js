(function($){
	$.fn.myRotatePic=function(prop){
		//默认属性值
		var defaultOptions={
			'width':'700px',
            'height':'500px',
		}
		//用户自定义属性覆盖默认属性
		var options=$.extend({},defaultOptions, prop);
		//生成代码函数
		production(this,options);
		//css渲染函数
		cssFun(this,options);
		//事件函数
        rotateFun(this,options);
	}
	function production(el,options){
	    el.html('<div class="myRotatePicIconDiv"></div><div class="myRotatePicImgDiv"></div>')
	    var _htmlIcon='',_htmlImg='';
	    for(var i=0;i<options.data.length;i++){
	    	if(options.lineShow==true){
	    		_htmlIcon+='<img class="line" src="img/line.png "/><div class="icon"> <img src="'+options.data[i].icon
	    	+'"/></div>';
	    	}else{
	    		_htmlIcon+='<div class="icon"> <img src="'+options.data[i].icon
	    	+'"/></div>';
	    	}
	    	_htmlImg+='<img class="rotatePic" id="'+options.data[i].imgId+'" src="'+
	    	options.data[i].img+'" />';
	    }
	    options.lineShow==true ? _htmlIcon+='<img class="line" src="img/line.png"/>' : _htmlIcon=_htmlIcon;
	    el.find('.myRotatePicIconDiv').html(_htmlIcon);
	    el.find('.myRotatePicImgDiv').html(_htmlImg);
	}
	function cssFun(el,options){
	    el.css({
	    	'width':options.width,
	        'height':options.height,
	        'text-align':'center'
	    });
	    el.find('.myRotatePicIconDiv .icon').css({
	    	'margin-right':options.iconMargin,
	    	'margin-left':options.iconMargin
	    })
	    //计算.line的宽度
	    var _Width=parseInt(parseInt(options.width)/(options.data.length*2+1)*0.65);
	    //计算放大后的宽度
	    var _enlargeWidth=options.iconSize* 1.4;
	    //计算放大后.icon移动的margin值
	    var _enlargeMargin=-(options.iconSize*0.2);
	    //计算默认初始显示的icon
	    var _showIcon=Math.ceil(options.data.length/2)-1;
	    //计算轮播图默认高度
	    var _imgHeight=parseInt(options.height)-_Width-60;
	    el.find('.myRotatePicIconDiv').css('height',options.iconSize+'px');
	    el.find('.myRotatePicIconDiv .line').css('width',_Width+'px');
	    el.find('.myRotatePicIconDiv .icon').css({'width':options.iconSize+'px','height':options.iconSize+'px'});
	    el.find('.myRotatePicIconDiv .icon img').css({'width':options.iconSize+'px','height':options.iconSize+'px'});
	    el.find('.myRotatePicImgDiv img').css('height',_imgHeight+'px');
	    el.find('.myRotatePicImgDiv').css('height',_imgHeight+'px');
	    //计算每个轮播图的初始位置以及设置默认放大的icon
	    for(var i=0;i<options.data.length;i++){
    		var _left=10;
    	    if(i!=_showIcon){
               _left=(i-_showIcon)*120+10;
    	    }
    	    else{
    	    	el.find('.myRotatePicIconDiv .icon:eq('+i+')').css({
    	    		'height':_enlargeWidth+'px',
    	    		'width':_enlargeWidth+'px',
    	    	})
    	    	el.find('.myRotatePicIconDiv .icon:eq('+i+') img').css({
    	    		'height':_enlargeWidth+'px',
    	    		'width':_enlargeWidth+'px',
    	    		'margin':_enlargeMargin+'px'
    	    	})
    	    }
    	    el.find('.myRotatePicImgDiv img:eq('+i+')').css('left',_left+'%');
	    }
	    
	}
	//轮播函数
	function rotateFun(el,options){
		var curIndex=Math.ceil(options.data.length/2)-1;//当前显示图片
		var autoChange='';
		var _left = 10;
		var _cnt=options.data.length;//图片总数
	    //计算放大后的宽度
	    var _enlargeWidth=options.iconSize* 1.4+'px';
	    //计算放大后.icon移动的margin值
	    var _enlargeMargin=-(options.iconSize*0.2)+'px';
	    if(options.autoRotate>0){
	        autoChange=setInterval(function(){
	    	    if(curIndex < _cnt-1){ 
      				curIndex ++; 
    			}else{ 
      				curIndex = 0;
    			}
    			//轮播函数
    			autoRotate(el,options);
	        },options.autoRotate);
	    }
	    //鼠标移入事件
		for (var i = 0; i < _cnt; i++) {
    		(function(ii){
    			el.find('.myRotatePicIconDiv .icon:eq('+ ii +')').mouseover(function(){
    				curIndex=ii;
    				if(options.autoRotate>0){
    					clearInterval(autoChange);
    				}
    				autoRotate(el,options);
        		});
        		if(options.autoRotate>0){
        			el.find('.myRotatePicIconDiv .icon:eq('+ ii +')').mouseout(function(){
        			autoChange=setInterval(function(){
        				if(curIndex < _cnt-1){ 
		      				curIndex ++; 
		    			}else{ 
		      				curIndex = 0;
		    			}
		    			//轮播函数
		    			autoRotate(el,options);
        			},options.autoRotate);
        		})
        		}
    		})(i);
	    }
		function autoRotate(el,options){
			for(var i=0;i<_cnt;i++){
				if(i==curIndex){
					_left =10 ;
					el.find('.myRotatePicIconDiv .icon:eq('+i+') img').css({width:_enlargeWidth,height:_enlargeWidth,margin:_enlargeMargin});
					el.find('.myRotatePicIconDiv .icon:eq('+i+')').css({width:_enlargeWidth,height:_enlargeWidth});
				}else{
					_left=10+(i - curIndex) * 120;
				    el.find('.myRotatePicIconDiv .icon:eq('+i+') img').css({width:options.iconSize+'px',height:options.iconSize+'px',margin:'0'});
			        el.find('.myRotatePicIconDiv .icon:eq('+i+')').css({width:options.iconSize+'px',height:options.iconSize+'px'});
				}
				el.find('.myRotatePicImgDiv img:eq('+i+')').animate({left:_left+'%'},'slow');
			}
		}
		
		
		//移动端左右滑动事件
		//返回角度
		function GetSlideAngle(dx, dy) {
		    return Math.atan2(dy, dx) * 180 / Math.PI;
		}
		 
		//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
		function GetSlideDirection(startX, startY, endX, endY) {
		    var dy = startY - endY;
		    var dx = endX - startX;
		    var result = 0;
		 
		    //如果滑动距离太短
		    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
		        return result;
		    }
		 
		    var angle = GetSlideAngle(dx, dy);
		    if (angle >= -45 && angle < 45) {
		        result = 4;
		    } else if (angle >= 45 && angle < 135) {
		        result = 1;
		    } else if (angle >= -135 && angle < -45) {
		        result = 2;
		    }
		    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
		        result = 3;
		    }
		 
		    return result;
		}
		 
		//滑动处理
		var startX, startY;
		document.addEventListener('touchstart', function (ev) {
		    startX = ev.touches[0].pageX;
		    startY = ev.touches[0].pageY;   
		}, false);
		document.addEventListener('touchend', function (ev) {
		    var endX, endY;
		    endX = ev.changedTouches[0].pageX;
		    endY = ev.changedTouches[0].pageY;
		    var direction = GetSlideDirection(startX, startY, endX, endY);
		    switch (direction) {
		        case 0:
		            break;
		        case 1:
		            break;
		        case 2:
		            break;
		        case 3:
		            if(curIndex < _cnt-1){ 
	      				curIndex ++; 
	    			}else{ 
	      				curIndex = _cnt-1;
	    			}
	    			//轮播函数
    				autoRotate(el,options);
		            break;
		        case 4:
		            if(curIndex > 0){ 
	      				curIndex --; 
	    			}else{ 
	      				curIndex =0;
	    			}
	    			//轮播函数
    				autoRotate(el,options);
		            break;
		        default:            
		    }   
		}, false);
    }
})(jQuery)
