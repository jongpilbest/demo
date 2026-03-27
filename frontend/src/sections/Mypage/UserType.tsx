
import { useAuth } from "@/context/AuthContext";


import User_Page from "./User_Page";



export default function MyPageMain() {
  const { user } = useAuth();



  return (
    <>
      <User_Page user={user} />
    </>
  );
}