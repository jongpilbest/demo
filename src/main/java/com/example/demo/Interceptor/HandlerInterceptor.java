

//package com.example.demo.Interceptor;
//import lombok.extern.slf4j.Slf4j;

//import org.springframework.web.servlet.ModelAndView;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;


//public interface HandlerInterceptor {

//   default  boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

//   };


//  default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 이미지의 '컨트롤러 호출 후' 단계

//  }


//  default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 이미지의 '요청 완료' 단계 (뷰 렌더링 후, API 응답 직전)

//  }
// }