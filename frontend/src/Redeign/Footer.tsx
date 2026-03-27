const certs = ['ISO 9001', '벤처기업', 'KC인증', '이노비즈'];
import {  useNavigate } from "react-router-dom";
export default function Footer() {
    // 임시 onClick 핸들러
   
    const navigate= useNavigate();


    return (
        <footer className="bg-slate-900 px-6 lg:px-16 pt-12 pb-7">
            <div className="max-w-[1240px] mx-auto">

                {/* Top */}
                <div className=" border-b border-white/10">
                    <span className="block text-[15px] font-bold text-white mb-3">
                        아신씨엔티 (ASIN CNT)
                    </span>
                    <p className="text-[13px] text-white/60 leading-[1.9]">
                        경기 시흥시 봉우재로 175번길 19<br />
                        아신빌딩 3층 [15047]<br />
                        <br />
                    </p>
                </div>

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pt-5">
                    
                    {/* 약관 및 카피라이트 묶음 */}
                    <div className="flex flex-col gap-2.5">
                        
                        {/* 📌 새로 추가된 개인정보처리방침 / 이용약관 영역 */}
                        <div className="flex items-center gap-2 text-[13px] text-white/80 font-medium">
                            <button 
                                  onClick={() => window.open('/policy/terms', '_blank')}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                개인정보처리방침
                            </button>
                            <span className="text-white/30 text-[11px]">|</span>
                            <button 
                                onClick={() => window.open('/policy/terms', '_blank')}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                이용약관
                            </button>
                        </div>

                        <p className="text-xs text-white/50">
                           Copyright © ASINCNT LIFE CARE. All Rights Reserved
                        </p>
                    </div>

                    <div className="flex gap-2 flex-wrap sm:mb-1">
                        {certs.map((c) => (
                            <span
                                key={c}
                                className="text-[11px] text-white/30 bg-white/5 rounded px-2 py-0.5"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}