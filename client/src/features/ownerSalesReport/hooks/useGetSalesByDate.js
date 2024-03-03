import { useFilterOwnerSalesByDateMutation } from "../services/salesReportApiSlice";



const useGetSalesByDate=({salesReport,setBookingDetails})=>{

  const [filterOwnerSalesByDate,{isError,isLoading,isSuccess}]=  useFilterOwnerSalesByDateMutation()


  return filterOwnerSalesByDate

}

export default useGetSalesByDate;