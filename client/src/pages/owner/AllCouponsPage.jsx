import { useState } from "react"
import AllCoupons from "../../features/couponManagement/components/AllCoupons"
import { useGetAllCouponsLengthQuery } from "../../features/couponManagement/services/couponApiSlice"



const AllCouponsPage=() => {

    const [pageNumber,setPageNumber]=useState(1)
    const {data:couponsLength,isError,isFetching,isLoading}=useGetAllCouponsLengthQuery()

    return <AllCoupons couponsLength={couponsLength?.response} pageNumber={pageNumber} setPageNumber={setPageNumber}/>

}

export default AllCouponsPage