export type QAItem = {
  id: number;
  title: string;
  content: string;
  category: string;
  is_private: boolean;
  answer: string;
  answerState:boolean;
  adminRead:boolean;
  createdDate: string;
  username:string;      

  
};

export type CreateQAInput = {
  title: string;
  content: string;
  category: string;
  isPrivate: boolean;
  company?:string;
  email?:string;
};


export type AnswerResponse = {
  success: boolean;
  message: string;
}