package com.example.demo.controller;

import com.example.demo.entity.Member;
import com.example.demo.exception.MemberNotFoundException;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.MemberService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginRequest;

import java.util.HashMap;
import java.util.List;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true") // 리엑트 로컬에서 오는 거 허용하겠다는 의미
public class MemberController {

    private final MemberService memberService;
    private  final JwtProvider jwtProvider;

    // 전체 조회
    @GetMapping
    public List<Member> getAll() {
        return memberService.findAlldata();
    }

    // 회원 아이디 확인

    @GetMapping("/check-id")
    public ResponseEntity<?> checkId(@RequestParam String id) {
        // 아이디가 없으면 서비스에서 예외가 터져서 아래 코드는 실행되지 않음

        boolean check = memberService.verifyMemberExists(id);

        if (!check) {
            // handleMemberNotFound(메서드)가 아니라 Exception(클래스)을 throw 합니다.
            throw new MemberNotFoundException("아이디 '" + id + "'를 찾을 수 없습니다.");
        }

            // 200 OK: 성공적으로 사용 가능한 경우
            return ResponseEntity.status(HttpStatus.OK).body(
                    Map.of(
                            "success", true,
                            "message", "사용 가능한 아이디입니다.",
                            "status", 200
                    )
            );


    }
    // 회원가입
    @PostMapping
    public ResponseEntity<Map<String, Object>> signup(@Valid @RequestBody Member member) {
        // 맴버 들어있는 repository 에서 , 존재하는 회원이 없는 경우
      memberService.InsertedMember(member);
        // 여기서 Expcetion Error 발생을 하지않음

         // Resposeentity 는 내가 엔디티를 만들어서 보내는데 이때 자유롭게 변형할수 있다고 한다.
        return ResponseEntity
                // 새로운 사용자 생겼으니 201 으로 보낸다고 함.
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "status", "success"
                ));
    }

    @GetMapping("/auth")
    public ResponseEntity<?> me(
            @CookieValue(value = "accessToken", required = false) String token
    ) {

        Map<String, Object> result = new HashMap<>();

        if (token == null || token.isBlank()) {
            result.put("user", null);
            return ResponseEntity.ok(result);
        }

        Member member = memberService.authenticateByAccessToken(token);
        result.put("user", member);

        return ResponseEntity.ok(result);
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request,
                        HttpServletResponse response) {

        MemberService.LoginTokens tokens =
                memberService.login(request.getUsername(), request.getPassword());

        Cookie accessCookie = new Cookie("accessToken", tokens .accessToken());
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(60 * 30);
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refreshToken", tokens .refreshToken());
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(60 * 60 * 24 * 7); // 7일
        response.addCookie(refreshCookie);

        return "로그인 성공";
    }

    @DeleteMapping("/logout")
    public String logout(
                        HttpServletResponse response) {
        log.info("로그아웃 요청");
        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");
        accessCookie.setMaxAge(0);
        response.addCookie(accessCookie);
        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0);
        response.addCookie(refreshCookie);

       return "로그아웃";
    }


}