import { api } from "@/api/client";
import { useFormController } from "@/UseHook/useFormController";
import { useState ,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { EyeOff, Eye, CheckCircle2 } from "lucide-react";

import{useEnrollMutation} from "@/query/useQAquery"
export default function ControlledFeedbackForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {mutateAsync} = useEnrollMutation();


  const [showPassword, setShowPassword] = useState(false);
  const [idCheckMsg, setIdCheckMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const form = {
    username: "",
    name: "",
    email: "",
    phone: "",
    company: "", // 회사 이름 필드 유지
    password: "",
    doublecheckpassword: "",
    agreeRequired: false,
    agreeAge: false,
    agreeOptional: false
  };

  const validate = (values: typeof form) => {
    const errors: Partial<Record<keyof typeof form, string>> = {};
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!values.username.trim()) errors.username = "아이디를 입력해주세요.";
    if (!values.name.trim()) errors.name = "이름을 입력해주세요.";
    if (!values.email.trim()) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!values.email.includes("@")) {
      errors.email = "올바른 이메일 형식이 아닙니다.";
    }
    
    // 1. 회사 이름 유효성 검사 다시 추가
    if (!values.company.trim()) {
      errors.company = "회사 정보를 입력해주세요.";
    }

    if (!values.password) {
      errors.password = "비밀번호를 입력해주세요.";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "영문자와 특수문자를 포함하여 8자 이상 입력해주세요.";
    }
    
    if (values.password !== values.doublecheckpassword) {
      errors.doublecheckpassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!values.agreeRequired) errors.agreeRequired = "필수 이용약관에 동의해주세요.";
    if (!values.agreeAge) errors.agreeAge = "만 14세 이상 동의가 필요합니다.";

    return errors;
  };

  // ... (checkid 함수는 동일)
  const checkid = async () => {
    if (!values.username) {
      setIdCheckMsg({ text: "아이디를 먼저 입력해주세요.", isError: true });
      return;
    }
    try {
      const response = await api.get(`/api/members/check-id?id=${values.username}`);
      setIdCheckMsg({ text: response.data.message || "사용 가능한 아이디입니다.", isError: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "이미 존재하는 아이디입니다.";
      setIdCheckMsg({ text: msg, isError: true });
    }
  };

  const handleRegister = async () => {
    if (!idCheckMsg || idCheckMsg.isError) {
      alert("아이디 중복 확인을 완료해주세요.");
      return;
    }

    try {
      // 2. 전송 데이터에서 불필요한 필드 제외 (company는 rest에 포함되어 전송됨)
      const { doublecheckpassword, agreeRequired, agreeAge, agreeOptional, ...rest } = values;
      
      // mutate 여기 await 아닌가?
      await mutateAsync(rest);
      await login({ username: values.username, password: values.password });
      navigate('/');
    } catch (e) {
      console.error('회원가입 에러:', e);
    }
  };

  const { values, errors, touched, formError, isSubmitting, setField, blurField, submit } = useFormController({
    initialValue: form,
    validate,
    onsubmit: handleRegister,
  });


  return (
    <section className="w-full py-20 bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-xl mx-auto w-full bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">회원가입</h2>

        <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-6">
          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">아이디 <span className="text-red-500">*</span></label>
            <div className="relative">
              <input 
            
              type="text" value={values.username} onChange={(e) => setField("username", e.target.value)} onBlur={() => blurField("username")} className="w-full border border-gray-300 rounded-md px-4 py-3 pr-28 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="아이디 입력" />
              <button type="button" onClick={checkid} className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded bg-indigo-600 text-white text-xs hover:bg-indigo-700">중복 확인</button>
            </div>
            {touched.username && errors.username ? <p className="
           
      
            text-red-500 text-md font-bold mt-1">{errors.username}</p> : idCheckMsg && <p className={`${idCheckMsg.isError ? "text-red-500" : "text-blue-500"} text-md mt-1`}>{idCheckMsg.text}</p>}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 <span className="text-red-500">*</span></label>
            <div className="relative">
              <input 
              placeholder="8자 이상, 영문+숫자+특수문자 를 입력해주세요"
              type={showPassword ? "text" : "password"} value={values.password} onChange={(e) => setField("password", e.target.value)} onBlur={() => blurField("password")} className="w-full border border-gray-300 rounded-md px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none" />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          
            {touched.password && errors.password && <p className="text-red-500 text-md mt-1">{errors.password}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인 <span className="text-red-500">*</span></label>
            <input type="password" value={values.doublecheckpassword} onChange={(e) => setField("doublecheckpassword", e.target.value)} onBlur={() => blurField("doublecheckpassword")} className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
            {touched.doublecheckpassword && errors.doublecheckpassword && <p className="text-red-500 text-md mt-1">{errors.doublecheckpassword}</p>}
          </div>

          {/* 이름 & 휴대폰 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름 <span className="text-red-500">*</span></label>
              <input type="text" value={values.name} onChange={(e) => setField("name", e.target.value)} onBlur={() => blurField("name")} className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">휴대폰 (선택)</label>
              <input type="text" value={values.phone} onChange={(e) => setField("phone", e.target.value)} className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="010-0000-0000" />
            </div>
          </div>

          {/* 3. 회사 이름 입력 필드 (다시 추가) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">회사 정보 <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={values.company}
              onChange={(e) => setField("company", e.target.value)}
              onBlur={() => blurField("company")}
              className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="회사명을 입력해주세요"
            />
            {touched.company && errors.company && <p className="text-red-500 text-md mt-1">{errors.company}</p>}
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일 <span className="text-red-500">*</span></label>
            <input type="text" value={values.email} onChange={(e) => setField("email", e.target.value)} onBlur={() => blurField("email")} className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="example@email.com" />
            {touched.email && errors.email && <p className="text-red-500 text-md mt-1">{errors.email}</p>}
          </div>

          {/* 약관 동의 */}
          <div className="space-y-3 border-t pt-6">
            <div className="flex items-center justify-between">
              <label 
              onClick={() => setField("agreeRequired", !values.agreeRequired)}
              className="flex items-center gap-2 cursor-pointer text-sm">
                <CheckCircle2 size={25} className={values.agreeRequired ? "text-indigo-600" : "text-gray-300"}  />
                <span>개인정보 수집 및 이용 동의 <span className="text-red-500">(필수)</span></span>
              </label>
              <button
                        onClick={()=>window.open("/policy/privacy", "_blank")}
              type="button" className="text-xs text-blue-500 underline">전문 보기</button>


            </div>

            {/* 에러가 있고 + 현재 값이 false일 때만 에러 메시지 출력 */}
  {errors.agreeRequired && !values.agreeRequired && (
    <p className="text-red-500 text-sm mt-1">{errors.agreeRequired}</p>
  )}
            <div className="flex items-center text-sm">
              <label 
              onClick={() => setField("agreeAge", !values.agreeAge)}
              className="flex items-center gap-2 cursor-pointer">
                <CheckCircle2 size={25} className={values.agreeAge ? "text-indigo-600" : "text-gray-300"}  />
                <span>만 14세 이상입니다 <span className="text-red-500">(필수)</span></span>
              </label>


          
            </div>
          
              {errors.agreeAge && !values.agreeAge && (
    <p className="text-red-500 text-sm mt-1">{errors.agreeAge}</p>
  )}
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-white py-4 rounded-md hover:bg-orange-600 transition disabled:opacity-50 font-bold text-lg">
            {isSubmitting ? "가입 처리 중..." : "회원가입 완료"}
          </button>
        </form>
      </div>
    </section>
  );
}