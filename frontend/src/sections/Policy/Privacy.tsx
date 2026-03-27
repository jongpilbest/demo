import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans ">
            <div className="
                  mt-10
            max-w-4xl mx-auto bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                
                {/* 상단 헤더 영역 */}
                <div className="px-6 py-8 sm:px-12 sm:pt-12 sm:pb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">개인정보처리방침</h1>
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
                    
                    {/* 인트로 */}
                    <section>
                        <h2 className="text-lg font-bold text-slate-900 mb-4">ASIN CNT 스마트계측플랫폼 개인정보처리방침</h2>
                        <p className="text-slate-600 leading-relaxed text-[15px]">
                            ASIN CNT(이하 "회사")는 「개인정보보호법」에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하게 처리하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                        </p>
                    </section>

                    {/* 제1조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제1조 (처리 목적)</h3>
                        <p className="text-slate-600 mb-2 text-[15px]">회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>플랫폼 회원(계정) 관리</li>
                            <li>현장 모니터링 서비스 제공</li>
                            <li>고지사항 전달</li>
                        </ul>
                    </section>

                    {/* 제2조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제2조 (수집 항목)</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li><strong>필수 수집 항목:</strong> 이름, 아이디, 비밀번호(암호화 저장), 이메일, 소속 건설사명</li>
                            <li><strong>선택 수집 항목:</strong> 휴대폰 번호</li>
                            <li><strong>자동 수집 항목:</strong> 접속 IP, 접속 로그</li>
                        </ul>
                    </section>

                    {/* 제3조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제3조 (보유·이용 기간)</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>계정 삭제 시까지</li>
                            <li>계약 종료 후 30일 이내 파기</li>
                            <li><strong>법령 의무 보관:</strong> 접속 로그 3개월, 거래기록 5년</li>
                        </ul>
                    </section>

                    {/* 제4조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제4조 (제3자 제공)</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed">
                            회사는 원칙적으로 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 근거하는 경우는 예외로 합니다.
                        </p>
                    </section>

                    {/* 제5조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제5조 (처리 위탁)</h3>
                        <div className="overflow-x-auto mt-4 rounded-lg border border-slate-200">
                            <table className="min-w-full text-left text-[14px]">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200 w-1/3">수탁사</th>
                                        <th className="px-4 py-3 font-semibold text-slate-700">위탁 업무</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-3 text-slate-600 border-r border-slate-200 bg-white">가비아</td>
                                        <td className="px-4 py-3 text-slate-600 bg-white">클라우드서버·DB 운영, 플랫폼 인프라 운영 및 데이터 저장</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 제6조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제6조 (정보주체의 권리)</h3>
                        <p className="text-slate-600 mb-2 text-[15px]">정보주체는 다음의 권리를 행사할 수 있습니다.</p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>개인정보 열람·정정·삭제·처리정지 요구</li>
                            <li>설정 페이지의 개인정보 메뉴 또는 이메일(asin2583@daum.net)로 신청</li>
                        </ul>
                    </section>

                    {/* 제7조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제7조 (파기 절차·방법)</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>계정 삭제 즉시 전자적 방법으로 복구 불가하게 삭제</li>
                            <li>법령 보관 대상은 분리 저장 후 기간 만료 시 파기</li>
                        </ul>
                    </section>

                    {/* 제8조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제8조 (안전성 확보 조치)</h3>
                        <ul className="list-disc pl-6 text-slate-600 space-y-1.5 text-[15px]">
                            <li>비밀번호 bcrypt 암호화</li>
                            <li>HTTPS 적용</li>
                            <li>접근권한 최소화</li>
                            <li>접속기록 보관(3개월)</li>
                            <li>정기 보안 점검</li>
                        </ul>
                    </section>

                    {/* 제9조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제9조 (개인정보보호 책임자)</h3>
                        <div className="overflow-x-auto mt-4 rounded-lg border border-slate-200">
                            <table className="min-w-full text-left text-[14px]">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200 w-1/4">구분</th>
                                        <th className="px-4 py-3 font-semibold text-slate-700">내용</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="px-4 py-3 text-slate-600 border-r border-slate-200 bg-white">이메일</td>
                                        <td className="px-4 py-3 text-slate-600 bg-white font-medium text-blue-600">asin2583@daum.net</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-slate-600 border-r border-slate-200 bg-white">전화</td>
                                        <td className="px-4 py-3 text-slate-600 bg-white">031-421-2583</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 제10조 */}
                    <section>
                        <h3 className="text-[16px] font-bold text-slate-800 mb-3">제10조 (방침 변경 고지)</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed">
                            이 개인정보처리방침이 변경되는 경우 변경 시행 7일 전 플랫폼 공지 및 이메일을 통해 사전 안내합니다.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}