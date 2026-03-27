import { useEffect, useMemo, useCallback, createContext, useContext, useState } from "react";
import { api, getAccessToken } from "@/api/client";
import { useAuth } from "./AuthContext";


///////////////////////////////////////////////
export type Role = "USER" | "ADMIN";

type PermissionContextType={


  // 상태
  userRole:Role | null,
  loading:boolean,
  status:Object,
   canAnswer:(feature: string) => boolean,

  // 권한 체크 함수 
  canRead:(feature: string) => boolean,
  canCreate:(feature: string) => boolean,
  canUpdate:(feature: string) => boolean,
  canDelete:(feature: string) => boolean,


  // 권환확인
    hasPermission : (featureName: string, permissionType: PermissionType) => boolean;

}

// permisson Type 임
type PermissionType =
  | "READ"
  | "CREATE"
  | "UPDATE"
  | "DELETE"


type FeaturePermissonType= Record<string, PermissionType[]>


type PermissionStatus = {
  status: "sucuss"|"error",
  message: string;
};




/////////////////////////////////////////////////////////////////////


const PermissionContext = createContext<PermissionContextType | null>(null);

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission is error");
  }
  return context;
};


export const PermissionProvider = ({ children }: Props) => {
 
  const [userRole, setuserRole] = useState<Role | null>(null);
  const [userPermissions, setUserPermissions] = useState<FeaturePermissonType>({});
  // 근데 이렇게 하면 flag 는 어떻게해? 

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<PermissionStatus | null>(null); //<- loading 상태 입니다. 
  const{user}= useAuth();



  const loadUserPermissions= useCallback(async()=>{
   try {
       // 사용자가 보내는 토큰으로 사용자의 권환 / user Type 을 확인한다. 
      setLoading(true);
        console.log(getAccessToken(),'토큰이 안보이는거 같아')

       const PermissionResponse = await api.get("/api/user/permission");
    
       if (PermissionResponse.status === 200) {
        // 응답을 잘 받은 경우에만 저장하는 로직
        const responseData = PermissionResponse.data;
        console.log(responseData,'권환 조회 응답 데이터')
      
        setUserPermissions(responseData.permissions);
        setuserRole(responseData.role);    

       }
     } catch(e:any) {
        console.error('권환 조회시 오류가 발생했습니다.');
      setStatus({
        status:"error",
        message:
          e.response?.data?.message 
      });

        setuserRole(null);
        setUserPermissions({});
     } finally {
       setLoading(false);
     }
  },[])

    // 해당 feautre: 기능에 해당 role_permission 이 있는지 확인하는 공통 함수 



    //useCallback 에서 함수 안에서 사용하는 외부 변수는 dependecy 에 넣어야된다.
    // 즉 안에 내용물이 달라졌으니 , 계산을 다시해야된다는 의미이다. 

    const hasPermission= useCallback((featureName:string, PermissionType:PermissionType)=>{
      
        if(!featureName || !PermissionType) return false;
        
        // 내가 가지고 있는 feature 목록 중에 해당하는 featurename 이 있는지 확인좀 해줘
        const featurePermission= userPermissions[featureName];
        if(!featurePermission ) return false;
        // 목록에 해당하는 permissionType 이 가능한지 알려줘 . 
        return featurePermission.includes(PermissionType);

         
    },[userPermissions])

     // featurename 이거 어떤 featurename 을 가지고 있는지 ts type 을 작성해야되는데 여기는 작은 프로젝트이니 , string 으로 넘어감
   // dependency 에 hasPermission 을 넣는이유
  
   // 현재 hasPermission 은 usecallback 으로 잡은 함수이긴하지만. hasPermission 도 userPermissions 에 따라서 새로 생성된다. 
    //userPermissions 변경 --> userPermissions 변경 --> hasPermission 새로 생성
    // 헷갈려서 뭐가 뭔지 모르겟다


    const canRead= useCallback((featurename:string)=>hasPermission(featurename,'READ'),[hasPermission])
    const canCreate= useCallback((featurename:string)=>hasPermission(featurename,'CREATE'),[hasPermission])
    const canUpdate= useCallback((featurename:string)=>hasPermission(featurename,'UPDATE'),[hasPermission])
    const canDelete= useCallback((featurename:string)=>hasPermission(featurename,'DELETE'),[hasPermission])

   const canAnswer= useCallback((featurename:string)=>hasPermission(featurename,'DELETE'),[hasPermission])


  useEffect(() => {
    if(user) {
      loadUserPermissions()
    }
    else{
      setUserPermissions({});
      setuserRole(null);
      setLoading(false);
    }
   
  }, [user,loadUserPermissions]);

// hasPermission 으로 접근 권환 갖게 해서 Route 조정

// CanRead 는 ui 안에서 만 조정 

//useMemo 에 dependecy의 같은 이름의 useCallback 함수 넣는
// 

  const value= useMemo(()=>({
    userRole,
    hasPermission,
    canRead,
    canDelete,
    canUpdate,
    canCreate,
    canAnswer,
    loading,
    status
     }),[
    userRole,
    canRead,
    canDelete,
    canAnswer,
    canCreate,
    loading,
    status,
    hasPermission

     ])

  return (
    <PermissionContext.Provider
      value={value}
    >
      {children}
    </PermissionContext.Provider>
  );
}
