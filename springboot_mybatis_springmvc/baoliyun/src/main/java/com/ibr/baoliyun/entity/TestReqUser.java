package com.ibr.baoliyun.entity;  

/**
 * 测试用到的实体
* @author hanjun
* @E-mail:34862642@163.com 
* @version 创建时间：2017年1月13日 下午12:33:21
 */
public class TestReqUser
{
	private String name;
	private Integer age;
	
	public TestReqUser() {
		
	}
	
	public TestReqUser(String name,Integer age) {
		this.name = name;
		this.age = age;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}

}
  