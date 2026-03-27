package com.example.demo.controller;

import com.example.demo.dto.Qa_Admn;
import com.example.demo.entity.Member;
import com.example.demo.entity.Q_A;
import com.example.demo.exception.MemberNotFoundException;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.QAService;
import com.example.demo.jwt.JwtProvider;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginRequest;

import java.net.http.HttpResponse;
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



    @GetMapping("/All_qa_list")
    public List<Q_A> All_qa_list (){

        List<Q_A> list =  qaService.ALlForm_data();
        if(list.isEmpty()){
            throw new MemberNotFoundException("공개 문의가 없습니다.");
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
    public  ResponseEntity<?> update_form (
            HttpServletRequest request,
            @RequestBody Q_A qA) {
        String token = null;
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        if (token == null || !jwtProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid token"));
        }

        String username = jwtProvider.getUsername(token);
        // 이거 폼 형태로 들어오면 ;

        qaService.saveQA(username,qA);

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




}

