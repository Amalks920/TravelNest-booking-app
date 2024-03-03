import { useGetAllRoomsOfHotelQuery } from "../services/getRoomsByHotelIdSlice";


const useGetRoomsDetails=(hotel_id)=>{
const {data:rooms,isError,isFetching,isLoading,isSuccess}=useGetAllRoomsOfHotelQuery({hotel_id})


return {
    rooms,
    isError,
    isFetching,
    isLoading,
    isSuccess
}

}


export default useGetRoomsDetails;