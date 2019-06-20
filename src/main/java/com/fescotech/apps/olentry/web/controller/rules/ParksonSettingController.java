package com.fescotech.apps.olentry.web.controller.rules;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.fescotech.apps.olentry.constants.Constant;
import com.fescotech.apps.olentry.web.dto.QueryEmpTaskDto;
import com.fescotech.apps.olentry.web.dto.QueryTaskDetailDto;
import com.fescotech.apps.olentry.web.util.HttpUtil;
import com.fescotech.common.util.JsonUtil;

@Controller
public class ParksonSettingController {
	/**
	 * 查询入职规则管理
	 * @param householdArea 户口所在地
	 * @param householdType 户别
	 * @param personType  人员类型
	 * @param postType   人员职务
	 * @param pageNo  当前页码
	 * @param pageSize 显示的条数
	 * @return json
	 */
	@RequestMapping(value="parkson",method = RequestMethod.GET)
	@ResponseBody
	public Object getParkseonSetting(Integer householdArea,Integer householdType, Integer personType,Integer postType,Integer pageNo,Integer pageSize){
		String url =Constant.SERVICE_URL+"olentry/queryParksonSettingController.do";
		JSONObject dtoObj = new JSONObject();
		dtoObj.put("householdArea", householdArea);
		dtoObj.put("householdType",householdType);
		dtoObj.put("personType", personType);
		dtoObj.put("postType", postType);
		dtoObj.put("pageNo", pageNo);//当前页
		dtoObj.put("pageSize",pageSize);//显示条数
		String json = JsonUtil.toJSONString(dtoObj);
		String httpPost =HttpUtil.httpPostData(url, json);
		return JsonUtil.parseObject(httpPost);
	}
	/**
	 * 查询户口卡信息以及审核状态
	 * @param QueryEmpTaskDto 接受参数对象
	 * @param pageNo  当前页码
	 * @param pageSize 显示的条数
	 * @return json
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value="householdInfoAuditState")
	@ResponseBody
	public Object getprovideHouseholdInfoAuditState(QueryEmpTaskDto dto) throws UnsupportedEncodingException{
		String url =Constant.SERVICE_URL+"olentry/provideHouseholdInfoAuditStateController.do";
		JSONObject dtoObj = new JSONObject();
		
		String empName = "";
		if (dto.getEmpName() != null && !"".equals(dto.getEmpName())) {
			empName = URLDecoder.decode(dto.getEmpName(), "utf-8");
			empName = URLDecoder.decode(empName, "utf-8");
		}
		dtoObj.put("empName", empName);
		dtoObj.put("mobile", dto.getMobile());
		dtoObj.put("idCode", dto.getIdCode());
		dtoObj.put("pageNo", dto.getPage());//当前页
		dtoObj.put("pageSize",dto.getLimit());//显示条数
		String json = JsonUtil.toJSONString(dtoObj);
		String httpPost =HttpUtil.httpPostData(url, json);
		return JsonUtil.parseObject(httpPost);
	}
	/**
	 * 提供查询新参数据
	 * @param QueryEmpTaskDto 接受参数对象
	 * @return json
	 */
	@RequestMapping(value="newSocial",method = RequestMethod.GET)
	@ResponseBody
	public Object getParkseonSetting(QueryTaskDetailDto dto){
		String url =Constant.SERVICE_URL+"olentry/querySaveInsNewInfoController.do";
		JSONObject dtoObj = new JSONObject();
		dtoObj.put("empTaskId", dto.getEmpTaskId());
		String json = JsonUtil.toJSONString(dtoObj);
		String httpPost =HttpUtil.httpPostData(url, json);
		return JsonUtil.parseObject(httpPost);
	}
	/**
	 * 提供查询电子材料数据
	 * @param QueryEmpTaskDto 接受参数对象
	 * @return json
	 */
	@RequestMapping(value="materialInfo",method = RequestMethod.GET)
	@ResponseBody
	public Object getMaterial(QueryTaskDetailDto dto){
		String url =Constant.SERVICE_URL+"olentry/provideWebMaterialList.do";
		JSONObject dtoObj = new JSONObject();
		dtoObj.put("empTaskId", dto.getEmpTaskId());
		String json = JsonUtil.toJSONString(dtoObj);
		String httpPost =HttpUtil.httpPostData(url, json);
		return JsonUtil.parseObject(httpPost);
	}
}
