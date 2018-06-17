package com.ibr.baoliyun.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;
/**
 * <p>
 * 角色权限关系表
 * </p>
 *
 * @author Hanjun
 * @since 2017-01-24
 */
@TableName("t_role_permission")
public class RolePermission extends Model<RolePermission> {

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
	private Integer permissionid;


	public Integer getId() {
		return id;
	}

	public RolePermission setId(Integer id) {
		this.id = id;
		return this;
	}

	public Integer getRoleid() {
		return roleid;
	}

	public RolePermission setRoleid(Integer roleid) {
		this.roleid = roleid;
		return this;
	}

	public Integer getPermissionid() {
		return permissionid;
	}

	public RolePermission setPermissionid(Integer permissionid) {
		this.permissionid = permissionid;
		return this;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
