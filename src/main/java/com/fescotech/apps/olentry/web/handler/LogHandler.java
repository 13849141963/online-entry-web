package com.fescotech.apps.olentry.web.handler;
import java.util.Calendar;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.NamedThreadLocal;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.fesco.pafa.util.JsonBuilder;
import com.fescotech.apps.olentry.base.domain.BaseLog;
import com.fescotech.apps.olentry.web.util.ShiroUtils;
import com.fescotech.common.util.IpAddressUtil;
import com.fescotech.idm.client.model.IdmUser;

/**
 * 请求日志记录类
 * @time:2017年6月29日 上午11:42:14
 */
public class LogHandler implements HandlerInterceptor{
	private Logger logger = LoggerFactory.getLogger(getClass());	
	private static final ThreadLocal<Long> startTimeThreadLocal = new NamedThreadLocal<Long>("ThreadLocal StartTime");
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		try {
			long beginTime = System.currentTimeMillis();//开始时间 
			startTimeThreadLocal.set(beginTime);
		} catch (Exception e) {
			logger.error("LogHandler 记录日志异常", e);
		}  
		return true;
		
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		try {
			long beginTime = startTimeThreadLocal.get();//开始时间 
			long endTime = System.currentTimeMillis();//结束时间
			StringBuffer logUrl = request.getRequestURL();//访问地址
			String logMethod = request.getMethod();//执行方法
			String ipAddr = IpAddressUtil.getIpAddress(request);//用户IP地址
			Integer opResult = 1;//操作结果（1：成功    2：失败）
			String logMsg = "";//日志信息
			String userName = "";
			Long userId = null;
			Map map = request.getParameterMap();  
			String requestParam = JsonBuilder.buildJsonParam(map);
			if (requestParam != null && !requestParam.equals("")) {
				logMsg = "请求参数：\r\n"+requestParam +"\r\n";
			}
			IdmUser sysUser = ShiroUtils.getUserEntity();//用户信息
			if (sysUser != null) {
				userName = sysUser.getUserName();
				userId = sysUser.getUserId();
			}
			if (request.getAttribute("exception") != null && !request.getAttribute("exception").equals("")) {
				opResult = 2;
				logMsg += "异常信息：\r\n"+(String) request.getAttribute("exception");
			}
			
			BaseLog baseLog = new BaseLog();
			Calendar c = Calendar.getInstance();
			c.setTimeInMillis(beginTime);
			baseLog.setOpStartTime(c.getTime());
			Calendar c1 = Calendar.getInstance();
			c1.setTimeInMillis(endTime);
			baseLog.setOpEndTime(c1.getTime());
			baseLog.setLogUrl(logUrl.toString());
			baseLog.setHttpMethod(logMethod);
			baseLog.setIpAddr(ipAddr);
			baseLog.setOpResult(opResult);
			baseLog.setLogMsg(logMsg);
			baseLog.setUserId(userId);
			baseLog.setUserName(userName);
			//baseLogService.insert(baseLog);
			logger.info(JsonBuilder.buildJsonParam(baseLog));
		} catch (Exception e) {
			logger.error("LogHandler 记录日志异常", e);
		}
	}

}
