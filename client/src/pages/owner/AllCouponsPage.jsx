import AllCoupons from "../../features/couponManagement/components/AllCoupons"
import { useGetAllCouponsLengthQuery } from "../../features/couponManagement/services/couponApiSlice"



const AllCouponsPage=() => {

    const {data:couponsLength,isError,isFetching,isLoading}=useGetAllCouponsLengthQuery()

    console.log(couponsLength)
    return <AllCoupons couponsLength={couponsLength?.response}/>

}

export default AllCouponsPage