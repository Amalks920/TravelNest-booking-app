
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";

   
   function OwnerChatList({username,sender,text,id,onlineUsers}) {
  //a
    const user_id=useSelector(selectUserId)
  
    return (
      <div className="w-[90%] my-3 border-2 ms-4 rounded-md hover:cursor-pointer">
       
        <div className="shadow-none   h-[60px] mx-3">
          <div className="">

            <div>
              <Typography variant="h6" className="capitalize font-thin mb-1 mt-4" color="black">
               { username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal text-[0.8rem]">
                {user_id==sender && 'you :'} {text.slice(0,10)}...
              </Typography>
            </div>
            <ListItemPrefix className="ms-4">
             {onlineUsers?.find((el)=>el===id) && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
            </ListItemPrefix>
          </div>
        </div>
      </div>
    );
  }


  export default OwnerChatList;