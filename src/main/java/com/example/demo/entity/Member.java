package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(groups = {})
    private String username;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String company;


    // 한 맴버가 가진 Role 으로 인해, --> Role 테이블
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn
    private Role role;



    private String refreshToken;
}
