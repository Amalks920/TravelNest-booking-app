import { Button, Checkbox } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { RoomDetailsModal } from "./RoomDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUnCheckedRoomId,
  selectCheckedRoomById,
  selectCheckedRooms,
  selectIsModalOpen,
  selectNoOfRooms,
  updateHotelId,
  updateIsModalOpen,
  updatePrice,
  updateRoomId,
  updateRoomType
} from "../services/priceSlice";

import { InputModal } from "./InputModal";
import { set } from "date-fns";

const SingleRoomComponent = ({
  id,
  hotel_id,
  images,
  size,
  description,
  roomType,
  bathRoomType,
  location,
  rate,
  amenities,
  index,
  setImages,
  setSize,
}) => {
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [room, setRoom] = useState([]);
  const isModalOpen = useSelector(selectIsModalOpen);
  const noOfRooms = useSelector(selectNoOfRooms);
  const isRoomCheckedOrNot = useSelector((state) =>
    selectCheckedRoomById(state, id)
  );

  const selectedRooms = useSelector(selectCheckedRooms);

  const dispatch = useDispatch();

  return (
    <>
      <InputModal
        inputModalOpen={isModalOpen}
        id={id}
        description={description}
      />
      <RoomDetailsModal viewDetailsModal={viewDetailsModal} setViewDetailsModal={setViewDetailsModal} 
      room={
        room
    }/>
      <div className="border-2 grid grid-rows-[auto,auto,auto] grid-cols-12 m-4">
        <div className="row-span-1 col-span-4 p-4 mt-3">
          <p>Room Size: {size}</p>
        </div>

        <div
          onClick={() => {
            setSize("xxl");
            setImages(images.slice(0, 6));
          }}
          className=" h-fit m-1 bg-cover rounded-xl row-span-2 col-start-10 col-end-12 w-[100px]"
          style={{ backgroundImage: `url(${IMAGE_BASE_URL}/${images[0]} )` }}
        >
          <div className="relative  bg-fixed  h-[100px] min-w-fit"></div>
        </div>

        <div className="col-span-8 max-w-[100%] "></div>

        <div className="col-span-6 max-w-[100%] p-4 border-y-2">
          <h2 className="font-bold">₹{rate}</h2>
        </div>

        <div className="col-span-6  flex justify-end pe-5 border-y-2">
          <button 
          onClick={()=>{
            setViewDetailsModal(!viewDetailsModal)
            setRoom(
              {
                id,
                hotel_id,
                images,
                size,
                description,
                roomType,
                bathRoomType,
                location,
                rate,
                amenities,
                index,
                setImages,
                setSize,
              }
            )
          }}
           className="border-2 border-gray-300 text-gray-600  mx-4 mt-4 rounded-sm text-[0.8rem] px-3 h-[30px]">
            view more
          </button>
          <Checkbox
            checked={isRoomCheckedOrNot?.id === id}
            onClick={(e) => {
              if (isRoomCheckedOrNot?.id != id) {
                dispatch(updatePrice(rate));
                dispatch(updateRoomId(id));
                dispatch(updateHotelId(hotel_id));
                dispatch(updateIsModalOpen(!isModalOpen));

                dispatch(updateRoomType(roomType));
              } else {
                const indexToDelete = selectedRooms.findIndex(
                  (el) => el.id === id
                );
                const priceToMinus =
                  selectedRooms[indexToDelete].price *
                  selectedRooms[indexToDelete].noOfRooms;
                const modifiedRoomArray = selectedRooms.toSpliced(
                  indexToDelete,
                  1
                );

                dispatch(
                  removeUnCheckedRoomId({ modifiedRoomArray, priceToMinus })
                );
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SingleRoomComponent;
