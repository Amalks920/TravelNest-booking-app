
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useCancelBookingMutation } from "../services/cancelBookingApiSlice";
 
export function BookingCancelModel({open,setOpen,data}) {
 
  const [cancelBooking,{isError,isLoading,isSuccess}]=useCancelBookingMutation()

  const handleOpen = () => setOpen(!open);

  const handleSubmit= async ()=>{
    console.log(data)
    await cancelBooking(data);

    handleOpen()
    console.log('hiiiiii')
  }

 
  return (
    
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="sm:text-xl text-[1rem]">Do you want to canel Booking?</DialogHeader>
 
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span className="">Close</span>
          </Button>
          <Button className="sm:text-[0.7rem] text-[0.5rem]"  variant="gradient" color="red" size="sm"
          onClick={()=>{
            handleSubmit()
        }
    }
           >
            <span>Confirm Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}


// const BookingCancelModel=()=>{
//     return (
        
//     )
// }

 export default BookingCancelModel;