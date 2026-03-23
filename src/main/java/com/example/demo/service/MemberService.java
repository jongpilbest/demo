package com.example.demo.service;

import com.example.demo.entity.Member;

import com.example.demo.exception.MemberNotFoundException;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.entity.Member;
import com.example.demo.jwt.JwtProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {


    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    public List<Member> findAlldata(){
        return memberRepository.findAll();
    }


    public Member findMember(String username){
      return  memberRepository.findByUsername(username)
              .orElseThrow(() -> new RuntimeException("해당 회원 없음"));
    }

    /*아아디 중복 체크하는거 */
    public boolean verifyMemberExists(String username) {
         
        // 여기 아이디 있는 경우 . --> fasle 으로 내보내기 
        if (memberRepository.existsByUsername(username)) {
            log.info("중복 확인 요청된 username: [{}]", username);
            return false;

        }

        // 아이디가 없는 경우 
        return true;
    }


    /*회원가입*/
    public void  InsertedMember(Member member){
       // 같은아이디 있나 확인하고 있으면 state:false
        // 같은아이디 없으면 저장 하고 state: true 이렇게 해도되나?
         memberRepository.save(member);


    }


    /*Delete */
    public void DeletedById(Long key_id){
        memberRepository.deleteById(key_id);
    }

    public Member authenticateByAccessToken(String token){
        if (token == null || token.isBlank()) {
            throw new UnauthorizedException("No token");
        }

        if (!jwtProvider.validateToken(token)) {
            throw new UnauthorizedException("Invalid token");
        }

        String username = jwtProvider.getUsername(token);
        return memberRepository.findByUsername(username).orElseThrow(() -> new UnauthorizedException("User not found"));


    }

    public  Member login_logic (String name, String password){
        Member member = memberRepository
                .findByUsername(name)
                .orElseThrow(() -> new RuntimeException("아이디가 존재하지 않습니다."));

        if (!member.getPassword().equals(password)) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }

        return member;

    }
    @Transactional
    public LoginTokens login(String username, String password) {
        Member member = login_logic(username, password); // 여기서 검증/조회

        String accessToken = jwtProvider.createAccessToken(member.getUsername());
        String refreshToken = jwtProvider.createRefreshToken(member.getUsername());

        member.setRefreshToken(refreshToken);
        // @Transactional이면 save 생략 가능할 때 많지만, 확실히 하려면 남겨도 됨
        memberRepository.save(member);

        return new LoginTokens(accessToken, refreshToken);
    }
    public record LoginTokens(String accessToken, String refreshToken) {}

    @Transactional
    public void logoutByUsername(String username) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("아이디가 존재하지 않습니다."));

        member.setRefreshToken(null);
        memberRepository.save(member); // @Transactional이면 생략 가능할 때도 있지만, 남겨도 됨
    }




}
