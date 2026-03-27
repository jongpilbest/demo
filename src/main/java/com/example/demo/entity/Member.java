package com.example.demo.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// @ToString 제거! - qas 포함시 순환참조 발생
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String username;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String company;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Role role;

    private String refreshToken;

    @JsonIgnore  // 추가 - 순환참조 차단
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Q_A> qas = new ArrayList<>();
}