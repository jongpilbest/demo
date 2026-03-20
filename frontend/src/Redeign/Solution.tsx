'use client';
import { useState } from 'react';

const probData = [
    {
        badge: '⚠ 사고 위험',
        badgeStyle: 'bg-red-50 text-red-600',
        title: '인력 중심의 수동 계측',
        desc: '수동 계측은 측정과 분석이 분리되어 공사장의 안전상태 변화를 빠르게 확인하기 어렵습니다.',
        stat: '40%',
        sl: '데이터\n유실 가능성',
        img: '/assets/asset_1.png',
        alt: '인력 계측 현장',
    },
    {
        badge: '⚠ 데이터 손실',
        badgeStyle: 'bg-orange-50 text-orange-500',
        title: '수동, 자동계측의 통합불능',
        desc: '수동계측은 보고서 중심, 자동계측은 센서 중심으로 운영되어 동일 현장에서 계측 효율성은 낮습니다.',
        stat: '1,000+',
        sl: '연간 관련\n안전 사고',
        img: '/assets/asset_2.png',
        alt: '터널 공사 현장',
    },
    {
        badge: '⚠ 대응 지연',
        badgeStyle: 'bg-blue-50 text-blue-600',
        title: '안전상태 판단 불가',
        desc: '관리 기준값 중심의 계측 관리는 시설물 안전상태 확인을 위해 별도 분석 과정이 필요해 빠른 현장 대응이 어렵습니다.',
        stat: '수 시간',
        sl: '사고 인지\n소요 시간',
        img: '/assets/asset_3.png',
        alt: '현장 보고서',
    },
];

export default function ProblemSection() {
    const [active, setActive] = useState(0);
    // closing: 패널 닫히는 중 (300ms transition용)
    const [closing, setClosing] = useState(false);
    const [displayed, setDisplayed] = useState(0); // 실제 패널에 표시되는 데이터 인덱스

    function handleClick(i: number) {
        if (i === active) return;

        // 1. 패널 닫기 시작
        setClosing(true);

        setTimeout(() => {
            // 2. 내용 교체 + 새 슬롯으로 이동
            setDisplayed(i);
            setActive(i);
            setClosing(false);
        }, 300);
    }

    const d = probData[displayed];

    return (
        <section className="py-20 px-6 lg:px-16 bg-white" id="problem">
            <div className="max-w-[1240px] mx-auto">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
                    <div className="max-w-[450px]">
                        <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3">
                            문제점
                        </span>
                        <h2 className="text-[clamp(26px,3.5vw,40px)] font-black leading-tight tracking-tight text-slate-900">
                            첨단 AI 시대, 계측 관리 <br />
                            아직도 이런 방식입니까?
                        </h2>
                    </div>

                </div>

                {/* Grid — 원본과 동일하게 flex + transition으로 슬롯 크기 변화 */}
                <div className="flex gap-3 h-[260px]">
                    {probData.map((item, i) => (
                        <div
                            key={i}
                            className="flex min-w-0 overflow-hidden"
                            style={{
                                flex: active === i ? '2.2 1 0' : '1 1 0',
                                transition: 'flex 0.45s cubic-bezier(.4,0,.2,1)',
                            }}
                        >
                            {/* 이미지 */}
                            <div
                                className="relative cursor-pointer overflow-hidden rounded-2xl min-w-0"
                                style={{
                                    flex: active === i ? '1.25 1 0' : '1 1 0',
                                    transition: 'flex 0.4s cubic-bezier(.4,0,.2,1)',
                                }}
                                onClick={() => handleClick(i)}
                            >
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    className={`w-full h-full object-cover block transition-all duration-300
                    ${active === i ? 'brightness-95' : 'brightness-75'}
                    hover:brightness-90 hover:scale-[1.03]`}
                                    style={{ transition: 'filter 0.3s, transform 0.35s' }}
                                />
                                <div className="absolute bottom-3 left-3.5 text-white text-xs font-semibold pointer-events-none drop-shadow">
                                    {item.title}
                                </div>
                            </div>

                            {/* 패널 — 선택된 슬롯에만 표시, opacity로 fade */}
                            {active === i && (
                                <div
                                    className="flex flex-col justify-between bg-white border border-slate-200 rounded-2xl overflow-hidden ml-3 flex-shrink-0 w-[320px] p-6"
                                    style={{
                                        opacity: closing ? 0 : 1,
                                        transition: 'opacity 0.3s',
                                    }}
                                >
                                    <div className="flex flex-col gap-2.5">
                                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${d.badgeStyle}`}>
                                            {d.badge}
                                        </span>
                                        <div className="text-base font-bold text-slate-900 leading-snug">
                                            {d.title}
                                        </div>
                                        <div className="text-sm leading-[1.7] text-slate-500">
                                            {d.desc}
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center gap-2">
                                        <div className="text-xl font-black text-slate-900">{d.stat}</div>
                                        <div className="text-[10px] text-slate-400 leading-snug whitespace-pre-line">
                                            {d.sl}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}