// BaseModal.tsx
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, children }: BaseModalProps) {
  // 모달이 열렸을 때 스크롤 방지 (선택 사항)
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  // index.html에 만든 modal-root를 찾습니다.
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 배경 - 클릭 시 닫힘 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* 실제 모달 컨텐츠 박스 */}
      <div
className="relative z-10 w-full max-w-screen-md mx-4 max-h-[70vh] overflow-y-auto rounded-xl bg-[#f8f9fa]">
        {children}
      </div>
    </div>,
    modalRoot
  );
}