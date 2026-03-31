import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAlert } from "@/UseHook/useAlert";
import { checkPasswordApi } from "@/api/memeber_api";
import { toast } from "react-hot-toast";

interface CheckUserPasswordProps {
  onVerifySuccess: () => void; // 인증 성공 시 실행할 함수
  onCancel: () => void;        // 취소 시 실행할 함수
}

export default function CheckUserPassword({ onVerifySuccess, onCancel }: CheckUserPasswordProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, success, error } = useAlert();

  const handleVerifyPassword = async () => {
    loading("비밀번호를 확인 중입니다...");
    try {
      await checkPasswordApi(password);
      toast.dismiss();
      success("비밀번호가 확인되었습니다.");
      onVerifySuccess(); // ✅ 부모에게 성공을 알림
    } catch (e) {
      toast.dismiss();
      error("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h2 className="text-lg font-bold mb-4">본인 확인</h2>
      <p className="text-sm text-gray-600 mb-6">정보 수정을 위해 비밀번호를 다시 입력해주세요.</p>
      
      <div className="flex gap-2">
        <div className="flex gap-2 flex-1 relative">
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerifyPassword()} // 엔터키 지원
            placeholder="비밀번호 입력"
            className="flex-1 border p-2 rounded-md outline-none focus:border-green-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button 
          onClick={handleVerifyPassword}
          className="px-6 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-black transition-colors"
        >
          확인
        </button>
        <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-500 underline">
          취소
        </button>
      </div>
    </section>
  );
}