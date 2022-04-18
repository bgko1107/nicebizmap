package com.bizmap.service;

import com.bizmap.config.Sha256;
import com.bizmap.mapper.MainMapper;
import com.bizmap.util.BizmapUtil;
import com.bizmap.vo.LoginVO;
import com.bizmap.vo.MainVO;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MainService {

    private final MainMapper mainMapper;

    public MainVO getDate() {
        return mainMapper.getDate();
    }

    public String loginProc(LoginVO loginVO, HttpSession session) throws NoSuchAlgorithmException {
        Sha256 sha256 = new Sha256();
        String password = sha256.encrypt(loginVO.getPassword());
        loginVO.setPassword(password);

        LoginVO outVo = mainMapper.getUser(loginVO);
        if(!BizmapUtil.isEmpty(outVo)){
            log.info("### Login Result userId ==> {}", outVo.getUserId());
        }

        session.setAttribute("userId" , outVo.getUserId());
        session.setAttribute("userName" , outVo.getUserName());

        Gson gson = new Gson();
        String result = gson.toJson(outVo);

        return result;
    }

    public String getUserCheck(LoginVO loginVO) throws NoSuchAlgorithmException {

        LoginVO outVo = mainMapper.getUserCheck(loginVO);
        Gson gson = new Gson();
        String result = gson.toJson(outVo);
         System.out.println(result);

        return result;
    }

    public String setSignUpProc(LoginVO loginVO) throws NoSuchAlgorithmException {

        Sha256 sha256 = new Sha256();
        String password = sha256.encrypt(loginVO.getUserPw());
        loginVO.setUserPw(password);

        LoginVO outVo = mainMapper.getUserCheck(loginVO);
        if(!BizmapUtil.isEmpty(outVo)){
            return "이미 회원가입된 아이디";
        }

        // 회원가입
        mainMapper.setSignUpProc(loginVO);

        Gson gson = new Gson();
        String result = gson.toJson(outVo);

        System.out.println(result);
        return result;
    }

}
