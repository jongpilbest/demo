import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;          // FormData에서 인식할 키 값
  defaultValue?: string; // 초기값 (필요 시)
  placeholder?: string;
  showEyeIcon?: boolean;
}

const PasswordInput = ({
  name,
  defaultValue = "",
  placeholder,
  showEyeIcon = true,
}: PasswordInputProps) => {
  // 눈 아이콘 토글용 상태만 내부에서 관리
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="relative">
        <input
          type={showEyeIcon && showPassword ? "text" : "password"}
          name={name} // 비제어 방식의 핵심: name 속성
          defaultValue={defaultValue} // value 대신 defaultValue 사용
          placeholder="비밀번호를 입력해줏세요"
          className={`w-full border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2 ${
            showEyeIcon ? "pr-10" : ""
          }`}
        />
        
        {showEyeIcon && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;