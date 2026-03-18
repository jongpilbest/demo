import { useAuth } from '@/context/AuthContext';
import type { QAItem } from '@/type/Qa/Qa_type';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormComponent from '@/components/FormComponent';
export default function Form_Same_Component({ data, text, Create_answer_state, key }: { data: QAItem[], text?: string, Create_answer_state: boolean }) {

  const navigate = useNavigate();
  const { user } = useAuth();
  //createQna : User 만 사용할수 있다.

  // 데이터가 없을때 , 사용자에게 보여줄 화면



  const IsUser = user?.role?.roleName == "USER" ? true : false;


  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between px-4 py-6 border-b">
        <h3 className="text-2xl  font-semibold text-gray-800">
          {text}
        </h3>
        {Create_answer_state &&
          <button
            onClick={() => navigate('/write')}
            className="text-sm px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            영업팀에 문의하기
          </button>
        }

      </div>

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-12 px-8 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wide bg-gray-50">
        <div className="col-span-1">No</div>
        <div className="col-span-2"></div>
        <div className="col-span-2">문의유형</div>
        <div className="col-span-3">제목</div>

        <div className="col-span-2 text-right">작성일</div>
      </div>
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 px-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/30">
          {/* 아이콘 영역 */}
          <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 ring-8 ring-gray-50">
            <span className="text-5xl" role="img" aria-label="empty note">📝</span>
          </div>

          {/* 텍스트 영역 */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">데이터가 없습니다</h3>
            <p className="text-gray-500">
              새로 업데이트 된 문의 사항이  아직 없네요. <br />

            </p>
          </div>


        </div>
      )}

      {/* 리스트 */}
      {data.length > 0 && data.map((item, index) => (
        <FormComponent item={item} keyname={`form-${index}-${key}`}></FormComponent>

      ))}
    </div>
  )
}
