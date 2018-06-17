$(function(){
	var sts = (new Date()).getTime();
	var ts = (new Date()).getTime() + 10*1000;
	
	console.log('s:' + sts);
	console.log('e:' + ts);
	
	$('#countdown').timeDown({
		stime : sts,
		etime	: ts,
		callback	: function(hours, minutes, seconds){
			
			if(hours == 0 && minutes == 0 && seconds ==0)
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		fontSize : 20
		
	});
	
});
