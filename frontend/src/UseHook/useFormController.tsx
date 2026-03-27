import { useMemo, useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;
type Touched<T> = Partial<Record<keyof T, boolean>>;

export function useFormController<T extends Record<string, any>>(opts: {
  initialValue: T;
  validate: (values: T) => Errors<T>;
  onsubmit: (values: T) => Promise<void> | void;
}) {
  const { initialValue, validate, onsubmit } = opts;

  const [values, setValues] = useState<T>(initialValue);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [touched, setTouched] = useState<Touched<T>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력 중엔 검증 안 함
  const setField = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  // blur 시: touched=true + 해당 필드 에러만 갱신
  const blurField = <K extends keyof T>(key: K) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const next = validate(values);
    setErrors((prev) => ({ ...prev, [key]: next[key] }));
  };

  const submit = async () => {
  // 1. 제출 전 전체 검증 로직 + 중복 확인 이거 status 받아야됨. 
  const nextErrors = validate(values);

  
  setErrors(nextErrors);
  
   

  // 에러가 하나라도 있으면 실행 안 함
  if (Object.keys(nextErrors).length > 0) return;

  setFormError(null);
  setIsSubmitting(true);
  
  try {
    // 2. 외부에서 넘겨준 로직(onsubmit)에 현재 입력값(values)을 담아서 실행!
      await onsubmit(values);
    
  } catch (err: any) {
    // 서버 에러 처리 로직...
    const msg = err?.response?.data?.message || "요청 실패";
    setFormError(String(msg));
  } finally {
    setIsSubmitting(false);
  }
};

  return {
    errors,
    touched,
    formError,
    isSubmitting,
    setField,
    blurField,
    submit,
    values,   // 필요하면 외부에서 초기화할 때 사용
    setErrors,   // 필요하면 외부에서 강제 세팅
  };
}