import React from 'react'

export default function HeroSection() {



  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/asin_brochure.pdf";
    link.download = "asin_brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




    return (

        <section className="min-h-screen bg-orange-50 flex items-center pt-16 relative overflow-hidden">
            {/* Glow effects */}
            <div className="absolute -top-36 -right-24 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.09)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute -bottom-20 -left-16 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-[1240px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center relative z-10 py-10">

                {/* LEFT */}
                <div>
                    <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-3 mb-6 shadow-sm shadow-orange-100">

                        <span className="text-xs text-orange-500 font-semibold">굴착공사장 계측관리 기술의 디지털 전환</span>
                    </div>

                    <h1 className="text-[clamp(34px,4.5vw,54px)] font-black leading-[1.12] tracking-tight text-slate-900 mb-5">
                        <span className="block">스마트 계측</span>
                        <span className="block">현장 안전 상태</span>
                        <span className="block text-orange-500">플랫폼</span>
                    </h1>

                    <p className="text-base leading-[1.9] text-slate-500 mb-9">
                        IoT 센서를 사용하고, 스마트 계측 플랫폼을 통해 구조물 안전상태를 스스로 진단하여,
                        사용자에게 위험을 알리는 의사결정을 지원합니다.
                    </p>

                    <div className="flex gap-3 flex-wrap mb-12">
                        <a  target="_blank" rel="noopener noreferrer">
                            <button 
                            onClick={()=>alert("준비중입니다.")}
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-lg text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/40">
                                데모 체험하기
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </a>
                        <button 
                        
                        onClick={handleDownload}
                        className="bg-white text-slate-900 border border-slate-300 hover:border-slate-900 px-7 py-3.5 rounded-lg text-[15px] font-semibold transition-all">
                            브로셔 다운로드
                        </button>
                    </div>

                    <div className="flex bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        {[
                            { n: '400', em: '+', label: '누적 센서 운영' },
                            { n: '24', em: 'H', label: '실시간 모니터링' },
                            { n: '30', em: '+', label: '계측 운영 사례' },
                            { n: '14', em: 'Y', label: '설계·계측 경험' },
                        ].map((s, i, arr) => (
                            <div key={s.label} className={`flex-1 py-5 px-4 text-center ${i < arr.length - 1 ? 'border-r border-slate-200' : ''}`}>
                                <div className="text-2xl font-black text-slate-900 leading-none">
                                    {s.n}<em className="text-orange-500 not-italic">{s.em}</em>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Dashboard mockup */}
                <div className="hidden lg:block relative p-8">
                    <img src='/assets/new_header.svg' alt="Dashboard Mockup" />

                </div>
            </div>
        </section>
    )
}
