'use client';
import { useRef, useEffect, useState } from 'react';

const logos = [
    { name: '한국가스공사', src: '/assets/parnerlogo_1-BW_R_aWv.svg' },
    { name: '국토교통부', src: '/assets/parnerlogo_2-CxF7em_o.svg' },
    { name: '한국도로공사', src: '/assets/parnerlogo_3-BaTghd4M.svg' },
    { name: '행정안전부', src: '/assets/parnerlogo_4-DSyE2Hd5.svg' },
];

const duplicated = [...logos, ...logos];

export default function ClientsSection({ children }: { children: React.ReactNode }) {


    return (
        <section className=" bg-white overflow-hidden pt-14" id="clients">
            <div className="max-w-[1240px] mx-auto px-6 lg:px-8 mb-10">

                {/* Header */}
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3">
                    파트너
                </span>
                <h2 className="text-[clamp(26px,3.5vw,40px)] font-black leading-tight tracking-tight text-slate-900">
                    공공기관부터 대형 건설사까지,
                    <br />
                    안전을 함께 만들어갑니다
                </h2>
            </div>
            {children}
        </section>
    );
}