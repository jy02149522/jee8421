var tablePlugin=function(){};
tablePlugin.prototype={
	init:function(el,prop){
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
		var options=this.extend(defaultOptions,prop);
		console.log(options);
		this.production(el,options);
		this.cssFun(el,options);
	},
	//对象复制函数
	extend:function(target,options){
		for (name in options) { 
	            target[name] = options[name]; 
	          } 
        return target; 
	},
	//生成表格插件html代码函数
	production:function(el,options){
		console.log(el);
		//生成html框架与标题部分内容
		if(options.columnsTitle.show==true){
			el.innerHTML='<div class="tablePluginList"><div class="columnsTitle"></div><div class="columnsBody"></div></div>';
			var titleHtml='';
			for(var i=0;i<options.columnsTitle.data.length;i++){
				titleHtml+='<span>'+options.columnsTitle.data[i]+'</span>';
			}
			console.log(titleHtml);
			console.log(el.getElementsByClassName('columnsTitle')[0]);
			el.getElementsByClassName('columnsTitle')[0].innerHTML=titleHtml;
		}else{
			el.innerHTML='<div class="tablePluginList"><div class="columnsBody"></div></div>';
		}
		//生成表格列表
		var listHtml='';
		for(var i=0;i<options.columns;i++){
			listHtml+='<ul class="list'+i+'"></ul>';
		}
		el.querySelector('.columnsBody').innerHTML=listHtml;
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
						    el.querySelector('.columnsBody .list'+(options.columnsKeys.length*j+z)).insertAdjacentHTML('beforeEnd', '<li>'+options.list[_cnt*i+j][options.columnsKeys[z]]+'</li>');
						    if(options.highlight && options.highlight.rFun){
								if(options.highlight.rFun(options.list[_cnt*i+j])==true){
									el.querySelector('.columnsBody .list'+(options.columnsKeys.length*j+z)+' li:nth-child('+(i+1)+')').style.color=options.highlight.color;
								}
						    }
						}
					}
				}
		    }	
		}
	},
	cssFun:function(el,options){
		//设置表格每列width与text-align属性
		for(var i=0;i<options.percent.length;i++){
			el.querySelector('.columnsTitle span:nth-child('+(i+1)+')').style.width=options.percent[i];
			el.querySelector('.columnsBody .list'+i).style.width=options.percent[i];
			if(options.columnsAlign[i]==-1){
				el.querySelector('.columnsTitle span:nth-child('+(i+1)+')').style.textAlign='left';
				el.querySelector('.columnsBody .list'+i).style.textAlign='left';
			}
			else if(options.columnsAlign[i]==0){
				el.querySelector('.columnsTitle span:nth-child('+(i+1)+')').style.textAlign='center';
				el.querySelector('.columnsBody .list'+i).style.textAlign='center';
			}
			else if(options.columnsAlign[i]==1){
				el.querySelector('.columnsTitle span:nth-child('+(i+1)+')').style.textAlign='right';
				el.querySelector('.columnsBody .list'+i).style.textAlign='right';
			}
		}
		console.log(options.color);
		var _span=el.querySelectorAll('.columnsTitle span');
		var _li=el.querySelectorAll('.columnsBody ul li');
		//设置是否有表格样式
		if(options.isBorder){
			el.querySelector('.tablePluginList').style.borderLeft='1px solid '+options.color;
			el.querySelector('.tablePluginList').style.borderTop='1px solid '+options.color;
			for(var i=0;i<_span.length;i++){
				_span[i].style.borderRight='1px solid '+options.color;
				_span[i].style.borderBottom='1px solid '+options.color;
			}
			for(var i=0;i<_li.length;i++){
				_li[i].style.borderRight='1px solid '+options.color;
				_li[i].style.borderBottom='1px solid '+options.color;
			}
		}else{
			el.querySelector('.tablePluginList').style.borderLeft='none';
			el.querySelector('.tablePluginList').style.borderTop='none';
			el.querySelector('.columnsTitle span').style.borderRight='none';
			el.querySelector('.columnsTitle span').style.borderBottom='none';
			el.querySelector('.columnsBody ul li').style.borderRight='none';
			el.querySelector('.columnsBody ul li').style.borderBottom='none';
		}
		//设置边框与字体颜色
		el.querySelector('.tablePluginList').style.color=options.color;
		//设置标题font 与  行高
		for(var i=0;i<_span.length;i++){
			_span[i].style.font=options.columnsTitle.fontStyle;
			_span[i].style.heigth=options.columnsTitle.height;
			_span[i].style.lineHeight=options.columnsTitle.height;
		}
		//设置列表内容font 与  行高
		for(var i=0;i<_li.length;i++){
			_li[i].style.font=options.fontStyle;
			_li[i].style.height=options.rowHeight;
			_li[i].style.lineHeight=options.rowHeight;
		}
	}

}
