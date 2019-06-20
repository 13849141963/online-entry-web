package com.fescotech.apps.olentry.web.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class FormatUtils {

	
	public  static void formatTimeFormArray(JSONArray array,String timekey) {
		for (int i = 0; i < array.size(); i++) {
			JSONObject object = (JSONObject) array.get(i);
			Long time = (Long) object.get(timekey);
			if(time==null){
				continue;
			}
			Date date = new Date(time);
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String strTime = format.format(date);
			object.remove(timekey);
			object.put(timekey, strTime);
		}
	}
	
	public  static void formatTimeFormArrayA(JSONArray array,String timekey) {
		for (int i = 0; i < array.size(); i++) {
			JSONObject object = (JSONObject) array.get(i);
			Long time = (Long) object.get(timekey);
			if(time==null){
				continue;
			}
			Date date = new Date(time);
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			String strTime = format.format(date);
			object.remove(timekey);
			object.put(timekey, strTime);
		}
	}
}
