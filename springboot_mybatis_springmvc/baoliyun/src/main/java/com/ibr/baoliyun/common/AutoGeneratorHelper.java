package com.ibr.baoliyun.common;

import java.util.HashMap;
import java.util.Map;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.TemplateConfig;
import com.baomidou.mybatisplus.generator.config.rules.DbType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;



/**
 * 自动生成映射工具类
 */
public class AutoGeneratorHelper {

	/**
	 * 
	 * 测试 run 执行
	 * 
	 */
	public static void main( String[] args ) {
			
		AutoGenerator mpg = new AutoGenerator();
		
		// 全局配置
		GlobalConfig gc = new GlobalConfig();
		gc.setOutputDir("C://SVN//Demo//demo//springboot_mybatis_springmvc//baoliyun//src//main//java");
		//gc.setOutputDir("C://code");
		gc.setFileOverride(true); // 覆盖原有文件
		gc.setActiveRecord(true);
		gc.setEnableCache(false);// XML 二级缓存
		gc.setBaseResultMap(true);// XML ResultMap
		gc.setBaseColumnList(true);// XML columList
		gc.setAuthor("Hanjun");
		mpg.setGlobalConfig(gc);

		// 数据源配置
		DataSourceConfig dsc = new DataSourceConfig();
		dsc.setDbType(DbType.MYSQL);
		dsc.setDriverName("com.mysql.jdbc.Driver");
		dsc.setUsername("root");
		dsc.setPassword("123456");
		dsc.setUrl("jdbc:mysql://192.168.1.45:3306/baoliyun?characterEncoding=utf8");
		mpg.setDataSource(dsc);

		// 策略配置
		StrategyConfig strategy = new StrategyConfig();
		strategy.setTablePrefix("l_,m_,t_,f_");// 此处可以修改为您的表前缀
		strategy.setNaming(NamingStrategy.remove_prefix_and_camel);// 表名生成策略
		strategy.setFieldNaming(NamingStrategy.underline_to_camel);
		strategy.setEntityBuliderModel(true);
		//strategy.setInclude(new String[] { "user" }); // 需要生成的表
		// strategy.setExclude(new String[]{"test"}); // 排除生成的表
		// 字段名生成策略
		
		// 自定义实体父类
		//strategy.setSuperEntityClass("com.ibr.baoliyun.entity.BaseEntity");
		// 自定义实体，公共字段
		// strategy.setSuperEntityColumns(new String[] { "createTime", "updateTime" });
		// 自定义 mapper 父类
		//strategy.setSuperMapperClass("com.baomidou.demo.TestMapper");
		// 自定义 service 父类
		// strategy.setSuperServiceClass("com.ibr.baoliyun.service.IBaseService");
		// 自定义 service 实现类父类
		strategy.setSuperServiceImplClass("com.ibr.baoliyun.service.BaseServiceImpl");
		// 自定义 controller 父类
		 strategy.setSuperControllerClass("com.ibr.baoliyun.controller.BaseApiController");
		mpg.setStrategy(strategy);

		// 包配置
		PackageConfig pc = new PackageConfig();
		pc.setController("controller");
		pc.setParent("com.ibr");
		pc.setModuleName("baoliyun");
		mpg.setPackageInfo(pc);

		// 注入自定义配置，可以在 VM 中使用 cfg.abc 设置的值
//		InjectionConfig cfg = new InjectionConfig() {
//			@Override
//			public void initMap() {
//				Map<String, Object> map = new HashMap<String, Object>();
//				map.put("abc", this.getConfig().getGlobalConfig().getAuthor() + "-mp");
//				this.setMap(map);
//			}
//		};
		//mpg.setCfg(cfg);

		// 自定义模板配置
		//TemplateConfig tc = new TemplateConfig();
		// tc.setController("...");
		// tc.setEntity("...");
		// tc.setMapper("...");
		// tc.setXml("...");
		// tc.setService("...");
		// tc.setServiceImpl("...");
		// mpg.setTemplate(tc);

		// 执行生成
		mpg.execute();

		// 打印注入设置
		//System.err.println(mpg.getCfg().getMap().get("abc"));
	
	}
	
}
