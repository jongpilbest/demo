import React, { type ReactNode } from "react";
import person from "/assets/person.svg";

interface Props {
  children: ReactNode;
}

// 1. 메인 컨테이너
function MyPageMain({ children }: Props) {
  return (
    <div className="min-h-screen py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto py-10">
        {children}
      </div>
    </div>
  );
}

// 2. 타이틀 부품 (글자만 갈아끼우기)
function MyPageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-3xl font-semibold text-center mb-12 text-gray-800">
      {children}
    </h1>
  );
}

// 3. 프로필 카드 부품 (색상과 뱃지를 Prop으로 받기)
interface ProfileProps {
  user: any;
  iconBgColor?: string; // 예: "bg-orange-500" 또는 "bg-red-600"
  badgeText?: string;   // 예: "일반회원" 또는 "관리자"
}

function MyPageProfile({ user, iconBgColor = "bg-orange-500", badgeText }: ProfileProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 mb-12 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-14 items-center">
        {/* 프로필 이미지 - 배경색을 외부에서 결정 */}
        <div className={`w-32 h-32 rounded-full ${iconBgColor} flex items-center justify-center shrink-0 ring-4 ring-opacity-20 ring-gray-200`}>
          <img src={person} className="w-16 opacity-90" alt="profile" />
        </div>

        {/* 사용자 정보 */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-5 mb-3">
            <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
            {badgeText && (
              <span className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-md font-medium">
                {badgeText}
              </span>
            )}
          </div>
          <p className="text-md text-gray-500 mb-1">{user?.email}</p>
          <p className="text-md text-gray-500">{user?.company}</p>
        </div>
      </div>
    </div>
  );
}

// 4. 합성 패턴을 위해 객체에 할당 (스크린샷 방식)
const MyPage = Object.assign(MyPageMain, {
  Title: MyPageTitle,
  Profile: MyPageProfile,
});

export default MyPage;