package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

// 여기로 다 모여보라는 의미
@RestControllerAdvice
public class GlobalExceptionHandler {
    // 만든 MeMberNotFoundExcpetion 을 저장해줘.
    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleMemberNotFound(MemberNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                Map.of(
                        "success", false,
                        "message", e.getMessage()
                )
        );
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Map<String, Object>> handleCustomnotFound(CustomException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                Map.of(
                        "success", false,
                        "message", e.getMessage()

                )
        );
    }


}