package g.web.common.shiro.common.delegate;

import org.soul.model.security.privilege.vo.SysUserVo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by longer on 1/26/16.
 */
public interface IPassportDelegate {

    void onLoginSuccessDelegate(HttpServletRequest request);

    void onLoginFailureDelegate(HttpServletRequest request, HttpServletResponse response, Integer id, String username, Integer loginErrorTimes);

    void onLogoutDelegate(HttpServletRequest request, HttpServletResponse response);

    void redirectTo(HttpServletRequest request, HttpServletResponse response, String successUrlOld) throws IOException;

    Integer getEntranceType(String contextPath, String uri);

    String getLoginUrl(Integer entranceType);

    int incLoginErrorTimes(SysUserVo vo);

    String getCaptchaSessionKey();
}
