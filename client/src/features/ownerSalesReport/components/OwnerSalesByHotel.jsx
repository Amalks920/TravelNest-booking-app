import { useRef, useState } from "react";
//import { useGetSalesReportForOwnerQuery } from "../services/salesReportApiSlice";
import { Link } from "react-router-dom";
import useGetSales from "../hooks/userGetSales";
import useGetSalesByDate from "../hooks/useGetSalesByDate";
import { useDownloadSalesReportMutation } from "../services/salesReportApiSlice";
import { getYesterdayDateString } from "../../../utils/formatDate";
import { useReactToPrint } from "react-to-print";




const OwnerSalesByHotel = () => {

  //const [downloadSalesReport]=useDownloadSalesReportMutation()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const [salesReport, setBookingDetails] = useState([]);
  const componentRef=useRef(null)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const data = useGetSales(salesReport, setBookingDetails);

  const filterOwnerSalesByDate = useGetSalesByDate(
    salesReport,
    setBookingDetails
  );
  // const {data:salesReport,isError,isFetching,isLoading}=useGetSalesReportForOwnerQuery({user_id})

  // console.log(salesReport?.response)
  // console.log('responseeeee')
  return (
    <div className=" w-full  min-h-[100vh]">
      <h2 className="text-center mt-[50px] text-[1.1rem] py-5">Sales Report</h2>
      <div ref={componentRef} className="grid grid-flow-row grid-cols-12 mx-6 shadow-md  rounded-md">
        <div className="row-span-1 col-start-5 col-end-13  h-[100px]">
          <div className=" gap-3 justify-around items-center hidden   h-full">
            <input
              onInput={(e) => {
                setStartDate(e.target.value);
              }}
              
              max={endDate || getYesterdayDateString()}
              className="h-[40px]  bg-blue-gray-50 w-[25%] text-[0.7rem] ps-2  rounded-lg "
              type="date"
            />
            <input
              onInput={(e) => {
                setEndDate(e.target.value);
              }}
              min={startDate}
              max={startDate || getYesterdayDateString()}
              className="h-[40px] bg-blue-gray-50 w-[25%] text-[0.7rem] ps-2 rounded-lg "
              type="date"
            />
            <button
              onClick={async () => {
                const response=await filterOwnerSalesByDate({ startDate, endDate });
                setBookingDetails(response?.data)   
              }}
              className=" px-4 py-1  bg-black text-white h-[37px] text-[0.8rem] rounded-none"
            >
              Update search
            </button>

            <button 
            onClick={async ()=>{
              handlePrint()
             // await downloadSalesReport()
              
            }}
            className="text-[0.8rem]">Download Report</button>
            {/* <button className="text-[0.8rem]">Download Report</button> */}
          </div>
        </div>

        <div className="row-span-1 col-span-full  border-y-[1px]">
          <div className="flex justify-around  py-5 ps-[3%]">
            <div className="text-[0.9rem] w-full">SL NO</div>
            <div className="text-[0.9rem] w-full">Hotel's Name</div>
            <div className="text-[0.9rem] w-full">Total Revenue</div>
            <div className="text-[0.9rem] w-full">Total Bookings</div>
            <div className="text-[0.9rem] w-full"></div>
          </div>
        </div>

        {salesReport?.response?.map((sales, index) => {
          console.log(sales);
          return (
            <div className="row-span-1 col-span-full ">
              <div className="flex justify-around  py-5 ps-[3%] gap-10">
                <div className="text-[0.8rem] w-full">{index + 1}</div>
                <div className="text-[0.8rem] w-full">{sales?.hotelName}</div>
                <div className="text-[0.8rem] w-full">
                  {sales?.totalRevenue}
                </div>
                <div className="text-[0.8rem] w-full">{sales?.bookings.length}</div>
                <div className="text-[0.6rem] w-full text-blue-900 cursor-pointer">
                  <Link to={`/owner/sales-report/${sales?.hotel_id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OwnerSalesByHotel;
