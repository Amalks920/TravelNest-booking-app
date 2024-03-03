import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavList,NavListMenu } from "../components/Navbar/NavComponents";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectRole } from "../features/authentication/services/loginSlice";


export function NavbarDefault({home}) {
    const [openNav, setOpenNav] = React.useState(false);
    const dispatch=useDispatch()
    const role=useSelector(selectRole)

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    function handleLogout(){
        dispatch(logout())
    }


    if(!role=='user'){
        return (
            <Navbar className="fixed max-w-[100vw] rounded-none h-[30px] mb-1 px-4 py-2  z-10">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        variant="h6"
                        className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                    >
                        TravelNest
                    </Typography>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <div className="hidden gap-2 lg:flex">
                        {/* <Button
                         variant="text" size="sm" color="blue-gray">
                            Log In
                        </Button> */}
                        <Button 
                        onClick={()=>{
                            handleLogout()
                        }}
                        variant="gradient" size="sm">
                            Sign In
                        </Button>
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                    <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                        <Button onClick={()=>{
                            handleLogout()
                        }} variant="outlined" size="sm" color="blue-gray" fullWidth>
                            Logout
                        </Button>
                        <Button
                         variant="gradient" size="sm" fullWidth>
                            Sign In
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
        );
    }else{
        return (
            <Navbar className="fixed max-w-[100vw] rounded-none  mb-1 px-4 py-2  z-10 ">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        variant="h6"
                        className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                    >
                        TravelNest
                    </Typography>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <div className="hidden gap-2 lg:flex">
                        {/* <Button variant="text" size="sm" color="blue-gray">
                            Log In
                        </Button> */}
                        <Button
                                                    onClick={()=>{
                                                        handleLogout()
                                                    }}
                        variant="gradient" size="sm">
                           Logout
                        </Button>
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                    <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                        <Button onClick={()=>{
                            handleLogout()
                        }} variant="outlined" size="sm" color="blue-gray" fullWidth>
                            Logout
                        </Button>
                        <Button
                                                onClick={()=>{
                                                    handleLogout()
                                                }}
                         variant="gradient" size="sm" fullWidth>
                            Logout
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
        );

    }

}