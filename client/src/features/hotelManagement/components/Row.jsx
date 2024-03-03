import { PencilIcon } from "@heroicons/react/24/solid"
import { Input } from "@material-tailwind/react"
import { useEditRoomDescriptionMutation,useAddRoomImagesMutation, useUpdateRoomNumberMutation } from "../services/editRoomDetailsApiSlice"
import { InputModal } from "./InputModal"
import { useRef, useState } from "react"
import { RoomEditInput } from "./RoomEditInput"
import { NotificationDialog } from "../../../components/modals/NotificationModal"


const Row=({room})=>{
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const imageToBeRemoved=useRef(null)
  const [isModalOpen,setIsModalOpen]=useState(null)
  const [InputDetailsToPass, setInputDetails] = useState(null);
  const [roomImages,setRoomImages]=useState([])
  const room_id=room?._id

  const [addRoomImages,{isError,isLoading,isSuccess,reset,error}]=useAddRoomImagesMutation({room_id})


  const handleImageUpdate=async (data)=>{
    try {
      const res=await addRoomImages(data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }




    return (
  <>
        {inputModalOpen && (
        <RoomEditInput
          inputModalOpen={inputModalOpen}
          setInputModalOpen={setInputModalOpen}
          InputDetailsToPass={InputDetailsToPass}
          _id={room?._id}
        />
      )}

{/* <NotificationDialog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          heading={'Do you want to delete this Image?'}
          description={'image will be deleted from room'}
          buttonText={'Delete'}
          args={{room_id,imageToBeRemoved:imageToBeRemoved.current}}
          // isBlocked={!isBlockedRef.current}
          // user_id={userIdRef.current}
           sendRequestHandler={addImages}
           error = {error}
           loading = {isLoading}
           success = {isSuccess}
           reset={reset}
        /> */}

      <div className="grid grid-rows-[auto,auto,auto,auto] gap-3 grid-flow-col  p-4">
      <div className=" flex justify-start items-center p-2">Description</div>
      <div className=" flex justify-start items-center p-2">No of Rooms</div>
      <div className=" flex justify-start items-center p-2">Description</div>
      <div className=" flex justify-start items-center p-2">
        upload images
      </div> 

      <div className="p-3  text-[0.9rem] ">
        {/* {isLoading ? (
          <Spinner className="h-6 w-6 relative left-16" />
        ) : (
          
        )} */}
       <h2 className="max-w-[500px]">{room?.description}</h2> 
      </div>
      <div className="p-3 text-[0.9rem]">{room?.noOfRooms}</div>
      <div className="max-w-[500px] p-3 text-[0.9rem]">
        {''}
      </div>

      <div className="max-w-[500px] p-3 text-[0.9rem]">
        <Input
        onInput={(e)=>{
          setRoomImages(e.target.files)
        }}
         size="sm" className="w-[50%]" type="file" accept="image/*" multiple/>
      </div>

      <div className=" flex justify-center">
        <PencilIcon
          onClick={() => {
            setInputModalOpen(true);
            setInputDetails({
              name: "description",
              label: "room description",
              type: "text",
              value: room?.description,
            });
          }}
          width={15}
          className="cursor-pointer me-6"
        />
      </div>

      <div className="flex justify-center">
        <PencilIcon
          onClick={() => {
            setInputModalOpen(true);
            setInputDetails({
              name: "noOfRooms",
              label: "noOfRooms",
              type: "number",
              value: room?.noOfRooms,
            });
          }}
          width={15}
          className="cursor-pointer me-6"
        />
      </div>
      <div className="flex justify-center">
        {/* <PencilIcon
          onClick={() => {
            setInputModalOpen(true);
            setInputDetails({
              name: "description",
              label: "description",
              type: "text",
              value: hotel?.description,
            });
          }}
          width={15}
          className="cursor-pointer me-6"
        /> */}
      </div>
      <div className="flex justify-center">
        <svg

        onClick={()=>{
          const formData=new FormData()
          formData.set('room_id',room?._id)
          console.log(roomImages)
          for (var i = 0; i < roomImages.length; i++) {
            formData.append("images", roomImages[i]);
          }

          console.log(formData)
          handleImageUpdate(formData)
          }}

          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mt-4 -ms-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>
      
    </div>
  </>
    )
}

export default Row