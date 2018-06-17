package com.ibr.baoliyun.test.service;  

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.ibr.baoliyun.service.IHomeService;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月23日 下午6:33:33 
 *  
 */
public class HomeServiceTest extends BaseTestService{
	
	@Autowired
	private IHomeService sw;
	
	
	
	@Test
	public void insertTest()
	{
		sw.insertTest();
	}
	
	
	
}
  