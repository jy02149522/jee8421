package com.ibr.baoliyun.config;  

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.ibr.baoliyun.interceptor.AuthInterceptor;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月13日 下午4:54:12 
 *  Mvc配置
 */
@Configuration
@EnableScheduling
@EnableTransactionManagement
public class MvcConfig extends WebMvcConfigurerAdapter {
	
	

		@Bean
		public AuthInterceptor getAuthInterceptor()
		{
			return new AuthInterceptor();
		}
		
		@Override
		public void addResourceHandlers(ResourceHandlerRegistry registry) {
			super.addResourceHandlers(registry);
		}
		
		@Override
		public void addInterceptors(InterceptorRegistry registry) {
			registry.addInterceptor(getAuthInterceptor()).addPathPatterns("/api/**");
		}
}
  