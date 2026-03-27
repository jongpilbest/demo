import React, { useEffect } from 'react';
import Header from '@/components/Header';

import './App.css';
import Home_Main from './sections/Home/Home_Main';
import Q_A_Components from './sections/Q_A/Q_A_Components';
import Enroll from './sections/Login/Enroll_Components'
import LoginPage from './sections/Login/Login_Components';
import Q_A_write from './sections/Q_A/Q_A_Write_Components';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import Admin_Dashboard from './sections/Mypage/Admin_Page'; 
import UserType from './sections/Mypage/UserType';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from './components/ProtecedRoute';
import { Toaster } from 'react-hot-toast';
import User_Page from "./sections/Mypage/User_Page";

import Admin_Page from "./sections/Mypage/Admin_Page";

import { AuthProvider } from './context/AuthContext'
import GlobalEventWatcher from './watcher/GlobalEventWatcher';
import { PermissionProvider } from './context/PermissionContext';
import ErrorBoundary from './components/ErrorBoundary';
import TermsOfService from './sections/Policy/Term';
import PrivacyPolicy from './sections/Policy/Privacy';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <PermissionProvider>
        <BrowserRouter>
       
         
          <ErrorBoundary>
            <Toaster 
            toastOptions={{
    // 모든 토스트 박스에 공통 적용될 스타일
    style: {
      zIndex: 9999, 
    },
  }}
  // 토스트들을 담는 바구니(컨테이너)의 zIndex를 아예 끝판왕으로 설정
  containerStyle={{
    zIndex: 99999,
  }}
            position="top-center" reverseOrder={false} />
            <div className="min-h-screen">
               <GlobalEventWatcher />
              <Header />
              <Routes>


                //=========================================
                // 누구나 접근가능
                <Route path="/" element={<Home_Main />} />
                <Route
                  path="/contact"
                  element={<Q_A_Components />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/enroll" element={<Enroll />} />
                <Route path='/write' element={<Q_A_write />} />     
                <Route path='/policy/privacy' element={<PrivacyPolicy />} />
                <Route path='/policy/terms' element={<TermsOfService />} />
                //=========================================


                <Route path='/Mypage' element={<User_Page />} />
               // 관리자 전용
                 <Route path="/admin/*" element={
                     <ProtectedRoute requiredFeature="ADMIN_DASHBOARD"  requiredPermission="READ">
                      <Routes>
                      <Route path='/dashboard' element={<Admin_Page/>} />
                      </Routes>    
                     </ProtectedRoute>
                         
                 }></Route>        

              </Routes>

            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </PermissionProvider>
    </AuthProvider>
  );
}

export default App;
