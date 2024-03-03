import { useSelector } from "react-redux";
import { selectRole, selectToken } from "../services/loginSlice";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const RequireUserAuth=({allowedRole})=>{
   const location=useLocation()
   const token=useSelector(selectToken)
   const role=useSelector(selectRole)
   return (
      token && role==='user'?<Outlet/>:<Navigate to={'/login'} state={{from:location}} replace/>
   )
}

export default RequireUserAuth;