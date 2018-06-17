package com.ibr.baoliyun.service.impl;  

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.ibr.baoliyun.entity.Permission;
import com.ibr.baoliyun.entity.Role;
import com.ibr.baoliyun.entity.RolePermission;
import com.ibr.baoliyun.service.IHomeService;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月23日 下午2:52:49 
 *   
 */
@Service
public class HomeServiceImpl   implements IHomeService {

	@Transactional
	@Override
	public Page<Role> insertTest() {
		
		// 事务处理
		// 插入一个角色
		// 插入一个权限
		// 将其进行关联 
		
		Role r2 = new Role();
		r2.setName("测试角色0000").setId(1).insertOrUpdate();
		
		Role r = new Role();
		r.setName("测试角色")
		.setCreatetime(new Date())
		.setUpdatetime(new Date())
		.insertOrUpdate();
		
		Permission p = new Permission();
		p.setAttribute(1)
		.setLevel("000000")
		.setName("权限测试")
		.setCreatetime(new Date())
		.setUpdatetime(new Date())
		.setUrl("http://feichangyouca.com");
		p.insert();
		
		
		RolePermission rp = new RolePermission();
		rp.setPermissionid(p.getId()).setRoleid(r.getId()).insert();
		
		//if(r.getId() != p.getId())
		//	throw new BException("异常回滚测试");
		
		System.err.println("rid:" +  r.getId() + "    pid:" + p.getId() + "    rpid:" + rp.getId());
		
		Page<Role> _list = r.selectPage(new Page<Role>(1,10),"","");
		return _list;
	}

	
	
	@Override
	public void selectTest() {
		
		Permission p = new Permission();
		
		EntityWrapper ew = new EntityWrapper<Permission>();
		
		// p.selectList();
		ew.addFilterIfNeed(true, "name = {0}", "zhang");
		ew.andNew("aaa={0}", "1");
		ew.addFilterIfNeed(false, "name = {0}", "li");
		ew.addFilterIfNeed(true, "name = {0}", "qqq");
		ew.andNew("name = {0}", "9999");
		
		
		System.out.print(ew.toString());
	}

}