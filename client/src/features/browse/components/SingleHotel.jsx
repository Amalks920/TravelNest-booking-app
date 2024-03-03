import { useState } from "react";
import React from "react";
import XXLDialog from "../../../components/modals/XXLDialog";
import { Spinner } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import useGetAHotel from "../hooks/useGetAHotel";
import { IMAGE_BASE_URL } from "../../../data/constants";
import PriceCard from "./PriceCard";
import CheckInCheckOutModal from "./CheckInCheckOutModal";
import { useSelector } from "react-redux";
import { selectRooms } from "../services/roomsSlice";
import ReviewSection from "./ReviewSection";
import { RoomDetailsModal } from "./RoomDetailsModal";
import CouponModal from "./CouponModal";

const SingleHotel = () => {
  const [size, setSize] = useState(null);
  const [imagesToPass, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);

  
  const { hotel_id, room_id,checkIn,checkOut } = useParams();

  const [open, setOpen] = useState(true);
  const [couponModalOpen,setCouponModalOpen]=useState(false);


  const {
    hotel,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    room,
    isErrorRoom,
    isFetchingRoom,
    isLoadingRoom,
    isSuccessRoom,
    isUninitializedRoom,
  } = useGetAHotel(hotel_id, room_id);

  const isPageReady =
    isLoading ||
    isFetching ||
    isUninitialized 
    isLoadingRoom ||
    isFetchingRoom ||
    isUninitializedRoom;

  if (isPageReady)
    return (
      <h1>
        <Spinner className="h-12 w-12" />
      </h1>
    );

  const { hotelName, images, description, amenities, owner_id } =
    hotel?.response[0]

  const singleRoom = room?.response[0];
  const totalAvailableRoom=room?.totalAvailableRoom;

  const reviews = hotel?.response[2];

  return (
    <>
      <XXLDialog
        className="overflow-hidden sticky !w-[80vw]"
        size={size}
        imagesToDisplayOnModal={imagesToPass}
        setSize={setSize}
      />

    <RoomDetailsModal viewDetailsModal={viewDetailsModal} setViewDetailsModal={setViewDetailsModal} room={singleRoom} />


      <CheckInCheckOutModal room_id={room_id} checkIn={checkIn} checkOut={checkOut} rate={singleRoom?.rate} open={open} setOpen={setOpen}/>

      <CouponModal couponModalOpen={couponModalOpen} setCouponModalOpen={setCouponModalOpen}/>

      <div className="grid grid-cols-12 grid-rows-[100px,200px,200px,auto,auto,auto] pb-14  w-[100vw] min-h-[100vh] mt-16  gap-2 px-9 shadow-2xl ">
        <div className="row-span-1 col-start-1 md:col-start-2 col-span-10 ">
          <h2 className="font-bold mt-11 ms-2 text-[1rem] sm:text-2xl">
            {hotelName}
          </h2>
        </div>
        <div
          onClick={() => {
            setImages(images.slice(0, 6));
            setSize("xxl");
          }}
          className="row-span-1 md:row-span-2 sm:row-span-2 xl:row-span-2 col-span-12 xl:col-start-2 xl:col-end-8 border-2 shadow-md cursor-pointer"
        >
          <div className="w-full h-full rounded-md bg-no-repeat bg-cover" style={{backgroundImage:`url(${IMAGE_BASE_URL}/${images[0]})`}}></div>
        </div>
        <div
          className={`hidden 2xl:grid row-span-1 col-span-2 border-2 bg-cover bg-no-repeat shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${singleRoom?.images[0]} )`,
          }}
        ></div>
        <div
          className={`hidden 2xl:block row-span-1 col-span-2 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${singleRoom?.images[1]} )`,
          }}
        ></div>
        <div
          className={`hidden 2xl:block row-span-1 col-start-8 col-end-10 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${singleRoom?.images[2]} )`,
          }}
        ></div>
        <div
          className={`hidden 2xl:block row-span-1 col-span-2 border-2 shadow-md rounded-md`}
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}/${singleRoom?.images[0]} )`,
          }}
        ></div>

        <div className="flex flex-col  row-span-2  md:col-start-2 md:col-span-7 col-span-12 shadow-md max-h-[100vh] overflow-scroll">
          <div className=" h-fit ">
            <h2 className="text-2xl font-bold p-4"></h2>
          </div>
          <div className=" h-fit font-medium  text-left ps-3 text-[0.9rem] leading-8">
            <h2 className="font-bold text-xl  mb-4 ">About</h2>
            <h2 className="w-[80%] text-[1rem]">{description}</h2>
          </div>
          <div className=" h-fit font-medium  text-left ps-3 text-[0.9rem] leading-8 mt-8 ">
            <button className="border-2 border-black px-3   text-[0.7rem] rounded-lg me-4 hover:transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <Link to={`/chat/${owner_id}`}>chat with user</Link>
            </button>
          </div>

          <div className=" h-fit ">{amenities}</div>
          <div className=" h-fit mt-[100px]">
            <h2 className="font-bold text-xl ms-2  mb-2">Choose Your Room</h2>

            <div className=" shadow-xl mt-[40px] border-2 rounded-lg">
              <div className="flex justify-between flex-grow h-[200px] p-5">
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold capitalize text-[1.4rem]">
                    {singleRoom?.roomType}
                  </h2>
                  <h2 className="">Room size: {singleRoom?.size}</h2>
                </div>

                <div
                  className=" h-[80%] w-[30%] rounded-md bg-cover "
                  style={{
                    backgroundImage: `url(${
                      IMAGE_BASE_URL + singleRoom?.images[0]
                    })`,
                  }}
                ></div>
              </div>

              <div className="flex justify-between p-5  border-2">
                <h2 className="font-bold text-[1.2rem]">
                  {" "}
                  ₹ {singleRoom?.rate}
                </h2>
                <button
                onClick={()=>{
                  setViewDetailsModal(!viewDetailsModal)
                }}
                 className="border-2 border-gray-500 text-[0.8rem] text-black  uppercase px-4 py-2 font-extralight ">
                  view more
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-1 md:flex md:justify-center hidden  col-span-3 rounded-lg shadow-sm">
          <PriceCard price={price} hotel_id={hotel_id} rate={singleRoom?.rate}
           roomType={singleRoom?.roomType} room_id={room_id}
            totalAvailableRooms={totalAvailableRoom} open={open} setOpen={setOpen}
             couponModalOpen={couponModalOpen} setCouponModalOpen={setCouponModalOpen}
             />
        </div>

        <div className="row-span-2 col-span-8  flex flex-col ms-[120px] mt-11 ">
        { reviews?.length!==0 && <h2 className="font-bold text-[1.2rem] pt-2 ps-5 mb-9">
            Reviews & Ratings
          </h2>}
          <ReviewSection reviews={reviews} />
        </div>
      </div>
    </>
  );
};

export default SingleHotel;
