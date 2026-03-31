import { useRef, useState } from "react";
import{EventBus}from '../../watcher/eventBus'
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/UseHook/useAlert";
import { useNavigate } from "react-router-dom";
// ── Sub-components ──────────────────────────────────────────

const LogoIcon = () => (
  <div
    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, width: 36, height: 28 }}
  >
    <span className="rounded-sm bg-[#F26522]" />
    <span className="rounded-sm bg-[#F26522] opacity-60" />
    <span className="rounded-sm bg-white opacity-40" />
    <span className="rounded-sm bg-white" />
  </div>
);

const EyeOpenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);


// ── Data ────────────────────────────────────────────────────

const STATS = [
  { value: "400", unit: "+", label: "누적 센서 운영" },
  { value: "24",  unit: "H", label: "실시간 모니터링" },
  { value: "30",  unit: "+", label: "계측 운영 사례" },
  { value: "14",  unit: "Y", label: "설계계측 경험" },
] as const;

// ── Main Component ──────────────────────────────────────────

export default function Login___() {
  const [id, setId]               = useState<string>("");
  const [password, setPassword]   = useState<string>("");
  const [showPw, setShowPw]       = useState<boolean>(false);
  const [remember, setRemember]   = useState<boolean>(false);
  const{login}=useAuth();
  const { success, error } = useAlert();
  const usernameRef = useRef<HTMLInputElement>(null);

  const navigate= useNavigate();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus(); // 입력창에 포커스 뽝!
    }
  }, []);




 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    
    try{
      
    const result = await login({ username, password });
 

     success(`${result?.username}님 환영합니다! `);
     navigate('/')
     // 지금 dTO고쳤더니 에러나고..;; 
  //login 이뤄지고 나서 permision 이 될텐데. 현재는 awiat 으로 비동기를 걸어서 .....
      EventBus.publish('login', null, true)

    }
    catch(e: any){
      //에러 메세지 오면 여기서 모듈 처리 하는 식으로 하기 
      //여기 그거 위에 되는거 
     error(e)
     

    }


  };


  return (
<div className="fixed inset-0 top-[47px] overflow-hidden">
      {/* 1. 배경 레이어 (정확한 52:48 분할) */}
      <div className="absolute inset-0 flex">
        <div className="hidden w-[52%] bg-slate-900 md:block" />
        <div className="flex-1 bg-[#FDF6EE]" />
      </div>

      {/* 2. 메인 컨텐츠 컨테이너 */}
      <div className="relative mx-auto flex h-full max-w-7xl">
        
        {/* [왼쪽 섹션] - 남색 배경 위 정보성 컨텐츠 */}
        <div className="relative hidden w-[52%] flex-col justify-center px-8 md:flex">
          {/* 장식 요소들 */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#F26522]/10 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

          <div className="relative z-10">
            <span className="mb-6 inline-block rounded-full border border-[#F26522]/40 bg-[#F26522]/20 px-3 py-1 text-[12px] font-medium text-[#F26522]">
              굴착공사장 계측관리 기술의 디지털 전환
            </span>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white">
              스마트 계측<br />현장 안전 상태<br />
              <span className="text-[#F26522]">플랫폼</span>
            </h1>
            <p className="mb-12 max-w-sm text-[15px] font-light leading-relaxed text-gray-300">
              IoT 센서를 사용하고, 스마트 계측 플랫폼을 통해 구조물 안전상태를 스스로 진단하여 사용자에게 위험을 알립니다.
            </p>

            {/* 통계 수치 */}
            <div className="flex gap-8">
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">{s.value}<span className="text-[#F26522]">{s.unit}</span></span>
                    <span className="text-[11px] text-gray-400">{s.label}</span>
                  </div>
                  {i < STATS.length - 1 && <div className="h-8 w-px bg-white/10" />}
                </div>
              ))}
            </div>
          </div>
        </div>

       {/* [오른쪽 섹션] - 베이지 배경 위 로그인 폼 */}
<div className="flex flex-1 flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24">
  {/* mx-auto: 모바일에서 중앙 정렬
      md:ml-auto: 데스크톱에서 오른쪽 정렬 
      md:mx-0: 데스크톱에서 중앙 정렬 해제
  */}
  <div className="mx-auto w-full max-w-md md:ml-auto md:mx-0">
    <h2 className="mb-2 text-center text-3xl font-bold text-[#1B2A4A] md:text-left">
      로그인
    </h2>
    
    {/* 모바일 가독성을 위해 설명글 추가 (선택사항) */}
    <p className="mb-8 text-center text-sm text-gray-500 md:text-left">
      현장 안전 상태를 실시간으로 모니터링하세요.
    </p>

    {/* 입력 폼 */}
    <form 
     onSubmit={handleSubmit}

    className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#1B2A4A]">아이디</label>
        <input
          type="text"
         name="username"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디를 입력해주세요"
          className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 outline-none transition-all focus:border-[#F26522] focus:ring-4 focus:ring-[#F26522]/5"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#1B2A4A]">비밀번호</label>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            value={password}
               name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 outline-none transition-all focus:border-[#F26522] focus:ring-4 focus:ring-[#F26522]/5"
          />
          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {showPw ? <EyeOffIcon /> : <EyeOpenIcon />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 h-14 w-full rounded-xl bg-[#F26522] text-lg font-bold text-white shadow-lg shadow-[#F26522]/30 transition-all hover:bg-[#d95a1a] active:scale-[0.98]"
      >
        로그인
      </button>

     
    </form>
  
   <div 
   
     onClick={() => navigate("/enroll")}
   className="flex items-center justify-end pt-2">
        {/* 로그인 상태 유지 추가 (모바일에서 유용) */}
       
        <button className="text-sm font-bold text-[#1B2A4A] underline decoration-2 underline-offset-4">
          회원가입
        </button>
      </div>
  
  </div>
</div>
        </div>


    </div>
  
);

}