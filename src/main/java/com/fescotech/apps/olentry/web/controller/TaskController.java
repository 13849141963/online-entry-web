package com.fescotech.apps.olentry.web.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fescotech.apps.olentry.base.domain.vo.TaskVo;
import com.fescotech.apps.olentry.constants.Constant;
import com.fescotech.apps.olentry.web.dto.DictDto;
import com.fescotech.apps.olentry.web.dto.QueryEmpTaskDto;
import com.fescotech.apps.olentry.web.dto.QueryTaskDetailDto;
import com.fescotech.apps.olentry.web.util.FormatUtils;
import com.fescotech.apps.olentry.web.util.HttpUtil;
import com.fescotech.common.util.JsonUtil;

import freemarker.cache.StringTemplateLoader;

@Controller
public class TaskController {
	
	

	@RequestMapping(value = "task", method = RequestMethod.POST)
	@ResponseBody
	public Object getTaskList(@RequestBody TaskVo vo) {
		String url = Constant.SERVICE_URL+"olentry/getAllTasks.do";
		StringBuilder builder = new StringBuilder();
		builder.append("{\"creator\":\"").append(vo.getCreator()).append("\"}");
		String httpPost = HttpUtil.httpPostData(url, builder.toString());
		return JsonUtil.parseObject(httpPost);
	}

	@RequestMapping(value = "empTask", method = RequestMethod.GET)
	@ResponseBody
	public Object getEmpTask(QueryEmpTaskDto dto) throws UnsupportedEncodingException {
      
		JSONObject obj = null;

		int limit = dto.getLimit();
		int page = dto.getPage();

		String url = Constant.SERVICE_URL+"olentry/queryAllEmpTask.do";
		
		

		JSONObject dtoObj = new JSONObject();
		String empName = "";
		if (dto.getEmpName() != null && !"".equals(dto.getEmpName())) {
			empName = URLDecoder.decode(dto.getEmpName(), "utf-8");
			empName = URLDecoder.decode(empName, "utf-8");

		}

		dtoObj.put("empName", empName);
		dtoObj.put("idCode", dto.getIdCode());
		dtoObj.put("mobile", dto.getMobile());
		dtoObj.put("empStatus", dto.getEmpStatus());
		dtoObj.put("taskStatus", dto.getTaskStatus());
		dtoObj.put("enrollStatus", dto.getEnrollStatus());
		dtoObj.put("personnelStatus", dto.getPersonnelStatus());
		dtoObj.put("insStatus", dto.getInsStatus());
		dtoObj.put("contractStatus", dto.getContractStatus());
		dtoObj.put("syncMisFlag", dto.getSyncMisFlag());
		dtoObj.put("submitStartTime", dto.getSubmitStartTime());
		dtoObj.put("submitEndTime", dto.getSubmitEndTime());
		dtoObj.put("pageSize", limit);
		dtoObj.put("pageNo", page);

		String json = JsonUtil.toJSONString(dtoObj);

		String httpPost = HttpUtil.httpPostData(url, json);

		try {
			obj = (JSONObject) JsonUtil.parseObject(httpPost);

			if (obj.containsKey("successResult")) {
				JSONObject succObj = (JSONObject) obj.get("successResult");

				JSONArray array = (JSONArray) succObj.get("pageRecords");

				// 格式化时间
				FormatUtils.formatTimeFormArray(array, "submitTime");

				int totalCount = (int) succObj.get("totalCount");
				int totalPage = (totalCount + limit - 1) / limit;
				obj.put("totalPage", totalPage);
				obj.put("currPage", page);
			}

		} catch (Exception e) {
			throw e;
		}

		return obj;
	}

	@RequestMapping(value = "showTaskDetail", method = RequestMethod.GET)
	@ResponseBody
	public Object getProduceCheck(QueryTaskDetailDto dto) throws UnsupportedEncodingException {

		JSONObject obj = null;

		int limit = dto.getLimit();
		int page = dto.getPage();

		String url = Constant.SERVICE_URL+"olentry/queryProcedureCheckByEmpTaskId.do";

		JSONObject dtoObj = new JSONObject();

		dtoObj.put("empTaskId", dto.getEmpTaskId());
		dtoObj.put("pageSize", limit);
		dtoObj.put("pageNo", page);

		String json = JsonUtil.toJSONString(dtoObj);

		String httpPost = HttpUtil.httpPostData(url, json);

		try {
			obj = (JSONObject) JsonUtil.parseObject(httpPost);

			if (obj.containsKey("successResult")) {
				JSONObject succObj = (JSONObject) obj.get("successResult");

				JSONArray array = (JSONArray) succObj.get("pageRecords");

				// 格式化时间
				FormatUtils.formatTimeFormArray(array, "checkTime");

				int totalCount = (int) succObj.get("totalCount");
				int totalPage = (totalCount + limit - 1) / limit;
				obj.put("totalPage", totalPage);
				obj.put("currPage", page);
			}

		} catch (Exception e) {
			throw e;
		}

		return obj;
	}

	@RequestMapping(value = "getDict", method = RequestMethod.POST)
	@ResponseBody
	public Object getDict(@RequestBody DictDto dto) {
		String url = Constant.SERVICE_URL+"olentry/queryDict.do";
		StringBuilder builder = new StringBuilder();
		builder.append("{\"dictType\":\"").append(dto.getDictType()).append("\"}");
		String httpPost = HttpUtil.httpPostData(url, builder.toString());
		return JsonUtil.parseObject(httpPost);
	}

	/**
	 * 获取入职登记
	 * 
	 * @param empTaskId
	 * @return
	 * @author guoliming
	 */
	@RequestMapping(value = "queryEnroll", method = RequestMethod.GET)
	@ResponseBody
	public Object queryEnrollByEmpTaskId(String empTaskId) {

		String url = Constant.SERVICE_URL+"olentry/queryEnrollByEmpTaskId.do";

		JSONObject dtoObj = new JSONObject();
		dtoObj.put("empTaskId", empTaskId);

		JSONObject obj = null;
		try {
			obj = getQueryData(url, dtoObj, null);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return obj;
	}

	/**
	 * 获取同步日志
	 * 
	 * @param empTaskId
	 * @return
	 * @author guoliming
	 */
	@RequestMapping(value = "querySyncLog", method = RequestMethod.GET)
	@ResponseBody
	public Object querySyncLogByEmpTaskId(String empTaskId) {

		String url = Constant.SERVICE_URL+"olentry/querySyncLogByEmpTaskId.do";

		JSONObject dtoObj = new JSONObject();
		dtoObj.put("empTaskId", empTaskId);

		JSONObject obj = null;

		try {
			obj = getQueryData(url, dtoObj, "recordTime");

		} catch (Exception e) {

			e.printStackTrace();
		}

		return obj;

	}

	/**
	 * 获取手续
	 * 
	 * @param empTaskId
	 * @return
	 * @author guoliming
	 */
	@RequestMapping(value = "queryProcedure", method = RequestMethod.GET)
	@ResponseBody
	public Object queryProcedureStatusByEmpTaskId(String empTaskId) {

		String url = Constant.SERVICE_URL+"olentry/queryProcedureStatusByEmpTaskId.do";

		JSONObject dtoObj = new JSONObject();
		dtoObj.put("empTaskId", empTaskId);

		JSONObject obj = null;
		try {
			obj = getQueryData(url, dtoObj, "syncTime");

		} catch (Exception e) {

			e.printStackTrace();
		}

		return obj;
	}

	/**
	 * 
	 * @param url
	 *            url
	 * @param dtoObj
	 *            入参
	 * @param formatKey
	 *            格式化时间 字段
	 * @return
	 * @throws Exception
	 * @author guoliming
	 */
	private JSONObject getQueryData(String url, JSONObject dtoObj, String formatKey) throws Exception {
		JSONObject obj = null;
		String json = JsonUtil.toJSONString(dtoObj);

		String httpPost = HttpUtil.httpPostData(url, json);

		try {
			obj = (JSONObject) JsonUtil.parseObject(httpPost);

			if (formatKey != null && !"".equals(formatKey)) {
				if (obj.containsKey("successResult")) {
					JSONArray array = (JSONArray) obj.get("successResult");

					// 格式化时间
					FormatUtils.formatTimeFormArray(array, formatKey);

				}
			}

		} catch (Exception e) {
			throw e;
		}
		return obj;
	}

	/**
	 * 同步手续
	 * @param dto
	 * @return
	 * @throws UnsupportedEncodingException
	   @author guoliming
	 */
	@RequestMapping(value = "syncProcedures", method = RequestMethod.GET)
	@ResponseBody
	public Object syncProcedure(Long empTaskId) throws UnsupportedEncodingException {

		JSONObject obj = null;

		

		JSONObject dtoObj = new JSONObject();

		dtoObj.put("empTaskId", empTaskId);
		

		String json = JsonUtil.toJSONString(dtoObj);
        
		
		String url = Constant.SERVICE_URL+"olentry/syncProcedures.do?jsondata="+URLEncoder.encode(json, "utf-8");
		
		
		String httpPost = HttpUtil.httpGet(url, null);

		try {
			
			obj = (JSONObject) JsonUtil.parseObject(httpPost);

			

		} catch (Exception e) {
			e.printStackTrace();
		}

		return obj;
	}
}
