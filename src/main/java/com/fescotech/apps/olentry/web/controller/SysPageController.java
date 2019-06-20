package com.fescotech.apps.olentry.web.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
/**
 * 系统页面视图
 */
@Controller
public class SysPageController {
	@RequestMapping("sys/{url}.html")
	public String page(@PathVariable("url") String url){
		return "sys/" + url + ".html";
	}
	@RequestMapping("sys/{url}.xhtml")
	public String pageJsp(@PathVariable("url") String url){
		return "sys/" + url + ".jsp";
	}
}
