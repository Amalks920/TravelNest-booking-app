import { useSelector } from "react-redux";
import { useGetMessagesQuery, useReFetchConversationsMutation, useReFetchMessagesMutation } from "../services/chatApiSlice";
import { selectRole, selectUserId } from "../../authentication/services/loginSlice";
import { useEffect, useRef, useState } from "react";
import { setDay } from "date-fns";
import { formatDate, formatTime } from "../../../utils/formatDate";


const OwnerChatMessage = ({ recipient_id, socket, lastMessage, setLastMessage }) => {

  const user_id = useSelector(selectUserId)
  const role = useSelector(selectRole)
  const [messages, setMessages] = useState([])

  const { data: messagesArray, isError, isFetching, isLoading, isSuccess, refetch } = useGetMessagesQuery({ recipient_id, user_id })

  const [reFetchMessages] = useReFetchMessagesMutation()
  const [reFetchConversations] = useReFetchConversationsMutation();


  useEffect(() => {
    setMessages(messagesArray)
  }, [messagesArray])


  useEffect(() => {

    const lastMessageIsFromOtherUser = messages?.length && messages[messages?.length - 1].sender?._id != user_id

    if (lastMessageIsFromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: messages[messages?.length - 1]?.conversationId,
        userId: messages[messages?.length - 1].sender?._id,
      });
    }

  })


  socket?.on('newMessage', async (message) => {
    console.log('newMessage', message)
    const response = await reFetchMessages({ recipient_id, user_id })

    setMessages(response.data)

  })

  socket?.on('messageSeen', ({ conversationId }) => {
    console.log(conversationId, 'conversationId')
  })

  return (
    <div className="flex flex-col mx-[10%] mt-[50px] min-h-full ms-[20%]">
      <div className="grid grid-flow-row grid-cols-[38vw]" >

        {messages?.map(({ text, sender, updatedAt, seen }, index) => {

          return <>

            <div className={`  flex my-4 ${sender?.role != 'user' && 'justify-end'}`}>
              <div className={`${sender?.role == 'user' ? ' bg-gray-50' : 'bg-black text-white'} px-10 flex gap-14  ${sender?.role == 'user' ? 'rounded-bl-2xl rounded-e-2xl' : 'rounded-s-2xl rounded-br-2xl'} py-3 w-fit border-2 `}>
                <h2 className="text-[0.9rem]">{text}</h2>
                <div>
                  <h2 className="text-[0.8rem] mt-1">{formatTime(updatedAt)}</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${seen && 'blue'}`} className={`w-4 h-4 relative left-[50px]  -bottom-2`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>

              </div>

            </div>
          </>
        })
        }


      </div>
    </div>

  )
}

export default OwnerChatMessage;