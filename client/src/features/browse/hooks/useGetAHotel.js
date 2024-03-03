import { useSelector } from "react-redux";
import {
  useGetAHotelForUserQuery,
  useGetARoomForUserQuery,
} from "../services/getAHotelForUserApiSlice";
//import { selectCheckIn, selectCheckOut } from "../services/priceSlice";
import { selectCheckIn,selectCheckOut } from "../../../services/searchSlice";

const useGetAHotel = (hotel_id, room_id) => {

  const checkIn=useSelector(selectCheckIn)
  const checkOut=useSelector(selectCheckOut)
  
  const {
    data: hotel,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
  } = 
    useGetAHotelForUserQuery({ hotel_id,room_id })

  const {
    data: room,
    isError: isErrorRoom,
    isFetching: isFetchingRoom,
    isLoading: isLoadingRoom,
    isSuccess: isSuccessRoom,
    isUninitialized: isUninitializedRoom,
  } = useGetARoomForUserQuery({ room_id,checkIn,checkOut });


  return {
    hotel,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    isUninitialized,
    room,
    isErrorRoom,
    isFetchingRoom,
    isLoadingRoom,
    isSuccessRoom,
    isUninitializedRoom
  };
};

export default useGetAHotel;
