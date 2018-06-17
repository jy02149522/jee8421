package com.ibr.baoliyun.test.controller;  

import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月19日 上午11:10:23 
 *  
 */
@RunWith(SpringJUnit4ClassRunner.class)   
@SpringBootTest(classes = {com.ibr.baoliyun.Application.class} )  
public abstract class BaseTestController {
	
	protected MockMvc mvc; 
	
	@Autowired  
	private WebApplicationContext webApplicationConnect;  
	
    @Before 
    public void setUp() throws Exception { 
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationConnect).build();  
    }

}
  