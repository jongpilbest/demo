import { type QAItem } from '@/type/Qa/Qa_type';
import { Children, useState, type ReactNode } from 'react';
import { usePermission } from "@/context/PermissionContext";
import AdminFormComponents from './AdminFormComponents';
import Admin_Components from '@/sections/Q_A/Admin_Components';
import { PencilIcon, ChevronDown } from 'lucide-react';
import Form_Type from './Form_Type';

type Props = {
  item: QAItem;
};

export default function FormComponent({ item }: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const answerstate = item.answerState;
  const { canAnswer } = usePermission();
  const canAdmin = canAnswer("BOARD_QNA");
  const [isEditMode, setIsEditMode] = useState(false);


  return (
    <div

      className="border-b border-gray-200 bg-white">
      {/* 1. 요약 행 (Summary Row) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`grid grid-cols-12 items-center px-6 py-5 cursor-pointer transition ${isOpen ? "bg-gray-50" : "hover:bg-gray-50"
          }`}
      >
        <div className="col-span-1 text-sm text-gray-400">{item.id}</div>
        <div className="col-span-2">
          <StatusBadge isAnswered={item.answerState} />
        </div>
        <div className="col-span-2 text-sm font-medium text-gray-800 truncate">{item.category}</div>
        <div className="col-span-4 text-sm text-gray-700 truncate pr-4">{item.title}</div>
        <div className="col-span-2 text-sm text-gray-400">2026-01-04</div>
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
}

// 작은 하위 컴포넌트로 분리 (가독성 향상)
function StatusBadge({ isAnswered }: { isAnswered: boolean }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${isAnswered ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"
      }`}>
      {isAnswered ? "답변완료" : "답변대기"}
    </span>
  );
}