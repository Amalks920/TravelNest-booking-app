import { apiSlice } from "../../../services/apiSlice";


const salesReportApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getSalesReportForOwner:builder.mutation({
           query:(data)=>`/sales/get-sales-report-hotel-owner/${data.user_id}` 
        }),
        getSalesReportBookings:builder.query({
            query:(data)=>`/sales/get-sales-report-booking/${data.hotel_id}`
        }),

        filterOwnerSalesByDate:builder.mutation({
            query:(data)=>`/sales/filter-owner-sales-by-date/${data.startDate}/${data.endDate}`
        }),
        downloadSalesReport:builder.mutation({
            query:(data)=>`/sales/download-sales-report`
        }),
        filterBookingsByDate:builder.mutation({
            query:(data)=>`/sales/filter-bookings-by-date/${data.startDate}/${data.endDate}`
        })
        
        
    }),



})


export const {
    useGetSalesReportForOwnerMutation,
    useGetSalesReportBookingsQuery,
    useFilterOwnerSalesByDateMutation,
    useDownloadSalesReportMutation,
    useFilterBookingsByDateMutation
} = salesReportApiSlice;