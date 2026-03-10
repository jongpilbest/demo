package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Q_A {

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

    // Member 앤티티랑 연결하기 .
    // Member 는 하나 게시물은 여러개임
    // 게시물 조회시 같이 맴버도 조회되면 성능이 나빠지기 때문에 그것을 막기 위해 LAzy 사용
    @ManyToOne(fetch = FetchType.LAZY)

    // Q_A 앤티티에 외래키를 삽입 . 해당하는 외래키는  member 와 동일한 경우
    //Joincolumn 은 외래키 컬럼 이름 값
    @JoinColumn(name = "member_id")  // FK 컬럼명
    private Member member;
    // 객체로 연결해서 작동하게 함



}