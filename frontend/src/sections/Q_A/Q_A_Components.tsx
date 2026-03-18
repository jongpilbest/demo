import { useNavigate } from "react-router-dom";
import { usenonPrivateFormList } from "@/query/useQAquery";
import Form_Same_Component from "./Form_Component";
import { type QAItem } from "@/type/Qa/Qa_type";

import { usePermission } from "@/context/PermissionContext";
import { useAuth } from "@/context/AuthContext";


export default function Q_A_Components() {
  const { user } = useAuth();



  // 질문과 답변 페이지에서는 비밀글이 아닌것을 다 불러옴
  const { data, isPending, isError } = usenonPrivateFormList();

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>

  // 여기도 권환 불러와서 admin 일때는 글쓰기 권환 주지 말고 

  // user 일때만 권한주기 


  const userRole = (user?.role?.roleName) || 'DEFAULT';// 기본값을 ADMIN로 설정
  console.log(userRole, '유저 정보')


  return (
    <section

      className="w-full py-20 md:py-40 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* 제목 */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
          질문과 답변
        </h2>

        <div className="border-t border-gray-300 mb-6"></div>


        <Form_Same_Component
          key={"QA"}
          Create_answer_state={userRole === "ADMIN" ? false : true}
          data={data} ></Form_Same_Component>



        {/* ========================= */}
        {/* ✅ 모바일 카드형 */}
        {/* ========================= */}
        <div className="md:hidden space-y-4">
          {/*data.map((no) => (
            <div
              key={no}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>No. {no}</span>
                <span>2024-02-20</span>
              </div>

              <div className="text-sm text-gray-500 mb-1">
                답변대기
              </div>

              <div className="font-medium text-gray-800 mb-2">
                샘플 질문 제목입니다
              </div>

              <div className="text-xs text-gray-400">
                답변자: 관리자
              </div>
            </div>
          ))*/
          }
        </div>

        {/* 하단 버튼 */}
        {//canAnswerToUser && <div className="flex justify-end mt-8">
          //  <button 
          //     onClick={()=>navigate('/write')}
          //  className="bg-black text-white px-4 py-2 md:px-5 md:py-2 rounded-md text-sm hover:bg-gray-800 transition">
          //    글쓰기
          //   </button>
          //    </div>
        }
      </div>

    </section>
  );
}