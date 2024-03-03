import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { insertCheckedRoomId, selectCheckedRooms, selectPrice, selectRoomId, selectRoomType, updateIsModalOpen, updateNoOfRooms, updatePrice } from "../services/priceSlice";

export function   InputModal({ inputModalOpen, setInputModalOpen,id,description }) {
  console.log(id)
  const dispatch = useDispatch();
  const selectedRoomId=useSelector(selectRoomId)
  const selectedPrice=useSelector(selectPrice)
  const selectedRooms=useSelector(selectCheckedRooms)
  const roomType=useSelector(selectRoomType)
  const handleOpen = () => dispatch(updateIsModalOpen(!inputModalOpen));
  const [noOfRooms,setNoOfRooms]=useState(1)

  return (
    <>
      <Dialog open={inputModalOpen} size="xs">
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              No of Rooms Needed
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          {/* <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write the message and then click button.
          </Typography> */}
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              No of rooms needed
            </Typography>
            <Input

              value={noOfRooms}
              onChange={(e)=>{
                setNoOfRooms(e.target.value)
              }}
              max={5} 
              label="No Of Rooms Needed"
              type="number"
            />
            {/* <Textarea label="Message" /> */}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button
            variant="gradient"
            color="gray"
            onClick={() => {
              console.log(selectedRooms)
              const modifiedRoomArray=[...selectedRooms,{id:selectedRoomId,noOfRooms:noOfRooms,price:selectedPrice,roomType:roomType}]
              dispatch(updateNoOfRooms(Number(noOfRooms)));
              dispatch(insertCheckedRoomId(modifiedRoomArray))
              handleOpen()
            }}
          >
            submit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
