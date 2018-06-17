package com.ibr.baoliyun.entity.type;  
/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月18日 下午5:06:01 
 *  用户类别
 */
public enum UserTypeEnum {
	
	Admin(1,"管理员"),
	Employee(2,"职员"),
	Company(4,"公司");
	
	private int type;
	private String name;
	
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private UserTypeEnum(int pType,String pName) {
		this.name = pName;
		this.type = pType;
	}
	
}
  