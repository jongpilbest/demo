// MyPageProfile.tsx
import{type User_infomation} from "@/type/Qa/User"
import { useState } from "react";
import { BaseModal } from "./BaseModal";
import {formatDate} from "@/lib/date_utils";
import { ExternalLink, ChevronRight } from 'lucide-react';
import  EditFormwrapper  from "../Mypage/EditFromWrapper";
import EditInputRow from "../Mypage/EditInputRow";
import { useEditUserMutation } from "@/query/useMemerQuery";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/UseHook/useAlert";
import { checkPasswordApi, deleteUserApi } from "@/api/memeber_api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { setAccessToken } from "@/api/client";
export default function MyPageProfile({ user}: User_infomation) {
  
   const[UserEdit,setUserEdit]=useState(false);
   const [isVerified, setIsVerified] = useState(false); // 비밀번호 인증 여부
   const [password, setPassword] = useState(""); // 입력받는 비밀번호
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutateAsync: editUser } = useEditUserMutation();
  const{checkAuth}=useAuth();
   const{loading, success,error}= useAlert();
   const navigate = useNavigate();

  if(!user) return null;

const saveUpdateUser = async function(updatedData: { name: string; email: string }){
try{

   // 검증 로직 부터 넣어주기 , 이메일 제대로 된 형태일때만  ㄱ ㄱ
   if (!updatedData.email.includes("@")) {
     error("유효하지 않은 이메일 형식입니다.");
   
     return;
   }

    await editUser(updatedData);
    await checkAuth();
    setUserEdit(false);
    success(" 정보가 성공적으로 업데이트 되었습니다! ")

}
catch(e){ 
  console.error(' 수정시 에러가 발생')

}
}


const handleVerifyPassword = async () => {
  // 1. 요청 직전에 로딩 띄우기
  loading("비밀번호를 확인 중입니다...");

  try {
     await checkPasswordApi(password);
    
    // 2. 성공 시 로딩 알림을 지우고 성공 알림 띄우기
    toast.dismiss(); // 모든 토스트 제거 (가장 확실)
    success("비밀번호가 확인되었습니다.");
    setIsVerified(true);
  } catch (e) {
    // 3. 실패 시 로딩 알림 지우고 에러 알림 띄우기
    toast.dismiss(); 
    error("비밀번호가 일치하지 않습니다.");
  }
};
// 취소 시 상태 초기화
const handleCancel = () => {
  setUserEdit(false);
  setIsVerified(false);
  setPassword("");
};




   
  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 mt-12 border border-gray-100 relative">
      {/* 수정 버튼 */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute top-8 right-8 text-sm font-medium text-orange-500 hover:underline"
      >
        정보 수정
      </button>

      {/* ... 기존 프로필 UI 코드 ... */}

      {/* 공통 모달 사용 - 내부만 커스텀하게 채움 */}
      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="max-w-3xl mx-auto p-6 bg-[#f8f9fa] font-sans">
      <h1 className="text-xl font-bold mb-6 text-gray-800">개인정보</h1>

      {/* 1. 내 정보 섹션 */}
      <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
         <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold text-gray-900">내 정보</h2>
          <button
          
          onClick={()=>setUserEdit((El)=>!El)}
          
          className={`text-blue-500 text-sm font-medium hover:underline ${
    UserEdit ? "hidden" : "block"
  }`}
        >수정</button>
        </div>
       {!UserEdit && (
          <div className="space-y-5">
          <InfoRow label="아이디" value={user?.username} />
          <InfoRow label="이름" value={user?.name} />
          <InfoRow label="이메일" value={user?.email} />
          <InfoRow label="회사" value={user?.company} />
          <InfoRow label="역할" value={user?.role?.roleName} />
        </div>
          )
       }
  
     {UserEdit && (
  <>
    {!isVerified ? (
      /* --- 비밀번호 확인 섹션 --- */
      <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold mb-4">본인 확인</h2>
        <p className="text-sm text-gray-600 mb-6">정보 수정을 위해 비밀번호를 다시 입력해주세요.</p>
        
        <div className="flex gap-2">
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="flex-1 border p-2 rounded-md outline-none focus:border-green-500"
          />
          <button 
            onClick={handleVerifyPassword}
            className="px-6 py-2 bg-gray-800 text-white rounded-md text-sm"
          >
            확인
          </button>
          <button onClick={handleCancel} className="px-4 py-2 text-sm text-gray-500 underline">
            취소
          </button>
        </div>
      </section>
    ) : (
      /* --- 실제 수정 폼 (인증 완료 시) --- */
      <EditFormwrapper<{name:string, email:string}>
        onSave={saveUpdateUser}
        onCancel={handleCancel}
      >
        <InfoRow label="아이디" value={user?.username} />
        <EditInputRow label="이름" name="name" value={user?.name} />
        <EditInputRow label="이메일" name="email" value={user?.email} />
        <InfoRow label="회사" value={user?.company} />
        <InfoRow label="역할" value={user?.role?.roleName} />
      </EditFormwrapper>
    )}
  </>
)}


      </section>

      {/* 
      
       <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">비밀번호</h2>
          <button 
          onClick={()=>setPasswordEdit((El)=>!El)}
          className="text-blue-500 text-sm font-medium hover:underline">변경</button>
        </div>
      </section>
      
      
      */}
     

      {/* 3. 동의 이력 섹션 */}
      <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">동의 이력</h2>
        <p className="text-[13px] text-gray-500 mb-4 font-semibold">개인정보 동의 이력</p>
       <hr className="border-t  border-gray-200 my-3" />
        {/* 배열 없이 직접 나열 */}
        <div className="border-t border-gray-50">
          <div className="py-4 border-b border-gray-50">
            <div className="font-bold text-[15px] text-gray-800">이용약관</div>
            <div className="text-xs text-gray-400 mt-1.5">  동의 | {formatDate(user.createdDate)}</div>
          </div>
          
          <div className="py-4 border-b border-gray-50">
            <div className="font-bold text-[15px] text-gray-800">개인정보처리방침</div>
            <div className="text-xs text-gray-400 mt-1.5"> 동의 | {formatDate(user.createdDate)}</div>
          </div>

          <div className="py-4 border-b border-gray-50">
            <div className="font-bold text-[15px] text-gray-800">개인정보 수집·이용</div>
            <div className="text-xs text-gray-400 mt-1.5"> 동의 | {formatDate(user.createdDate)} </div>
          </div>
        </div>
      </section>

      {/* 4. 약관 및 정책 섹션 */}
      <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-8">약관 및 정책</h2>
        <div className="space-y-8">
          <div 
          onClick={() => window.open('/policy/privacy', '_blank')}
          className="flex items-center justify-between cursor-pointer group">
            <div
            
           
            className="flex items-center">
              <span 
             
              className="font-bold text-gray-700 mr-2 group-hover:text-blue-600">개인정보처리방침</span>
              <ExternalLink size={14} className="text-gray-400" />
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>

          <div 
         onClick={() => window.open('/policy/terms', '_blank')}
          className="flex items-center justify-between cursor-pointer group">
            <div
            
            
            className="flex items-center">
              <span 
             
              className="font-bold text-gray-700 mr-2 group-hover:text-blue-600">이용약관</span>
              <ExternalLink size={14} className="text-gray-400" />
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        </div>
      </section>


     {/* 5. 기타 액션 섹션 */}
<section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mt-6">
  <h2 className="text-lg font-bold text-gray-900 mb-8">기타</h2>
  
  <div 
    onClick={() => {
      if(window.confirm("정말로 탈퇴하시겠습니까? ")) {
        // 탈퇴 로직 실행

       //탈퇴 api 호출해서 탈퇴 시키고 , 로그아웃 처리까지 해주기
       deleteUserApi().then(async (success) => {
         if (success) {
         
           setAccessToken(null);
           await checkAuth(); // 탈퇴 후 권한 상태 갱신 (로그아웃 처리)
           toast.success("회원 탈퇴가 완료되었습니다.");
           navigate('/')
         } else {
           toast.error("회원 탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
         }    


      })
    }
    }}
    className="flex items-center justify-between cursor-pointer group"
  >
    <div 
    className="flex items-center">
      <span className="font-bold text-red-500 mr-2 group-hover:text-red-700 transition-colors">
        회원탈퇴
      </span>
      {/* 경고 느낌을 주기 위해 ExternalLink 대신 작은 쓰레기통 아이콘이나 안내 텍스트를 넣어도 좋습니다 */}
      <span className="text-xs text-gray-400 group-hover:text-red-400">서비스 이용 종료</span>
    </div>
    <ChevronRight size={18} className="text-gray-300 group-hover:text-red-300" />
  </div>
</section>
    </div>



      </BaseModal>
    </div>
  );
}
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex text-[14px] items-center">
    <span className="w-24 text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);