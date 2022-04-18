package com.bizmap.mapper;

import com.bizmap.vo.LoginVO;
import com.bizmap.vo.MainVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface MainMapper {
    MainVO getDate();
    LoginVO getUser(LoginVO loginVO);
    LoginVO getUserCheck(LoginVO loginVO);
    int setSignUpProc(LoginVO loginVO);
}
