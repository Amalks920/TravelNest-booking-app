import { PencilIcon } from "@heroicons/react/24/solid";
import { InputModal } from "./InputModal";
import { useEffect, useState } from "react";
import { Loader } from "../../../components/Loader";
import { Input, Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAddImagesMutation } from "../services/editHotelDetailsApiSlice";

const TableRow = ({ hotel, isLoading }) => {
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [InputDetailsToPass, setInputDetails] = useState(null);
  const [images,setImages]=useState(null)

const [addImages,{isError:addImagesIsError,isLoading:addImagesIsLoading,isSuccess:addImagesIsSuccess}]=useAddImagesMutation();

  // useEffect(()=>{
  //   handleImageUpdate()
  // },[images])

  const handleImageUpdate=async (data)=>{
    try {
      const res=await addImages(data)
      console.log(res)
      setImages(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {inputModalOpen && (
        <InputModal
          inputModalOpen={inputModalOpen}
          setInputModalOpen={setInputModalOpen}
          InputDetailsToPass={InputDetailsToPass}
          _id={hotel?._id}
        />
      )}
      <div className="grid grid-rows-[auto,auto,auto,auto] gap-10 grid-flow-col  p-4">
        <div className=" flex justify-start items-center p-2">Hotel Name</div>
        <div className=" flex justify-start items-center p-2">Location</div>
        <div className=" flex justify-start items-center p-2">Description</div>
        <div className=" flex justify-start items-center p-2">
          upload images
        </div>

        <div className="p-3  text-[0.9rem]">
          {isLoading ? (
            <Spinner className="h-6 w-6 relative left-16" />
          ) : (
            hotel?.hotelName
          )}
        </div>
        <div className="p-3 text-[0.9rem]">{hotel?.location}</div>
        <div className="max-w-[500px] p-3 text-[0.9rem]">
          {hotel?.description}
        </div>

        <div className="max-w-[500px] p-3 text-[0.9rem]">
          <Input
          onChange={(e)=>{
            setImages(e.target.files)
            //console.log(e.target.files)
          }}
           size="sm"  className="w-[50%]" type="file" accept="image/*" multiple/>
        </div>

        <div className=" flex justify-center">
          <PencilIcon
            onClick={() => {
              setInputModalOpen(true);
              setInputDetails({
                name: "hotelName",
                label: "hotel name",
                type: "text",
                value: hotel?.hotelName,
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
                name: "location",
                label: "Location",
                type: "text",
                value: hotel?.location,
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
                name: "description",
                label: "description",
                type: "text",
                value: hotel?.description,
              });
            }}
            width={15}
            className="cursor-pointer me-6"
          />
        </div>
        <div className="flex justify-center">
          <svg

            onClick={()=>{
              const formData=new FormData()
              formData.set('hotel_id',hotel?._id)
              console.log(images)
              for (var i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
              }

              console.log(formData)
              handleImageUpdate(formData)
              //  addImages(formData);
            }}

            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-4 -ms-5 cursor-pointer"
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
  );
};

export default TableRow;
