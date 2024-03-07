


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

   
   function ChatList({username,sender,text}) {
  
    const user_id=useSelector(selectUserId)
  
    return (
      <Card className="w-[100%] shadow-none  border-2">
        <List>
          <ListItem className="">
            <ListItemPrefix>
             
            </ListItemPrefix>
            <div>
              <Typography variant="h6" className="text-[0.9rem]" color="blue-gray">
               { username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal text-[0.8rem]">
                {user_id==sender && 'you :'} {text.slice(0,10)}...
              </Typography>
            </div>
          </ListItem>
        </List>
      </Card>
    );
  }


  export default ChatList;