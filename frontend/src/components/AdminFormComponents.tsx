import React from 'react'
import { useState } from 'react';
import { useDeleteQAQuery } from '@/query/useQAquery';
import { MessageSquarePlus } from 'lucide-react';
import Admin_Components from '@/sections/Q_A/Admin_Components';
import { type QAItem } from '@/type/Qa/Qa_type'



export default function AdminFormComponents({item}: {item:QAItem}) {
const { mutate, isPending } = useDeleteQAQuery();

// 삭제하기함수 : 현재 admin만 가능하게됨 --> 함수 여기를 외부로 뽑기, 나머지 componen t는 re-usable 하게 수정하기 


   const[admintoggle,setadmintoggle]= useState(false);

if(isPending) return  <div> 데이터 로딩중... </div>

  //함수 

  return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 text-xs font-semibold tracking-wide text-gray-400">
                관리자 기능
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      mutate(item.id);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    <MessageSquarePlus size={18} />
                    질문 삭제하기
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setadmintoggle((el) => !el);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-100"
                  >
                    <MessageSquarePlus size={18} />
                    답변 작성하기
                  </button>
                </div>

                {admintoggle && (
                  <div className="pt-2">
                    <Admin_Components
                       text={""}
                      id={item.id}
                      item={`${item.id}-${"QA"}-Admin`}
                    />
                  </div>
                )}
              </div>
            </div>
  )
}
