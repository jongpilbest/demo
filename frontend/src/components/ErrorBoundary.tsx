import React, { Component, ErrorInfo, ReactNode } from "react";
// 1. Props에 onRetry(리셋 함수) 추가
interface Props {
  children: ReactNode;
  onRetry?: () => void; // 💡 React Query의 reset 함수를 받을 자리
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryKey: number;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    retryKey: 0,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, retryKey: 0 };
  }

  componentDidCatch(error: Error) {
    console.error("Caught by ErrorBoundary:", error.message);
  }

  // 2. 다시 시도 로직 수정
  handleRetry = () => {
    // 💡 부모가 reset 함수를 줬다면 여기서 실행! (React Query 에러 캐시 삭제)
    if (this.props.onRetry) {
      this.props.onRetry();
    }

    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryKey: prev.retryKey + 1, // 컴포넌트 강제 재마운트
    }));
  };

  render() {
    const { hasError, retryKey } = this.state;

    if (hasError) {
      return (
        <div className="flex min-h-[400px] w-full items-center justify-center p-6 text-center">
          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
            <div className="mb-4 text-5xl">⚠️</div>
            <h2 className="mb-2 text-xl font-bold text-gray-800">문제가 발생했습니다</h2>
            <p className="mb-6 text-sm text-gray-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
            <button
              onClick={this.handleRetry} // 💡 수정된 handleRetry 실행
              className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-all active:scale-[0.98]"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={retryKey} className="contents">
        {this.props.children}
      </div>
    );
  }
}