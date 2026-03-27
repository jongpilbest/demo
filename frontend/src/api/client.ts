import axios from "axios";

// 환경 변수(VITE_API_BASE_URL)를 사용하거나, 직접 IP를 적어줍니다.
export const api = axios.create({
 baseURL: "",
  withCredentials: true,
});




let accessToken: string | null = null;

// 토큰 setter/getter
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// api/client.ts
api.interceptors.request.use((config) => {
  const token = getAccessToken(); // 최신값을 가져오기 
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh 시도
        const { data } = await axios.post(
          "http://backend:8085/api/members/refresh",
          {},
          { withCredentials: true }
        );

        setAccessToken(data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);

      } catch {
        // refresh 실패 (비로그인 or refreshToken 만료)
        setAccessToken(null);
        return Promise.reject(error); // ← 그냥 에러 흘려보내기
      }
    }

    return Promise.reject(error);
  }
);