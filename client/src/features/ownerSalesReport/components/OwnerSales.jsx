import { useParams } from "react-router-dom";
import { useFilterBookingsByDateMutation, useGetSalesReportBookingsQuery } from "../services/salesReportApiSlice";
import { useEffect, useRef, useState } from "react";
import useGetSales from "../hooks/userGetSales";
import { getYesterdayDateString } from "../../../utils/formatDate";
import { useReactToPrint } from "react-to-print";

const OwnerSales = () => {
  const { hotel_id } = useParams();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [bookingSales, setBookingDetails] = useState([]);

  const data = useGetSales(bookingSales, setBookingDetails);
  const componentRef=useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const {data:bookingSales,isError,isFetching,isLoading,isSuccess}=  useGetSalesReportBookingsQuery({hotel_id})

  // console.log(bookingSales.response)

  const [filterBookingsByDate]=useFilterBookingsByDateMutation()
  return (
    <div className=" w-full  min-h-[100vh]">
      <h2 className="text-center mt-[50px] text-[1.1rem] py-5">Sales Report</h2>
      <div ref={componentRef} className="grid grid-flow-row grid-cols-12 mx-6 shadow-md border-t-2 rounded-md">
        <div className="row-span-1 col-start-5 col-end-13  h-[100px]">
          <div className="flex gap-3 justify-around items-center   h-full">
            <input
              onInput={(e) => {
                setStartDate(e.target.value);
              }}
              max={endDate || getYesterdayDateString()}
              className="h-[40px] bg-blue-gray-50 w-[25%] text-[0.7rem] ps-2  rounded-lg "
              type="date"
            />
            <input
                          min={startDate}
                          max={startDate || getYesterdayDateString()}
              onInput={(e) => {
                setEndDate(e.target.value);
              }}
              className="h-[40px] bg-blue-gray-50 w-[25%] text-[0.7rem] ps-2 rounded-lg "
              type="date"
            />
            <button 
                        onClick={async ()=>{
                          const response= await   filterBookingsByDate({startDate,endDate})
                          console.log(response)
                          setBookingDetails(response.data)
                         }}
            className=" px-4 py-1  bg-black text-white h-[37px] text-[0.8rem] rounded-none">
              Update search
            </button>
            <button
            onClick={()=>{
              handlePrint()
            }}
             className="text-[0.8rem]">Download Report</button>
          </div>
        </div>

        <div className="row-span-1 col-span-full  border-y-[1px]">
          <div className="flex justify-around  py-5 ps-[3%] gap-10">
            <div className="text-[0.9rem] w-full">SL NO</div>
            <div className="text-[0.9rem] w-full">Billing Name</div>
            <div className="text-[0.9rem] w-full">Date</div>
            <div className="text-[0.9rem] w-full">Total</div>
            <div className="text-[0.9rem] w-full">Payment Method</div>
            <div className="text-[0.9rem] w-full"></div>
          </div>
        </div>

        {bookingSales?.response?.map((booking, index) => {
          {
            console.log(booking);
          }
          return (
            <div className="row-span-1 col-span-full ">
              <div className="flex justify-around  py-5 ps-[3%] gap-10">
                <div className="text-[0.8rem] w-full">{index + 1}</div>
                <div className="text-[0.8rem] w-full">{booking?.bookings[0]?.userName}</div>
                <div className="text-[0.8rem] w-full">{booking?.bookings[0]?.createdAt}</div>
                <div className="text-[0.8rem] w-full">
                  {booking?.bookings[0]?.totalAmount}
                </div>
                <div className="text-[0.8rem] w-full">
                  {booking?.bookings[0]?.paymentType}
                </div>
                <div className="text-[0.8rem] w-full"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OwnerSales;
