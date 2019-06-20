package com.fescotech.apps.olentry.base.domain;


/**
 * 统一用户管理字典实体类
 * @author:lzl
 * @time:2017年6月19日 下午6:41:37
 */
public class BaseDict {

	/**
	 * 主键
	 */
	private Long dictId; 
	
	/**
	 * 字典类别
	 */
	private String dictType; 
	
	/**
	 * 字典项编码
	 */
	private String dictCode; 
	
	/**
	 * 字典项名称
	 */
	private String dictName; 
	
	/**
	 * 字典项描述
	 */
	private String dictDesc; 
	
	/**
	 * 展示顺序
	 */
	private Integer dictOrder; 
	
	
	/**
	 * 读取主键
	 */
	public Long getDictId(){
		return dictId;
	} 
	
	/**
	 * 设置 主键
	 */
	public void setDictId(Long dictId){
		this.dictId = dictId;
	}
	
	/**
	 * 读取字典类别
	 */
	public String getDictType(){
		return dictType;
	} 
	
	/**
	 * 设置 字典类别
	 */
	public void setDictType(String dictType){
		this.dictType = dictType;
	}
	
	/**
	 * 读取字典项编码
	 */
	public String getDictCode(){
		return dictCode;
	} 
	
	/**
	 * 设置 字典项编码
	 */
	public void setDictCode(String dictCode){
		this.dictCode = dictCode;
	}
	
	/**
	 * 读取字典项名称
	 */
	public String getDictName(){
		return dictName;
	} 
	
	/**
	 * 设置 字典项名称
	 */
	public void setDictName(String dictName){
		this.dictName = dictName;
	}
	
	/**
	 * 读取字典项描述
	 */
	public String getDictDesc(){
		return dictDesc;
	} 
	
	/**
	 * 设置 字典项描述
	 */
	public void setDictDesc(String dictDesc){
		this.dictDesc = dictDesc;
	}
	
	/**
	 * 读取展示顺序
	 */
	public Integer getDictOrder(){
		return dictOrder;
	} 
	
	/**
	 * 设置 展示顺序
	 */
	public void setDictOrder(Integer dictOrder){
		this.dictOrder = dictOrder;
	}
	
	
}
