package com.fescotech.apps.olentry.web.util;
import java.util.Properties;
import com.fesco.pafa.util.PropertiesUtil;
/**
 * 参数配置表
 * @author win
 */
public class PhwebPropertyUtil {
	private static Properties  props = PropertiesUtil.load("idmconfig.properties");
	/**
	 * 获取短信通知回调接口
	 * @return
	 */
	public static boolean isTestMode(){
		String testMode =  props.getProperty("phexam.apps.test","false");
		return "true".equalsIgnoreCase(testMode);
	}
	
	
	public static String getMenufile(){
		return props.getProperty("phexam.apps.menufile","/menu.xml");
	}
		
}