import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../../data/constants";
 
export function RoomDetailsModal({viewDetailsModal,setViewDetailsModal,room}) {
 
  const handleOpen = () => setViewDetailsModal(!viewDetailsModal);
    
  return (
    <>

      <Dialog open={viewDetailsModal} handler={handleOpen}>
        <DialogHeader>Room Details</DialogHeader>
        <DialogBody className="h-[42rem] overflow-scroll">
 
           <div className="flex flex-col">
            <h2 className="font-bold text-xl">Description</h2>
            <h2 className="mt-3">{room?.description}</h2>
     
           </div>
           <div className="flex flex-col mt-11">
            <h2 className="font-bold text-xl">Bathroom Type</h2>
            <h2 className="mt-3">{room?.bathRoomType}</h2>

           </div>
           <div className="flex flex-col mt-11">
            <h2 className="font-bold text-xl">Room Type</h2>
            <h2 className="mt-3">{room?.roomType}</h2>
           </div>
           <div className="flex flex-col mt-11">
            <h2 className="font-bold text-xl">Images</h2>
            <div className="flex gap-3 mt-11">
              {console.log(room?.images)}
              {room?.images?.map((image,index)=>{
                return <img src={`${IMAGE_BASE_URL+image}`} width={150} alt="" />
              })}
            </div>
           </div>

        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
  
        </DialogFooter>
      </Dialog>
    </>
  );
}