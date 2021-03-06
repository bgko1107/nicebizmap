package com.bizmap.config;


import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@WebFilter(urlPatterns = "/*")
public class ApiFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) {
        log.info("=====================Filter TEST  : init ApiFilter=====================");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        log.info("=====================Filter TEST  : doFilter=====================");
        log.info("doFilter ApiFilter, uri : {}", ((HttpServletRequest)servletRequest).getRequestURI());
        log.info("=====================Filter TEST  : doFilter=====================");
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        log.info("=====================Filter TEST  : destroy ApiFilter=====================");
    }
}