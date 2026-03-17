import { api } from "@/api/client";
import { useFormController } from "@/UseHook/useFormController";
import { useState } from "react";

export default function ControlledFeedbackForm() {
  const form = {
    id: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    password:""
  };

const [idCheckMsg, setIdCheckMsg] = useState<{ text: string; isError: boolean } | null>(null);

 

  const validate = (values: typeof form) => {
    const errors: Partial<Record<keyof typeof form, string>> = {};
     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/;
    if (!values.id.trim()) {
      errors.id = "아이디를 입력해주세요.";
    }

    if (!values.name.trim()) {
      errors.name = "이름을 입력해주세요.";
    }

    if (!values.email.trim()) {
      errors.email = "이메일을 입력해주세요.";
    } else if (!values.email.includes("@")) {
      errors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!values.company.trim()) {
      errors.company = "회사 정보를 입력해주세요.";
    }

    if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (!passwordRegex.test(values.password)) { // ! (NOT) 연산자 추가
    errors.password = "영문자와 특수문자를 포함하여 5자 이상 입력해주세요.";
  }
    return errors;
  };
  const checkid = async () => {
    console.log('여기 실행 맞음?',values.id)

 try {
    const response = await api.get(`/api/members/check-id?id=${values.id}`);
    // 서버가 200 OK와 { success: true }를 보낸 경우
    setIdCheckMsg({ text: response.data.message, isError: false });
  } catch (err: any) {
    // 서버가 404나 500 등 에러를 보낸 경우 (MemberNotFoundException 등)
    const msg = err.response?.data?.message || "이미 존재하는 아이디입니다.";
    setIdCheckMsg({ text: msg, isError: true });
  }
  };

const handleRegister = async () => {
  // 중복 체크를 통과하지 못했다면 중단
  if (!idCheckMsg || idCheckMsg.isError) {
    alert("아이디 중복 확인을 완료해주세요.");
    return;
  }
  
  // 성공 시 서버 전송
   try{
       await api.post("/api/members/signup", values);
   } 
   catch(e){
    console.error('무슨 에러임?')
   }
  alert("가입 성공!");
};


  const {
  values,
  errors,
  touched,
  formError,
  isSubmitting,
  setField,
  blurField,
  submit,
} = useFormController({
  initialValue: form,
  validate,
  onsubmit: handleRegister,
});


  return (
    <section className="w-full py-20 bg-white min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto w-[50%]">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          회원가입
        </h2>

        <div className="border-t border-gray-300 mb-8"></div>

        <form onSubmit={(e)=>{
         e.preventDefault(); 
        submit();
        
        }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              아이디 <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="text"
                name="id"
                value={values.id}
                onChange={(e) => setField("id", e.target.value)}
                onBlur={() => blurField("id")}
                className="w-full border border-gray-300 rounded-md px-4 py-3 pr-28 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="아이디를 입력하세요"
              />

              <button
                type="button"
                onClick={()=>checkid()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
              >
                중복 확인
              </button>
            </div>

           {touched.id && errors.id ? (
  <p className="text-red-500 font-bold px-4 py-1">{errors.id}</p>
) : idCheckMsg ? (
  <p className={`${idCheckMsg.isError ? "text-red-500" : "text-blue-500"} font-bold px-4 py-1`}>
    {idCheckMsg.text}
  </p>
) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => setField("name", e.target.value)}
              onBlur={() => blurField("name")}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="이름을 입력하세요"
            />

            {touched.name && errors.name && (
              <p className="text-red-500 font-bold px-4 py-1">{errors.name}</p>
            )}

            {
               
            }
          </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호  <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="password"
              value={values.password}
              onChange={(e) => setField("password", e.target.value)}
              onBlur={() => blurField("password")}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="비밀번호를 입력하세요"
            />

            {touched.password && errors.password && (
              <p className="text-red-500 font-bold px-4 py-1">{errors.password}</p>
            )}

            {
               
            }
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => blurField("email")}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="example@email.com"
            />

            {touched.email && errors.email && (
              <p className="text-red-500 font-bold px-4 py-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              휴대폰 (선택)
            </label>
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => blurField("phone")}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="010-0000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              회사 정보 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={values.company}
              onChange={(e) => setField("company", e.target.value)}
              onBlur={() => blurField("company")}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="회사명을 입력하세요"
            />

            {touched.company && errors.company && (
              <p className="text-red-500 font-bold px-4 py-1">
                {errors.company}
              </p>
            )}
          </div>

          {formError && (
            <p className="text-red-500 font-bold px-2">{formError}</p>
          )}

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-company_orange text-white px-6 py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isSubmitting ? "가입 중..." : "가입하기"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}