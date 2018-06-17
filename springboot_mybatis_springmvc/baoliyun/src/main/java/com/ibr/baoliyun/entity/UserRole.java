package com.ibr.baoliyun.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;
/**
 * <p>
 * 用户角色关系表
 * </p>
 *
 * @author Hanjun
 * @since 2017-01-24
 */
@TableName("t_user_role")
public class UserRole extends Model<UserRole> {

    private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	private Integer roleid;
	/**
	 * 
	 */
	private Integer userid;


	public Integer getId() {
		return id;
	}

	public UserRole setId(Integer id) {
		this.id = id;
		return this;
	}

	public Integer getRoleid() {
		return roleid;
	}

	public UserRole setRoleid(Integer roleid) {
		this.roleid = roleid;
		return this;
	}

	public Integer getUserid() {
		return userid;
	}

	public UserRole setUserid(Integer userid) {
		this.userid = userid;
		return this;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
