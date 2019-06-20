package com.fescotech.apps.olentry.base.domain.vo;

import com.fescotech.apps.olentry.base.domain.BaseLog;

public class BaseLogVo extends BaseLog{

	/**
	 * 耗时（毫秒）
	 */
	private long timeConsuming;
	
	/**
	 * 操作开始时间
	 */
	private String beginTimeName;

	public String getBeginTimeName() {
		return beginTimeName;
	}

	public void setBeginTimeName(String beginTimeName) {
		this.beginTimeName = beginTimeName;
	}

	public long getTimeConsuming() {
		return timeConsuming;
	}

	public void setTimeConsuming(long timeConsuming) {
		this.timeConsuming = timeConsuming;
	}

}
