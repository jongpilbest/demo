import axios from "axios";

// 환경 변수(VITE_API_BASE_URL)를 사용하거나, 직접 IP를 적어줍니다.
export const api = axios.create({
  baseURL: "http://localhost:8085", 
  withCredentials: true,
});