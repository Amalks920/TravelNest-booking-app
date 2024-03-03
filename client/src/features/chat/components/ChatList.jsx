


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
      <Card className="w-[100%] shadow-none h-[50%]">
        <List>
          <ListItem className="">
            <ListItemPrefix>
             
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
               { username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {user_id==sender && 'you :'} {text.slice(0,10)}...
              </Typography>
            </div>
          </ListItem>
          {/* <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="alexander" src="https://docs.material-tailwind.com/img/face-2.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Alexander
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Backend Developer @ Material Tailwind
              </Typography>
            </div>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="emma" src="https://docs.material-tailwind.com/img/face-3.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Emma Willever
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                UI/UX Designer @ Material Tailwind
              </Typography>
            </div>
          </ListItem> */}
        </List>
      </Card>
    );
  }


  export default ChatList;