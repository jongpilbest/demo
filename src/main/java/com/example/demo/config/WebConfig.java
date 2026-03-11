package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 API 경로에 대해
                .allowedOrigins("http://localhost:5173") // 리액트 주소 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // OPTIONS 포함 필수!
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // 브라우저가 CORS 검사 결과를 1시간 동안 기억하게 함
    }
}