package com.example.demo.service;

public enum ErrorCode {
    // 1. 여기서 상수들이 생성자를 호출하며 "나 이런 데이터 들고 있을게!"라고 선언함
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    INVALID_INPUT(400, "잘못된 입력입니다.");

    private final int status;
    private final String message;

    // 2. 바로 이 생성자가 위 상수를 만들 때 값을 받아서 저장함!
    // (앞에 private이 생략된 것과 같음)
    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

    // 3. 밖에서 데이터를 꺼내 쓸 수 있게 getter 메서드도 가짐
    public int getStatus() { return status; }
    public String getMessage() { return message; }
}