package com.ibr.baoliyun.interceptor;  

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.reflect.MethodSignature;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月18日 上午9:46:37 
 *  
 */
//@Aspect  
//@Component
public class CInterceptor {

	@Around("execution(* com.ibr.baoliyun.controller..*(..))") 
	public Object Interceptor(ProceedingJoinPoint pjp)
	{ 
		MethodSignature signature = (MethodSignature) pjp.getSignature();  
        Method method = signature.getMethod(); //获取被拦截的方法  
        String methodName = method.getName(); //获取被拦截的方法名  
        System.out.println(methodName);
        Object[] args = pjp.getArgs();  
        System.out.println(args.toString());
        try {
			return pjp.proceed();
		} catch (Throwable e) {
			return null;
			
		}  
	}
}
  