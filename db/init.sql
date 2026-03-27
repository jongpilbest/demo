-- 1. Role 테이블 (role_name으로 수정)
INSERT INTO role (id, role_name) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER')
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

-- 2. Feature 테이블
INSERT INTO feature (id, code, name) VALUES 
(1, 'BOARD_QNA', 'Q&A 게시판'),
(2, 'ADMIN_DASHBOARD', '관리자페이지');

-- 3. Member 테이블 (password는 BCrypt 암호문)
INSERT INTO member (id, company, email, name, password, phone, refresh_token, username, role_id) VALUES
(1, '테스트회사', 'user@test.com', '홍길동', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '010-1111-2222', NULL, 'user1', 2),
(2, '관리회사', 'admin@test.com', '관리자', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '010-9999-9999', NULL, 'admin', 1);

-- 4. RolePermission 테이블
INSERT INTO role_permission (id, permission_type, feature_id, role_id) VALUES
(15, 'READ', 2, 1), (16, 'CREATE', 2, 1), (17, 'UPDATE', 2, 1), (18, 'DELETE', 2, 1),
(19, 'READ', 1, 1), (20, 'CREATE', 1, 1), (21, 'UPDATE', 1, 1), (22, 'DELETE', 1, 1), (23, 'ANSWER', 1, 1),
(24, 'READ', 1, 2), (25, 'CREATE', 1, 2), (26, 'UPDATE', 1, 2);

