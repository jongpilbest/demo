import { type QAItem } from '@/type/Qa/Qa_type';
import { useCallback, useState } from 'react';
import { usePermission } from "@/context/PermissionContext";
import Admin_Components from '@/sections/Q_A/Admin_Components';
import { PencilIcon, ChevronDown } from 'lucide-react';
import Form_Type from './Form_Type';
import { formatDate } from '@/lib/date_utils';
import { useAdminCheckMutation } from '@/query/useQAquery';
import { memo } from 'react';


interface StatusBadgeProps {
  status: boolean;      // true 인지 false 인지
  trueLabel: string;    // true 일 때 보여줄 글자 (예: "답변완료")
  falseLabel: string;   // false 일 때 보여줄 글자 (예: "답변대기")
}



type Props = {
  item: QAItem;
};





export default memo(function FormComponent({ item }: Props) {
 
  
  const [isOpen, setIsOpen] = useState(false);
  const answerstate = item.answerState;

  // console.log(item) 제거 - 불필요한 로그


  //관리자가 권환을 체크하고 같은 component 에서 다른 로직을 수행함. 
  const { canAnswer } = usePermission();
  const canAdmin = canAnswer("BOARD_QNA");
  const [isEditMode, setIsEditMode] = useState(false);
  const { mutate: adminCheck } = useAdminCheckMutation();


  const check_is_amdin_check = useCallback((id: number) => {
  // 1. 아코디언이나 모달 열기/닫기
  setIsOpen((open) => !open);


  // 2. 관리자 권한이 있고(canAdmin), 아직 읽지 않은 상태(!item.isAdminRead)일 때만 실행
  // * 조건문은 프로젝트 로직에 맞게 조정하세요 (보통 관리자일 때만 API를 쏩니다)

  if (canAdmin && !item.adminRead) {
    try {
      adminCheck(id);
      // 팁: 성공 시 프론트에서도 상태를 바로 업데이트해주면 더 좋음
      // item.isAdminRead = true; (상위 state 변경 로직 권장)
      console.log("관리자 읽음 상태 업데이트 성공");
    } catch (e) {
      console.error("관리자 읽음 상태 업데이트 실패", e);
    }
  }
}, [canAdmin, item?.isAdminRead]); 





  return (
    <div

      className="border-b border-gray-200 bg-white">
      {/* 1. 요약 행 (Summary Row) */}
      <div
        onClick={() => check_is_amdin_check(item.id)}
        className={`grid grid-cols-12 items-center px-6 py-5 cursor-pointer transition ${isOpen ? "bg-gray-50" : "hover:bg-gray-50"
          }`}
      >
        <div className="col-span-1 text-sm text-gray-400">{item.id}</div>
        <div className="col-span-2 flex flex-col gap-2">
          <div>
                  <StatusBadge 
  status={item.answerState} 
  trueLabel="답변완료" 
  falseLabel="답변대기" 
/>
          </div>
           <div>
    <StatusBadge 
  status={item.adminRead} 
  trueLabel="관리자확인" 
  falseLabel="답변대기" 
/>
            </div>


        </div>
        <div className="col-span-2 text-sm font-medium text-gray-800 truncate">{item.category}</div>
        <div className="col-span-4 text-sm text-gray-700 truncate pr-4">{item.title}</div>
          <div className="col-span-1 text-sm text-gray-400">{item.username}</div>
        <div className="col-span-1 text-sm text-gray-400">{formatDate(item.createdDate)}</div>
        <div className="col-span-1 flex justify-end">
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* 2. 상세 내용 (Detail Section) */}
      {isOpen && (
        <div className="p-5 space-y-4">
          {/* 문의 내용 영역 */}
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">문의 내용</p>
            <p className="text-sm leading-6 text-gray-700 whitespace-pre-line">{item.content}</p>
          </div>



          {answerstate && (
            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-semibold text-orange-600 uppercase">관리자 답변</p>
                {canAdmin && (
                  <button
                    onClick={() => setIsEditMode((el) => !el)}
                    className="flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
                  >
                    <PencilIcon className="h-3 w-3" />
                    {isEditMode ? "수정 취소" : "수정"}
                  </button>
                )}
              </div>
              <p className="text-sm leading-6 text-gray-700 whitespace-pre-line">{item.answer}</p>
              {isEditMode &&
                <Admin_Components
                  id={item.id}
                  text={item.answer}
                  item={`${item.id}-QA-Admin`}
                />

              }

            </div>

          )}



          <Form_Type item={item}></Form_Type>







        </div>


      )}

    </div>
  );
});






// 작은 하위 컴포넌트로 분리 (가독성 향상)
// 이거 돌려 사용하기 
const StatusBadge = memo(function StatusBadge({ status, trueLabel, falseLabel }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        status 
          ? "bg-orange-100 text-orange-700"  // true일 때 디자인 (주황색)
          : "bg-gray-100 text-gray-600"     // false일 때 디자인 (회색)
      }`}
    >
      {/* 상태에 따라 전달받은 문구를 출력 */}
      {status ? trueLabel : falseLabel}
    </span>
  );
});