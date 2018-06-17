package com.ibr.baoliyun.service.impl;  

import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;



/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月24日 下午4:08:59 
 *  
 */
public abstract class BaseServiceImpl<M extends BaseMapper<T> , T> extends ServiceImpl<M, T> {

	protected final Logger log = LoggerFactory.getLogger(this.getClass());
}
  