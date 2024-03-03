import { useState } from "react";
import { useSendMessageMutation } from "../services/chatApiSlice";
import { useSelector } from "react-redux";
import { selectRole } from "../../authentication/services/loginSlice";

const OwnerMessageInput = ({ recipientId, senderId }) => {
  const [message, setMessage] = useState("");
  const [sendMessage, { isError, isLoading, isSuccess }] =
    useSendMessageMutation();
  const role = useSelector(selectRole);
  const handleMessage = async () => {
    setMessage("");
    await sendMessage({ recipientId, senderId, message });
  };

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className={`w-7 h-7 top-14  absolute ${
          role === "user" ? "left-[69%] top-[91%]" : "left-[88%] top-[91.5%]"
        } top-11 cursor-pointer ${message.length === 0 ? "hidden" : "flex"}`}
        onClick={(e) => {
          handleMessage();
        }}
      >
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
      </svg>

      <input
        onChange={(e) => {
         // setLastMessage(e.target.value)
          setMessage(e.target.value);
        }}
        value={message}
        type="text"
        className={`border-2 border-black  my-4 ps-[5%] ms-[10%]  text-sm 
          w-[80%] h-[40px] 
        `}
        placeholder="type message here"
      />
    </div>
  );
};

export default OwnerMessageInput;