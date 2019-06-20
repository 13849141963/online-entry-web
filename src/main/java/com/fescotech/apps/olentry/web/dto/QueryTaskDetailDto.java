package com.fescotech.apps.olentry.web.dto;

public class QueryTaskDetailDto {
private Long empTaskId;
private Integer page;
private Integer limit;
public Long getEmpTaskId() {
	return empTaskId;
}
public void setEmpTaskId(Long empTaskId) {
	this.empTaskId = empTaskId;
}
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


}
