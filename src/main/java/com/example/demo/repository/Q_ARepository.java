package com.example.demo.repository;

import com.example.demo.entity.Q_A;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Q_ARepository  extends JpaRepository<Q_A, Long> {
    List<Q_A> findByMemberId(Long memberId);
    List<Q_A> findByIsPrivateFalse();

}
