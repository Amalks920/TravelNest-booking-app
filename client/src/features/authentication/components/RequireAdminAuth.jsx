import { useSelector } from "react-redux"
import { selectRole, selectToken } from "../services/loginSlice"
import { Navigate, Outlet, useLocation } from "react-router-dom"


const RequireAdminAuth=({allowedRole})=>{

    const token=useSelector(selectToken)
    const role=useSelector(selectRole)
    const location=useLocation()
  // const navigate=useNavigate()
  console.log(token)

console.log(token,role)
//console.log(admin+'lll===las;llas>')
   return (
      token && role==='admin'?<Outlet/>:<Navigate to={'/admin/login'} state={{from:location}} replace/>
   )
}

export default RequireAdminAuth;