package com.bizmap.controller.api;

import com.bizmap.service.MainService;
import com.bizmap.vo.LoginVO;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;

@ResponseBody
@RestController
@RequiredArgsConstructor
public class MainControllerApi {

    private final MainService mainService;

    @PostMapping("/loginProc")
    public String loginProc(LoginVO loginvO, HttpSession session) throws NoSuchAlgorithmException {
        String result = mainService.loginProc(loginvO, session);
        return result;
    }

    @PostMapping("/check")
    public String check(LoginVO loginvO) throws NoSuchAlgorithmException {
        String result = mainService.getUserCheck(loginvO);
        return result;
    }

    @PostMapping("/signUpProc")
    public String signUpProc(LoginVO loginvO) throws NoSuchAlgorithmException {
        String result = mainService.setSignUpProc(loginvO);
        return result;
    }

}
