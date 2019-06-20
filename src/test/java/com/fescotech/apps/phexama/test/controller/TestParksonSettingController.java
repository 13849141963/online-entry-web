package com.fescotech.apps.phexama.test.controller;

import org.junit.Test;

import com.alibaba.fastjson.JSONObject;
import com.fescotech.apps.olentry.web.util.HttpUtil;
import com.fescotech.common.util.JsonUtil;

public class TestParksonSettingController {


	@Test
	public void testGetParhSonSetting(){
		String url ="http://10.0.45.25:8686/olentry/queryParksonSettingController.do";
		String json ="{\"householdType\":\"null\",\"householdArea\":\"null\",\"personType\":\"null\",\"postType\":\"null\"}";
		JSONObject object = new JSONObject();
		String httpPost =HttpUtil.httpPostData(url, json);
		Object parseObject = JsonUtil.parseObject(httpPost);
		System.out.println(parseObject.toString());
	}

}
