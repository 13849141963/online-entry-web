package com.fescotech.apps.olentry.base.domain;

import java.util.Date;

/**
 * 
 */
public class BaseCorpinfo {

	/**
	 * 公司id
	 */
	private Long corpId; 
	
	/**
	 * 父类id
	 */
	private Long parentId; 
	
	/**
	 * 同级显示序号
	 */
	private Long displayOrder; 
	
	/**
	 * 层级
	 */
	private Long corpLevel; 
	
	/**
	 * 公司名称
	 */
	private String companyName; 
	
	/**
	 * 公司简称
	 */
	private String shortName; 
	
	/**
	 * 描述
	 */
	private String description; 
	
	/**
	 * 是否为叶子节点
	 */
	private Integer isLeaf; 
	
	/**
	 * 公司办公地区
	 */
	private String corpArea; 
	
	/**
	 * 公司状态(DATA_VALID_STATE)
	 */
	private Integer corpState; 
	
	/**
	 * 公司类型(成本中心，供应商，管理单元(成本中心允许添加内部组织机构，否则不允许),所有类型机构均允许挂用户和角色)(CORP_TYPE)
	 */
	private Integer corpType; 
	
	/**
	 * 是否能有自己供应商(YES_NO)
	 */
	private Integer isHaveSupp; 
	
	/**
	 * 是否为供应商统一接口
	 */
	private Integer isSuppInterface; 
	
	/**
	 * 系统使用情况CORP_USER_SYSTEM(只使用供应商自助模块,只使用雇员服务和供应商自助模块,只使用销售、客服、财务,使用全部模块)
	 */
	private Integer systemUsage; 
	
	/**
	 * 公司办公地址
	 */
	private String officeAddr; 
	
	/**
	 * 邮政编码
	 */
	private String postCode; 
	
	/**
	 * 公司网址
	 */
	private String website; 
	
	/**
	 * 操作人
	 */
	private Long operator; 
	
	/**
	 * 操作时间
	 */
	private Date operTime; 
	
	/**
	 * 系统根节点，yes_NO  如果是yes则表示不能进行操作
	 */
	private Integer isRoot; 
	
	/**
	 * 供应商ID
	 */
	private Long suppId; 
	
	private String parentName;
	
	/**
	 * 读取公司id
	 */
	public Long getCorpId(){
		return corpId;
	} 
	
	/**
	 * 设置 公司id
	 */
	public void setCorpId(Long corpId){
		this.corpId = corpId;
	}
	
	/**
	 * 读取父类id
	 */
	public Long getParentId(){
		return parentId;
	} 
	
	/**
	 * 设置 父类id
	 */
	public void setParentId(Long parentId){
		this.parentId = parentId;
	}
	
	/**
	 * 读取同级显示序号
	 */
	public Long getDisplayOrder(){
		return displayOrder;
	} 
	
	/**
	 * 设置 同级显示序号
	 */
	public void setDisplayOrder(Long displayOrder){
		this.displayOrder = displayOrder;
	}
	
	/**
	 * 读取层级
	 */
	public Long getCorpLevel(){
		return corpLevel;
	} 
	
	/**
	 * 设置 层级
	 */
	public void setCorpLevel(Long corpLevel){
		this.corpLevel = corpLevel;
	}
	
	/**
	 * 读取公司名称
	 */
	public String getCompanyName(){
		return companyName;
	} 
	
	/**
	 * 设置 公司名称
	 */
	public void setCompanyName(String companyName){
		this.companyName = companyName;
	}
	
	/**
	 * 读取公司简称
	 */
	public String getShortName(){
		return shortName;
	} 
	
	/**
	 * 设置 公司简称
	 */
	public void setShortName(String shortName){
		this.shortName = shortName;
	}
		
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 读取是否为叶子节点
	 */
	public Integer getIsLeaf(){
		return isLeaf;
	} 
	
	/**
	 * 设置 是否为叶子节点
	 */
	public void setIsLeaf(Integer isLeaf){
		this.isLeaf = isLeaf;
	}
	
	/**
	 * 读取公司办公地区
	 */
	public String getCorpArea(){
		return corpArea;
	} 
	
	/**
	 * 设置 公司办公地区
	 */
	public void setCorpArea(String corpArea){
		this.corpArea = corpArea;
	}
	
	/**
	 * 读取公司状态(DATA_VALID_STATE)
	 */
	public Integer getCorpState(){
		return corpState;
	} 
	
	/**
	 * 设置 公司状态(DATA_VALID_STATE)
	 */
	public void setCorpState(Integer corpState){
		this.corpState = corpState;
	}
	
	/**
	 * 读取公司类型(成本中心，供应商，管理单元(成本中心允许添加内部组织机构，否则不允许),所有类型机构均允许挂用户和角色)(CORP_TYPE)
	 */
	public Integer getCorpType(){
		return corpType;
	} 
	
	/**
	 * 设置 公司类型(成本中心，供应商，管理单元(成本中心允许添加内部组织机构，否则不允许),所有类型机构均允许挂用户和角色)(CORP_TYPE)
	 */
	public void setCorpType(Integer corpType){
		this.corpType = corpType;
	}
	
	/**
	 * 读取是否能有自己供应商(YES_NO)
	 */
	public Integer getIsHaveSupp(){
		return isHaveSupp;
	} 
	
	/**
	 * 设置 是否能有自己供应商(YES_NO)
	 */
	public void setIsHaveSupp(Integer isHaveSupp){
		this.isHaveSupp = isHaveSupp;
	}
	
	/**
	 * 读取是否为供应商统一接口
	 */
	public Integer getIsSuppInterface(){
		return isSuppInterface;
	} 
	
	/**
	 * 设置 是否为供应商统一接口
	 */
	public void setIsSuppInterface(Integer isSuppInterface){
		this.isSuppInterface = isSuppInterface;
	}
	
	/**
	 * 读取系统使用情况CORP_USER_SYSTEM(只使用供应商自助模块,只使用雇员服务和供应商自助模块,只使用销售、客服、财务,使用全部模块)
	 */
	public Integer getSystemUsage(){
		return systemUsage;
	} 
	
	/**
	 * 设置 系统使用情况CORP_USER_SYSTEM(只使用供应商自助模块,只使用雇员服务和供应商自助模块,只使用销售、客服、财务,使用全部模块)
	 */
	public void setSystemUsage(Integer systemUsage){
		this.systemUsage = systemUsage;
	}
	
	/**
	 * 读取公司办公地址
	 */
	public String getOfficeAddr(){
		return officeAddr;
	} 
	
	/**
	 * 设置 公司办公地址
	 */
	public void setOfficeAddr(String officeAddr){
		this.officeAddr = officeAddr;
	}
	
	/**
	 * 读取邮政编码
	 */
	public String getPostCode(){
		return postCode;
	} 
	
	/**
	 * 设置 邮政编码
	 */
	public void setPostCode(String postCode){
		this.postCode = postCode;
	}
	
	/**
	 * 读取公司网址
	 */
	public String getWebsite(){
		return website;
	} 
	
	/**
	 * 设置 公司网址
	 */
	public void setWebsite(String website){
		this.website = website;
	}
	
	/**
	 * 读取操作人
	 */
	public Long getOperator(){
		return operator;
	} 
	
	/**
	 * 设置 操作人
	 */
	public void setOperator(Long operator){
		this.operator = operator;
	}
	
	/**
	 * 读取操作时间
	 */
	public Date getOperTime(){
		return operTime;
	} 
	
	/**
	 * 设置 操作时间
	 */
	public void setOperTime(Date operTime){
		this.operTime = operTime;
	}
	
	/**
	 * 读取系统根节点，yes_NO  如果是yes则表示不能进行操作
	 */
	public Integer getIsRoot(){
		return isRoot;
	} 
	
	/**
	 * 设置 系统根节点，yes_NO  如果是yes则表示不能进行操作
	 */
	public void setIsRoot(Integer isRoot){
		this.isRoot = isRoot;
	}
	
	/**
	 * 读取供应商ID
	 */
	public Long getSuppId(){
		return suppId;
	} 
	
	/**
	 * 设置 供应商ID
	 */
	public void setSuppId(Long suppId){
		this.suppId = suppId;
	}

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	
	
}
