const solutions = [
    {
        n: '01',
        ico: '📡',
        title: '수동·자동 스마트계측\n데이터 통합 관리',
        desc: '모든 현장의 수동·자동 계측 데이터를 통합 연계하여 현장 위치·안전상태·센서 현황을 통합적으로 확인합니다.',
        card: 'bg-orange-500 hover:shadow-orange-200',
        num: 'text-white',
        ico_bg: 'bg-white/20',
        title_c: 'text-white',
        desc_c: 'text-white/70',
    },
    {
        n: '02',
        ico: '📈',
        title: '실시간 데이터 기반\n안전상태 분석 및 평가',
        desc: '실시간 계측데이터를 활용해 흙막이 구조물의 부재 안전상태를 즉시 평가하고, 1·2·3차 관리기준 초과 여부를 즉각 확인합니다.',
        card: 'bg-slate-50 border border-slate-200',
        num: 'text-slate-900',
        ico_bg: 'bg-white shadow-sm',
        title_c: 'text-slate-900',
        desc_c: 'text-slate-500',
    },
    {
        n: '03',
        ico: '🔬',
        title: '통계 기반의\n데이터 신뢰성 분석',
        desc: '정상·비정상 변동 패턴을 학습하여 데이터 이상값을 필터링하고, 시계열 변동 패턴 분석으로 계측 데이터의 신뢰도를 높입니다.',
        card: 'bg-slate-50 border border-slate-200',
        num: 'text-slate-900',
        ico_bg: 'bg-white shadow-sm',
        title_c: 'text-slate-900',
        desc_c: 'text-slate-500',
    },
    {
        n: '04',
        ico: '🤖',
        title: 'AI 기반 위험 분석 및\n보고서 생성',
        desc: 'AI 기반 위험 경보 관리로 이상 징후를 즉시 감지하고, 계측 보고서 자동 생성으로 현장 관리 업무를 간소화합니다.',
        card: 'bg-slate-900',
        num: 'text-white',
        ico_bg: 'bg-white/10',
        title_c: 'text-white',
        desc_c: 'text-white/70',
    },
];

export default function SSSolutionSection() {
    return (
        <section className="py-20 px-6 lg:px-16 bg-white" id="solution">
            <div className="max-w-[1240px] mx-auto">

                {/* Header */}
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3">
                    솔루션
                </span>
                <h2 className="text-[clamp(26px,3.5vw,40px)] font-black leading-tight tracking-tight text-slate-900 mb-3">
                    스마트 계측 플랫폼으로
                    <br />
                    계측관리 패러다임을 바꿉니다
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-500 max-w-[520px] mb-12">
                    정밀 센서부터 AI 예측 분석까지, 고객이 한눈에 안전을 확인하기 위한 기술
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {solutions.map((s) => (
                        <div
                            key={s.n}
                            className={`relative rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${s.card}`}
                        >
                            {/* 배경 숫자 */}
                            <span className={`absolute bottom-3 right-4 text-[68px] font-black leading-none opacity-[0.08] select-none ${s.num}`}>
                                {s.n}
                            </span>

                            {/* 아이콘 */}
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${s.ico_bg}`}>
                                {s.ico}
                            </div>

                            {/* 텍스트 */}
                            <h3 className={`text-base font-bold leading-snug mb-2 whitespace-pre-line ${s.title_c}`}>
                                {s.title}
                            </h3>
                            <p className={`text-[13px] leading-[1.75] ${s.desc_c}`}>
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}