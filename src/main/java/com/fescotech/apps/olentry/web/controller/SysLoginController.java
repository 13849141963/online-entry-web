package com.fescotech.apps.olentry.web.controller;
import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fesco.pafa.exceptions.MessageException;
import com.fesco.pafa.util.StringUtil;
import com.fescotech.apps.olentry.common.Res;
import com.fescotech.apps.olentry.web.dto.UpdatePasswordParam;
import com.fescotech.apps.olentry.web.util.ShiroUtils;
import com.fescotech.common.util.StringHelper;
import com.fescotech.idm.client.model.IdmUser;
import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;

/**
 * 登录相关
 */
@Controller
public class SysLoginController {
	@Autowired
	private Producer producer;
	
	@RequestMapping("captcha")
	public void captcha(HttpServletResponse response)throws ServletException, IOException {
        response.setHeader("Cache-Control", "no-store, no-cache");
        response.setContentType("image/jpeg");
        //生成文字验证码
        String text = producer.createText();
        //生成图片验证码
        BufferedImage image = producer.createImage(text);
        //保存到shiro session
        ShiroUtils.setSessionAttribute(Constants.KAPTCHA_SESSION_KEY, text);
        
        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image, "jpg", out);
	}
	
	/**
	 * 登录
	 */
	@ResponseBody
	@RequestMapping(value = "/sys/login", method = RequestMethod.POST)
	public Res login(String username, String password, String captcha)throws IOException {
		String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
		if(!captcha.equalsIgnoreCase(kaptcha)){
			return Res.error("验证码不正确");
		}
		
		try{
			Subject subject = ShiroUtils.getSubject();
			//sha256加密
			//password = new Sha256Hash(password).toHex();
			UsernamePasswordToken token = new UsernamePasswordToken(username, password);
			subject.login(token);
		}catch (UnknownAccountException e) {
			return Res.error(e.getMessage());
		}catch (IncorrectCredentialsException e) {
			return Res.error(e.getMessage());
		}catch (LockedAccountException e) {
			return Res.error(e.getMessage());
		}catch (AuthenticationException e) {
			return Res.error("账户验证失败");
		}
	    
		return Res.ok();
	}
	
	/**
	 * 退出
	 */
	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout() {
		ShiroUtils.logout();
		return "redirect:login.html";
	}
	
	/**
	 * 登录
	 */
	@ResponseBody
	@RequestMapping(value = "/sys/user/info", method = RequestMethod.GET)
	public Res userInfo()throws IOException {
		IdmUser subject = ShiroUtils.getUserEntity();
		Res res =Res.ok(subject);
		return res;
	}
	
	/**
	 * 登录
	 */
	@ResponseBody
	@RequestMapping(value = "/sys/user/password", method = RequestMethod.POST)
	public Res updatePassword(@RequestBody UpdatePasswordParam param)throws IOException {
		/*if(StringHelper.isAnyEmpty(param.getPassword(),
				param.getNewAgainPassword(),
				param.getNewPassword())){
			throw new MessageException("密码相关参数为空!");
		}
		if(!StringUtil.equal(param.getNewAgainPassword(),
				param.getNewPassword())){
			throw new MessageException("两次输入密码参数不一致!");
		}*/
		//TODO 密码修改暂未实现
		return Res.error("该功能暂未开通！");
	}
}
