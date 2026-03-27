package com.example.demo.Filter;

import com.example.demo.entity.Member;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import static java.rmi.server.LogStream.log;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider; // 이미 만든 거 주입!
    private final MemberRepository memberRepository;


    private static final List<String> EXCLUDE_URLS = List.of(
            "/api/members/login",
            "/api/members/signup",
            "/api/members/refresh",
            "/api/members/check-id",
            "/api/form/All_qa_list",
            "/api/members/check-id"
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // 현재 요청 경로가 EXCLUDE_URLS에 포함되어 있으면 필터를 실행하지 않음 (true 반환)


        // 토큰 검사를 하지 않아도 되는거
        return EXCLUDE_URLS.stream().anyMatch(url -> request.getServletPath().startsWith(url));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = null;
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        // 1. 토큰이 존재하고 유효한지 먼저 체크
        if (token != null && jwtProvider.validateToken(token)) {
            String username = jwtProvider.getUsername(token);

            // 2. [수정 포인트] orElseThrow로 에러를 던지지 말고 Optional로 처리합니다.
            memberRepository.findByUsername(username).ifPresent(member -> {
                // 유저가 존재할 때만 인증 객체를 생성하고 Context에 등록합니다.
                String roleName = member.getRole().getRoleName();

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + roleName))
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
                log.info("JWT 필터 인증 완료: username=[{}]", username);
            });

            // 만약 위에서 ifPresent에 걸리지 않았다면(유저가 없다면),
            // 아무런 Authentication이 등록되지 않은 상태로 아래 filterChain으로 넘어갑니다.
        }

        // 3. 마지막에 항상 호출되어야 합니다.
        filterChain.doFilter(request, response);
    }
}