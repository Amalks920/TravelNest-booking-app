import { useSelector } from "react-redux";
import { selectRole, selectToken } from "../services/loginSlice";
import { Navigate, Outlet, useLocation } from "react-router";

const CheckAuth = ({currentRole}) => {
    
    const token = useSelector(selectToken)
    const role=useSelector(selectRole)
    const location=useLocation()

    return (
        
        !token? <Outlet /> : <Navigate to={role === 'user' ? '/home' : role === 'owner' ? '/owner/register-hotel' : role === 'admin' ? '/admin/home' : null} state={{ from: location }} replace />

    )
}

export default CheckAuth;