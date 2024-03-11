import { useSelector } from "react-redux";
import {
  useGetConversationsQuery,
  useReFetchConversationsMutation,
} from "../services/chatApiSlice";
import {
  selectRole,
  selectUserId,
} from "../../authentication/services/loginSlice";
import { Spinner } from "@material-tailwind/react";
import ChatList from "./ChatList";
import { useEffect, useState } from "react";
import OwnerChatList from "./OwnerChatList";

const OwnerArchived = ({ setRecipientId, socket,onlineUsers }) => {

 const user_id = useSelector(selectUserId);
 const role = useSelector(selectRole);
 const [sender_id,setSenderId]=useState()
 const [conversations, setConversations] = useState([]);

 const [selectedIndex,setSelectedIndex]=useState(-1)


 const {
    data: conversationsArray,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetConversationsQuery({ user_id });
 const [reFetchConversations] = useReFetchConversationsMutation();

  useEffect(() => {
    setConversations(conversationsArray);
  }, [conversationsArray]);

  socket?.on("newMessage", async (message) => {
    setSenderId(message.sender)
    console.log(message)
    console.log('message new message new message')
    const response = await reFetchConversations({ user_id });
    setConversations(response.data)
  });


  if (isLoading || isFetching) return <h1></h1>;
 
  return (
    <>

      <div
        className="flex flex-col mt-4
       justify-left items-center w-full 
       py-3 px-2 gap-2 
        rounded-lg overflow-scroll"
      >
        {conversations?.map((conversation, index) => {
          console.log(conversation)
          console.log('conversationsss')
          return (
            <div
            
              onClick={() => {
                console.log(conversation)
                setRecipientId(conversation?.participants[0]?._id);
              }}
              className="w-full"
              key={index}
            >
              <OwnerChatList
                username={conversation?.participants[0]?.username}
                sender={conversation?.lastMessage?.sender}
                text={conversation?.lastMessage?.text}
                id={conversation?.participants[0]?._id}
                onlineUsers={onlineUsers}
                index={index}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OwnerArchived;