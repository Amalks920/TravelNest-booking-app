import { useSelector } from "react-redux";
import { selectRole, selectToken } from "../features/authentication/services/loginSlice";


export function checkAuth(){
    const token=useSelector(selectToken) 
    const role=useSelector(selectRole)
    if(token){
    // console.log('authorized')
    return true
    }else{
    // console.log('unauthorized')
    // return [false,null]
    return false
    } 
}