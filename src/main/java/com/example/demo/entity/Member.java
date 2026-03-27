package com.example.demo.entity;
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
@ToString
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(groups = {})
    @Column(unique = true, nullable = false)
    private String username;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String company;


    // 한 맴버가 가진 Role 으로 인해, --> Role 테이블
    @ManyToOne(fetch= FetchType.EAGER )
    @JoinColumn
    private Role role;



    private String refreshToken;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Q_A> qas = new ArrayList<>();

}
