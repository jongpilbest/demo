import { useEffect } from "react";

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    function listener(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    }
     // component 가 사라지면 여기 안에서 만든 listenr 를 삭제할려고. 

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
    // 외부에서 re-render 하는 경우 handler 가 변경되는 경우가 있어서 우선 넣음

    
  }, [ref, handler]);
}