import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// 이전에 작성하신 컨텍스트 이름이 usePermission인지 usePermissions인지 확인 필요!
import { usePermission } from '../context/PermissionContext';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '@/api/client';
import { useAuth } from '@/context/AuthContext';
/**
 * 보호된 라우트 컴포넌트 Props 타입 정의
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredFeature?: string | null;
  requiredPermission?: 'READ' | 'CREATE' | 'UPDATE' | 'DELETE' | string;
}

const ProtectedRoute = ({ 
  children, 
  requiredFeature = null,
  requiredPermission = 'READ'
}: ProtectedRouteProps) => {

  // 컨텍스트에서 필요한 상태와 함수를 가져옵니다.
const { hasPermission, loading: permLoading, userRole } = usePermission();
const navigate = useNavigate();
const { isAuthenticated, loading: authLoading } = useAuth(); // 2. 인증 상태 가져오기
const location = useLocation();
 

  if (!isAuthenticated &&!authLoading) {
    // 로그인 안 했으면 로그인 페이지로 보내되, 원래 가려던 주소(from)를 기억하게 함
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  // 2. 권한 체크 (requiredFeature가 있을 때만 실행)
  if (requiredFeature) {
    const hasAccess = hasPermission(requiredFeature, requiredPermission);
     console.log('접근 되는지 확인좀',hasAccess)
    
   if (!hasAccess) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <div className="mb-4 text-5xl">🔒</div>
        <h2 className="mb-2 text-xl font-bold text-gray-800">접근 권한이 없습니다</h2>
        <p className="mb-2 text-sm text-gray-500">
          이 페이지에 접근할 권한이 없습니다.
        </p>
        <p className="mb-6 text-sm text-gray-400">
          현재 역할: {userRole || "알 수 없음"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 active:scale-[0.98]"
        >
          이전 페이지로
        </button>
      </div>
    </div>
  );

}
  }

  // 3. 모든 통과 조건을 만족하면 children 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;