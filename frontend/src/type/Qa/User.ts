  export type User_infomation = {
    username: string;
    name: string;
    email: string;
    phone: string;
    company: string; // 회사 이름 필드 유지
    password: string;
   accessToken?: string;
  };