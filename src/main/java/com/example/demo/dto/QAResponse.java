package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class QAResponse {
    private Long id;
    private String title;
    private String content;
    private String category;
    private boolean isPrivate;
    private String answer;
    private Boolean answerState;
    private LocalDateTime createdDate;
    private String username;
    private Long userId;

    public QAResponse(Long id, String title, String content, String category, boolean aPrivate, String answer, Boolean answerState, String createDate, LocalDateTime createdDate) {

    }
}
