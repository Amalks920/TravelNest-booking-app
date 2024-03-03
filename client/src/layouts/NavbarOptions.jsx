import { List, ListItem, Card } from "@material-tailwind/react";
import {
  logout,
  selectToken,
} from "../features/authentication/services/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavbarOptions({ isOptionsHidden }) {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }
  {
    /* {token ? (
            <Button
              onClick={() => {
                handleLogout();
              }}
              variant="gradient"
              size="sm"
            >
              {"logout"}
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button
                onClick={() => {
                  handleLogout();
                }}
                variant="gradient"
                size="sm"
              >
                {"login"}
              </Button>
            </Link>
          )} */
  }
  return (
    <Card className={`w-56 ${isOptionsHidden && "hidden"} border-2`}>
      <List>
        <ListItem >
         <Link to={'/account'}>account</Link>  
          </ListItem>
{/* 
          <ListItem>
          {
            token?
           <Link to='/login'>
             Booking
           </Link>:null
          }
        </ListItem> */}

        <ListItem>
          {
            token?
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>:
           <Link to='/login'>
              Login
           </Link>
          }
        </ListItem>

      </List>
    </Card>
  );
}

export default NavbarOptions;
