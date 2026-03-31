package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Q_A extends BaseTimeEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String category;

    private boolean isPrivate;

    private String answer;

    private Boolean answerState;

    private String company;
    private String email;

    @Builder.Default
    private boolean isAdminRead = false;


    @JsonIgnore  // 추가 - 순환참조 차단
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id",nullable=true)
    private Member member;



}