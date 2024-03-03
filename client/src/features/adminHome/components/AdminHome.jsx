import { AgChartsReact } from "ag-charts-react";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";
import { useGetBookingsGroupedQuery, useGetSalesOFPerviousSevenDaysMutation, useGetSalesPerMonthMutation, useGetSalesPerWeekQuery, useGetYearlySalesQuery } from "../../ownerDashboard/services/dashboardApiSlice";
import {useGetTotalSalesQuery  } from "../services/adminDashboardApiSlice";


const AdminHome = () => {

  const {data:totalSales} = useGetTotalSalesQuery();

  const [lineGraph, setLineGraph] = useState({
    data: [],
    series: [],
  });
  console.log(totalSales)
  useEffect( () => {
    
 setLineGraph({
    data:totalSales?.response,
    series:[ { type: 'line', xKey: 'dayOfMonth', yKey: 'totalAmount', yName: 'totalRevenue' }]
})
  }, []);

  return (
    <div className="w-full  min-h-[100vh] flex">
      <div className="w-full grid gird-cols-12 grid-rows-[100px,150px,auto,auto,auto]">
        <div className="row-span-1 col-span-4 flex justify-left ps-[50px] items-center">
          <div>
            <h2 className="text-[1.8rem] font-bold mb-1">Dashboard</h2>
            <h2 className="text-[0.8rem]">
              Whole data about your business here
            </h2>
          </div>
        </div>

        <div className="hidden row-span-1 col-span-12  justify-around items-center gap-11 ps-[4%] px-[5%] ">
          <div className={` w-full h-[70%] border-2 shadow-md `}></div>
          <div className={` w-full h-[70%] border-2 shadow-md `}></div>
          <div className={` w-full h-[70%] border-2 shadow-md `}></div>
        </div>
        {/* <div
          className="row-span-1 col-span-6 h-[400px] pb-[100px] max-w-full 
                flex-col justify-left items-center gap-11  px-[5%] mt-8 "
        >
          <h2 className="mb-3 font-bold ms-[30px]">Sales Chart</h2>
          <button
            onClick={async () => {
              const response = await getSalesOFPerviousSevenDays({
                owner_id: user_id,
              });
              setChartOptions({
                data: response.data.response,
                series: [
                  { type: "bar", xKey: "dayOfMonth", yKey: "totalAmount" },
                ],
              });
              console.log(response);
              setBarGraphTimeFrame("daily");
            }}
            className={`capitalize border-2  text-[0.8rem] w-[70px] ms-7 rounded-md ${
              barGraphTimeFrame === "daily" && "border-blue-700"
            }`}
          >
            daily
          </button>
          <button
            onClick={() => {
              refetch();
              setBarGraphTimeFrame("weekly");
            }}
            className={`capitalize border-2  text-[0.8rem] w-[70px] ms-7 rounded-md ${
              barGraphTimeFrame === "weekly" && "border-blue-700"
            }`}
          >
            weekly{" "}
          </button>
          <button
            onClick={async () => {
              const response = await getSalesPerMonth({ owner_id: user_id });
              console.log(response.data);
              setChartOptions({
                data: response.data.response,
                series: [
                  { type: "bar", xKey: "month", yKey: "avgTotalRevenue" },
                ],
              });

              setBarGraphTimeFrame("month");
            }}
            className={`capitalize border-2  text-[0.8rem] w-[70px] ms-7 ${
              barGraphTimeFrame === "month" && "border-blue-700"
            } rounded-md`}
          >
            monthly
          </button>
          <AgChartsReact options={chartOptions} strokeWidth={10} />
        </div> */}

        {/* <div
          className="row-span-1 col-span-6 h-[400px] pb-[100px] max-w-[500px] 
                flex-col justify-left items-center gap-11  pe-[5%] mt-[5%]"
        >
           <h2 className="font-bold ms-[30px] mb-[7%]">Pie Chart</h2>

          <AgChartsReact options={pieChartOptions} strokeWidth={10} />
        </div> */}





        <div className="row-span-1 h-[450px] col-span-12 w-[90%] ms-[2%]">
          <h2 className="font-bold text-center mb-3">Total Sales Of All Hotels.</h2>
          <AgChartsReact options={lineGraph} strokeWidth={10} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
