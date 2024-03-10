import Chat from "../../features/chat/components/Chat";

const ChatPage=({socket,onlineUsers})=>{
    console.log(socket)
    return <Chat socket={socket} onlineUsers={onlineUsers}/>
}

export default ChatPage;
