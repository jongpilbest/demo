import { type User_infomation } from "@/type/Qa/User";
import { useState } from "react";
import { BaseModal } from "./BaseModal";
import { formatDate } from "@/lib/date_utils";
import { ExternalLink, ChevronRight } from 'lucide-react';
import EditFormWrapper from "../Mypage/EditFormWrapper";
import EditInputRow from "../Mypage/EditInputRow";
import { useEditUserMutation } from "@/query/useMemerQuery";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/UseHook/useAlert";
import { deleteUserApi } from "@/api/memeber_api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { setAccessToken } from "@/api/client";
import CheckUserPassword from "./CheckUserPassword"; // 👈 분리한 컴포넌트 임포트
import { el } from "date-fns/locale";

export default function MyPageProfile({ user }: User_infomation) {
  const [isModalOpen, setIsModalOpen] = useState(false);



  const [isUserEditMode, setIsUserEditMode] = useState(false); // 수정 모드 진입 여부

  const[isUserDeleteMode,setIsUserDeleteMode]=useState(false); // 탈퇴 모드 진입 여부 
  


  const [isVerified, setIsVerified] = useState(false); // 비밀번호 인증 완료 여부
  const[isVerifyDelete,setIsVerifyDelete]=useState(false); // 탈퇴 인증 여부




  const { mutateAsync: editUser } = useEditUserMutation();
  const { checkAuth } = useAuth();
  const { success, error } = useAlert();
  const navigate = useNavigate();

  if (!user) return null;

  // 정보 수정 저장
  const saveUpdateUser = async (updatedData: { name: string; email: string }) => {
    try {
      if (!updatedData.email.includes("@")) {
        error("유효하지 않은 이메일 형식입니다.");
        return;
      }
      await editUser(updatedData);
      await checkAuth();
      setIsUserEditMode(false);
      setIsVerified(false); // 수정 완료 후 다시 인증 상태 초기화
      success("정보가 성공적으로 업데이트되었습니다!");
    } catch (e) {
      console.error('수정 시 에러 발생');
    }
  };

  // 회원 탈퇴
  const handleDeleteUser = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      const isDeleted = await deleteUserApi();
      if (isDeleted) {
        setAccessToken(null);
        await checkAuth();
        toast.success("회원 탈퇴가 완료되었습니다.");
        navigate('/');
      } else {
        toast.error("회원 탈퇴 중 문제가 발생했습니다.");
      }
    }
  };

  // 수정 취소 및 상태 초기화
  const handleCancelEdit = () => {
    setIsUserEditMode(false);
    setIsVerified(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 mt-12 border border-gray-100 relative">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute top-8 right-8 text-sm font-medium text-orange-500 hover:underline"
      >
        정보 수정
      </button>

      {/* ... 기존 메인 프로필 UI ... */}

      <BaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-w-3xl mx-auto p-6 bg-[#f8f9fa] font-sans">
          <h1 className="text-xl font-bold mb-6 text-gray-800">개인정보</h1>

          {/* 1. 내 정보 섹션 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-gray-900">내 정보</h2>
              {!isUserEditMode && (
                <button
                  onClick={() => setIsUserEditMode(true)}
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  수정
                </button>
              )}
            </div>

            {!isUserEditMode ? (
              /* 일반 보기 모드 */
              <div className="space-y-5">
                <InfoRow label="아이디" value={user.username} />
                <InfoRow label="이름" value={user.name} />
                <InfoRow label="이메일" value={user.email} />
                <InfoRow label="회사" value={user.company} />
                <InfoRow label="역할" value={user.role?.roleName} />
              </div>
            ) : !isVerified ? (
              /* 단계 1: 비밀번호 인증 (컴포넌트 호출) */
              <CheckUserPassword 
                onVerifySuccess={() => setIsVerified(true)} 
                onCancel={handleCancelEdit} 
              />
            ) : (
              /* 단계 2: 실제 수정 폼 */
              <EditFormWrapper<{ name: string; email: string }>
                onSave={saveUpdateUser}
                onCancel={handleCancelEdit}
              >
                <InfoRow label="아이디" value={user.username} />
                <EditInputRow label="이름" name="name" value={user.name} />
                <EditInputRow label="이메일" name="email" value={user.email} />
                <InfoRow label="회사" value={user.company} />
                <InfoRow label="역할" value={user.role?.roleName} />
              </EditFormWrapper>
            )}
          </section>

          {/* 3. 동의 이력 섹션 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">동의 이력</h2>
            <p className="text-[13px] text-gray-500 mb-4 font-semibold">개인정보 동의 이력</p>
            <hr className="border-t border-gray-200 my-3" />
            <div className="border-t border-gray-50">
              <ConsentItem title="이용약관" date={user.createdDate} />
              <ConsentItem title="개인정보처리방침" date={user.createdDate} />
              <ConsentItem title="개인정보 수집·이용" date={user.createdDate} />
            </div>
          </section>

          {/* 4. 약관 및 정책 섹션 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-8">약관 및 정책</h2>
            <div className="space-y-8">
              <PolicyLink label="개인정보처리방침" onClick={() => window.open('/policy/privacy', '_blank')} />
              <PolicyLink label="이용약관" onClick={() => window.open('/policy/terms', '_blank')} />
            </div>
          </section>

          {/* 5. 기타 액션 섹션 */}
          <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mt-6">
           
            <h2 className="text-lg font-bold text-gray-900 mb-8">기타</h2>
           
           {
           isUserDeleteMode ? (
            <CheckUserPassword 
              onVerifySuccess={() => { handleDeleteUser(); setIsVerifyDelete(true); }} 
              onCancel={() => setIsUserDeleteMode(false)} 
            />
           ) :  
           
           <div 
              onClick={() => setIsUserDeleteMode(true)}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center">
                <span className="font-bold text-red-500 mr-2 group-hover:text-red-700 transition-colors">
                  회원탈퇴
                </span>
                <span className="text-xs text-gray-400 group-hover:text-red-400">서비스 이용 종료</span>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-red-300" />
             
            
            
         
            </div>

           }
          </section>
        </div>
      </BaseModal>
    </div>
  );
}

/** 하위 컴포넌트들 (파일 분리 권장) **/

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex text-[14px] items-center">
    <span className="w-24 text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">{value || "-"}</span>
  </div>
);

const ConsentItem = ({ title, date }: { title: string; date: string }) => (
  <div className="py-4 border-b border-gray-50">
    <div className="font-bold text-[15px] text-gray-800">{title}</div>
    <div className="text-xs text-gray-400 mt-1.5"> 동의 | {formatDate(date)}</div>
  </div>
);

const PolicyLink = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <div onClick={onClick} className="flex items-center justify-between cursor-pointer group">
    <div className="flex items-center">
      <span className="font-bold text-gray-700 mr-2 group-hover:text-blue-600">{label}</span>
      <ExternalLink size={14} className="text-gray-400" />
    </div>
    <ChevronRight size={18} className="text-gray-300" />
  </div>
);