import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBookingForOwnerQuery } from "../services/getSingleBookingApiSlice";
import { Button, Option, Select, Spinner } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useChangeBookingStatusMutation } from "../services/changeBookingStatusApiSlice";
import { Formik } from "formik";
import { useCancelBookingMutation } from "../../booking/services/cancelBookingApiSlice";

const BookingDetails = () => {
  const { booking_id } = useParams();
  const navigate=useNavigate()

  const {
    data: bookings,
    isError,
    isLoading,
    isSuccess,
  } = useGetSingleBookingForOwnerQuery({ booking_id });
    
  const [
    changeBookingStatus,
    {
      isError: isErrorChangeStatus,
      isLoading: isLoadingChangeStatus,
      isSuccess: isSuccessChangeStatus,
    },
  ] = useChangeBookingStatusMutation();

  const [cancelBooking,{isError:isErrorCancelBooking,isLoadingCancelBooking,isSuccessCancelBooking}]=useCancelBookingMutation()

  if (isLoading) return <Spinner />;
  console.log(bookings.response[0].hotel_id)
  const {userId,roomDetails,totalNoOfRooms,totalAmount}=bookings.response[0];

  const handleSubmit = async (values) => {
    console.log(roomDetails)
    if(values.status==='cancelled'){
        await cancelBooking({
                  user_id: userId,
                  booking_id: booking_id,
                  status: "cancelled",
                  roomDetails: roomDetails,
                  totalNoOfRooms: totalNoOfRooms,
                  amount: totalAmount
        })
    }else{
      await changeBookingStatus({
        status: values.status,
        booking_id: booking_id,
      });
    }

      navigate(`/owner/bookings-list/${bookings.response[0].hotel_id}`)
  };

  // const handleSubmit = async () => {
  //   await changeBookingStatus({status:'',booking_id:booking_id});
  // };

  return (
    <div className="grid grid-rows-3 grid-cols-4 w-full m-1 p-5">
      {bookings.response.map(
        (
          {
            userName,
            status,
            checkIn,
            checkOut,
            userEmail,
            userPhone,
            roomDetails,
            totalAmount
          },
          index
        ) => {
          return (
            <>
              <div className="row-span-1 lg:col-span-1 col-span-full xl:col-span-1  border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem] font-bold font-body">Primary Guest</h2>
                <h2 className="  text-[0.9rem]">{userName}</h2>
              </div>
              <div className="row-span-1 lg:col-span-1 col-span-full xl:col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem] font-bold font-body">Check In</h2>
                <h2 className="  text-[0.9rem]">{checkIn}</h2>
              </div>
              <div className="row-span-1 lg:col-span-1 col-span-full xl:col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem] font-bold font-body">Check Out</h2>
                <h2 className="  text-[0.9rem]">{checkOut}</h2>
              </div>
              <div className="row-span-1 lg:col-span-1 col-span-full xl:col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem] font-bold font-body">Email</h2>
                <h2 className=" text-[0.9rem]">{userEmail}</h2>
              </div>
              <div className="row-span-1 lg:col-span-1 col-span-full xl:col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem] font-bold font-body">Phone</h2>
                <h2 className="  text-[0.9rem]">{userPhone}</h2>
              </div>
              <div className="row-span-1 xl:col-span-2 col-span-full border-2 flex flex-col   p-5 gap-3">
                <h2 className=" text-[1rem] font-bold font-body">status</h2>
                <div className="w-96">
                  <Formik
                    initialValues={{
                      status: status,
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      setFieldValue,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <>
                      <div className="flex col-span-3">
                        <select
                          className="w-[200px] h-[30px] ps-2 me-2 rounded-lg"
                          onChange={handleChange}
                          label="Change Status"
                          name="status"
                          value={values.status}
                        >
                          {console.log(status)}
                          {console.log('status')}
                          <option className={`${status==='paid'||'cancelled'?'hidden':null}`} value="paid">Paid</option>
                          <option className={`${status==='checkIn'  ?'hidden':status==='cancelled'?'hidden':null}`} value="checkIn">CheckIn</option>
                          <option className={`${status==='checkOut'?'hidden':status==='cancelled'?'hidden':null}`} value="checkOut">CheckOut</option>
                          <option className={`${status==='cancelled'?'hidden':null}`} value="cancelled">cancel</option>
                        </select>
                        <Button
                          onClick={() => {
                            handleSubmit();
                          }}
                          size="sm"
                          className="ms-28 mt-5 me-2 relative -left-28 bottom-5 "
                        >
                          submit
                        </Button>
                        </div>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="row-span-1 col-span-4 mt-16">
              
              </div>


            {
              roomDetails.map((room,index)=>{


            return  <>            
                  <div className="row-span-1  p-5 flex md:flex-row flex-col -mt-10  md:gap-36 gap-8 col-span-full">
                    <div className=" h-[100px] mt-5">
                    <h2 className="mb-6 font-bold font-body">Room Type
                    </h2>
                    <h2 className=" capitalize">{room.roomType}</h2>
                    </div>

                    <div className=" h-[100px] mt-5">
                    <h2 className="mb-6 font-bold font-body">Price
                    </h2>
                    <h2 className="capitalize">{room.rate}</h2>  
                    </div>

                    <div className=" h-[100px] mt-5">
                    <h2 className="mb-6 font-bold font-body">No Of People Allowed
                    </h2>
                    <h2 className=" capitalize">{room.noOfPeopleAllowed}</h2>  
                    </div>

                  </div>
              </>
                 })
            }

            <div className="row-span-1 col-span-full flex justify-between items-center mt-10 px-5 border-2 py-4">
              <h2>Total Amount</h2>
              <h2 className="font-bold">₹ {totalAmount}</h2>
            </div>
            </>
          );
        }
      )}
    </div>
  );
};

export default BookingDetails;
