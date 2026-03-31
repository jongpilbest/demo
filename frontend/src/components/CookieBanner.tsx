"use client";
import Logo from './../../public/assets/Companylogo.svg'

import { useState, useEffect } from "react";

type CookiePreferences = {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "asin_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) {
      setTimeout(() => setVisible(true), 600);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(
      COOKIE_KEY,
      JSON.stringify({ prefs, date: new Date().toISOString() })
    );
    setVisible(false);
  };

  const acceptAll = () => {
    const all: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(all);
    saveConsent(all);
  };

  const rejectOptional = () => {
    const minimal: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(minimal);
    saveConsent(minimal);
  };

  const saveSelected = () => {
    saveConsent(preferences);
  };

  const toggle = (key: keyof CookiePreferences) => {
    if (key === "essential") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!visible) return null;

  const cookies: {
    key: keyof CookiePreferences;
    label: string;
    desc: string;
    required: boolean;
    badge: string;
    badgeColor: string;
  }[] = [
    {
      key: "essential",
      label: "필수 쿠키",
      desc: "세션 유지, 로그인 상태 관리 등 서비스 제공에 반드시 필요합니다.",
      required: true,
      badge: "동의 불필요",
      badgeColor: "bg-slate-100 text-slate-500",
    },
    {
      key: "functional",
      label: "기능 쿠키",
      desc: "언어, 테마 등 사용자 설정을 저장하여 편의성을 높입니다.",
      required: false,
      badge: "동의 권장",
      badgeColor: "bg-orange-50 text-orange-500",
    },
    {
      key: "analytics",
      label: "분석 쿠키",
      desc: "Google Analytics 등으로 방문자 통계를 수집합니다.",
      required: false,
      badge: "동의 필요",
      badgeColor: "bg-blue-50 text-blue-500",
    },
    {
      key: "marketing",
      label: "마케팅 쿠키",
      desc: "광고 타겟팅에 활용됩니다.",
      required: false,
      badge: "동의 필요",
      badgeColor: "bg-blue-50 text-blue-500",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-5xl mb-4 px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1a2a4a] via-[#F97316] to-[#1a2a4a]" />

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  {/* Logo mark */}
                
                   <img src={Logo}></img>
               
                  <div>
                 
                    <h2 className="text-lg font-bold text-[#1a2a4a] leading-tight">
                      쿠키 사용 안내
                    </h2>
                  </div>
                </div>

                <button
                  onClick={rejectOptional}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  aria-label="닫기"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="text-md text-slate-500 leading-relaxed mb-6">
                홈페이지 첫 방문 시 쿠키 동의 배너를 표시합니다. 쿠키를 통해 서비스 품질을 개선하고
                맞춤형 경험을 제공합니다. 아래에서 원하시는 항목을 선택하거나 전체 동의하실 수 있습니다.
              </p>

              {/* Detailed toggle */}
              {showDetail && (
                <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50/60 overflow-hidden divide-y divide-slate-100">
                  {cookies.map((c) => (
                    <div key={c.key} className="flex items-center gap-4 px-5 py-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-md font-semibold text-[#1a2a4a]">{c.label}</span>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                            {c.badge}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
                      </div>

                      {/* Toggle */}
                      <button
                        onClick={() => toggle(c.key)}
                        disabled={c.required}
                        className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                          preferences[c.key]
                            ? "bg-[#F97316]"
                            : c.required
                            ? "bg-slate-200 cursor-not-allowed"
                            : "bg-slate-200"
                        }`}
                        aria-checked={preferences[c.key]}
                        role="switch"
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                            preferences[c.key] ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Action row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Detail toggle */}
                <button
                  onClick={() => setShowDetail((v) => !v)}
                  className="flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors py-2 sm:py-0 sm:mr-auto"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className={`transition-transform duration-200 ${showDetail ? "rotate-180" : ""}`}
                  >
                    <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {showDetail ? "상세 설정 닫기" : "쿠키 상세 설정"}
                </button>

                {/* Reject */}
                <button
                  onClick={rejectOptional}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-150"
                >
                  필수만 허용
                </button>

                {/* Save selected (only when detail open) */}
                {showDetail && (
                  <button
                    onClick={saveSelected}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1a2a4a] border-2 border-[#1a2a4a] hover:bg-[#1a2a4a] hover:text-white transition-all duration-150"
                  >
                    선택 항목 저장
                  </button>
                )}

                {/* Accept all */}
                <button
                  onClick={acceptAll}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#F97316] hover:bg-[#ea6c0a] active:scale-95 transition-all duration-150 shadow-lg shadow-orange-200"
                >
                  전체 동의
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}