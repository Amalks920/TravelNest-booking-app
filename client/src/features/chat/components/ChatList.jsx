


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

   
   function ChatList({username,sender,text,id,onlineUsers}) {
  //a
    const user_id=useSelector(selectUserId)
  
    return (
      <Card className="w-[100%] shadow-none">
        <List className="shadow-none">
          <ListItem className="">

            <div>
              <Typography variant="h6" className="text-[0.9rem] capitalize" color="blue-gray">
               { username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal text-[0.8rem]">
                {user_id==sender && 'you :'} {text.slice(0,10)}...
              </Typography>
            </div>
            <ListItemPrefix className="ms-4">
             {onlineUsers?.find((el)=>el===id) && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
            </ListItemPrefix>
          </ListItem>
        </List>
      </Card>
    );
  }


  export default ChatList;