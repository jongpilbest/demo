
import { useNavigate } from "react-router-dom";



export default function CtaSection() {

    const navigate = useNavigate();

    return (
        <div className="bg-orange-50 border-t border-orange-200 py-20 px-6 lg:px-16 text-center" id="contact">
            <h2 className="text-[clamp(26px,3vw,36px)] font-black tracking-tight text-slate-900 leading-tight mb-3">
                스마트 계측의 해답,
                <br />
                아신씨엔티가 언제든지 응답하겠습니다
            </h2>
            <p className="text-base text-slate-500 mb-8">
                30+ 계측 운영 사례와 14년의 경험을 바탕으로 최적의 솔루션을 제안드립니다.
            </p>
            <div className="flex justify-center">
                <button
                    onClick={() => navigate("/contact")}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/40">
                    문의하기 
                </button>
            </div>
        </div>
    );
}
