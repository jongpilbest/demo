package com.example.demo.Filter;

import com.example.demo.Filter.Filter;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.util.UUID;
@Slf4j
public class LogFilter implements Filter {

    @Override
    public  void init(FilterConfig filterConfig) throws ServletException{
        log.info("log Filter init");
    }

    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();
        String uuid = UUID.randomUUID().toString();
        try {
            log.info("REQUEST  [{}][{}]", uuid, requestURI);
            // 다음 필터 가 있으면 필터를 호출하고 , 필터가 없으면 서블릿을 호출한다.

            chain.doFilter(request, response);
        }catch (Exception e) {
            throw e;
        }finally {
            log.info("");

}
    }
}
