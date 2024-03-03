import { useState } from "react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { Button, Checkbox } from "@material-tailwind/react";
import { InputModal } from "./InputModal";
import { RoomDetailsModal } from "./RoomDetailsModal";
import SingleRoomComponent from "./SingleRoomComponent";

const RoomSection = ({
  isAccordionOpen,
  roomType,
  rooms,
  setImages,
  setSize,
}) => {



  return (
    <>      
      <div className="flex flex-col   border-2  m-4 ms-3 cursor-pointer hover:shadow-2xl w-full">
        <div className=" h-[50px] pt-3 ps-3">
          <h1 className="font-bold">{roomType}</h1>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 relative left-[94%]  bottom-6 transition-transform ${
              isAccordionOpen && "rotate-180"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

        </div>
        <div
          className={`flex flex-col justify-between min-h-[200px] ${
            !isAccordionOpen ? "hidden" : ""
          }`}
        >
          {console.log(rooms)}
          {rooms?.map(
            (
              { id,images,size, description,roomType, bathRoomType,hotel_id, location, rate, amenities },
              index
            ) => {
        
              return (
                <SingleRoomComponent
                key={id}
                  id={id}
                  hotel_id={hotel_id}
                  roomType={roomType}
                  images={images}
                  size={size}
                  description={description}
                  bathRoomType={bathRoomType}
                  location={location}
                  rate={rate}
                  amenities={amenities}
                  index={index}
                  setImages={setImages}
                  setSize={setSize}
                />
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default RoomSection;
