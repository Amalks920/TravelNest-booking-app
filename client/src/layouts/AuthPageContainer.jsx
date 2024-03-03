import { Navbar } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import { logout, selectRole, selectToken, selectUserId } from "../features/authentication/services/loginSlice";
import PageContainer from "./PageContainer";
import { NavbarDefault } from "./NavbarDefault";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
// import { useChekckBlockedOrNotQuery } from "../services/checkISBlockedOrNot";
import SearchSection from "../features/browse/components/SearchSection";



const AuthPageContainer = ({home}) => {
    const token = useSelector(selectToken)
    const role=useSelector(selectRole)
    const user_id=useSelector(selectUserId)
    const dispatch=useDispatch()
    // const {data:isBlocked,isError,isFetching,isLoading,isSuccess}=useChekckBlockedOrNotQuery({user_id})
    //  console.log(home)
    // isBlocked &&  dispatch(logout())

    if (!token) {

        return (
            <div className="flex justify-center items-center w-[100vw] h-[100vh]">
                <Outlet />
            </div>
        )

    } else {

    if(role!='user'){
        return (
                

            <div className="grid grid-rows-[80px,auto,auto] grid-cols-[290px,80%] gap-2  min-h-screen">
                
            
            <header className="col-span-3 row-span-1">
                <NavbarDefault/>
            </header>
            
            
            <nav class="lg:col-span-1 lg:row-span-2 -mt-7 border-2  hidden lg:block">
                <Sidebar/>
            </nav>
            
            <main className="lg:col-span-1 col-span-2 row-span-2 ">
            <div className="flex justify-center items-center min-h-screen w-full max-w-[100vw]"><Outlet/></div>
            </main>
            
            
            
            
            <div className="col-span-1"></div>
            
            <footer className="col-span-2 row-span-1 border-2 ml-[290px]">
                <Footer/>
            </footer>
            
            </div>
            
            
            
                    )
    }else if(role==='user'){
        return (
                

            <div className="grid grid-rows-[30px,auto,auto] grid-cols-[49%,49%] gap-2  min-h-screen">
                
            
            <header className="col-span-2 row-span-1">
                <NavbarDefault/>
            </header>
            

            
            <main className=" col-span-2 row-span-2 overflow-hidden m-2">
            <div className="flex justify-center items-center min-h-screen w-full max-w-[100vw]"><Outlet/></div>
            </main>
            
            
            
            
          
            
            <footer className="col-span-2 row-span-1 border-2 overflow-hidden">
                <Footer/>
            </footer>
            
            </div>         
                    )
    }

    }
}

export default AuthPageContainer;