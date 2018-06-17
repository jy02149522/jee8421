(function($){
	
	var days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60;
	
	// 倒计时
	$.fn.timeDown = function(prop){
		
		var options = $.extend({
			callback	: function(){},
			stime   : 0,
			etime	: 0,
			fontSize:15
		},prop);
		
		var left, h, m, s, positions;

		// 初始化
		init(this, options);
		
		positions = this.find('.position');
		var tempTime = options.stime;
		(function tick(){
		
			// 剩余时间毫秒数
			left = Math.floor((options.etime - tempTime) / 1000);
			if(left < 0){
				left = 0;
			}
			
			// 小时
			h = Math.floor(left / hours);
			updateDuo(0, 1, h);
			left -= h*hours;
			
			// 分钟
			m = Math.floor(left / minutes);
			updateDuo(2, 3, m);
			left -= m*minutes;
			
			// 秒
			s = left;
			updateDuo(4, 5, s);
			// 结束回调
			if(s == 0 && m == 0 && h == 0)
			{
				options.callback();
			}
			else
			{
				setTimeout(tick, 1000);
			}
			console.log(s);
			
			tempTime += 1000;
			
		})();
		
		// 更新时间
		function updateDuo(minor,major,value){
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);
		}
		
		return this;
	};


	function init(elem, options){
		elem.addClass('countdownHolder');
		$(elem).css('font-size',options.fontSize+'px');
		$.each(['Hours','Minutes','Seconds'],function(i){
			$('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
			).appendTo(elem);
			
			if(this!="Seconds"){
				elem.append('<span class="countDiv countDiv'+i+'"></span>');
			}
		});
		
	}
	function switchDigit(position,number){
		
		var digit = position.find('.digit')
		
		if(digit.is(':animated')){
			return false;
		}
		
		if(position.data('digit') == number){
			// We are already showing this number
			return false;
		}
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-2.1em',
				opacity:0
			},
			html:number
		});
		
		// The .static class is added when the animation
		// completes. This makes it run smoother.
		
		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:'2.5em',opacity:0},'fast',function(){
				digit.remove();
			})

		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}
})(jQuery);