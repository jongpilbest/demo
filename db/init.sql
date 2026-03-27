#INSERT INTO role (id, role_name) VALUES (1, 'ADMIN'),(2, 'USER');
#
#INSERT INTO feature (id, code, name) VALUES (1, 'BOARD_QNA', 'Q&A 게시판');
#
#INSERT INTO member (id, company, email, name, password, phone, refresh_token, username, role_id) VALUES
#                                                                                                     (1, '테스트회사', 'user@test.com', '홍길동', '1234', '010-1111-2222', 'eyJhbGciOiJIUzI1NiJ9...', 'user1', 2),
#                                                                                                     (2, '관리회사', 'admin@test.com', '관리자', 'admin1234', '010-9999-9999', 'eyJhbGciOiJIUzI1NiJ9...', 'admin', 1);
#
#INSERT INTO role_permission (id, permission_type, feature_id, role_id) VALUES
                                                                           (1,'ANSWER',1,1),(2,'UPDATE',1,1),(3,'DELETE',1,1),(4,'READ',1,1),(5,'READ',1,2),(6,'CREATE',1,2),(7,'UPDATE',1,2);

INSERT INTO q_a (id, answer, answer_state, category, company, content, email, is_private, title, member_id) VALUES
                                                                                                                (3,NULL,0,'서비스 문의','테스트회사','문의내용1','user@test.com',0,'현장 안전 모니터링 시스템 도입 및 기능 관련 문의',1),
                                                                                                                (4,NULL,0,'기타 문의','테스트회사','문의내용2','user@test.com',0,'센서 연동 가능 여부 문의',1),
                                                                                                                (5,NULL,0,'기타 문의','테스트회사','문의내용3','user@test.com',0,'위험도 기준 설정 관련 문의',1);