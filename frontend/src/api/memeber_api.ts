import { api } from "../api/client";
import axios from "axios";

// 🔹 공통 타입 정의 (별도 types 파일로 빼는 것을 추천)
export interface UserResponse {
  id: number;
  name: string;
  role: string;
  company: string;
  email: string;
  authorities: string[];
  accessToken: string;
}

/**
 * 로그인 API
 */
export const fetchLogin = async (loginData: { username: string; password: any }): Promise<UserResponse> => {
  const { data } = await api.post("/api/members/login", loginData);
  return data;
};

/**
 * 로그아웃 API
 */
export const fetchLogout = async (): Promise<void> => {
  await api.delete("/api/members/logout", { withCredentials: true });
};

/**
 * 토큰 재발급 API (Refresh Token 활용)
 * axios 기본 인스턴스를 사용하여 interceptor 무한 루프를 방지합니다.
 */
export const fetchRefreshToken = async (): Promise<void> => {
  const { data } = await axios.post(
    "/api/members/refresh",
    {},
    { withCredentials: true }
  );
  return data;
};

/**
 * 현재 로그인 유저 정보 확인
 */
export const fetchAuthCheck = async (): Promise<{ user: UserResponse }> => {
  const { data } = await api.get("/api/auth");
  return data;
};



/**
 * 
 * 유저 정보 수정하는 함수
 * 
 */

export const fetchAuthEdit = async (editData: { name: string; email: string }): Promise<UserResponse> => {
  const { data } = await api.patch("/api/members/edit", editData);
  return data;
}


export const checkPasswordApi = async (password: string): Promise<any> => {
  try {
    const { data } = await api.post("/api/members/check-password", { password });  
    return data.status;
  } catch (error) {

    throw error.response?.data?.message || error.message; // 에러 메시지 반환
    ;
  }
};
        

// 사용자 탈퇴하는 api 로직
export const deleteUserApi = async (): Promise<boolean> => {
  try {
    const { data } = await api.delete("/api/members/delete");  
    return data.success;
  } catch (error) {
    console.error("비밀번호 확인 중 오류 발생:", error);
     return false;
     
  }
}   

