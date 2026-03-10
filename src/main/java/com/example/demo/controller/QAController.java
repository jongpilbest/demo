package com.example.demo.controller;

import com.example.demo.dto.Qa_Admn;
import com.example.demo.entity.Member;
import com.example.demo.entity.Q_A;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.QAService;
import com.example.demo.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginRequest;

import java.net.http.HttpResponse;
import java.util.List;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import org.springframework.http.ResponseEntity;
@RestController

@RequestMapping("/api/form")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true") //

public class QAController {

   private final QAService qaService;
   private final JwtProvider jwtProvider;



    @GetMapping("/All_qa_list")
    public List<Q_A> All_qa_list (){

        List<Q_A> list =  qaService.ALlForm_data();
        if(list.isEmpty()){
            throw new RuntimeException("공개 문의가 없습니다.");
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
   public List<Q_A> myQaList(@CookieValue(value="accessToken", required=false) String token) {
       String memberId = jwtProvider.getUsername(token); // 또는 username 추출 후 조회
       // 여기서 내가 첨부터.. username 으로 토큰값을 만들어서 오류가 나기 시작한거네....
       return qaService.getQA(memberId);
   }

    @PostMapping("/new_form")
    public  ResponseEntity<?> update_form (
            @CookieValue(value="accessToken", required=false) String token,
            @RequestBody Q_A qA) {
        // 이거 폼 형태로 들어오면 ;

        qaService.saveQA(token,qA);

       return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("status", "success"));

    }


}
