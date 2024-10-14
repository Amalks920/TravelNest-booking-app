import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken, selectUserName } from "../features/authentication/services/loginSlice";
import { Link, useNavigate } from "react-router-dom";
 
export function NavbarUser() {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [openNav, setOpenNav] = React.useState(false);

  const token= useSelector(selectToken)
  const username=useSelector(selectUserName)
 
  React.useEffect(() => {
    
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex
    text-5xl
   lg:mb-0 lg:mt-0 flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-[1.1rem] font-custom">

          Favorites
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-[1.1rem] font-custom">
          Language
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-[1.1rem] font-custom">
          Menu
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >

<Popover placement="bottom-start">
      <PopoverHandler>
      <a 
      href={!token?'/bookings':'#'}
      onClick={()=>{
        if(!token) navigate('/bookings')
      }}
      className="flex items-center text-[1.1rem] font-custom bg-transparent font-normal capitalize shadow-none text-black">
                 {
         !token?'Login':username
        }
        </a>   
      </PopoverHandler>

  { token &&     <PopoverContent    className="w-72 mt-3 border-2">
        <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
          {/* <Avatar src="https://docs.material-tailwind.com/img/team-4.jpg" alt="tania andrew" /> */}
          <div>
            <Typography variant="h6" color="blue-gray" className="capitalize ps-7 shadow-gray-800">
             Hi {username}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-medium text-blue-gray-500"
            >
            
            </Typography>
          </div>
        </div>
        <List className="p-0">
          <Link to="/account" className="text-initial font-medium text-blue-gray-500">
            <ListItem>
              <ListItemPrefix>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 2C1 1.46957 1.21071 0.960859 1.58579 0.585786C1.96086 0.210714 2.46957 0 3 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V14C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V15C5 15.2652 4.89464 15.5196 4.70711 15.7071C4.51957 15.8946 4.26522 16 4 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14V2ZM4 3H6V5H4V3ZM6 7H4V9H6V7ZM8 3H10V5H8V3ZM10 7H8V9H10V7Z"
                    fill="#90A4AE"
                  />
                </svg>
              </ListItemPrefix>
              Account
            </ListItem>
          </Link>
          <div 
          onClick={()=>{
           if(token) dispatch(logout())
           else  navigate('/login')
          }}
          className="text-initial font-medium text-blue-gray-500">
            <ListItem>
              <ListItemPrefix>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.00299 5.884L9.99999 9.882L17.997 5.884C17.9674 5.37444 17.7441 4.89549 17.3728 4.54523C17.0015 4.19497 16.5104 3.99991 16 4H3.99999C3.48958 3.99991 2.99844 4.19497 2.62717 4.54523C2.2559 4.89549 2.03259 5.37444 2.00299 5.884Z"
                    fill="#90A4AE"
                  />
                  <path
                    d="M18 8.11798L10 12.118L2 8.11798V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V8.11798Z"
                    fill="#90A4AE"
                  />
                </svg>
              </ListItemPrefix>
              Logout
            </ListItem>
          </div>
        </List>
      </PopoverContent>}
        </Popover>


      </Typography>
    </ul>
  );
 
  return (
    // <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll border-2">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between lg:justify-around text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5  text-2xl font-sans font-bold"
          >
            TravelNest
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
            //  onClick={() => setOpenNav(!openNav)}
            >




            </IconButton>
          </div>
        </div>
        {/* <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav> */}
      </Navbar>
    // </div>
  );
}


