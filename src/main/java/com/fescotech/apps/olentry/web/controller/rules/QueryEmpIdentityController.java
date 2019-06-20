package com.fescotech.apps.olentry.web.controller.rules;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fescotech.apps.olentry.constants.Constant;
import com.fescotech.apps.olentry.web.util.FormatUtils;
import com.fescotech.apps.olentry.web.util.HttpUtil;
import com.fescotech.common.util.JsonUtil;
/****
 * 查询入职员工的信息(支持模糊查询)
 * @author Administrator
 *
 */
@Controller
public class QueryEmpIdentityController {

	/**
	 * 查询入职员工相关信息
	 * @param empName 员工姓名
	 * @param idCode  员工身份证号
	 * @param mobile  员工手机号
	 * @param pageNo  当前页码
	 * @param pageSize 显示的条数
	 * @return json
	 */
	@RequestMapping(value="employees/info",method = RequestMethod.GET)
	@ResponseBody//@RequestParam(defaultValue="")默认请求参数为null
	public Object getParkseonSetting(@RequestParam(defaultValue="")String empName,@RequestParam(defaultValue="")String idCode,@RequestParam(defaultValue="")String mobile,Integer pageNo,Integer pageSize){
		String url =Constant.SERVICE_URL+"olentry/queryEmpIdentityController.do";
		JSONObject dtoObj = new JSONObject();
		dtoObj.put("empName",empName);
		dtoObj.put("mobile", mobile);
		dtoObj.put("idCode", idCode);
		dtoObj.put("pageNo", pageNo);//当前页
		dtoObj.put("pageSize",pageSize);//显示条数
		String json = JsonUtil.toJSONString(dtoObj);
		String httpPost =HttpUtil.httpPostData(url, json);
		JSONObject obj = null;
		try {
			obj = (JSONObject) JsonUtil.parseObject(httpPost);
			if (obj.containsKey("successResult")) {
				JSONObject succObj = (JSONObject) obj.get("successResult");
				JSONArray array = (JSONArray) succObj.get("pageRecords");
				// 格式化时间 
				FormatUtils.formatTimeFormArrayA(array, "birthDate");
			}
		} catch (Exception e) {
			throw e;
		}
		return obj;
	}
}
