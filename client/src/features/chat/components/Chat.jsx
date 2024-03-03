import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectRole, selectUserId } from "../../authentication/services/loginSlice";
import ChatMessage from "./ChatMessage";
import Archived from "./Archived";
import MessageInput from "./MessageInput";


const Chat = ({socket}) => {
 
    const role=useSelector(selectRole)
    const {owner_id}=useParams()
    const user_id=useSelector(selectUserId);

    const [recipientId,setRecipientId]=useState(null);  
    
    const [lastMessage,setLastMessage]=useState('')


  return (
    <div className="grid grid-cols-[25%,50%,25%] grid-rows-[9%,80%,11%] h-[83vh] -mt-32 w-full sticky overflow-hidden" style={{overflowAnchor:'none'}}>

      <div className="row-span-1  col-span-1   flex flex-col ">

      <div className="h-[60px] border-b-2  flex justify-left items-center rounded-l-md bg-gray-800">
        <h2 className="font-bold text-[1.3rem] ms-5 p-4 text-white">Messages</h2>
      </div>
      {/* <Archived setRecipientId={setRecipientId}/> */}
      </div>
      <div className="row-span-1  col-span-1  flex flex-col bg-gray-800">
      <div className="h-[60px] border-b-2  flex justify-left items-center">
      </div>
      {/* <Archived setRecipientId={setRecipientId}/> */}
      </div>
      <div className="row-span-1  col-span-1  flex flex-col bg-gray-800 rounded-r-md">
      <div className="h-[60px] border-b-2  flex justify-left items-center">
        <h2 className="font-bold text-[1.3rem] ms-5 p-4"></h2>
      </div>
      {/* <Archived setRecipientId={setRecipientId}/> */}
      </div>


      <div className="row-span-1 col-span-1 border-2 border-r-0 border-t-0">
      <Archived setRecipientId={setRecipientId} socket={socket}/>
      </div>

      <div  className="row-span-1 col-span-1 border-2 border-r-2 border-t-0 overflow-y-scroll flex overflow-auto" >
      <ChatMessage recipient_id={role==='user'?owner_id:recipientId} socket={socket} lastMessage={lastMessage} setLastMessage={setLastMessage}/>
      </div>

      <div className="row-span-1 col-span-1 border-2 border-t-0 border-b-0 "></div>

<div className="row-span-1 col-start-1 border-2 border-t-0 "></div>
<div className="row-span-1 col-start-2 col-end-3 border-2 border-t-0">
<MessageInput recipientId={role==='user'?owner_id:recipientId} senderId={user_id} lastMessage={lastMessage} setLastMessage={setLastMessage}/>
</div>

<div className="row-span-1 col-start-3 border-2"></div>
 </div>

  );
};

export default Chat;
