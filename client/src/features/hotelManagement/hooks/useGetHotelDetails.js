import { useDispatch } from "react-redux";
import { useGetAHotelForAdminQuery } from "../services/getAHotelApiSlice";
import { updateEditHotelFormSlice } from "../../hotelRegistration/services/EditHotelFormSlice";


const useGetHotelDetails=(hotel_id)=>{
    const dispatch=useDispatch()
    const {data:hotel,isError,isFetching,isLoading,isSuccess}=useGetAHotelForAdminQuery({hotel_id})
if(isSuccess){
    const {hotelName,images,location,description}=hotel;
    dispatch(updateEditHotelFormSlice({hotelName,images,location,description}))
}
    return {
        hotel,
        isError,
        isFetching,
        isLoading,
        isSuccess
    }
}

export default useGetHotelDetails;