package com.example.demo.service;

import com.example.demo.dto.QAResponse;
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
import java.util.Collections;
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
    public Q_A saveQA(String username, Q_A qa) {



        if ("익명".equals(username) || username == null) {
            log.info("익명 사용자로 게시글을 저장합니다.");
            qa.setMember(null); // 멤버 연결 없이 저장
        } else {
            Member member = memberRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("해당 회원이 없습니다: " + username));
            qa.setMember(member);
            log.info("회원 ID {} 와 연결하여 저장합니다.", member.getId());
        }

        return Qarepository.save(qa);
    }
    //3. 모든 폼을 제공해줘

    public  List<QAResponse> ALlForm_data(){
        List<Q_A> list=Qarepository.findByIsPrivateFalseWithMember();
        // 1. 리스트가 비어있으면 바로 빈 리스트 반환 (방어 코드)
        if (list == null || list.isEmpty()) {
            return Collections.emptyList();



        }

        log.info("current list = {}", list);


         return list.stream().map(qa -> new QAResponse(
                qa.getId(),
                qa.getTitle(),
                qa.getContent(),
                qa.getCategory(),
                qa.isPrivate(),
                qa.getAnswer(),
                qa.getAnswerState(),
                qa.getCreatedDate(), // 생성자 순서에 맞춤
                qa.getMember() != null ? qa.getMember().getName() : "익명",
                qa.getMember() != null ? qa.getMember().getId() : null
        )).toList();


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



    @Transactional
    public void markAsReadByAdmin(Long id) {
        // 해당 ID의 글이 있는지 먼저 확인 (안전장치)
        if (Qarepository.existsById(id)) {
            Qarepository.updateAdminReadStatus(id);
        } else {
            throw new RuntimeException("해당 게시글이 존재하지 않습니다. ID: " + id);
        }
    }

}
