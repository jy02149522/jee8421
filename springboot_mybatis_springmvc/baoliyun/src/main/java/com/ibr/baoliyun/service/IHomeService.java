package com.ibr.baoliyun.service;  

import java.util.ArrayList;

import com.baomidou.mybatisplus.plugins.Page;
import com.ibr.baoliyun.entity.Role;
import com.ibr.baoliyun.exception.BException;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月23日 下午2:15:50 
 *  
 */

public interface IHomeService  {
	
	public Page<Role> insertTest();
	
	public void selectTest();
	
}
  