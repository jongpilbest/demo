/**
 * ISO 날짜 문자열을 "YYYY. M. D." 형식으로 변환합니다.
 * @param dateString - "2026-03-26T11:19:44.741441"
 * @returns "2026. 3. 26."
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // 유효하지 않은 날짜인 경우 처리
  if (isNaN(date.getTime())) {
    return dateString;
  }

  // 한국 로케일(ko-KR)을 사용하여 변환
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
};
