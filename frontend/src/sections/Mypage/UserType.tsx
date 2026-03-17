
import { useAuth } from "@/context/AuthContext";


import Admin_Page from "./Admin_Page";
import User_Page from "./User_Page";



export default function MyPageMain() {
  const { user } = useAuth();

  // 1. 안전하게 권한 파악 (user가 없을 때를 대비해 ?. 사용)
  // 만약 user.role 자체가 "ADMIN" 문자열이라면 user.role === 'ADMIN'으로 비교하세요.
  const isAdmin = user?.role?.roleName === 'ADMIN';


  return (
    <>
      {isAdmin ? (
        <Admin_Page user={user} />
      ) : (
        <User_Page user={user} />
      )}
    </>
  );
}