package com.ibr.baoliyun.controller;  

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/** 
 * @author hanjun 
 * @E-mail:34862642@163.com  
 * @version 创建时间：2017年1月25日 上午11:07:37 
 *  
 */

@RestController
public class FileUploadController extends BaseApiController{
	
	@RequestMapping("/up/uploadfile")
	public String handleFileUpload(@RequestParam(value = "file", required = false) MultipartFile[] file){

		if(file != null && file.length > 0)
		{
    	   	try 
    	   	{
    	   		for (int i = 0; i < file.length; i++) {
					MultipartFile multipartFile = file[i];
					String path = "data/img/" + multipartFile.getOriginalFilename();
	    	   		BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(new File(path)));
	    	   		out.write(multipartFile.getBytes());
	    	   		out.flush();
	    	   		out.close();
				}
    	   		
            }
    	   	catch (FileNotFoundException e) {
        	   	e.printStackTrace();
        	   	return"上传失败,"+e.getMessage();
    	   	} 
    	   	catch (IOException e) {
        	   	e.printStackTrace();
        	   	return"上传失败,"+e.getMessage();
    	   	}

    	   	return "上传成功";

		}
		else
       	{
			return "上传失败，因为文件是空的.";
       	}
	}
}
  