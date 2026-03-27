import { Eye } from 'lucide-react'; // 또는 직접 SVG 사용
import { useState } from 'react';
export const PasswordInputRow = ({ label, value, onChange, helperText }: any) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <label className="w-24 text-sm text-gray-600 font-medium">{label}</label>
        <div className="relative flex-1">
          <input
            type="password" // 요게 핵심 로직!
            value={value}
        
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2 pr-10 text-sm focus:outline-none focus:border-green-500"
          />
          <button 
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>
      {/* 이미지 하단에 있던 안내 문구 처리 */}
      {helperText && <p className="ml-24 text-[11px] text-gray-400 leading-tight">{helperText}</p>}
    </div>
  );
};
