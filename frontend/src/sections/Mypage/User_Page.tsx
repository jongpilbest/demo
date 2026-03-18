import MyPage from "./Mypage";
import { useAuth } from "@/context/AuthContext";
import { useQAListQuery } from "@/query/useQAquery"; // 유저용 개별 데이터
import Form_Same_Component from "../Q_A/Form_Component";

export default function User_Page() {
  const { user } = useAuth();
  const { data, isPending, isError } = useQAListQuery();
  if (isPending) return <div>로딩중...</div>

  // 여기서 데이터 분리해서 다른 형태로 만들기 

  const new_data = data.filter(((item) => item.answerState == false));
  const old_data = data.filter(((item) => item.answerState == true));

  if (isPending) return <div>로딩중...</div>;

  return (
    <MyPage>
      <MyPage.Title>마이페이지</MyPage.Title>

      <MyPage.Profile
        user={user}
        iconBgColor="bg-orange-500"
        badgeText="일반 회원"
      />

      <Form_Same_Component
        key="일반유저문의사항"
        text={"새로운 문의사항과 답변"}
        data={new_data}
        Create_answer_state={true}
      />
      <div className=" py-5 "></div>

      <Form_Same_Component
        key="일반유저기존문의사항"
        text={"기존 문의사항과 답변"}
        data={old_data}
        Create_answer_state={false}


      />



    </MyPage>
  );
}