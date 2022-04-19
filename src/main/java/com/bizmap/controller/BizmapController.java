package com.bizmap.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
public class BizmapController {
    @GetMapping("/index_m")
    public String login() {
        return "bizmap/index_m";
    }
}
