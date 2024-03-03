import { Option, Select, Spinner } from "@material-tailwind/react";
import {
  useGetTotalPageNumberOfUserBookingQuery,
  useGetBookingsOfUserQuery,
} from "../services/getBookingsOfUserApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";
import { IMAGE_BASE_URL } from "../../../data/constants";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Pagination from "../../../layouts/Pagination";
import { useState } from "react";

const BookingDetails = () => {
  const user_id = useSelector(selectUserId);



 
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: bookings,
    isError,
    isLoading,
    isSuccess,
  } = useGetBookingsOfUserQuery({ user_id, pageNumber });
  const {
    data: bookingLength,
    isError: isErrorLength,
    isSuccess: isSuccessLength,
    isLoading: isLoadingLength,
  } = useGetTotalPageNumberOfUserBookingQuery({ user_id });
console.log(bookingLength)
  if (isLoading) return <Spinner />;
  return (
    <div className="grid grid-flow-row grid-cols-3 shadow-md border-2 md:w-[80%] w-full p-5 pb-14 rounded-md">
      <div className="col-span-1 flex p-5">
        <h2 className="font-bold md:text-2xl text-[1rem]">Booking History</h2>
      </div>
      <div className="col-span-2 flex md:justify-end   p-5">
        <div className="md:w-72 sm:w-32 w-20">
          <Select label="Select Status" size="sm">
            <Option>CheckIn</Option>
            <Option>CheckOut</Option>
            <Option>Paid</Option>
          </Select>
        </div>
      </div>

      {bookings.response.map(
        (
          {
            checkIn,
            checkOut,
            hotelName,
            status,
            totalNoOfRooms,
            hotelImages,
            totalAmount,
            _id,
          },
          index
        ) => {
          return (
            <>
              <div className="col-span-1 flex justify-center items-center p-7 border-t-2">
                <img
                  src={IMAGE_BASE_URL + hotelImages[0]}
                  alt=""
                  width={150}
                  height={150}
                  className="rounded-md md:h-[80px] h-[50px]"
                />
              </div>
              <div className="col-span-1 flex flex-col justify-center items-left gap-3 border-t-2">
                <h2 className="font-normal md:text-[1.1rem] sm:text-[0.8rem] text-[0.6rem] ">
                  {hotelName}
                </h2>
                <h2 className="md:text-[0.6rem] text-[0.5rem]">
                  {format(checkIn, "yyyy-MM-dd HH:mm:ss", {
                    timeZone: "Asia/Kolkata",
                  })}{" "}
                  -{" "}
                  {format(checkOut, "yyyy-MM-dd HH:mm:ss", {
                    timeZone: "Asia/Kolkata",
                  })}
                </h2>
              </div>
              <div className="col-span-1 flex flex-col justify-center items-center gap-2 border-t-2">
                <h2 className="font-normal sm:text-sm text-[0.7rem]">
                  {status}
                </h2>
                <h2 className="font-bold sm:text-sm text-[0.7rem]">
                  ₹{totalAmount}
                </h2>
                <Link
                  to={`/single-booking-details/${_id}`}
                  className="text-red-500 sm:text-[0.6rem] text-[0.4rem] ms-10 cursor-pointer"
                >
                  View Details?
                </Link>
              </div>
            </>
          );
        }
      )}
      <div className="col-span-full py-3 flex justify-center mt-10">
        {console.log(bookingLength?.response)}
        <Pagination setPageNumber={setPageNumber} length={bookingLength?.response} maxDocumentInAPage={3} pageNumber={pageNumber} />
      </div>
    </div>
  );
};

export default BookingDetails;
