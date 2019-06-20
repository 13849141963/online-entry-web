package com.fescotech.apps.olentry.base.domain;

import java.util.Date;

/**
 * 
 */
public class BaseLoginInfo {

	/**
	 * 主键ID
	 */
	private Long loginInfoId; 
	
	/**
	 * 用户id
	 */
	private Long userId; 
	
	/**
	 * 登录成功、登录失败、手工登出、强制登出
	 */
	private Integer logStatus; 
	
	/**
	 * 登录时间
	 */
	private Date loginTime; 
	
	/**
	 * 创建时间
	 */
	private Date createTime; 
	
	/**
	 * 登出时间
	 */
	private Date logoutTime; 
	
	/**
	 * 用户ip地址
	 */
	private String userIp; 
	
	/**
	 * 用户mac地址
	 */
	private String userMac; 
	
	/**
	 * 用户计算机名
	 */
	private String userComputer; 
	
	/**
	 * 用户名称
	 */
	private String userName; 
	
	/**
	 * 登陆账号
	 */
	private String loginName; 
	
	
	/**
	 * 读取主键ID
	 */
	public Long getLoginInfoId(){
		return loginInfoId;
	} 
	
	/**
	 * 设置 主键ID
	 */
	public void setLoginInfoId(Long loginInfoId){
		this.loginInfoId = loginInfoId;
	}
	
	/**
	 * 读取用户id
	 */
	public Long getUserId(){
		return userId;
	} 
	
	/**
	 * 设置 用户id
	 */
	public void setUserId(Long userId){
		this.userId = userId;
	}
	
	/**
	 * 读取登录成功、登录失败、手工登出、强制登出
	 */
	public Integer getLogStatus(){
		return logStatus;
	} 
	
	/**
	 * 设置 登录成功、登录失败、手工登出、强制登出
	 */
	public void setLogStatus(Integer logStatus){
		this.logStatus = logStatus;
	}
	
	/**
	 * 读取登录时间
	 */
	public Date getLoginTime(){
		return loginTime;
	} 
	
	/**
	 * 设置 登录时间
	 */
	public void setLoginTime(Date loginTime){
		this.loginTime = loginTime;
	}
	
	/**
	 * 读取创建时间
	 */
	public Date getCreateTime(){
		return createTime;
	} 
	
	/**
	 * 设置 创建时间
	 */
	public void setCreateTime(Date createTime){
		this.createTime = createTime;
	}
	
	/**
	 * 读取登出时间
	 */
	public Date getLogoutTime(){
		return logoutTime;
	} 
	
	/**
	 * 设置 登出时间
	 */
	public void setLogoutTime(Date logoutTime){
		this.logoutTime = logoutTime;
	}
	
	/**
	 * 读取用户ip地址
	 */
	public String getUserIp(){
		return userIp;
	} 
	
	/**
	 * 设置 用户ip地址
	 */
	public void setUserIp(String userIp){
		this.userIp = userIp;
	}
	
	/**
	 * 读取用户mac地址
	 */
	public String getUserMac(){
		return userMac;
	} 
	
	/**
	 * 设置 用户mac地址
	 */
	public void setUserMac(String userMac){
		this.userMac = userMac;
	}
	
	/**
	 * 读取用户计算机名
	 */
	public String getUserComputer(){
		return userComputer;
	} 
	
	/**
	 * 设置 用户计算机名
	 */
	public void setUserComputer(String userComputer){
		this.userComputer = userComputer;
	}
	
	/**
	 * 读取用户名称
	 */
	public String getUserName(){
		return userName;
	} 
	
	/**
	 * 设置 用户名称
	 */
	public void setUserName(String userName){
		this.userName = userName;
	}
	
	/**
	 * 读取登陆账号
	 */
	public String getLoginName(){
		return loginName;
	} 
	
	/**
	 * 设置 登陆账号
	 */
	public void setLoginName(String loginName){
		this.loginName = loginName;
	}
	
	
}
