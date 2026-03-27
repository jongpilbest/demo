package com.example.demo;

import com.example.demo.Filter.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt 알고리즘을 사용하며, 강도(Strength)를 12로 설정합니다.
        // 이것이 체크리스트 3.2 항목의 "bcrypt (salt rounds 12 이상)" 요구사항을 충족합니다.
        return new BCryptPasswordEncoder(12);
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {  // ← 여기 추가
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of(
                            "http://localhost:5173",
                            "https://safesignal.cloud",
                            "https://www.safesignal.cloud"
                    ));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. 회원 관련 API (로그인, 회원가입, 중복체크, 인증확인 등)를 모두 허용

                        // permitAll : 토쿤 없이도 접근 가능하게 할 API

                        .requestMatchers("/api/members/login", "/api/members/signup", "/api/members/check-id",  "/api/members/refresh").permitAll()
                        .requestMatchers("/api/form/All_qa_list").permitAll()
                        .requestMatchers("/error").permitAll()
                        // 관리자 전용
                        .requestMatchers("/api/form/answer", "/api/form/IsnotAnswerstate").hasRole("ADMIN")


                        // 3. 관리자 전용
                        //.requestMatchers("/admin/**").hasRole("ADMIN")

                       // .requestMatchers("api/user/**").hasRole("USER")

                        // 4. 나머지는 인증 필요
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }





}