'use client';
import { useState } from 'react';

const fd = [
    {
        t: '수동·자동 스마트계측 통합 관리',
        d: '모든 현장의 센서 데이터를 하나의 화면에서 실시간으로 확인하고, 수동·자동 계측 데이터를 통합 관리합니다.',
        c: [
            '3차원 계측현황 정보 시각화',
            '시공상태 연계 및 단계별 모니터링',
            '무선 센서 네트워크 24시간 자동 수집',
            '클라우드 기반 정밀 계측 데이터 저장',
            '이상 발생 시 즉각 알림 (SMS·앱 푸시)',
        ],
        img: '/assets/website_1.png',
    },
    {
        t: '실시간 데이터 기반 안전상태 분석',
        d: '구조 안전성을 실시간으로 평가하고, 부재 안전 상태를 즉각 확인하여 현장 대응 시간을 최소화합니다.',
        c: [
            '구조물 안정성 자동 평가',
            '흙막이 변형률 실시간 분석',
            '1·2·3차 기준값 초과 즉시 경보',
            '이력 데이터 기반 추이 분석',
            '안전등급 자동 산출',
        ],
        img: '/assets/website_2.png',
    },
    {
        t: '통계 기반 데이터 신뢰성 분석',
        d: '정상·비정상 변동 패턴을 학습하여 센서 오류를 자동으로 감지하고 데이터 신뢰도를 높입니다.',
        c: [
            '통계적 이상치 자동 탐지',
            '상관석 분석(날씨, 공정별)',
            '센서별 데이터 특징 분석',
            '시계열 변동 분석',
            '데이터 품질 리포트 자동 생성',
        ],
        img: '/assets/website_3.png',
    },
    {
        t: 'AI 기반 위험 분석 및 보고서 생성',
        d: 'AI가 위험을 사전에 예측하고 보고서를 자동으로 생성하여 전문가 인건비와 업무 시간을 대폭 절감합니다.',
        c: [
            'AI 기반 위험 예측 모델링',
            '패턴 학습을 통한 이상 사전 감지',
            '원클릭 자동 보고서 생성',
            'PDF 출력 형식',
            '감독기관 보고 양식 자동 적용',
        ],
        img: '/assets/website_4.png',
    },
];

const tabs = ['통합 모니터링', '안전상태 평가', '데이터 분석', 'AI 보고서 생성'];

export default function Problem_Solution() {
    const [active, setActive] = useState(0);
    const cur = fd[active];

    return (
        <section className="py-20 px-6 lg:px-16 bg-slate-50" id="features">
            <div className="max-w-[1240px] mx-auto">
                {/* Header */}
                <div className="inline-block text-xs font-bold tracking-widest uppercase text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3">
                    주요 기능
                </div>
                <h2 className="text-[clamp(26px,3.5vw,40px)] font-black leading-tight tracking-tight text-slate-900 mb-3">
                    계측관리부터 실시간 안전상태
                    <br />
                    평가까지 Total Solution
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-500 max-w-lg mb-10">
                    실시간 모니터링 · 데이터 분석 · 클라우드 저장으로 현장 어디서든 즉각적인 안전 판단을 내릴 수 있습니다.
                </p>

                {/* Tabs */}
                <div className="flex gap-2 flex-wrap mb-9">
                    {tabs.map((tab, i) => (
                        <button
                            key={tab}
                            onClick={() => setActive(i)}
                            className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-all
                ${active === i
                                    ? 'bg-orange-500 text-white border-orange-500 font-semibold'
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-orange-200 hover:text-orange-500'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Text side */}
                    <div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{cur.t}</h3>
                        <p className="text-sm leading-[1.85] text-slate-500 mb-6">{cur.d}</p>
                        <div className="flex flex-col gap-3">
                            {cur.c.map((item) => (
                                <div key={item} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0 text-[10px] text-orange-500 mt-0.5">
                                        ✓
                                    </div>
                                    <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual side */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
                        <img
                            key={cur.img}
                            src={cur.img}
                            alt={cur.t}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}