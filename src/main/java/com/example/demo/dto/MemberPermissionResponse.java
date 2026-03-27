package com.example.demo.dto;

import com.example.demo.enums.PermissionType;
import lombok.AllArgsConstructor; // ◀ 추가
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor; // ◀ 추가

import java.util.List;
import java.util.Map;




@Builder
@Getter
@NoArgsConstructor  // ◀ 기본 생성자가 없으면 빌더가 꼬일 때가 있음
@AllArgsConstructor // ◀ 빌더는 모든 필드를 인자로 받는 생성자가 필수임
public class MemberPermissionResponse {
    private String role;
    private Map<String, List<PermissionType>> permissions;
}