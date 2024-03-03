import { useGetHotelsForAdminQuery } from "../services/HotelListAdmin";


const useGetAdminHotels=()=>{

    const {data:hotels,isError,isFetching,isLoading,isSuccess}=useGetHotelsForAdminQuery()
    return {
        hotels,
        isError,
        isFetching,
        isLoading,
        isSuccess
    }
}

export default useGetAdminHotels;