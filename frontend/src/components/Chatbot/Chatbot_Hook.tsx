export const sendChatMessage = async (
  text: string,
  accumulatedRef: React.MutableRefObject<string>,
  setMessages: React.Dispatch<React.SetStateAction<{ role: string; content: string }[]>>,
  setStatus: React.Dispatch<React.SetStateAction<string>>
) => {

  setStatus("ready");
  accumulatedRef.current = "";
  const response = await fetch("/api/chat/chatting", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ content: text }] }),
  });

  if (!response.body) throw new Error("스트리밍을 지원하지 않는 브라우저입니다.");

  setStatus("streaming");
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.includes('0:')) {
        try {
          const jsonStart = line.indexOf('0:') + 2;
          const jsonStr = line.substring(jsonStart).trim();
          if (jsonStr) {
            const textChunk = JSON.parse(jsonStr);
            accumulatedRef.current += textChunk;

            setMessages((prev) => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              if (lastIndex >= 0 && newMessages[lastIndex].role === "assistant") {
                newMessages[lastIndex] = {
                  ...newMessages[lastIndex],
                  content: accumulatedRef.current,
                };
              }
              return newMessages;
            });
          }
        } catch (e) {}
      }
    }
  }

  setStatus("");
};