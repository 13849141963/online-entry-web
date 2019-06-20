package com.fescotech.apps.olentry.web.util;

import java.util.Map;
import com.fesco.pafa.util.HttpClientUtil;
public class HttpUtil {
	public static final String DEFAULT_ENCODING = "UTF-8";
	public static final int    DEFAULT_READ_TIMEOUT = 60000;
	
	public static String httpPostData(String url, String data) {
		return httpPostData(url, data,DEFAULT_ENCODING);
	}
	
	public static String httpPostData(String url, String data,
			String charset) {
		return  httpPostData(url, data,charset, DEFAULT_READ_TIMEOUT);
	}
	
	public static String httpPostData(String url,String  data,
			String charset, int timeout){
		return HttpClientUtil.httpPost(url, data, charset, timeout);
	}
	
	public static String httpPost(String url, Map<String, String> parms) {
		return httpPost(url, parms,DEFAULT_ENCODING);
	}
	
	public static String httpPost(String url, Map<String, String> parms,
			String charset) {
		return  httpPost(url, parms,charset, DEFAULT_READ_TIMEOUT);
	}
	
	public static String httpPost(String url, Map<String, String> parms,
			String charset, int timeout) {
		return HttpClientUtil.httpPost(url, parms,charset, timeout);
	}
	
	
	public static String httpGet(String url, Map<String, String> parms) {
		return httpGet(url, parms,DEFAULT_ENCODING);
	}
	
	public static String httpGet(String url, Map<String, String> parms,
			String charset) {
		return  httpGet(url, parms,charset, DEFAULT_READ_TIMEOUT);
	}
	
	public static String httpGet(String url, Map<String, String> parms,
			String charset, int timeout) {
		return HttpClientUtil.httpGet(url, parms,charset, timeout);
	}
	
}
