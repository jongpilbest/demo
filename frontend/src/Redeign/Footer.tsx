const certs = ['ISO 9001', '벤처기업', 'KC인증', '이노비즈'];

export default function Footer() {
    return (
        <footer className="bg-slate-900 px-6 lg:px-16 pt-12 pb-7">
            <div className="max-w-[1240px] mx-auto">

                {/* Top */}
                <div className="pb-10 border-b border-white/10">
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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-5">
                    <p className="text-xs text-white/50">
                        © 2025 ASIN CNT Co., Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-2 flex-wrap">
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