(function($){
	$.fn.tablePlugin=function(prop){
		//默认属性值
		var defaultOptions={
			'width':'700px',
			//列数
			columns:4,
			//每列百分比
			percent:['25%','25%','25%','25%'],
			rowHeight:'30px',
		}
		//用户自定义属性覆盖默认属性
		var options=$.extend({},defaultOptions, prop);
		//生成代码函数
		production(this,options);
		//css渲染函数
		cssFun(this,options);
	}
	function production(el,options){
		//生成html框架与标题部分内容
		if(options.columnsTitle.show==true){
			el.html('<div class="tablePluginList"><div class="columnsTitle"></div><div class="columnsBody"></div></div>');
			var titleHtml='';
			for(var i=0;i<options.columnsTitle.data.length;i++){
				titleHtml+='<span>'+options.columnsTitle.data[i]+'</span>';
			}
			el.find('.columnsTitle').html(titleHtml);
		}else{
			el.html('<div class="tablePluginList"><div class="columnsBody"></div></div>');
		}
		//生成表格列表
		var listHtml='';
		for(var i=0;i<options.columns;i++){
			listHtml+='<ul class="list'+i+'"></ul>';
		}
		el.find('.columnsBody').html(listHtml);
		//生成表格内容部分
		var _cnt='';
		if(options.columns%options.columnsKeys.length!=0){
			console.log(columns必须是columnsKeys.length的倍数);
		}else{
			_cnt=options.columns/options.columnsKeys.length;
		};
		if(_cnt!=''){
			for(var i=0;i<Math.ceil(options.list.length/_cnt);i++){
				for(var j=0;j<_cnt;j++){
					for(var z=0;z<options.columnsKeys.length;z++){
						if(options.list[_cnt*i+j]){
						    el.find('.columnsBody .list'+(options.columnsKeys.length*j+z)).append('<li>'+options.list[_cnt*i+j][options.columnsKeys[z]]+'</li>');
						    if(options.highlight && options.highlight.rFun){
								if(options.highlight.rFun(options.list[_cnt*i+j])==true){
									el.find('.columnsBody .list'+(options.columnsKeys.length*j+z)+' li:eq('+i+')').css('color',options.highlight.color);
								}
						    }
						}
					}
				}
		    }	
		}	
	}
	//css渲染函数
	function cssFun(el,options){
		//设置表格每列width与text-align属性
		for(var i=0;i<options.percent.length;i++){
			el.find('.columnsTitle span:eq('+i+')').css('width',options.percent[i]);
			el.find('.columnsBody .list'+i).css('width',options.percent[i]);
			if(options.columnsAlign[i]==-1){
				el.find('.columnsTitle span:eq('+i+')').css('text-align','left');
				el.find('.columnsBody .list'+i).css('text-align','left');
			}
			else if(options.columnsAlign[i]==0){
				el.find('.columnsTitle span:eq('+i+')').css('text-align','center');
				el.find('.columnsBody .list'+i).css('text-align','center');
			}
			else if(options.columnsAlign[i]==1){
				el.find('.columnsTitle span:eq('+i+')').css('text-align','right');
				el.find('.columnsBody .list'+i).css('text-align','right');
			}
		}
		//设置是否有表格样式
		if(options.isBorder){
			el.find('.tablePluginList').css({
				'border-left':'1px solid '+options.color,
				'border-top':'1px solid '+options.color
			})
			el.find('.columnsTitle span').css({
				'border-right':'1px solid '+options.color,
				'border-bottom':'1px solid '+options.color
			})
			el.find('.columnsBody ul li').css({
				'border-right':'1px solid '+options.color,
				'border-bottom':'1px solid '+options.color
			})
		}else{
			el.find('.tablePluginList').css({
				'border-left':'none',
				'border-top':'none'
			})
			el.find('.columnsTitle span').css({
				'border-right':'none',
				'border-bottom':'none'
			})
			el.find('.columnsBody ul li').css({
				'border-right':'none',
				'border-bottom':'none'
			})
		}
		//设置边框与字体颜色
		el.find('.tablePluginList').css('color',options.color);
		//设置标题font 与  行高
		el.find('.columnsTitle span').css({
			'font':options.columnsTitle.fontStyle,
			'height':options.columnsTitle.height,
			'line-height':options.columnsTitle.height
		});
		//设置列表内容font 与  行高
		el.find('.columnsBody ul li').css({
			'font':options.fontStyle,
			'height':options.rowHeight,
			'line-height':options.rowHeight
		});
		
	}
})(jQuery)
