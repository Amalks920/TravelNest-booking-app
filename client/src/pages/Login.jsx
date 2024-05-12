import { useLocation } from "react-router"
import LoginForm from "../features/authentication/components/LoginForm"

const Login = () => {
    const { pathname } = useLocation()

    return (
        <>
            <LoginForm role={pathname === '/login' ? 'user' : pathname === '/owner/login' ? 'owner' : pathname === '/admin/login' ? 'admin' : null} />
            {pathname === '/login' && <a className="border-2 absolute  border-black sm:top-[80vh] top-[85vh] sm:left-[28%] left-[-145px] h-[40px] sm:w-[20%] w-[300px]  text-[0.8rem] text-black font-bold text-center pt-2
              rounded-md text ms-[180px] mt-3" href="/owner/login">Login as owner</a>}
        </>
    )
}


export default Login