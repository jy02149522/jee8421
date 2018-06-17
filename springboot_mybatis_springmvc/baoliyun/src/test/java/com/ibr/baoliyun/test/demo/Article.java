package com.ibr.baoliyun.test.demo;  

import java.util.List;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月24日 上午10:03:00 
 *  
 */
public class Article {
	 private  String title;
     private  String author;
     private  List<String> tags;

     public Article(String title, String author, List<String> tags) {
         this.title = title;
         this.author = author;
         this.tags = tags;
     }

     public String getTitle() {
         return title;
     }

     public String getAuthor() {
         return author;
     }

     public List<String> getTags() {
         return tags;
     }
     
     @Override
    public String toString() {
    	 String _s = "Title: " + this.title + " author:" + this.author;
    	 System.out.println(_s);
    	 this.tags.stream().forEach(p->  System.out.println("tag->" + p));
    	 return super.toString();
    }
}
  