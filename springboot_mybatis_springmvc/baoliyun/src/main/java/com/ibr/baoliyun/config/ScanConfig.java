package com.ibr.baoliyun.config;

import javax.servlet.MultipartConfigElement;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Bean扫描配置
* @author hanjun
* @E-mail:34862642@163.com 
* @version 创建时间：2017年1月12日 下午2:35:09
 */
@Configuration
@MapperScan("com.ibr.baoliyun.mapper*")
public class ScanConfig {
//	@Bean
//	public MultipartResolver multipartResolver() 
//	{ 
//		CommonsMultipartResolver factory = new CommonsMultipartResolver();
//		factory.setMaxUploadSize(317200); // 300M
//		return factory;
//	}
//	
	@Bean 
	public MultipartConfigElement multipartConfigElement() { 

        MultipartConfigFactory factory = new MultipartConfigFactory();
        return factory.createMultipartConfig();
    }
}
