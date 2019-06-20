package com.fescotech.apps.olentry.base.domain.vo;

import java.util.List;

import com.fescotech.apps.olentry.base.domain.BaseCorpinfo;

public class BaseCorpinfoVo extends BaseCorpinfo {
	
	/**
	 * ztree属性
	 */
	private Boolean open;
	
	private List<?> list;

	public Boolean getOpen() {
		return open;
	}

	public void setOpen(Boolean open) {
		this.open = open;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}
	
	public String getName(){
		return super.getCompanyName();
	}

}
