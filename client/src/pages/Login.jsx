import { useLocation } from "react-router"
import LoginForm from "../features/authentication/components/LoginForm"

const Login=()=>{
    const {pathname}= useLocation()
    console.log(pathname)
    return (
        
        <LoginForm role={pathname==='/login'?'user':pathname==='/owner/login'?'owner':pathname==='/admin/login'?'admin':null}/>
     
    )
}


export default Login