package com.example.demo.service;


// 에러 코드임을 spring 에게 알려주기 위해서 excepiton 형태를 하나 만듬
public class CustomException extends RuntimeException {
    private final ErrorCode errorCode;

   // 잴 부모에게.메세지를 건내주자.
    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage()); // 부모인 RuntimeException에게 메시지 전달
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}