package com.example.demo.dto;

import com.example.demo.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder // ◀ 빌더 사용 선언
@AllArgsConstructor
@NoArgsConstructor
public class UserInformation {
    private Long id;
    private String username;
    private String name;
    private String role; // ◀ 객체가 아니라 문자열(String)로 선언!

    // Member 엔티티를 받아서 DTO로 변환하는 static 메서드를 만들면 편해요
    public static UserInformation from(Member member) {
        return UserInformation.builder()
                .id(member.getId())
                .username(member.getUsername())
                .name(member.getName())
                .role(member.getRole().getRoleName()) // ◀ 여기서 문자열만 쏙 뽑기!
                .build();
    }
}