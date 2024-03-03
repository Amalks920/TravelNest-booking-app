import { useLocation } from "react-router-dom"
import SignupForm from "../features/authentication/components/SignupForm"


const Signup=()=>{
   const {pathname}= useLocation()
    return (
      
        <SignupForm role={pathname==='/signup'?'user':pathname==='/owner/signup'?'owner':null}/>

    )
}

export default Signup