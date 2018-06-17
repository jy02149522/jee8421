package com.ibr.baoliyun.constant;  
/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月18日 下午2:04:02 
 *  共通信息处理
 *  在系统中拼接字符串使用new StringBuilder
 *  如在系统中比较独有的字符串可直接写在代码中
 *  如有共通性则放在此常量枚举中
 */
public enum ErrorConst {

	/**
	 * msgok
	 */
	MSGOK("ok"),
	
	/**
	 * 系统异常
	 */
	EXCEPTION("系统异常");
	
	
	/**
	 * 消息
	 */
	private String value;
	
	private ErrorConst(String val)
	{
		this.value = val;
	}
	
	@Override
	public String toString() {
		return this.value;
	}
	
	/**
	 * 格式化
	 * @param arg
	 * @return
	 */
	public String format(Object... arg)
	{
		return String.format(this.value, arg);
	}
}
  