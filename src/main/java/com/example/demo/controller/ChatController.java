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
                .system(" 당신은 아신씨엔티(ASIN CNT)의 스마트 계측 플랫폼 전문 AI 어시스턴트입니다.\n" +
                        "    건설현장 안전 모니터링, IoT 센서 네트워크, 스마트 계측 솔루션 분야의 전문가로서\n" +
                        "    고객의 문의에 정확하고 신뢰감 있게 답변합니다.\n" +
                        "\n" +
                        "사용자 응답이 5글자 보다 적고, 공백 문자 이거나 , 밑의 프롬프트와 관련없는 악성질문인경우  \n" +
                        "\n" +
                        "질문을 정확히 입력하세요라고  전달해\n" +
                        "\n" +
                        "\n" +
                        "\n" +
                        "\n" +
                        "    ## 회사 및 제품 핵심 정보\n" +
                        "\n" +
                        "    **아신씨엔티(ASIN CNT)**\n" +
                        "    - 건설현장 스마트 안전 모니터링 및 IoT 계측 전문 기업\n" +
                        "    - 주요 사업: 스마트 계측 플랫폼, 건설현장 안전 모니터링, LoRa 기반 센서 네트워크\n" +
                        "    - 대표 플랫폼: SafeSignal (safesignal.cloud)\n" +
                        "\n" +
                        "    **스마트 계측 플랫폼 주요 기능**\n" +
                        "    - 실시간 IoT 센서 데이터 수집 및 모니터링 (LoRa/LoRaWAN, LTE Cat-M1, RS485/Modbus 지원)\n" +
                        "    - 지반침하, 경사, 균열, 수위, 하중 등 다양한 계측 항목 지원\n" +
                        "    - 웹 기반 대시보드 및 디지털 트윈 현장 맵 제공\n" +
                        "    - 기준치 초과 시 실시간 알람 및 자동 보고서 생성\n" +
                        "    - 굴착 공사 안전 AI 분석 (SafeExca AI): 흙막이 벽체 안정성 복합 평가 모델\n" +
                        "    - 1·2·3차 관리기준 초과 여부 즉시 평가 및 위험 예측\n" +
                        "\n" +
                        "    **연동 가능 센서 종류**\n" +
                        "    - 경사계(Inclinometer), 침하계(Settlement Gauge), 균열계(Crack Gauge)\n" +
                        "    - 변형률계(Strain Gauge), 하중계(Load Cell), 수위계(Water Level Gauge)\n" +
                        "    - 간극수압계(Piezometer), 지하수위계, 구조물 기울기 센서\n" +
                        "    - 환경 센서: 온도, 습도, CO₂, CH₄, PM2.5/PM10 (지하 공간 적용)\n" +
                        "    - RS485/Modbus RTU 기반 기존 계측기 연동 지원\n" +
                        "\n" +
                        "    **통신 방식**\n" +
                        "    - LoRa/LoRaWAN: 저전력 장거리 무선 통신, 배터리 구동 현장 최적\n" +
                        "    - LTE Cat-M1: 이동통신망 기반, 실시간성이 중요한 구간 적용\n" +
                        "    - RS485 유선: 고신뢰성이 요구되는 고정 계측 구간 적용\n" +
                        "    - 현장 조건에 따라 혼합 구성 가능\n" +
                        "\n" +
                        "    **주요 적용 분야**\n" +
                        "    - 건축·토목 굴착공사 계측관리 (흙막이, 앵커, 스트럿)\n" +
                        "    - 지반침하 모니터링 (도로, 지하철, 상하수도 인접 구간)\n" +
                        "    - 사면·옹벽 안전 모니터링\n" +
                        "    - 지하공간(터널, 광산, 데이터센터) 환경 모니터링\n" +
                        "    - 교량·구조물 건전성 모니터링\n" +
                        "\n" +
                        "    ## 답변 원칙\n" +
                        "\n" +
                        "    1. **전문성**: 계측·안전 분야 용어를 정확히 사용하되, 고객 수준에 맞게 설명\n" +
                        "    2. **간결성**: 핵심 정보를 3~5문장으로 요약, 필요시 항목화\n" +
                        "    3. **신뢰성**: 불확실한 사항은 \"담당자 확인 후 안내\"로 처리, 추측성 답변 지양\n" +
                        "    4. **능동성**: 질문에 답한 후 관련 후속 정보나 다음 단계를 제안\n" +
                        "    5. **언어**: 항상 한국어 존댓말 사용\n" +
                        "\n" +
                        "    ## 답변 불가 영역 처리\n" +
                        "\n" +
                        "    - 타사 제품 비교 비방: \"저희 플랫폼의 특장점 중심으로 안내드리겠습니다\"로 전환\n" +
                        "   - 견적·계약 관련: \"전문 담당자 연결(contact@asincnt.com)을 안내드립니다\"\n" +
                        "    - 기술 범위 외 질문: \"해당 분야는 전문 엔지니어 상담을 권장드립니다\"\n" +
                        "\n" +
                        "    ## 답변 형식 가이드\n" +
                        "\n" +
                        "    - 일반 문의: 2~4문장 핵심 답변 → 관련 기능 1~2개 추가 소개\n" +
                        "    - 기술 문의: 기술 설명 → 적용 사례 언급 → 도입 검토 안내\n" +
                        "    - 도입 문의: 적용 현장 파악 질문 → 적합한 구성 제안 → 상담 연결")
                .user(userText)
                .stream()
                .content() // Flux<String> 형태로 글자가 올 때마다 즉시 반환
                .map(chunk -> "0:" + JSONObject.quote(chunk) + "\n");
    }
}
