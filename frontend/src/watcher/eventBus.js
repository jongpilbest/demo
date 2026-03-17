

import { CrossTablChannel } from "./broadcast";
const listeners= new Map();

export const EventBus= {
 
    // 구독하는 사람 
    subscribe(eventname,handler){
        if(!listeners.has(eventname)){
            listeners.set(eventname,new Set())
        }
        listeners.get(eventname).add(handler)

        return()=>{
             listeners.get(eventname)?.delete(handler)
        }

    }
    ,

    //알람을 보내는 거 이때 알람 이벤트가 다를수도 있음.  
    // 알람 이벤트 달라지는거에 따라 구독자도 달라질수 있음

    publish(eventname,payload,broadcast){
     
        listeners.get(eventname)?.forEach((handler) => {
        handler(payload)
     })

     if(broadcast){
        CrossTablChannel.postMessage({eventname})
         
     }

    }

}

