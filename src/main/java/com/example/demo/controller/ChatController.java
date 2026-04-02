package com.example.demo.controller;

import com.example.demo.dto.ChatRequestDto;
import jakarta.annotation.PostConstruct;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import com.example.demo.dto.AccessTokenResponse;
import com.example.demo.dto.UserInformation;
import com.example.demo.entity.Member;
import com.example.demo.entity.Q_A;
import com.example.demo.exception.MemberNotFoundException;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginRequest;

import java.util.HashMap;
import java.util.List;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Flux;
import org.springframework.ai.chat.client.ChatClient;
@Slf4j
@RestController
@RequestMapping("/api/chat")
public class ChatController {



  


    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @PostMapping(value = "/chatting2", produces = "text/plain;charset=UTF-8")
    public ResponseBodyEmitter streamChat(@RequestBody  ChatRequestDto  request,HttpServletResponse response) {
        // Nginx나 Proxy 뒤에 있다면 버퍼링을 꺼야 실시간으로 보입니다.
        response.setHeader("X-Accel-Buffering", "no");
        response.setHeader("Cache-Control", "no-cache");
        // 1. 타임아웃을 넉넉하게 잡고 SseEmitter 생성 (예: 1분)
        ResponseBodyEmitter emitter = new ResponseBodyEmitter(60000L);

        // 프론트에서 보낸 마지막 메시지 확인 (테스트용)
        String userText = "";
        if (request.getMessages() != null && !request.getMessages().isEmpty()) {
            userText = request.getMessages()
                    .get(request.getMessages().size() - 1)
                    .getContent();
        }

        System.out.println("userText = " + userText);

        // 2. 미리 만들어둔 executor 스레드풀 사용
        executor.execute(() -> {
            try {
                String fakeResponse = "안녕하세요! 드디어 React와 Spring Boot 연결에 성공했습니다! 🎉";

                for (char ch : fakeResponse.toCharArray()) {
                    // 이제 이 순수한 문자열 그대로 프론트엔드에 전달됩니다.
                    String payload = "0:\"" + ch + "\"\n";
                    emitter.send(payload);
                    Thread.sleep(50);
                }

                emitter.complete();
            } catch (Exception e) {
                log.info("스트리밍 종료 또는 클라이언트 연결 끊김: {}", e.getMessage());
                emitter.completeWithError(e);
            }
        });

        return emitter;
    }


    @PostMapping(value = "/chatting", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamChat(@RequestBody ChatRequestDto request) {
        // 1. Spring AI의 ChatClient를 호출 (스트리밍 모드)
        // 2. 알아서 '0:"안"', '0:"녕"' 같은 규격을 맞춰서 내보내줍니다.
        String userText = request.getMessages().get(request.getMessages().size() - 1).getContent();
        log.info("사용자 응답 제대로 가는지 확인: {}", userText);


        return chatClient.prompt()
                .system("너는 아신씨엔티의 스마트 계측 AI 어시스턴트야. 항상 존댓말로 친절하고 전문적으로 답변해줘. 실험용이니 간단하게 요약해서 답변해")
                .user(userText)
                .stream()
                .content() // Flux<String> 형태로 글자가 올 때마다 즉시 반환
                .map(chunk -> "0:" + JSONObject.quote(chunk) + "\n");
    }
}
