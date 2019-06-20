package com.fescotech.apps.olentry.base.domain;

import java.util.Date;

import oracle.sql.CLOB;

/**
 * 日志实体类
 * @author:lzl
 * @time:2017年6月29日 下午3:08:53
 */
public class BaseLog {

	/**
	 * 主键id
	 */
	private Long logId;
	/**
	 * 菜单url
	 */
	private String logUrl;
	/**
	 * 请求方式
	 */
	private String httpMethod;
	/**
	 * 菜单id
	 */
	private Long functionId;
	/**
	 * 菜单名称
	 */
	private String functionName;
	/**
	 * 用户id
	 */
	private Long userId;
	/**
	 * 用户名称
	 */
	private String userName;
	/**
	 * 用户ip地址
	 */
	private String ipAddr;
	/**
	 * 类名
	 */
	private Integer opType;
	/**
	 * 方法名
	 */
	private CLOB logData;
	/**
	 * 操作结果（1：成功   2：失败）
	 */
	private Integer opResult;
	/**
	 * 日志信息
	 */
	private String logMsg;
	/**
	 * 开始时间	
	 */
	private Date opStartTime;
	/**
	 * 结束时间
	 */
	private Date opEndTime;
	
	/**
	 * 查询总数时用到的开始时间
	 */
	private String beginTime;
	
	/**
	 * 查询总数时用到的结束时间
	 */
	private String endTime;
	
	public String getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	/**
	 * 获取主键id
	 * @return
	 */
	public Long getLogId() {
		return logId;
	}
	/**
	 * 设置主键id
	 * @param logId
	 */
	public void setLogId(Long logId) {
		this.logId = logId;
	}
	/**
	 * 获取菜单url
	 * @return
	 */
	public String getLogUrl() {
		return logUrl;
	}
	/**
	 * 设置菜单url
	 * @param logUrl
	 */
	public void setLogUrl(String logUrl) {
		this.logUrl = logUrl;
	}
	/**
	 * 获取请求方式
	 * @return
	 */
	public String getHttpMethod() {
		return httpMethod;
	}
	/**
	 * 设置请求方式
	 * @param httpMethod
	 */
	public void setHttpMethod(String httpMethod) {
		this.httpMethod = httpMethod;
	}
	/**
	 * 获取菜单id
	 * @return
	 */
	public Long getFunctionId() {
		return functionId;
	}
	/**
	 * 设置菜单id
	 * @param functionId
	 */
	public void setFunctionId(Long functionId) {
		this.functionId = functionId;
	}
	/**
	 * 获取菜单名称
	 * @return
	 */
	public String getFunctionName() {
		return functionName;
	}
	/**
	 * 设置菜单名称
	 * @param functionName
	 */
	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}
	/**
	 * 获取用户id
	 * @return
	 */
	public Long getUserId() {
		return userId;
	}
	/**
	 * 设置用户id
	 * @param userId
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	/**
	 * 获取用户名称
	 * @return
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * 设置用户名称
	 * @param userName
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	/**
	 * 获取用户ip地址
	 * @return
	 */
	public String getIpAddr() {
		return ipAddr;
	}
	/**
	 * 设置用户ip地址
	 * @param ipAddr
	 */
	public void setIpAddr(String ipAddr) {
		this.ipAddr = ipAddr;
	}
	/**
	 * 获取类名
	 * @return
	 */
	public Integer getOpType() {
		return opType;
	}
	/**
	 * 设置类名
	 * @param opType
	 */
	public void setOpType(Integer opType) {
		this.opType = opType;
	}
	/**
	 * 获取方法名
	 * @return
	 */
	public CLOB getLogData() {
		return logData;
	}
	/**
	 * 设置方法名
	 * @param logData
	 */
	public void setLogData(CLOB logData) {
		this.logData = logData;
	}
	/**
	 * 获取操作结果
	 * @return
	 */
	public Integer getOpResult() {
		return opResult;
	}
	/**
	 * 设置操作结果
	 * @param opResult
	 */
	public void setOpResult(Integer opResult) {
		this.opResult = opResult;
	}
	/**
	 * 获取日志信息
	 * @return
	 */
	public String getLogMsg() {
		return logMsg;
	}
	/**
	 * 设置日志信息
	 * @param logMsg
	 */
	public void setLogMsg(String logMsg) {
		this.logMsg = logMsg;
	}
	/**
	 * 获取开始时间
	 * @return
	 */
	public Date getOpStartTime() {
		return opStartTime;
	}
	/**
	 * 设置开区时间
	 * @param opStartTime
	 */
	public void setOpStartTime(Date opStartTime) {
		this.opStartTime = opStartTime;
	}
	/**
	 * 获取结束时间
	 * @return
	 */
	public Date getOpEndTime() {
		return opEndTime;
	}
	/**
	 * 设置结束时间
	 * @param opEndTime
	 */
	public void setOpEndTime(Date opEndTime) {
		this.opEndTime = opEndTime;
	}
	
}
