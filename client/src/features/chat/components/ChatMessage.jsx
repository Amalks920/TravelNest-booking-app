import { useSelector } from "react-redux";
import { useGetMessagesQuery, useReFetchMessagesMutation, useSendMessageMutation } from "../services/chatApiSlice";
import { selectRole, selectUserId, selectUserName } from "../../authentication/services/loginSlice";
import { useEffect, useRef, useState } from "react";
import { setDay } from "date-fns";
import { formatDate, formatTime } from "../../../utils/formatDate";


const ChatMessage = ({ recipient_id, socket, lastMessage, setLastMessage }) => {

  const user_id = useSelector(selectUserId)
  const role = useSelector(selectRole)
  const user = useSelector(selectUserName)

  const [messages, setMessages] = useState([])

  const { data: messagesArray, isError, isFetching, isLoading, isSuccess, refetch, } = useGetMessagesQuery({ recipient_id, user_id })
  const [reFetchMessages] = useReFetchMessagesMutation()


  // const [sendMessage, { isError:isErrorSendMessage, isLoading:isLoadingSendMessage, isSuccess:isSuccessSendMessage }] =
  // useSendMessageMutation();



  useEffect(() => {
    setMessages(messagesArray)
  }, [messagesArray])

  useEffect(() => {

    const lastMessageIsFromOtherUser = messages?.length && messages[messages?.length - 1].sender?._id != user_id

    if (lastMessageIsFromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: messages[messages?.length - 1].conversationId,
        userId: messages[messages?.length - 1].sender?._id,
      });
    }

  })

  socket?.on('messageSeen', ({ conversationId }) => {
    console.log(conversationId, 'conversationId')
  })

  socket?.on('newMessage', async (message) => {

    const response = await reFetchMessages({ recipient_id, user_id })
    console.log(response)

    setMessages(response.data)


  })

  return (
    <div className="flex flex-col mx-[10%]  mt-[50px] min-h-full mb-[10%]  h-fit">
      <div className="grid grid-flow-row grid-cols-[38vw]  pb-[50px]" >

        {messages?.map(({ text, sender, updatedAt, seen }, index) => {

          return <>


            <div className={`  flex my-4  ${sender?.role == 'user' && 'justify-end'}`}>
              <div className={`${sender?.role != 'user' ? ' bg-gray-50' : 'bg-black text-white'} px-10  flex gap-14  ${sender?.role != 'user' ? 'rounded-bl-2xl rounded-e-2xl' : 'rounded-s-2xl rounded-br-2xl'} py-4 pb-0 w-fit border-2 `}>
                <h2 className="text-[1rem]">{text}</h2>
                <div>
                  <h2 className="text-[0.8rem] mt-1">{formatTime(updatedAt)}</h2>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${seen && 'blue'}`} className={`w-4 h-4 relative left-[50px] bottom-1 `}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

                </div>

              </div>
            </div>


          </>
        })
        }

        <div className={` ${isLoading ? 'flex' : 'hidden'}  my-4   justify-end  h-[60px] mt-[30px]`}>
          <div className=' bg-gray-300 text-white px-10 animate-pulse  flex gap-14 rounded-bl-2xl rounded-e-2xl rounded-br-2xl py-4 pb-0 w-[40%]'>
            <h2 className="text-[1rem]"></h2>
            <div>
              <h2 className="text-[0.8rem] mt-1"></h2>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`w-4 h-4 relative left-[50px] bottom-1 `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>

          </div>
        
        </div>
        <div className={` ${isLoading ? 'flex' : 'hidden'}  my-4   justify-end  h-[60px] mt-[30px]`}>
          <div className=' bg-gray-300 text-white px-10 animate-pulse  flex gap-14 rounded-bl-2xl rounded-e-2xl rounded-br-2xl py-4 pb-0 w-[40%]'>
            <h2 className="text-[1rem]"></h2>
            <div>
              <h2 className="text-[0.8rem] mt-1"></h2>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`w-4 h-4 relative left-[50px] bottom-1 `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>

          </div>
        
        </div>
        <div className={` ${isLoading ? 'flex' : 'hidden'}  my-4   justify-end  h-[60px] mt-[30px]`}>
          <div className=' bg-gray-300 text-white px-10 animate-pulse  flex gap-14 rounded-bl-2xl rounded-e-2xl rounded-br-2xl py-4 pb-0 w-[40%]'>
            <h2 className="text-[1rem]"></h2>
            <div>
              <h2 className="text-[0.8rem] mt-1"></h2>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`w-4 h-4 relative left-[50px] bottom-1 `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>

          </div>
        
        </div>
        <div className={` ${isLoading ? 'flex' : 'hidden'}  my-4   justify-end  h-[60px] mt-[30px]`}>
          <div className=' bg-gray-300 text-white px-10 animate-pulse  flex gap-14 rounded-bl-2xl rounded-e-2xl rounded-br-2xl py-4 pb-0 w-[40%]'>
            <h2 className="text-[1rem]"></h2>
            <div>
              <h2 className="text-[0.8rem] mt-1"></h2>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`w-4 h-4 relative left-[50px] bottom-1 `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>

          </div>
        
        </div>

      </div>
    </div>

  )
}

export default ChatMessage;