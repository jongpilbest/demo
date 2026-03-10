package com.example.demo.repository;

import com.example.demo.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest

class MemberRepositoryTest {

    @Autowired
    MemberRepository repo;

    @Test
    void testFindAll() {

        Member member = repo.findById(1L)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다"));

       System.out.println(member);

    }

}