

import { api } from "./client";

import {type  QAItem,type  AnswerResponse , type CreateQAInput} from "@/type/Qa/Qa_type";




//  사용자 회원가입 호출 로직

export async function FetchEnroll_User({rest}: {rest: any}):Promise<void>{
   const res= await api.post("/api/members/signup", { 
          ...rest, 
          role: { id: 2 } 
        });

        return res.data 
}



// get으로 요청할때. 
export async function fetctGetQAList(): Promise<QAItem[]> {
  const res = await api.get("/api/form/qa_list");
  return res.data;
}

// get으로 요청할때. 
export async function fetctAllnonPrivateGetQAList(): Promise<QAItem[]> {
  const res = await api.get("/api/form/All_qa_list");
  return res.data;
}


type AnswerQAParams = {
  id: number;
  plainText: string;
};

// 관리자가 답변 보내는 함수.
export async function Answer_QA_Admin({id,plainText}:AnswerQAParams):Promise<AnswerResponse>
{
  const res= await api.post("/api/form/answer", { id:id , answer: plainText }) 
  return res.data;

}


//============================================================================
// 답변 삭제하기

export async function Delete_QA_Admin(id:number):Promise<AnswerResponse>
{
  const res= await api.delete(`/api/form/delete?id=${id}`) 
  return res.data;

}




export async function fetchPostQA(payload:CreateQAInput): Promise<void>{
    const res = await api.post("/api/form/new_form", payload);
   return res.data;
}


////#--------------------- admin 사용자가 isnotanswerstate 만 원할때

export async function fetchAdminIsnotanswerSTate():Promise<QAItem[]>{
  const res= await api.get('/api/form/IsnotAnswerstate')
  return res.data.data;
}



/// 관리자가 새로운 답변이 달린 문의글을 확인할때

export async function GetCheckAdminQaList(id: number):Promise<QAItem[]>{
  const res= await api.get(`/api/form/Admin_check_qa_list?id=${id}`)
  
  // invaildate 어저구 요청하기  QA_ADMIN_NOT_ANSWERED_KEY
  return res.data;
}