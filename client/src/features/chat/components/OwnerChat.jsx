import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  selectRole,
  selectUserId,
} from "../../authentication/services/loginSlice";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import OwnerMessageInput from "./OwnerMessageInput";
import OwnerChatMessage from "./OwnerChatMessage";
import OwnerArchived from "./OwnerArchived";

const OwnerChat = ({ socket ,onlineUsers}) => {
  const role = useSelector(selectRole);
  const { owner_id } = useParams();
  const user_id = useSelector(selectUserId);

  const [recipientId, setRecipientId] = useState(null);



  return (
    <div className="grid grid-cols-[25%,75%] grid-rows-[9%,80%,11%] h-[93vh]
                     shadow-md -mt-[8.5%] w-full -ms-[1%] overflow-hidden">
      <div className="row-span-1  col-span-1 border-2 border-e-0 flex flex-col bg-black rounded-s-md">
        <h2 className="font-bold text-center mt-4 text-white">Messages</h2>
      </div>

      <div className="row-span-1  col-span-1 border-2 border-s-0 flex flex-col bg-black rounded-e-md">
        <div className=" border-b-2  flex justify-left items-center"></div>
      </div>

      <div className="row-span-1  col-span-1 border-2 flex flex-col">
        <OwnerArchived setRecipientId={setRecipientId} socket={socket} onlineUsers={onlineUsers}/>
      </div>

   
          <div  className="row-span-1 col-span-1  border-r-2 border-t-0 overflow-y-scroll flex overflow-hidden " >
      <OwnerChatMessage recipient_id={role==='user'?owner_id:recipientId} socket={socket} />
      </div>
  

      <div
        className={`row-span-1 col-span-1  flex flex-col border-2`}
      >
       
      </div>

      <div className="row-span-1 col-start-2 col-end-3 border-2 ">
        <OwnerMessageInput
          recipientId={role === "user" ? owner_id : recipientId}
          senderId={user_id}
        />
      </div>
    </div>
  );
};

export default OwnerChat;
