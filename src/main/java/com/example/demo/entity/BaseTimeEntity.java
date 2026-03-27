package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass // 이 클래스를 상속받는 엔티티들이 아래 필드들을 컬럼으로 인식하게 함
@EntityListeners(AuditingEntityListener.class) // JPA Auditing 기능 포함
public abstract class BaseTimeEntity {

    @CreatedDate // 생성 시 자동 등록
    @Column(updatable = false) // 수정 시에는 건드리지 않음
    private LocalDateTime createdDate;

    @LastModifiedDate // 수정 시 자동 등록
    private LocalDateTime modifiedDate;
}