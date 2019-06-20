package com.fescotech.apps.olentry.web.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fescotech.apps.olentry.web.util.ShiroUtils;
import com.fescotech.idm.client.model.IdmUser;
/**
 * Controller公共组件（用于权限控制）
 */
public abstract class AbstractController {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	
	protected IdmUser  getUser() {
		return ShiroUtils.getUserEntity();
	}
 

	protected Long getUserId() {
		return getUser().getUserId();
	}
}
