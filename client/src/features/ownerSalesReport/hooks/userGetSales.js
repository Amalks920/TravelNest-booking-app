import { useEffect } from "react";
import BookingDetails from "../../booking/components/BookingDetails";
import { useGetSalesReportForOwnerMutation } from "../services/salesReportApiSlice";
import { useSelector } from "react-redux";
import { selectUserId } from "../../authentication/services/loginSlice";



const useGetSales = (salesReport,setBookingDetails) =>{

    const user_id=useSelector(selectUserId)

    const [getSalesReportForOwner,{isError,isLoading,isSuccess}]=useGetSalesReportForOwnerMutation()
console.log(setBookingDetails)

   async  function fetchSalesReport(){
        const response=await getSalesReportForOwner({user_id})
        console.log(response)
        setBookingDetails(response?.data)
    }

    useEffect( ()=>{
        fetchSalesReport()
    },[])

}

export default useGetSales;