package com.example.demo.controller;

import com.example.demo.entity.Member;
import com.example.demo.entity.Q_A;
import com.example.demo.entity.RolePermission;
import com.example.demo.enums.PermissionType;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.PermissionService;
import com.example.demo.service.QAService;
import com.example.demo.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginRequest;

import java.util.HashMap;
import java.util.List;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import org.springframework.http.ResponseEntity;
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserPermission {

    // jwt 권환으로 사용자가 ADMIN 인지 아니면 그냥 USER 인지 확인해야됨
    private final JwtProvider jwtProvider;
    private final PermissionService permissionService;


    @GetMapping("/permission")
    public ResponseEntity  getUserPermissionList(
            @CookieValue(value = "accessToken", required = false) String token)
    {
        Map<String, Object> response = new HashMap<>();

        log.info("토큰 지금 뭔데? {}", token);

        // 1. 토큰이 아예 없는 경우 (로그인 안 됨)
        if (token == null || token.isBlank()) {
            response.put("username", null);
            response.put("permissions", Map.of()); // 빈 맵을 줘서 프론트에서 에러 안 나게 함
            log.error("에러 로그: 큰일 남!");
            return ResponseEntity.ok(response);
        }

        try {
            // 2. 토큰에서 유저 정보 추출
            String username = jwtProvider.getUsername(token);
            //response.put("role", username);

            // 3. 서비스에서 권한 지도 가져오기
            Map<String, List<PermissionType>> permissions = permissionService.FindMemberPermission(username);
            response.put("permissions", permissions);

        } catch (Exception e) {
            // 토큰이 만료되었거나 변조된 경우 처리
            // 이거 토큰 만료되서 중간에 refresh token 하라는거 같은데
            log.error("permission API error", e);

            response.put("username", null);
            response.put("permissions", Map.of());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.ok(response);
    }





    }
