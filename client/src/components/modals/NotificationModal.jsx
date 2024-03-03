import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function NotificationDialog({ isModalOpen, setIsModalOpen,isBlocked,user_id,args,sendRequestHandler,error,loading,success,reset,heading,description,buttonText }) {
    console.log(isModalOpen)
    console.log(success)
  const navigate=useNavigate()

  const handleOpen = () => setIsModalOpen(!isModalOpen);



  if(success){
    setIsModalOpen(false)
    reset()
  }

  return (
    <>
      <Dialog open={isModalOpen} handler={handleOpen}>
        {/* <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Your Attention is Required!
          </Typography>
        </DialogHeader> */}
        <DialogBody divider className="grid place-items-center gap-4">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z"
              clipRule="evenodd"
            />
          </svg>

          <Typography color="black" variant="h4">
           {heading}
          </Typography>
          <Typography className="text-center font-normal">
            {description}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">

          <Button variant="text" color="blue-gray" onClick={
            handleOpen
            }>

            Cancel
          </Button>
          {console.log(isBlocked)}
          {console.log(args)}
          <Button variant="gradient" color="red" onClick={()=>{sendRequestHandler(args)}}>
           {!args.isBlocked?'unblock':'block'}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
