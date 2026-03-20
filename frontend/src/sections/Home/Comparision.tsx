type PillType = 'red' | 'green' | 'orange' | 'none';

interface Row {
    label: string;
    existing: { text: string; pill: PillType };
    smart: { text: string; pill: PillType };
}

const rows: Row[] = [
    { label: '데이터 수집', existing: { text: '수동 수집', pill: 'red' }, smart: { text: '자동 수집', pill: 'green' } },
    { label: '분석 방식', existing: { text: '전문가 분석', pill: 'none' }, smart: { text: 'AI 기반 자동 분석', pill: 'orange' } },
    { label: '보고서 생성', existing: { text: '엑셀 수작업', pill: 'red' }, smart: { text: '실시간 자동 생성', pill: 'green' } },
    { label: '오류 리스크', existing: { text: '높음', pill: 'red' }, smart: { text: '최소화', pill: 'green' } },
    { label: '운영 시간', existing: { text: '시간 지연', pill: 'none' }, smart: { text: '24시간 자동화', pill: 'green' } },
    { label: '보고서 작성', existing: { text: '지연 발생', pill: 'red' }, smart: { text: '즉시 결과 제공', pill: 'green' } },
];

const pillStyles: Record<PillType, string> = {
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-50 text-orange-500',
    none: '',
};

function Cell({ text, pill, type }: { text: string; pill: PillType; type: 'ev' | 'sv' }) {
    const base = 'px-5 py-4 text-[13px] flex items-center justify-center';
    const color = type === 'sv' ? 'text-blue-700 font-semibold' : 'text-slate-500';

    return (
        <div className={`${base} ${color}`}>
            {pill !== 'none' ? (
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${pillStyles[pill]}`}>
                    {text}
                </span>
            ) : (
                text
            )}
        </div>
    );
}

export default function ComparisonSection() {
    return (
        <section className="py-20 px-6 lg:px-16 bg-slate-50" id="comparison">
            <div className="max-w-[1240px] mx-auto">

                {/* Header */}
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-500 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-3">
                    비교 분석
                </span>
                <h2 className="text-[clamp(26px,3.5vw,40px)] font-black leading-tight tracking-tight text-slate-900 mb-3">
                    동일한 비용, 더 높은 효율
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-500 max-w-[520px] mb-12">
                    기존 계측관리 방식 대비 스마트 계측 플랫폼이 가져오는 실질적인 변화
                </p>

                {/* Table */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">

                    {/* Head */}
                    <div className="grid grid-cols-[1.2fr_1fr_1fr]">
                        <div className="bg-slate-50 px-5 py-4" />
                        <div className="bg-slate-200 px-5 py-4 text-[14px] font-bold text-slate-600 text-center">
                            기존 계측관리 방식
                        </div>
                        <div className="bg-slate-900 px-5 py-4 text-[14px] font-bold text-white text-center">
                            스마트 계측 플랫폼
                        </div>
                    </div>

                    {/* Rows */}
                    {rows.map((row) => (
                        <div
                            key={row.label}
                            className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                            {/* Label */}
                            <div className="px-5 py-4 text-[13px] font-semibold text-slate-900 bg-slate-50 flex items-center">
                                {row.label}
                            </div>
                            <Cell text={row.existing.text} pill={row.existing.pill} type="ev" />
                            <Cell text={row.smart.text} pill={row.smart.pill} type="sv" />
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}