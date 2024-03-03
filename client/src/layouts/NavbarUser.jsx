import React, { useState } from "react";
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
import  {Link} from 'react-router-dom';
import { NavList, NavListMenu } from "../components/Navbar/NavComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectRole,
  selectToken,
  selectUserName,
} from "../features/authentication/services/loginSlice";
import Search from "./Search";
import { selectIsSearchBarOpen } from "../services/searchSlice";
import NavbarOptions from "./NavbarOptions";

export function NavbarUser() {
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const token = useSelector(selectToken);
  const isSearchBarOpen = useSelector(selectIsSearchBarOpen);
  const [isOptionsHidden,setIsOptionsHidden]=useState(true)
  const userName=useSelector(selectUserName)
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Navbar className="fixed max-w-[100vw] h-[70px] rounded-none z-10">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer  lg:ml-2 text-2xl"
        >
          <h1 className="font-extrabold text-[1.5rem]"> <Link to={'/home'} >TravelNest</Link></h1>
        </Typography>

        {!isSearchBarOpen && (
          <div className="">
            <Search />
          </div>
        )}

        
        <div className="hidden gap-2 lg:flex">

            {userName && <h2 className="absolute right-[70px] font-bold">Hi, {userName}</h2>}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 cursor-pointer"
            onClick={()=>{
              setIsOptionsHidden(!isOptionsHidden)
            }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          <div className="absolute end-1 top-16 ">
            <NavbarOptions isOptionsHidden={isOptionsHidden}/>
          </div>
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
          {token && role==='user' ? (
            <Button
              onClick={() => {
                handleLogout();
              }}
              variant="outlined"
              size="sm"
              color="blue-gray"
              fullWidth
            >
              {"logout"}
            </Button>
          ) : (
            <Link>
              <Button
                onClick={() => {
                  handleLogout();
                }}
                variant="outlined"
                size="sm"
                color="blue-gray"
                fullWidth
              >
                {"login"}
              </Button>
            </Link>
          )}

          {token && role==='user' ? (
            <Button
              onClick={() => {
                handleLogout();
              }}
              variant="gradient"
              size="sm"
              fullWidth
            >
              {"login"}
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button variant="gradient" size="sm" fullWidth>
                {"logout"}
              </Button>
            </Link>
          )}
        </div>
      </Collapse>

    </Navbar>
  );
}
