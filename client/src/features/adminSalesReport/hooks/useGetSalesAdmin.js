import { useEffect } from "react"
import { useGetSalesReportMutation } from "../services/salesReportApiSlice"



const useGetSalesAdmin = (salesReport,setSalesReport) =>{

    const [getSalesReport,{isError,isLoading,isSuccess}]=useGetSalesReportMutation()


   async  function fetchSalesReport(){
        const response=await getSalesReport()
        console.log(response)
        setSalesReport(response?.data)
    }

    useEffect( ()=>{
        fetchSalesReport()
    },[])

}

export default useGetSalesAdmin;