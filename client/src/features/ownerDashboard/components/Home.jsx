import { AgChartsReact } from "ag-charts-react";
import { useEffect, useState } from "react";
import {
  useGetBookingsGroupedQuery,
  useGetDashBoardDatasQuery,
  useGetSalesOFPerviousSevenDaysMutation,
  useGetSalesPerMonthMutation,
  useGetSalesPerWeekQuery,
  useGetYearlySalesQuery,
} from "../services/dashboardApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";

const Home = () => {
  const user_id = useSelector(selectUserId);

  const {
    data: salesPerWeek,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useGetSalesPerWeekQuery({ owner_id: user_id });

  const [getSalesPerMonth] = useGetSalesPerMonthMutation();
  const [getSalesOFPerviousSevenDays] =
    useGetSalesOFPerviousSevenDaysMutation();
 
    const {data:bookingsGrouped}=useGetBookingsGroupedQuery({owner_id:user_id})

  const [pieChartOptions, setPieChartOptions] = useState({
    data: [],
    series: [],
  });

  const { data: yearlySales } = useGetYearlySalesQuery({ owner_id: user_id });


  console.log(yearlySales?.response);
  console.log("yearly seales repsone");
  const [barGraphTimeFrame, setBarGraphTimeFrame] = useState("weekly");
  const [chartOptions, setChartOptions] = useState({
    data: [],
    series: [],
  });

  const [lineGraph, setLineGraph] = useState({
    data: [],
    series: [],
  });

  const {data}=useGetDashBoardDatasQuery({owner_id:user_id})

  useEffect(() => {
    console.log(salesPerWeek?.response);
    setChartOptions({
      data: salesPerWeek?.response,
      series: [{ type: "bar", xKey: "weekInMonth", yKey: "avgTotalRevenue" }],
    });

    setLineGraph({
      data: yearlySales?.response,
      series: [{ type: "line", xKey: "dayOfMonth", yKey: "totalAmount" }],
    });

    setPieChartOptions({
        data:bookingsGrouped?.response,
        series: [{ type: 'pie', angleKey: 'totalbooking', legendItemKey: '_id' }],
    })

  }, [salesPerWeek,yearlySales,bookingsGrouped]);

  return (
    <div className="w-full  min-h-[100vh] flex">
      <div className="w-full grid gird-cols-12 grid-rows-[100px,10px,auto,auto,auto]">
        <div className="row-span-1 col-span-4 flex justify-left ps-[50px] items-center">
          <div>
            <h2 className="text-[1.8rem] font-bold mb-1">Dashboard</h2>
            <h2 className="text-[0.8rem]">
              Whole data about your business here
            </h2>
          </div>
        </div>

        <div className="flex row-span-1 col-span-12  justify-around items-center gap-11 ps-[4%] px-[5%] ">
          <div className={`hidden w-full h-[70%]  justify-left gap-3 ps-[20px] `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-1w-12">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
    <div>
      <h2 className="mt-[35px] text-[1.2rem] font-bold">Revenue</h2>
    </div>
          </div>
          <div className={` w-full h-[70%]  `}></div>
          <div className={` w-full h-[70%]  `}></div>
        </div>

        <div
          className="row-span-1 col-span-6 h-[400px] pb-[100px] max-w-[500px] 
                flex-col justify-left items-center gap-11  px-[5%] mt-8 "
        >
          <h2 className="mb-3 font-bold ms-[30px]">Monthly Sales Chart</h2>
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
        </div>

        <div
          className="row-span-1 col-span-6 h-[400px] pb-[100px] max-w-[500px] 
                flex-col justify-left items-center gap-11  pe-[5%] mt-[5%]"
        >
           <h2 className="font-bold ms-[30px] mb-[7%]">Pie Chart</h2>

          <AgChartsReact options={pieChartOptions} strokeWidth={10} />
        </div>





        <div className="row-span-1 h-[400px] col-span-12 w-[90%] ms-[2%]">
          <h2 className="text-center font-bold">Total Sales</h2>
          <AgChartsReact options={lineGraph} strokeWidth={10} />
        </div>
      </div>
    </div>
  );
};

export default Home;
