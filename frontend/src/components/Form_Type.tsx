import { useAuth } from '@/context/AuthContext'
import User_Form from './User_Form';
import Admin_Form from './Admin_Form';
import React from 'react'
import type { QAItem } from '@/type/Qa/Qa_type';
export default function Form_Type({ item }: QAItem) {
    const { user, loading } = useAuth(); // 로딩 상태가 있다면 활용


    const isAdmin = user?.role?.roleName === 'ADMIN';

    return isAdmin ? <Admin_Form item={item} /> : <></>;
}