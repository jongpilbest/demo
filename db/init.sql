INSERT INTO role (id, role_name) VALUES (1, 'ADMIN'),(2, 'USER');

INSERT INTO feature (id, code, name) VALUES 
(1, 'BOARD_QNA', 'Q&A 게시판'),
(2, 'ADMIN_DASHBOARD', '관리자페이지');
-- 먼저 role 테이블에 데이터 있는지 확인
INSERT INTO role (id, name) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- BCrypt 해시된 비밀번호로 삽입
INSERT INTO member (company, email, name, password, phone, refresh_token, username, role_id) VALUES
('테스트회사', 'user@test.com', '홍길동', 
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',  -- 1234
 '010-1111-2222', NULL, 'user1', 2),
('관리회사', 'admin@test.com', '관리자', 
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',  -- admin1234
 '010-9999-9999', NULL, 'admin', 1);

INSERT INTO role_permission (id, permission_type, feature_id, role_id) VALUES
(15, 'READ',   2, 1),
(16, 'CREATE', 2, 1),
(17, 'UPDATE', 2, 1),
(18, 'DELETE', 2, 1),
(19, 'READ',   1, 1),
(20, 'CREATE', 1, 1),
(21, 'UPDATE', 1, 1),
(22, 'DELETE', 1, 1),
(23, 'ANSWER', 1, 1),
(24, 'READ',   1, 2),
(25, 'CREATE', 1, 2),
(26, 'UPDATE', 1, 2);

INSERT INTO q_a (id, answer, answer_state, category, company, content, email, is_private, title, member_id) VALUES
                                                                                                                (3,NULL,0,'서비스 문의','테스트회사','문의내용1','user@test.com',0,'현장 안전 모니터링 시스템 도입 및 기능 관련 문의',1),
                                                                                                                (4,NULL,0,'기타 문의','테스트회사','문의내용2','user@test.com',0,'센서 연동 가능 여부 문의',1),
                                                                                                                (5,NULL,0,'기타 문의','테스트회사','문의내용3','user@test.com',0,'위험도 기준 설정 관련 문의',1);