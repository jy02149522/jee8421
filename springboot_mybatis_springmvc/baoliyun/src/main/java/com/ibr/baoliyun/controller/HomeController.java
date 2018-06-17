package com.ibr.baoliyun.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.baomidou.mybatisplus.plugins.Page;
import com.ibr.baoliyun.annotation.Token;
import com.ibr.baoliyun.entity.Res;
import com.ibr.baoliyun.entity.Role;
import com.ibr.baoliyun.entity.TestReqUser;
import com.ibr.baoliyun.entity.TestReqUserGroup;
import com.ibr.baoliyun.exception.BException;
import com.ibr.baoliyun.service.IHomeService;
import com.ibr.baoliyun.service.IRoleService;

/**
 * api测试控制器 该控制器方法在测试环境下可用 发布环境下不可用
* @author hanjun
* @E-mail:34862642@163.com 
* @version 创建时间：2017年1月12日 下午2:36:45
 */
@RestController
@RequestMapping(value="/api/justTest")
@Profile(value="dev")
public class HomeController extends BaseApiController {
	
    /**
     * 全局配置文件中 application.properties
     */
	@Value("${logging.path}")
	private String loggingpath;
	
	/**
	 * 测试返回字符串 且记录log
	 * @return
	 */
	@RequestMapping(value="/start")
	public String start()
	{
		log.info("...log_info");
		log.error("...error_info");
		return "从applicaition.properties中读取logging.path=" + loggingpath;
	}
	
	/**
	 * 测试全局异常捕获
	 * @return
	 * @throws BException 
	 * @throws Exception 
	 */
	@RequestMapping(value="/excep")
	public String excep() throws BException 
	{
		 //int i = 1024/0;
		 //return "";
		throw new BException("这就是义务异常的抛出了. 这里填写的信息会返回到前台");
	}
	
	/**
	 * 测试返回网页
	 * @param modelAndView
	 * @return
	 */
	@RequestMapping(value="/api.do")
	public ModelAndView index(ModelAndView modelAndView)
	{
		modelAndView.setViewName("/api.html");
		return modelAndView;
	}
	
	/**
	 * 1 无参数Get请求
	 * 请求url  /getSelectAll
	 * 所有请求返回统一都是Res对象
	 * 注意:mvc不允许路径重载,也就是说所有的路径必须不相同,如下/getSelectAll 如果有两个相同的路径,则框架启动会报错.
	 * 但方法可以重载,方法2 有参数Get请求 和方法1 就是一个方法重载的例子.
	 * @return
	 */
	@RequestMapping(value="/getSelectAll")
	public Res<Object> getSelectAll()
	{
		return new Res<Object>("调用成功,这里是错误信息"){};
	}
	
	
	/**
	 * 2 有参数Get请求 
	 * 请求url  /getSelectAll2?name=tom&age=18
	 * url参数需要和方法名完全匹配,且使用对象类型代替简单类型,比如int需要写Integer
	 * 注册所有路径
	 * @param name
	 * @param age
	 * @return
	*/
	
	@RequestMapping(value="/getSelectAll2")
	public Res<Object> getSelectAll(String name,Integer age)
	{
		System.out.print("ddd");
		return new Res<Object>("ok,调用成功 name:" + name + " age:" + age,null,true){};
	}
	
	/**
	 * 3 对象参数接收Get请求 返回TestReqUser对象
	 * 请求url  /getSelectByObj?name=tom&age=18
	 * @param user
	 * @return
	 */
	
	@RequestMapping(value="/getSelectByObj")
	public Res<TestReqUser> getSelectByObj(TestReqUser user)
	{
		user.setAge(180);
		user.setName("Peter");
		return new Res<TestReqUser>(user){};
	}
	
	
	/**
	 * 4 对象参数接收Get请求 返回List<TestReqUser>
	 * 请求url  /getSelectListByObj?name=tom&age=18
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/getSelectListByObj")
	public Res<List<TestReqUser>> getSelectListByObj(TestReqUser user)
	{
		List<TestReqUser> _list = new ArrayList<TestReqUser>();
		for (int i = 0; i < 10; i++) {
			_list.add(new TestReqUser(user.getName()+i,user.getAge()+i));
		}
		return new Res<List<TestReqUser>>(_list){};
	}
	
	
	
	/**
	 * 5 post提交一个对象
	 * 请求url  /apUser
	 * 所有post请求参数都需要加上 @RequestBody
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/apUser")
	public Res<TestReqUser> apUser(@RequestBody TestReqUser user)
	{	
		user.setAge(1800);
		user.setName("PostTom");
		return new Res<TestReqUser>(user){};
	}
	
	/**
	 * Token需要签名认证的方法
	 * 使用url传递参数用uid基本类型接收
	 * 使用post参数传递 使用@RequestBody进行接收
	 * @param user
	 * @param uid 
	 * @return
	 */
	@Token()
	@RequestMapping(value="/apUser2")
	public Res<TestReqUser> apUser2(@RequestBody TestReqUser user,String uid)
	{	
		user.setAge(150);
		user.setName("PostTom" + uid);
		return new Res<TestReqUser>(user){};
	}
	
	/**
	 * 6 post 简单参数 默认情况下post提交的任何参数 必须使用对象接收,
	 * 但如果不想使用对象接收可以使用@RequestBody Map<String,Object>进行接收.
	 * 然后通过param.get("name")方式获取参数.
	 * 请求url  /apBaseParam
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/apBaseParam")
	public Res<Object> apBaseParam(@RequestBody Map<String,Object> param)
	{	
		Integer _age = (Integer)param.get("age");
		return new Res<Object>("post提交成功,name:" + param.get("name") + " age:" + _age,null,true){};
	}
	
	/**
	 * 7 对象的List作为接收参数 Post请求 返回List<TestReqUser>
	 * 请求url  /postSelectListByObj
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/postSelectListByObj")
	public Res<List<TestReqUser>> postSelectListByObj(@RequestBody List<TestReqUser> userlist)
	{
		for (int i = 0; i < userlist.size(); i++) {
			userlist.get(i).setName("ppp" + i);
		}
		return new Res<List<TestReqUser>>(userlist){};
	}
	
	
	/**
	 * 8 对象的List作为接收参数 Post请求 返回List<TestReqUser>
	 * 请求url  /postSelectListByObj2
	 * 外层再加一个对象,将List包含在此对象中也可以接收List
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/postSelectListByObj2")
	public Res<TestReqUserGroup> postSelectListByObj(@RequestBody TestReqUserGroup group)
	{
		for (int i = 0; i < group.getuList().size(); i++) {
			group.getuList().get(i).setName("group" + i);
		}
		return new Res<TestReqUserGroup>(group){};
	}
	@Autowired
	private IHomeService mHomeService;
	
	@RequestMapping(value="/insertTest")
	public Res<Object> insertTest()
	{
		Object _o;
		try {
			_o = mHomeService.insertTest();
			return new Res<Object>("ok",_o,true);
		} catch (BException e) {
			return new Res<Object>("no ok");
		}
		
	}
	
	
	
	
	
	
}


