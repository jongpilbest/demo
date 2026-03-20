const histItems = [
    {
        year: '2025', accent: true,
        title: 'KICT 패밀리기업 · 혁신 프리미어 1000 선정',
        items: [
            '과학기술정보통신부 전파산업 중소기업 제품화 지원사업',
            '2025년 테스트베드 서울 실증지원사업 선정',
            'AIoT 기반 콘크리트 구조물 안정성 평가시스템 특허',
        ],
    },
    {
        year: '2024', accent: true,
        title: '안전진단전문기관 등록 · 청년 친화 강소기업',
        items: [
            '서울특별시 지반침하 관측망 구축',
            'IoT기반 시설물 안전 보험 서비스 시스템 특허',
            '이동식 사이펀 관련 특허 다수 등록',
        ],
    },
    {
        year: '2023', accent: true,
        title: '정보통신사업 등록 · Safe Signal KC인증',
        items: [
            'SK텔레콤, 현대해상 장치형보험 업무협약',
            '국토교통부 스마트건설 혁신기업 지원사업 선정',
            '앵커 하중값 자동 검출 시스템 특허',
        ],
    },
    {
        year: '2013', accent: false,
        title: '아신이엔씨 주식회사 설립',
        items: [
            'ISO 9001, ISO 10041 인증 취득',
            '토목 특화설계 기술(특수 내진설계, 지하수 유동)',
            '재난 재해 예측 기술(초기모델 개발 착수)',
        ],
    },
];

const stats = [
    { n: '400', em: '+', label: '누적 센서 운영' },
    { n: '24', em: 'H', label: '실시간 모니터링' },
    { n: '30', em: '+', label: '계측 운영 사례' },
    { n: '14', em: '년', label: '설계·계측 운영 경험' },
];

const govItems = [
    '국토교통부 국가지하안전관리 기본계획 (2024.12)',
    '서울특별시 지하안전관리에 관한 조례 (2026.02)',
    '경기도 지하안전 관리 및 유지에 관한 조례 (2025.12)',
];

export default function HistorySection() {
    return (
        <section className="py-20 px-6 lg:px-16 bg-slate-50" id="history">
            <div className="max-w-[1240px] mx-auto">

                {/* Header */}
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3">
                    회사 소개
                </span>
                <h2 className="text-[clamp(26px,3.5vw,40px)] font-black leading-tight tracking-tight text-slate-900 mb-3">
                    아신(亞信)은 「신뢰」를 기업의
                    <br />
                    최우선 가치로
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-500 max-w-[520px] mb-12">
                    2013년 설립된 토목엔지니어링 IoT 전문기업으로 14년의 설계·계측 운영 경험을 보유하고 있습니다.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

                    {/* 타임라인 */}
                    <div className="relative pl-5 border-l-2 border-slate-200">
                        {histItems.map((item, idx) => (
                            <div
                                key={item.year}
                                className={`relative pl-6 ${idx < histItems.length - 1 ? 'pb-7' : ''}`}
                            >
                                {/* dot */}
                                <span
                                    className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-slate-50 ring-2
                    ${item.accent
                                            ? 'bg-orange-500 ring-orange-200'
                                            : 'bg-slate-400 ring-slate-300'
                                        }`}
                                />
                                <div className={`text-xl font-black leading-none mb-1 ${item.accent ? 'text-orange-500' : 'text-slate-400'}`}>
                                    {item.year}
                                </div>
                                <div className="text-[13px] font-bold text-slate-900 mb-1.5">
                                    {item.title}
                                </div>
                                <ul className="space-y-0.5">
                                    {item.items.map((li) => (
                                        <li key={li} className="text-[12px] text-slate-500 leading-relaxed before:content-['·_'] before:text-orange-500">
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* 성과 카드 + 정부 박스 */}
                    <div>
                        {/* 성과 그리드 */}
                        <div className="grid grid-cols-2 gap-3.5 mb-4">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-orange-200 hover:bg-orange-50 transition-all"
                                >
                                    <div className="text-[34px] font-black text-slate-900 leading-none">
                                        {s.n}<em className="text-orange-500 not-italic">{s.em}</em>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* 정부 박스 */}
                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
                            <div className="text-xs font-bold text-orange-500 mb-3">
                                정부·지자체 권장 하는 실시간 통합 스마트 계측 플랫폼
                            </div>
                            {govItems.map((item) => (
                                <div key={item} className="flex items-start gap-2 mb-1.5 last:mb-0">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                                    <span className="text-[12px] text-slate-700 leading-snug">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}