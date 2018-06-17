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
@TableName("t_permission")
public class Permission extends Model<Permission> {

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
	private String url;
	/**
	 * 该级别应在代码中自动生成
            权限级别最高5级,每两位代表一个级别域范围
            00表示主级别最外层级别,也是最

外层菜单
            0000表示00级别的下一级别
            最高表示0000000000
            其中00到49代表菜单 50到99代表按钮权限
            例子如下:  这

个例子是最高层级是4级 
            人员管理           01  
                用户管理       0101
                角色管理       0102
            业务管理   

        02
                商品管理       0201
                    导出           020151
                    查询           020152
                物流管

理       0202
                    地址录入   020201
                        查看       02020151
	 */
	private String level;
	/**
	 * 扩展属性字段,目前作为不同终端权限的区分
            1 = web
            2 = app
	 */
	private Integer attribute;
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

	public Permission setId(Integer id) {
		this.id = id;
		return this;
	}

	public String getName() {
		return name;
	}

	public Permission setName(String name) {
		this.name = name;
		return this;
	}

	public String getUrl() {
		return url;
	}

	public Permission setUrl(String url) {
		this.url = url;
		return this;
	}

	public String getLevel() {
		return level;
	}

	public Permission setLevel(String level) {
		this.level = level;
		return this;
	}

	public Integer getAttribute() {
		return attribute;
	}

	public Permission setAttribute(Integer attribute) {
		this.attribute = attribute;
		return this;
	}

	public java.util.Date getCreatetime() {
		return createtime;
	}

	public Permission setCreatetime(java.util.Date createtime) {
		this.createtime = createtime;
		return this;
	}

	public java.util.Date getUpdatetime() {
		return updatetime;
	}

	public Permission setUpdatetime(java.util.Date updatetime) {
		this.updatetime = updatetime;
		return this;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
