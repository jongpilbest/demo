package com.example.demo.controller;

import com.example.demo.dto.MemberPermissionResponse;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginRequest;

import java.util.HashMap;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import org.springframework.http.ResponseEntity;
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserPermission {

    // jwt 권환으로 사용자가 ADMIN 인지 아니면 그냥 USER 인지 확인해야됨
    private final MemberRepository memberRepository;
    private final PermissionService permissionService;
    private final JwtProvider jwtProvider;


    @GetMapping("/permission")
    public ResponseEntity<?> getUserPermissionList(
            @AuthenticationPrincipal String username,
            HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();



        // 3. 서비스에서 권한 지도 가져오기
        MemberPermissionResponse permissions = permissionService.FindMemberPermission(username);
        return ResponseEntity.ok(permissions);
    }





    }
