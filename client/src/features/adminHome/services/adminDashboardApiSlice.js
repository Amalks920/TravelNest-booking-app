import { apiSlice } from "../../../services/apiSlice";


const adminDashboardApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getTotalSales:builder.query({
            query:()=>`/sales/get-total-monthly-sales-of-all-hotels`
        })
    })
})


export const {useGetTotalSalesQuery}=adminDashboardApiSlice;