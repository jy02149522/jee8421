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
@TableName("t_user")
public class User extends Model<User> {

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
	private String loginname;
	/**
	 * 
	 */
	private String pwd;
	/**
	 * 1 = 正常
            2 = 锁定
	 */
	private Integer attribute;
	/**
	 * 
	 */
	private String tel;
	/**
	 * 
	 */
	private String email;
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

	public User setId(Integer id) {
		this.id = id;
		return this;
	}

	public String getName() {
		return name;
	}

	public User setName(String name) {
		this.name = name;
		return this;
	}

	public String getLoginname() {
		return loginname;
	}

	public User setLoginname(String loginname) {
		this.loginname = loginname;
		return this;
	}

	public String getPwd() {
		return pwd;
	}

	public User setPwd(String pwd) {
		this.pwd = pwd;
		return this;
	}

	public Integer getAttribute() {
		return attribute;
	}

	public User setAttribute(Integer attribute) {
		this.attribute = attribute;
		return this;
	}

	public String getTel() {
		return tel;
	}

	public User setTel(String tel) {
		this.tel = tel;
		return this;
	}

	public String getEmail() {
		return email;
	}

	public User setEmail(String email) {
		this.email = email;
		return this;
	}

	public java.util.Date getCreatetime() {
		return createtime;
	}

	public User setCreatetime(java.util.Date createtime) {
		this.createtime = createtime;
		return this;
	}

	public java.util.Date getUpdatetime() {
		return updatetime;
	}

	public User setUpdatetime(java.util.Date updatetime) {
		this.updatetime = updatetime;
		return this;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
