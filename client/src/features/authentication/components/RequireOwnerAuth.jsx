import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { selectRole, selectToken } from "../services/loginSlice";


const RequireOwnerAuth=({allowedRole})=>{
    const token=useSelector(selectToken)
    const role=useSelector(selectRole)
    const location=useLocation()
  // const navigate=useNavigate()
  console.log(token)
console.log(allowedRole)
   return (
      token && role==='owner'?<Outlet/>:<Navigate to={'/owner/login'} state={{from:location}} replace/>
   )
}


export default RequireOwnerAuth;