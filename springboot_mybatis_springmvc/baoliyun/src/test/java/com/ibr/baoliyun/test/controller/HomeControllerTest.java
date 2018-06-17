package com.ibr.baoliyun.test.controller;  

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ibr.baoliyun.Application;
import com.ibr.baoliyun.controller.HomeController;
import com.ibr.baoliyun.entity.Res;
import com.ibr.baoliyun.entity.TestReqUser;
import com.ibr.baoliyun.service.IHomeService;
import com.ibr.baoliyun.service.impl.HomeServiceImpl;




/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月19日 上午10:04:16 
 *  HomeControllerTest单元测试
 */
public class HomeControllerTest extends BaseTestController{

	
	@Test
	  public void getSelectAll() throws Exception
	 {
		 MvcResult _res = mvc.perform(get("/api/justTest/getSelectAll"))
		 .andExpect(status().isOk())
		 //.andExpect(content().string(containsString("调用成功,这里是错误信息")))
		 //.andExpect(content().string(equalTo("success"))); 
		 .andExpect(jsonPath("$.msg").value("调用成功,这里是错误信息"))
		 .andExpect(jsonPath("$.suc").value(false)).andReturn();
		 // 错误时不打印
		 System.out.print(_res.getResponse().getContentAsString());
	  }
	
	@Test
	  public void getSelectAll2() throws Exception
	 {  //String name,Integer age)
		 MvcResult _res = mvc.perform(get("/api/justTest/getSelectAll2").
				 param("name", "zhangli").
				 param("age","123"))
		.andExpect(status().isOk())
		 //.andExpect(content().string(containsString("调用成功,这里是错误信息")))
		 //.andExpect(content().string(equalTo("success"))); 
		 .andExpect(jsonPath("$.msg").value("ok,调用成功 name:zhangli age:123"))
		 .andExpect(jsonPath("$.suc").value(true)).andReturn();
		 // 错误时不打印
		 System.out.print(_res.getResponse().getContentAsString());
	  }
	
	//public Res<TestReqUser> apUser(@RequestBody TestReqUser user)
	@Test
	  public void apUser() throws Exception
	 {  //String name,Integer age)
	
		// 建立对象作为参数
		TestReqUser userInfo = new TestReqUser();
		userInfo.setName("testuser2");
		userInfo.setAge(29);
		// 建立Map作为参数
		Map<String, String> map = new HashMap<String,String>();  
		map.put("name", "pppp");
		map.put("age", "135");
		ObjectMapper mapper = new ObjectMapper();
		
		 MvcResult _res = mvc.perform(post("/api/justTest/apUser")
				 .contentType(MediaType.APPLICATION_JSON)
				 .accept(MediaType.APPLICATION_JSON)
				 //.content(mapper.writeValueAsString(userInfo)))   // 可以用对象方式
				 .content(mapper.writeValueAsString(map)))  // 也可以用map方式
				 .andExpect(status().isOk())
				 .andExpect(jsonPath("$.obj.name").value("PostTom"))
				 .andExpect(jsonPath("$.obj.age").value(1800))
				 .andExpect(jsonPath("$.msg").isEmpty())
				 .andExpect(jsonPath("$.suc").value(true))
				 .andReturn();
		 		 // 错误时不打印
		 		 System.out.print(_res.getResponse().getContentAsString());
	  }
	
	@Test
	public void insertTest() throws Exception
	{
		MvcResult _res = mvc.perform(post("/api/justTest/insertTest")).andExpect(status().isOk()).andReturn();
	}
	
}
  