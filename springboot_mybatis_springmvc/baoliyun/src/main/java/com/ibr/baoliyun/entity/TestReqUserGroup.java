package com.ibr.baoliyun.entity;  

import java.util.List;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月13日 下午2:03:14 
 *  
 */
public class TestReqUserGroup {
	
	private List<TestReqUser> uList;
	
	private int num;

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public List<TestReqUser> getuList() {
		return uList;
	}

	public void setuList(List<TestReqUser> uList) {
		this.uList = uList;
	}
	
}
  