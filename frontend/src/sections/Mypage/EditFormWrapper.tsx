import React from "react";

interface EditFormWrapperProps<T> {
  title: string;
  onCancel: () => void;
  onSave: (data: T) => void;
  children: React.ReactNode;
}

// 1. 선언부에서 export const를 떼고 일반 const로 만듭니다.
// 2. <T,> 처럼 쉼표를 찍어야 TSX가 제네릭으로 인식합니다.
const EditFormWrapper = <T extends Record<string, any>>({
  title,
  onCancel,
  onSave,
  children
}: EditFormWrapperProps<T>) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as T;
    onSave(data);
  };

  return (
    <section className="bg-white rounded-lg mb-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-6">{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-end gap-2 mt-8">
          <button type="button" onClick={onCancel} className="bg-slate-200">취소</button>
          <button type="submit" className="...">변경</button>
        </div>
      </form>
    </section>
  );
};

// 3. 마지막에 한 번만 깔끔하게 default로 내보냅니다.
export default EditFormWrapper;