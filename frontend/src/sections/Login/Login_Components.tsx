
import { Suspense ,lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {useAuth} from '../../context/AuthContext'

const AnimatedBackground = lazy(() => import('@/components/three/AnimatedBackground'));
import{EventBus}from '../../watcher/eventBus'

export default function LoginPage() {
  
  const{login,isAuthenticated}=useAuth();

 const navigate=useNavigate();


 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try{
      
     await login({ username, password });
     
     navigate('/Mypage');



     
      EventBus.publish('login', null, true)
    if(isAuthenticated){
    navigate('/Mypage')
  }
    }
    catch{
      //에러 메세지 오면 여기서 모듈 처리 하는 식으로 하기 

      console.error('로그인시 오류가 발생했습니다.')

    }


  };

 

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
    <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="p-14 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
          로그인
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <input
              name="username"
              type="text"
              placeholder="아이디를 입력해주세요"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
            />
          </div>

          <div className="mb-3">
            <input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded mt-4"
          >
            로그인
          </button>
        </form>

       <div className="flex justify-end mt-3">
  <button
    onClick={() => navigate("/enroll")}
    className="px-4 py-1 text-sm bg-slate-900 rounded text-white"
  >
    회원가입
  </button>
</div>
      </div>
    </div>
  </div>
);
}