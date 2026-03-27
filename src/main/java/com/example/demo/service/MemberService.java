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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {


    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

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



         // 비밀번호를 암호화 해야됨
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);


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
                .orElseThrow(() -> new MemberNotFoundException("아이디가 존재하지 않습니다."));

        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new MemberNotFoundException("비밀번호가 일치하지 않습니다.");
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
                .orElseThrow(() -> new MemberNotFoundException("아이디가 존재하지 않습니다."));

        member.setRefreshToken(null);
        memberRepository.save(member); // @Transactional이면 생략 가능할 때도 있지만, 남겨도 됨
    }


    /* 사용자 정보 수정하는거 */
    @Transactional // 이게 있어야 DB에 반영됨!
    public void updateMember(String username, Map<String, Object> updateData) {
       Member member= findMember(username) ;

        updateData.forEach((key, value) -> {
            applyUpdate(member, key, value);
        });
    }



    private void applyUpdate(Member member, String key, Object value) {
        if (value == null) return;
        switch (key) {
            case "name": member.setName((String) value); break;
            case "email": member.setEmail((String) value); break;
            case "company": member.setCompany((String) value); break;
            // 비밀번호는 암호화해서 다시 넣게 해줘
            case "password": member.setPassword(passwordEncoder.encode((String)value)); break;
        }
    }

    public void verifyPassword(String username, String password) {
        // 1. 유저 조회 (이미 만들어두신 findMember 활용)
        Member member = findMember(username);

        // 2. 비밀번호 비교 (평문 비밀번호, 암호화된 비밀번호)
        if (!passwordEncoder.matches(password, member.getPassword())) {
            // 일치하지 않으면 예외 발생 (기존에 정의하신 MemberNotFoundException 등을 재활용하거나 새 예외 사용)
            throw new MemberNotFoundException("비밀번호가 일치하지 않습니다.");
        }

        // 일치하면 아무 일 없이 통과 (성공)
    }
    @Transactional
    public void deleteMember(String username) {
        // 1. 사용자 조회 (영속성 컨텍스트에 로드)
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new MemberNotFoundException("사용자를 찾을 수 없습니다."));

        // 2. 삭제 실행
        // 이제 cascade 설정 덕분에 자식인 Q_A들도 트랜잭션 종료 시점에 자동 삭제됩니다.
        memberRepository.delete(member);



    }




}
