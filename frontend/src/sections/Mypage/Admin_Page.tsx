import MyPage from "./Mypage";
import { useAuth } from "@/context/AuthContext";
import { useISNotANswerState } from "@/query/useQAquery";
import Form_Same_Component from "../Q_A/Form_Component";

export default function Admin_Page() {
  const { user } = useAuth();
  const { data, isPending, isError } = useISNotANswerState(); // 관리자용 전체 데이터 업데이트가 되지 않는애들만 보내봐 


  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <MyPage>
      {/* 1. 타이틀 변경 */}
      <MyPage.Title>관리자 전용 대시보드</MyPage.Title>

      {/* 2. 프로필 색상 및 뱃지 변경 */}
      <MyPage.Profile
        user={user}
        iconBgColor="bg-blue-600"
        badgeText="System Admin"
      />

      {/* 3. 하단 리스트 */}
      <Form_Same_Component
        groupId={"관리자작성"}
        Create_answer_state={false}
        text={"답변이 필요한 문의사항"}
        data={data} />
    </MyPage>
  );
}