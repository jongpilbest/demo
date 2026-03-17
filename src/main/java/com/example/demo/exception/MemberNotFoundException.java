package com.example.demo.exception;

public class MemberNotFoundException extends RuntimeException {

    // 1. 메시지 없이 던질 때를 위한 기본 생성자
    public MemberNotFoundException() {
        super("해당 회원을 찾을 수 없습니다."); // 기본 메시지 설정
    }

    // 2. 메시지를 직접 넣어서 던질 때를 위한 생성자
    public MemberNotFoundException(String message) {
        super(message);
    }


}