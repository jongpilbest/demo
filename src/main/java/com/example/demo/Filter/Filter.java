package com.example.demo.Filter;

import jakarta.servlet.*;

import java.io.IOException;

public interface Filter {

     public default void init(FilterConfig filterConfig) throws ServletException {}

    //IO Excepiton: 입출력 예외
    //
     public void doFilter(ServletRequest request, ServletResponse response,
                          FilterChain chain) throws IOException, ServletException;
    public default void destroy() {}

}

