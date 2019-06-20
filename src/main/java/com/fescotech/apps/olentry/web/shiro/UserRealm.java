package com.fescotech.apps.olentry.web.shiro;
import java.util.HashSet;
import java.util.List;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import com.fescotech.idm.client.model.IdmUser;
import com.fescotech.idm.client.support.IdmUserSupport;
/**
 * 认证
 */
public class UserRealm extends AuthorizingRealm {
	/**
     * 授权(验证权限时调用)
     */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		IdmUser user = (IdmUser)principals.getPrimaryPrincipal();
		if(user == null) {
            throw new UnknownAccountException("会话超时或用户未登录！");
        }
		List<String> permsList = user.getPerms();
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		info.setStringPermissions(new HashSet<String>(permsList));
		return info;
	}

	/**
	 * 认证(登录时调用)
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException { 
		String username = (String) token.getPrincipal();
        String password = new String((char[]) token.getCredentials());
        IdmUser user = IdmUserSupport.checkSysUserByOpenApi(username, password);
        //账号不存在
        if(user == null) {
            throw new UnknownAccountException("账号或密码不正确");
        }
        user.setUserPwd(null);
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user, password, getName());
        return info;
	}
}