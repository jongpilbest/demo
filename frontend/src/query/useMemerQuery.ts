import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLogin, fetchLogout, fetchAuthCheck, fetchRefreshToken, fetchAuthEdit  } from "@/api/memeber_api";
import { setAccessToken } from "../api/client";
import { useAlert } from "@/UseHook/useAlert";

// 인증 관리키 
export const AUTH_KEYS = ["user"] as const;


/**
 *    로그인 Hook  --> jwt 토큰 받아서 메모리에 저장하는 역활. 
 */


// 토큰 새로 발급받는거
export function useLoginMutation() {


  return useMutation({
    mutationFn: fetchLogin,
    onSuccess: (data) => {
      // 1. 메모리에 AccessToken 저장
      setAccessToken(data.accessToken);
      
      // 2. 유저 정보를 AuthContext 으로 상태 관리하지 않고, 캐시로 저장할수도 있다.
      // queryClient.setQueryData(AUTH_KEYS, data);
      
      // 3. 관련 쿼리 무효화 (필요시)
      // queryClient.invalidateQueries({ queryKey: AUTH_KEYS.user });
    },
    onError: (error: any) => {
      console.error("토큰 refresh 실패:", error.response?.data?.message);
    }
  });
}

/**
 *   로그아웃 Hook
 */
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      // 1. 메모리 토큰 초기화
      setAccessToken(null);
      
      //2. 만약 캐시로 유저 정보를 저장했다면. 유저 정보를 갖고 있는 캐시를 없앨수 있다. 
      //queryClient.setQueryData(AUTH_KEYS, null);
      queryClient.clear(); 
    },
  });
}

/**
 * 현재 유저 상태 조회 Hook (CheckAuth) --> 사용자 정보 제공해주는거 
 */
export function useUserQuery() {

  return useQuery({
    queryKey: AUTH_KEYS,
    queryFn: fetchAuthCheck,
    enabled: false, // 자동 실행 방지 (checkAuth에서 수동으로 실행하기 위함)
    retry: false,   // 인증 실패 시 계속 재시도하지 않음
  });
}

/** 
    *   토큰 리프레시 Hook
 */

export function useRefreshTokenMutation() {
  return useMutation({
    mutationFn: fetchRefreshToken,
    onSuccess: (data) => {
      // 새로 발급받은 accesToken 을 메모리에 저장합니다. 
      // 
     
      setAccessToken(data.accessToken);
      console.log("Token Refreshed Successfully");
    },
    onError: (error) => {
      console.error("Refresh Token Expired or Invalid", error);
      // 1. 저장된 토큰 제거
      setAccessToken(null);

    }
  });
}


/**
 * 
 * 유저 정보를 수정하는 함수 
 */
export function useEditUserMutation() {

  const qc = useQueryClient();
  return useMutation({
    mutationFn: fetchAuthEdit,
    onSuccess: () => {  

    qc.refetchQueries({ queryKey: AUTH_KEYS });

    
     }})
  }