import { lazy } from "react";
import PageContainer from "../../layouts/PageContainer";
import { checkAuth } from "../checkAuth";
import PublicRoutes from "./PublicRoutes";
import { Navigate, useNavigate } from "react-router-dom";
import AuthPageContainer from "../../layouts/AuthPageContainer";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/authentication/services/loginSlice";
import HotelRegistration from "../../pages/owner/HotelRegistration";
const Home = lazy(() => import("../../pages/user/HomePage"));


const UserRoutes = () => {


    return [
            {path:'/home',element:<Home/>},
            {
                path: '/register-hotel',
                element:<HotelRegistration/>
 
            }
        ]
    }




export default UserRoutes;