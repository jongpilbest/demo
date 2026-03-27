import React from 'react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="
            mt-10
            max-w-4xl mx-auto bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                
                {/* 상단 헤더 영역 */}
                <div className="px-6 py-8 sm:px-12 sm:pt-12 sm:pb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">서비스 이용약관</h1>
                    <div className="flex items-center text-sm text-slate-400">
                        <span>시행일: 2026-03-24</span>
                        <span className="mx-3 text-slate-300">|</span>
                        <span>버전: v1.0</span>
                    </div>
                </div>

                {/* 구분선 */}
                <hr className="border-slate-100 mx-6 sm:mx-12" />

                {/* 본문 영역 */}
                <div className="px-6 py-8 sm:px-12 sm:py-10 space-y-10">
                    
                    {/* 인트로 메인 타이틀 */}
                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-2">ASIN CNT 스마트계측플랫폼 서비스 이용약관</h2>
                    </section>

                    {/* 제1조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제1조 (목적)</h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">
                            이 약관은 ASIN CNT(이하 "회사")가 제공하는 스마트계측플랫폼 서비스(이하 "서비스")의 이용 조건 및 절차, 회사와 이용자의 권리·의무를 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    {/* 제2조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제2조 (서비스 내용)</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>현장 센서 데이터 수집 및 모니터링</li>
                            <li>계측 데이터 시각화 (차트, 지도, 3D)</li>
                            <li>알림 및 경보 서비스</li>
                            <li>보고서 생성 및 관리</li>
                        </ul>
                    </section>

                    {/* 제3조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제3조 (계정 관리)</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>계정은 건설사(구독사) 총관리자가 생성하며, 초기 비밀번호는 별도 채널로 전달합니다.</li>
                            <li>이용자는 최초 로그인 시 비밀번호를 변경해야 합니다.</li>
                            <li>비밀번호는 8자 이상, 영문 대·소문자, 숫자, 특수문자를 포함해야 합니다.</li>
                            <li>이용자는 자신의 계정 정보를 안전하게 관리할 의무가 있습니다.</li>
                        </ul>
                    </section>

                    {/* 제4조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제4조 (이용자의 의무)</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>타인의 계정을 부정하게 사용하지 않아야 합니다.</li>
                            <li>서비스를 통해 얻은 정보를 무단으로 외부에 유출하지 않아야 합니다.</li>
                            <li>관련 법령 및 이 약관의 규정을 준수해야 합니다.</li>
                        </ul>
                    </section>

                    {/* 제5조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제5조 (서비스 중단)</h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">
                            회사는 시스템 점검, 장비 보수, 천재지변 등의 사유로 서비스 제공을 일시적으로 중단할 수 있으며, 이 경우 사전 공지합니다.
                        </p>
                    </section>

                    {/* 제6조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제6조 (면책)</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</li>
                            <li>회사는 천재지변 등 불가항력적 사유로 인한 서비스 중단에 대하여 책임을 지지 않습니다.</li>
                        </ul>
                    </section>

                    {/* 제7조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제7조 (약관 변경)</h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">
                            회사는 약관을 변경할 경우 시행일 7일 전 플랫폼 내 공지를 통해 사전 안내합니다.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}