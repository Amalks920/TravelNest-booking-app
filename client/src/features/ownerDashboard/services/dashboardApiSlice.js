import { apiSlice } from "../../../services/apiSlice";


const dashboardApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getSalesPerWeek:builder.query({
            query:(data)=>`/sales/get-sales-per-week/${data.owner_id}`
        }),
        getSalesPerMonth:builder.mutation({
            query:(data)=>`/sales/get-sales-per-month/${data.owner_id}`
        }),
        getSalesOFPerviousSevenDays:builder.mutation({
            query:(data)=>`/sales/get-sales-per-day/${data.owner_id}`
        }),
        getYearlySales:builder.query({
            query:(data)=>`/sales/get-sales-per-year/${data.owner_id}`
        }),
        getBookingsGrouped:builder.query({
            query:(data)=>`/sales/get-bookings-grouped/${data.owner_id}`
        }),
        getDashBoardDatas:builder.query({
            query:(data)=>`/sales/get-dashboard-data/${data.owner_id}`
        })
    }),

      

})


export const {
              useGetSalesPerWeekQuery,
              useGetSalesPerMonthMutation,
              useGetSalesOFPerviousSevenDaysMutation,
              useGetYearlySalesQuery,
              useGetBookingsGroupedQuery,
              useGetDashBoardDatasQuery
            }=dashboardApiSlice;