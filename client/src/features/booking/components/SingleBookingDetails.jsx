import { useParams } from "react-router-dom";
import { useGetABookingDetailsForUserQuery } from "../services/getABookingDetailsApiSlice";
import { Button, Rating, Spinner, Textarea } from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import BookingCancelModel from "./BookingCancelModel";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";
import ReviewModal from "./ReviewModal";
import { PencilIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import PrintButton from "./PrintButton";

const SingleBookingDetails = () => {
  const { booking_id } = useParams();
  const [open, setOpen] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  
  const componentRef=useRef()

  const user_id = useSelector(selectUserId);
  const [data, setData] = useState("");

  const {
    data: booking,
    isError,
    isLoading,
    isFetching,
    isUninitialized,
    isSuccess,
  } = useGetABookingDetailsForUserQuery({ booking_id, user_id });

  if (isLoading || isFetching || isUninitialized) return <Spinner />;
  {
    console.log(booking?.response[0]?.roomDetails[0]?._id);
   
  }
  return (
    <>
      <BookingCancelModel open={open} setOpen={setOpen} data={data} />

      <ReviewModal
        openReviewModal={openReviewModal}
        setOpenReviewModal={setOpenReviewModal}
        booking_id={booking_id}
        hotel_id={booking?.response[0]?.hotel_id}
        room_id={booking?.response[0]?.roomDetails[0]?._id}
      />
      <div  className="w-[80%] mt-[2%] min-h-[100vh]">
        <h2
          className={`font-bold ${
            booking?.response[0]?.status === "checkOut"
              ? "text-green-500"
              : booking?.response[0]?.status === "cancelled"
              ? "text-red-500"
              : null
          } sm:text-2xl text-[0.8rem] ms-3`}
        >
          {booking.response[0].status === "checkOut"
            ? "Thanks for staying with us!"
            : booking?.response[0]?.status === "cancelled"
            ? "Cancelled"
            : null}
        </h2>
          <div >
        <div className=" flex justify-between items-between mt-11   sm:ms-6 w-full">
          <PrintButton booking={booking?.response} componentRef={componentRef}/>
          {console.log(booking?.response[0]?.status)}
          {booking?.response[0]?.status !== "cancelled" && booking?.response[0]?.status !== 'checkOut' ? (
            <button
              onClick={() => {
                setData({
                  user_id: user_id,
                  booking_id: booking_id,
                  status: "cancelled",
                  room_id: booking?.response[0]?.roomDetails[0]?._id,
                  totalNoOfRooms: booking?.response[0]?.totalNoOfRooms,
                  amount: booking?.response[0]?.totalAmount,
                });
                // setRoomId(booking.response[0].roomDetails[0]._id)
                // setTotalNoOfRooms(booking.response[0].totalNoOfRooms)
                setOpen(!open);
              }}
              className="sm:w-[150px] h-[30px] bg-red-500 text-white  sm:h-[40px] px-4 rounded-sm sm:me-9"
            >
              cancel
            </button>
          ) : null}
        </div>
        {booking.response.map(
          (
            {
              hotelName,
              _id,
              location,
              hotel_details,
              status,
              userName,
              checkIn,
              checkOut,
              userPhone,
              userEmail,
              roomDetails,
              totalNoOfRooms,
              totalAmount,
              discountAmount,
            },
            index
          ) => {
            return (
             
              <div ref={componentRef} className="grid grid-rows-[100px,auto,auto,auto] gird-cols-12  mt-12 gap-2 -ms-3 md:0 sm:ps-6 overflow-y-hidden mb-[200px]">
                <div className="row-span-1 col-span-12 sm:col-span-4 lg:col-span-12 md:col-span-8  flex justify-between sm:p-7  p-6">
                  <div className="">
                    <h2 className="font-normal text-[0.8rem] mb-3  md:text-[1.3rem]">
                      Booking Id
                    </h2>
                    <h2 className="mt-2 md:text-[0.8rem] text-[0.6rem]">
                      {_id}
                    </h2>
                   
                  </div>
                  <div>
                    <h2 className="sm:text-[1rem] text-[0.7rem]">
                      <span className="font-bold ">status :</span>
                      {status}
                    </h2>
                  </div>
                </div>

                <div className="row-span-1 col-span-12 flex sm:flex-row flex-col justify-between border-2">
                  <div className="row-span-1 p-5 flex flex-col">
                    <h2 className=" sm:text-[1.2rem] mb-3 text-[0.9rem]">
                      {hotelName}
                    </h2>
                    <h2 className="sm:text-[0.9rem]  text-[0.7rem]">
                      {hotel_details.location}
                    </h2>

                    <div className="mt-10 col-span-12 mb-[30px]">
                      <h2 className="  mb-1 sm:text-[1.2rem] text-[0.9rem] leading-10">
                        Hotel Description
                      </h2>
                      <h2 className="sm:text-[0.9rem] text-[0.7rem]  leading-relaxed mt-4 sm:w-full w-[70vw] line-clamp-3   ">
                        {hotel_details.description}
                      </h2>
                    </div>
                  </div>

                  <div className="row-span-1 col-span-4 m-4">
                    <img
                      src={IMAGE_BASE_URL + hotel_details.images[0]}
                      alt=""
                      className="rounded-md  sm:w-full w-[270px]"
                    />
                  </div>
                </div>

                <div className="row-span-1 sm:col-span-3 col-span-full p-7 border-l-2">
                  <h2 className="mb-3">Primary Guest</h2>
                  <h2 className=" text-[0.9rem]">{userName}</h2>
                </div>

                <div className="row-span-1 sm:col-span-3 col-span-full p-7">
                  <h2 className="mb-3">CheckIn</h2>
                  <h2 className=" text-[0.9rem]">
                  {format(checkIn, "yyyy-MM-dd HH:mm:ss", {
                    timeZone: "Asia/Kolkata",
                  })}
                  </h2>
                </div>

                <div className="row-span-1 sm:col-span-3 col-span-full p-7  ">
                  <h2 className="mb-3">CheckOut</h2>
                  <h2 className=" text-[0.9rem]">
                  {format(checkOut, "yyyy-MM-dd HH:mm:ss", {
                    timeZone: "Asia/Kolkata",
                  })}
                  </h2>
                </div>

                {/* <div className="row-span-1 sm:col-span-3 col-span-full p-7 flex  border-r-2">
                  <h2 className="mb-3 text-[0.9rem]">1 Day</h2>
                </div> */}

                <div className="row-span-1 sm:col-span-3 col-span-full p-7 border-l-2 border-b-2">
                  <h2 className="mb-3">user email</h2>
                  <h2 className=" text-[0.9rem]">{userEmail}</h2>
                </div>

                <div className="row-span-1 sm:col-span-3 col-span-full p-7  border-b-2">
                  <h2 className="mb-3">user phone</h2>
                  <h2 className=" text-[0.9rem]">{userPhone}</h2>
                </div>

                <div className="row-span-1 sm:col-span-3 col-span-full p-7  border-b-2 ">
                  <h2 className="mb-3">Room Type</h2>
                  <h2 className=" text-[0.9rem]">{roomDetails[0]?.roomType}</h2>
                </div>
                <div className="row-span-1 sm:col-span-3 col-span-full p-7  border-b-2 ">
                  <h2 className="mb-3">No Of Room</h2>
                  <h2 className=" text-[0.9rem]">{roomDetails[0]?.noOfRooms}</h2>
                </div>
                <div className="row-span-1 sm:col-span-3 col-span-full p-7  border-b-2 ">
                  <h2 className="mb-3">Rate Per Room</h2>
                  <h2 className=" text-[0.9rem]">{roomDetails[0]?.rate}</h2>
                </div>
          

                <div className="row-span-1 col-span-12 mt-[100px]">
                  <div className="row-span-1 col-span-12">
                    <h2 className="font-bold my-5 ms-2">Payment Details</h2>
                  </div>

                  <div className="row-span-1 col-span-12 flex sm:flex-row flex-col justify-between border-2  p-5">
                    <h2 className="font-bold text-[0.9rem]">Total Amount</h2>
                    <h2 className="">₹ {totalAmount}</h2>
                  </div>
               
                  <div className="row-span-1 col-span-12 flex sm:flex-row flex-col justify-between border-2 mt-5 p-5">
                    <h2 className="font-bold text-[0.9rem]">Discount</h2>
                    <h2 className="">₹ {discountAmount}</h2>
                  </div>

                 
                  {!booking?.reviewResponse?._id ? (
                    <div className={`row-span-1 col-span-12 flex sm:flex-row flex-col justify-between border-2 mt-5 p-5 ${status!='checkOut'?'hidden':null}`}>
                      <h2 className="font-bold text-[0.9rem]">
                        Write a Review
                      </h2>
                      <Button
                        onClick={() => {
                          setOpenReviewModal(!openReviewModal);
                        }}
                        size="sm"
                        className="text-[0.6rem]"
                      >
                        write a review
                      </Button>
                    </div>
                  ) : (
                    <>
                    <h2 className={`font-bold mt-20 ms-2 ${status!='checkOut'?'hidden':null}`}>Review</h2>
                    <div className={`row-span-1 col-span-12 flex sm:flex-col flex-col justify-between border-2 mt-5 p-5 gap-5 ${status!='checkOut'?'hidden':null}`}>
                      <div><Rating value={booking.reviewResponse.rating} readonly/></div>
                      <div className="flex gap-5">
                        {
                          booking.reviewResponse.images.map((image,index)=>{
                            return <img src={`${IMAGE_BASE_URL+image}`}  width={150} className="rounded-md"/>
                          })
                        }
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <h2 className="font-bold">Description</h2>
                        <h2 className="text-[0.8rem]">{booking.reviewResponse.description}</h2>
                        </div>
                       

                        <PencilIcon
                          width={15}
                          className="cursor-pointer me-6"
                        />
                      </div>

                    </div>
                    </>
                  )}
                </div>
              </div>
            );
          }
        )}
</div>
      </div>
    </>
  );
};

export default SingleBookingDetails;
