package com.ibr.baoliyun.entity;  
/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月13日 上午11:39:00 
 *  请求返回的共通类
 */
public class Res<T> {
	
	/**
	 * 错误返回,返回错误信息
	 * @param msg
	 */
	public Res(String msg)
	{
		this.suc = false;
		this.msg = msg;
	}
	
	/**
	 * 全属性设置
	 * @param msg
	 * @param obj
	 * @param suc
	 */
	public Res(String msg,T obj,boolean suc)
	{
		this.suc = suc;
		this.obj = obj;
		this.msg = msg;
	}
	
	/**
	 * 成功返回
	 * @param obj
	 */
	public Res(T obj)
	{
		this.suc = true;
		this.obj = obj;
	}
	
	private String msg;
	private T obj;
	private boolean suc;
	
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public T getObj() {
		return obj;
	}
	public void setObj(T obj) {
		this.obj = obj;
	}
	public boolean isSuc() {
		return suc;
	}
	public void setSuc(boolean suc) {
		this.suc = suc;
	}
	
}
  