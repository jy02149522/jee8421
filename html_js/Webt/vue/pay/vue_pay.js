(function(window){
	var i = 0;
	var pwdArg = [];
	function clearAllD()
	{
		i = 0;
		pwdArg = [];
		$(".mm_box li").removeClass("mmdd");
	}
	var wxpay = Vue.component('wx-pay',{
		template : ['<div class="wenx_xx">',
					'  <div class="mz">{{title}}</div>',
					'  <div class="wxzf_price">￥{{money}}</div>',
					'</div>',
					'<div class="skf_xinf">',
					'  <div class="all_w"> <span class="bt">收款方</span> <span class="fr">{{provider}}</span> </div>',
					'</div>',
					'<a href="javascript:void(0);" class="ljzf_but all_w" @click="show">立即支付</a> ',
					'<!--浮动层-->',
					'<div class="ftc_wzsf">',
					'  <div class="srzfmm_box">',
					'    <div class="qsrzfmm_bt clear_wl"> <img src="images/xx_03.jpg" class="tx close fl" @click="close"> <img src="images/jftc_03.jpg" class="tx fl" ><span class="fl">请输入支付密码</span> </div>',
					'    <div class="zfmmxx_shop">',
					'      <div class="mz">{{title}}</div>',
					'      <div class="wxzf_price">￥{{money}}</div>',
					'    </div>',
					'    <ul class="mm_box">',
					'      <li></li>',
					'      <li></li>',
					'      <li></li>',
					'      <li></li>',
					'      <li></li>',
					'      <li></li>',
					'    </ul>',
					'  </div>',
					'  <div class="numb_box">',
					'    <div class="xiaq_tb"> <img src="images/jftc_14.jpg" height="10"> </div>',
					'    <ul class="nub_ggg">',
					'      <li><a href="javascript:void(0);" @click="num">1</a></li>',
					'      <li><a href="javascript:void(0);" class="zj_x" @click="num">2</a></li>',
					'      <li><a href="javascript:void(0);" @click="num">3</a></li>',
					'      <li><a href="javascript:void(0);" @click="num">4</a></li>',
					'      <li><a href="javascript:void(0);" class="zj_x" @click="num">5</a></li>',
					'      <li><a href="javascript:void(0);" @click="num">6</a></li>',
					'      <li><a href="javascript:void(0);" @click="num">7</a></li>',
					'      <li><a href="javascript:void(0);" class="zj_x" @click="num">8</a></li>',
					'      <li><a href="javascript:void(0);" @click="num">9</a></li>',
					'      <li><span></span></li>',
					'      <li><a href="javascript:void(0);" class="zj_x" @click="num">0</a></li>',
					'      <li><span  class="del" @click="del"> <img src="images/jftc_18.jpg"   ></span></li>',
					'    </ul>',
					'  </div>',
					'  <div class="hbbj"></div>',
					'</div>'].join(""),
		props: ['title','money','provider'],
		data : function(){
			return {
			
			}
		},
		methods : {
			
			show : function()
			{
				$(".ftc_wzsf").show();
				clearAllD();
			},
			close : function()
			{
				$(".ftc_wzsf").hide();
				clearAllD();
			},
			num : function(event)
			{
				console.log($(event.target).text());
				i++
				if(i<6){
					$(".mm_box li").eq(i-1).addClass("mmdd");
					pwdArg[i-1] = $(event.target).text();
				}else{
					$(".mm_box li").eq(i-1).addClass("mmdd");
					pwdArg[i-1] = $(event.target).text();
					var _pwd = pwdArg.join('');
					this.$dispatch("pwd-action",_pwd,this);
					clearAllD();
				}
			},
			del : function () {
				if(i>0){
					i--;
					$(".mm_box li").eq(i).removeClass("mmdd");
				}
			}
		},
		ready : function()
		{
			//数字显示隐藏
			$(".xiaq_tb").click(function(){
				$(".numb_box").slideUp(500);
			});
			
			//开启数字
			$(".mm_box").click(function(){
				$(".numb_box").slideDown(500);
			});
		}
	});
	
	
	
	
	
})(window);
