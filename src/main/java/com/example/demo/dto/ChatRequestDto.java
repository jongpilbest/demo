package com.example.demo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class ChatRequestDto {

    private String id;
    private String trigger;
    private List<Message> messages;

    @Data
    public static class Message {
        private String role;
        // 1. 프론트엔드 로그에서 보듯, 데이터는 그냥 'content'라는 문자열로 옵니다.
        private String content;

        // 2. 만약 컨트롤러에서 getContent()를 호출한다면 이 필드를 그대로 반환하게 됩니다.
        public String getContent() {
            return this.content;
        }
    }
}
