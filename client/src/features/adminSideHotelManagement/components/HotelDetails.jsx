import { useParams } from "react-router-dom";
import { useGetAllHotelDetailsQuery } from "../../userManagement/services/getAllHotelDetailsApiSlice";
import { HotelTable } from "./HotelTable";
import { OwnerTable } from "./OwnerTable";
import RoomDetails from "../../hotelManagement/components/RoomsDetails";
import { RoomsTable } from "./RoomsTable";
import { Button } from "@material-tailwind/react";
import { useChangeHotelStatusMutation } from "../services/changeHotelStatusApiSlice";
import { NotificationDialog } from "../../../components/modals/NotificationModal";
import { useState } from "react";

const HotelDetails = () => {
  const { _id } = useParams();

  const [
    changeHotelStatus,
    {
      isError: changeStatusisError,
      isLoading: changeStatusIsLoading,
      isSuccess: changeStatusIsSuccess,
      reset:changeStatusReset
    },
  ] = useChangeHotelStatusMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // async function handleChange({status,hotel_id=_id}) {

  //   try {
  //     await changeHotelStatus(status)
  //   } catch (error) {
  //     console.log(error)
  //   }
    
  // }



  const {
    data: hotels,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetAllHotelDetailsQuery({ _id });

  const { hotel_details, room_details } = isSuccess ? hotels : [];


  if(isLoading || isFetching) return <h1>Loading...</h1>
  if (isSuccess)
    return (

      <>
            <NotificationDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        args={{hotel_id:_id,status:hotel_details[0]?.status==='listed'?'delisted':'listed'}}
        sendRequestHandler={changeHotelStatus}
         error = {changeStatusisError}
         loading = {changeStatusIsLoading}
         success = {changeStatusIsSuccess}
         reset={changeStatusReset}
         heading={`Do you need to ${hotel_details[0]?.status==='listed'?'delist':'list'} hotel ?`}
         description={''}
         buttonText={'change status'}
      />
      <div className="w-full h-[100%] flex flex-col justify-between items-center gap-20 m-28">
        <div className=" w-full px-6 ">
          <HotelTable data={hotel_details} />
        </div>
        <div className=" w-full px-6">
          <OwnerTable data={hotel_details} />
        </div>
        {room_details.length !== 0 && (
          <div className=" w-full px-6">
            <RoomsTable data={room_details} />
          </div>
        )}
        <div className={"flex justify-center mt-16"}>
          <Button
            onClick={() => {
              setIsModalOpen(true)
             // handleChange(hotel_details[0]?.status);
            }}
            color={
              hotel_details[0]?.status === "listed"
                ? "red"
                : hotel_details[0]?.status === "delisted"
                ? "green"
                : "green"
            }
            className=""
          >
            {hotel_details[0]?.status === "not-registered"
              ? "Approve"
              : hotel_details[0]?.status === "listed"
              ? "Delist"
              : "List"}
          </Button>
        </div>
      </div>

      </>
    );
};

export default HotelDetails;
