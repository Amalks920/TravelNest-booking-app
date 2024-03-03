import Chat from "../../features/chat/components/Chat";

const ChatPage=({socket})=>{
    console.log(socket)
    return <Chat socket={socket}/>
}

export default ChatPage;
