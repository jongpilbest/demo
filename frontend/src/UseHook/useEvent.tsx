

import { EventBus } from "../watcher/eventBus";

import { useEffect } from "react";


export default function useEvent(eventname:string,handler:any) {


    useEffect(()=>{
       // 구독하는 함수를 hook 으로 뽑은이유
      // 여기 구독 계속 되나 확인좀

       // 해당 component 가 사라지면 자동으로 , 그 컴포넌트가 가지고 있었던 eventhook 구독을해지해줘
        const unsubscribe= EventBus.subscribe(eventname,handler);
        return()=>unsubscribe();
    },[eventname])

}


// useEvent("cart:add",(delte)=> setItems[...items,dalta])
// 구독하는 사람들은 이런 이벤트를 가지고 있음을 등록하였다. 

// publish 이런 이번트가 들어와요 
// eventBus.publish("cart:add", {id:아이디 , name: 이름 })
// cart:add 를 가지고 있는 구독자의함수에 payload 를 보내고 실행해주세요 . 
// 
//
// 구독자가 가지고 있는 함ㅅ무 ,(delte)=> setItems[...items,dalta] 야깅[ delte 으로 들어와요]



// 브로드 케스트
// 어플리케이선 특정 탭에서 발생하는 상황을 다른 탭 인스턴스에도 보낼수 있어요
// 다른 탭에서 이미 로그아웃 했네요 --> 여기 탭도 로그아웃해주새요 

// brodcaster [ 방송을 하는 사람 : 방송을 하는 사람은 channel 이 필요해요] ---> listener [ 듣는 사람 ]
// 채널에서는 방송을 할수 잇어요

