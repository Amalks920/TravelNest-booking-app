import Chat from "../../features/chat/components/Chat";
import OwnerChat from "../../features/chat/components/OwnerChat";


const OwnerChatPage=({socket,onlineUsers})=>{

    return (
       // <Chat socket={socket}/>
       <OwnerChat socket={socket} onlineUsers={onlineUsers}/>
    )
}

export default OwnerChatPage;