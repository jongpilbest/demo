"use client";
import logo from '/assets/logo_crop.svg'
import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bot, ChevronLeft } from "lucide-react";



const Chatbot: React.FC = () => {


const [open, setOpen] = useState(false);


   // 밑에 하단바 메세지 를 입력하세요 usestate 
  const [input, setInput] = useState("");
   const[status,setStatus]=useState("");
  // useChat 대신 직접 상태를 관리합니다.


  // 전체 메세지 히스토리를 관리하는 상태 
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  // 작성하고 있는지 아닌지 로딩 상태
  const [isTyping, setIsTyping] = useState(false);


  const bottomRef = useRef<HTMLDivElement>(null);


const sendMessage = async (text: string) => {
    

    // 1. 유저가 질문한 내역을 message 상태에 추가합니다.
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    // 기존의 메세지를 빈text으로 변환합니다. 
    setInput("");
    // api 호출을 기다리고 있습니다. 
    setIsTyping(true);

    // 2. 봇 응답이 담길 "빈 말풍선"을 미리 하나 만들어 둡니다.
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {

      setStatus("ready");
      const response = await fetch("/api/chat/chatting", {
        method: "POST",
        headers: {
          // 우리가 직접 통제하므로 중복 헤더(415 에러)가 절대 발생하지 않습니다!
          "Content-Type": "application/json", 
        },
        // 백엔드 ChatRequestDto 형태에 맞춰서 대충이라도 쏴줘야 400 에러가 안 납니다.
        body: JSON.stringify({
          messages: [{ content: text }] 
        }),
      });
      

      
      if (!response.body) throw new Error("스트리밍을 지원하지 않는 브라우저입니다.");

      // 3. 스트림 데이터를 실시간으로 불러오기 위해서, 읽기 전용 빨대가 필요합니다.
      const reader = response.body.getReader();
      // 기계어를 사람의 언어로 번역해주는 번역기 입니다.
      const decoder = new TextDecoder("utf-8");


      while (true) {

        // 
        const { done, value } = await reader.read();
        if (done) break;

        // 청크(조각) 데이터를 텍스트로 변환
        const chunk = decoder.decode(value, { stream: true });
     
        // 백엔드에서 온 '0:"안"\n0:"녕"\n' 형태를 줄바꿈 기준으로 쪼갭니다.
        const lines = chunk.split('\n');
 
        
        for (const line of lines) {
          if (line.includes('0:')) {
            try {
            const jsonStart = line.indexOf('0:') + 2;
            const jsonStr = line.substring(jsonStart).trim();
             if (jsonStr) {
      // 3. JSON.parse를 통해 따옴표를 제거하고 순수 텍스트 "아"만 추출
             const textChunk = JSON.parse(jsonStr);
                
              setMessages((prev) => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (lastIndex >= 0 && newMessages[lastIndex].role === "assistant") {
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: newMessages[lastIndex].content + textChunk
          };
        }return newMessages;
      });
            } 
        }
            
            catch (e) {
              // 파싱 중 발생하는 자잘한 에러는 무시
            }
          }

        }
   

    }
     setStatus("");

    } catch (error) {
      console.error("통신 에러:", error);
    } finally {
     // setIsTyping(false); // 스트리밍이 끝나면 타이핑 상태 해제
    }
  };




  // 스크롤 내리는 상태
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      sendMessage(input);

  };



  
  return (
    <>
      {/* ── FAB 토글 버튼 ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="챗봇 열기"
        className={`
          fixed bottom-6 right-20 z-[9999]
          w-16 h-16 rounded-2xl shadow-xl
          flex items-center justify-center
          transition-all duration-300
          ${open
            ? "bg-[#F97316] rotate-45 scale-95"
            : "bg-[#1a2a4a] hover:bg-[#ea6c0a] hover:scale-105"
          }
        `}
      >
        {open ? (
          /* X 아이콘 */
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          /* 채팅 아이콘 */
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
           <Bot className="text-white"></Bot>
            <circle cx="8" cy="10" r="1.2" fill="#F97316" />
            <circle cx="12" cy="10" r="1.2" fill="#F97316" />
            <circle cx="16" cy="10" r="1.2" fill="#F97316" />
          </svg>
        )}
      </button>

      {/* ── 챗봇 패널 ── */}
      <div
        className={`
          fixed bottom-24 right-28 z-[9998]
          w-[360px] max-w-[calc(100vw-3rem)]
          flex flex-col
          rounded-2xl overflow-hidden shadow-2xl border border-slate-100
          transition-all duration-300 origin-bottom-right
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}
        `}
        style={{ height: 560 }}
      >
        {/* ── 상단 그라디언트 바 ── */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1a2a4a] via-[#F97316] to-[#1a2a4a]" />

        {/* ── 헤더 ── */}
        <div className="bg-[#1a2a4a] px-5 py-4 flex items-center gap-3
        justify-between
        " >
          {/* 로고마크 */}

          <div className='flex  gap-6' >

             {
            messages.length>0 && <button
            disabled={status == "ready"}
           onClick={() => setMessages([])}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

          }
  <div className='flex flex-col gap-1'>
            <p className="text-[10px] font-semibold text-[#F97316] tracking-widest uppercase leading-none mb-0.5">
              아신씨엔티
            </p>
            <h3 className="text-sm font-bold text-white leading-none">AI 어시스턴트</h3>
          </div>

          </div>

        
          
        
          {/* 온라인 뱃지 */}
       
        <span
  className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium
             bg-white border border-emerald-400/25 rounded-full px-2.5 py-1 animate-float"
>
  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
  온라인
</span>
        
     
         
        </div>

        {/* ── 메시지 영역 ── */}
        <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 flex flex-col gap-3">
          {/* 웰컴 메시지 */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center pb-4">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">
               <img src={logo} alt="Company Logo" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a2a4a] mb-1">스마트 계측 AI 어시스턴트</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  구조물 안전, 계측 데이터, 서비스 이용에 대해<br />무엇이든 물어보세요.
                </p>
              </div>
              <div className='flex gap-3  flex-col w-full my-4'>

       {[
                "서비스 소개가 궁금해요",
                "데모 신청은 어떻게 하나요?",
                "센서 연동이 가능한가요?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    sendMessage(q);
                  }}
                  className="
                  
          
                  w-full text-left px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-600 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                >
                  {q}
                </button>
              ))}


              </div>
              {/* 빠른 질문 칩 */}
       
            </div>
          )}
          
          {/* 메시지 버블   
             서로 답변 주고 받는 공간.
          
          
          */}
          {  messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
         
              {message.role === "assistant" && (
                <div className="w-7 h-7 flex-shrink-0 rounded-lg bg-[#1a2a4a] flex items-center justify-center mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1" width="5" height="5" rx="1" fill="#F97316" />
                    <rect x="8" y="1" width="5" height="5" rx="1" fill="#F97316" opacity="0.5" />
                    <rect x="1" y="8" width="5" height="5" rx="1" fill="#F97316" opacity="0.5" />
                    <rect x="8" y="8" width="5" height="5" rx="1" fill="#F97316" opacity="0.25" />
                  </svg>
                </div>
              )}

              <div
                className={`
                  max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                  ${message.role === "user"
                    ? "bg-[#F97316] text-white rounded-tr-sm"
                    : "bg-white text-slate-700 rounded-tl-sm border border-slate-100 shadow-sm"
                  }
                `}
              >
                {message.content}
              </div>
            </div>
          ))
          
      
          }

          {/* 타이핑 인디케이터 */}
          {status === "streaming" && (
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 flex-shrink-0 rounded-lg bg-[#1a2a4a] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="#F97316" />
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="#F97316" opacity="0.5" />
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="#F97316" opacity="0.5" />
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="#F97316" opacity="0.25" />
                </svg>
              </div>
              <div className="bg-white border border-slate-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── 입력 영역 ── */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-t border-slate-100 px-3 py-3 flex gap-2 items-end"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="
              flex-1 px-4 py-2.5 text-sm
              bg-slate-50 border border-slate-200
              rounded-xl resize-none
              focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10
              disabled:opacity-50 transition-all
              placeholder:text-slate-400 text-slate-700
            "
          />
          <button
            type="submit"
            disabled={status == "ready"}
            className="
              w-10 h-10 flex-shrink-0 rounded-xl
              bg-[#F97316] hover:bg-[#ea6c0a]
              disabled:bg-slate-200 disabled:cursor-not-allowed
              flex items-center justify-center
              transition-all duration-150 active:scale-95
              shadow-md shadow-orange-100
            "
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M14 8L2 2l3 6-3 6 12-6z"
                fill="white"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;