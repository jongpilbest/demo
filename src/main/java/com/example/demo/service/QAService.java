package com.example.demo.service;

import com.example.demo.entity.Member;
import com.example.demo.entity.Q_A;
import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.exception.MemberNotFoundException;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.Q_ARepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class QAService {
    private final Q_ARepository Qarepository;
    private  final MemberRepository memberRepository;
    private final MemberService memberService;

    // 1. 해당 아이디를 가진 폼만 제공해줘
    public List<Q_A> getQA(String username) {
        Member member= memberRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("해당 게시글이 없습니다."));
        Long memberId = member.getId();
        return Qarepository.findByMemberId(memberId);
    }

    // 2. 폼을 저장해줘
    public Q_A saveQA(String token, Q_A qa) {

        Member member = null;
        //여기부분에 로그 로 확인하는법
        log.info("saveQA token = {}", token);
        if (token != null && !token.isBlank()) {
            member = memberService.authenticateByAccessToken(token);
        }
        qa.setMember(member);
        return Qarepository.save(qa);
    }

    //3. 모든 폼을 제공해줘

    public  List<Q_A> ALlForm_data(){
        return Qarepository.findByIsPrivateFalse();
    }

    public boolean adminUpdate (Long id, String content){
        try {
            // 1. id와 일치하는 데이터를 찾습니다.
            Q_A qa = Qarepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("해당 ID의 게시글이 없습니다. id: " + id));
            log.info("current Qa = {}", qa);
            // 2. 답변(answer)을 설정하고 상태(answerState)를 변경합니다.
            // 엔티티의 필드명에 맞춰서 set 메서드를 호출하세요.
            qa.setAnswer(content);
            qa.setAnswerState(true); // 보통 boolean이면 true, int라면 1
            Qarepository.save(qa);

            // 3. @Transactional이 붙어있으면 save()를 명시적으로 호출하지 않아도
            // 메서드 종료 시점에 자동으로 DB에 반영됩니다.
            return true;
        } catch (Exception e) {
            log.error("관리자 답변 업데이트 중 에러 발생: {}", e.getMessage());
            return false;
        }
    }

    // 해당 게시물 삭제해줘
    public boolean DeleteForm (Long id) {

        try {
            Qarepository.deleteById(id);
            return true;

        } catch (Exception e) {
            return false;
        }
    }


    // admin 사용자가 answer_state 가 false 인거만 제공헤줘


    public List<Q_A> Send_is_Not_answer_state(){
        List<Q_A> qaList = Qarepository.findByAnswerStateFalse();
        return qaList;
    }

}
