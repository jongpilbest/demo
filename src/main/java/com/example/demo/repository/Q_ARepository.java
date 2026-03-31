package com.example.demo.repository;

import com.example.demo.entity.Q_A;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Q_ARepository  extends JpaRepository<Q_A, Long> {
    List<Q_A> findByMemberId(Long memberId);
    @Query("select q from Q_A q left join fetch q.member where q.isPrivate = false")
    List<Q_A> findByIsPrivateFalseWithMember();
    List<Q_A> findByAnswerStateFalse();


    @Modifying
    @Transactional
    @Query("UPDATE Q_A q SET q.isAdminRead = true WHERE q.id = :id")
    void updateAdminReadStatus(Long id);

}
