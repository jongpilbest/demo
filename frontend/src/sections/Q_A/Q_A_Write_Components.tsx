import React, { useMemo, useState, useRef } from "react";
import ReactQuill from "react-quill";

import BlotFormatter from "quill-blot-formatter";
import { useCreateQAQuery } from '../../query/useQAquery'
import "react-quill/dist/quill.snow.css";
import { ChevronDown } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { useAlert } from "@/UseHook/useAlert";

const Quill = (ReactQuill).Quill;

Quill.register("modules/blotFormatter", BlotFormatter);

const Q_A_question = ["서비스 문의", "도입 문의", "기타 문의"]


export default function Q_A_Write_Components() {
  const { user } = useAuth();
  const [category, setCategory] = useState(Q_A_question[0]);
  const [value, setValue] = useState("");
  const [open, setopen] = useState(false);
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  };
  const formRef = useRef<any>(null);
  const { mutateAsync } = useCreateQAQuery();
 const{error,succes}= useAlert();
  const ResponseForm = async (e) => {
    e?.preventDefault();

    if (!formRef.current) return; 

    // 1) form input들 수집
    const fd = new FormData(formRef.current);

    const payload = {
      category: category,
      title: (fd.get("title") || "").toString().trim(),
      company: (fd.get("company") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      isPrivate: fd.get("isPrivate") === "on",
      content: stripHtml(value),
      answerState: false
    };

    if (!payload.title) {
      error("제목을 입력해주세요.");
      return;
    }
    if (!payload.email) {
      error("이메일을 입력해주세요.");
      return;
    }

   if(!payload.company){
    error("회사명을 입력해주세요.");
   }

    if (!payload.content || payload.content === "<p><br></p>") {
      error("내용을 입력해주세요.");
      return;
    }
    if (!payload.email.includes("@")) {
        error("올바른 이메일 형식이 아닙니다.");
        return;
    }

    



    try {

      mutateAsync(payload)
      // 성공하면 이전으로 돌아가기?
      window.history.back();
    

      setValue("");

      formRef.current.reset();
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "전송에 실패했습니다.";
      alert(msg);
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: 1 }, { header: 2 }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote"],
      ["link", "image"],
      ["clean"],
    ],
    blotFormatter: {},   // 

  }), []);

  return (
    <div className="min-h-screen  bg-gray-50 pt-32  ">
      <div className="max-w-6xl mx-auto px-6">
        <form ref={formRef}>
          {/* 상단 영역 */}
          <div className="flex items-center gap-6 mb-6">
            {/* 카테고리 */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setopen((v) => !v);
                }}
                className="flex items-center gap-2 text-gray-700 font-medium hover:text-black transition"
              >
                {category}
                <ChevronDown className="w-4 h-4" />
              </button>

              {open && (
                <div
                  className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {Q_A_question.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategory(item);
                        setopen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 제목 */}
            <input
              name="title"
              placeholder="문의사항 제목을 입력해주세요"
              className="flex-1 text-md font-semibold bg-transparent border-b border-gray-300 focus:outline-none focus:border-black transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <input
              name="company"
              defaultValue={user?.company}
              placeholder="회사명을 입력해주세요"
              className="border-b border-gray-300 py-2 focus:outline-none focus:border-black transition"
            />

            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              placeholder="회사 이메일을 입력해주세요"
              className="border-b border-gray-300 py-2 focus:outline-none focus:border-black transition"
            />
          </div>
          <div className="flex items-center gap-2 mt-4 justify-end py-1 ">
            <input
              type="checkbox"
              name="isPrivate"
              id="isPrivate"
              className="w-4 h-4 accent-black cursor-pointer"
            />
            <label
              htmlFor="isPrivate"
              className="text-sm text-gray-700 cursor-pointer"
            >
              비공개
            </label>
          </div>
        </form>


        {/* 에디터 */}
        <div className="bg-white rounded-xl shadow-sm border overflow-visible">
          <ReactQuill

            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            placeholder="내용을 입력하세요"
          />
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={ResponseForm}
            className="bg-black 
        
          
          text-white px-4 py-2 md:px-5 md:py-2 rounded-md text-sm hover:bg-orange-400 transition">
            영업팀에 문의하기
          </button>
        </div>
      </div>
    </div>

  );

}
