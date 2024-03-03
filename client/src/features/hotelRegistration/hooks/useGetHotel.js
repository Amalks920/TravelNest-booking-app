import { useDispatch, useSelector } from "react-redux";
import { useGetAHotelQuery } from "../services/getAHotelApiSlice";
import { selectHotelById } from "../../hotelManagement/services/hotelListSlice";
//import { updateEditHotelFormSlice } from "../services/editHotelFormSlice";


const useGetHotel=(hotel_id)=>{

     if(!hotel_id) return 
const dispatch=useDispatch()
const hotel=useSelector((state)=>selectHotelById(state,hotel_id))
  const [{hotelName,images,location,description}]=hotel
  dispatch(updateEditHotelFormSlice({hotelName,images,location,description}))
  return images
}

export default useGetHotel;