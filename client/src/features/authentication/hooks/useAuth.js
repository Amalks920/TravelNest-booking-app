import { useSelector } from "react-redux"
import {selectToken,selectRole} from '../services/loginSlice'



const useAuth=()=>{
    const token=useSelector(selectToken)
    const role=useSelector(selectRole)
    let isUser=false
    let isAdmin=false
    let isOwner=false
    if(token){
         isUser=role==='user'
         isAdmin=role==='admin'
         isOwner=role==='owner'

         return {role,isAdmin,isUser,isOwner}
    }

    return {role,isAdmin,isUser,isOwner}
}

export default useAuth;