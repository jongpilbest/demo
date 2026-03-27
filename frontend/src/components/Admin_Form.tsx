import React from 'react'
import FormComponent from './FormComponent'
import { PencilIcon } from 'lucide-react';
import { usePermission } from '@/context/PermissionContext';
import Admin_Components from '@/sections/Q_A/Admin_Components';
import { useState } from 'react';
import AdminFormComponents from './AdminFormComponents';



import type { QAItem } from '@/type/Qa/Qa_type';
export default function Admin_Form({ item }: QAItem) {

 

  // user / admin 기능 분리는 했지만. . 해당 기능에 , admin 이 권환이 있는지 확인하는 곳

  const { canAnswer } = usePermission();

  const canAdmin = canAnswer("BOARD_QNA");

  // 대답 상태가 어떻게 되는지.
  const answerstate = item.answerState;




  // 여기서 작동 방식이 달라지는거니까 




  return (
    <>

      <div className="pt-2 border-t border-dashed border-gray-100">
        {/* 답변이 없는경우, 관리자 모드 on  */}

        {/* 답변 대기 중일 때 (새 답변 작성) */}
        {!answerstate && (
          <AdminFormComponents item={item} />
        )}
      </div>

    </>

  )
}
