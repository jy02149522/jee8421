package com.ibr.baoliyun.interceptor;  

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibr.baoliyun.entity.Res;
import com.ibr.baoliyun.exception.BException;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月16日 下午5:32:25 
 *  全局异常捕获
 */
@ControllerAdvice  
public class GlobalExceptionHandler {
	
	protected static  final Logger mlog = LoggerFactory.getLogger(GlobalExceptionHandler.class);
	
	@ExceptionHandler(value = Exception.class)  
	public @ResponseBody Res<String> defaultErrorHandler(Exception e)  {  
	    
		mlog.error("",e.fillInStackTrace());
		
		if(e instanceof BException)
	     {
			return new Res<String>(e.getMessage(),"",false);
	     }
		else
		{
			return new Res<String>("服务器太累啦","",false);	
		}
	} 
}
  