import React from 'react'
import useEvent from '../UseHook/useEvent'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// 이벤트를 감지하는것도, 구독자가 할일이다. 즉 구독자는 듣는 사람이라고 생각하면됨
// 따라서 subscribe함수가 필요하다. 

import { useAuth } from '@/context/AuthContext';


export default function GlobalEventWatcher() {
    const{checkAuth,logout,user}=useAuth();
  const navigate = useNavigate();
  const location = useLocation();
 
  useEvent('login',()=>{

   // 로그인이 감지 되었으니, 사용자의 정보를 다시 확인합니다. 
    checkAuth()

    // 현재 유저가 어디 페이지에 위치하는지 확인합니다. 
    const currentPath = location.pathname;

    // 다른 탭의 유저가 로그인/회원가입 페이지에 있었다면 메인(또는 마이페이지)으로 자동 이동시킵니다.
    if (currentPath === '/login' || currentPath === '/signup') {
      navigate('/', { replace: true }); 
      // replace: true == 뒤로가기 했을 때 다시 로그인 페이지로 가는 걸 막아줌
    }
  })

    useEvent('logout',()=>{
  
    // 다른 탭에서도 동일하게 로그아웃 함수를 실행합니다. 
    if(!user) return;
    else{
     logout()
     navigate('/', { replace: true }); 
    }
   
  })


  return null;



}
