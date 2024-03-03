import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../data/constants";
 
 function XXLDialog({size,setSize,imagesToDisplayOnModal}) {

 
  const handleOpen = (value) =>{
    console.log(value)
     setSize(value);
    }
 
  return (
    <>

      <Dialog
      className="border-2 border-black"
        open={
          // size === "xs" ||
          // size === "sm" ||
          // size === "md" ||
          // size === "lg" ||
          // size === "xl" ||
          size === "xxl"
        }
        size={'xxl'}
        handler={handleOpen}
        
      >
        <DialogHeader>Images.</DialogHeader>
        <DialogBody className=" h-full">
        <div className="grid grid-rows-[50%,50%] grid-cols-3 h-full gap-2">
          {
            imagesToDisplayOnModal?.map((image,index)=>{
              console.log(image)
              return(   
                <div key={index} className="flex col-span-1 bg-cover bg-no-repeat " style={{backgroundImage:`url(${IMAGE_BASE_URL}/${image})`}}>

                  {/* <img className="justify-center items-center w-full" src={`${IMAGE_BASE_URL}/${image}`} alt="image not found" /> */}
                </div>
                )
            })
          }

        </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {/* <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default XXLDialog;