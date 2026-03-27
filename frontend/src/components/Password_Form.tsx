import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name?: string;
  placeholder?: string;
  className?: string;
}

const PasswordInput = ({ 
  name = "password", 
  placeholder = "비밀번호를 입력하세요",
  className = "" 
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="w-full border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2 pr-10"
      />
      
      {/* 아이콘 버튼 */}
      <button
        type="button" // form 전송 방지를 위해 반드시 type="button" 지정
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-600 transition-colors"
        aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
      >
        {showPassword ? <EyeOff size={25} /> : <Eye size={2} />}
      </button>
    </div>
  );
};

export default PasswordInput;