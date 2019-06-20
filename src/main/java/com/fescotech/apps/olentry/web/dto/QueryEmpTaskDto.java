package com.fescotech.apps.olentry.web.dto;

public class QueryEmpTaskDto {

	private String empName;
	private String idCode;
	private String mobile;
	private Integer empStatus;
	private Integer taskStatus;
	private Integer enrollStatus;			
	private Integer personnelStatus;
	private Integer insStatus;
	private Integer contractStatus;
	private Integer syncMisFlag;
	private String submitStartTime;
	private String submitEndTime;
	private Integer page;
	private Integer limit;
	
	
	
	
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getIdCode() {
		return idCode;
	}
	public void setIdCode(String idCode) {
		this.idCode = idCode;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public Integer getEmpStatus() {
		return empStatus;
	}
	public void setEmpStatus(Integer empStatus) {
		this.empStatus = empStatus;
	}
	public Integer getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(Integer taskStatus) {
		this.taskStatus = taskStatus;
	}
	public Integer getEnrollStatus() {
		return enrollStatus;
	}
	public void setEnrollStatus(Integer enrollStatus) {
		this.enrollStatus = enrollStatus;
	}
	public Integer getPersonnelStatus() {
		return personnelStatus;
	}
	public void setPersonnelStatus(Integer personnelStatus) {
		this.personnelStatus = personnelStatus;
	}
	public Integer getInsStatus() {
		return insStatus;
	}
	public void setInsStatus(Integer insStatus) {
		this.insStatus = insStatus;
	}
	public Integer getContractStatus() {
		return contractStatus;
	}
	public void setContractStatus(Integer contractStatus) {
		this.contractStatus = contractStatus;
	}
	public Integer getSyncMisFlag() {
		return syncMisFlag;
	}
	public void setSyncMisFlag(Integer syncMisFlag) {
		this.syncMisFlag = syncMisFlag;
	}
	public String getSubmitStartTime() {
		return submitStartTime;
	}
	public void setSubmitStartTime(String submitStartTime) {
		this.submitStartTime = submitStartTime;
	}
	public String getSubmitEndTime() {
		return submitEndTime;
	}
	public void setSubmitEndTime(String submitEndTime) {
		this.submitEndTime = submitEndTime;
	}
	
	
	
}
