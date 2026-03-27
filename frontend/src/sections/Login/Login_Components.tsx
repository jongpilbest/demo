
import { Suspense ,lazy, useState,useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {useAuth} from '../../context/AuthContext'


import{EventBus}from '../../watcher/eventBus'
import { useAlert } from "@/UseHook/useAlert";

import PasswordInput  from "../../components/Password_Form";


export default function LoginPage() {
  
  const{login}=useAuth();
  const { success, error } = useAlert();
  const usernameRef = useRef<HTMLInputElement>(null);

  // 비동기에서 걸림. 이거 시간 차이 때문에 permision 값이 제대로 업데이트 되지 않았는데 그냥 go 
  // 여서 지금 다른 페이지로 이동하게 되는거임. 
  // const{userRole}=usePermission();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus(); // 입력창에 포커스 뽝!
    }
  }, []);


 const navigate=useNavigate();

 // 비밀번호 보여줄지 말지를 결정하는 상태값 . 

 const [showPassword, setShowPassword] = useState(false);
 const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try{
      
    const result = await login({ username, password });
 

     success(`${result?.username}님 환영합니다! `);
     navigate('/')
     // 지금 dTO고쳤더니 에러나고..;; 
  //login 이뤄지고 나서 permision 이 될텐데. 현재는 awiat 으로 비동기를 걸어서 .....
      EventBus.publish('login', null, true)

    }
    catch(e: any){
      //에러 메세지 오면 여기서 모듈 처리 하는 식으로 하기 
      //여기 그거 위에 되는거 
     error(e)
     

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
            ref={usernameRef}
              name="username"
              type="text"
              placeholder="아이디를 입력해주세요"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
            />
          </div>

      <div className="mb-8 relative w-full"> {/* 부모에 w-full과 relative를 줍니다 */}
     <PasswordInput name="password" />
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