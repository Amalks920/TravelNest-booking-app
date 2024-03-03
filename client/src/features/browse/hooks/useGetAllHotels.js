import { useGetAllHotelLocationQuery, useGetAllHotelQuery } from "../services/getAllHotelsApiSlice"

const useGetAllHotels=()=>{
const {data:hotels,isError,isFetching,isLoading,isUninitialized,error}=useGetAllHotelQuery()
const {data:location}=useGetAllHotelLocationQuery()
console.log(hotels)
    return {
        hotels:hotels?.response,
        location:location?.response,
        isError,
        isFetching,
        isLoading,
        isUninitialized,
        error
    }
}

export default useGetAllHotels