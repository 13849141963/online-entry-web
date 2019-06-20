package com.fescotech.apps.olentry.web.handler;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.fesco.pafa.exceptions.MessageException;
import com.fescotech.apps.olentry.common.Res;
import com.fescotech.apps.olentry.common.ResException;
/**
 * 异常处理器
 */
@Component
public class ResExceptionHandler implements HandlerExceptionResolver {
	private Logger logger = LoggerFactory.getLogger(getClass());	
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		Res r = new Res();
		try {
			response.setContentType("application/json;charset=utf-8");
			response.setCharacterEncoding("utf-8");
			if (ex instanceof MessageException) {
				r.setMessage(ex.getMessage());
				request.setAttribute("exception", ex.getMessage());
			}else if (ex instanceof ResException) {
				r.setRspCode(((ResException) ex).getCode());
				r.setMessage(((ResException) ex).getMessage());
				request.setAttribute("exception", ex.getMessage());
			}else if(ex instanceof DuplicateKeyException){
				r = Res.error("数据库中已存在该记录");
				request.setAttribute("exception", "业务错误：数据库中已存在该记录");
			}else if(ex instanceof AuthorizationException){
				r = Res.error("没有权限，请联系管理员授权");
				request.setAttribute("exception", "业务错误：没有权限，请联系管理员授权");
			}else{
				r = Res.error();
				request.setAttribute("exception", "程序错误：" + ex.getMessage());
			}
			//记录异常日志
			logger.error(ex.getMessage(), ex);
			String json = JSON.toJSONString(r);
			response.getWriter().print(json);
		} catch (Exception e) {
			logger.error("ResExceptionHandler 异常处理失败", e);
			request.setAttribute("exception", e.getMessage());
		}
		return new ModelAndView();
	}
}
