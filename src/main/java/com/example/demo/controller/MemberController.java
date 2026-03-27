package com.example.demo.controller;

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
@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor

public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    private  final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
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
            throw new MemberNotFoundException("존재하는 아이디 입니다.");
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
    @PostMapping("/signup")
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
            HttpServletRequest request
    ) {

        Map<String, Object> result = new HashMap<>();

        String token = null;
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        if (token == null || !jwtProvider.validateToken(token)) {
            result.put("user", null);
            return ResponseEntity.ok(result);
        }

        String username = jwtProvider.getUsername(token);

        // 처음에 접근할때 이거인가..?...
        Member member = memberRepository.findByUsername(username).orElseThrow(() -> new UnauthorizedException("User not found"));
      /// 여기서 MEMBER 의 ROLE 부분이 ENTITY 결러서 객체로 나옴... 여기를 처리할수 있을까..?....

        UserInformation information = UserInformation.builder()
                .id(member.getId())
                .username(member.getUsername())
                .name(member.getName())
                .role(member.getRole().getRoleName()) // 👈 객체가 아닌 String(roleName)만 쏙!
                .company(member.getCompany())
                .email(member.getEmail())
                .phone(member.getPhone())
                .build();


        return ResponseEntity.ok(information);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request,
                        HttpServletResponse response) {



        MemberService.LoginTokens tokens =
                memberService.login(request.getUsername(), request.getPassword());

        Cookie refreshCookie = new Cookie("refreshToken", tokens .refreshToken());
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(60 * 60 * 24 * 7); // 7일
        response.addCookie(refreshCookie);

        return ResponseEntity.ok(new AccessTokenResponse(tokens.accessToken()));
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


    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
            @CookieValue(value = "refreshToken", required = false) String refreshToken) {

        // Http 으로 처리하기 때문에 Barer 을  붙이지 않음.


        // 1. refreshToken 없거나 유효하지 않으면 401
        if (refreshToken == null || !jwtProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("refreshToken 만료");
        }

        // 2. refreshToken에서 username 꺼내기
        String username = jwtProvider.getUsername(refreshToken);

        // 3. 새 accessToken 발급
        String newAccessToken = jwtProvider.createAccessToken(username);

        // 4. 반환
        return ResponseEntity.ok(new AccessTokenResponse(newAccessToken));
    }




    @PatchMapping("/edit")
    public ResponseEntity<?> EditUserAuth(
            @RequestBody Map<String, Object> updateData,
            @AuthenticationPrincipal String username
    ) {

        memberService.updateMember(username,updateData);
        // 여기서 Expcetion Error 발생을 하지않음
        // Resposeentity 는 내가 엔디티를 만들어서 보내는데 이때 자유롭게 변형할수 있다고 한다.
        return ResponseEntity
                // 새로운 사용자 생겼으니 201 으로 보낸다고 함.
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "status", "success"
                ));
    }


    @PostMapping("/check-password") // 보안을 위해 Post 추천!
    public ResponseEntity<?> checkPassword(
            @AuthenticationPrincipal String username, // 현재 로그인한 유저 정보
            @RequestBody Map<String, String> request  // {"password": "입력한비밀번호"}
    ) {

        String inputPassword = request.get("password");

        // 서비스에서 비밀번호 일치 여부 확인 (BCrypt 등 사용)
            memberService.verifyPassword(username, inputPassword);


            return ResponseEntity
                // 새로운 사용자 생겼으니 201 으로 보낸다고 함.
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "status", "success"
                ));

    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMember(@AuthenticationPrincipal String username, HttpServletResponse response) {
        log.info("회원 탈퇴 요청: {}", username);

        // 1. 서비스에서 회원 삭제 로직 실행
        memberService.deleteMember(username);

        // 2. 쿠키 삭제 (로그아웃 처리와 동일)
        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(0);
        response.addCookie(refreshCookie);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "회원 탈퇴가 완료되었습니다."
        ));
    }

}