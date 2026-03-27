package com.example.demo.controller;

import com.example.demo.entity.Member;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    @GetMapping
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();

        String token = null;
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        if (token == null || !jwtProvider.validateToken(token)) {
            result.put("user", null);
            return ResponseEntity.ok(result);
        }

        String username = jwtProvider.getUsername(token);
        Member member = memberRepository.findByUsername(username).orElseThrow(() -> new UnauthorizedException("User not found"));


        result.put("user", member);
        return ResponseEntity.ok(result);
    }




}