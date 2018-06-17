package com.ibr.baoliyun.interceptor;  

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月13日 下午5:27:50 
 *  身份验证拦截器
 */
public class AuthInterceptor extends HandlerInterceptorAdapter{
	
	private static final String TOKENPWD = "hdfkasuhdfuiasyhduifyeuifa15148dasf_ewrwer";
	private static  final Logger mlog = LoggerFactory.getLogger(AuthInterceptor.class);
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		// 时间记录
		Long _time = System.currentTimeMillis();
		request.setAttribute("st", _time);
		
		// 只拦截Token标记的Controller
		if(handler instanceof HandlerMethod){
		    HandlerMethod handlerMethod = (HandlerMethod)handler;
		    com.ibr.baoliyun.annotation.Token _tokenannotation = handlerMethod.getMethodAnnotation(com.ibr.baoliyun.annotation.Token.class);
		    if(_tokenannotation != null)
		    {
		    	// 根据该id进行token生成匹配等操作,下面需要确定参数必须存在该id
		    	String _id = _tokenannotation.key();
		    	
		    	String _idval = getIdByParam(request,_id);
    	  		
    	  		if(StringUtils.isEmpty(_idval))
    	  		{
    	  			response.setContentType("application/json");
    	  			mlog.error(new StringBuilder("请求方法:").append(handlerMethod.getMethod().getName()).append("时发生错误,Token验证未发现请求UID").toString());
    	  			response.getWriter().write("{\"msg\":\"Key is not\",\"suc\":false}");
    	  			return false;
	 			}
    	  		
    	  		String _token = request.getHeader("stoken");
    	  		
    	  		if(StringUtils.isEmpty(_token))
    	  		{
    	  			response.setContentType("application/json");
    	  			mlog.error(new StringBuilder("请求方法:").append(handlerMethod.getMethod().getName()).append("时发生错误,Token不能为空").toString());
    	  			response.getWriter().write("{\"msg\":\"Token is not\",\"suc\":false}");
    	  			return false;
    	  		}
 			   else
 			   {
 				   // 对比token 
 				   if(!checkToken(_token,_idval))
 				   {
 					  response.setContentType("application/json");
 					  mlog.error(new StringBuilder("请求方法:").append(handlerMethod.getMethod().getName()).append("时发生错误,Token不匹配,这可能是一个非法请求").toString());
 					 response.getWriter().write("{\"msg\":\"Token is bad\",\"suc\":false}");
 					  return false;
 				   }
 				}
		    	
		    }
		}
		
		return true;
	}
	
    @Override
    public void postHandle(HttpServletRequest request,
    		HttpServletResponse response, Object handler,
    		ModelAndView modelAndView) throws Exception {
      Long _st	= (Long)request.getAttribute("st");
      request.removeAttribute("st");
      Long _ed = System.currentTimeMillis();
      Long _t = _ed - _st;
      if(_t >= 3000)
      {
    	  System.err.println(new StringBuilder(request.getRequestURI().toString()).append(":").append(_ed - _st).append("ms"));
    	  mlog.error(new StringBuilder().append("请求地址:").append(request.getRequestURI().toString()).append("耗时过长:").append(_t).append("ms").toString());
      }
    }
    
    /**
     * token验证 通过id生成 只有带有id的方法请求需要验证 其他不需要
     * @param pToken
     * @return
     */
    private boolean checkToken(String pToken,String pId)
    {
    	if(pToken.equals(getTokenById(pId)))
    	{
    		return true;
    	}
    	else
    	{
    		return false;
    	}
    }
    
    /**
     * 根据ID生成TOKEN
     * @param pId
     * @return
     */
    public static String getTokenById(String pId)
    {
    	return org.springframework.util.DigestUtils.md5DigestAsHex((pId + TOKENPWD + pId + TOKENPWD).getBytes());
    }

    /**
    * 根据请求获取用户id
    * @param request
    * @return
    */
    private String getIdByParam(HttpServletRequest request,String id) {
    		
    		String[] paramValues = request.getParameterValues(id);
			if(paramValues != null && paramValues.length > 0)
			{
				return paramValues[0];
			}
    		return "";
    }
	
}
  