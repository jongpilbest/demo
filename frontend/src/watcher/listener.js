

import { CrossTablChannel } from "./broadcast";
import { EventBus } from "./eventBus";

CrossTablChannel.onmessage=({data})=>{
    // data 에서 이벤트 이름과 payload 매개변수를 받아요

    const{eventname, payload}= data;
     EventBus.publish(eventname,payload,false);
     //이벤트가 실행됬다는것을 알려주고payload 데이터를 같이 보내요

}