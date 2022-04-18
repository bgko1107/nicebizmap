package com.bizmap.controller;

import com.bizmap.service.MainService;
import com.bizmap.util.BizmapUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MainController {

    private final MainService mainService;

    @GetMapping("/")
    public String redirect() {
        return "redirect:/main";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/signUp")
    public String signUp() {
        return "signUp";
    }

    @GetMapping("/main")
    public String main(Model model, HttpSession session) {
        if(BizmapUtil.isEmpty(session.getAttribute("userId"))){
            return "redirect:/login";
        }
        model.addAttribute("mainVO", mainService.getDate());
        log.info("# Main Model: {}", model);
        return "main";
    }

    @GetMapping("/index")
    public String index(Model model, HttpSession session) {
        if(BizmapUtil.isEmpty(session.getAttribute("userId"))){
            return "redirect:/login";
        }
        return "index";
    }

}
