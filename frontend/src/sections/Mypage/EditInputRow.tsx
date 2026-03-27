import React, { useState } from "react";

// 컴포넌트 정의 시 { } 를 사용해야 내부에서 useState를 쓸 수 있습니다.
const EditInputRow = ({ label, value, name, placeholder }: any) => {
  // 만약 단순히 값을 보여주고 FormData로 뽑아낼 거라면 
  // 사실 useState 없이 defaultValue만 써도 충분합니다! (일단 넣어둘게요)
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="flex items-center">
      <label className="w-24 text-sm text-gray-600 font-medium">
        {label}
      </label>
      <input
        type="text"
        name={name} // 데이터를 식별할 이름 (없으면 label이라도 사용)
        value={inputValue}   // 이제 입력이 가능하도록 value와 onChange 연결
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-green-500 bg-white"
      />
    </div>
  );
};

export default EditInputRow;