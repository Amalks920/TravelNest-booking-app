


import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDeListCouponMutation } from "../services/couponApiSlice";
 
export function CancelCouponModal({open,setOpen,id,status}) {
 
const [deListCoupon,{isError,isLoading,isSuccess,isUninitialized}]=useDeListCouponMutation({id,status})

  const handleOpen = () => setOpen(!open);

  const handleSubmit= async ()=>{
    
    await deListCoupon({id:id,status:status});

    handleOpen()
   
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
        <DialogHeader className="sm:text-xl text-[1rem]">Do you want to change coupon status ?</DialogHeader>
 
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
            <span>Confirm</span>
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

 export default CancelCouponModal;