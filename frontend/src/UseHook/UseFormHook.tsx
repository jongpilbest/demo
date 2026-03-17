
import React from 'react'
import {  useState } from 'react'
import { api } from '@/api/client';

export default function UseFormHook(server_api:string) {
  const[loading,setloading]=useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);

  const  Send_post_server =  async function(data:{
    name:string,
    content:string,
  }){
      try{
       setloading(true);
       const response = await api.post(server_api, {
          name: data.name,
          content: data.content,
        });
      return response.data;
      }
      catch(e){
      setError("폼전송시 에러가 발생했습니다.")
      }
      finally{

        setloading(false);
      }
  }




  return {loading,error,Send_post_server}
}
