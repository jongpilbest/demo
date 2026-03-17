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
import { api } from "../api/client";
// 여기에 그럼 이벤트 버스를 넣는게 맞을까?




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


   // 로딩 시 권환 체크 부터 해주세요 . --> 기존에 로그인한 사용자의 토큰이 남아 있는게 있는지 아니면 없는지 
  useEffect(() => {
    checkAuth();
  }, []);


  /**
    로그인했던 기록이 있는지, 쿠키를 확인해주고 , 만약쿠키 accessToken 의 시간이 남아있는 경우에는 
    기존의 사용자의 정보를 불러 와 주세요 . 

   */

  
  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get("/api/members/auth");
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch(e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  },[]);

  /**
   * 🔹 로그인
   */
  const login = useCallback (async (credentials: any) => {
    try {
      setStatus(null);
      setLoading(true);
      await api.post("/api/members/login", credentials);
      await checkAuth();
    } catch (e: any) {
      setUser(null);

      setStatus({
        status:"error",
        message:
          e.response?.data?.message 
      });

      throw e;
    } finally {
      setLoading(false);
    }
  },[]);

  /**
   * 🔹 토큰 재발급 
   *  accessToken 이 만료되는 경우, db에 저장해놓았던 refresh token 가 일치하는지 확인하고 , 다시 accesToken 을 update 합니다.
   */
  const refreshToken = useCallback( async (): Promise<boolean> => {
    try {
      await axios.post(
        "/api/v3/auth/tokens/refresh",
        {},
        { withCredentials: true }
      );
      return true;
    } catch {
      return false;
    }
  },[]);


  /**
   * 🔹 로그아웃
   */
  const logout = useCallback( async () => {
    
    try {
      await api.delete("/api/members/logout", {
        withCredentials: true,    
      });
 

    
    } catch(e){
     console.error (e,'로그아웃에 문제가 발생했습니다.')
    }
    finally {
      setUser(null);
      setStatus(null);
    
    }
  },[]);


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
  status
]);

  return (
    <AuthContext.Provider
      value= {value}
    >
      {children}
    </AuthContext.Provider>
  );
};