package com.fescotech.apps.olentry.web.controller.base;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import com.fescotech.apps.olentry.base.domain.Menu;
import com.fescotech.apps.olentry.common.Res;
import com.fescotech.apps.olentry.web.util.PhwebPropertyUtil;
import com.fescotech.apps.olentry.web.util.ShiroUtils;
@RestController
@RequestMapping("/sys")
public class MenuController {
	@RequestMapping("/menu")
	public Res user(){
		List<Menu> menuList = new ArrayList<Menu>();
		
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();  
        String menuFile = PhwebPropertyUtil.getMenufile();
        InputStream is = this.getClass().getResourceAsStream(menuFile);
        try {   
            DocumentBuilder builder = factory.newDocumentBuilder();   
            Document doc = builder.parse(is);
            NodeList list = doc.getElementsByTagName("menu");
	        // 遍历每一个节点
            //TODO 根据当前用户权限取得菜单,逻辑有点乱,此处需要重新梳理
			List<String> perms =  ShiroUtils.getUserPerms();
            for (int i = 0; i < list.getLength(); ++i)
	        {
	        	Element element = (Element) list.item(i);	        	
	            if(element.getAttribute("type").equals("0") ){
	            	if (hasPerm(perms,element.getAttribute("perms"))) {//导航菜单权限控制
	            		Menu menu = new Menu();
			        	menu.setIcon(element.getAttribute("icon"));
			        	menu.setMenuId(Long.parseLong(element.getAttribute("menuId")));
			        	menu.setName(element.getAttribute("name"));
			        	menu.setType(Integer.parseInt(element.getAttribute("type")));
			        	menu.setUrl(element.getAttribute("url"));
		            	List<Menu> menus = new ArrayList<Menu>();
		            	NodeList mlist = element.getElementsByTagName("menu");
			            for(int j = 0; j < mlist.getLength(); ++j){//菜单权限控制
			            	Element ele = (Element) mlist.item(j);
			            	if(hasPerm(perms,ele.getAttribute("perms"))){
			            		Menu me = new Menu();
				            	me.setIcon(ele.getAttribute("icon"));
				            	me.setMenuId(Long.parseLong(ele.getAttribute("menuId")));
				            	me.setName(ele.getAttribute("name"));
				            	me.setType(Integer.parseInt(ele.getAttribute("type")));
				            	me.setUrl(ele.getAttribute("url"));
				            	menus.add(me);
			            	}		            		            	
			            }
			            menu.setList(menus);
			            menuList.add(menu);
					}
	            }	            
	        }
        }catch (Exception e) {
        	 e.printStackTrace();
		}
		return Res.ok(menuList);
	}
	
	private boolean hasPerm(List<String> perms,String perm){
		return perms.contains(perm) || PhwebPropertyUtil.isTestMode();
	}
}
