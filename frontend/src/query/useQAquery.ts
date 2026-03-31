import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetctGetQAList, fetchPostQA, fetctAllnonPrivateGetQAList, Answer_QA_Admin, Delete_QA_Admin,
  fetchAdminIsnotanswerSTate, FetchEnroll_User,GetCheckAdminQaList
} from "@/api/qa.ts";
import { useAlert } from "@/UseHook/useAlert";
import{ type User_infomation} from "@/type/Qa/User";
// 이거좀 회원은 회원대로 나누고, 
// QA는 QA대로 나눠야할듯... 지금 너무 겹처 있어서 무슨 코드인지 잘모르겠음

const { success, error, loading } = useAlert();


export const QA_LIST_KEY = ["qaList"] as const;
export const QA_NOT_PRIVATE_KEY = ["qa_notprivatelist"] as const;
export const QA_Delete_KEY = ["qadelete"] as const;
export const QA_ADMIN_NOT_ANSWERED_KEY = ["qaAdminNotAnswered"] as const;

//useQuery 는 조회하는거만 사용함 , 예를들어 GET 요청만 사용한다고 
//서버의 상태를 변경하지 않는다. 즉 DB 상태를 변경하지 않는다고 생각하면 쉬움 
export function useQAListQuery() {
  return useQuery({
    queryKey: QA_LIST_KEY,
    queryFn: fetctGetQAList,
  });
}


export function usenonPrivateFormList() {
  return useQuery({
    queryKey: QA_NOT_PRIVATE_KEY,
    queryFn: fetctAllnonPrivateGetQAList,
  });
}


// 이전에 fetch 해서 get 햇던거 stale 이라고 알려줘야된다.

export function useCreateQAQuery() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: fetchPostQA,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QA_NOT_PRIVATE_KEY });
      success('게시글이 생성되었습니다! ');
    },
  });
}

// 관리자가 답변을 남길수 있는 폼

export function useAdminQAQuery() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: Answer_QA_Admin,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QA_NOT_PRIVATE_KEY });
      qc.invalidateQueries({ queryKey: QA_ADMIN_NOT_ANSWERED_KEY });
      success('답변을 등록하였습니다. ');
    },
  });
}


// 폼 삭제하는 함수 삭제하면 다시 폼이 새로 고침됨
export function useDeleteQAQuery() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: QA_Delete_KEY,
    mutationFn: Delete_QA_Admin,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QA_NOT_PRIVATE_KEY });
      qc.invalidateQueries({ queryKey: QA_ADMIN_NOT_ANSWERED_KEY });
      success('게시글이 삭제되었습니다. ');
    }
  });
}


export function useISNotANswerState() {

  return useQuery({
    queryKey: QA_ADMIN_NOT_ANSWERED_KEY,
    queryFn: fetchAdminIsnotanswerSTate,
  });


}


// 회원가입 로직 
// 훅 이름도 Query 대신 Mutation으로 바꾸는 것이 관례입니다 ㅋ
export function useEnrollMutation() {
  const { success, error } = useAlert();
  return useMutation<void, Error, User_infomation>({
    mutationFn: (variables) => FetchEnroll_User({ rest: variables }), 
    onSuccess: () => {
      success("회원가입이 완료되었습니다! 잠시 후 자동으로 로그인됩니다.");
    },
    onError: () => {
      error("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  });
}

export function useAdminCheckMutation() {
  const queryClient = useQueryClient();
  const { success, error } = useAlert();

  return useMutation({
    // 1. 실행할 비동기 함수
    mutationFn: (id: number) => GetCheckAdminQaList(id),
    // 2. 성공 시 로직
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QA_NOT_PRIVATE_KEY });
      queryClient.invalidateQueries({ queryKey: QA_ADMIN_NOT_ANSWERED_KEY });
      success("관리자가 해당 게시물을 확인했습니다..");
    },

    // 3. 실패 시 로직
    onError: (err: any) => {
      console.error("Admin Check Error:", err);
      error("상태 업데이트 중 오류가 발생했습니다.");
    },
  });
}

