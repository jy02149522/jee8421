package com.ibr.baoliyun.test.demo;  

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.assertj.core.util.Arrays;
import org.junit.Before;
import org.junit.Test;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月24日 上午9:58:09 
 *  推荐读物
 */
public class Java8SteamDemo extends BaseTestDemo{

	private List<Article> beans;
	
	@Before
	public void init()
	{
		beans = new ArrayList<Article>();
		beans.add(new Article("java故事书","tom",new ArrayList<String>(){{
			add("c");
			add("ruby");
			add("java");
			add("net");
			add("计算机");
			}}));
		beans.add(new Article("java编程思想","tom",new ArrayList<String>(){{
			add("java");
			add("计算机");
			}}));
		beans.add(new Article("邓丽君小传","dengx",new ArrayList<String>(){{
			add("小城故事");
			add("一万个故事");
			add("甜蜜蜜");
			add("水漫青山");
			add("小说");
			}}));
		beans.add(new Article("鬼吹灯","鬼先生",new ArrayList<String>(){{
			add("寻龙诀");
			add("精绝古城");
			add("踏浪而来");
			add("九层妖塔");
			add("小说");
			}}));
	}
	
	@Test
	public void functionDemo()
	{
		// 表示入参是字符串 返回值是整形 支持以下两种写法
		Function<String, Integer> toInteger = Integer::valueOf;
		Function<String, Integer> toInteger2 = p -> Integer.parseInt(p);
		
		System.out.print(toInteger.apply("3"));
		System.out.print(toInteger2.apply("3"));
		
	}
	
	@Test
	public void test1()
	{
		List<Integer> _int = new ArrayList<Integer>();
		_int.add(1);
		_int.add(9);
		_int.add(5);
		_int.add(2);
		_int.add(3);
		_int.add(12);
		_int.add(100);
		
		 _int.stream()
		 .sorted()
		 .filter(p -> p.intValue() != 100)
		 .forEach(p->System.out.print(p + " "));
	}
	
	/**
	 * 查找第一个标签中带有小说的
	 */
	@Test
	public void getFirstxiaoshuoArticle() {  
	    
		Optional<Article> _article = beans.stream()
	        .filter(p -> p.getTags().contains("小说"))
	        .findFirst();
		_article.toString();
	 }
	
	/**
	 * 查找所有标签中带有java的
	 */
	@Test
	public void getAllJavaArticles()
	{
		List<Article> result = new ArrayList<>();
		result = beans.stream()
        .filter(article -> article.getTags().contains("java"))
        .collect(Collectors.toList());
		result.stream().forEach(p->p.toString());
	}
	
	/**
	 * 分组放入map
	 */
	@Test
	public void toMap()
	{
		 Map<String, List<Article>> result = new HashMap<>();
		 
		 // 传统写法
//		 for (Article article : beans) {
//		        if (result.containsKey(article.getAuthor())) {
//		            result.get(article.getAuthor()).add(article);
//		        } else {
//		            ArrayList<Article> articles = new ArrayList<>();
//		            articles.add(article);
//		            result.put(article.getAuthor(), articles);
//		        }
//		 }
		 // steam 方式
		 result = beans.stream().collect(Collectors.groupingBy(Article::getAuthor));
		 System.out.print(result.size());
		 
	}
	
	/**
	 * 所有标签放入list
	 */
	@Test
	public void toListForTagall()
	{
		 List<String> result = new ArrayList<String>();
		 
		 //传统方式
//		 for (Article article : beans) {
//		     result.addAll(article.getTags());
//		 }
		 // stream方式
		 result = beans.stream()
				 // 将getTags转成steam 
				 .flatMap(p->p.getTags().stream()).collect(Collectors.toList());
		 
		 System.out.print(result.size());
		    
	}
	
	
	
}
  