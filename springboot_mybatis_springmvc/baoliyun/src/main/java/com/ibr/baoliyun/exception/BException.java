package com.ibr.baoliyun.exception;  

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月16日 下午5:15:01 
 *  业务异常
 */
public class BException extends RuntimeException{
	
		private static final long serialVersionUID = 1L;
		private static final Logger  log = LoggerFactory.getLogger(BException.class);
		public BException() {
			
		}
	
		public BException(String msg) {
			super(msg);
			log.error(msg);
		}
		
		@Override
		public synchronized Throwable fillInStackTrace() {
			return this;
		}
}
  