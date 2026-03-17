import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 스타일 시트 잊지 마세요!
import { EventBus } from '../../watcher/EventBus'
import { useAdminQAQuery } from '@/query/useQAquery';
// 1. Props 타입 정의
interface AdminProps {
  item: string; // 혹은 item.id (숫자)
  id: number;
  text?: string
}

function Admin_Components({ item, id, text }: AdminProps) {
  const [value, setValue] = useState(text);
  const { mutateAsync } = useAdminQAQuery();

  // 2. 에디터 설정 고정 (렌더링 최적화 및 커서 튐 방지)
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  }), []);

  // 3. 답변 제출 로직
  const handleSend = async () => {
    if (!value || value === '<p><br></p>') {
      alert("내용을 입력해주세요.");
      return;
    }

    // 여기서
    try {
      const plainText = value.replace(/<[^>]*>?/gm, '');
      //const data=
      //  if(data.data.success){
      //    // 여기 react query 다시 요청 하는거 하기 
      //    
      //
      //
      // 우선 되는지만 확인좀 
      await mutateAsync({ id, plainText });



    }
    catch (e) {
      console.error(" 관리자가 게시물을 업데이트 하는데 에러가 발생함")
    }

  };

  return (
    <div key={item}
      className="mt-4 border rounded-lg p-2 bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        placeholder="답변 내용을 입력하세요..."
        className="mb-10" // 버튼과 겹치지 않게 여백
      />

      <div className="flex justify-end mt-2">
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          답변 보내기
        </button>
      </div>
    </div>
  );
}

// 4. React.memo로 불필요한 리렌더링 차단
export default React.memo(Admin_Components);