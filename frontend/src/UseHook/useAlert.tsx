// useAlert.ts
import toast from "react-hot-toast";

export const useAlert = () => {
    // 공통 스타일 정의 (여기서 수정하면 전체 알람 디자인이 바뀝니다!)
    const commonStyle = {
        borderRadius: '16px',        // 모서리도 조금 더 둥글게 해서 부드러운 느낌
        background: '#333',
        color: '#fff',
        fontSize: '17px',            // 14px -> 17px로 확대 (가독성 UP)
        fontWeight: '500',           // 글자 두께도 살짝 추가
        padding: '16px 28px',        // 상하좌우 여백을 넓혀서 덩어리감 키움
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // 그림자도 더 깊게
        minWidth: '320px',           // 너무 짤막하지 않게 최소 너비 고정
        lineHeight: '1.5',           // 줄 간격 추가로 답답함 해소
    };

    const success = (msg: string) =>
        toast.success(msg, {
            style: commonStyle,
            iconTheme: {
                primary: '#fff',
                secondary: '#333',
            },
        });

    const error = (msg: string) =>
        toast.error(msg, {
            style: {
                ...commonStyle,
                background: '#ff4b4b', // 에러는 강렬한 레드
            },
        });



    const loading = (msg: string) => {
        toast.loading(msg, {
            style: {
                ...commonStyle,
                background: '#FFD000', // 에러는 강렬한 레드
            },
        })
    }

    return { success, error, loading };
};