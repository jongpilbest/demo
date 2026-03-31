package com.example.demo.entity;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder





public class DeleteHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 탈퇴 처리 대상 회원 id
    private Long memberId;

    // 당시 식별용으로만 남길 값
    private String usernameSnapshot;

    // 어떤 항목을 파기했는지
    @Column(columnDefinition = "TEXT")
    private String deletedFields;

    // 처리자 (예: SYSTEM, ADMIN, 본인탈퇴)
    private String processedBy;

    // 처리 시각
    private LocalDateTime processedAt;
}
