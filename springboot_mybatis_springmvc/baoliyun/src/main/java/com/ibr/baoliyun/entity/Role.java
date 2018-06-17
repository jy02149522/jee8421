package com.ibr.baoliyun.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;
/**
 * <p>
 * 
 * </p>
 *
 * @author Hanjun
 * @since 2017-01-24
 */
@TableName("t_role")
public class Role extends Model<Role> {

    private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	private String name;
	/**
	 * 
	 */
	private java.util.Date createtime;
	/**
	 * 
	 */
	private java.util.Date updatetime;


	public Integer getId() {
		return id;
	}

	public Role setId(Integer id) {
		this.id = id;
		return this;
	}

	public String getName() {
		return name;
	}

	public Role setName(String name) {
		this.name = name;
		return this;
	}

	public java.util.Date getCreatetime() {
		return createtime;
	}

	public Role setCreatetime(java.util.Date createtime) {
		this.createtime = createtime;
		return this;
	}

	public java.util.Date getUpdatetime() {
		return updatetime;
	}

	public Role setUpdatetime(java.util.Date updatetime) {
		this.updatetime = updatetime;
		return this;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
