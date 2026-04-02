package com.example.demo.controller;

import com.example.demo.dto.QAResponse;
import com.example.demo.dto.Qa_Admn;
import com.example.demo.entity.Member;
import com.example.demo.entity.Q_A;
import com.example.demo.exception.MemberNotFoundException;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.MailService;
import com.example.demo.service.QAService;
import com.example.demo.jwt.JwtProvider;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginRequest;

import java.net.http.HttpResponse;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import org.springframework.http.ResponseEntity;
@RestController
@RequestMapping("/api/form")
@RequiredArgsConstructor
public class QAController {

   private final QAService qaService;
   private final JwtProvider jwtProvider;
    private final MailService mailService;


    @GetMapping("/All_qa_list")
    public List<QAResponse> All_qa_list (){

        List<QAResponse> list =  qaService.ALlForm_data();

        if(list.isEmpty()){
            return Collections.emptyList();
        }

        return list;
    }


    @PostMapping("/answer")
    public ResponseEntity<?> Admin_Update(@RequestBody Qa_Admn qa) {
        // 1. 서비스 단에서 업데이트 수행
        boolean isSuccess = qaService.adminUpdate(qa.getId(), qa.getAnswer());

        // 2. 결과에 따른 분기 처리
        if (isSuccess) {
            return ResponseEntity.ok( // 200 OK
                    Map.of(
                            "success", true,
                            "message", "답변 업데이트가 완료되었습니다."
                    )
            );
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // 500 에러
                    .body(Map.of(
                            "success", false,
                            "message", "업데이트 중 오류가 발생했습니다."
                    ));
        }
    }




   @GetMapping("/qa_list")
   public ResponseEntity<?> myQaList(HttpServletRequest request,
    @AuthenticationPrincipal String username

   ) {

       List<Q_A> qaList = qaService.getQA(username);
       return ResponseEntity.ok(qaList);
   }

    @PostMapping("/new_form")
    public ResponseEntity<?> update_form(HttpServletRequest request, @RequestBody Q_A qA) {
        String header = request.getHeader("Authorization");
        String token = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        // 1. 토큰이 없거나 유효하지 않은 경우 -> 익명 저장
        if (token == null || !jwtProvider.validateToken(token)) {
            qaService.saveQA("익명", qA);
        }
        // 2. 토큰이 있는 경우 -> 회원 저장
        else {
            String username = jwtProvider.getUsername(token);
            qaService.saveQA(username, qA);
        }



       // mailService.sendAutoReply(qA.getEmail());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("status", "success"));
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteForm(@RequestParam("id") Long id ){
        // 여기 아이디 받아서 그 아이디 삭제해
        boolean status= qaService.DeleteForm(id);
        if(!status) {
            throw new MemberNotFoundException("삭제하는데 문제가 발생하였습니다. ");
        }
             return ResponseEntity.ok( // 200 OK
                Map.of(
                        "success", true,
                        "message", "답변 삭제가 완료 됐습니다.."
                )
        );

    }
    @GetMapping("/IsnotAnswerstate")
    public ResponseEntity<?> IsnotAnswerState() {
        // 1. 끝에 세미콜론(;)을 꼭 찍으세요!
        List<Q_A> isnotanswerstate = qaService.Send_is_Not_answer_state();

        // 2. Map.of 대신 담을 바구니를 만듭니다.
        // 만약 isnotanswerstate가 null이면 Map.of에서 에러가 날 수 있으니 주의!
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", isnotanswerstate);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/Admin_check_qa_list")
    public ResponseEntity<?> adminCheckQa(@RequestParam("id") Long id) {
        try {
            qaService.markAsReadByAdmin(id);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", id + "해당 게시글을 관리자가 확인했습니다."
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }



}

