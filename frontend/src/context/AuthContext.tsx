import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode
} from "react";
import axios from "axios";
import { api,setAccessToken ,getAccessToken } from "../api/client";
// 여기에 그럼 이벤트 버스를 넣는게 맞을까?
// 메모리에 accesToken 만 저장한다. .. 새로 고침시 accesToken 이 없어지니 . refreshToken 을 이용해서 새로 발급받아야된다. 
import { 
  useLoginMutation, 
  useLogoutMutation, 
  useUserQuery, 
  useRefreshTokenMutation, 
  AUTH_KEYS 
} from "@/query/useMemerQuery";


type AuthStatus = {
  status: "sucuss"|"error",
  message: string;
};

interface User {
  id: number;
  name: string;
  role: string;
  company:string;
  email: string;
  authorities: string[];
  accessToken:string;
  isAuthenticated:boolean;

}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  status: AuthStatus | null;
  checkAuth: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}


const AuthContext = createContext<AuthContextType | null>(null);

// 사용하기 쉽게 내보내는 권환으로 사용 가능한 기능들은 authcontext.provider  의 value 값으로 다 빼놨음. 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<AuthStatus | null>(null);
  
   const refreshMutation = useRefreshTokenMutation();
   const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const { refetch } = useUserQuery(false);

   // 로딩 시 권환 체크 부터 해주세요 . --> 기존에 로그인한 사용자의 토큰이 남아 있는게 있는지 아니면 없는지 
  useEffect(() => {
    checkAuth();
  }, []);


  /**
    로그인했던 기록이 있는지, 쿠키를 확인해주고 , 만약쿠키 accessToken 의 시간이 남아있는 경우에는 
    기존의 사용자의 정보를 불러 와 주세요 . 

   */

  // 새로 고침시 , access_token 이 날아감. 따라서 httponly 쿠기에 저장해놨던 refresh_token 을 이용해서 새로 발급 받아야됨. 

 /**
   * 🔹 토큰 재발급 
   *  accessToken 이 만료되는 경우, db에 저장해놓았던 refresh token 가 일치하는지 확인하고 , 다시 accesToken 을 update 합니다.
   */
 


 const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      await refreshMutation.mutateAsync();


      return true;
    } catch {
      setUser(null);
      return false;
    }
  }, [refreshMutation]);




 const checkAuth = useCallback(async () => {
    try {
      // 1. 토큰이 없으면 리프레시 시도
      if (!getAccessToken()) {
         
        // 새로고침하면 토큰 날아감  --> 새로 고침시 다시 권한 확인해서 . 토큰 받아오게하기 
        const success = await refreshToken();
        if (!success) return;
      }
      
      // 2.  q refetch 함수를 이용해서 수동으로 체크해주는 방식으로 바꿔주기
      const { data } = await refetch();
      console.log(data,'수정한거 되는지 확인좀 부탁')

      
      if (data?.user) {
        setUser(data.user);
        return data.user
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, [refreshToken]);

  /**
   * 🔹 로그인
   */
  const login = useCallback(async (login_data: any) => {
    try {
      setStatus(null);
      // 로그인 시도 (토큰은 mutation 내부 setAccessToken에서 처리됨)
      await loginMutation.mutateAsync(login_data);
      
      // 로그인 성공 후 즉시 유저 정보 갱신  --> 로그인 페이지에게 사용자 정보를 제공함 .
     const data= await checkAuth();
    console.log(data,'?2')


     return data;
    
    
    } catch (e: any) {
      setUser(null);
      const message = e.response?.data?.message || "로그인 실패";
      setStatus({ status: "error", message });
      throw message;
    }
  }, [loginMutation, checkAuth]);

 

  /**
   * 🔹 로그아웃
   */
 const logout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        setStatus(null);
      }
    });
  }, [logoutMutation]);


  const value = useMemo(() => ({
  user,
  isAuthenticated: !!user?.id,
  loading,
  login,
  checkAuth,
  logout,
  refreshToken,
  status,
}), [
  user,
  loading,
  login,
  checkAuth,
  logout,
  refreshToken,
  status,
]);

  return (
    <AuthContext.Provider
      value= {value}
    >
      {children}
    </AuthContext.Provider>
  );
};